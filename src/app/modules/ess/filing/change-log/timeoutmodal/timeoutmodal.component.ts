import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimemodalComponent } from '../timemodal/timemodal.component';
import { fuseAnimations } from '@fuse/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-timeoutmodal',
  templateUrl: './timeoutmodal.component.html',
  styleUrls: ['./timeoutmodal.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
],
})
export class TimeoutmodalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<TimemodalComponent>) { }

  ngOnInit() {
  }
  copy(e){
    this.dialogRef.close(e)
}

}
