import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { PayrollDeduction } from 'app/model/payroll/payroll-deductions';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { GF } from 'app/shared/global-functions';
import { myData } from 'app/app.moduleId';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CustomModule } from 'app/shared/custom.module';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';
import { MomentDateAdapter } from '@angular/material-moment-adapter';


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
    selector: 'app-payroll-deduction',
    templateUrl: './payroll-deduction.component.html',
    styleUrls: ['./payroll-deduction.component.css'],
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
export class PayrollDeductionComponent implements OnInit {
    id: string;
    deductionsform: FormGroup
    isSave: boolean = false
    enable: boolean = true
    dropdownFixRequest = new DropdownRequest
    _onDestroy: any
    dropdownOptions = new DropdownOptions
    dropdownRequest = new DropdownRequest
    dropdownRequestCat = new DropdownRequest
    dropdownRequestsub = new DropdownRequest
    pipe = new DatePipe('en-US');
    successMessage = Object.assign({},SuccessMessage)
    failedMessage = Object.assign({},FailedMessage)
    object: any

    @Input() parentDetail: any[]
    @Input() hidebuttons: boolean = false
    @Input() reset: boolean = false
    @Input() data: any;
    @Input() frequency: boolean = false
    @Input() payrollType: number = 0
    @Input() shared: boolean = false
    view: boolean = false
    @Input() _id: string
    @Output() formChanged = new EventEmitter<any>();

    constructor(private fb: FormBuilder,
        private masterService: MasterService,
        // private shiftService: ShiftService,
        private tenantService: TenantService,
        private payrollService: PayrollService,
        // private leaveService: LeaveService,
        // private categoryService: CategoryService,
        private message: FuseConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        // private cp: CurrencyPipe,
        private coreService: CoreService,
        private currencyPipe: CurrencyPipe
    ) { }

    ngOnChanges(changes: SimpleChanges){
        if (this.parentDetail !== undefined) {
          this.view = this.parentDetail["view"]
          this.id = this._id
          this.ngOnInit()
        }

        if("reset" in changes){
            if(this.reset){
                this.deductionsform.reset()
                this.ngOnInit()
            }
        }
      }

    ngOnInit() {
        if (this.parentDetail !== undefined) {
            this.view = this.parentDetail["view"]
            this.id = this._id
          }

        this.deductionsform = this.fb.group(new PayrollDeduction());
        this.id = this.route.snapshot.paramMap.get('id');
        this.deductionsform.value.employeecode.disable
        myData.stepperIndex = 3

        if(this.shared){
            this.dropdownFixRequest.id.push(
                { dropdownID: 0, dropdownTypeID: 74 },
                { dropdownID: 0, dropdownTypeID: 53 }
            )
            this.initData()
            this.deductionsform.get('payrollTypeId').setValue(this.payrollType)
            this.deductionsform.get('cutoffId').setValue(this.frequency)
            this.deductionsform.get('status').setValue(1)
            this.reset = false
            return
        }

        if (this.id !== "") {
            this.enable = false
            this.payrollService.getPayrollDeductions(this.id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.deductionsform.patchValue(value.payload)
                        this.curformat('deductionsAmount')

                        this.dropdownFixRequest.id.push(
                            { dropdownID: 0, dropdownTypeID: 74 },
                            { dropdownID: 0, dropdownTypeID: 53 }

                        )
                        this.dropdownRequestCat.includeInactive = true
                        this.dropdownRequestCat.id.push(
                            { dropdownID: GF.IsEmptyReturn(this.deductionsform.value.employeeId,0), dropdownTypeID: 0 },
                        )
                        this.dropdownRequestsub.id.push(
                            { dropdownID: GF.IsEmptyReturn(this.deductionsform.value.deductionsTypeID,0), dropdownTypeID: 0 },
                        )
                        this.initData()


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

        else this.dropdownFixRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 74 },
            { dropdownID: 0, dropdownTypeID: 53 }
        )
        this.initData()

    }

    empcode(e){
        this.object = e[0].employeeCode
        this.deductionsform.get('employeecode').setValue(this.object)
    }

    employeeCode(){
    }


    submit(): void {
        // var amount = this.deductionsform.get('deductionsAmount').value.split('.')[0].replace(/\D/g, '')
        var numString = this.deductionsform.value.deductionsAmount
        if (typeof numString === 'string') {
            var numamount = parseFloat(this.deductionsform.value.deductionsAmount.replace(/,/g, ''))
            this.deductionsform.get('deductionsAmount').setValue(numamount)
        } else {
            this.deductionsform.get('deductionsAmount').setValue(numString)
        }

        var recurtstart = this.pipe.transform(this.deductionsform.value.recurStartDate, "yyyy-MM-dd")
        var recurtend = this.pipe.transform(this.deductionsform.value.recurEndDate, "yyyy-MM-dd")
        // this.deductionsform.get('recurStartDate').setValue(recurtstart)

        var dedForm = this.deductionsform.value

        dedForm.recurStartDate = recurtstart
        dedForm.recurEndDate = recurtend
        dedForm.employeeId = GF.IsEmptyReturn(this.deductionsform.value?.employeeId?.dropdownID,  this.deductionsform.get('employeeId').getRawValue())
        if(!this.deductionsform.value.isHoldFrom && !this.deductionsform.value.isHoldTo){
            this.deductionsform.get('isHoldFrom').setValue( new Date().toISOString().substring(0, new Date().toISOString().length - 1))
            this.deductionsform.get('isHoldTo').setValue( new Date().toISOString().substring(0, new Date().toISOString().length - 1))
        } if(!this.deductionsform.value.dateClosed){
            this.deductionsform.get('dateClosed').setValue( new Date().toISOString().substring(0, new Date().toISOString().length - 1))
        }
        if(!this.deductionsform.value.closedBy){
            this.deductionsform.get('closedBy').setValue(0)
        }

        this.deductionsform.markAllAsTouched()
        if (this.deductionsform.valid) {
            const dialogRef = this.message.open(SaveMessage);
            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.isSave = true

                    this.payrollService.postPayrollDeductions(dedForm).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.message.open(this.successMessage);
                                this.isSave = false
                                this.router.navigate(['/search/deductions-view']);
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
    initData() {
        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFixRequest),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),
            category: this.coreService.getCoreDropdown(1005, this.dropdownRequestCat),
            deduction: this.coreService.getCoreDropdown(1021, this.dropdownRequestsub),
            // cutoff: this.coreService.getCoreDropdown(1018, this.dropdownRequestsub),

        }).subscribe({
            next: (response) => {
                // API
                this.dropdownOptions.employeedef = response.category.payload
                this.dropdownOptions.deductiontypedef = response.deduction.payload
                // this.dropdownOptions.cutoffdef = response.cutoff.payload

                // master
                this.dropdownOptions.payoutTypeDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID == 74)
                this.dropdownOptions.cutoffdef = response.dropdownFix.payload.filter(x => x.dropdownTypeID == 53)

                var employeeId = this.deductionsform.get("employeeId").getRawValue()
                this.deductionsform.get('employeecode').setValue(response.category.payload.find(x=>x.dropdownID==employeeId)?.employeeCode||0)
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {

            },
        });

    }
    curformat(fc) {
        if (isNaN(this.deductionsform.get(fc).value)) {
            return
        }
        var input = Number(this.deductionsform.get(fc).value)
        var mo = "deductionsAmount"
        this.deductionsform.get(mo).setValue(this.currencyPipe.transform(input, '', '', '1.2-2'))

    }

    handleInput(event) {
        // Remove any non-numeric characters except '-' and ','
        const inputValue = event.target.value.replace(/[^0-9-,]/g, '');

        // Update the form control value
        this.deductionsform.get('deductionsAmount').setValue(inputValue);
      }

    clearPHP(fc, e) {
        if (isNaN(e.target.value)) {
            this.deductionsform.get(fc).setValue(null)
        }
        this.deductionsform.get(fc).setValue(e.target.value)
    }

    confirm(){
        this.deductionsform.markAllAsTouched()
        if (this.deductionsform.valid) {
            this.successMessage.title = "Confirmed"
            this.successMessage.message = "Great! you can now proceed with saving"
            this.successMessage.actions.confirm.label = "Okay"
            this.message.open(this.successMessage);
            var data = this.deductionsform.value
            this.formChanged.emit(data)
        }
      }

}
