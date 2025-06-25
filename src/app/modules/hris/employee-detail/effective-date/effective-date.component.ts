
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-effective-date',
  templateUrl: './effective-date.component.html',
  styleUrls: ['./effective-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput
],
})
export class EffectiveDateComponent implements OnInit {

  @Output() btnConfirmed = new EventEmitter<void>();
  effectiveDate: any

  constructor(public dialogRef: MatDialogRef<EffectiveDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  confirmed(){
    this.dialogRef.close('Ok')
    this.btnConfirmed.emit(this.effectiveDate)
  }

}
