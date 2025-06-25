import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { Earning } from 'app/model/payroll/earnings';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { CustomModule } from 'app/shared/custom.module';
import { GF } from 'app/shared/global-functions';
import { forkJoin } from 'rxjs';

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
  selector: 'app-employee-earnings',
  templateUrl: './employee-earnings.component.html',
  styleUrls: ['./employee-earnings.component.css'],
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
    MatIconModule,
    MatButtonModule,
    DropdownComponent,
    DropdownCustomComponent,
    CustomModule,
    TranslocoModule
],
})
export class EmployeeEarningsComponent implements OnInit {

    id: string;
    earningsForm: FormGroup
    isSave: boolean = false
    enable: boolean = true
    dropdownFixRequest = new DropdownRequest
    _onDestroy: any
    dropdownOptions = new DropdownOptions
    dropdownRequest = new DropdownRequest
    dropdownRequestCat = new DropdownRequest
    dropdownRequestsub = new DropdownRequest
    successMessage = Object.assign({},SuccessMessage)
    failedMessage = Object.assign({},FailedMessage)
    pipe = new DatePipe('en-US');
    object: boolean = false

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
        private cp: CurrencyPipe,
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
                this.earningsForm.reset()
                this.ngOnInit()
            }
        }
      }

    ngOnInit() {
        this.object = true
        if (this.parentDetail !== undefined) {
            this.view = this.parentDetail["view"]
            this.id = this._id
          }

        this.earningsForm = this.fb.group(new Earning());
        this.id = this.route.snapshot.paramMap.get('id');
        this.earningsForm.value.employeecode.disable
        myData.stepperIndex = 2
        if(this.shared){
            this.dropdownFixRequest.id.push(
                { dropdownID: 0, dropdownTypeID: 74 },
                { dropdownID: 0, dropdownTypeID: 53 }
            )
            this.initData()
            this.earningsForm.get('payrollTypeId').setValue(this.payrollType)
            this.earningsForm.get('cutoffId').setValue(this.frequency)
            this.earningsForm.get('status').setValue(1)
            this.reset = false
            return
        }
        if (this.id !== "") {
            this.object = false
            this.enable = false
            this.payrollService.getPayrollEarnings(this.id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.earningsForm.patchValue(value.payload)
                        this.curformat('earningsAmount')

                        this.dropdownFixRequest.id.push(
                            { dropdownID: 0, dropdownTypeID: 74 },
                            { dropdownID: 0, dropdownTypeID: 53 }

                        )
                        this.dropdownRequestCat.includeInactive = true
                        this.dropdownRequestCat.id.push(
                            { dropdownID: GF.IsEmptyReturn(this.earningsForm.value.employeeId,0), dropdownTypeID: 0},
                        )
                        this.dropdownRequestsub.id.push(
                            { dropdownID: GF.IsEmptyReturn(this.earningsForm.value.earningsTypeID,0), dropdownTypeID: 0 },
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
        else {
            this.dropdownFixRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 74 },
            { dropdownID: 0, dropdownTypeID: 53 }
        )
        this.initData()
        }
    }
    submit(): void {
        // var amount = this.earningsForm.get('earningsAmount').value.split('.')[0].replace(/\D/g, '')
        var numString = this.earningsForm.value.earningsAmount
        if (typeof numString === 'string') {
            var numamount = parseFloat(this.earningsForm.value.earningsAmount.replace(/,/g, ''))
            this.earningsForm.get('earningsAmount').setValue(numamount)
        } else {
            this.earningsForm.get('earningsAmount').setValue(numString)
        }

        var recurtstart = this.pipe.transform(this.earningsForm.value.recurStartDate, "yyyy-MM-dd")
        var recurtend = this.pipe.transform(this.earningsForm.value.recurEndDate, "yyyy-MM-dd")
        // this.earningsForm.get('recurStartDate').setValue(recurtstart)

        var dedForm = this.earningsForm.value

        dedForm.recurStartDate = recurtstart
        dedForm.recurEndDate = recurtend
        dedForm.employeeId = GF.IsEmptyReturn(this.earningsForm.value?.employeeId?.dropdownID,  this.earningsForm.get('employeeId').getRawValue())

        if(!this.earningsForm.value.isHoldFrom && !this.earningsForm.value.isHoldTo){
            this.earningsForm.get('isHoldFrom').setValue( new Date().toISOString().substring(0, new Date().toISOString().length - 1))
            this.earningsForm.get('isHoldTo').setValue( new Date().toISOString().substring(0, new Date().toISOString().length - 1))
        } if(!this.earningsForm.value.dateClosed){
            this.earningsForm.get('dateClosed').setValue( new Date().toISOString().substring(0, new Date().toISOString().length - 1))
        }
        if(!this.earningsForm.value.closedBy){
            this.earningsForm.get('closedBy').setValue(0)
        }
        this.earningsForm.markAllAsTouched()
        console.log(this.earningsForm)
        if (this.earningsForm.valid) {
            const dialogRef = this.message.open(SaveMessage);
            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.isSave = true

                    this.payrollService.postPayrollEarnings(dedForm).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.message.open(this.successMessage);
                                this.isSave = false
                                this.router.navigate(['/search/earnings-view']);
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
            earnings: this.coreService.getCoreDropdown(1022, this.dropdownRequestsub),
            // cutoff: this.coreService.getCoreDropdown(1018, this.dropdownRequestsub),

        }).subscribe({
            next: (response) => {
                // API
                this.dropdownOptions.employeedef = response.category.payload
                this.dropdownOptions.deductiontypedef = response.earnings.payload
                // this.dropdownOptions.cutoffdef = response.cutoff.payload

                // master

                this.dropdownOptions.payoutTypeDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID == 74)
                this.dropdownOptions.cutoffdef = response.dropdownFix.payload.filter(x => x.dropdownTypeID == 53)

                var employeId = this.earningsForm.get("employeeId").getRawValue()
                this.earningsForm.get('employeecode').setValue(response.category.payload.find(x=>x.dropdownID==employeId)?.employeeCode||0)


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
        this.earningsForm.get('employeecode').setValue(this.object)
    }

    employeeCode(){
        this.earningsForm.get('employeecode').setValue(this.earningsForm.value.employeeId.employeeCode)
     }

    curformat(fc) {
        if (isNaN(this.earningsForm.get(fc).value)) {
            return
        }
        var input = Number(this.earningsForm.get(fc).value)
        var mo = "earningsAmount"
        this.earningsForm.get(mo).setValue(this.currencyPipe.transform(input, '', '', '1.2-2'))

    }
    clearPHP(fc, e) {
        if (isNaN(e.target.value)) {
            this.earningsForm.get(fc).setValue(null)
        }
        this.earningsForm.get(fc).setValue(e.target.value)
    }

    confirm(){
        this.earningsForm.markAllAsTouched()
        if (this.earningsForm.valid) {
            this.successMessage.title = "Confirmed"
            this.successMessage.message = "Great! you can now proceed with saving"
            this.successMessage.actions.confirm.label = "Okay"
            this.message.open(this.successMessage);
            var data = this.earningsForm.value
            this.formChanged.emit(data)
        }

      }

}
