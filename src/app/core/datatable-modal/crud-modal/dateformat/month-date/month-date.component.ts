import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';
import { CdkTableModule } from '@angular/cdk/table';

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { MatTimepickerModule } from 'mat-timepicker';

export const MY_FORMATS = {
    parse: {
        dateInput: 'MMM DD',
      },
      display: {
        dateInput: 'MMM DD',
        monthYearLabel: 'MMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
  };

  const CUSTOM_DATE_FORMATS = {
    parse: {
        dateInput: 'MM-DD-YYYY HH:mm A',
    },
    display: {
        dateInput: 'MM-DD-YYYY HH:mm A',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'MM-DD-YYYY HH:mm A',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
  selector: 'app-month-date',
  templateUrl: './month-date.component.html',
  styleUrls: ['./month-date.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    CdkTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatTimepickerModule
],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
})
export class MonthDateComponent implements OnInit {
    @Input() label: string
    @Input() control: AbstractControl = new FormControl();
    minDate: Date;
    maxDate: Date;
  constructor() { }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0, 1);
    this.maxDate = new Date(currentYear + 1, 0, 1);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }

}
