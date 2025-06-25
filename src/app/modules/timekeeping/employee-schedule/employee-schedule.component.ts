import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Pipe, ViewChild, ViewEncapsulation, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { DropdownSettings, SystemSettings } from 'app/model/app.constant';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownOptions, DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { EmployeeSchedulePerDayTag, ShiftDays } from 'app/model/employee/employee-schedule';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { ShiftService } from 'app/services/shiftService/shift.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { forkJoin, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, debounceTime } from 'rxjs/operators';

const DATE_FORMAT = 'MM/DD/yyyy';

export const MY_FORMATS = {
    parse: {
        dateInput: DATE_FORMAT,
    },
    display: {
        dateInput: DATE_FORMAT,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: DATE_FORMAT,
        monthYearA11yLabel: 'MMMM YYYY',
    },
};


@Component({
    selector: 'app-employee-schedule',
    templateUrl: './employee-schedule.component.html',
    styleUrls: ['./employee-schedule.component.css'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        // ============= For date picker =============
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_FORMATS,
        },
    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDatepickerModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        CardTitleComponent,
        EmployeeHierarchyComponent,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatTooltipModule,
        MatSelectInfiniteScrollModule,
        TranslocoModule

    ]
})

export class EmployeeScheduleComponent implements OnInit {
    // Set today's date as the minimum date
    minDate = new Date();
    maxDate = new Date();
    istimeerrror: boolean
    dropdownOptions = new DropdownOptions
    scheduleDayForm: FormGroup
    dropdownRequest = new DropdownRequest;
    dropdown = { ...new DropdownRequest }
    dropdownFixRequest = new DropdownRequest;
    placeholder: string = "Select Tag Type"
    type: number
    options: any[] = [];
    optionsChild: any[] = [];
    optionsChildvalid: any[] = [];
    optionsParent: any[] = [];
    inputChange: UntypedFormControl = new UntypedFormControl();
    data: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    inputChangeChild: UntypedFormControl = new UntypedFormControl();
    inputChangeChild_date: UntypedFormControl = new UntypedFormControl();
    inputChangeChild_m: UntypedFormControl = new UntypedFormControl();
    inputChangeChild_tu: UntypedFormControl = new UntypedFormControl();
    inputChangeChild_wed: UntypedFormControl = new UntypedFormControl();
    inputChangeChild_thu: UntypedFormControl = new UntypedFormControl();
    inputChangeChild_fri: UntypedFormControl = new UntypedFormControl();
    inputChangeChild_sat: UntypedFormControl = new UntypedFormControl();
    inputChangeChild_sun: UntypedFormControl = new UntypedFormControl();
    dataChild: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    inputChangeParent: UntypedFormControl = new UntypedFormControl();
    inputChangeParent_date: UntypedFormControl = new UntypedFormControl();
    inputChangeParent_m: UntypedFormControl = new UntypedFormControl();
    inputChangeParent_tu: UntypedFormControl = new UntypedFormControl();
    inputChangeParent_wed: UntypedFormControl = new UntypedFormControl();
    inputChangeParent_thu: UntypedFormControl = new UntypedFormControl();
    inputChangeParent_fri: UntypedFormControl = new UntypedFormControl();
    inputChangeParent_sat: UntypedFormControl = new UntypedFormControl();
    inputChangeParent_sun: UntypedFormControl = new UntypedFormControl();
    dataparent: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    hideSubmit: boolean = false
    hideSave: boolean = false
    complete: boolean = false
    tagtypeDefault: number = null
    index: number = 1
    indexChild: number = 1
    indexParent: number = 1
    dropdownSettings = DropdownSettings
    systemSettings = SystemSettings
    protected _onDestroy = new Subject<void>();
    sunday: number = 0
    id: string;
    dataDays = new ShiftDays;
    @ViewChild('TableEmployee') TableEmployee: MatTable<any>;
    dataEmployee = [];
    emplopyeeColumns: string[] = ['employeeCode', 'displayName'];
    @ViewChild('TableDate') TableDate: MatTable<any>;
    dataDate = [];
    childindex = 0
    childindexs = 0
    dateColumns: string[] = ['date', 'day', 'shift'];
    pipe = new DatePipe('en-US');
    timererror = false
    old_value = 0
    field_count = 0
    resultHierarchy = new SearchHierarchy;
    request = new TableRequest()
    totalRows = 0
    dropdownRequestsub = new DropdownRequest
    excludeEmp = []
    datelist = []
    datelistchild = []

    @ViewChild('shiftTable') shiftTable: MatTable<any>;
    weekOptions = [{ dropdownID: 1, description: "No" }, { dropdownID: 2, description: "Two Week" }, { dropdownID: 3, description: "Three Week" }, { dropdownID: 4, description: "Four Week" }]
    columns: string[] = ['apply', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    dataSource = [{
        apply: { id: null, child: [], option: [] },
        monday: { id: null, child: [], option: [] },
        tuesday: { id: null, child: [], option: [] },
        wednesday: { id: null, child: [], option: [] },
        thursday: { id: null, child: [], option: [] },
        friday: { id: null, child: [], option: [] },
        saturday: { id: null, child: [], option: [] },
        sunday: { id: null, child: [], option: [] },
    }]
    dataSource01 = []
    isSave: boolean = true
    child_list = []
    defaultTag = [{ id: [0], type: -4 }]
    prevModule = ""
    enableAdd: boolean = true
    hidesubmits: boolean = false
    failedMessage = { ...FailedMessage }
    constructor(
        private fb: FormBuilder,
        private coreService: CoreService,
        private tenantService: TenantService,
        private masterService: MasterService,
        private shiftService: ShiftService,
        private route: ActivatedRoute,
        private message: FuseConfirmationService,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.prevModule = sessionStorage.getItem('moduleId')
        this.id = this.route.snapshot.paramMap.get('id');
        this.scheduleDayForm = this.fb.group(new EmployeeSchedulePerDayTag());
        this.scheduleDayForm.disable()
        // this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })

        this.setdate1year()

        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 50 })
        if (this.id !== "") {
            var action = sessionStorage.getItem("action")

            this.hideSubmit = true
            this.hidesubmits = false
            this.shiftService.getEmployeeScheduleTagPerday(this.id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        value.payload.shiftDays.forEach((ee, ii) => {
                            ee["apply"] = { id: null, child: [] }
                        });

                        this.scheduleDayForm.patchValue(JSON.parse(JSON.stringify(value.payload).replace(/\:null/gi, "\:[]")))
                        this.tagtypeDefault = value.payload.tagTypeId
                        this.dataEmployee = value.payload.employee
                        // this.dataDate = value.payload.date

                        this.dataSource = value.payload.shiftDays
                        this.scheduleDayForm.disable()

                        var obj = ["apply", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

                        value.payload.shiftDays.forEach(ee => {
                            obj.forEach(col => {
                                this.old_value !== ee[col].id ? this.setDropdownRequest(ee[col].id) : null

                                ee[col].child.forEach(child => {
                                    child.length == 0 ? null : this.setDropdownRequest(child.id)
                                });

                            });
                        });

                        value.payload.date.forEach((sub, ii) => {
                            if (!GF.IsEmpty(sub.subShifts)) {
                                //   this.dropdownRequest.id.push({ dropdownID: sub.subShifts[1], dropdownTypeID: 0 })
                                sub.subShifts.forEach((shift, ee) => {
                                    this.dropdownRequest.id.push({ dropdownID: shift.shiftId, dropdownTypeID: 0 })
                                });
                            }
                        });

                        this.dropdownRequest.id = _.uniqBy([...this.dropdownRequest.id, ...this.dropdownRequest.id], JSON.stringify);


                        this.initData()

                        var shiftimclude = [2, 3, 6]
                        var shiftimclude = [2, 3, 6]
                        setTimeout(() => {
                            this.dataDate = value.payload.date.map(x => ({
                                date: x.date,
                                shiftId: { id: x.shiftId, child: shiftimclude.includes(x.shiftId) ? x.subShifts?.map(x => ({ id: x.shiftId, options: this.datelistchild })) : [] },
                                day: x.day,
                                shiftName: x.shiftName = "",
                            }))
                        }, 3000);
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
        else {
            this.hidesubmits = true
            this.emplopyeeColumns.push("action")
            this.dateColumns.push("action")
            this.dataSource
            this.initData()
        }
    }

    get currentModule() {
        var mgmt = GF.IsEqual(sessionStorage.getItem('moduleId'), ['40'])
        this.defaultTag = mgmt ? [{ id: [0], type: -2 }, { id: [], type: -3 }, { id: [], type: 36 }, { id: [], type: -4 }] : []
        if (!GF.IsEqual(this.prevModule, [sessionStorage.getItem('moduleId')])) {
            this.prevModule = sessionStorage.getItem('moduleId')
            this.dataSource = []
        }
        return mgmt;
    }


    handlePageEvent(e) {
        console.log(e)
        this.request.Start = e.pageIndex
        this.request.Length = e.pageSize
        this.handleAddSearch('next')
    }

    setDropdownRequest(id) {
        id !== null ? this.dropdownRequest.id.push({ dropdownID: id, dropdownTypeID: 0 }) : null
        this.old_value = id
    }

    getdropdownperday(e,i,x,day){
        if (x == 0) {
            (this.dropdownRequest as any).prevShiftId = e[day].child[i].id
        this.dropdownRequest

        forkJoin({
            shift: this.shiftService.getShiftPerDayDropdown(this.dropdownRequest),
            dropdownMaster: this.masterService.getDropdownFix(this.dropdownFixRequest),

        }).subscribe({
            next: (response) => {
                this.dropdownOptions.shiftCodeDef = response.shift.payload
                this.optionsChild = this.dropdownOptions.shiftCodeDef.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                && item.dropdownID != 6 && item.dropdownID != 1)

                var parents = ["apply", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",]
                if (day == "apply") {
                    Object.keys(this.dataSource[i]).forEach(key => {
                        let elem = this.dataSource[i][key];
                        parents.forEach((p) => {
                            elem.option = this.optionsParent
                            elem.child[1].option = this.optionsChild
                        });
                    });
                }else{
                    this.dataSource[i][day].child[1].option = this.optionsChild
                }

            }
        })
        }
    }

    initData() {
        forkJoin({
            shift: this.shiftService.getShiftPerDayDropdown(this.dropdownRequest),
            shiftparent: this.shiftService.getShiftPerDayDropdown(this.dropdownRequest),
            dropdownMaster: this.masterService.getDropdownFix(this.dropdownFixRequest),

        }).subscribe({
            next: (response) => {

                this.dropdownOptions.shiftCodeDef = response.shift.payload
                var oldparentlist = this.dropdownOptions.shiftCodeDef
                // =========parent==============
                this.optionsParent = this.dropdownOptions.shiftCodeDef.filter(item => item.dropdownID && item.dropdownID)
                this.dataparent.next(this.optionsParent)
                this.datelist = this.optionsParent
                // =========child==============
                this.optionsChild = this.dropdownOptions.shiftCodeDef.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                && item.dropdownID != 6 && item.dropdownID != 1)
                this.dataChild.next(this.optionsChild)
                this.datelistchild = this.optionsChild
                // ==========parent/child===========
                var parents = ["apply", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",]
                // if (this.dataSource[0].monday.id == 3 || this.dataSource[0].monday.id == 4 || this.dataSource[0].monday.id == 5 || this.dataSource[0].monday.id ==  1) {
                this.dataSource.forEach(elem => {
                    parents.forEach(p => {
                        elem[p].option = this.optionsParent
                        if (GF.IsEmpty(elem[p].child) && (elem[p].id == 3 || elem[p].id == 2 || elem[p].id == 6)) {
                            var op = {
                                option: this.optionsChild
                            }
                            elem[p].child.push(op)
                        } else {
                            elem[p].child.forEach(ch => {
                                ch.option = this.optionsChild
                            });
                        }
                    });
                });
                // }


                this.dropdownOptions.tagTypeDef = response.dropdownMaster.payload.filter(x => x.dropdownTypeID === 50)


            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
                this.scheduleDayForm.enable()

                this.inputChange.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearch();
                        });

                // =============Child===============
                this.inputChangeChild_date.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild(8)
                        });
                // ---apply to all---
                this.inputChangeChild.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild(0)
                        });
                // ---monday---
                this.inputChangeChild_m.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild(1)
                        });
                // ---tuesday---
                this.inputChangeChild_tu.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild(2)
                        });
                // ---wednesday---
                this.inputChangeChild_wed.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild(3)
                        });
                // ---thursday---
                this.inputChangeChild_thu.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild(4)
                        });
                // ---friday---
                this.inputChangeChild_fri.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild(5)
                        });
                // ---saturday---
                this.inputChangeChild_sat.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild(6)
                        });
                // ---sunday---
                this.inputChangeChild_sun.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild(7)
                        });

                // ==============parent=================

                // ---apply to all---
                this.inputChangeParent.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent(0)
                        });

                this.inputChangeParent_date.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent(8)
                        });

                // ---monday---
                this.inputChangeParent_m.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent(1)
                        });
                // ---tuesday---
                this.inputChangeParent_tu.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent(2)
                        });
                // ---wednesday---
                this.inputChangeParent_wed.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent(3)
                        });
                // ---thursday---
                this.inputChangeParent_thu.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent(4)
                        });
                // ---friday---
                this.inputChangeParent_fri.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent(5)
                        });
                // ---saturday---
                this.inputChangeParent_sat.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent(6)
                        });
                // ---sunday---
                this.inputChangeParent_sun.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent(7)
                        });
            },
        });
    }


    ngOnDestroy(): void {
        this._onDestroy.unsubscribe()
    }

    returnList(i, obj) {
        return this.optionsParent[i]?.[obj] || []
    }

    async handleAddSearch(action) {

        if (this.validatechild() || this.validateparent()) {

        }else{
            this.dataSource
        console.log(this.dataSource)
        if (action == 'add') {
            this.excludeEmp = []
        }

        var tag = this.resultHierarchy.Search[this.resultHierarchy.Search.length - 1]
        if (GF.IsEmpty(tag?.Key)) {
            this.failedMessage.message = "Please Select Tag type"
            this.message.open(this.failedMessage);
            return
        }
        var tagType
            = tag.Key == "BranchID" ? 102
                : tag.Key == "SubCompanyID" ? 103
                    : tag.Key == "DepartmentID" ? 90
                        : tag.Key == "OccupationID" ? 37
                            : tag.Key == "EmployeeID" ? 89
                                : tag.Key == "SupervisorID" ? -3
                                    : tag.Key == "Hierarchy" ? 132
                                        : tag.Key == "EmployeeStatusID" ? 36
                                            : 0

        if (this.currentModule) {

            var branch = this.resultHierarchy.Search.find(x => x.Key == "BranchID")
            var supervisor = this.resultHierarchy.Search.find(x => x.Key == "SupervisorID")
            var employee = this.resultHierarchy.Search.find(x => x.Key == "EmployeeID")

            if (GF.IsEmpty(branch) || GF.IsEmpty(supervisor) || GF.IsEmpty(employee)) {
                this.failedMessage.message = "please select supervisor and employee"
                this.message.open(this.failedMessage);
                return
            }
        }

        this.request.SearchColumn = []
        var datefrom = this.scheduleDayForm.value.dateFrom
        var dateto = this.scheduleDayForm.value.dateTo

        if (GF.IsEmpty(datefrom) || GF.IsEmpty(dateto)) {
            this.failedMessage.message = "Date From and Date To should not empty!"
            this.message.open(this.failedMessage);
            return
        }

        this.request.SearchColumn.push({
            "key": "DateFrom",
            "value": this.pipe.transform(this.scheduleDayForm.value.dateFrom, "yyyy-MM-dd"),
            "type": 4
        })
        this.request.SearchColumn.push({
            "key": "DateTo",
            "value": this.pipe.transform(this.scheduleDayForm.value.dateTo, "yyyy-MM-dd"),
            "type": 5
        })

        this.resultHierarchy.Search.forEach(ee => {
            ee.Value.forEach(ii => {
                this.request.SearchColumn.push({
                    "key": ee.Key,
                    "value": ii + "",
                    "type": 2
                })
            });
        });

        this.scheduleDayForm.get("request").setValue(this.request)
        this.scheduleDayForm.get("tagType").setValue(tagType)
        this.scheduleDayForm.get("tagTypeId").setValue(tag.Value)
        this.scheduleDayForm.get("EmployeeExclude").setValue(this.excludeEmp)
        this.scheduleDayForm.markAllAsTouched();
        if (this.scheduleDayForm.valid) {
            this.scheduleDayForm.controls.employeeSchedulePerDayShiftDay.patchValue(this.dataSource);
            this.shiftService.getShiftCodePerDayMap(this.scheduleDayForm.value).subscribe({
                next: async (value: any) => {
                    if (value.statusCode == 200) {
                        var validate = [2, 3, 6]

                        this.dataDate = await value.payload.date.map(x => ({
                            date: x.date,
                            shiftId: { id: x.shiftId, child: validate.includes(x.shiftId) ? x.subShifts.map(x => ({ id: x.shiftId, options: _.uniqBy([...this.datelistchild, ...this.optionsChild], JSON.stringify) })) : [] },
                            day: x.day,
                        }))


                        //Load shift code on Date Tab
                        var request = new DropdownRequest;
                        this.dataDate.forEach(lists => {
                            // if (!request.id.some(x => x.dropdownID === lists.shiftId.id)) {
                            //     request.id.push({ dropdownID: lists.shiftId.id, dropdownTypeID: 0 })
                            // }

                            if (lists.shiftId.id != 6) {
                                if (!request.id.some(x => x.dropdownID === lists.shiftId.id)) {
                                    request.id.push({ dropdownID: lists.shiftId.id, dropdownTypeID: 0 })
                                }
                            } else {
                                lists.shiftId.child.forEach(childs => {
                                    request.id.push({ dropdownID: childs.id, dropdownTypeID: 0 })
                                })
                            }

                        });

                        var uniqrequest = _.uniqBy(request.id, 'dropdownID');
                        request.id = uniqrequest
                        var listt = await this.getShift(request)
                        this.datelist = listt["payload"]

                        this.datelistchild = listt["payload"].filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                        && item.dropdownID != 6 && item.dropdownID != 1)

                        // this.dataDate = await value.payload.date.map(x => ({
                        //     date: x.date,
                        //     shiftId: { id: x.shiftId, child: validate.includes(x.shiftId) ? x.subShifts.map(x => ({ id: x.shiftId, options: this.datelistchild })) : [] },
                        //     day: x.day,
                        // }))

                        this.dataDate = this.dataDate

                        this.dataEmployee = value.payload.employee //.filter(x => !this.excludeEmp.includes(x.employeeId))
                        this.totalRows = value.payload.totalRows

                        this.TableDate.renderRows();
                        this.TableEmployee.renderRows();

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
    }

    nextBatch() {
        var request = new DropdownRequest;
        this.dropdownRequest['prevShiftId']
        this.dropdownRequest['nextShiftId']
        var list = this.getShift(request)
        this.datelist = [...this.datelist, ...list["payload"]]
        this.datelistchild = [...this.datelistchild, ...list["payload"]]

    }

    handleApply(event, index) {

        var days = ["apply", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        days.forEach(day => {
            this.dataSource[index][day].id = event
            this.change(index, day)
        });

        // this.dataSource01 = this.dataSource

    }

    handleApplychild(event, x, i) {
        var days = ["apply", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        days.forEach(day => {
            this.dataSource[i][day].child[x].id = event
        });
    }

    change(index, day) {

        if (this.dataSource[index][day].id !== 0 || this.dataSource[index][day].id !== null) {

            this.enableAdd = false
            this.hidesubmits = true
        }
        this.dataSource[index][day].child = []
        if (this.dataSource[index][day].id == 6) {
            this.dataSource[index][day].child.push({ id: null, option: this.optionsChild }, { id: null, option: [] })
        } else if (this.dataSource[index][day].id == 2) {
            this.dataSource[index][day].child.push({ id: null, option: this.optionsChild })
        } else if (this.dataSource[index][day].id == 3) {
            this.dataSource[index][day].child.push({ id: null, option: this.optionsChild })
        }
        // this,this.initDadatata()
        // this.shiftTable.renderRows();
    }

    datechange(index, day) {

        this.datelistchild = this.datelistchild.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
        && item.dropdownID != 6 && item.dropdownID != 1)

        this.dataDate[index][day].child = []
        if (this.dataDate[index][day].id == 2) {
            this.dataDate[index][day].child.push({ id: null, options: this.datelistchild })
        } else if (this.dataDate[index][day].id == 6) {
            this.dataDate[index][day].child.push({ id: null, options: this.datelistchild }, { id: null, options: this.datelistchild })
        } else if (this.dataDate[index][day].id == 3) {
            this.dataDate[index][day].child.push({ id: null, options: this.datelistchild })
        }
    }


    handlerWeekChange() {
        this.dataSource = []
        console.log()
        for (let i = 0; i <= this.scheduleDayForm.value.weekCount - 1; i++) {
            this.dataSource.push({

                apply: { id: null, child: [], option: [] },
                monday: { id: null, child: [], option: [] },
                tuesday: { id: null, child: [], option: [] },
                wednesday: { id: null, child: [], option: [] },
                thursday: { id: null, child: [], option: [] },
                friday: { id: null, child: [], option: [] },
                saturday: { id: null, child: [], option: [] },
                sunday: { id: null, child: [], option: [] },


            })
        }

        this.dropdownRequest = new DropdownRequest

        this.initData()
        //   this.shiftTable.renderRows();
    }

    handlerSearchChild(e) {

        this.indexChild = 0
        // const search = this.inputChangeChild.value.toLowerCase()
        const search = e == 0 ? this.inputChangeChild.value.toLowerCase() :
            e == 1 ? this.inputChangeChild_m.value.toLowerCase() :
                e == 2 ? this.inputChangeChild_tu.value.toLowerCase() :
                    e == 3 ? this.inputChangeChild_wed.value.toLowerCase() :
                        e == 4 ? this.inputChangeChild_thu.value.toLowerCase() :
                            e == 5 ? this.inputChangeChild_fri.value.toLowerCase() :
                                e == 6 ? this.inputChangeChild_sat.value.toLowerCase() :
                                    e == 7 ? this.inputChangeChild_sun.value.toLowerCase() :
                                        e == 8 ? this.inputChangeChild_date.value.toLowerCase() :
                                            0
        if (!search) {
            this.dataChild.next(this.optionsChild)

            this.datelist = _.uniqBy([...this.datelist, ...this.optionsChild], JSON.stringify)

            this.datelistchild = this.datelist.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                 && item.dropdownID != 6 && item.dropdownID != 1)

            this.dataDate[this.childindex].shiftId.child[this.childindexs].options = this.datelistchild
        } else {

            this.dropdownRequest.search = search
            this.dropdownRequest.start = 0
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })

            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {
                    this.optionsChild = _.uniqBy([...value.payload, ...this.optionsChild], JSON.stringify)
                    this.optionsChild = this.optionsChild.filter(item => item.dropdownID != 3 && item.dropdownID != 2)

                    this.datelistchild = _.uniqBy([...value.payload], JSON.stringify)
                    this.datelistchild = this.datelistchild.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                    && item.dropdownID != 6 && item.dropdownID != 1)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.dataChild.next(this.optionsChild.filter(x => x.description.toLowerCase().indexOf(search) > -1));

                    var parents = ["apply", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",]

                    this.dataSource.forEach(elem => {
                        parents.forEach(p => {
                            elem[p].child.forEach(ch => {
                                ch.option = this.optionsChild
                            });
                        });
                    });

                    this.dataDate[this.childindex].shiftId.child[this.childindexs].options = this.datelistchild
                },
            });
            // }
        }
    }

    childdata(i, x) {
        this.indexChild = 1
        this.complete = false
        this.childindex = i
        this.childindexs = x
    }

    getNextBatchChild(e) {
        console.log(this.optionsChild)
        // if (!this.complete) {
        //     const search = this.inputChangeChild.value?.toLowerCase()
        if (!this.complete) {
            // const search = this.inputChangeParent.value?.toLowerCase()
            const search = e == 0 ? this.inputChangeChild.value?.toLowerCase() :
                e == 1 ? this.inputChangeChild_m.value?.toLowerCase() :
                    e == 2 ? this.inputChangeChild_tu.value?.toLowerCase() :
                        e == 3 ? this.inputChangeChild_wed.value?.toLowerCase() :
                            e == 4 ? this.inputChangeChild_thu.value?.toLowerCase() :
                                e == 5 ? this.inputChangeChild_fri.value?.toLowerCase() :
                                    e == 6 ? this.inputChangeChild_sat.value?.toLowerCase() :
                                        e == 7 ? this.inputChangeChild_sun.value?.toLowerCase() :
                                            e == 8 ? this.inputChangeChild_date.value?.toLowerCase() :
                                                0

            if (search) {
                this.dropdownRequest.search = search
            }
            this.dropdownRequest.search = null
            this.dropdownRequest.start = this.indexChild++
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
            this.dropdownRequest['subShiftId']
            this.dropdownRequest['nextshitId']
            this.dropdownRequest['prevshitId']


            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {
                    this.optionsChild = _.uniqBy([...this.optionsChild, ...GF.FilterNotEqual(value.payload, "dropdownID", [1, 2, 3, 4, 6])], JSON.stringify)
                    // this.optionsChild = this.optionsChild.filter(item => item.dropdownID != 3 && item.dropdownID != 2)

                    this.datelistchild = _.uniqBy([...this.datelist, ...value.payload], JSON.stringify)
                    this.datelistchild = this.datelistchild.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                    && item.dropdownID != 6 && item.dropdownID != 1)

                    this.completeChecker(value.payload)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    // this.dataChild.next(this.optionsChild);
                    this.dataChild.next(this.optionsChild.filter(x => x.description.toLowerCase().indexOf(search) > -1));

                    var parents = ["apply", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",]

                    this.dataSource.forEach(elem => {
                        parents.forEach(p => {
                            elem[p].child.forEach(ch => {
                                // ch.option = this.optionsChild
                                ch.option = _.uniqBy([...ch.option, ...this.optionsChild], JSON.stringify)
                            });
                        });
                    });

                    this.dataDate[this.childindex].shiftId.child[this.childindexs].options = this.datelistchild
                },
            });
        }
    }

    handlerSearcParent(e) {

        var vals = ["inputChangeParent", "inputChangeParent_m", "inputChangeParent_tu", "inputChangeParent_wed", "inputChangeParent_thu", "inputChangeParent_fri", "inputChangeParent_sat", "inputChangeParent_sun", "inputChangeParent_date",]
        const search = this[vals[e]].value.toLowerCase()

        if (!search) {

            var week = ["apply", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
            if (e == 8) {
                this.datelist = _.uniqBy([...this.dropdownOptions.shiftCodeDef, ...this.datelist], JSON.stringify)
                this.datelist = this.datelist.filter(item => item.dropdownID && item.dropdownID)

                this.datelistchild = _.uniqBy([...this.dropdownOptions.shiftCodeDef, ...this.datelistchild], JSON.stringify)
                this.datelistchild = this.datelistchild.filter(item => item.dropdownID && item.dropdownID)

            } else {

                this.dataSource.forEach(elem => {
                    elem[week[e]].option = _.uniqBy([...this.dropdownOptions.shiftCodeDef, ...elem[week[e]].option], JSON.stringify)
                });
            }
        }
        else {
            this.dropdownRequest.search = search
            this.dropdownRequest.start = 0
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {

                    if (e == 8) {
                        this.datelist = _.uniqBy([...value.payload, ...this.datelist], JSON.stringify)
                        this.datelist = this.datelist.filter(item => item.dropdownID && item.dropdownID)

                        this.datelistchild = _.uniqBy([...value.payload, ...this.datelistchild], JSON.stringify)
                        this.datelistchild = this.datelistchild.filter(item => item.dropdownID && item.dropdownID)
                    } else {
                        this.optionsParent = _.uniqBy([...value.payload, ...this.optionsParent], JSON.stringify)
                        this.optionsParent = this.optionsParent.filter(item => item.dropdownID && item.dropdownID)
                    }

                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {

                    this.dataparent.next(this.optionsParent.filter(x => x.description.toLowerCase().indexOf(search) > -1));

                    this.dataSource.forEach(elem => {
                        elem.apply.option = this.optionsParent
                        elem.monday.option = this.optionsParent
                        elem.tuesday.option = this.optionsParent
                        elem.wednesday.option = this.optionsParent
                        elem.thursday.option = this.optionsParent
                        elem.friday.option = this.optionsParent
                        elem.saturday.option = this.optionsParent
                        elem.sunday.option = this.optionsParent
                    });

                },
            });
            // }
        }
    }

    hasData() {
        if (!GF.IsEmpty(this.dataSource)) {
            var source = []
            var p = ["apply", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
            this.dataSource.forEach(elem => {
                p.forEach(day => {
                    if (elem[day].child.length > 0) {
                        source = elem[day].child[0].option
                    } else {
                        source = elem[day].option
                    }
                });

            });
            return source
        }
    }

    getNextBatchParent(e) {
        if (!this.complete) {
            // const search = this.inputChangeParent.value?.toLowerCase()
            const search = e == 0 ? this.inputChangeParent.value?.toLowerCase() :
                e == 1 ? this.inputChangeParent_m.value?.toLowerCase() :
                    e == 2 ? this.inputChangeParent_tu.value?.toLowerCase() :
                        e == 3 ? this.inputChangeParent_wed.value?.toLowerCase() :
                            e == 4 ? this.inputChangeParent_thu.value?.toLowerCase() :
                                e == 5 ? this.inputChangeParent_fri.value?.toLowerCase() :
                                    e == 6 ? this.inputChangeParent_sat.value?.toLowerCase() :
                                        e == 7 ? this.inputChangeParent_sun.value?.toLowerCase() :
                                            e == 8 ? this.inputChangeParent_date.value?.toLowerCase() :
                                                0

            // child ===============



            if (search) {
                this.dropdownRequest.search = search
            }
            this.dropdownRequest.search = null
            this.dropdownRequest.start = this.indexParent++
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })


            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {
                    this.optionsParent = _.uniqBy([...this.optionsParent, ...value.payload], JSON.stringify)
                    this.optionsParent = this.optionsParent.filter(item => item.dropdownID && item.dropdownID)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    // this.dataparent.next(this.optionsParent);
                    this.dataSource.forEach(elem => {
                        elem.apply.option = this.optionsParent
                        elem.monday.option = this.optionsParent
                        elem.tuesday.option = this.optionsParent
                        elem.wednesday.option = this.optionsParent
                        elem.thursday.option = this.optionsParent
                        elem.friday.option = this.optionsParent
                        elem.saturday.option = this.optionsParent
                        elem.sunday.option = this.optionsParent
                        elem.sunday.option = this.optionsParent
                    });
                    this.datelist = _.uniqBy([...this.datelist, ...this.optionsParent], JSON.stringify)
                    this.datelistchild = _.uniqBy([...this.datelistchild, ...this.optionsParent], JSON.stringify)
                },
            });
        }
    }


    handlerSearch() {
        const search = this.inputChange.value.toLowerCase()
        if (!search) {
            this.data.next(this.options)
        } else {
            if (this.options.filter(x => x.description.toLowerCase().indexOf(search) > -1).length > 0) {
                this.data.next(this.options.filter(x => x.description.toLowerCase().indexOf(search) > -1));
            }
            else {
                this.dropdownRequest.search = search
                this.dropdownRequest.id = []
                this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: this.type })

                this.tenantService.getDropdown(this.dropdownRequest).subscribe({
                    next: (value: any) => {
                        this.options = _.uniqBy([...this.options, ...value.payload], JSON.stringify)
                    },
                    error: (e) => {
                        console.error(e)
                    },
                    complete: () => {
                        this.data.next(this.options.filter(x => x.description.toLowerCase().indexOf(search) > -1));
                    },
                });
            }
        }
    }

    getNextBatch() {
        if (!this.complete) {
            this.dropdownRequest.search = null
            this.dropdownRequest.start = this.index++
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: this.type })


            switch (this.scheduleDayForm.get("tagType").value) {
                case 102:
                    this.placeholder = "Branch"
                    this.type = 1001
                    this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
                    this.tenantService.getBranchDropdown(this.dropdownRequest).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.completeChecker(value.payload)
                                this.options = _.uniqBy([...this.options, ...value.payload], JSON.stringify)
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
                    break;
                case 103:
                    this.placeholder = "Company"
                    this.type = 1001
                    this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
                    this.masterService.getCompany().subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.completeChecker(value.payload)
                                this.options = _.uniqBy([...this.options, ...value.payload], JSON.stringify)
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

                    break;
            }
        }
    }

    completeChecker(option): void {
        if (this.dropdownSettings.length > option.length) {
            this.complete = true
        }
        else {
            this.complete = false
        }
    }

    handleEmployeeRemove(e, i): void {

        this.excludeEmp.push(e)
        this.dataEmployee.splice(i, 1);
        this.TableEmployee.renderRows();
    }

    handleDayRemove(index): void {

        this.dataDate.splice(index, 1);
        this.TableDate.renderRows();
    }

    handlerChange() {
        this.dropdownOptions.dropdownNameDef = []
        this.scheduleDayForm.get("tagTypeId").setValue(null)
        this.scheduleDayForm.controls['tagTypeId'].disable();
        this.dropdownRequest = new DropdownRequest()
        switch (this.scheduleDayForm.get("tagType").value) {
            case 102:
                this.placeholder = "Branch"
                this.type = 1001
                this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
                this.tenantService.getBranchDropdown(this.dropdownRequest).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.options = value.payload
                            this.data.next(value.payload.slice());
                            if (!this.hideSubmit) {
                                this.scheduleDayForm.controls['tagTypeId'].enable();
                            }
                            this.scheduleDayForm.get('tagTypeId').setValue(this.tagtypeDefault);
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
                break;
            case 103:
                this.placeholder = "Company"
                this.type = 1001
                this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
                this.masterService.getCompany().subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.options = [{ dropdownID: value.payload.companyId, description: value.payload.companyName }]
                            this.data.next([{ dropdownID: value.payload.companyId, description: value.payload.companyName }]);
                            if (!this.hideSubmit) {
                                this.scheduleDayForm.controls['tagTypeId'].enable();
                            }
                            this.scheduleDayForm.get('tagTypeId').setValue(this.tagtypeDefault);
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
                break;
            case 90:
                this.placeholder = "Department"
                this.type = 1001
                this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 38 })
                this.tenantService.getDropdown(this.dropdownRequest).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.options = value.payload
                            this.data.next(value.payload);
                            if (!this.hideSubmit) {
                                this.scheduleDayForm.controls['tagTypeId'].enable();
                            }
                            this.scheduleDayForm.get('tagTypeId').setValue(this.tagtypeDefault);
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
                break;
            case 89:
                this.placeholder = "Employee"
                this.type = 1001
                this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
                this.userService.getEmployeeDropdown(this.dropdownRequest).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.options = value.payload
                            this.data.next(value.payload);
                            if (!this.hideSubmit) {
                                this.scheduleDayForm.controls['tagTypeId'].enable();
                            }
                            this.scheduleDayForm.get('tagTypeId').setValue(this.tagtypeDefault);
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
                break;
        }
    }

    submit() {
        this.hidesubmits = false

        if (this.validatechild()) {
            this.failedMessage.message = "Subshift is required"
            this.message.open(this.failedMessage);
            this.hidesubmits = true
            return
        }else if(this.validateparent()){
            this.failedMessage.message = "Shift is required"
            this.message.open(this.failedMessage);
            this.hidesubmits = true
            return
        }

        if (this.dataEmployee.length > 0) {

            if (this.scheduleDayForm.valid) {
                const dialogRef = this.message.open(SaveMessage);

                dialogRef.afterClosed().subscribe((result) => {
                    if (result == "confirmed") {

                        var datadatedup = this.dataDate.map(x => ({
                            date: x.date,
                            day: x.day,
                            shiftId: x.shiftId.id,
                            shiftName: x.shiftName = "",
                            // subShifts : x.shiftId.child.map(x => x.id)

                            subShifts: x.shiftId.child.length == 0 ? [{
                                date: x.date,
                                shiftId: x.shiftId.id
                            }]
                                : x.shiftId.child.map(y => ({
                                    date: x.date,
                                    shiftId: y.id
                                }))
                        }))


                        this.scheduleDayForm.controls.employeeSchedulePerDayTagEmployee.patchValue(this.dataEmployee);
                        this.scheduleDayForm.controls.employeeSchedulePerDayTagDate.patchValue(datadatedup);
                        this.scheduleDayForm.controls.employeeSchedulePerDayShiftDay.patchValue(this.dataSource);
                        this.scheduleDayForm.controls.EmployeeExclude.patchValue(this.excludeEmp);
                        this.scheduleDayForm.markAllAsTouched();

                        this.isSave = true
                        console.log(JSON.stringify(this.scheduleDayForm.value))
                        this.shiftService.postEmployeeShiftPerDay(this.scheduleDayForm.value).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    this.message.open(SuccessMessage);
                                    this.router.navigate(['/search/employee-schedule']);
                                    this.isSave = false
                                }
                                else if(value.statusCode == 409){
                                    this.hidesubmits = false
                                    this.failedMessage.message = value.message
                                    this.message.open(this.failedMessage);
                                    console.log(value.stackTrace)
                                    console.log(value.message)
                                    this.isSave = false
                                    this.hidesubmits = true
                                }
                                else {
                                    this.hidesubmits = false
                                    // this.dataDate = this.dataDate = this.dataDate.map(x => ({ // for displaying only
                                    //     date : x.date,
                                    //     shiftId : {id : x.shiftId, child : x.subShifts.map(x => ({id : x}))} ,
                                    //     day : x.day,
                                    // }))
                                    this.message.open(FailedMessage);
                                    console.log(value.stackTrace)
                                    console.log(value.message)
                                    this.isSave = false
                                    this.hidesubmits = true
                                }
                            },
                            error: (e) => {
                                this.hidesubmits = true
                                this.message.open(FailedMessage);
                                console.error(e)
                            }
                        });
                    } else {
                        this.hidesubmits = true
                        // this.dataDate = this.dataDate = this.dataDate.map(x => ({ // for displaying only
                        //     date: x.date,
                        //     shiftId: { id: x.shiftId, child: x.subShifts.map(x => ({ id: x })) },
                        //     day: x.day,
                        // }))
                    }
                });
            }
        }
    }

    timeValidator(day, i, x) {
        this.timererror = false
        if (x == 0) {
            return
        }

        var timestart0 = this.dropdownOptions.shiftCodeDef.filter(item => item.dropdownID == this.dataSource[i][day]["child"][0].id)[0].timeOut
        var timeout1 = this.dropdownOptions.shiftCodeDef.filter(item => item.dropdownID == this.dataSource[i][day]["child"][1].id)[0].timeIn


        const timestart = this.pipe.transform(timestart0, 'HH:mm')//1st shift out
        const timeout = this.pipe.transform(timeout1, 'HH:mm')//2nd shift in
        console.log(timestart)
        console.log(timeout)



        console.log(timestart)
        console.log(timeout)

        let f_out = [];
        let s_in = [];
        f_out = timestart.split(':');
        s_in = timeout.split(':');
        //   console.log(timeout)
        if (parseInt(f_out[0]) > parseInt(s_in[0])) {
            // invalidtime.message= "Second Shift"+" time overlap in "+"First Shift"+" time!"
            //     this.timererror= true
            //     this.dataSource[i][day]["child"][1].id=null

        } else if (parseInt(f_out[0]) === parseInt(s_in[0]) && parseInt(f_out[1]) > parseInt(s_in[1])) {
            // this.timererror= true
            // this.dataSource[i][day]["child"][1].id=null

            //   console.log("Invalid time 1")
        }

    }

    // timeValidatorparent(prev,day,i) {

    //     if (i==0 && day == "wednesday") {
    //         return
    //     }


    //     var timestart3 = this.dropdownOptions.shiftCodeDef.filter(item=>item.dropdownID==this.dataSource[i][prev].id)[0].timeIn
    //     var timeout3 = this.dropdownOptions.shiftCodeDef.filter(item=>item.dropdownID==this.dataSource[i][day].id)[0].timeOut

    //     const timestart1 = this.pipe.transform(timestart3, 'HH:mm')
    //     const timeout2 = this.pipe.transform(timeout3, 'HH:mm')
    //     console.log(timestart3)
    //     console.log(timeout3)


    //       let f_out = [];
    //       let s_in = [];
    //       let c_out = [];
    //       f_out = timestart1.split(':');
    //       s_in = timeout2.split(':');

    //       if (parseInt(f_out[0]) > parseInt(s_in[0]) ) {
    //         const dialogRef = this.message.open(invalidtime);
    //         dialogRef.afterClosed().subscribe((result) => {
    //             this.dataSource[i][day].id=null
    //         })
    //       } else if (parseInt(f_out[0]) === parseInt(s_in[0]) && parseInt(f_out[1]) > parseInt(s_in[1])) {
    //         const dialogRef = this.message.open(invalidtime);
    //         this.dataSource[i][day].id=null

    //     }
    // }

    timeValidatorparent(prev, day, i, isPrev) {
        console.log(prev, day, i)
        var ii = i

        if (i == 0 && day == "monday") {
            return
        } else if (i >= 1 && day == "monday") {
            ii = (ii - 1)
        }

        if (this.dataSource[ii][prev].id == null || this.dataSource[i][day].id == null || this.dataSource[i][day].id == 1 || this.dataSource[i][day].id == 4
            || this.dataSource[i][day].id == 2 || this.dataSource[i][day].id == 3) {
            return
        }




    }
    selectAll(ev) {
        if (ev._selected) {
            this.scheduleDayForm.controls.tagTypeId.patchValue([...this.options.map(item => item.dropdownID)]);
            ev._selected = true;
        }
        if (ev._selected == false) {
            this.scheduleDayForm.get("tagTypeId").setValue([])
        }

    }

    // resetexcludeemp(){
    //

    // }

    async getShift(request): Promise<any> {
        try {
            const response = await this.shiftService.getShiftPerDayDropdown(request).toPromise();
            return response; // Return the response from the API call
        } catch (error) {
            console.error('Error in getShift:', error);
            throw error; // Rethrow the error for proper error handling
        }
    }

    clearSearch() {
        this.inputChangeChild_date.setValue('')
    }

    setdate1year() {
        this.minDate = this.scheduleDayForm.value.dateFrom == "" ? new Date() : new Date(this.scheduleDayForm.value.dateFrom);
        this.maxDate = new Date(new Date(this.minDate).setFullYear(this.minDate.getFullYear() + 1));
    }

    validatechild() {
        var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        var child = false;
        days.forEach(day => {
            if (!child) {
                child = this.dataSource.some(x => x[day].child.some(y => y.id == null))
            }
        });

        return child;
    }


    validateparent() {
        var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        var parent = false;
        days.forEach(day => {
            if (!parent) {
                parent = this.dataSource.some(x => x[day].id == null)
            }
        });

        return parent;
    }

}


