import { NGX_MAT_DATE_FORMATS, NgxMatDateAdapter, NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule, ThemePalette } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownOptions, DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { FilingService } from 'app/services/filingService/filing.service';
import { MasterService } from 'app/services/masterService/master.service';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';
import moment from 'moment';
import { forkJoin } from 'rxjs';

const CUSTOM_DATE_FORMATS = {
    parse: {
        dateInput: 'MM/DD/YYYY hh:mm A',
    },
    display: {
        dateInput: 'MM/DD/YYYY hh:mm A',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'MM/DD/YYYY HH:mm A',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};


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
    selector: 'app-pre-approve-ot',
    templateUrl: './pre-approve-ot.component.html',
    styleUrls: ['./pre-approve-ot.component.css'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_FORMATS,
        },
        { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
        { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    CardTitleComponent,
    MatDatepickerModule,
    EmployeeHierarchyComponent,
    MatOptionModule,
    MatIconModule,
    MatMenuModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    TranslocoModule
],
})
export class PreApproveOtComponent implements OnInit {
    public showSpinners = true;
    public showSeconds = false;
    public touchUi = false;
    public enableMeridian = false;
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;
    public hideTime = false;
    public color: ThemePalette = 'primary';
    resultHierarchy = new SearchHierarchy;
    isSave: boolean = false
    field_count = 0
    dataSource = [];
    dataSource2 = [];
    displayedColumns: string[] = ['action', 'date', 'emp_code', 'emp_name', 'shift', 'type', 'ot_type', 'duration', 'reason'];
    displayedColumnsrange: string[] = ['action', 'date', 'emp_code', 'emp_name', 'shift', 'type', 'ot_type', 'ot_start', 'ot_end', 'reason'];
    isLoadingResults: boolean = true;
    totalRows: number = 0
    request = new TableRequest()
    actionviewdisabled: boolean = false
    validationrequest : any
    validationrequestion : any
    dropdownOptions = new DropdownOptions
    dropdownFixRequest = new DropdownRequest
    dropdownRequest = new DropdownRequest
    dropdownRequestsub = new DropdownRequest
    by_range: number
    pipe = new DatePipe('en-US');
    preform: FormGroup
    mid: any
    tid: any
    failedMessage = { ...FailedMessage }
    successMessage = { ...SuccessMessage }
    overtimeTimingDef = []
    overtimeTimingDefdescription = []
    overtimeTypeDef = []
    datatabledate: any
    hidetable: boolean = false
    hidetablerange: boolean = false
    disableduration: boolean = false
    id: string
    disabledfield : boolean = false
    adddisabledfield : boolean = false
    shiftin: any
    shiftout: any
    schedin : any
    schedout : any
    action: string = ""
    encryids: string = ""
    disabledbutton : boolean = false
    tagoption : any
    postinterval : any = []
    preinterval : any = []
    postspecific : any = []
    prespecific : any = []
    @ViewChild('durationtable') durationtable: MatTable<any>;
    @ViewChild('range') range: MatTable<any>;
    defaultTag = [{ id: [0], type: -4 }]
    prevModule = ""
    late: boolean = false
    constructor(private filingService: FilingService, private route: ActivatedRoute, private masterService: MasterService, private message: FuseConfirmationService, private router: Router,private coreService : CoreService) {
        this.preform = new FormGroup({
            datefrom: new FormControl(''), // Initial value is an empty string
            dateto: new FormControl(''),
            time: new FormControl(''),
            employeeId: new FormControl(''),
        });
    }

    ngOnInit() {
        this.adddisabledfield = true
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id !== "") {
            this.action = sessionStorage.getItem("action")
            this.filingService.getPreApprovedOT(this.id).subscribe({

                next: (value: any) => {
                    if (value.statusCode == 200) {
                            if(this.action == 'view'){
                                this.disabledfield = true
                                this.adddisabledfield = false

                                this.dropdownFixRequest.id.push(
                                    { dropdownID: 0, dropdownTypeID: 52 },
                                    { dropdownID: 0, dropdownTypeID: 70 }
                                )
                                forkJoin({
                                    fix: this.masterService.getDropdownFix(this.dropdownFixRequest),
                                })
                                .subscribe({
                                    next: (response) => {

                                        this.overtimeTimingDef = response.fix.payload
                                        this.overtimeTypeDef = response.fix.payload
                                        // for description
                                        this.overtimeTimingDefdescription = response.fix.payload

                                        if (value.payload.isDuration == true) {
                                            this.preform.get('time').setValue(false)
                                            this.disableduration = true


                                            var source
                                            this.dataSource.push({
                                                action: [{ id: "" }],
                                                employeeId: [{ id: value.payload.employeeId }],
                                                date: [{ id: this.pipe.transform(value.payload.date, "MM-dd-yyyy") }],
                                                emp_code: [{ id: value.payload.employeeCode }],
                                                emp_name: [{ id: value.payload.displayName }],
                                                shift: [{ id: value.payload.shiftName }],
                                                type: [{ id: value.payload.overtimeTypeId , options:  response.fix.payload}],
                                                ot_type: [{ id: value.payload.timingId, options: response.fix.payload}],
                                                duration: [{ id: value.payload.duration }],
                                                reason: [{ id: value.payload.reason }],
                                                transactionId: [{ id: value.payload.overtimeId }],
                                                isDuration: [{ id: value.payload.isDuration }],
                                                shiftId: [{ id: value.payload.shiftId }],
                                                approved: [{ id: value.payload.approved }],
                                            })

                                            this.hidetable = true
                                            this.hidetablerange = false
                                            source = this.dataSource


                                        } else {
                                            this.preform.get('time').setValue(true)
                                            this.disableduration = true
                                            this.dataSource2.push({
                                                action: [{ id: "" }],
                                                employeeId: [{ id: value.payload.employeeId }],
                                                date: [{ id: this.pipe.transform(value.payload.date, "MM-dd-yyyy") }],
                                                emp_code: [{ id: value.payload.employeeCode }],
                                                emp_name: [{ id: value.payload.displayName }],
                                                shift: [{ id: value.payload.shiftName }],
                                                type : [{id : value.payload.overtimeTypeId, options:  response.fix.payload}],
                                                ot_type: [{ id: value.payload.timingId , options: response.fix.payload}],
                                                ot_start: [{ id: this.pipe.transform(value.payload.otStart, "yyyy-MM-ddTHH:mm:ss")}],
                                                ot_end: [{ id: this.pipe.transform(value.payload.otEnd, "yyyy-MM-ddTHH:mm:ss")}],
                                                reason: [{ id: value.payload.reason }],
                                                transactionId: [{ id: value.payload.overtimeId }],
                                                isDuration: [{ id: value.payload.isDuration }],
                                                shiftId: [{ id: value.payload.shiftId }],
                                                approved: [{ id: value.payload.approved }],
                                            })
                                            this.hidetablerange = true
                                            this.hidetable = false
                                            source = this.dataSource2
                                        }
                                    },
                                    error: (e) => {
                                        console.error(e)
                                    },
                                    complete: () => {
                                    },
                                });
                            }


                    }
                }
            })
        }

        this.dropdownFixRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 52 },
            { dropdownID: 0, dropdownTypeID: 70 }
        )

    }

    get currentModule() {
        var mgmt = GF.IsEqual(sessionStorage.getItem('moduleId'), ['99'])
        this.defaultTag = mgmt ? [{ id: [0], type: -2 }, { id: [], type: -3 }, { id: [], type: -4 }] : []
        if (!GF.IsEqual(this.prevModule, [sessionStorage.getItem('moduleId')])) {
            this.prevModule = sessionStorage.getItem('moduleId')
            this.dataSource = []
        }
        return mgmt;
    }

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Adds a new row to the data source based on the specified index and condition.
 *
 * This function modifies the data source by appending a new set of data entries
 * for either `dataSource` or `dataSource2` depending on the value of the `time`
 * control in the form. It initializes various fields within the data source with
 * default or derived values and then renders the updated rows in the corresponding
 * table.
 *
 * @param i - The index of the data source array to which the new row will be added.
 * @param x - An index used to calculate additional values, particularly for time range operations.
 */

/*******  88c6680f-c766-41e6-8a1e-1855fe304218  *******/
    add(i,x) {

        if (this.preform.value.time == false) {

            this.dataSource[i].action.push({id: null})
            this.dataSource[i].date.push({id: this.dataSource[i].date[0].id})
            this.dataSource[i].emp_code.push({id:  this.dataSource[i].emp_code[0].id})
            this.dataSource[i].emp_name.push({id: this.dataSource[i].emp_name[0].id})
            this.dataSource[i].shift.push({id: this.dataSource[i].shift[0].id})
            this.dataSource[i].type.push({id: 0 ,disabled : false, options: []})
            this.dataSource[i].ot_type.push({id: 0 ,disabled : false, options: []})
            this.dataSource[i].duration.push({id: 0 ,disabled : false})
            this.dataSource[i].reason.push({id: "" ,disabled : false})
            this.dataSource[i].isDuration.push({id: this.preform.value.time })
            this.dataSource[i].transactionId.push({id: 0})
            this.dataSource[i].approved.push({id: false})
            this.dataSource[i].employeeId.push({id : this.dataSource[i].employeeId[0].id})
            this.dataSource[i].encypid.push({id : this.dataSource[i].encypid[0].id})
            // =========================
            var sources = this.dataSource
            this.durationtable.renderRows()

        } else {
            this.dataSource2[i].action.push({ id: null })
            this.dataSource2[i].date.push({ id: this.dataSource2[i].date[0].id })
            this.dataSource2[i].emp_code.push({ id: this.dataSource2[i].emp_code[0].id })
            this.dataSource2[i].emp_name.push({ id: this.dataSource2[i].emp_name[0].id })
            this.dataSource2[i].shift.push({ id: this.dataSource2[i].shift[0].id })
            this.dataSource2[i].type.push({ id: 0 , options: []})
            this.dataSource2[i].ot_type.push({ id: 0 , options: []})
            var addhours = new Date(this.dataSource2[i].ot_end[x].id)
            this.dataSource2[i].ot_start.push({ id: addhours, disable:false})
            var endhours = new Date(this.dataSource2[i].ot_end[x].id)
            var finalhours = new Date(endhours.setHours(endhours.getHours()+1))
            this.dataSource2[i].ot_end.push({ id: finalhours , disable: false })
            this.dataSource2[i].reason.push({ id: "" })
            this.dataSource2[i].employeeId.push({id: this.dataSource2[i].employeeId[0].id })
            this.dataSource2[i].isDuration.push({ id: this.preform.value.time })
            this.dataSource2[i].transactionId.push({ id: 0 })
            this.dataSource2[i].shiftId.push({id : this.dataSource2[i].shiftId[0].id})
            this.dataSource2[i].approved.push({id : false})
            this.dataSource2[i].encypid.push({id : this.dataSource2[i].encypid[0].id})
            // =========================
            var sources = this.dataSource2
            this.range.renderRows()
        }

        this.validationData(sources[i].encypid[0].id, i)
    }

    submit() {
        const dataSource = this.preform.value.time ? this.dataSource2 : this.dataSource;
        const finalData = this.flattenDataSource(dataSource);
        const saveData = this.prepareSaveData(finalData);

        if (!this.validateData(saveData)) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = "All fields are required!";
            this.message.open(this.failedMessage);
            return;
        }

        this.saveNow(saveData);
    }

    private saveNow(saveData: any[]) {
        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result === "confirmed") {
                this.isSave = true;
                this.filingService.postPreApprovedOT(saveData, this.late).subscribe({
                    next: (value: any) => this.handleSaveResponse(value, saveData),
                    error: (e) => this.handleSaveError(e),
                });
            }
        });
    }

    private flattenDataSource(dataSource: any[]): any[] {
        const final = [];
        dataSource.forEach((row) => {
            const keys = Object.keys(row);
            const maxLength = Math.max(...keys.map(key => Array.isArray(row[key]) ? row[key].length : 1));

            for (let i = 0; i < maxLength; i++) {
                const obj = {};
                keys.forEach(key => {
                    obj[key] = Array.isArray(row[key])
                        ? (key === "ot_start" || key === "ot_end" ? this.pipe.transform(row[key][i].id, "yyyy-MM-ddTHH:mm:00") : row[key][i].id)
                        : row[key];
                });
                final.push(obj);
            }
        });
        return final;
    }

    private validateData(data: any[]): boolean {
        return data.some(item => !item.approved && item.overtimeTypeId !== 0 && item.timingId !== 0);
    }

    private prepareSaveData(data: any[]): any[] {
        return data.map(item => ({
            ...item,
            date: this.pipe.transform(item.date, 'yyyy-MM-dd'),
            isDuration: !this.preform.value.time,
            timingId: item.ot_type,
            overtimeTypeId: item.type,
            otStart: item.ot_start,
            otEnd: item.ot_end,
        })).filter(item => !item.approved && item.overtimeTypeId !== 0);
    }

    private handleSaveResponse(value: any, saveData: any[]): void {
        // if (value.statusCode === 200) {
            // this.message.open(this.successMessage);
            this.isSave = false;
            this.coreService.valid(value, this.late, saveData.length, true, ['/detail/pre-approve-list'], "").then((res) => {
                if (res.saveNow) {
                    this.late = res.lateSave;
                    this.saveNow(saveData);
                    return;
                }
                if (res.reset) {
                    this.late = false;
                }
            });
        // } else {
        //     this.handleSaveFailure(value);
        // }
    }

    private handleSaveFailure(value: any): void {
        this.failedMessage.title = translate("Warning!")
        this.failedMessage.message = value.payload?.errorList || value.message || "An unknown error has occurred.";
        this.message.open(this.failedMessage);
    }

    private handleSaveError(error: any): void {
        this.isSave = false;
        this.message.open(FailedMessage);
        console.error(error);
    }

    encryid(e){
        this.tagoption = e[6].options
    }

    search() {

        this.preform.value.datefrom
        this.preform.value.dateto
        this.preform.value.time
        this.request.SearchColumn = []
        this.request.Order = "EmployeeCode"
        this.request.Length = 0
        // Length

        this.request.SearchColumn.push({

            "key": "DateFrom",
            "value": this.pipe.transform(this.preform.value.datefrom, "MM/dd/yyyy"),
            "type": 4
        })

        this.request.SearchColumn.push({

            "key": "DateTo",
            "value": this.pipe.transform(this.preform.value.dateto, "MM/dd/yyyy"),
            "type": 5
        })

        this.request.SearchColumn.push({

            "key": "isDuration",
            "value": !this.preform.value.time + "",
            "type": 3
        })

        if (this.resultHierarchy.Search.length > 0) {
            this.resultHierarchy.Search.forEach(element => {
                if (Array.isArray(element.Value)) {
                    element.Value.forEach(val => {
                        this.request.SearchColumn.push({
                            "key": element.Key,
                            "value": val + "",
                            "type": element.Type
                        })
                    this.tid = val

                    });
                } else {
                    this.request.SearchColumn.push({
                        "key": element.Key,
                        "value": element.Value + "",
                        "type": element.Type
                    })
                    this.tid = element.Value
                }
            });
        }

        this.loadData()
    }

    loadData(): void {

        this.filingService.getPreApprovetOTTable(this.request).subscribe({
            next: (value: any) => {
                var source = []
                if (this.preform.value.time == false) {

                    this.dataSource = value.payload.data.map(x => ({
                        action: [{ id: x.action }],
                        employeeId: [{ id: x.employeeId }],
                        date: [{ id: x.date }],
                        emp_code: [{ id: x.employeeCode }],
                        emp_name: [{ id: x.displayName }],
                        shift: [{ id: x.shiftCode }],
                        type: [{ id: x.overtimeTypeId ,disabled : x.approved, options: [] }],
                        ot_type: [{ id: x.timingId,disabled : x.approved, options: [] }],
                        duration: [{ id: x.duration ,disabled : x.approved }],
                        reason: [{ id: x.reason ,disabled : x.approved}],
                        transactionId: [{ id: x.transactionId }],
                        isDuration: [{ id: this.preform.value.time }],
                        shiftId : x.shiftId,
                        approved : [{ id: x.approved }],
                        encypid : [{ id: x.employeeEncrypted }],
                    }))

                    this.hidetable = true
                    this.hidetablerange = false
                    source = this.dataSource

                    // this.dataSource.forEach(ment => {
                    //     if (ment.approved[0].id == true) {
                    //         this.disabledfield = true
                    //     }else{
                    //         this.disabledfield = false
                    //     }
                    // });
                    // this.dataSource.push
                } else if (this.preform.value.time == true) {
                    this.dataSource2 = value.payload.data.map(x => ({

                        action: [{ id: x.action }],
                        employeeId: [{ id: x.employeeId }],
                        date: [{ id: x.date }],
                        emp_code: [{ id: x.employeeCode }],
                        emp_name: [{ id: x.displayName }],
                        shift: [{ id: x.shiftCode }],
                        type: [{ id: x.overtimeTypeId ,disabled : x.approved , options: []}],
                        ot_type: [{ id: x.timingId ,disabled : x.approved, options: []}],
                        reason: [{ id: x.reason,disabled : x.approved}],
                        ot_start: [{ id: x.startTime == "0001-01-01T00:00:00" ? this.pipe.transform(x.date, "yyyy-MM-dd HH:mm") : x.startTime,disabled : x.approved}],
                        ot_end: [{ id: x.endTime == "0001-01-01T00:00:00" ? this.pipe.transform(x.date, "yyyy-MM-dd HH:mm") : x.endTime,disabled : x.approved}],
                        transactionId: [{ id: x.transactionId }],
                        isDuration: [{ id: this.preform.value.time }],
                        shiftId : [{id: x.shiftId}],
                        approved : [{ id: x.approved }],
                        encypid : [{ id: x.employeeEncrypted }],

                    }))
                    this.hidetablerange = true
                    this.hidetable = false
                    source = this.dataSource2

                    // this.dataSource2.forEach(ment => {
                    //     if (ment.approved[0].id == true) {
                    //         this.disabledfield = true
                    //     }else{
                    //         this.disabledfield = false
                    //     }
                    // });

                    // this.dataSource2.push
                }
                source.forEach((parent, i) => {
                    this.validationData(parent.encypid[0].id, i)
                });
            }
        })
    }

    handlePageEvent(e): void {
        this.request.Start = e.pageIndex
        this.request.Length = e.pageSize
        // this.loadData()
    }

    validationData(id,i) {
        this.validationrequest = {
            moduleId: sessionStorage.getItem('moduleId') == '99' ? 99 : 159,
            subModuleId: 0,
            dateFrom: new Date(),
            dateTo: new Date(),
            overtimeTiming: 0,
            shiftId: 0,
            leaveFilingType: 0,
            targetId: GF.IsEmptyReturn(id, id.id),
            date: this.pipe.transform(new Date(), 'yyyy-MM-dd')
        }

        forkJoin({
            fix: this.masterService.getDropdownFix(this.dropdownFixRequest),
            validationtype: this.filingService.getFilingValidationOnUI(this.validationrequest),

        })

        .subscribe({
            next: (response) => {
                if (i >= 0) { // For dropdown validation

                    if (this.preform.value.time == false) {

                        this.dataSource[i].ot_type.forEach(data => {
                            data.options = response.fix.payload.filter(x => response.validationtype.payload.otTiming.includes(x.dropdownID) && x.dropdownID != 12708) // Remove Rest Day or Holiday
                        });

                        this.dataSource[i].type.forEach(data => {
                            data.options = response.fix.payload.filter(x => response.validationtype.payload.overtimeType.includes(x.dropdownID) && x.dropdownID != 12708)
                        });

                        // for description
                        this.overtimeTimingDefdescription = response.fix.payload
                    }else{
                        this.dataSource2[i].ot_type.forEach(data => {
                            data.options = response.fix.payload.filter(x => response.validationtype.payload.otTiming.includes(x.dropdownID) && x.dropdownID != 12708)
                        });

                        this.dataSource2[i].type.forEach(data => {
                            data.options = response.fix.payload.filter(x => response.validationtype.payload.overtimeType.includes(x.dropdownID) && x.dropdownID != 12708)
                        });
                        // for description
                        this.overtimeTimingDefdescription = response.fix.payload
                    }
                }
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            },

        });
    }

    deleterow(i,x) {
        debugger
        if (this.preform.value.time == false) {
            if (x !== 0) {
                this.dataSource[i]?.action.splice(x, 1)
                this.dataSource[i].date.splice(x, 1)
                this.dataSource[i].emp_code.splice(x, 1)
                this.dataSource[i].emp_name.splice(x, 1)
                this.dataSource[i].shift.splice(x, 1)
                this.dataSource[i].type.splice(x, 1)
                this.dataSource[i].ot_type.splice(x, 1)
                this.dataSource[i].duration.splice(x, 1)
                this.dataSource[i].reason.splice(x, 1)
                this.dataSource[i].transactionId.splice(x, 1)
                this.dataSource[i].isDuration.splice(x, 1)
                this.dataSource[i].approved.splice(x, 1)
                this.dataSource[i].employeeId.splice(x, 1)
                this.dataSource[i].encypid.splice(x, 1)
                this.durationtable.renderRows()

            }else{
                this.dataSource.splice(i, 1)
                this.durationtable.renderRows()
            }
        } else {
            if (x !== 0) {
                this.dataSource2[i]?.action.splice(x, 1)
                this.dataSource2[i].date.splice(x, 1)
                this.dataSource2[i].emp_code.splice(x, 1)
                this.dataSource2[i].emp_name.splice(x, 1)
                this.dataSource2[i].shift.splice(x, 1)
                this.dataSource2[i].type.splice(x, 1)
                this.dataSource2[i].ot_type.splice(x, 1)
                this.dataSource2[i].ot_start.splice(x, 1)
                this.dataSource2[i].ot_end.splice(x, 1)
                this.dataSource2[i].reason.splice(x, 1)
                this.dataSource2[i].transactionId.splice(x, 1)
                this.dataSource2[i].isDuration.splice(x, 1)
                this.dataSource2[i].approved.splice(x, 1)
                this.dataSource2[i].employeeId.splice(x, 1)
                this.dataSource2[i].encypid.splice(x, 1)
                this.dataSource2[i].shiftId.splice(x, 1)
                this.range.renderRows()

            }else{
                this.dataSource2.splice(i, 1)
                this.range.renderRows()
            }
        }

    }

    date_min_max(e, x, isMin) {

          //parent
          var df = this.pipe.transform(e.ot_start[x].id,'yyyy-MM-dd')
          var dt = this.pipe.transform(e.ot_end[x].id,'yyyy-MM-dd')

           var datemin = new Date(df + ' 00:00')
           var datemax = new Date(dt + ' 23:59')

           //child
           // var datemin = new Date(e.otdate[x].id + ' 00:00')
           // var datemax = new Date(e.otdate[x].id + ' 23:59')

           //parent
           var min = new Date(datemin.setDate(datemin.getDate() - 1))
           var max = new Date(datemax.setDate(datemax.getDate() + 1))

           //child
           // var min = new Date(datemin.setDate(datemin.getDate() - 1))
           // var max = new Date(datemax.setDate(datemax.getDate() + 1))

           return isMin ? min : max

    }

    getMinutes(timeString: string): number {
        // Split the time string into hours, minutes, and seconds
        const [hours, minutes] = timeString.split(':').map(Number);
        // Return only the minutes
        return minutes;
    }

    timevalidation(e, i, x, f) {
        if (f == 'ottype' && x == 0 &&  GF.IsEmpty(this.dataSource2[i].ot_start[x].id)) {
            // this.dataSource2[i].ot_start[x].id = this.pipe.transform(e.date[0].id , 'yyyy-MM-dd 00:00')
        }else if(f == 'ottype' && x !== 0){
            if (this.dataSource2[i].ot_type[x].id == 12699 ) {
                // start time child
                if (x == 1) {
                    var starttiming = new Date(this.dataSource2[i].ot_end[i].id)
                    var plushours = new Date(starttiming.setHours(starttiming.getHours() + 1))
                    this.dataSource2[i].ot_start[x].id = plushours

                    // end time child
                    var endstarttime = new Date(this.dataSource2[i].ot_start[x].id)
                    var plusend = new Date(endstarttime.setHours(endstarttime.getHours() + 1))
                    this.dataSource2[i].ot_end[x].id = plusend
                }else if(x > 1){
                    var starttiming = new Date(this.dataSource2[i].ot_end[x-1].id)
                    var plushours = new Date(starttiming.setHours(starttiming.getHours() + 1))
                    this.dataSource2[i].ot_start[x].id = plushours

                    // end time child
                    var endstarttime = new Date(this.dataSource2[i].ot_start[x].id)
                    var plusend = new Date(endstarttime.setHours(endstarttime.getHours() + 1))
                    this.dataSource2[i].ot_end[x].id = plusend
                }
            }else if(this.dataSource2[i].ot_type[x].id == 12698){
                // start time child
                var starttiming = new Date(this.dataSource2[i].ot_end[i].id)
                var plushours = new Date(starttiming.setHours(starttiming.getHours() - 1))
                this.dataSource2[i].ot_start[x].id = plushours

                // end time child
                var endstarttime = new Date(this.dataSource2[i].ot_start[x].id)
                var plusend = new Date(endstarttime.setHours(endstarttime.getHours() + 1))
                this.dataSource2[i].ot_end[x].id = plusend
            }
        }


        // shiftcode overlaping ++++++++++++++++++++++++++++++++
        // var shiftcode = e.shift[0].id
        if (e.shift[0].id == 'RD') {

        }else{
            var shiftsplit = e.shift[0].id.split("_");

            let timePerShiftCode: string[] = shiftsplit.map((shiftsplit) => {
                // Extract hours and minutes from the shift code
                let hours: number = parseInt(shiftsplit.slice(0, 2), 10);
                let minutes: number = parseInt(shiftsplit.slice(2, 4), 10);

                // Check if it's AM (A) or PM (P) and adjust hours accordingly
                if (shiftsplit[4] === 'P') {
                    if (hours < 12) {
                        hours += 12;
                    }
                } else if (shiftsplit[4] === 'A') {
                    if (hours === 12) {
                        shiftsplit = 0;
                    }
                }

                // Convert to time format
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            });
            this.shiftin = timePerShiftCode[0];
            this.shiftout = timePerShiftCode[1];
        }


        var shiftindate = new Date(this.pipe.transform(e.date[0].id , 'yyyy-MM-dd '+this.shiftin))
        var shiftoutdate = new Date(this.pipe.transform(e.date[0].id , 'yyyy-MM-dd '+this.shiftout))

        var dfs = this.pipe.transform(e.ot_start[x].id, 'yyyy-MM-dd HH:mm ')
        var dts = this.pipe.transform(e.ot_end[x].id, 'yyyy-MM-dd HH:mm ')

        var starttime = new Date(dfs)
        var endtime = new Date(dts)

        starttime.setHours(0, 0, 0, 0);
        endtime.setHours(0, 0, 0, 0);

        var overlapstart = starttime > endtime
        var overlapend = endtime < starttime


        // shiftcode overlaping ++++++++++++++++++++++++++++++++
        var from = this.pipe.transform( this.dataSource2[i].ot_start[x].id, e.date[0].id + ' HH:mm')
        var to = this.pipe.transform( this.dataSource2[i].ot_end[x].id, e.date[0].id + ' HH:mm')

        // parent validation ===================
        if (f == 'datefrom' && x == 0) {
            var starttiming = new Date(this.dataSource2[i].ot_start[x].id)
            var plushours = new Date(starttiming.setHours(starttiming.getHours() + 1))
            this.dataSource2[i].ot_end[x].id = plushours

            if (starttime > shiftindate && starttime < shiftoutdate) {
                this.failedMessage.title = translate("Warning!")
                var timing = this.overtimeTimingDefdescription.find(name => name.dropdownID == this.dataSource2[i].ot_type[x].id).description
                this.failedMessage.message = "Can't File " + timing + " between your shift "
                this.message.open(this.failedMessage);
                this.dataSource2[i].ot_start[x].id = ""
                this.dataSource2[i].ot_end[x].id = ""
                return

            }
            else if (overlapstart || overlapend) {
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.message = translate("Cannot overlap in date")
                this.message.open(this.failedMessage)
                return

            }else if(starttime == endtime){
                this.dataSource2[i].ot_start[i].id = this.pipe.transform(e.date[0].id , 'yyyy-MM-dd 00:00')
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.message = translate("Invalid same date")
                this.message.open(this.failedMessage);
                return
            }

            var tf = this.pipe.transform(this.dataSource2[i].ot_start[x].id, 'yyyy-MM-dd HH:mm')
            var tt = this.pipe.transform(this.dataSource2[i].ot_end[x].id, 'yyyy-MM-dd HH:mm')

            this.dataSource2.forEach(element => {
                element["ot_start"].forEach((ele,) => {
                    element["ot_end"].forEach((elem, ii) => {

                        if (ii == x) {

                        } else {

                            var dateF = this.pipe.transform(ele.id, 'yyyy-MM-dd HH:mm')
                            var dateT = this.pipe.transform(elem.id, 'yyyy-MM-dd HH:mm')
                            if (new Date(dateF) == new Date(tf) && new Date(dateT) == new Date(tt)) {
                                this.failedMessage.title = translate("Warning!")
                                this.failedMessage.message = "Can't file OB at same date and time"
                                this.message.open(this.failedMessage);
                                return
                            } else if (new Date(tf) < new Date(dateT)) {
                                if (new Date(tf) == new Date(dateF)) {
                                    this.failedMessage.title = translate("Warning!")
                                    this.failedMessage.message = "Can't file OB you have already schedule " + tf
                                    this.message.open(this.failedMessage);
                                    return
                                }

                                this.failedMessage.title = translate("Warning!")
                                this.failedMessage.message = "" + tf + "Cannot be Greater than  to " + tt
                                this.message.open(this.failedMessage);
                                this.dataSource2[i].ot_start[x].id = this.pipe.transform(this.dataSource2[i].ot_start[x].id, 'yyyy-MM-dd 00:00')
                                return

                            } else if (new Date(tt) == new Date(dateT)) {
                                this.failedMessage.title = translate("Warning!")
                                this.failedMessage.message = "Can't file OB you have already schedule " + tt
                                this.message.open(this.failedMessage);
                                return
                            }

                        }
                    })
                })
            })

        } else if (f == 'dateto' && x == 0) {
            if (endtime < starttime) {
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.message = "Date to cannot overlap in Date from"
                var starttiming = new Date(this.dataSource2[i].ot_start[x].id)
                var plushours = new Date(starttiming.setHours(starttiming.getHours() + 1))
                this.dataSource2[i].ot_end[x].id = plushours
                this.message.open(this.failedMessage)
            }else if(starttime > shiftindate && endtime < shiftoutdate){
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.message = "Can't File " + this.overtimeTimingDefdescription.find(name => name.dropdownID == this.dataSource2[i].type[x].id).description + " between your shift "
                this.message.open(this.failedMessage);
            }else if(starttime == endtime){
                this.dataSource2[i].ot_end[i].id = this.pipe.transform(e.date[0].id , 'yyyy-MM-dd 00:00')
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.message = translate("Invalid same date")
                this.message.open(this.failedMessage);
            }else if(f == 'dateto' && x >= 0){
                for (let index = 0; index < this.dataSource2[x].ot_end.length; index++) {

                    if(this.dataSource2[x].ot_type[index].id == this.dataSource2[x].ot_type[x].id){
                        var datess = this.pipe.transform(this.dataSource2[x].date[index].id, 'yyyy-MM-dd')
                        //parent
                        var from = this.pipe.transform(this.dataSource2[x].ot_start[index].id, datess + ' HH:mm')
                        var to = this.pipe.transform(this.dataSource2[x].ot_end[index].id, datess + ' HH:mm')
                        // child
                        var tf = this.pipe.transform(this.dataSource2[x].ot_start[x].id, datess + ' HH:mm')
                        var tt = this.pipe.transform(this.dataSource2[x].ot_end[x].id, datess + ' HH:mm')

                        if (from == to) {
                            this.failedMessage.title = translate("Warning!")
                            var mess = f == "datefrom" ? translate("Time-From is equal to Time-To") : translate("Time-To is equal to Time-From")
                            this.failedMessage.message = mess
                            this.message.open(this.failedMessage);
                            return
                        }
                        if (index == x) {
                            //do nothing on self
                        } else {
                            var now = this.pipe.transform(e.ot_end[x].id, 'yyyy-MM-dd HH:mm')
                            const dateFrom = new Date(from);
                            const dateTo = new Date(to);
                            const today = new Date(now);
                            const datef = new Date(tf);
                            const datet = new Date(tt)

                            var test1 = today > dateFrom && today < dateTo
                            var test2 = datef > dateFrom && datef < dateTo
                            var test3 = today > dateFrom && datef < dateTo
                            var test4 = dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo < datet
                            var test5 = today < dateTo && datet > dateFrom

                            if ((today > dateFrom && today < dateTo) ||
                                (datef > dateFrom && datef < dateTo) ||
                                (today > dateFrom && datef < dateTo) ||
                                (dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo < datet) ||
                                (today < dateTo && datet > dateFrom)) {

                                this.failedMessage.title = translate("Warning!")
                                this.failedMessage.message = translate("This schedule is between to other schedule")
                                this.message.open(this.failedMessage);
                                this.adddisabledfield = false

                            }else{
                                this.adddisabledfield = true
                            }

                        }
                    }
                    //date parent
                }
            }
        }else if(f == 'datefrom' && x !== 0){

            // var startdf = this.pipe.transform(this.dataSource2[i].ot_start[x].id , 'yyyy-MM-dd HH:mm')
            // var starttimechild = new Date(startdf)
            // var endtimechild = new Date(this.dataSource2[i].ot_end[x].id)

            // var starttimeparent = new Date(this.dataSource2[i].ot_start[i].id)
            // var endtimeparent = new Date(this.dataSource2[i].ot_end[i].id)

            var starttiming = new Date(this.dataSource2[i].ot_start[x].id)
            var plushours = new Date(starttiming.setHours(starttiming.getHours() + 1))
            this.dataSource2[i].ot_end[x].id = plushours

            if (f == 'datefrom' && x >= 0 ) {
                for (let index = 0; index < this.dataSource2[i].ot_start.length; index++) {

                    if(this.dataSource2[x].ot_type[index].id == this.dataSource2[x].ot_type[x].id){
                        var datess = this.pipe.transform(this.dataSource2[i].date[x].id, 'yyyy-MM-dd')
                        //parent
                        var from = this.pipe.transform(this.dataSource2[i].ot_start[index].id, datess + ' HH:mm')
                        var to = this.pipe.transform(this.dataSource2[i].ot_end[index].id, datess + ' HH:mm')
                        // child
                        var tf = this.pipe.transform(this.dataSource2[i].ot_start[x].id, datess + ' HH:mm')
                        var tt = this.pipe.transform(this.dataSource2[i].ot_end[x].id, datess + ' HH:mm')

                        if (from == to) {
                            this.failedMessage.title = translate("Warning!")
                            var mess = f == "datefrom" ? translate("Time-From is equal to Time-To") : translate("Time-To is equal to Time-From")
                            this.failedMessage.message = mess
                            this.message.open(this.failedMessage);
                            return
                        }
                        if (index == x) {
                            //do nothing on self
                        } else {
                            var now = this.pipe.transform(e.ot_start[x].id, 'yyyy-MM-dd HH:mm')
                            const dateFrom = new Date(from);
                            const dateTo = new Date(to);
                            const today = new Date(now);
                            const datef = new Date(tf);
                            const datet = new Date(tt)

                            var test1 = today > dateFrom && today < dateTo
                            var test2 = datef > dateFrom && datef < dateTo
                            var test3 = today > dateFrom && datef < dateTo
                            var test4 = dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo < datet
                            var test5 = today < dateTo && datet > dateFrom

                            if ((today > dateFrom && today < dateTo) ||
                                (datef > dateFrom && datef < dateTo) ||
                                (today > dateFrom && datef < dateTo) ||
                                (dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo < datet) ||
                                (today < dateTo && datet > dateFrom)) {

                                this.failedMessage.title = translate("Warning!")
                                this.failedMessage.message = translate("This schedule is between to other schedule")
                                this.message.open(this.failedMessage);
                                this.adddisabledfield = false

                            }else{
                                this.adddisabledfield = true
                            }

                        }
                    }
                    //date parent
                }
            }
            // this.dataSource2[i].ot_end[x].id = this.pipe.transform(e.date[0].id , 'yyyy-MM-dd 00:00')
        }else if(f == 'dateto' && x !== 0){
            var datechildfrom = this.pipe.transform(this.dataSource2[i].ot_start[x].id , 'yyyy-MM-dd HH:mm')
            var datechildto = this.pipe.transform(this.dataSource2[i].ot_end[x].id , 'yyyy-MM-dd HH:mm')
            var datefromchild = this.pipe.transform(this.dataSource2[i].ot_end[x].id , 'yyyy-MM-dd 00:00')

            var date = new Date(datefromchild)
            if (endtime < starttime) {
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.message = translate("dateto cannot overlap in datefrom")
                var starttiming = new Date(this.dataSource2[i].ot_start[x].id)
                var plushours = new Date(starttiming.setHours(starttiming.getHours() + 1))
                this.dataSource2[i].ot_end[x].id = plushours
                this.message.open(this.failedMessage)
            }else if (datechildfrom == datechildto) {
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.message = translate("Invalid same date")
                this.message.open(this.failedMessage);
                var datemoment = moment(this.pipe.transform(e.date[0].id , 'yyyy-MM-dd 00:00'))
                this.dataSource2[i].ot_end[x].id = datemoment
                return moment(datemoment)
            }
        }
    }

    // this validation is for overlaping and set the date from and date to to null and when click the toggle
    // they set the date autmatic like element.date
    copydate(a,e,i,x){
        if (a == 'start' && GF.IsEmpty(this.dataSource2[i].ot_start[x].id)) {
            var date = this.pipe.transform(e.date[0].id, 'yyyy-MM-dd 00:00')
            this.dataSource2[i].ot_start[x].id = date
        }else if(a == 'end' && GF.IsEmpty(this.dataSource2[i].ot_end[x].id)){
            var date = this.pipe.transform(e.date[0].id, 'yyyy-MM-dd 00:00')
            this.dataSource2[i].ot_end[x].id = date
        }
    }


    validation(timing,el,x,i){
        var encid = this.tagoption.find(y => y.dropdownID == el.employeeId[x].id).encryptID
        var ottimein = GF.IsEmpty(el.ot_start[x].id) ? el.ot_start[x].id = this.pipe.transform(el.date[x].id , 'yyyy-MM-ddT00:00') : this.pipe.transform(el.ot_start[x].id, 'yyyy-MM-ddTHH:mm')
        var ottimeout = GF.IsEmpty(el.ot_end[x].id) ? el.ot_end[x].id = this.pipe.transform(el.date[x].id, 'yyyy-MM-ddT23:59') : this.pipe.transform(el.ot_end[x].id, 'yyyy-MM-ddTHH:mm')
        //var dates = new Date(el.date[0].id)
        this.validationrequestion = {
            moduleId: sessionStorage.getItem('moduleId') == '99' ? 99 : 159,
            subModuleId: 0,
            dateFrom: ottimein,
            dateTo: ottimeout,
            overtimeTiming: el.ot_type[x].id,
            shiftId: el.shiftId[x].id,
            leaveFilingType: 0,
            targetId: encid,
            isDuration : this.preform.value.time,
            date: GF.IsEmpty(el.date[x].id) ? "" : this.pipe.transform(el.date[x].id, 'yyyy-MM-dd'),
        }

        forkJoin({
            validationtype: this.filingService.getFilingValidationOnUI(this.validationrequestion),

        })

            .subscribe({
                next: (response) => {
                    var validation = response.validationtype.payload
                    if (this.preform.value.time) {

                        this.schedin =  this.pipe.transform(validation.schedIn  , 'yyyy-MM-dd HH:mm')
                        this.schedout = this.pipe.transform(validation.schedOut, 'yyyy-MM-dd HH:mm')
                        this.postinterval = validation.otSettingsPost.delayInterval // POST
                        this.preinterval = validation.otSettingsPre.delayInterval   // PRE
                        this.postspecific =  validation.otSettingsPost.specificMinutes // POST
                        this.prespecific =  validation.otSettingsPre.specificMinutes   // PRE
                        if (this.dataSource2[i].ot_type[x].id == 12699 && this.schedin != null && this.schedout != null  && x <=0 ) {
                            if (!GF.IsEmpty(this.postinterval)) {

                                var inter = new Date(this.schedout)
                                var intermins =  inter.setMinutes(inter.getMinutes()+this.postinterval)
                                var interhrs = this.pipe.transform(intermins, 'yyyy-MM-dd HH:mm')

                                const minutes = this.getMinutes(interhrs);
                                // this.postspecific = this.postspecific.map(num => num - 1);

                                this.dataSource2[i].ot_start[x].id = this.pipe.transform(interhrs, 'yyyy-MM-dd HH:mm')
                                var endminutes = inter.setHours(inter.getHours()+1)
                                var enddates = new Date(endminutes)
                                this.dataSource2[i].ot_end[x].id = this.pipe.transform(enddates, 'yyyy-MM-dd HH:mm')

                            }else{
                                var SCin =  new Date(this.schedout)
                                SCin.setHours(SCin.getHours()+1)
                                var indate = this.pipe.transform(SCin, 'yyyy-MM-dd HH:mm')
                                this.dataSource2[i].ot_start[x].id = this.pipe.transform(this.schedout, 'yyyy-MM-dd HH:mm')
                                this.dataSource2[i].ot_end[x].id = this.pipe.transform(indate, 'yyyy-MM-dd HH:mm')
                            }
                        }else if(this.dataSource2[i].ot_type[x].id == 12699 && this.schedin != null && this.schedout != null  && x > 0 && el.ot_type[i].id !== el.ot_type[x].id ){

                            if (!GF.IsEmpty(this.postinterval)) {

                                var inter = new Date(this.schedout)
                                var intermins =  inter.setMinutes(inter.getMinutes()+this.postinterval)
                                var interhrs = this.pipe.transform(intermins, 'yyyy-MM-dd HH:mm')

                                const minutes = this.getMinutes(interhrs);
                                // this.postspecific = this.postspecific.map(num => num - 1);

                                this.dataSource2[i].ot_start[x].id = this.pipe.transform(interhrs, 'yyyy-MM-dd HH:mm')
                                var endminutes = inter.setHours(inter.getHours()+1)
                                var enddates = new Date(endminutes)
                                this.dataSource2[i].ot_end[x].id = this.pipe.transform(enddates, 'yyyy-MM-dd HH:mm')

                            }else{

                            var inter = new Date(this.schedout)
                            var intermins =  inter.setMinutes(inter.getMinutes()+this.postinterval)
                            var interhrs = this.pipe.transform(intermins, 'yyyy-MM-dd HH:mm')

                            const minutes = this.getMinutes(interhrs);
                            // this.postspecific = this.postspecific.map(num => num - 1);

                            var SCin =  new Date(this.schedout)
                            SCin.setHours(SCin.getHours()+1)
                            var indate = this.pipe.transform(SCin, 'yyyy-MM-dd HH:mm')
                            this.dataSource2[i].ot_start[x].id = this.pipe.transform(interhrs, 'yyyy-MM-dd HH:mm')
                            this.dataSource2[i].ot_end[x].id = this.pipe.transform(indate, 'yyyy-MM-dd HH:mm')
                            }
                        }else if(this.dataSource2[i].ot_type[x].id == 12698  && this.schedin != null && this.schedout != null  && x <= 0 ){

                            if (!GF.IsEmpty(this.preinterval)) {
                                var inter = new Date(this.schedin)
                                var intermins =  inter.setMinutes(inter.getMinutes()-this.preinterval)
                                var interhrs = this.pipe.transform(intermins, 'yyyy-MM-dd HH:mm')

                                var SCin =  new Date(this.schedin)
                                SCin.setHours(SCin.getHours()-1)
                                var outdate = this.pipe.transform(SCin, 'yyyy-MM-dd HH:mm')

                                this.dataSource2[i].ot_start[x].id = this.pipe.transform(outdate, 'yyyy-MM-dd HH:mm')
                                this.dataSource2[i].ot_end[x].id = this.pipe.transform(interhrs, 'yyyy-MM-dd HH:mm')
                            }else{
                                var SCin =  new Date(this.schedin)
                                SCin.setHours(SCin.getHours()-1)
                                var outdate = this.pipe.transform(SCin, 'yyyy-MM-dd HH:mm')
                                this.dataSource2[i].ot_start[x].id = this.pipe.transform(outdate, 'yyyy-MM-dd HH:mm')
                                this.dataSource2[i].ot_end[x].id = this.pipe.transform(this.schedin, 'yyyy-MM-dd HH:mm')
                            }
                        }else if(this.dataSource2[i].ot_type[x].id == 12698  && this.schedin != null && this.schedout != null  && x <= 1 && 12699 !== el.ot_type[x].id){

                            var inter = new Date(this.schedin)
                            var intermins =  inter.setMinutes(inter.getMinutes()-this.preinterval)
                            var interhrs = this.pipe.transform(intermins, 'yyyy-MM-dd HH:mm')

                            var SCin =  new Date(this.schedin)
                            SCin.setHours(SCin.getHours()-1)
                            var outdate = this.pipe.transform(SCin, 'yyyy-MM-dd HH:mm')


                            var SCin =  new Date(this.schedin)
                            SCin.setHours(SCin.getHours()-1)
                            var outdate = this.pipe.transform(SCin, 'yyyy-MM-dd HH:mm')
                            this.dataSource2[i].ot_start[x].id = this.pipe.transform(outdate, 'yyyy-MM-dd HH:mm')
                            this.dataSource2[i].ot_end[x].id = this.pipe.transform(interhrs, 'yyyy-MM-dd HH:mm')
                        }

                        if (x > 0) {
                            if(validation.enableMultiPreShift == false && el.ot_type[i].id == el.ot_type[x].id && el.ot_type[x].id == 12698){
                                this.failedMessage.message = translate("Can't File multiple pre-Shift")
                                this.message.open(this.failedMessage);
                                this.dataSource2[i].ot_type[x].id = 0
                            }else if(validation.enableMultiPostShift == false && el.ot_type[i].id == el.ot_type[x].id){
                                this.failedMessage.message = translate("Can't File multiple post-Shift")
                                this.message.open(this.failedMessage);
                                this.dataSource2[i].ot_type[x].id = 0
                            }else if(validation.enableMultiRDHD == false && el.ot_type[i].id == el.ot_type[x].id){
                                this.failedMessage.message = translate("Can't File multiple RD/HD")
                                this.message.open(this.failedMessage);
                                this.dataSource2[i].ot_type[x].id = 0
                            }
                            // else  if(validation.isPreOTInvalid && el.ot_type[x].id == 12699){
                            //     this.failedMessage.message = "can't File Post-OT in Range"
                            //     this.message.open(this.failedMessage);
                            //     this.dataSource2[i].ot_type[x].id = 0
                            // }else  if(validation.isPreOTInvalid && el.ot_type[x].id == 12698){
                            //     this.failedMessage.message = "can't File Pre-OT in Range"
                            //     this.message.open(this.failedMessage);
                            //     this.dataSource2[i].ot_type[x].id = 0
                            // }
                        }else{
                            // if(validation.isPreOTInvalid && el.ot_type[i].id == 12699){
                            //     this.failedMessage.message = "can't File Post-OT in Range"
                            //     this.message.open(this.failedMessage);
                            //     this.dataSource2[i].ot_type[x].id = 0
                            // }else  if(validation.isPreOTInvalid && el.ot_type[i].id == 12698){
                            //     this.failedMessage.message = "can't File Pre-OT in Range"
                            //     this.message.open(this.failedMessage);
                            //     this.dataSource2[i].ot_type[x].id = 0
                            // }
                        }
                    }else{
                        if(x > 0){
                            if(validation.enableMultiPreShift == false && el.ot_type[i].id == el.ot_type[x].id){
                                this.failedMessage.message = translate("Can't File multiple pre-Shift")
                                this.message.open(this.failedMessage);
                                this.dataSource[i].ot_type[x].id = 0
                            }else if(validation.enableMultiPostShift == false && el.ot_type[i].id == el.ot_type[x].id){
                                this.failedMessage.message = translate("Can't File multiple post-Shift")
                                this.message.open(this.failedMessage);
                                this.dataSource[i].ot_type[x].id = 0
                            }else if(validation.enableMultiRDHD == false && el.ot_type[i].id == el.ot_type[x].id){
                                this.failedMessage.message = translate("Can't File multiple RD/HD")
                                this.message.open(this.failedMessage);
                                this.dataSource[i].ot_type[x].id = 0
                            }
                            // else  if(validation.isPreOTInvalid && el.ot_type[x].id == 12699){
                            //     this.failedMessage.message = "can't File Post-OT in Duration"
                            //     this.message.open(this.failedMessage);
                            //     this.dataSource[i].ot_type[x].id = 0
                            // }else  if(validation.isPreOTInvalid && el.ot_type[x].id == 12698){
                            //     this.failedMessage.message = "can't File Pre-OT in Duration"
                            //     this.message.open(this.failedMessage);
                            //     this.dataSource[i].ot_type[x].id = 0
                            // }
                        }else{
                            // if(validation.isPreOTInvalid && el.ot_type[i].id == 12699){
                            //     this.failedMessage.message = "can't File Post-OT in Duration"
                            //     this.message.open(this.failedMessage);
                            //     this.dataSource[i].ot_type[x].id = 0
                            // }else  if(validation.isPreOTInvalid && el.ot_type[i].id == 12698){
                            //     this.failedMessage.message = "can't File Pre-OT in Duration"
                            //     this.message.open(this.failedMessage);
                            //     this.dataSource[i].ot_type[x].id = 0
                            // }

                        }
                    }
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                },

            });
    }

    cleartable(){
        if (this.preform.value.time) {
            this.hidetable = false
            this.dataSource = []
        }else {
            this.hidetablerange = false
            this.dataSource2 = []
        }
    }
}
