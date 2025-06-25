import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { TableRequest } from 'app/model/datatable.model';
import { EarningTable } from 'app/model/payroll/payroll-run';


export interface Deduc {

    employeeId: number;
    deductionsTypeId: number;
    recurStartDate: string;
    recurEndDate: string;
    deductionsAmount: number;
    frequency:  string;
    totalDeductions : number;
    remarks : string;
    dateClosed : string;
    status : string;
}

@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.css'],
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
    CardTitleComponent,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class DeductionComponent implements OnInit {


    deductionColumns: string[] = [

       'errorLogs', 'employeeCode', 'employeeName','deductionsCode','deductionsAmount','recurStartDate','recurEndDate','isHoldFrom','isHoldTo','frequency','remarks'

    ];

    deductionNColumns: string[] = [

        'employeeCode', 'employeeName','deductionsCode','deductionsAmount','recurStartDate','recurEndDate','isHoldFrom','isHoldTo','frequency','remarks'

    ];

    @Input() datasource: any
    @Input() action: boolean = true
    @Input() error: boolean = false
    @Input() searchVal: string;
    @Input() totalRows: number
    option : boolean = true
    isLoadingResults: boolean = true;
    request = new TableRequest
    @Output() tablefilter = new EventEmitter<any>();
    dt = []
    tableForm: FormGroup

  constructor(private http: HttpClient,private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.isLoadingResults = false
    this.loadData()
    this.search()
  }

  ngOnInit() {

    this.loadData()

    }

    loadData(){
        // if (this.action) {
        //     this.dt  = this.datasource.map(item =>({

        //         employeeId: item["Employee ID"],
        //         deductionsTypeId : item["Type"],
        //         recurStartDate : item["Recurring Start"],
        //         recurEndDate : item["Recurring End"],
        //         deductionsAmount : item["Amount"],
        //         frequency: item["Frequency"],
        //         totalDeductions : item["Total Deductions"],
        //         remarks : item["Remarks"],
        //         dateClosed : item["Date Closed"],
        //         status : item["Status"],
        //     }))
        // } else {
        //     this.dt  = this.datasource.map((item): Deduc=>({

        //         employeeId: item["Employee ID"],
        //         deductionsTypeId : item["Type"],
        //         recurStartDate : item["Recurring Start"],
        //         recurEndDate : item["Recurring End"],
        //         deductionsAmount : item["Amount"],
        //         frequency: item["Frequency"],
        //         totalDeductions : item["Total Deductions"],
        //         remarks : item["Remarks"],
        //         dateClosed : item["Date Closed"],
        //         status : item["Status"],
        //     }))
        // }

        this.dt  = this.datasource.map(item =>({
            errorLogs: item.errorLogs,
            employeeCode: item.employeeCode,
            employeeName: item.employeeName,
            deductionsCode : item.deductionsCode,
            deductionsAmount : item.deductionsAmount,
            recurStartDate : item.recurStartDate,
            recurEndDate: item.recurEndDate,
            isHoldFrom : item.isHoldFrom,
            isHoldTo : item.isHoldTo,
            frequency : item.frequency,
            remarks : item.remarks,
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

highligthError(row: any): string {
    return row.errorLogs;
}

handlePageEvent(e): void {
    this.request.Start = e.pageIndex
    this.request.Length = e.pageSize
    this.isLoadingResults = true;
    this.tablefilter.emit(this.request)
  }

}
