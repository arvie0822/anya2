import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

// export interface Loan {

//     employeeId         : string;
//     employeeName       : string;
//     loanCode           : string;
//     amortizationAmount : number;
//     totalPayments      : number;
//     withInterest       : number;
//     principalAmount    : number;
//     loanDate           : string;
//     frequency          : string;
//     holdFrom           : string;
//     holdTo             : string;
//     recurStartDate     : string;
//     recurEndDate       : string;
//     loanNumber         : string;
//     promsryNoteNumber  : string;
//     remarks            : string;
//     fileName           : string;
//     dateClosed         : string;
//     closedBy           : string;
//     createdBy          : string;
//     dateCreated        : string;
//     loanStatus         : string;
//     totalLoans         : number;
// }

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
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
export class LoanComponent implements OnInit {

    storageColumns = [
        { type: [2,4],  name: 'errorLogs',          label: 'Error Logs'             },
        { type: [2,4],  name: 'employeeCode',       label: 'Employee Code'          },
        { type: [2,4],  name: 'employeeName',       label: 'Employee Name'          },
        { type: [2,4],  name: 'loanCode',           label: 'Loan Code'              },
        { type: [2],    name: 'amortizationAmount', label: 'Amortization Amount'    },
        { type: [2],    name: 'totalPayments',      label: 'Total Payments'         },
        { type: [2],    name: 'withInterest',       label: 'With Interest'          },
        { type: [2],    name: 'principalAmount',    label: 'Principal Amount'       },
        { type: [2],    name: 'loanDate',           label: 'Loan Date'              },
        { type: [2],    name: 'frequency',          label: 'Frequency'              },
        { type: [2],    name: 'isHoldFrom',         label: 'Hold From'              },
        { type: [2],    name: 'isHoldTo',           label: 'Hold To'                },
        { type: [2],    name: 'recurStartDate',     label: 'Recur Start Date'       },
        { type: [2],    name: 'recurEndDate',       label: 'Recur End Date'         },
        { type: [2],    name: 'loanNumber',         label: 'Loan Number'            },
        { type: [2],    name: 'promissoryNoteNum',  label: 'Promissory Note Num'    },
        { type: [4],    name: 'loanStatus',         label: 'Loan Status'            },
        { type: [4],    name: 'loansAmount',        label: 'Loans Amount'           },
        { type: [4],    name: 'loansAmountAdj',     label: 'Loans Amount Adj'       },
        { type: [2,4],  name: 'remarks',            label: 'Remarks'                },

        
    ]


    // loanColumns: string[] = [

    //     'errorLogs', 'employeeCode', 'employeeName', 'loanCode','amortizationAmount','totalPayments','withInterest','principalAmount','loanDate','frequency','isHoldFrom','isHoldTo','recurStartDate'
    //     ,'recurEndDate','loanNumber','promissoryNoteNum','remarks'

    // ];

    // loanNDColumns: string[] = [

    //     'employeeCode', 'employeeName', 'loanCode','amortizationAmount','totalPayments','withInterest','principalAmount','loanDate','frequency','isHoldFrom','isHoldTo','recurStartDate'
    //     ,'recurEndDate','loanNumber','promissoryNoteNum','remarks'
    // ];

    @Input() datasource: any
    @Input() action: boolean = true
    @Input() loanType: number = 2
    dt = []
    tableForm: FormGroup
    option : boolean = true
    request = new TableRequest
    isLoadingResults: boolean = true;
    @Input() totalRows: number
    @Input() error: boolean = false
    @Input() searchVal: string;
    @Output() tablefilter = new EventEmitter<any>();
    displayColumns: string[]
    columns: any[] = []


  constructor() { }

  ngOnInit() {

    this.loadData()

  }

  ngOnChanges(): void {
    this.isLoadingResults = false
    this.loadData()
    this.search()
  }

  loadData(){

    this.columns = this.storageColumns.filter(item => item.type.includes(this.loanType))
    this.displayColumns = this.columns.map((item) => item.name)
    // if (this.action) {
    //     this.datasource  = this.datasource.map(item =>({

    //         employeeId: item["Employee ID"],
    //         employeeName: item["Employee Name"],
    //         loanCode: item["Loan Code"],
    //         amortizationAmount: item["Amortization Amount"],
    //         totalPayments: item["Total Payments"],
    //         withInterest: item["With Interest"],
    //         principalAmount: item["Principal Amount"],
    //         loanDate: item["Loan Date"],
    //         frequency: item["Frequency"],
    //         holdFrom: item["Hold From"],
    //         holdTo: item["Hold To"],
    //         recurStartDate: item["Recur Start Date"],
    //         recurEndDate: item["Recur End Date"],
    //         loanNumber: item["Loan Number"],
    //         promissoryNoteNum: item["Promsry Note Number"],
    //         remarks: item["Remarks"],
    //         fileName: item["File Name"],
    //         dateClosed: item["Date Closed"],
    //         closedBy: item["Closed By"],
    //         createdBy: item["Created By"],
    //         dateCreated: item["Date Created"],
    //         loanStatus: item["Loan Status"],
    //         totalLoans: item["Total Loans"],
    //         actionTime: true,
    //     }))
    // } else {
    //     this.datasource  = this.datasource.map((item): Loan =>({

    //         employeeId: item["Employee ID"],
    //         employeeName: item["Employee Name"],
    //         loanCode: item["Loan Code"],
    //         amortizationAmount: item["Amortization Amount"],
    //         totalPayments: item["Total Payments"],
    //         withInterest: item["With Interest"],
    //         principalAmount: item["Principal Amount"],
    //         loanDate: item["Loan Date"],
    //         frequency: item["Frequency"],
    //         holdFrom: item["Hold From"],
    //         holdTo: item["Hold To"],
    //         recurStartDate: item["Recur Start Date"],
    //         recurEndDate: item["Recur End Date"],
    //         loanNumber: item["Loan Number"],
    //         promissoryNoteNum: item["Promsry Note Number"],
    //         remarks: item["Remarks"],
    //         fileName: item["File Name"],
    //         dateClosed: item["Date Closed"],
    //         closedBy: item["Closed By"],
    //         createdBy: item["Created By"],
    //         dateCreated: item["Date Created"],
    //         loanStatus: item["Loan Status"],
    //         totalLoans: item["total Loans"],


    //     }))
    // }
    // this.datasource  = this.datasource.map(item =>({

    //     errorLogs: item.errorLogs,
    //     employeeCode: item.employeeCode,
    //     employeeName: item.employeeName,
    //     loanCode: item.loanCode,
    //     amortizationAmount: item.amortizationAmount,
    //     totalPayments: item.totalPayments,
    //     withInterest: item.withInterest,
    //     principalAmount: item.principalAmount,
    //     loanDate: item.loanDate,
    //     frequency: item.frequency,
    //     isHoldFrom: item.isHoldFrom,
    //     isHoldTo: item.isHoldTo,
    //     recurStartDate: item.recurStartDate,
    //     recurEndDate: item.recurEndDate,
    //     loanNumber: item.loanNumber,
    //     promissoryNoteNum: item.promissoryNoteNum,
    //     remarks: item.remarks,
    // }))
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
    let filtered = this.datasource.filter(function (obj) {
        for (var key in obj) {
            if (obj[key] != null) {
                if (obj[key].toString().toLowerCase().includes(value)) {
                    return obj;
                }
            }
        }
    });
    this.datasource = filtered
}

highligthError(row: any): boolean {
    return row.withError;
}

handlePageEvent(e): void {
    this.request.Start = e.pageIndex
    this.request.Length = e.pageSize
    this.isLoadingResults = true;
    this.tablefilter.emit(this.request)
  }

}
