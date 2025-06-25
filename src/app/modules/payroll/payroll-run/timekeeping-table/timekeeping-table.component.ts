import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { TableRequest } from 'app/model/datatable.model';
import { CategoryService } from 'app/services/categoryService/category.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule, DecimalPipe } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';

export interface TK {


    employeeCode: number;
    logHoursId: number;
    date: string;
    logHours: number;
    hoursOrDays: boolean;
    adj: boolean;
    costCenter: string;
    hourlyRate: number;
    dailyRate: number;
    payOutDate: string;
    frequency: string;
    remarks: string;
    active: boolean;
}

@Component({
  selector: 'app-timekeeping-table',
  templateUrl: './timekeeping-table.component.html',
  styleUrls: ['./timekeeping-table.component.css'],
  providers: [DecimalPipe],
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


export class TimekeepingTableComponent implements OnInit {



    // timekeepingSource = [];
    tkSummaryColumns: string[] = [

        'employeeCode','employeeName','reg', 'tardy',
        'undertime', 'absent', 'lwop', 'vl', 'sl', 'pto', 'ol', 'nd', 'ot', 'otnd',
        'lh', 'lhnd', 'lhot', 'lhndot', 'lhrd', 'lhrdnd', 'lhrdot', 'lhrdndot', 'sh', 'shnd',
        'shot', 'shndot', 'shrd', 'shrdnd', 'shrdot', 'shrdndot', 'rd', 'rdnd', 'rdot', 'rdndot',
        'dh', 'dhnd', 'dhot', 'dhndot', 'dhrd', 'dhrdnd', 'dhrdot', 'dhrdndot', 'ch', 'chnd',
        'chot', 'chndot', 'chrd', 'chrdnd', 'chrdot', 'chrdndot', 'remarks'

    ];

    tkDetailedColumns: string[] = [

        'errorLogs','employeeCode','employeeName', 'date', 'restDay', 'scheduleIn', 'scheduleOut', 'timeIn', 'timeOut', 'reg', 'tardy',
        'undertime', 'absent', 'lwop', 'vl', 'sl', 'pto', 'ol', 'nd', 'ot', 'otnd',
        'lh', 'lhnd', 'lhot', 'lhndot', 'lhrd', 'lhrdnd', 'lhrdot', 'lhrdndot', 'sh', 'shnd',
        'shot', 'shndot', 'shrd', 'shrdnd', 'shrdot', 'shrdndot', 'rd', 'rdnd', 'rdot', 'rdndot',
        'dh', 'dhnd', 'dhot', 'dhndot', 'dhrd', 'dhrdnd', 'dhrdot', 'dhrdndot', 'ch', 'chnd',
        'chot', 'chndot', 'chrd', 'chrdnd', 'chrdot', 'chrdndot', 'remarks'

    ];

    tkDetailedNColumns: string[] = [

        'employeeCode','employeeName', 'date', 'restDay', 'scheduleIn', 'scheduleOut', 'timeIn', 'timeOut', 'reg', 'tardy',
        'undertime', 'absent', 'lwop', 'vl', 'sl', 'pto', 'ol', 'nd', 'ot', 'otnd',
        'lh', 'lhnd', 'lhot', 'lhndot', 'lhrd', 'lhrdnd', 'lhrdot', 'lhrdndot', 'sh', 'shnd',
        'shot', 'shndot', 'shrd', 'shrdnd', 'shrdot', 'shrdndot', 'rd', 'rdnd', 'rdot', 'rdndot',
        'dh', 'dhnd', 'dhot', 'dhndot', 'dhrd', 'dhrdnd', 'dhrdot', 'dhrdndot', 'ch', 'chnd',
        'chot', 'chndot', 'chrd', 'chrdnd', 'chrdot', 'chrdndot', 'remarks'

    ];

    @Input() datasource: any
    @Input() error: boolean = false
    @Input() action: boolean = true
    @Input() searchVal: string;
    @Input() id: any
    @Output() tablefilter = new EventEmitter<any>();
    @Input() totalRows: number
    request = new TableRequest
    isLoadingResults: boolean = true;
    // @Output() filterChanged = new EventEmitter<string>();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    value = new Subject<string>();
    option : boolean = true
    dt = []
    checkedList = []
    // @Input() searchTerm: string;

    @ViewChild('tableId') private _table: MatTable<any>;
    // filterDictionary= new Map<string,string>();


  constructor(
    private categoryService: CategoryService
  ) { }

    ngOnInit() {
        this.loadData()

        this.value.pipe(
            debounceTime(400),
            distinctUntilChanged())
            .subscribe(value => {
                    let filtered = this.datasource.filter(function (obj) {
                        for (var key in obj) {
                            if (obj[key] != null) {
                                if (obj[key].toString().toLowerCase().includes(value.toLowerCase())) {
                                    return obj;
                                }
                            }
                        }
                    });
                    this.datasource = filtered
            });

    }

  ngOnChanges(): void {
    this.loadData()

    this.search()
  }

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  loadData(){
        this.dt  = this.datasource.map((item) =>({
            errorLogs: item.errorLogs,
            employeeCode: item.employeeCode,
            employeeName: item.employeeName,
            date: item.date,
            restDay: item.restDay,
            scheduleIn: item.scheduleIn,
            scheduleOut: item.scheduleOut,
            timeIn: item.timeIn,
            timeOut: item.timeOut,
            reg: item.reg,
            tardy: item.tardy,
            undertime: item.undertime,
            absent: item.absent,
            lwop: item.lwop,
            vl: item.vl,
            sl: item.sl,
            pto: item.pto,
            ol: item.ol,
            nd: item.nd,
            ot: item.ot,
            otnd: item.otnd,
            lh: item.lh,
            lhnd: item.lhnd,
            lhot: item.lhot,
            lhndot: item.lhndot,
            lhrd: item.lhrd,
            lhrdnd: item.lhrdnd,
            lhrdot: item.lhrdot,
            lhrdndot: item.lhrdndot,
            sh: item.sh,
            shnd: item.shnd,
            shot: item.shot,
            shndot: item.shndot,
            shrd: item.shrd,
            shrdnd: item.shrdnd,
            shrdot: item.shrdot,
            shrdndot: item.shrdndot,
            rd: item.rd,
            rdnd: item.rdnd,
            rdot: item.rdot,
            rdndot: item.rdndot,
            dh: item.dh,
            dhnd: item.dhnd,
            dhot: item.dhot,
            dhndot: item.dhndot,
            dhrd: item.dhrd,
            dhrdnd: item.dhrdnd,
            dhrdot: item.dhrdot,
            dhrdndot: item.dhrdndot,
            ch: item.ch,
            chnd: item.chnd,
            chot: item.chot,
            chndot: item.chndot,
            chrd: item.chrd,
            chrdnd: item.chrdnd,
            chrdot: item.chrdot,
            chrdndot: item.chrdndot,
            remarks: item.remarks,
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


