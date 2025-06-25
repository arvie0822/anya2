import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { CategoryPayrollCutoffHeader, CategoryPayrollCutoffLocking } from 'app/model/payroll/payroll-cutoff';
import { values } from 'lodash';
import { forkJoin } from 'rxjs';
import { LockFilingComponent } from './lock-filing/lock-filing.component';
import { CategoryService } from 'app/services/categoryService/category.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { ThisReceiver } from '@angular/compiler';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { TableRequest } from 'app/model/datatable.model';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';


@Component({
    selector: 'app-payroll-cutoff',
    templateUrl: './payroll-cutoff.component.html',
    styleUrls: ['./payroll-cutoff.component.css'],
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
      CardTitleComponent,
      MatTableModule,
      MatPaginatorModule,
      DropdownComponent,
      MatSelectModule,
      MatIconModule,
      MatSelectModule,
      MatButtonModule,
      TranslocoModule,
      MatDialogModule,
    ],


})
export class PayrollCutoffComponent implements OnInit {
    isDisabled: boolean = true
    payrollform: FormGroup
    payrollformlock: FormGroup
    dropdownOptions = new DropdownOptions
    dropdownFixRequest = new DropdownRequest;
    dropdownRequest = new DropdownRequest
    @ViewChild(MatTable) matTable: MatTable<any>;
    datesource = []
    weeksource: any = []
    id: string
    isLoadingResults: boolean = true;
    totalRows: number = 0
    request = new TableRequest()
    pipe = new DatePipe('en-US');
    dateStart: any
    dsMonth: any
    dateEnd: any
    deMonth: any
    payDay: any
    pdMonth: any
    year: any
    ReportingMonth: any
    _destroy: any
    displayedColumns2: string[] = ['cutoffId', 'dateFrom', 'dateEnd', 'payout', 'filingLockDate', 'approvalLockDate', 'edit',];
    dataSource2 = []
    isSave: boolean = false
    description: string
    payoutID: any
    active: boolean = true
    dateTo: any
    disable: boolean = false

    hidesavebutton : boolean = true

    Year = [
        { id: 2022, description: '2022' },
        { id: 2023, description: '2023' },
        { id: 2024, description: '2024' },
        { id: 2025, description: '2025' },
        { id: 2026, description: '2026' },
        { id: 2027, description: '2027' },
        { id: 2028, description: '2028' },
    ];

    dialogRef: MatDialogRef<LockFilingComponent, any>;

    constructor(
        public dialog: MatDialog,
        private fb: FormBuilder,
        private masterService: MasterService,
        private tenantService: TenantService,
        private categoryService: CategoryService,
        private message: FuseConfirmationService,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private router: Router,) { }

    get pf() {
        return this.payrollform.getRawValue()
    }

    ngOnInit() {

        var list = [
            {
                id: 0,
                name: "juam"
            },
            {
                id: 1,
                name: "james"
            }
        ]

        var action = sessionStorage.getItem("action")
        if (action == 'view') {
           this.hidesavebutton = false
        }else{
           this.hidesavebutton = true

        }

        this.id = this.route.snapshot.paramMap.get('id');
        this.payrollform = this.fb.group(new CategoryPayrollCutoffHeader());
        this.payrollformlock = this.fb.group(new CategoryPayrollCutoffLocking());
        if (this.id !== "") {
            this.disable = true
            this._destroy = this.categoryService.getPayrollCutoffHeader(this.id, new Date().getFullYear()).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.payrollform.get('payoutTypeId').disable()
                        this.datesource = (value.payload.categoryPayrollCutoff)
                        this.payrollform.patchValue(value.payload)
                        this.payrollformlock.get('year').setValue(new Date().getFullYear())
                        this.dataSource2 = value.payload.categoryPayrollCutoffLocking.map(x => ({
                            cutoffName: x.cutoffName,
                            dateFrom: x.dateFrom,
                            dateTo: x.dateTo,
                            payout: x.payout,
                            filingLockDate: x.filingLockDate,
                            approvalLockDate: x.approvalLockDate,
                            filingLockDatecopy: x.filingLockDate,
                            approvalLockDatecopy: x.approvalLockDate,
                            year: this.payrollformlock.get('year').value,
                            categoryPayrollCutoffLockingId: x.categoryPayrollCutoffLockingId,
                            monthId : x.monthId,
                            cutoffId : x.cutoffId,
                            weekId : x.weekId,
                            filingLockStatus : x.filingLockStatus,
                            approvalLockStatus : x.approvalLockStatus
                        }))
                    }
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.isSave = false

                }
            })
        }


        this.dropdownFixRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 69 },
        )
        forkJoin({
            dropdownFixRequest: this.masterService.getDropdownFix(this.dropdownFixRequest),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),
        })
            .subscribe({
                next: (response) => {
                    this.dropdownOptions.payrolldef = response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 69)

                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                },

            });
    }

    submit(): void {

        this.payrollform.markAllAsTouched()
        this.payrollform.get('categoryPayrollCutoff').setValue(this.datesource)

        this.payrollform.get('categoryPayrollCutoffLocking').setValue(this.dataSource2)
        // this.payrollformlock.get('year').setValue(new Date().getFullYear())


        // this.payrollform.get('year').setValue(this.payrollformlock.get('year').value)
        // this.payrollform.get('payoutTypeId').value
        if (this.payrollform.valid) {
            const dialogRef = this.message.open(SaveMessage);
            JSON.stringify(this.payrollform.value)
            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.isSave = true

                    this._destroy = this.categoryService.postPayrollCutoffHeader(this.payrollform.getRawValue()).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.message.open(SuccessMessage);
                                this.isSave = false,
                                    this.router.navigate(['/search/payroll-cutoff-view']);
                            } else {
                                FailedMessage.message = value.message
                                this.message.open(FailedMessage);
                                console.log(value.stackTrace)
                                console.log(value.message)
                            }
                        },
                        error: (e) => {
                            this.isSave = false
                            this.message.open(FailedMessage);
                            console.error(e)
                        }
                    });
                }
            });


        }
    }
    rendertable(e) {
        this.isLoadingResults = true;
        if (this.id == "") {
            this._destroy = this.categoryService.loadPayrollCutoff(e).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        if (e == 12695) {
                            // this.datesource.push(value.payload.filter(x=>))
                            this.datesource = value.payload.map(x => ({
                                cutoffId: x.cutoffId,
                                dateStart: x.dateStart,
                                dateEnd: x.dateEnd,
                                deMonth: x.deMonth,
                                dsMonth: x.dsMonth,
                                payDay: x.payDay,
                                pdMonth: x.pdMonth
                            }))
                        }

                        if (e == 12696) {
                            this.datesource = value.payload.map(x => ({
                                cutoffId: x.cutoffId,
                                dateStart: x.dateStart,
                                dateEnd: x.dateEnd,
                                deMonth: x.deMonth,
                                dsMonth: x.dsMonth,
                                payDay: x.payDay,
                                pdMonth: x.pdMonth,
                                reportingMonth: x.reportingMonth
                            }))
                        }

                        if (e == 12697) {
                            this.datesource = value.payload.map(x => ({
                                dateStart: x.dateStart,
                                dateEnd: x.dateEnd,
                                payDay: x.payDay,
                            }))

                        }
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
        if (e == 12695 || e == 12696 || e == 12697) {
            this.payrollformlock.get('year').setValue("")
            this.dataSource2 = []
        }
    }



    open(e, i) {

        if (this.dialogRef) {
            this.dialogRef.close();

        }
        this.dialogRef = this.dialog.open(LockFilingComponent, {
            panelClass: 'app-dialog',
            data: {
                table: e,
                // payrolltype: this.payrollform.get('payoutTypeId').getRawValue()
                payrolltype: this.payrollform.get('payoutTypeId').getRawValue(),
                id: this.id = this.route.snapshot.paramMap.get('id')
            }


        })
        this.changeDetector.detectChanges()

        this.dialogRef.afterClosed().subscribe(result => {

            if (!result.confirmed) {
                this.dialogRef.close();
                return
            }
            if (result.month == 0 && result.approval == 0) {
                e.cutoffName = e.cutoffName
            }

            if (this.pf.payoutTypeId == 12697) {
                var monthweek = result.month + " " + result.week
                var hasCutoff = this.dataSource2.some(x => x.cutoffName == monthweek)
                if (hasCutoff) {
                    FailedMessage.message = "Cut-off name " + monthweek + " already existed!. please changes it."
                    var def = this.message.open(FailedMessage)
                    def.afterClosed().subscribe(result => {
                        this.open(e, i)
                        return
                    })
                } else if (result.month == 0 && result.approval == 0) {
                    e.cutoffName = e.cutoffName
                } else if (result.month !== 0 && result.approval !== 0) {
                    e.cutoffName = result.month + " " + result.week
                }

            }

            e.dateTo = result.dateto
            e.dateFrom = result.datefrom
            e.payout = result.payout
            e.filingLockDate = result.filingLockStatus == true ? result.filing : null
            e.approvalLockDate = result.approvalstatus == true ? result.approval : null
            e.filingLockDatecopy = result.filing
            e.approvalLockDatecopy = result.approval
            e.filingLockStatus = result.filingLockStatus
            e.approvalLockStatus = result.approvalstatus
            this.changeDetector.detectChanges()
        })
    }


    seconddays(e, i) {
        if (e.value == 1) {
            this.datesource[i].dateEnd = 7
        }
        if (e.value == 2) {
            this.datesource[i].dateEnd = 1
        }
        if (e.value == 3) {
            this.datesource[i].dateEnd = 2
        }
        if (e.value == 4) {
            this.datesource[i].dateEnd = 3
        }
        if (e.value == 5) {
            this.datesource[i].dateEnd = 4
        }
        if (e.value == 6) {
            this.datesource[i].dateEnd = 5
        }
        if (e.value == 7) {
            this.datesource[i].dateEnd = 6
        }
    }

    validateDate(i) {
        // if (this.datesource[i].dateStart > this.datesource[i].dateEnd) {
        //     this.datesource[i].dateStart = 0
        //     FailedMessage.message = "Date From is Greater than Date To"
        //     var def = this.message.open(FailedMessage)
        //     def.afterClosed().subscribe(result => {
        //         return
        //     })
        // } else if (this.datesource[i].dateEnd < this.datesource[i].dateStart) {
        //     this.datesource[i].dateEnd = 0
        //     FailedMessage.message = "Date To is Less than Date From"
        //     var def = this.message.open(FailedMessage)
        //     def.afterClosed().subscribe(result => {
        //         return
        //     })
        // }
        // else if (this.datesource[i].dateStart > 32) {
        //     this.datesource[i].dateStart = 0

        // } else if (this.datesource[i].dateEnd > 32) {
        //     this.datesource[i].dateEnd = 0
        // }
    }

    searchyear(e) {

        var monthlist = [
            {
                month_id: 109,
                month_name: "January",
                month_num: 1,
            },
            {
                month_id: 110,
                month_name: "February",
                month_num: 2,
            },
            {
                month_id: 111,
                month_name: "March",
                month_num: 3,
            },
            {
                month_id: 112,
                month_name: "April",
                month_num: 4,
            },
            {
                month_id: 113,
                month_name: "May",
                month_num: 5,
            },
            {
                month_id: 114,
                month_name: "June",
                month_num: 6,
            },
            {
                month_id: 115,
                month_name: "July",
                month_num: 7,
            },
            {
                month_id: 116,
                month_name: "August",
                month_num: 8,
            },
            {
                month_id: 117,
                month_name: "September",
                month_num: 9,
            },
            {
                month_id: 118,
                month_name: "October",
                month_num: 10,
            },
            {
                month_id: 119,
                month_name: "November",
                month_num: 11,
            },
            {
                month_id: 120,
                month_name: "December",
                month_num: 12,
            }]

        var weeklist = [
            {
                cutoff_id: 107,
                cutoff_name: "First Cut-Off"
            },
            {
                cutoff_id: 108,
                cutoff_name: "Second Cut-Off"
            }
        ]
        var locklist = {

            year: this.payrollformlock.value.year,
            payroll_cutoff_header_id: 0,
            // payout_type_id  : this.payrollform.value.payoutTypeId,
            payout_type_id: this.payrollform.get('payoutTypeId').getRawValue(),
            cutoff_locking: this.datesource,
            cutoff_months: this.payrollform.value.payoutTypeId !== 12697 ? monthlist : [],
            cutoff: this.payrollform.value.payoutTypeId !== 12697 ? weeklist : []
        }

        // this.disable = true

        if (this.id !== "") {
            this._destroy = this.categoryService.getPayrollCutoffHeader(this.id, this.payrollformlock.get('year').value).subscribe({
                next: (value: any) => {


                    if (value.statusCode == 200) {
                        if (value.payload.categoryPayrollCutoffLocking.length > 0) {
                            this.dataSource2 = value.payload.categoryPayrollCutoffLocking.map(x => ({
                                cutoffName: x.cutoffName,
                                dateFrom: x.dateFrom,
                                dateTo: x.dateTo,
                                payout: x.payout,
                                filingLockDate: x.filingLockDate,
                                approvalLockDate: x.approvalLockDate,
                                filingLockDatecopy: x.filingLockDate,
                                approvalLockDatecopy: x.approvalLockDate,
                                year: this.payrollformlock.get('year').value,
                                categoryPayrollCutoffLockingId: x.categoryPayrollCutoffLockingId,
                                cutoffId : x.cutoffId,
                                monthId : x.monthId,
                                weekId : x.weekId,
                                filingLockStatus : x.filingLockStatus,
                                approvalLockStatus : x.approvalLockStatus
                            }))
                        } else {

                            this.re_calculateByYear(locklist)
                        }

                    }
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.isSave = false

                }
            })
        } else{

            this.re_calculateByYear(locklist)
        }

    }

    re_calculateByYear(locklist) {

        this.isLoadingResults = true;
        this._destroy = this.categoryService.loadPayrollCutoffLocking(locklist).subscribe({
            next: (value: any) => {

                if (value.statusCode == 200) {
                    // this.dataSource2 = value.payload
                    this.dataSource2 = value.payload.map(x => ({
                        cutoffName: x.cutoffName,
                        dateFrom: x.dateFrom,
                        dateTo: x.dateTo,
                        payout: x.payout,
                        filingLockDate: null,
                        approvalLockDate: null,
                        filingLockDatecopy: x.filingLockDate,
                        approvalLockDatecopy: x.approvalLockDate,
                        year: this.payrollformlock.value.year,
                        categoryPayrollCutoffLockingId: 0,
                        monthId : x.monthId,
                        cutoffId : x.cutoffId,
                        filingLockStatus : x.filingLockStatus,
                        approvalLockStatus : x.approvalLockStatus
                        // weekId : x.weekId,
                    }))
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

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }
    handlePageEvent(e): void {
        this.request.Start = e.pageIndex
        this.request.Length = e.pageSize
    }
    // showhide(e){
    //     return e == 30383? false : true
    // }
}
