import { Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import _, { divide } from 'lodash';
import { TableRequest } from 'app/model/datatable.model';
import { MatTable, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayrollAnnualized } from 'app/model/payroll/payroll-run';
import { fuseAnimations } from '@fuse/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';

enum mode {
    all = 0,
    next = 1
}

@Component({
  selector: 'app-dialogBoxAnnualized',
  templateUrl: './dialogBoxAnnualized.component.html',
  styleUrls: ['./dialogBoxAnnualized.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CardTitleComponent,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
]
})
export class DialogBoxAnnualizedComponent implements OnInit {
    id              : number;
    payrollCode     : string;
    divideTaxPay    : number;
    projectedGovCon : boolean;
    annualized      : any;
    annualizedForm  : FormGroup;
    selection       = new SelectionModel<Element>(true, []);
    request         = new TableRequest()
    successMessage  = Object.assign({},SuccessMessage)
    failedMessage   = Object.assign({},FailedMessage)
    notifMessage    = Object.assign({},FailedMessage)
    @ViewChild('table') table: MatTable<any>;

    govcon = [
        { id: true, description: 'Yes' },
        { id: false, description: 'No' },
    ]

constructor(@Inject(MAT_DIALOG_DATA) public data: any,
public dialogRef: MatDialogRef<DialogboxComponent>,
private payrollService: PayrollService,
private message: FuseConfirmationService,
private fb: FormBuilder,

) { }



ngOnInit() {
    this.annualizedForm = this.fb.group(new PayrollAnnualized());
    this.initData()
}

initData() {
        this.payrollService.getPayrollAnnualized(this.data.code).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.annualizedForm.patchValue(value.payload);                
                };
            }
        }
    );
}


submit() {
    var annualizedValue = { ...this.annualizedForm.value}

    annualizedValue.id = this.data.id
    annualizedValue.payrollCode = this.data.code

    this.payrollService.PostPayrollAnnualized(annualizedValue).subscribe({

        next: (value: any) => {
            if (value.statusCode === 200) {
                this.successMessage.title = "Success!"
                this.successMessage.message = "Files has been saved successfully!"
                this.successMessage.actions.confirm.label = "Ok"
                this.message.open(this.successMessage);
            } else {
                this.failedMessage.title = 'Failed!'
                this.failedMessage.message = 'Something went wrong. Please try again.'
                this.failedMessage.actions.confirm.label = "Ok"
                this.failedMessage.actions.cancel.show = false
                this.message.open(this.failedMessage);
            }
        }
    })
}

closeModal(): void {
    this.dialogRef.close()
}

}