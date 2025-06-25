import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { DropdownSettings, SystemSettings } from 'app/model/app.constant';
import { DropdownRequest, dropdownCustomType } from 'app/model/dropdown-custom.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { GF } from 'app/shared/global-functions';
import _, { includes } from 'lodash';
import { BehaviorSubject, firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, debounceTime, scan } from 'rxjs/operators';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { DropdownID } from 'app/model/dropdown.model';

enum mode {
    load = 0,
    next = 1,
    search = 2,
    all = 3,
    change = 4
}

@Component({
    selector: 'app-dropdown-custom',
    templateUrl: './dropdown-custom.component.html',
    styleUrls: ['./dropdown-custom.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        CommonModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatSelectInfiniteScrollModule,
        MatAutocompleteModule,
        MatIconModule,
        SharedModule,
        MatFormFieldModule,
        MatTooltipModule,
        TranslocoModule
    ],
})
export class DropdownCustomComponent implements OnInit {
    @Input() control: AbstractControl = new FormControl();
    @Input() useControl: boolean = false
    @Input() reset: boolean = false
    @Input() options: any[] = [];
    @Input() empstatus: any = [];
    @Input() icon: string
    @Input() type: number = 0
    @Input() multiple: boolean = false
    @Input() all: boolean = false
    @Input() allDisplay: boolean = true
    @Input() except: boolean = false
    @Input() includeInactive: boolean = false
    @Input() id: string
    @Input() value: any
    @Input() label: string
    @Input() disabled: string
    @Input() disableOptions: number[] = []
    @Input() orderBy: string = "description"
    @Input() customRequest = new DropdownRequest
    @Input() dropdownValue: string // used for value and label default value = dropdownID , label = description
    @Input() dropdownLabel: string // used for value and label default value = dropdownID , label = description
    @Input() objectValue: boolean = false // used for value want object and been relected on '@Output objects'
    @Input() isExcluded: boolean = true // Used to retain 'All' even if one option is deselected.
    @Input() isNewOptions: boolean = false
    @Input() IsencyptIds: string

    @Output() selected = new EventEmitter<any>();
    @Output() exluded = new EventEmitter<any>();
    @Output() objects = new EventEmitter<any>();
    @Output() manual = new EventEmitter<boolean>();
    @Output() manualselect = new EventEmitter<boolean>();
    exclude = []
    enable = false
    dropdownRequest = new DropdownRequest
    inputChange: UntypedFormControl = new UntypedFormControl();
    // data: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    protected _onDestroy = new Subject<void>();
    dropdownCustomType: any = dropdownCustomType
    dropdownSettings = DropdownSettings
    dropdownDetail = {
        type: 0,
        label: "",
        uri: "",
        dropdownType: 0
    }
    options_old: any[] = [];
    placeholder: string = ""
    index: number = 1
    complete: boolean = false
    prev = {
        id: 0,
        text: "",
        value: [],
        oldvalue: 0 // for e201
    }
    @Input() showDescription: boolean = false
    @ViewChild('allSelected') private allSelected: MatOption;
    dataOptions = new BehaviorSubject<string[]>([]);
    options$: Observable<string[]>;
    mode = 0;//1 - search;
    selectedItem: any[] = [];

    constructor(private coreService: CoreService, private translocoService: TranslocoService,private cd : ChangeDetectorRef) {
        this.options$ = this.dataOptions.asObservable().pipe(
            scan((acc, curr) => {
                var out = [];

                //Seach = 2
                if (this.mode === 2 || this.isNewOptions && this.mode !== 1) {
                    out = curr
                } else {
                    out = _.uniqBy([...acc, ...curr], JSON.stringify);
                }

                //back-up old record
                var old = _.uniqBy([...this.options_old, ...out], JSON.stringify);
                this.options_old = GF.sort(old, this.orderBy);
                // console.log(GF.sort(out, this.orderBy))
                return GF.sort(out, this.orderBy);

            }, [])
        );
    }

    ngDoCheck() {
        this.placeholder = this.translocoService.translate(GF.IsEmptyReturn(this.label, this.type + ''));
    }

    ngOnInit() {
        this.isExcluded = GF.IsEmptyReturn(this.isExcluded, true);

        this.dropdownRequest.includeInactive = true
        if (this.dropdownCustomType.filter(x => x.type === this.type)[0] !== undefined) {
            this.dropdownDetail = this.dropdownCustomType.filter(x => x.type === this.type)[0]
        }

        // this.placeholder = GF.IsEmptyReturn(this.label, this.dropdownDetail.label)
        this.placeholder = this.translocoService.translate(GF.IsEmptyReturn(this.label, this.type + ''));
        this.dropdownDetail

        this.dropdownValue = GF.IsEmptyReturn(this.dropdownValue, 'dropdownID')
        this.dropdownLabel = GF.IsEmptyReturn(this.dropdownLabel, 'description')

        this.inputChange.valueChanges
            .pipe(debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this._onDestroy))
            .subscribe((res) => {
                this.filterDropdown();
                // if (res != "") {
                //   this.dropdownRequest.start = 0
                //   this.filterDropdown();
                // } else {
                //   // this.dataOptions.next(this.options_old)
                // }
            });
        if (!this.useControl && this.options.length == 0) {
            this.initData(this.dropdownDetail, mode.load)
        } else {
            this.dataOptions.next(this.options)
            this.cd.detectChanges()
        }

    }



    ngOnDestroy(): void {
        this._onDestroy.unsubscribe()
    }

    async ngOnChanges(changes: SimpleChanges) {
        // Trigger ngOnInit first
        // ...existing code...
        if ("customRequest" in changes) {

            if (this.dropdownCustomType.filter(x => x.type === this.type)[0] !== undefined) {
                this.dropdownDetail = this.dropdownCustomType.filter(x => x.type === this.type)[0]
            }

            if (!GF.IsEmpty(changes.customRequest.currentValue.id[0]?.dropdownID, true) && this.prev.oldvalue != changes.customRequest.currentValue.id[0]?.dropdownID) {
                this.prev.oldvalue = changes.customRequest.currentValue.id[0]?.dropdownID
                await this.initData(this.dropdownDetail, mode.change);

                var obj = []
                var ids

                obj = this.options_old.filter(x => this.multiple ? this.value.includes(x.dropdownID) : x.dropdownID == this.value )
                ids = this.multiple ? obj.map(x => x.dropdownID) : obj[0].dropdownID

                this.selected.emit(ids)
                this.objects.emit(obj)
            }
        }

        if ("value" in changes) {

            if (this.all && this.multiple && !GF.IsEmpty(this.options_old) && changes.value.currentValue?.some(x => x == 0)) {
                this.value = [...this.options_old.map(x => x[this.dropdownValue]), 0]

                obj = this.options_old.filter(x => this.value.includes(x.dropdownID))
                ids = obj.map(x => x.dropdownID)
                this.selectedItem = this.value


                if (this.value.some(x => x === 0)) {
                    obj = [...obj, 0]
                }

                this.objects.emit(obj)
                this.objects.emit(obj)

            } else if (!this.useControl) {

                if (!GF.IsEmpty(this.options_old) && !GF.IsEmpty(this.value)) {

                    var obj = []
                    var ids
                    if (this.multiple && !GF.arraysAreEqual(this.prev.value, this.value)) {
                        obj = this.options_old.filter(x => this.value.includes(x.dropdownID))
                        ids = obj.map(x => x.dropdownID)

                        this.selected.emit(ids)
                        this.objects.emit(obj)
                    } else if (!this.multiple && !GF.arraysAreEqual(this.prev.value, this.value)) {
                        obj = this.options_old.filter(x => x.dropdownID == this.value)
                        ids = obj[0].dropdownID

                        this.selected.emit(ids)
                        this.objects.emit(obj)
                    }
                    this.selectedItem = GF.IsEmptyReturn(this.value, this.multiple ? [] : this.value)
                    this.value = this.selectedItem
                    this.prev.value = this.value;
                } else {
                    this.selectedItem = GF.IsEmptyReturn(this.value, this.multiple ? [] : this.value)
                }
            }
        }
        if ("reset" in changes) {
            if (this.value && changes.reset.currentValue) {
                this.prev.value = []
                this.value = []
                this.selectedItem = []
                this.objects.emit([])
            }
        }

        if ('options' in changes) {
            this.mode = 0
            this.dataOptions.next(this.options)
            this.completeChecker(this.options)
            this.cd.detectChanges()
        }
    }

    get isRequired(): boolean {
        return this.control.validator && this.control.validator({} as AbstractControl) && this.control.validator({} as AbstractControl).required;
    }

    get isInputEmpty(): boolean {
        return GF.IsEmpty(this.control.value, true) || this.control.value.length === 0;
    }

    completeChecker(option): void {
        if (this.dropdownSettings.length > option.length) {
            this.complete = true
        }
        else {
            this.complete = false
        }
    }

    //   selectedEvent(e){
    //     if (e.value !== undefined) {
    //       this.selected.emit(e.value)
    //     }
    //   }

    async initData(e, modee) {
        this.mode = modee;

        if (e.type === 0) { return }
        if (!GF.IsEmpty(this.customRequest?.id)) { // = [deop 0 deop 0]
            this.customRequest?.id.forEach(id => {
                if (!this.dropdownRequest.id.some(x => x.dropdownID == id.dropdownID && x.dropdownTypeID == id.dropdownTypeID)) {
                    this.dropdownRequest.id.push(id)
                }
            });
        }

        this.dropdownRequest.includeInactive = this.includeInactive

        var ismodule = sessionStorage.getItem('moduleId') == '81' ? true :
        sessionStorage.getItem('moduleId') == '68' ? true :
        sessionStorage.getItem('moduleId') == '160' ? true : false

        debugger

        const value = ismodule && !GF.IsEmpty(this.IsencyptIds) ? await firstValueFrom(this.coreService.getCoreDropdownwithparam(e.type, this.dropdownRequest,GF.IsEmptyReturn(this.IsencyptIds,sessionStorage.getItem('u')))) : await firstValueFrom(this.coreService.getCoreDropdown(e.type, this.dropdownRequest))
        if (value) {
            if (modee !== mode.search) {
                this.completeChecker(value.payload)
            }

            value.payload = sessionStorage.getItem('moduleId') == '81' ?  value.payload.filter(item => item.dropdownID !== 64 && item.dropdownID !== 141 && item.dropdownID !== 142 && item.dropdownID !== 185) : value.payload;

            this.dataOptions.next(value.payload)
            if (this.allSelected?.selected) {
                this.selectAll()
            }
        }
    }


    // onAll(){
    //   if (!this.useControl && this.multiple && this.all && !GF.IsEmpty(this.value)) {
    //     if (this.value.some(x=>x === 0)) {
    //       this.value = _.uniqBy([...this.options, ...this.value], JSON.stringify)
    //     }
    //   }
    // }

    async getNextBatch() {
        console.log('test 1')
        this.dropdownRequest.search = GF.IsEmptyReturn(this.inputChange?.value?.toLowerCase(), "")
        this.dropdownRequest.start = this.index++
        this.dropdownRequest.id = []
        this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: this.type })
        // console.log(this.dropdownRequest)
        this.initData(this.dropdownDetail, mode.next)
    }

    async filterDropdown() {
        const search = this.inputChange.value?.toLowerCase()
        if (!search) {
            this.value = this.selectedItem
            if (this.useControl) {
                var listV = this.multiple ? _.unionBy([...GF.IsEmptyReturn(this.control.value, []), ...GF.IsEmptyReturn(this.selectedItem, [])]) : []
                this.control.patchValue(this.multiple ? listV : GF.IsEmptyReturn(this.control.value, 0));
            }
            this.dataOptions.next(this.options_old)
        } else {
            this.dropdownRequest.start = 0
            this.dropdownRequest.search = search
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: this.type })
            this.initData(this.dropdownDetail, mode.search)
        }
    }

    selectAll() {
        var result: any
        var obj: any = this.multiple ? [] : 0
        if (this.useControl) {
            if (this.multiple) {
                if (this.allSelected.selected) {
                    this.control.patchValue([...this.options_old.map(item => item[this.dropdownValue]), 0])
                    obj = [...this.options_old.map(item => item), 0]
                } else {
                    this.control.patchValue([]);
                }
            } else {
                if (this.allSelected.selected) {
                    this.control.patchValue(0);
                    obj = 0
                } else {
                    this.control.patchValue(null);
                }
            }
            result = this.control.value
        } else {
            if (this.multiple) {
                if (this.allSelected.selected) {
                    this.value = [...this.options_old.map(item => item[this.dropdownValue]), 0]
                    obj = [...this.options_old.map(item => item), 0]
                } else {
                    this.value = []
                }
            } else {
                if (this.allSelected.selected) {
                    this.value = 0
                    obj = 0
                } else {
                    this.value = null
                }
            }
            result = this.value
        }
        // this.initData(mode.all)
        this.selectedItem = result
        this.selected.emit(result)
        this.objects.emit(obj)
        this.manual.emit(true)
    }

    selectItem(id, val) {
        var objVal: any
        if (this.multiple) {
            if (val.some(x => x === 0)) {
                if (this.isExcluded) {
                    this.exclude = GF.removeOrPushFromList(val, this.exclude, id);
                    this.exluded.emit(this.exclude)
                } else {
                    this.allSelected.deselect();
                    this.selectedItem = GF.removeOrPushFromList([], this.selectedItem, 0);
                }

                this.selectedItem = GF.removeOrPushFromList([], this.selectedItem, id);
            } else {
                this.selectedItem = GF.removeOrPushFromList([], this.selectedItem, id);
            }
            objVal = this.options_old.filter(x => val.includes(x.dropdownID))
        } else {
            this.selectedItem = val
            objVal = this.options_old.filter(x => x.dropdownID == val)
        }

        this.selected.emit(this.selectedItem)
        this.manualselect.emit(true)
        this.objects.emit(objVal)
        this.manual.emit(true)
    }

    selectedEvent(e) {
        if (e.value !== undefined) {
            if (this.multiple) {
                if (e.value.some(x => x[this.dropdownValue] === 0)) {
                    return
                }
            } else {
                if (e.value === 0) {
                    return
                }
            }
            // this.selected.emit(e.value)
            // this.objects.emit(e.value)
        }

    }

    selDisplayNgModel(values) {
        try {
            if (!GF.IsEmpty(values, true) && !GF.IsEmpty(this.options_old)) {

                var out: string
                if (this.multiple) {
                    if (values.length === 0) {
                        return ""
                    }
                    if (values.some(x => x === 0)) {
                        out = "All"
                    } else {
                        out = this.options_old.find(item => item[this.dropdownValue] === values[0])[this.dropdownLabel]
                    }
                } else {
                    if (values === 0 && this.all) {
                        out = "All"
                    } else if (values === 0 && this.except && !this.all) {
                        out = "Exception"
                    }
                    else {
                        if (values === 0) {
                            return ""
                        }
                        out = this.options_old.find(item => item[this.dropdownValue] === values)[this.dropdownLabel]
                    }
                }
                this.prev.id = values
                this.prev.text = out
                return out;
            }
        } catch (error) {
            // console.log({
            //   error: error.message,
            //   value: values,
            //   list: this.options,
            //   dropdown: this.dropdownDetail
            // })
        }
    }

    onSelectOpen(isOpen: boolean): void {
        if (isOpen) {
            // console.log('MatSelect is open');
        } else if (this.useControl && !isOpen && !this.except) {
            if (!this.control.value || this.control.value === 0 || GF.IsEmpty(this.control.value, true)) {
                this.control.setValue(null);
            }
        } else {
            this.inputChange.setValue("");
            // console.log('MatSelect is closed');
        }
    }

    disableOpt(id) {
        var hasAll = this.disableOptions.some(x => x === 0)
        // this.all = GF.IsEmpty(this.disableOptions) ? this.all : !hasAll
        return hasAll ? true : this.disableOptions.some(x => x === id)
    }

    isALL(e) {
        if (this.multiple) {
            return !GF.IsEqual(0, e)
        } else {
            if (e === 0) {
                return false
            }
        }
    }
}
