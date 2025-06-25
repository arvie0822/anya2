import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { myData } from 'app/app.moduleId';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { UserService } from 'app/core/user/user.service';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { PayrollLoans } from 'app/model/payroll/payroll-loans';
import { CategoryService } from 'app/services/categoryService/category.service';
import { CoreService } from 'app/services/coreService/coreService.service';
import { LeaveService } from 'app/services/leaveService/leave.service';
import { MasterService } from 'app/services/masterService/master.service';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { CustomModule } from 'app/shared/custom.module';
import { GF } from 'app/shared/global-functions';
import moment from 'moment';
import { forkJoin, Subject, Subscription, takeUntil } from 'rxjs';

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
    selector: 'app-payroll-loans',
    templateUrl: './payroll-loans.component.html',
    styleUrls: ['./payroll-loans.component.css'],
    providers: [
        CurrencyPipe,
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
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    CardTitleComponent,
    DropdownCustomComponent,
    DropdownComponent,
    MatOptionModule,
    MatIconModule,
    CustomModule,
    MatButtonModule,
    TranslocoModule
],
})
export class PayrollLoansComponent implements OnDestroy, OnInit {
    private ngUnsubscribe = new Subject<void>();
    loanstatus: boolean = null
    enable: boolean = true
    loansform: FormGroup
    dropdownOptions = new DropdownOptions
    dropdownFixRequest = new DropdownRequest
    dropdownRequestsub = new DropdownRequest
    dropdownRequestCat = new DropdownRequest
    dropdownRequestloan = new DropdownRequest
    dropdownRequest = new DropdownRequest
    dropdownRequestEmp = new DropdownRequest
    successMessage = Object.assign({},SuccessMessage)
    failedMessage = Object.assign({},FailedMessage)
    mode = 0

    id: string;
    isSave: boolean = false
    pipe = new DatePipe('en-US');
    _onDestroy: any
    @Input() frequency: boolean = false
    @Input() reset: boolean = false
    @Input() payrollType: number = 0
    @Input() shared: boolean = false
    @Input() parentDetail: any[]
    @Input() hidebuttons: boolean = false
    @Input() data: any;
    view: boolean = false
    object: boolean = false
    @Input() _id: string
    @Output() formChanged = new EventEmitter<any>();

    constructor(private fb: FormBuilder,
        private masterService: MasterService,
        private tenantService: TenantService,
        private payrollService: PayrollService,
        private message: FuseConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private coreService: CoreService,
        private currencyPipe: CurrencyPipe) { }

    ngOnChanges(changes: SimpleChanges){

        if("reset" in changes){
            if(this.reset){
                this.loansform.reset()
                this.ngOnInit()
            }
        }
      }

    ngOnInit() {

        this.loansform = this.fb.group(new PayrollLoans());
        this.id = this.route.snapshot.paramMap.get('id');
        myData.stepperIndex = 4
        this.object = true
        if(this.shared){
            this.dropdownFixRequest.id.push(
                { dropdownID: 0, dropdownTypeID: 74 },
                { dropdownID: 0, dropdownTypeID: 53 }
            )
            this.initData()
            this.loansform.get('payrollTypeId').setValue(this.payrollType)
            this.loansform.get('cutoffId').setValue(this.frequency)
            this.loansform.get('status').setValue(1)
            this.reset = false
            return
        }

        if (this.id !== "") {
            this.object = false
            this.enable = false
            this.payrollService.getPayrollLoans(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.loansform.patchValue(value.payload)
                        this.loansform.get('payrollTypeId').setValue(value.payload.payrollTypeId)
                        this.loansform.get('tenure').setValue(value.payload.tenure)
                        this.loansform.get('employeeId').setValue(value.payload.employeeId)
                        this.curformat('withInterest')
                        this.curformat('principalAmount')
                        this.curformat('totalPayments')
                        this.curformat('amortizationAmount')
                        this.calculatemonth()

                        // var empid = value.payload[0].employeeId

                        this.dropdownFixRequest.id.push(

                            { dropdownID: 0, dropdownTypeID: 74 },
                            { dropdownID: 0, dropdownTypeID: 53 }
                        )

                        // this.dropdownRequestEmp.id.push(
                        //     { dropdownID: empid, dropdownTypeID: 0},
                        // )
                        this.loansform.get('employeeId').disable()
                        this.dropdownRequestCat.includeInactive = true
                        this.dropdownRequestCat.id.push(
                            { dropdownID: GF.IsEmptyReturn(this.loansform.get('employeeId').getRawValue(),0), dropdownTypeID: 0 },
                        )
                        this.initData()
                        // var empid = this.loansform.value.employeeId
                        // var display = this.dropdownOptions.employeedef.find(x => x.dropdownID === empid).employeeCode;
                        // this.loansform.get('empId').setValue(display)
                        // this.employeeCode()

                    }
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.isSave = false
                },

            });

            this.initData()
        }

        else this.dropdownFixRequest.id.push(
            // { dropdownID: 0, dropdownTypeID: 58 }
            { dropdownID: 0, dropdownTypeID: 74 },
            { dropdownID: 0, dropdownTypeID: 53 }


        )
        this.initData()

    }
    submit(): void {
        // this.loansform.get('recurEndDate').setValue(this.pipe.transform(this.loansform.value.recurEndDate, "yyyy-MM-ddThh:mm"))
        // var amount = this.loansform.get('withInterest').value.split('.')[0].replace(/\D/g, '')
        var interest = this.loansform.value.withInterest
        if (typeof interest === 'string') {
            var numAmount = parseFloat(this.loansform.value.withInterest.replace(/,/g, ''))
            this.loansform.get('withInterest').setValue(numAmount)
        } else {
            this.loansform.get('withInterest').setValue(interest)
        }

        // var amountprincipal = this.loansform.get('principalAmount').value.split('.')[0].replace(/\D/g, '')
        var principal = this.loansform.value.principalAmount
        if (typeof principal === 'string') {
            var pa = parseFloat(this.loansform.value.principalAmount.replace(/,/g, ''))
            this.loansform.get('principalAmount').setValue(pa)
        } else {
            this.loansform.get('principalAmount').setValue(principal)
        }

        // var amountpayment = this.loansform.get('totalPayments').value.split('.')[0].replace(/\D/g, '')
        var numamountpayment = this.loansform.value.totalPayments
        if (typeof numamountpayment === 'string') {
            var ap = parseFloat(this.loansform.value.totalPayments.replace(/,/g, ''))
            this.loansform.get('totalPayments').setValue(ap)
        } else {
            this.loansform.get('totalPayments').setValue(numamountpayment)
        }

        // var amountamor = this.loansform.get('amortizationAmount').value.split('.')[0].replace(/\D/g, '')
        var numamountamor = this.loansform.value.amortizationAmount
        if (typeof numamountamor === 'string') {
            var am = parseFloat(this.loansform.value.amortizationAmount.replace(/,/g, ''))
            this.loansform.get('amortizationAmount').setValue(am)
        } else {
            this.loansform.get('amortizationAmount').setValue(principal)
        }

        var loandates = this.pipe.transform(this.loansform.value.loanDate, "yyyy-MM-dd")
        var recurtstart = this.pipe.transform(this.loansform.value.recurStartDate, "yyyy-MM-dd")
        var recurtend = this.pipe.transform(this.loansform.value.recurEndDate, "yyyy-MM-dd")

        var dedloans = this.loansform.value

        dedloans.loanDate = loandates
        dedloans.recurStartDate = recurtstart
        dedloans.recurEndDate = recurtend
        dedloans.employeeId = GF.IsEmptyReturn(this.loansform.value?.employeeId?.dropdownID,  this.loansform.get('employeeId').getRawValue())

        if(!this.loansform.value.isHoldFrom && !this.loansform.value.isHoldTo){
            this.loansform.get('isHoldFrom').setValue( new Date().toISOString().substring(0, new Date().toISOString().length - 1))
            this.loansform.get('isHoldTo').setValue( new Date().toISOString().substring(0, new Date().toISOString().length - 1))
        } if(!this.loansform.value.dateClosed){
            this.loansform.get('dateClosed').setValue( new Date().toISOString().substring(0, new Date().toISOString().length - 1))
        }
        if(!this.loansform.value.closedBy){
            this.loansform.get('closedBy').setValue(0)
        }

        // // this.deductionsform.value.frequency.toString()
        // this.loansform.get('withInterest').setValue(numamount)
        // this.loansform.get('principalAmount').setValue(numamountprincipal)
        // this.loansform.get('totalPayments').setValue(numamountpayment)
        // this.loansform.get('amortizationAmount').setValue(numamountamor)
        this.loansform.markAllAsTouched()
        if (this.loansform.valid) {
            const dialogRef = this.message.open(SaveMessage);
            console.log(this.loansform.value)
            JSON.stringify(this.loansform.value)
            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.isSave = true
                    this.payrollService.PostPayrollLoans(dedloans).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.message.open(this.successMessage);
                                this.isSave = false
                                this.router.navigate(['/search/loans-view']);
                                if(myData.backSave){
                                    this.router.navigate(['/detail/payroll-run/', myData.payrollCode]);
                                }
                            }
                            else {
                                this.message.open(this.failedMessage);
                                console.log(value.stackTrace)
                                console.log(value.message)
                            }
                        },
                        error: (e) => {
                            this.isSave = false
                            this.message.open(this.failedMessage);
                            console.error(e)
                        }
                    });
                }
            });
        }
    }
    click(){
        console.log(this.loansform.value.employeeId)
    }

    initData() {
        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFixRequest),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),
            category: this.coreService.getCoreDropdown(1005, this.dropdownRequestCat),
            loantype: this.coreService.getCoreDropdown(1016, this.dropdownRequestsub),

        }).subscribe({
            next: (response) => {
                // API
                this.dropdownOptions.employeedef = response.category.payload
                this.dropdownOptions.loantypedef = response.loantype.payload

                this.dropdownOptions.payoutTypeDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID == 74)
                this.dropdownOptions.cutoffdef = response.dropdownFix.payload.filter(x => x.dropdownTypeID == 53)

                var employeId = this.loansform.get("employeeId").getRawValue()
                this.loansform.get('empId').setValue(response.category.payload.find(x=>x.dropdownID==employeId)?.employeeCode||0)

            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {

            },
        });

    }

    empcode(e){
        this.object = e[0].employeeCode
        this.loansform.get('empId').setValue(this.object)
    }

    employeeCode() {
        this.loansform.get('empId').setValue(this.loansform.value.employeeId.employeeCode)
    }

    calculatemonth() {
        const fromDate = this.pipe.transform(this.loansform.value.recurStartDate, "yyyy-MM-dd")
        const toDate = this.pipe.transform(this.loansform.value.recurEndDate, "yyyy-MM-dd")
        const fromMoment: moment.Moment = moment(fromDate);
        const toMoment: moment.Moment = moment(toDate);
        const diffMonths: number = toMoment.diff(fromMoment, 'months');
        this.loansform.get('tenure').setValue(diffMonths)
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    curformat(fc) {
        if (isNaN(this.loansform.get(fc).value)) {
            return
        }
        var input = Number(this.loansform.get(fc).value)
        var la = "withInterest"
        var pa = "principalAmount"
        var pp = "totalPayments"
        var am = "amortizationAmount"
        switch (fc) {
            case "withInterest":
                this.loansform.get(la).setValue(this.currencyPipe.transform(input, '', '', '1.2-2'))
                break;

            case "principalAmount":
                this.loansform.get(pa).setValue(this.currencyPipe.transform(input, '', '', '1.2-2'))
                break;

            case "totalPayments":
                this.loansform.get(pp).setValue(this.currencyPipe.transform(input, '', '', '1.2-2'))

                break;

            case "amortizationAmount":
                this.loansform.get(am).setValue(this.currencyPipe.transform(input, '', '', '1.2-2'))

                break;
        }
    }

    clearPHP(fc, e) {
        if (isNaN(e.target.value)) {
            this.loansform.get(fc).setValue(null)
        }
        this.loansform.get(fc).setValue(e.target.value)
    }

    confirm(){
        this.loansform.markAllAsTouched()
        if (this.loansform.valid) {
            this.successMessage.title = "Confirmed"
            this.successMessage.message = "Great! you can now proceed with saving"
            this.successMessage.actions.confirm.label = "Okay"
            this.message.open(this.successMessage);
            var data = this.loansform.value
            this.formChanged.emit(data)
        }
      }
}
