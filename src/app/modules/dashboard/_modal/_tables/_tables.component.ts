import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableRequest } from 'app/model/datatable.model';

@Component({
  selector: 'app-_tables',
  templateUrl: './_tables.component.html',
  styleUrls: ['./_tables.component.css']
})
export class _tablesComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  @Input() columns: any = []
  @Input() source: any = []
  @Input() pageSize: any = [10 ,20, 50, 100]
  @Input() loading: any = false
  @Input() request = new TableRequest()
  @Input() totalRows: number = 0
  @Input() pageShow: boolean = true
  @Output() pageEvent = new EventEmitter<any>();
  displayedColumns = []

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.displayedColumns = this.columns.map(x=>x.column)
    this.dataSource = this.formatAllDecimals(this.source); //  this.dataSource.data issue para sa pagination
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handlePageEvent(event){
    this.request.Length = event.pageSize
    this.request.Start = event.pageIndex
    this.pageEvent.emit(this.request)
  }

  formatAllDecimals(data: any[]): any {
    return data.map(row => {
      const formattedRow: any = {};
      for (const key in row) {
        const value = row[key];
        if (typeof value === 'number' && !Number.isInteger(value)) {
          formattedRow[key] = parseFloat(value.toFixed(2));
        } else {
          formattedRow[key] = value;
        }
      }
      return formattedRow;
    });
  }

}