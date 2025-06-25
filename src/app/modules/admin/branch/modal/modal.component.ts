
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
    imports: [
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
],

})
export class ModalComponent implements OnInit {
    // checked : boolean = true
    // dialogRef: any;
    constructor(
        public dialogRef: MatDialogRef<ModalComponent>,
        public dialog: MatDialog) {}
    Branchinfo: boolean = false;
    Address: boolean = false;
    Govinfo: boolean = false;
    ContactInfo: boolean = false;
    branchsettinginfo : boolean = false

    branchinformation  : boolean = false
    contactinformation : boolean = false
    govermentinfo      : boolean = false
    addressinformation : boolean = false
    branchsettings     : boolean = false

    copyNow(){
        this.dialogRef.close(
            {
                confirmed: true,
                branchinformation: this.branchinformation,
                contactinformation: this.contactinformation,
                govermentinfo: this.govermentinfo,
                addressinformation: this.addressinformation,
                branchsettings : this.branchsettings
            }
        )
    }


    ngOnInit() {
    }



}
