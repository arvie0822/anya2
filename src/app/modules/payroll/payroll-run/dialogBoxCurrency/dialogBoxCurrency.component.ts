import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { MasterService } from 'app/services/masterService/master.service';
import { forkJoin } from 'rxjs';
import _ from 'lodash';
import { TableRequest } from 'app/model/datatable.model';
import { MatTable, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { fuseAnimations } from '@fuse/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';


enum mode {
    all = 0,
    next = 1
}

@Component({
  selector: 'app-dialogBoxCurrency',
  templateUrl: './dialogBoxCurrency.component.html',
  styleUrls: ['./dialogBoxCurrency.component.css'],
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
    DropdownComponent,
    MatButtonModule,
    TranslocoModule
]
})
export class DialogBoxCurrencyComponent implements OnInit {

    currencyRate: number
    idCurrency: number
    pipe = new DatePipe('en-US');
    dropdownOptions = new DropdownOptions
    dropdownFixRequest = new DropdownRequest;
    dataSource = [];
    displayedColumns: string[] = ['action', 'currencyDescription', 'currencyRate'];
    selectedItem = []
    excluded = []
    disabledOpt = []
    selection = new SelectionModel<Element>(true, []);
    request = new TableRequest()
    @ViewChild('table') table: MatTable<any>;
    successMessage = Object.assign({},SuccessMessage)
    failedMessage = Object.assign({},FailedMessage)
    notifMessage = Object.assign({},FailedMessage)

constructor(@Inject(MAT_DIALOG_DATA) public data: any,
public dialogRef: MatDialogRef<DialogboxComponent>,
private masterService: MasterService,
private payrollService: PayrollService,
private message: FuseConfirmationService,

) { }


ngOnInit() {
    this.dropdownFixRequest.id.push(
        { dropdownID: 0, dropdownTypeID: 122 })

    this.initData()
    this.dataSource = this.data.data
    this.disabledOpt = this.dataSource.map(item=>item.idCurrency)
}

initData() {
    forkJoin({
        dropdownFix: this.masterService.getDropdownFix(this.dropdownFixRequest),
    }).subscribe({
        next: (response) => {
            this.dropdownOptions.contractCurrencyDef = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 122)  , JSON.stringify)
        },
        error: (e) => {
            console.error(e)
        },
        complete: () => {

        },
    });

}

add(){
    this.dataSource.push({
        idCurrency: this.idCurrency,
        currencyDescription:  this.dropdownOptions.contractCurrencyDef.find(item => item.dropdownID == this.idCurrency).description,
        currencyRate: this.currencyRate
    })

    this.table.renderRows();
    this.disabledOpt = this.dataSource.map(item=>item.idCurrency)
    this.currencyRate = null
    this.idCurrency = 0
    // this.dropdownChange()
}

dropdownChange(){
    let currencyToRemove = this.dataSource.map(item => item.currency);
    this.dropdownOptions.contractCurrencyDef = this.dropdownOptions.contractCurrencyDef.filter(item => !currencyToRemove.includes(item.description));
}

delete(index): void {
    this.dataSource.splice(index, 1);
    this.table.renderRows();
    this.disabledOpt = this.dataSource.map(item=>item.idCurrency)

}

submit() {
    if (this.dataSource.length === 0) {
        this.failedMessage.title = 'Failed!'
        this.failedMessage.message = 'Empty table'
        this.failedMessage.actions.confirm.label = "Ok"
        this.message.open(this.failedMessage);
    }
    var currency = {
        id: 0,
        payrollCode: this.data.code,
        currencyList: this.dataSource
    }
    this.payrollService.postCurrencyRate(currency).subscribe({
        next: (value: any) => {
            if (value.statusCode === 200) {
                this.successMessage.title = "Success!"
                this.successMessage.message = "Files has been saved successfully!"
                this.successMessage.actions.confirm.label = "Ok"
                this.message.open(this.successMessage);
            } else {
            }
        }
    })
}

    closeModal(): void {
        this.notifMessage.title = ""
        this.notifMessage.message = "Make sure you saved your setup."
        this.notifMessage.actions.confirm.label = "Ok"
        this.notifMessage.actions.cancel.show = true
        const dialogRef = this.message.open(this.notifMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result === "confirmed") {
                this.dialogRef.close()
            }
        })

    }

}
