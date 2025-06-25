import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Approval } from 'app/model/management/approval';
import { ApprovalReasonComponent } from './approval-reason/approval-reason.component';
import { DissapproveReasonComponent } from './dissaprove-reason/dissaprove-reason.component';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { forkJoin } from 'rxjs';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { DropdownRequest } from 'app/model/dropdown.model';
import { TableRequest } from 'app/model/datatable.model';
import { DatePipe } from '@angular/common';
import { UserService } from 'app/services/userService/user.service';
import { FilingService } from 'app/services/filingService/filing.service';
import { CoreService } from 'app/services/coreService/coreService.service';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';
import { fuseAnimations } from '@fuse/animations';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegularDateComponent } from './regular-date/regular-date.component';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { RegularDateComponent } from './regular-date/regular-date.component';

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

enum mode {
    all = 0,
    next = 1
}

enum reg {
    terminate = 2,
    extend = 3
}

@Component({
    selector: 'app-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.css'],
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
        MatButtonModule,
        MatInputModule,
        MatIconButton,
        MatIconModule,
        MatSelectModule,
        MatBadgeModule,
        MatCardModule,
        CardTitleComponent,
        MatTabsModule,
        MatDatepickerModule,
        DropdownCustomComponent,
        MatTableModule,
        MatPaginatorModule,
        MatRadioModule,
        MatCheckboxModule,
        TranslocoModule
    ],
})

export class ApprovalComponent implements OnInit {

    displayedColumns: any[] = [];
    displayedColumnsH: any[] = [];
    columnsToDisplay: string[] = [];
    columnsToDisplayH: string[] = [];
    data: any[] = [];
    dataHistory: any[] = [];
    dropdownRequest = new DropdownRequest
    dropdownRequestEmployee = new DropdownRequest
    dropdownRequestApproved = new DropdownRequest
    request = new TableRequest()
    requestHistory = new TableRequest()
    AtotalRows: number = 0
    HtotalRows: number = 0

    dialogRefreason: MatDialogRef<ApprovalReasonComponent, any>;
    dialogRef: MatDialogRef<RegularDateComponent, any>;

    // 32	Change Schedule
    // 33	Change Log
    // 34	Leave
    // 35	Official Business
    // 36	Overtime
    // 37	Offset
    // 52	CoE Request
    // 64	Unpaid Hours
    // 114	Change Location
    // 141	Employee Data Change Ess
    // 142	Employee Data Change Mgmt
    // 209	Employee Data Change HR
    // 185	Employee Regularization

    columns = [
        { column: 'Code', columnDef: 'code', view: [32, 33, 34, 35, 36, 37, 52, 64, 114, 141, 142, 209] },
        { column: 'Employee Code', columnDef: 'employeeCode', view: [185] },
        { column: 'Employee Name', columnDef: 'employee', view: [141, 142, 209, 185] },
        { column: 'Data to change', columnDef: 'fieldName', view: [141, 142, 209] },
        { column: 'Current Data', columnDef: 'oldValue', view: [141, 142, 209] },
        { column: 'Change to', columnDef: 'newValue', view: [141, 142, 209] },
        { column: 'Employee', columnDef: 'employee', view: [32, 33, 34, 35, 36, 37, 52, 64, 114] },
        { column: 'Date From', columnDef: 'dateFrom', view: [32, 33, 34, 35, 37, 52, 64, 114] },
        { column: 'Date To', columnDef: 'dateTo', view: [32, 33, 34, 35, 37, 52, 64, 114] },
        { column: 'Leave Type', columnDef: 'leaveType', view: [34] },
        { column: 'Leave Filing Type', columnDef: 'leaveFilingType', view: [34] },
        { column: 'Halfday Option', columnDef: 'halfDayOption', view: [34] },
        { column: 'paid', columnDef: 'paid', view: [34] },
        { column: 'Shift Code', columnDef: 'shiftCode', view: [34] },
        { column: 'Schedule IN', columnDef: 'schedIn', view: [36] },
        { column: 'Schedule OUT', columnDef: 'schedOut', view: [36] },
        { column: 'OT IN', columnDef: 'otIn', view: [36] },
        { column: 'OT OUT', columnDef: 'otOut', view: [36] },
        { column: 'Shift Code', columnDef: 'shiftCode', view: [32] },
        { column: 'Offset Hours', columnDef: 'offsetHours', view: [37] },
        { column: 'Location From', columnDef: 'locationFrom', view: [114] },
        { column: 'Location To', columnDef: 'locationTo', view: [114] },
        { column: 'Reason', columnDef: 'reason', view: [32, 33, 34, 35, 36, 37, 52, 64, 114, 141, 142, 209] },
        { column: 'Status', columnDef: 'status', view: [32, 33, 34, 35, 36, 37, 52, 64, 114, 141, 142, 209] },
        { column: 'Approver', columnDef: 'approvedBy', view: [32, 33, 34, 35, 36, 37, 52, 64, 114, 141, 142, 209] },
        { column: 'Reviewed Date', columnDef: 'approvalDate', view: [32, 33, 34, 35, 36, 37, 52, 64, 114, 141, 142, 209] },
        { column: 'Requested By', columnDef: 'requestedBy', view: [32, 33, 34, 35, 36, 37, 52, 64, 114, 141, 142, 209] },
        { column: 'Request Date', columnDef: 'requestDate', view: [32, 33, 34, 35, 36, 37, 52, 64, 114, 141, 142, 209] },
        { column: 'Date Hired', columnDef: 'dateHired', view: [185] },
        { column: 'Expected Regularization Date', columnDef: 'dateRegularized', view: [185] },
        { column: 'Effective Date', columnDef: 'effectiveDate', view: [141, 142, 209] },
    ]
    // datasource
    CS_DATA = []
    CL_DATA = []
    LV_DATA = []
    OB_DATA = []
    OT_DATA = []
    OFS_DATA = []
    UH_DATA = []
    COE_DATA = []

    approvalForm: FormGroup
    historyForm: FormGroup
    binding: string;

    radiobuttons = []
    isSave = false
    _onDestroy: any
    moduleId: any
    historyId: any
    moduleIdSelected: any
    pipe = new DatePipe('en-US');
    all = [{ dropdownID: 0, description: "All" }]

    employee = []
    filingcodeOption = []
    employeeHistory = []
    codes = []
    filing = []
    selectedItem = []
    excluded = []
    late = false
    isHistoryLoaded = false;
    codefiling = false;
    customRequest = new DropdownRequest
    successMessage = Object.assign({}, SuccessMessage)
    saveMessage = Object.assign({}, SaveMessage)
    failedMessage = Object.assign({}, FailedMessage)

    constructor(private route: ActivatedRoute,
        private tenantService: TenantService,
        private coreService: CoreService,
        private fb: FormBuilder,
        private router: Router,
        public dialog: MatDialog,
        private message: FuseConfirmationService,
        private userService: UserService,
        private filingService: FilingService,
        private cd : ChangeDetectorRef
    ) { }

    get af() { return this.approvalForm.value }
    get hf() { return this.historyForm.value }

    ngOnInit() {
        this.approvalForm = this.fb.group(new Approval())
        this.historyForm = this.fb.group(new Approval())
        this.request.Length = 20
        this.requestHistory.Length = 20

        this.loadData()
    }

    loadHistory() {
        this.displayedColumnsH = this.columns.filter(x => x.view.includes(this.hf.code))
        this.columnsToDisplayH = [...['attachment'], ...this.displayedColumnsH.map(item => item.columnDef)]

        this.tenantService.getApprovalHistoryTable(this.requestHistory)
            .subscribe({
                next: (value: any) => {
                    this.HtotalRows = value.payload.totalRows
                    this.dataHistory = value.payload.data
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                }
            });
    }

    loadData() {
        forkJoin({
            tenant: this.tenantService.getApprovalPendingCount(),
            dropdownModule: this.coreService.getCoreDropdown(1028, this.dropdownRequest),
        }).subscribe({
            next: (value: any) => {
                this.moduleIdSelected = GF.IsEmptyReturn(value.tenant.payload[0]?.moduleId, null)
                this.radiobuttons = value.tenant.payload
                this.filing = value.dropdownModule.payload
                if (this.moduleIdSelected) {
                    this.ChangeModule(value.tenant.payload[0])
                    this.cd.detectChanges()
                } else {
                    this.data = [];
                }
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            }
        });
    }

    insertCol(col, T, v) {
        T[col] = v
        return T
    }

    ChangeModule(mId) {
        debugger
        this.selectedItem = []
        this.codes = []
        this.approvalForm.reset()
        this.request.SearchColumn = []
        this.request.SearchColumn.push({
            key: "moduleId",
            value: mId.moduleId + "",
            type: 2
        })
        this.onTable(mId)
    }

    get ApMid() {
        return GF.IsEmptyReturn(this.moduleId?.moduleId, 0)
    }

    get HisMid() {
        return GF.IsEmptyReturn(this.historyId, 0)
    }

    onTable(mId) {
        this.filingcodeOption = []
        this.codefiling = false
        this.moduleId = mId
        this.dropdownRequestEmployee.id = []
        this.dropdownRequestEmployee.id.push({ dropdownID: GF.IsEmptyReturn(mId?.moduleId, 0), dropdownTypeID: 13 })
        forkJoin({
            tenant: this.tenantService.getApprovalPendingTable(this.request),
            employees: this.tenantService.getApprovalEmployeeDropdown(this.dropdownRequestEmployee),
            filingcCode:  this.tenantService.getApprovalPendingDropdown(this.dropdownRequest, this.moduleId?.encryptId || ""),
        }).subscribe({
            next: (value: any) => {
                this.employee = value.employees.payload
                this.filingcodeOption = value.filingcCode.payload
                this.codefiling = true
                this.displayedColumns = this.columns.filter(x => x.view.includes(this.moduleId.moduleId))
                var ac = this.moduleId.moduleId == 185 ? ["checkbox"] : ["checkbox", "attachment"] // 185 regularization module id

                this.columnsToDisplay = [...ac, ...this.displayedColumns.map(item => item.columnDef).slice()];
                this.data = value.tenant.payload.data.map(function (obj) {
                    obj.checked = false;
                    return obj;
                });
                this.data = this.ApMid === 36 ? this.splitOtEntries(this.data) : this.data;
                if (this.selectedItem.some(x=>x.id===0)) {
                    this.selectAll({checked:true}, mode.next)
                }
                this.AtotalRows = value.tenant.payload.totalRows
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            }
        });
    }


    splitOtEntries(data) {
        let result = [];
        data.forEach(entry => {
            if (GF.IsEmpty(entry?.otIn)) {
                result.push(entry);
            } else {
                entry?.otIn.forEach((otInValue, index) => {
                    result.push({
                        ...Object.fromEntries(Object.keys(entry).map(key => [key, index === 0 ? entry[key] : ""])), // Keep first row data, clear others
                        child: index !== 0,
                        otIn: otInValue,
                        otOut: entry.otOut[index] || "" // Match otIn[i] with otOut[i]
                    });
                });
            }
        });
        return result;
    }

    selectEmployee(e) {
        this.dropdownRequest["employeeId"] = this.af.employee

        this.tenantService.getApprovalPendingDropdown(this.dropdownRequest, this.moduleId?.encryptId || "")
            .subscribe({
                next: (value: any) => {
                    this.codes = [...[{ dropdownID: "", description: "All" }], ...value.payload.map(k => ({
                        dropdownID: k.description, description: k.description
                    }))]
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                }
            });
    }

    openModalDissapprove() {
        if (this.data.length === 0 || GF.IsEmpty(this.selectedItem)) {
            FailedMessage.message = translate("No Filing selected!")
            FailedMessage.title = "Warning!"
            this.message.open(FailedMessage);
            return
        }
        const dialogRef = this.dialog.open(DissapproveReasonComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.confirmed) {
                this.submit(result)
            }
        });
    }

    openModalApprove() {
        if (this.data.length === 0 || GF.IsEmpty(this.selectedItem)) {
            FailedMessage.message = translate("No Filing selected!")
            FailedMessage.title = "Warning!"
            this.message.open(FailedMessage);
            return
        }

        var obj = {
            confirmed: "",
            reason: "",
            isApproved: true
        }
        this.submit(obj)
    }

    // check box function
    selectOne(e, i) {

        var id = this.data[i].id
        var hasId = this.selectedItem.some(x => x.id === id)
        var hasZero = this.selectedItem.some(x => x.id === 0)

        if (!hasId) {
            this.selectedItem.push({ id: id, page: this.request.Start })
            var count = this.selectedItem.filter(x => x.page == this.request.Start).length
            // if (count == this.data.length){
            //     this.selectedItem.push({id: 0, page: this.request.Start})
            // }
            if (hasZero) {
                var ex = this.excluded.findIndex(x => x === id)
                if (ex > -1) {
                    this.excluded.splice(ex, 1)
                }
            }
        } else {
            var idx = this.selectedItem.findIndex(x => x.id == id && x.page == this.request.Start)
            if (idx > -1) {
                this.selectedItem.splice(idx, 1)
            }
            if (hasZero) {
                this.excluded.push(id);
            }
        }
    }

    selectAll(e, m) {
        if (e.checked) {
            var Items = []
            var data = []
            if (m === mode.next) {
                data = this.data.filter(x => !this.excluded.includes(x.id))
            } else {
                data = this.data
            }
            Items = [...[0], ...data.map(x => x.id)].map(item => ({
                id: item,
                page: this.request.Start
            }))

            this.selectedItem = _.uniqBy([...Items, ...this.selectedItem], JSON.stringify)
        } else {
            this.selectedItem = []
            this.excluded = []
        }
    }

    itemChecked(all, i) {
        var id = this.data[i]?.id
        if (!id) { return }
        if (all) {
            return this.selectedItem.some(x => x.id === 0 && x.page == this.request.Start)
        } else {
            if (this.selectedItem.some(x => x.id === 0 && x.page == this.request.Start && this.excluded.includes(x.id))) {
                return true
            } else {
                return this.selectedItem.some(x => x.id === id && x.page == this.request.Start)
            }
        }
    }
    //end of check box function

    search() {
        this.request.SearchColumn = []
        this.request.SearchColumn.push(
            {
                key: "moduleId",
                value: this.moduleId.moduleId + "",
                type: 2
            }
        )
        if ((this.af.dateFrom !== "" && this.af.dateFrom !== null) && (this.af.dateTo !== "" && this.af.dateTo !== null)) {
            this.request.SearchColumn.push({
                key: "dateFrom",
                value: this.pipe.transform(this.af.dateFrom, "MM/dd/yyyy"),
                type: 4
            },
                {
                    key: "dateTo",
                    value: this.pipe.transform(this.af.dateTo, "MM/dd/yyyy"),
                    type: 5
                })
        }
        if (this.af.employee !== null && this.af.employee.length > 0) {
            this.af.employee.forEach(emp => {
                this.request.SearchColumn.push({
                    key: "employeeId",
                    value: emp + "",
                    type: 2
                })
            });
        }
        debugger
        if (this.af.code !== null && this.af.code.length > 0) {
            this.af.code.forEach(co => {
                this.request.SearchColumn.push({
                    key: "code",
                    value: this.filingcodeOption.find(x => x.dropdownID == co)?.description,
                    type: 0
                })
            });
        }

        // if (this.af.code !== "" && this.af.code !== null && this.af.code.length > 0 && !this.af.code.some(o => o == "")) {
        //     this.af.code.forEach(co => {
        //         this.request.SearchColumn.push({
        //             key: "code",
        //             value: co,
        //             type: 0
        //         })
        //     });
        // }
        this.onTable(this.moduleId)
    }

    searchHistory() {
        this.requestHistory.SearchColumn = []
        this.requestHistory.SearchColumn.push(
            {
                key: "moduleId",
                value: this.hf.code + "",
                type: 2
            }
        )
        if ((this.hf.dateFrom !== "" && this.hf.dateFrom !== null) && (this.hf.dateTo !== "" && this.hf.dateTo !== null)) {
            this.requestHistory.SearchColumn.push({
                key: "dateFrom",
                value: this.pipe.transform(this.hf.dateFrom, "MM/dd/yyyy 12:01:00"),
                type: 4
            },
                {
                    key: "dateTo",
                    value: this.pipe.transform(this.hf.dateTo, "MM/dd/yyyy 23:59:00"),
                    type: 5
                })
        }
        if (this.hf.employee !== null && this.hf.employee.length > 0) {
            this.hf.employee.forEach(emp => {
                this.requestHistory.SearchColumn.push({
                    key: "employeeId",
                    value: emp + "",
                    type: 2
                })
            });
        }

        this.loadHistory()
    }

    handlePageEvent(e) {
        this.request.Start = e.pageIndex
        this.request.Length = e.pageSize
        this.search()
    }

    handlePageHistoryEvent(e) {
        this.requestHistory.Start = e.pageIndex
        this.requestHistory.Length = e.pageSize
        this.searchHistory()
    }

    loadEmployees() {
        this.isHistoryLoaded = false;
        this.dropdownRequestApproved.id = []
        var mId = this.filing.find(x => x.dropdownID == this.hf.code).dropdownID
        this.historyId = mId
        this.dropdownRequestApproved.id.push({ dropdownID: GF.IsEmptyReturn(mId, 0), dropdownTypeID: 13 })
        this.customRequest = this.dropdownRequestApproved
        this.tenantService.getApprovalApprovedDropdown(this.dropdownRequestApproved).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.employeeHistory = value.payload
                }
                this.isHistoryLoaded = true;
            },
            error: (e) => {
                console.error(e)
            }
        });
    }

    async submit(e) {
        var ds = this.selectedItem
        if (GF.IsEmpty(ds)) { return }

        const dialogRef = this.message.open(SaveMessage);

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result == "confirmed") {
                var req = {
                    FilingType: this.moduleId.moduleId,
                    IsApproved: e.isApproved,
                    Remarks: e.reason,
                    Excludes: this.excluded,
                    // Requests: ds.map(x => x.id),
                    Requests: ds.filter(v => !GF.IsEmpty(v.id, true)).map(x => x.id),
                    tRequest: this.request.SearchColumn
                }
                this.tenantService.postApprovalProcess(req, this.late).subscribe({
                    next: (value: any) => {
                        this.coreService.valid(value, this.late, ds.length, false, "", "").then((res) => {
                            if (res.saveNow) {
                                this.late = res.lateSave
                                this.submit(e)
                                return
                            }

                            if (res.reset) {
                                this.reset()
                            }
                        })

                    },
                    error: (e) => {
                        this.isSave = false
                        this.message.open(FailedMessage);
                        console.error(e)
                    }
                });
            }
        })
    }

    download(ii, moduleId) {
        if (this.moduleId.moduleId === 52 || this.historyForm.value.code == 52) {
            this.coreService.directDownloadBoldRTemplate("COE v2", '', "pdf", "{'EncryptedCOEID':['" + ii.encryptId + "']}", null, false, "")
        } else {
            this.coreService.downloadAttachment(ii.uploadPath.replace("C:\\fakepath\\", ''), ii.id, moduleId);
        }
    }

    reset() {
        this.isSave = false
        this.late = false
        this.selectedItem = []
        this.loadData()
        // this.ChangeModule(this.moduleId)
    }

    async openDate(ii) {
        this.dialogRef = this.dialog.open(RegularDateComponent, {
            width: '20%',
            disableClose: true,
            data: { idx: ii }
        });

        const result = await new Promise<any>((resolve) => {
            this.dialogRef.componentInstance.btnConfirmed.subscribe((confirmedResult: any) => {
                resolve(confirmedResult);
            });
        });

        if ((ii === reg.terminate && GF.IsMultiEmpty(result, ["dateEffective", "dateSeparated", "dateAccessUntil"], false)) || (ii === reg.extend && GF.IsMultiEmpty(result, ["daysExtension", "daysRegularize"], false))) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = translate("All fields are Required!")
            this.message.open(this.failedMessage);
            return null;
        }

        var obj: any = null

        switch (ii) {
            case reg.terminate:
                obj = {
                    dateEffective: this.pipe.transform(result.dateEffective, "yyyy-MM-dd"),
                    dateSeparated: this.pipe.transform(result.dateSeparated, "yyyy-MM-dd"),
                    dateAccessUntil: this.pipe.transform(result.dateAccessUntil, "yyyy-MM-dd"),
                    remarks: result.remarks
                };
                break;
            case reg.extend:
                obj = {
                    daysExtension: Number(result.daysExtension),
                    daysRegularize: Number(result.daysRegularize),
                };
                break;
        }
        return obj;
    }

    async openRegularization(ii) {

        if (GF.IsEmpty(this.selectedItem)) {
            this.failedMessage.title = translate("Warning!");
            this.failedMessage.message = translate("Select at least one employee.");
            this.failedMessage.actions.confirm.label = "Ok";
            this.message.open(this.failedMessage);
            return
        }
        if (ii == 1) { // Regularize same as normal approval
            this.openModalApprove();
            return;
        }
        var api = ii == 2 ? "postTerminateEmployee" : "postExtendRegularization";
        var result = await this.openDate(ii);
        if (!result) { return; }

        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe(async (confirm) => {
            if (confirm == "confirmed") {

                var final = this.selectedItem.map(x => ({
                    id: x.id,
                    ...result
                }))

                this.filingService[api](final).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.message.open(this.successMessage)
                            this.reset();
                        } else {
                            this.message.open(this.failedMessage)
                        }
                    },
                    error: (e) => {
                        console.error(e)
                    },
                    complete: () => {
                    }
                });
            }
        })
    }

    getBadgeClass(count): string {
        if (count < 999) {
            return 'mat-badge-medium';
        }else{
            return 'mat-badge-large';
        }
        // if (count < 100)
        // if (count < 1000) return 'mat-badge-large';
    }
}
