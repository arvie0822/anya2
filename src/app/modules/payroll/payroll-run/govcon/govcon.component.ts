import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, SimpleChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { TableRequest } from 'app/model/datatable.model';
import { GovconTable } from 'app/model/payroll/payroll-run';
import { forkJoin } from 'rxjs';

export interface GOV {

    employeeId: number;
    amount: number;
    recurStartDate: string;
    recurEndDate: string;
    frequency:  string;
    payoutType: string;
    active: boolean;

}
@Component({
  selector: 'app-govcon',
  templateUrl: './govcon.component.html',
  styleUrls: ['./govcon.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})


export class GovconComponent implements OnInit {

    govconColumns: string[] = [

        'errorLogs', 'employeeId', 'govTypeCode', 'amount','recurStartDate','recurEndDate','frequency','payoutType','action'

    ];

    govconDColumns: string[] = [

        'employeeId', 'govTypeCode', 'amount','recurStartDate','recurEndDate','frequency','payoutType','action'

    ];
    @Input() datasource: any
    @Input() action: boolean = true
    @Input() error: boolean = false
    @ViewChild('earnT') earnT: MatTable<any>;
    @Input() totalRows: number
    @Output() tablefilter = new EventEmitter<any>();
    @Input() searchVal: string;
    isLoadingResults: boolean = true;
    request = new TableRequest
    tableForm: FormGroup
    option : boolean = true
    dt = []
    mergedData: any [];



  constructor(private http: HttpClient,private fb: FormBuilder) { }

  ngOnInit() {
    this.tableForm = this.fb.group(new GovconTable());
    this.loadData()
}

ngOnChanges(): void {
    this.isLoadingResults = false
    this.loadData()
    this.search()
  }

  loadData(){
    this.dt  = this.datasource.map(item =>({
        errorLogs: item.errorLogs,
        employeeId: item.employeeCode,
        govTypeCode: item.govType,
        amount: item.amount,
        recurStartDate: item.recurStartDate,
        recurEndDate: item.recurEndDate,
        frequency: item.frequency,
        payoutType: item.payoutType,
        action: item.action,
    }))

}

onEdit(){
    this.option = false
}
onSave(){
    this.option = true
}
onCancel(){
    this.option = true
}

search() {
    var value = this.searchVal.toLowerCase()
    let filtered = this.dt.filter(function (obj) {
        for (var key in obj) {
            if (obj[key] != null) {
                if (obj[key].toString().toLowerCase().includes(value)) {
                    return obj;
                }
            }
        }
    });
    this.dt = filtered
}

highligthError(row: any): boolean {
    return row.errorLogs;
}

handlePageEvent(e): void {
    this.request.Start = e.pageIndex
    this.request.Length = e.pageSize
    this.isLoadingResults = true;
    this.tablefilter.emit(this.request)
  }

}

