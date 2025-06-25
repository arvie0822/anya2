import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormControl } from '@angular/forms';
import { DropdownRequest, dropdownEntitlementType } from 'app/model/dropdown-entitlement.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import _ from 'lodash';
import { BehaviorSubject, firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, debounceTime, scan } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { MatOption } from '@angular/material/core';
import { DropdownHierarchyRequest, HeirarchyDropdownRequest, HierarchyList, SearchHierarchy } from 'app/model/dropdown.model';
import { UserService } from 'app/services/userService/user.service';
import { EmployeeHierarchy } from 'app/model/employee-hierarchy';
import { GF } from 'app/shared/global-functions';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fuseAnimations } from '@fuse/animations';
import { DropdownCustomComponent } from '../dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

enum mode {
    load = 0,
    next = 1,
    search = 2,
    all = 3,
    change = 4
}

@Component({
    selector: 'app-dropdown-hierarchy',
    templateUrl: './dropdown-hierarchy.component.html',
    styleUrls: ['./dropdown-hierarchy.component.scss'],
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
        TranslocoModule,
        MatTooltipModule,

    ],
})
export class DropdownHierarchyComponent implements OnInit {
    @Input() control: AbstractControl = new FormControl();
    @Input() useControl: boolean = false
    @Input() options: any[] = [];
    @Input() icon: string
    @Input() type: number = 0 // index itself dropdown
    @Input() multiple: boolean = false
    @Input() all: boolean = false
    @Input() value: any
    @Input() id: any // Parent selected Value
    @Input() type_id: any // Parent selected Type
    @Input() triggerByParent: boolean = false
    @Input() disabled: boolean = false

    @Output() selected = new EventEmitter<any>();
    @Output() objects = new EventEmitter<any>();

    @Input() dropdownValue: string = "dropdownID" // used for value and label default value = dropdownID , label = description
    @Input() dropdownLabel: string = "description"// used for value and label default value = dropdownID , label = description
    @Input() objectValue: boolean = false // used for value want object and been relected on '@Output objects'
    @Input() reset: boolean = false
    @Input() customRequest = new DropdownHierarchyRequest
    @Input() isReports: boolean = false
    @Input() manual: boolean = false
    dropdownRequest = new DropdownRequest
    inputChange: UntypedFormControl = new UntypedFormControl();
    data: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    protected _onDestroy = new Subject<void>();
    dropdownEntitlementType: any = dropdownEntitlementType
    dropdowns = EmployeeHierarchy
    dropdownDetail: any
    placeholder: string = ""
    index: number = 1
    complete: boolean = false
    _option = []
    cc: number = 0
    prev = {
        id: 0,
        text: "",
        value: []
    }
    prevEnt = {
        id: [],
        type: null
    }
    prevModuleId = ""
    @ViewChild('allSelected') private allSelected: MatOption;
    param = new DropdownHierarchyRequest
    exclude = []
    @Output() exluded = new EventEmitter<any>();
    isall: any //= this.objectValue ? [{dropdownID: 0, description: "All"}] : 0

    options_old: any[] = [];
    dataOptions = new BehaviorSubject<string[]>([]);
    options$: Observable<string[]>;
    mode: number = 0
    isOptionsEmpty: boolean = false
    selectedItem: any[] = [];
    selectedItemWithParent: any[] = [];
    constructor(private translocoService: TranslocoService,
        private coreService: CoreService,
        private userService: UserService,
        private payrollService: PayrollService,
        private cdr: ChangeDetectorRef,
        private overlayContainer: OverlayContainer) {
        this.options$ = this.dataOptions.asObservable().pipe(
            scan((acc, curr) => {
                var out = [];

                //if not next batch
                if (this.mode !== mode.next) {
                    out = _.uniqBy(curr, JSON.stringify);
                } else {
                    out = _.uniqBy([...acc, ...curr], JSON.stringify);
                }

                // true if current load is empty
                this.isOptionsEmpty = GF.IsEmpty(curr)

                this.selectedItemWithParent = _.uniqBy([...this.selectedItemWithParent, ...curr], JSON.stringify);

                //back-up old record
                var old = _.uniqBy([...this.options_old, ...out], JSON.stringify);
                this.options_old = GF.sort(old, 'description');

                // // for edit display
                // if (!GF.IsEmpty(this.value)) {
                //   var obj = []
                //   var ids
                //   if (this.multiple) {
                //     obj = out.filter(x=>this.value.includes(x.dropdownID))
                //     ids = obj.map(x=>x.dropdownID)

                // if (this.value.some(x=>x === 0)) {
                //   obj = [...obj,0]
                //   ids = [...ids,0]
                // }
                //   } else {
                //     obj = out.filter(x=> x.dropdownID == this.value)
                //     ids = this.value

                //     if (this.value === 0) {
                //       obj = [...obj,0]
                //       ids = 0
                //     }
                //   }


                //   this.selectedItem = GF.IsEmptyReturn(ids,this.value)
                //   this.value = this.selectedItem
                //   this.selected.emit(ids)
                //   this.objects.emit(obj)
                // }

                return GF.sort(out, 'description');
            }, [])
        );
    }

    ngDoCheck() {
        this.placeholder = this.translocoService.translate(GF.IsEmptyReturn(this.dropdownDetail.change, this.type + ''));
    }

    ngOnInit() {
        if (this.dropdowns.filter(x => x.index === this.type)[0] !== undefined) {
            this.dropdownDetail = this.dropdowns.filter(x => x.index === this.type)[0]
        }

        this.placeholder = this.translocoService.translate(GF.IsEmptyReturn(this.dropdownDetail.change, this.type + ''));

        this.dropdownValue = GF.IsEmptyReturn(this.dropdownValue, 'dropdownID')
        this.dropdownLabel = GF.IsEmptyReturn(this.dropdownLabel, 'description')
        this.isall = this.objectValue ? [{ dropdownID: 0, description: "All" }] : 0


        this.inputChange.valueChanges
            .pipe(debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this._onDestroy))
            .subscribe((res) => {
                this.filterDropdown();
            });

        this.initData(mode.load)
    }

    ngOnDestroy(): void {
        this._onDestroy.unsubscribe()
    }

    async ngOnChanges(changes: SimpleChanges) {

        let id = changes['id']
        let value = changes['value']

        if ("id" in changes) {
            if (!GF.arraysAreEqual(this.prev.value, id?.currentValue) && !GF.IsEmpty(id?.currentValue)) {
                await this.initData(mode.change)

                this.placeholder
                this.prev.value = id?.currentValue

                if (!GF.IsEmpty(this.value) || !GF.IsEmpty(this.selectedItem) && this.manual) {
                    if (!this.useControl) {
                        var obj = []
                        var ids: any | number = []
                        if (this.multiple) {

                            if (this.manual) {
                                let selItem = this.selectedItemWithParent.filter(x => this.id.includes(x.subCompanyID)).map(y => y.dropdownID)
                                let filterItem = this.selectedItem.filter(x => selItem.includes(x))
                                let finalItem = GF.IsEmptyReturn(filterItem, this.selectedItem);

                                this.value = [...finalItem, ...JSON.parse(JSON.stringify(this.value))]
                            }

                            obj = this.options_old.filter(x => this.value.includes(x.dropdownID))
                            ids = obj.map(x => x.dropdownID)

                            if (this.value.some(x => x === 0)) {
                                obj = [...obj, 0]
                                ids = [...ids, 0]
                            }

                            this.selectedItem = JSON.parse(JSON.stringify(this.value))
                            // console.log("placeholder:", this.placeholder)
                            this.selected.emit(ids)
                            this.objects.emit(obj)

                        } else {
                            obj = this.options_old.filter(x => x.dropdownID == this.value)
                            ids = this.value
                            if (this.value === 0) {
                                obj = [...obj, 0]
                                ids = 0
                            }
                            this.selectedItem = JSON.parse(JSON.stringify(this.value))

                            this.selected.emit(ids)
                            this.objects.emit(obj)
                        }
                    }
                }
              }
        }

        if ("reset" in changes) {
            if (this.value && changes.reset.currentValue) {
                this.value = []
                this.selectedItem = []
                this.id = []
                this.prev.value = []
                this.objects.emit([])
            }
        }

        this.cdr.detectChanges();
    }

    get isRequired(): boolean {
        return this.control.validator && this.control.validator({} as AbstractControl) && this.control.validator({} as AbstractControl).required;
    }

    get isInputEmpty(): boolean {
        return !this.control.value || this.control.value.length === 0;
    }

    async initData(modee) {
        if (GF.IsEmpty(this.id)) { this.dataOptions.next([]); return }//return emediately if id/ee are undefined/null

        //dis-regard all validation if next batch triggered
        // console.log(this.placeholder,this.id)
        if (modee == mode.load || modee == mode.change) {
            this.id = Array.isArray(this.id) ? this.id : [this.id]
            var again = Array.isArray(this.prevEnt.id) ? GF.arraysAreEqual(this.prevEnt.id, this.id) : true
            if (again || this.id.every(x => x == 0)) { return }//return emediately if previous ids same into current ids
            this.prevEnt.type = this.type
            this.prevEnt.id = [...this.id]
        }

        // Reset if parent changes
        if (modee == mode.change && this.manual) {
            this.options_old = []
            this.value = this.multiple ? [] : null
        }

        this.mode = modee

        var current = this.dropdowns.filter(x => x.index === this.type)[0]
        var parent = this.dropdowns.filter(x => x.dropdownTypeID === this.type_id)[0]

        this.param.id = []
        this.param.id.push({
            key: parent.key,
            dropdownID: this.id,
            dropdownTypeID: current.dropdownTypeID
        })

        if (!GF.IsEmpty(this.customRequest?.id)) {
            if (this.customRequest?.id.some(x => x.dropdownID.length > 0)) {
                this.customRequest?.id.forEach(id => {
                    if (!this.param.id.some(x => x.dropdownID == id.dropdownID)) {
                        this.param.id.push(id)
                    }
                });
            }
        }

        var service = this.isReports ? 'payrollService' : 'userService';
        const payload = await firstValueFrom(this[service].getSearchHierarchy(this.param, false, this.isReports))
        if (payload) {
            // console.log("initData::before:",this.placeholder,this.selectedItem, modee, mode.change)
            this.selectedItem = modee === mode.change ? [] : this.selectedItem
            // console.log(this.placeholder,this.selectedItem, modee, mode.change)
            const data = await payload["payload"]
            this.dataOptions.next(data)
            this.complete = modee == mode.search ? false : (this.param.length > payload["payload"].length)
        }
    }

    getNextBatch() {
        this.param.search = ""
        this.param.start = this.param.start + 1
        this.initData(mode.next)
    }

    async filterDropdown() {
        const search = this.inputChange.value.toLowerCase()
        // console.log(this.placeholder,this.value, this.selectedItem)
        if (!search) {
            this.value = JSON.parse(JSON.stringify(this.selectedItem))
            if (this.useControl) {
                var listV = this.multiple ? _.unionBy([...this.control.value, ...this.selectedItem]) : []
                this.control.patchValue(this.multiple ? listV : GF.IsEmptyReturn(this.control.value, 0));
            }
            this.dataOptions.next(this.options_old)
        } else {
            this.param.search = search
            this.param.start = 0
            this.initData(mode.search)
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
    }

    selectItem(id, val) {
        var objVal: any
        if (this.multiple) {
            if (val.some(x => x === 0)) {
                this.exclude = GF.removeOrPushFromList(val, this.exclude, id);
                this.exluded.emit(this.exclude)
            } else {
                this.selectedItem = GF.removeOrPushFromList([], this.selectedItem, id);
                // val = this.selectedItem
            }

            objVal = this.options_old.filter(x => this.selectedItem.includes(x.dropdownID))
        } else {
            this.selectedItem = val
            objVal = this.options_old.filter(x => x.dropdownID == val)
        }

        this.selected.emit(this.selectedItem)
        this.objects.emit(objVal)
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
        }

    }

    selDisplayNgModel(values) {
        try {
            if (!GF.IsEmpty(values) && !GF.IsEmpty(this.options_old)) {
                var out: string
                if (this.multiple) {
                    // values = values.some(x=>x===0) ? values : this.selectedItem
                    // console.log(values,this.selectedItem)
                    if (values.length === 0) {
                        return ""
                    }
                    if (values.some(x => x === 0)) {
                        out = "All"
                    } else {
                        out = this.options_old.find(item => item[this.dropdownValue] === values[0])[this.dropdownLabel]
                    }
                } else {
                    // values = values === 0 ? values : this.selectedItem
                    if (values === 0 && this.all) {
                        out = "All"
                    } else {
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
            console.log({
                error: error.message,
                value: values,
                list: this.options_old,
                dropdown: this.dropdownDetail
            })
        }

    }

    onSelectOpen(isOpen: boolean): void {
        if (isOpen) {
            // Move scroll bar into top on 1st list
            if (this.type == 6 && this.param.start == 0) {
                setTimeout(() => {
                    const overlayPane = this.overlayContainer.getContainerElement().querySelector('.cdk-overlay-pane');
                    if (overlayPane) {
                        const selectPanel = overlayPane.querySelector('.mat-select-panel');
                        if (selectPanel) {
                            selectPanel.scrollTop = 0;
                        }
                    }
                });
            }

        } else {
            this.inputChange.setValue("");
            // console.log('MatSelect is closed');
        }
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

    get isDisabled() {
        return this.control.disabled ? true : this.isOptionsEmpty
    }
}

