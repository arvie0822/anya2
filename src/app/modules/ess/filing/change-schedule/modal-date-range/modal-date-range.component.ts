
import { Component,Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { ChangeScheduleComponent } from '../change-schedule.component';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-modal-date-range',
  templateUrl: './modal-date-range.component.html',
  styleUrls: ['./modal-date-range.component.sass'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslocoModule
],
})
export class ModalDateRangeComponent implements OnInit {
    @Input() label: string
    dropdownDetail = {

        id: 0,
        description: ""

    }

    placeholder: string = ""

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalDateRangeComponent>) { }

    ngOnInit() {
        this.placeholder = this.label == undefined || this.label == null || this.label == "" ? this.dropdownDetail.description : this.label
    }

    copy(e){
        this.dialogRef.close(e)
    }
}
