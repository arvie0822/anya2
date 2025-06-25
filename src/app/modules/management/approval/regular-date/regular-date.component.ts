import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ɵSharedStylesHost } from '@angular/platform-browser';
import { fuseAnimations } from '@fuse/animations';
import { OnlyNumberDirective } from '@fuse/directives/input-/numberOnly.directive';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { CustomModule } from 'app/shared/custom.module';
import { SharedModule } from 'app/shared/shared.module';

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
  selector: 'app-regular-date',
  templateUrl: './regular-date.component.html',
  styleUrls: ['./regular-date.component.scss'],
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
      MatLabel,
      FormsModule,
      MatCardModule,
      TranslocoModule,
      CommonModule,
      ReactiveFormsModule,
      SharedModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatButtonModule,
      MatIconModule,
      NgxMatNativeDateModule,
      MatInputModule,
      CustomModule
     ],
})
export class RegularDateComponent implements OnInit {

  @Output() btnConfirmed = new EventEmitter<any>();
  pipe = new DatePipe('en-US');

  title: string = "Regularize"
  min = new Date()

  terminate   = {
    enable: false,
    dateEffective: null,
    dateSeparated: null,
    dateAccessUntil: null,
    remarks: ""
  }
  extend   = {
    enable: false,
    daysExtension: null,
    daysRegularize: null
  }

  constructor(public dialogRef: MatDialogRef<RegularDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // var dt = this.pipe.transform(this.data.data.dateRegularized,"yyyy-MM-dd");
    // var today = new Date();
    // today.setMonth(0)
    // today.setDate(1)
    // today.setFullYear(today.getFullYear()-1)
    // this.min = (this.data.idx == 2) ? dt : this.pipe.transform(today,"yyyy-MM-dd");
    this.min.setDate(this.min.getDate() - 10)

    this.title            = this.data.idx == 2 ? "Terminate" : "Extend"
    this.terminate.enable = this.data.idx == 2
    this.extend.enable    = this.data.idx == 3
  }

  confirmed(){
    this.dialogRef.close('Confirmed')
    this.btnConfirmed.emit(this.data.idx == 2 ? this.terminate : this.extend)
  }

  cancel(){
    this.dialogRef.close('cancel')
  }

}
