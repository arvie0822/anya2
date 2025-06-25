
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-dissapprove-reason',
  templateUrl: './dissaprove-reason.component.html',
  styleUrls: ['./dissaprove-reason.component.css'],
  encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
],
})
export class DissapproveReasonComponent implements OnInit {
  label: string = ""
  reason: string = ""
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DissapproveReasonComponent>
  ) { }

  ngOnInit() {
  }

  confirm(e) {
    this.dialogRef.close(
      {
        confirmed: e,
        reason: this.reason,
        isApproved: false
      }
    )
  }

}
