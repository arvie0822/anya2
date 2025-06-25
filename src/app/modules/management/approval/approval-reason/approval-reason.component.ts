import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-approval-reason',
  templateUrl: './approval-reason.component.html',
  styleUrls: ['./approval-reason.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    MatLabel,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
     ],
})
export class ApprovalReasonComponent implements OnInit {
  label: string = ""
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApprovalReasonComponent>
  ) { }

  ngOnInit() {
  }

  confirm(e) {
    this.dialogRef.close(
      {
        confirmed: e,
        reason: "",
        isApproved: true
      }
    )
  }

}
