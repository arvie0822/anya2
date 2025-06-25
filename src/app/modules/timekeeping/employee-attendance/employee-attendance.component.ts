import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownID, DropdownOptions, DropdownRequest, HeirarchyDropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { EmployeeAttendance } from 'app/model/employee/employee-attendance';
import { AttendanceService } from 'app/services/attendanceService/attendance.service';
import { EmployeeAttendanceModalComponent } from './employee-attendance-modal/employee-attendance-modal.component';
import { CoreService } from 'app/services/coreService/coreService.service';
import { identifierName } from '@angular/compiler';
import _ from 'lodash';
import { forkJoin } from 'rxjs';
import { MasterService } from 'app/services/masterService/master.service';
import { GF } from 'app/shared/global-functions';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FailedMessage } from 'app/model/message.constant';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatSelectModule } from '@angular/material/select';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatButtonModule } from '@angular/material/button';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { TranslocoModule } from '@ngneat/transloco';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    selector: 'app-employee-attendance',
    templateUrl: './employee-attendance.component.html',
    styleUrls: ['./employee-attendance.component.css'],
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
    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CardTitleComponent,
    MatIconModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    EmployeeHierarchyComponent,
    DropdownCustomComponent,
    MatDividerModule,
    MatButtonModule,
    TranslocoModule,
    MatTooltipModule
],
})
export class EmployeeAttendanceComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(EmployeeHierarchyComponent) loaddropdown: EmployeeHierarchyComponent;
    resultHierarchy = new SearchHierarchy;
    pipe = new DatePipe('en-US');
    IsMissingLogs: boolean
    includeInactive: boolean
    request = new TableRequest()
    attendanceForm: FormGroup
    displayedColumns: string[] = ['action', 'code', 'name', 'date', 'schedin', 'schedout', 'timein', 'timeout', 'hrswork', 'remarks'];
    dataSource = [];
    empdstatus = [];
    dialogRef: MatDialogRef<EmployeeAttendanceModalComponent, any>;
    field_count = 0
    isLoadingResults: boolean = true;
    showtagtype: boolean = false;
    totalRows: number = 0
    globalmoduleId: boolean
    idsemployee : any = []
    dropdownOptions = new DropdownOptions
    dropdownRequestsub = new DropdownRequest
    dropdownFixRequest = new DropdownRequest
    tagrequest = new HeirarchyDropdownRequest
    prevModule = ""
  failedMessage = { ...FailedMessage }

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        private attendanceService: AttendanceService,
        private coreService: CoreService,
        private masterService : MasterService,
        private message: FuseConfirmationService,
        private cds : ChangeDetectorRef

    ) { }

    ngOnInit() {
        this.attendanceForm = this.fb.group(new EmployeeAttendance());

        this.attendanceForm.get('employeeStatus').setValue([93, 94, 12666, 30050, 30383])

        this.dropdownFixRequest.id.push(
        { dropdownID: 0, dropdownTypeID: 36 })
        this.initData()
        // this.globalmoduleId = sessionStorage.getItem('moduleId') == '41' ? true : false;

        // Initail Call Attendance
        this.attendanceService.attendanceLogsProcess().subscribe()
        this.attendanceService.resendLogs().subscribe()
    }

    get currentModule() {

            var status = GF.IsEqual(sessionStorage.getItem('moduleId'),['41']) //sessionStorage.getItem('moduleId') == '41' ? true : false;

            if (!GF.IsEqual(this.prevModule,[sessionStorage.getItem('moduleId')])) {
                this.prevModule = sessionStorage.getItem('moduleId')
                this.attendanceForm.get('employeeStatus').setValue([])
                // this.attendanceForm.get('employeeStatus').setValue([93, 94, 12666, 30050, 30383])
                this.initData()
            }

            return status
    }
    modal(model,i) {

        var date = model.date
        var tmein = model.timeIn
        var out = model.timeOut
        var ids = model.encryptId

        this.attendanceService.getAttendanceLogs(date, ids).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    if (this.dialogRef) {
                        this.dialogRef.close();
                    }
                    this.dialogRef = this.dialog.open(EmployeeAttendanceModalComponent, {
                        width: '70%',
                        panelClass: 'app-dialog',
                        data: {
                            values: value.payload,
                            date : model.date,
                            index : i,
                            in : tmein,
                            out : out,
                            datas : model
                        }

                    });
                }
                else {
                    console.log(value.stackTrace)
                    console.log(value.message)
                    this.isLoadingResults = false;
                }
            },
            error: (e) => {
                console.error(e)
                this.isLoadingResults = false;
            }
        });
    }

    Search(ex) {
        this.request.SearchColumn = []
        this.attendanceForm.markAllAsTouched();
        if (this.attendanceForm.valid) {
            this.request.SearchColumn.push({
                "key": "DateFrom",
                "value": this.pipe.transform(this.attendanceForm.value.dateFrom, 'yyyy-MM-ddT00:00:00'),
                "type": 4
            })

            this.request.SearchColumn.push({
                "key": "DateTo",
                "value": this.pipe.transform(this.attendanceForm.value.dateTo, 'yyyy-MM-ddT23:59:00'),
                "type": 5
            })

            this.request.SearchColumn.push({
                "key": "MissingLogs",
                "value": this.attendanceForm.value.missingLogs + "",
                "type": 3
            })

            this.attendanceForm.value.employeeStatus.forEach(status => {
                this.request.SearchColumn.push({
                    "key": "EmployeeStatus",
                    "value": status + "",
                    "type": 2
                })
            });

            if (sessionStorage.getItem('moduleId') == '41') {
                var empids = this.attendanceForm.value.employeeId
                // var empid = this.idsemployee
                // var tid = empid.map(x => x.dropdownID)
                empids.forEach(element => {

                    this.request.SearchColumn.push({
                        "key": "EmployeeID",
                        "value": element.toString(),
                        "type": 2
                    })

                });

                this.loadData()

            } else {
                if (this.resultHierarchy.Search.length > 0) {
                    this.resultHierarchy.Search.forEach(element => {
                        if (Array.isArray(element.Value)) {
                            element.Value.forEach(val => {
                                this.request.SearchColumn.push({
                                    "key": element.Key,
                                    "value": val + "",
                                    "type": element.Type
                                })
                            });
                        } else {
                            this.request.SearchColumn.push({
                                "key": element.Key,
                                "value": element.Value + "",
                                "type": element.Type
                            })
                        }
                    });
                }
            }

            if (ex) {
                this.coreService.exportAll(this.request,'128','1')
            } else {
                this.loadData()
            }
        }
    }

    handlePageEvent(e): void {
        this.request.Start = e.pageIndex
        this.request.Length = e.pageSize
        this.loadData()
    }

    handleSortEvent(e): void {
        this.paginator.pageIndex = 0
        this.request.Start = 0
        this.request.Order = e.active
        this.request.OrderBy = e.direction
        this.loadData()
    }

    loadData(): void {
        this.request.Order = "EmployeeCode"
        this.isLoadingResults = true;
        this.attendanceService.getEmployeeAttendanceTable(this.request,this.currentModule).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    console.log(value.payload.data)
                    this.dataSource = value.payload.data
                    this.totalRows = value.payload.totalRows
                    this.isLoadingResults = false;
                }
                else {
                    console.log(value.stackTrace)
                    console.log(value.message)
                    this.isLoadingResults = false;
                }
            },
            error: (e) => {
                console.error(e)
                this.isLoadingResults = false;
            }
        });
    }

    initData() {
    forkJoin({
        custome : this.coreService.getCoreDropdown(1035, this.dropdownRequestsub),
        dropdownFix: this.masterService.getDropdownFix(this.dropdownFixRequest),
        })
        .subscribe({
            next: (response) => {

                // custom
                this.dropdownOptions.employeedef = response.custome.payload
                this.dropdownOptions.employeeStatusDef = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 36), JSON.stringify)
            },

            error: (e) => {
                console.error(e)
            },
            complete: () => {
            },
        });
    }

    inactive(){
        this.empdstatus =  this.attendanceForm.value.employeeStatus
        this.dropdownRequestsub.statusID = this.empdstatus
        this.tagrequest.statusID = this.empdstatus


        if (GF.IsEmpty(this.attendanceForm.value.employeeStatus)) {
            this.showtagtype = false
        }else{
        this.showtagtype = true
        // this.resultHierarchy.Search = []
        // this.attendanceForm.get('employeeId').setValue([])
        this.dropdownOptions.employeedef = []
        var statsId = [95,12665]


        var status = this.attendanceForm.value.employeeStatus.filter(x => statsId.includes(x))
        // var status = this.attendanceForm.value.employeeStatus.includes(statsId)
        this.empdstatus =  this.attendanceForm.value.employeeStatus

        if (status.length > 0) { // custome
            if (sessionStorage.getItem('moduleId') == '41') {
                this.dropdownRequestsub.id = []
                if (!GF.IsEmpty(this.attendanceForm.value.employeeId)) {
                    this.attendanceForm.value.employeeId.forEach(employ => {
                        this.dropdownRequestsub.id.push({
                            dropdownID : employ,
                            dropdownTypeID : 0
                        })
                    });
                }
                this.dropdownRequestsub.statusID = this.empdstatus
                this.dropdownRequestsub.includeInactive = true
                this.includeInactive = true
                this.initData()
            }else{ // hierarchy

                this.tagrequest = new HeirarchyDropdownRequest
                this.tagrequest.id = []
                this.tagrequest.includeInactive = true
                this.tagrequest.statusID = this.empdstatus
                this.includeInactive = true
                if (this.resultHierarchy.Search.length > 0) {
                    this.resultHierarchy.Search = []
                    this.resultHierarchy.Search.forEach(elem => {
                        this.tagrequest.id.push({
                            dropdownID : elem.Value,
                            dropdownTypeID : -4,
                            key : elem.Key
                        })

                        const index = this.tagrequest.id.findIndex(item => item.key === "EmployeeID");
                        const employeetag = this.tagrequest.id.filter(item => item.key === "EmployeeID");
                        const subtag = this.tagrequest.id.filter(item => item.key === "SubCompanyID");
                        const brachtag = this.tagrequest.id.filter(item => item.key === "BranchID");

                        // SubCompanyID
                        // BranchID
                        if (index !== -1) {
                            this.tagrequest.id.splice(index, 1);
                        }
                    });
                }else{
                    this.tagrequest.id.push({
                        dropdownID : [0],
                        dropdownTypeID : -4,
                        key : "EmployeeID"
                    })
                }
                this.loaddropdown.loadDropdowns(0,true, [this.tagrequest])
            }
        }else{
            if (sessionStorage.getItem('moduleId') == '41') {
                this.dropdownRequestsub.statusID = this.empdstatus
                this.dropdownRequestsub.includeInactive = false
                this.includeInactive = false
                this.initData()
            }else{
                this.tagrequest.includeInactive = false
            this.includeInactive = false
            this.tagrequest = new HeirarchyDropdownRequest
            this.tagrequest.id = []
            if (this.resultHierarchy.Search.length > 0) {
                this.resultHierarchy.Search.forEach(elem => {
                    this.tagrequest.id.push({
                        dropdownID : elem.Value,
                        dropdownTypeID : -4,
                        key : elem.Key
                    })
                });
            }else{
                this.tagrequest.id.push({
                    dropdownID : [0],
                    dropdownTypeID : -4,
                    key : "EmployeeID"
                })
            }
            this.tagrequest.statusID = this.empdstatus
            this.loaddropdown.loadDropdowns(1,true, [this.tagrequest])
            }
        }
        }
    }
}
