import {
    NgxMatDateAdapter,
    NgxMatNativeDateAdapter,
    NGX_MAT_DATE_FORMATS,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDateFormats,
  } from '@angular-material-components/datetime-picker';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMatMomentAdapter, NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { CategoryPayrollCutoffLocking } from 'app/model/payroll/payroll-cutoff';
import * as moment from 'moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogModule } from '@angular/cdk/dialog';
import { CategoryService } from 'app/services/categoryService/category.service';

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

const CUSTOM_DATE_FORMATS = {
    parse: {
      dateInput: 'MM/DD/YYYY HH:mm A',
    },
    display: {
      dateInput: 'MM/DD/YYYY HH:mm A',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'MM/DD/YYYY HH:mm A',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

@Component({
  selector: 'app-lock-filing',
  templateUrl: './lock-filing.component.html',
  styleUrls: ['./lock-filing.component.css'],
  providers: [
    { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
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
//   providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
//               { provide: NgxMatDateAdapter, useClass: NgxMatNativeDateAdapter },
//               { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
//               { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    NgxMatMomentModule,
    TranslocoModule,
    MatDialogModule
],


})
export class LockFilingComponent implements OnInit {

  @ViewChild('picker') picker: any;

//   public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = true;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  pipe = new DatePipe('en-US');
  dateto : any
  id: any
  filingLocked: boolean = false
  approvalLocked: boolean = false

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  month = [
    {id: "Jan" , description : "January"},
    {id: "Feb" , description : "Febuary"},
    {id: "Mar" , description : "March"},
    {id: "Apr" , description : "April"},
    {id: "May" , description : "May"},
    {id: "Jun" , description : "June"},
    {id: "Jul", description : "July"},
    {id: "Aug" , description : "August"},
    {id: "Sep" , description : "September"},
    {id: "Oct" , description : "October"},
    {id: "Nov" , description : "November"},
    {id: "Dec", description : "December"}
  ]

  Week = [
    {id: "Week 1" , description : "Week One"},
    {id: "Week 2" , description : "Week Two"},
    {id: "Week 3" , description : "Week Three"},
    {id: "Week 4" , description : "Week Four"},
    {id: "Week 5" , description : "Week Five"},
  ]

  disableddate : boolean = false

  public listColors = ['primary', 'accent', 'warn'];
  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private changeDetector: ChangeDetectorRef,
        public dialogRef: MatDialogRef<LockFilingComponent>, public dialog: MatDialog, private categoryService: CategoryService,
    ) {
    }
  lockingform : FormGroup
    ngOnInit() {

        this.getPayrollCutoffLocking()

        this.lockingform = this.fb.group(new CategoryPayrollCutoffLocking());

        if(this.data.payrolltype == 12695 || this.data.payrolltype == 12696){
            this.lockingform.get('dateFrom').disable()
            this.lockingform.get('dateTo').disable()

        }
        this.lockingform.get('approvalLockDate').enable()
        this.lockingform.get('filingLockDate').enable()

        this.lockingform.get('dateFrom').setValue(this.data.table.dateFrom)
        this.lockingform.get('dateTo').setValue(this.data.table.dateTo)
        this.lockingform.get('payout').setValue(this.data.table.payout)
        this.lockingform.get('filingLockDate').setValue(this.data.table.payout)
        this.lockingform.get('approvalLockDate').setValue(this.data.table.payout)


        if (this.data.table.filingLockDate !== null) {
            this.lockingform.get('filingLockStatus').setValue(true)
            this.lockingform.get('filingLockDate').setValue(this.data.table.filingLockDatecopy)
            this.lockingform.get('filingLockDate').enable()

            // this.disabledlocking()
        }

        if(this.data.table.approvalLockDate !== null){
            this.lockingform.get('approvalLockStatus').setValue(true)
            this.lockingform.get('approvalLockDate').setValue(this.data.table.approvalLockDatecopy)
            this.lockingform.get('approvalLockDate').enable()

        }

        // this.locked(this.lockingform.value)
    }

    copyNow(){
      // if(this.data.payrolltype == 12697){
      //     if(this.data.table.monthId == ""){

      //     }
      // }
      if(this.lockingform.invalid){
          return
      }
      this.changeDetector.detectChanges()

      this.dialogRef.close(
        {
          confirmed: true,
          month : this.lockingform.value.monthId,
          week : this.lockingform.value.weekId,
          // month : this.lockingform.get('monthId').setValue(),
          datefrom :this.pipe.transform(this.lockingform.get('dateFrom').getRawValue(),"yyyy-MM-ddTHH:mm:ss"),
          dateto : this.pipe.transform(this.lockingform.get('dateTo').getRawValue(),"yyyy-MM-ddTHH:mm:ss"),
          // dateto : this.pipe.transform(this.lockingform.value.dateTo,"yyyy-MM-ddTHH:mm:ss"),
          payout : this.pipe.transform(this.lockingform.value.payout,"yyyy-MM-ddTHH:mm:ss"),
          filing :this.pipe.transform(this.lockingform.get('filingLockDate').getRawValue(),"yyyy-MM-ddTHH:mm:ss"),
          approval :this.pipe.transform(this.lockingform.get('approvalLockDate').getRawValue(),"yyyy-MM-ddTHH:mm:ss"),
          filingLockStatus : this.lockingform.get('filingLockStatus').getRawValue(),
          approvalstatus : this.lockingform.get('approvalLockStatus').getRawValue()
        }
      )
    }

    disabledlocking(){

        if (this.lockingform.value.filingLockStatus == true) {
           this.lockingform.get('filingLockDate').enable()
        }
        // else{
        //     this.lockingform.get('filingLockDate').disable()
        // }
        this.changeDetector.detectChanges()

    }

    disabledapproval(){
        if (this.lockingform.value.approvalLockStatus == true) {
           this.lockingform.get('approvalLockDate').enable()
        }
        // else{
        //     this.lockingform.get('approvalLockDate').disable()
        // }
        this.changeDetector.detectChanges()
    }


    locked(date,filing){
        var status = filing ? this.filingLocked : this.approvalLocked

        var today = this.pipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss")
        var lockDate = this.pipe.transform(new Date(date), "yyyy-MM-dd HH:mm:ss")
        var isLocked = today > lockDate && status
        return isLocked
    }

    getPayrollCutoffLocking() {
        this.categoryService.getPayrollCutoffHeader(this.data.id, new Date().getFullYear()).subscribe({
          next: (value: any) => {
              if (value.statusCode == 200) {

                var item = value.payload.categoryPayrollCutoffLocking.find(item => item.categoryPayrollCutoffLockingId === this.data.table.categoryPayrollCutoffLockingId);

                if (item) {
                  this.filingLocked = item.filingLockStatus
                  this.approvalLocked = item.approvalLockStatus
                }
              }
          },
          error: (err) => {
          }
        })
      }

      makeMinuteReadonly() {
        setTimeout(() => {
          const minuteInputs = document.querySelectorAll('input[formcontrolname="minute"]');
          minuteInputs.forEach((input: any) => {
            input.setAttribute('readonly', 'true');
          });
        }, 0); // Wait for DOM to render
      }
}
