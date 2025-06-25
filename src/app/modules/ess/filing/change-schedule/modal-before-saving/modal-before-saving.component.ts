import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeScheduleComponent } from '../change-schedule.component';
import { DatePipe } from '@angular/common';
import _ from 'lodash';
import { fuseAnimations } from '@fuse/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FilingComponent } from '../../filing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';

export interface PeriodicElement {
    Date: string;
    Shift: string;
    New_Shift: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    // {Date: "01/01/23", Shift: '0800AM_0600PM_SS', New_Shift: "8AM_5PM_SS"},
    // {Date: "01/02/23", Shift: '0800AM_0600PM_SS', New_Shift: "8AM_5PM_SS"},
    // {Date: "01/03/23", Shift: '0800AM_0600PM_SS', New_Shift: "8AM_5PM_SS"},
];


@Component({
    selector: 'app-modal-before-savings',
    templateUrl: './modal-before-saving.component.html',
    styleUrls: ['./modal-before-saving.component.css'],
    providers: [ChangeScheduleComponent],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    TranslocoModule
],
})
export class ModalBeforeSavingComponent implements OnInit {
    pipe = new DatePipe('en-US');
    displayedColumns: string[] = ['Date', 'Shift', 'New_Shift'];
    dataSource = ELEMENT_DATA;

    @ViewChild(ChangeScheduleComponent) changeschedChilds: ChangeScheduleComponent;

    constructor(public dialogRef: MatDialogRef<ModalBeforeSavingComponent>, private cs: ChangeScheduleComponent,private cdr: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public filingtypedropdown: any, public dialog: MatDialog) { }


    ngOnInit() {

        // console.log("sample",this.changeschedChilds)
        // var ds =  _.uniqBy([...this.filingtypedropdown.ds.new_shift], JSON.stringify)

        this.filingtypedropdown.ds.forEach(data => {
            data.new_shift = _.uniqBy([...data.new_shift[0]], JSON.stringify)


        this.dataSource = this.filingtypedropdown.ds.map(x => ({

            Date: this.pipe.transform(x.date, "MM/dd/yyyy"),
            Shift: x.shiftCode,
            New_Shift: x.new_shift

        }))


        });
        // var new_shift = _.uniqBy([...this.filingtypedropdown.ds.filter(x => x.new_shift.include(x.new_shift))]), JSON.stringify)

    }

    copy(e) {
        this.dialogRef.close(e)
        setTimeout(() => {
            // Uncomment this line if submit is required
            // this.submit();

            // Trigger change detection if necessary
            this.cdr.detectChanges();
        });
    }

}
