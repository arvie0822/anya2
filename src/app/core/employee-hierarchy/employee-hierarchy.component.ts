import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormsModule, UntypedFormControl } from '@angular/forms';
import { HeirarchyDropdownRequest, HierarchyList, SearchHierarchy } from 'app/model/dropdown.model';
import { EmployeeHierarchy } from 'app/model/employee-hierarchy';
import { UserService } from 'app/services/userService/user.service';
import { Subject } from 'rxjs';
import _ from 'lodash';
import { DropdownSettings } from 'app/model/app.constant';
// import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { GF } from 'app/shared/global-functions';
import { MatOption } from '@angular/material/core';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { fuseAnimations } from '@fuse/animations';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';

enum mode {
    next = 1,
    search = 2,
    tagChange = 3,
}

@Component({
    selector: 'app-employee-hierarchy',
    templateUrl: './employee-hierarchy.component.html',
    styleUrls: ['./employee-hierarchy.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    CdkTableModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatSelectInfiniteScrollModule,
    MatAutocompleteModule,
    MatIconModule,
    SharedModule,
    MatFormFieldModule,
    TranslocoModule,
    MatTooltipModule
],
})
export class EmployeeHierarchyComponent implements OnInit {
    dropdownRequest = new HeirarchyDropdownRequest
    @Input() resultHierarchy: SearchHierarchy;
    @Input() defaultTag: any = [];
    @Input() empstatus: any = [];
    @Input() reset: boolean = false
    @Input() multiple: boolean = false
    @Input() all: boolean = false
    @Input() includeInactive: boolean = false
    @Input() showTag: boolean = true
    @Input() objectValue: boolean = false // used for value want object and been relected on '@Output objects'
    @Input() notincludetag: any = []
    @Input() isExcluded: boolean = true // Used to retain 'All' even if one option is deselected.
    @Input() paycodes: number = 0

    @Output() selected = new EventEmitter<any>();
    @Output() exluded = new EventEmitter<any>();
    @Output() objects = new EventEmitter<any>();
    protected _onDestroy = new Subject<void>();
    inputChange: UntypedFormControl = new UntypedFormControl();

    @ViewChildren('allSelected') matOptions!: QueryList<MatOption>;
    matOptionMap: { [key: string]: MatOption } = {};

    dropdowns = EmployeeHierarchy.map(x => ({ ...x }))
    selectedTag = []
    TagStored = []
    tagOptions = []
    placeholder = ""
    dropdownSettings = DropdownSettings
    index = 0
    loading = false
    currentOption: any
    prevModule = ""
    prev = {
        id: 0,
        text: ""
    }
    currentId = 0
    isMgmt = false
    exclude = []
    searchList = []


    @ViewChild('matSelect') matSelect: ElementRef;

    constructor(private userService: UserService, private payrollService: PayrollService,private translocoService: TranslocoService) {
        this.inputChange.valueChanges
            .pipe(debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this._onDestroy))
            .subscribe((result) => {

                if (result != "") {
                    this.loadDropdowns(mode.search)

                } else {
                    var __options = this.dropdowns.find(x => x.dropdownTypeID == this.currentOption.dropdownTypeID)
                    __options.options = __options.oldoptions
                    __options.value = __options.selected
                }
            });
    }

    onSelectOpen(isOpen: boolean, select): void {
        if (isOpen) {
            this.currentOption = select
        } else {
            this.inputChange.setValue("");
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.matOptions.forEach(option => {
                const key = option._getHostElement().getAttribute('data-key');
                if (key) {
                    this.matOptionMap[key] = option;
                }
            });
        }, 2000);

    }


    ngDoCheck(){
        this.dropdowns.forEach((label,ii) => {
            this.dropdowns[ii].change = this.translocoService.translate(GF.IsEmptyReturn(label.change,""));
        });
    }


    ngOnInit() {

          this.dropdowns.forEach((label,ii) => {
            this.dropdowns[ii].change = this.translocoService.translate(GF.IsEmptyReturn(label.change,""));
        });
        this.isExcluded = GF.IsEmptyReturn(this.isExcluded, true);
        this.isMgmt = GF.IsEqual(sessionStorage.getItem('moduleId'), ['40', '41', '99', '142'])//additional module id
        this.initialize()
    }


    get currentModule() {

        if (!GF.IsEqual(this.prevModule, [sessionStorage.getItem('moduleId')])) {
            this.prevModule = sessionStorage.getItem('moduleId')
            this.isMgmt = GF.IsEqual(sessionStorage.getItem('moduleId'), ['40', '41', '99', '142'])//additional module id
        }
        return true
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes.defaultTag.currentValue)
        if (changes.defaultTag?.currentValue?.length !== changes.defaultTag?.previousValue?.length) {
            this.selectedTag = []
            this.isMgmt = GF.IsEqual(sessionStorage.getItem('moduleId'), ['40', '41', '99', '142',])//additional module id
            this.initialize()
        }

        if ("reset" in changes) {
            if (this.reset) {
                this.dropdowns.map(item => {
                    item.value = []
                    item.selected = []
                })
            }
        }

        // if (this.selectedTag.length < 2) {

        // }else{
        //     this.index = 0
        // }

    }
    initialize() {
        this.dropdowns.map(item => { item.visible = false , item.value = null , item.selected = null, item.disable = false })
        this.userService.getHierarchyEmployee().subscribe({

            next: (value: any) => {

                if (this.defaultTag.length > 0) {
                    this.selectedTag = this.defaultTag.map(item => item.type)
                    this.defaultTag.forEach(item => {
                        this.dropdowns.find(x=>x.dropdownTypeID == item.type).disable = GF.IsEmptyReturn(item?.disable, false)
                    });
                    this.handlerChange()
                    this.selectedevent()
                }
                if (value.statusCode == 200) {
                    this.tagOptions = value.payload.filter(item => !this.notincludetag.includes(item.dropdownTypeID))
                }

                else {
                    console.log(value.stackTrace)
                    console.log(value.message)
                }
            },
            error: (e) => {
                console.error(e)
            }
        });
    }

    gridcols(e) {
        return e
    }
    selecteds(id, val) {
        this.selectTags(id, val)
        this.handlerChange()
    }

    selectTags(id, val) {

        var istrue = !val.some(x => x === id)
        if (istrue) {
            this.TagStored.push(id);
        } else {
            var idx = this.TagStored.findIndex(x => x === id)
            this.TagStored.splice(idx, 1)
        }
    }

    handlerChange() {

        // console.log("handlerChange")
        this.dropdowns.map(item => {
            item.visible = false

        })
        this.selectedTag.forEach(key => {
            this.dropdowns.find(x => x.dropdownTypeID == key).visible = true
            this.dropdowns.find(x => x.dropdownTypeID == key).complete = false
            this.dropdowns.find(x => x.dropdownTypeID == key).value = []
            this.dropdowns.find(x => x.dropdownTypeID == key).selected = []
        });
        // console.log("tagChange")
        var isTrue = this.selectedTag.some(x => !this.TagStored.includes(x))
        if (isTrue) {
            this.loadDropdowns(mode.tagChange)
        }

    }

    compareArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false; // Arrays have different lengths, they are not equal
        }

        for (let i = 0; i < arr1.length; i++) {
            const obj1 = arr1[i];
            const obj2 = arr2[i];

            // Compare the properties of each object
            for (const key in obj1) {
                if (obj1[key] !== obj2[key]) {
                    return false; // Objects have different values for a property, they are not equal
                }
            }
        }

        return true; // All elements and properties are equal
    }

    completeChecker(option, curOp): void {
        if (this.dropdownSettings.length > option.length) {
            curOp.complete = true
        }
        else {
            curOp.complete = false
        }
    }

    loadDropdowns(modes, direct = false, request = []) {
        this.loading = true

        this.dropdownRequest.search = this.inputChange.value?.toLowerCase()
        this.dropdownRequest.start = (modes == mode.tagChange || modes == mode.search) ? 0 : this.index
        this.dropdownRequest.id = direct ? request[0].id : []

        this.dropdownRequest.statusID = !direct ? this.empstatus : request[0].statusID

        let selection = []
        this.selectedTag.forEach(key => {
            selection.push(this.dropdowns.filter(x => x.dropdownTypeID == key)[0])
        });

        var selected: any
        if (modes != mode.tagChange) {
            //For Seach and Scroll
            if (!direct) {
                selection.forEach(select => {
                    if (select.index < this.currentOption.index && !direct) {
                        this.dropdownRequest.id.push({
                            key: select.key,
                            dropdownID: Array.isArray(select.value) ? select.value : [select.value],
                            dropdownTypeID: this.currentOption.dropdownTypeID
                        });
                    } else if (selection.length === 1 && !direct) {
                        this.dropdownRequest.id.push({
                            key: select.key,
                            dropdownID: [0],
                            dropdownTypeID: this.currentOption.dropdownTypeID
                        });

                    }
                });
            }
        } else {
            //For TagChanges
            selected = selection.sort((a, b) => {
                return a.index - b.index;
            })[0];

            this.dropdownRequest.id.push({ dropdownID: GF.IsEmptyReturn(selected?.value, [0]), dropdownTypeID: selected?.dropdownTypeID, key: selected.key })

        }
        //#1 Filter internal if not employee dropdown
        var search = this.inputChange.value?.toLowerCase()
        if (search && modes != mode.tagChange && !GF.IsEqual(this.currentOption.dropdownTypeID, [-3, -4])) {
            var tempOp = this.dropdowns.find(x => x.dropdownTypeID == this.currentOption.dropdownTypeID).options
            this.dropdowns.find(x => x.dropdownTypeID == this.currentOption.dropdownTypeID).options = tempOp.filter(x => x.description.toLowerCase().indexOf(search) > -1)
            return
        }

        this.dropdownRequest.payrollCode = GF.IsEmpty(this.paycodes) ? sessionStorage.getItem("payrollcode") : this.paycodes.toString()

        //#1 End

        let service;
        let api;

        if (sessionStorage.getItem('moduleId') === '26') {
            service = this.payrollService;
            api = 'getPayrollSearchHierarchy';
        } else {
            service = this.userService;
            api = 'getSearchHierarchy';
        }

        service.getSearchHierarchy(this.dropdownRequest, this.isMgmt).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.loading = false

                    var _options = this.dropdowns.find(x => x.dropdownTypeID == GF.IsEmptyReturn(selected?.dropdownTypeID, this.currentOption?.dropdownTypeID))
                    //this note is for future me. alam ko pagod kna. nag titiis ka nlng kaya nag iwan ako notes. thank old me!

                    //Compare current option if equal to new option then complete = true
                    //_options.complete = this.compareArrays(_options.options,value.payload)

                    //check complete is true then true else check new value is null/undefined/[] then complete = true
                    //_options.complete = _options.complete ? true : GF.IsEmpty(value.payload)

                    var currentOptions = GF.IsEmpty(this.currentOption?.options || []) ? [] : this.currentOption?.options.filter(x => x.dropdownTypeID == GF.IsEmptyReturn(selected?.dropdownTypeID, this.currentOption.dropdownTypeID)) || []

                    //check if mode is search or next batch
                    var tempOp1 = modes == mode.search
                        ? _.uniqBy(value.payload, JSON.stringify)
                        : _.uniqBy([...currentOptions, ...value.payload], JSON.stringify)

                    //unique here 1st
                    var tempOp = []
                    tempOp = GF.unique(tempOp1, tempOp, 'dropdownID')

                    _options.oldoptions = _.uniqBy([..._options.oldoptions, ...tempOp], JSON.stringify)

                    // Conditions on Search
                    if (modes === mode.search) {
                        tempOp.forEach(op => {
                            this.searchList.push(op);
                        });
                        _options.options = tempOp

                        // Conditions on Next Batch
                    } else if (modes === mode.next) {
                        var searchOption = _.uniqBy([...tempOp, ...this.searchList], JSON.stringify)
                        var newOption = []
                        //unique here 2st
                        var uniqOption = GF.unique(searchOption, newOption, 'dropdownID')
                        _options.options = GF.sort(uniqOption, 'description')
                        this.completeChecker(value.payload, _options.options)
                    } else {
                        _options.options = tempOp
                    }

                    //Select All Even Next Batch
                    if (!GF.IsEmpty(this.currentOption?.value) && this.currentOption?.value.includes(0) && !GF.IsEmpty(value.payload)) {
                        this.currentOption.value = _.uniqBy([...this.currentOption?.value, ...value.payload.map(x => x.dropdownID)], JSON.stringify)
                    }

                    //Put search result on top
                    if (!GF.IsEmpty(this.dropdownRequest.search)) {
                        _options.options = _.uniqBy([..._options.options], JSON.stringify).filter(x => x.description.toLowerCase().indexOf(this.dropdownRequest.search) > -1)
                    }

                    //Load initial defaultTag
                    if (this.multiple && this.defaultTag.length > 0 && modes == mode.tagChange) {
                        this.defaultTag.forEach(tag => {
                            var dd = this.dropdowns.find(x => x.dropdownTypeID == tag.type)
                            dd.value = tag.id.some(x => x === 0) ? [...tag.id, ...dd.options.map(x => x.dropdownID)] : [...tag.id]
                            dd.selected = [...dd.value];
                            var ev = { value: [...tag.id] }
                            this.handlerSelectiveChange(dd, ev)
                        });
                    }

                }
                else {
                    console.log(value.stackTrace)
                    console.log(value.message)
                }
            }
        });
    }

    identifyAll(key, id) {
        return key == id
    }


    selectItem(id, sel) {

        var val = sel.value
        var select = sel.selected
        if (this.multiple) {
            if (val.some(x => x === 0)) {
                if (this.isExcluded) {
                    this.exclude = GF.removeOrPushFromList(val, this.exclude, id);
                    this.exluded.emit(this.exclude)
                } else {
                    this.matOptionMap[sel.key].deselect();
                    select = GF.removeOrPushFromList([], select, 0);
                }

            } else {

                if (!select.some(x => x === id)) {
                    select.push(id);
                } else {
                    var indx = select.findIndex(x => x === id)
                    select.splice(indx, 1)
                }
            }
        }
        this.setSelection()
    }



    handlerSelectiveChange(model, select) {

        // this.dropdownRequest.includeInactive = this.includeInactive


        if (model.value.some(x => x === 0) && model.value.length < 2) {
            return
        }
        // console.log("handlerSelectiveChange")

        let param = new HeirarchyDropdownRequest
        let id = 0
        let selection = []
        this.selectedTag.forEach(key => {
            selection.push(this.dropdowns.filter(x => x.dropdownTypeID == key)[0])
        });
        var nextList = selection.filter(x => x.dropdownTypeID != model.dropdownTypeID && x.index > model.index)

        this.setSelection()
        this.removeOptions(nextList)


        if (nextList.length > 0) {
            id = nextList.filter(x => x.dropdownTypeID != model.dropdownTypeID).sort((a, b) => {
                return a.index - b.index;
            })[0].dropdownTypeID;
            param.statusID = this.empstatus
            param.payrollCode = GF.IsEmpty(this.paycodes) ? "" : this.paycodes.toString()
            param.id = []
            selection.forEach(select => {
                if (select.index <= model.index) {
                    param.id.push({
                        key: select.key,
                        dropdownID: Array.isArray(select.value) ? select.value : [select.value],
                        dropdownTypeID: id
                    });

                    if(sessionStorage.getItem('moduleId') == '84'){
                        if (this.defaultTag.length > 0) {
                            if (this.defaultTag.some(x => x.type == -4)) {
                                const tag = this.defaultTag.find(item => item.type === -4);
                                const id = tag ? tag.id : undefined;
                                param.id.push({ dropdownID: id, dropdownTypeID: -4, key: "EmployeeID" })
                            }
                        }
                    }

                }
            });

            // }
            if (GF.IsEmpty(model.value)) {
                this.dropdowns.filter(x => x.dropdownTypeID == id)[0].options = model.value
                return
            }


            let service;
            let api;

            if (sessionStorage.getItem('moduleId') === '26') {
                service = this.payrollService;
                api = 'getPayrollSearchHierarchy';
            } else {
                service = this.userService;
                api = 'getSearchHierarchy';
            }
            service.getSearchHierarchy(param, this.isMgmt).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.dropdowns.filter(x => x.dropdownTypeID == id)[0].options = _.uniqBy(value.payload, JSON.stringify)
                        this.dropdowns.filter(x => x.dropdownTypeID == id)[0].oldoptions = _.uniqBy(value.payload, JSON.stringify)
                        // this.defaultTag.forEach(tag => {
                        //     var aa = this.dropdowns.find(x => x.dropdownTypeID == tag.type)
                        //     aa.value = tag.id[0]
                        // });
                    }
                    else {
                        console.log(value.stackTrace)
                        console.log(value.message)
                    }
                },
                error: (e) => {
                    console.error(e)
                }
            });
        }
    }

    removeOptions(options) {
        options.forEach(key => {
            key.value = null
            key.options = []
            key.selected = []
        });
    }

    setSelection() {

        this.resultHierarchy.Search = []
        // console.log(this.dropdowns)
        this.dropdowns.forEach(element => {
            if (element.visible) {

                var istrue = !GF.IsEmpty(element.selected)
                if (istrue) {
                    let search = new HierarchyList
                    search.Key = element.key
                    search.Type = 2
                    search.Value = element.selected
                    this.resultHierarchy.Search.push(search)
                    this.objects.emit(this.dropdowns)
                }
            }
        });

    }

    selectedevent() {
        this.selected.emit(this.selectedTag.length)
    }

    async getNextBatch() {
        if (!this.loading) {
            this.index = this.index + 1
            // console.log("getNextBatch")
            this.loadDropdowns(mode.next)
        }
    }

    selectAll(se, event) {
        var isAll = false
        if (Array.isArray(se.value)) {
            isAll = se.value.some(x => x === 0)
        } else {
            isAll = se.value === 0
        }

        if (isAll) {
            if (this.multiple) {
                se.value = [...se.options.map(x => x.dropdownID), ...[0]]
            } else {
                se.value = 0
            }
        } else {
            if (this.multiple) {
                se.value = []
            } else {
                se.value = null
            }
        }

        se.selected = se.value

        this.handlerSelectiveChange(se, event)
    }

    selDisplayNgModel(values, options) {
        if (values !== undefined && values !== null && values !== "" && (values?.length || 1) > 0) {
            if (this.prev.id != values) {
                var out: string
                if (this.multiple) {
                    if (values.length === 0) {
                        return ""
                    }
                    if (values.some(x => x === 0)) {
                        out = "All"
                    } else {
                        out = options.find(item => item.dropdownID === values[0])?.description
                    }
                } else {
                    if (values === 0) {
                        out = "All"
                    } else {
                        out = options.find(item => item.dropdownID === values)?.description
                    }
                }
                this.prev.id = values
                this.prev.text = out
                return out;
            } else {
                return this.prev.text;
            }
        }
    }
}
