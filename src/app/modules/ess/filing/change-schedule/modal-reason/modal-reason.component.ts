
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { ChangeScheduleComponent } from '../change-schedule.component';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-modal-reason',
  templateUrl: './modal-reason.component.html',
  styleUrls: ['./modal-reason.component.css'],
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
export class ModalReasonComponent implements OnInit {
    label: string = ""
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalReasonComponent>
  ) { }

  ngOnInit() {
  }

  copy(e){
    this.dialogRef.close(e)
}

}
