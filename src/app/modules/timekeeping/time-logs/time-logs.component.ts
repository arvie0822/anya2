import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS, NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { timelogs } from 'app/model/administration/time-logs';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownOptions, DropdownRequest, HeirarchyDropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { DateRangePickerComponent } from 'app/modules/dashboard/date-range-picker/date-range-picker.component';
import { UploadComponent } from 'app/modules/upload/upload.component';
import { AttendanceService } from 'app/services/attendanceService/attendance.service';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';
import { forkJoin } from 'rxjs';

const DATE_FORMAT = 'MM/DD/yyyy';

export const MY_FORMATS = {
    parse: {
        dateInput: DATE_FORMAT,
    },
    display: {
        dateInput: DATE_FORMAT,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: DATE_FORMAT,
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
  selector: 'app-time-logs',
  templateUrl: './time-logs.component.html',
  styleUrls: ['./time-logs.component.css'],
  providers: [
    {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE],
      },
      {
        provide: MAT_DATE_FORMATS,
        useValue: MY_FORMATS,
      },
  ],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CardTitleComponent,
    MatIconModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    EmployeeHierarchyComponent,
    MatDividerModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    TranslocoModule
],
})
export class TimeLogsComponent implements OnInit {
    timelogsform : FormGroup
    request = new TableRequest()
    pipe = new DatePipe('en-US');
    resultHierarchy = new SearchHierarchy;
    dataSource = [];
    totalRows: number = 0
    field_count = 0
    isLoadingResults: boolean = true;
    displayedColumns: string[] = ['displayName','employeeCode', 'dateDisplay', 'day', 'logTypeDisplay', 'bundyTypeDisplay','location','lateFiling'];
    dateFrom = new Date()
    dateTo = new Date()
    dropdownOptions = new DropdownOptions
    dropdownFixRequest = new DropdownRequest
    empdstatus = [];
    tagrequest = new HeirarchyDropdownRequest
    includeInactive: boolean

    table: any = []
    isSAve: boolean = false
    screenWidth: number;


    @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor( private fb: FormBuilder,private router: Router, private attendanceService: AttendanceService, private core: CoreService,private masterService : MasterService) {
    this.timelogsform = this.fb.group({
        employeeStatus: [] // Validators can be adjusted as needed
      });
   }

  ngOnInit() {
    this.request.Order = "EmployeeId";
    this.attendanceService.resendLogs().subscribe()
    this.attendanceService.attendanceLogsProcess().subscribe()
    this.dropdownFixRequest.id.push(
        { dropdownID: 0, dropdownTypeID: 36 })
    this.initData()
    this.timelogsform.get('employeeStatus').setValue([93, 94, 12666, 30050, 30383])
  }

  search(ex) {
    this.request.SearchColumn = []
    this.request.Start = 0

    var df = this.pipe.transform(this.dateFrom,'yyyy-MM-ddT00:00:00')
    var dt = this.pipe.transform(this.dateTo,'yyyy-MM-ddT23:59:00')

      this.request.SearchColumn.push({
        "key": "Date",
        "value": df,
        "type": 4
      })

      this.request.SearchColumn.push({
        "key": "Date",
        "value": dt,
        "type": 5
      })

      if (this.resultHierarchy.Search.length > 0) {

        this.resultHierarchy.Search.forEach(element => {
          if (Array.isArray(element.Value)) {
            element.Value.forEach(val => {
              this.request.SearchColumn.push({
                "key": element.Key,
                "value": val + "",
                "type": element.Type
              })
            });
          } else {
            this.request.SearchColumn.push({
              "key": element.Key,
              "value": element.Value + "",
              "type": element.Type
            })
          }
        });
      }
      if (ex) {
        this.core.exportAll(this.request,'67','1')
      } else {
        this.loadData()
      }

  }

  handlePageEvent(e): void {
    this.request.Start = e.pageIndex
    this.request.Length = e.pageSize
    this.loadData()
  }

  handleSortEvent(e): void {
    this.request.Start = 0
    this.request.Order = e.active
    this.request.OrderBy = e.direction
    this.loadData()
  }


  loadData(): void {
    this.isLoadingResults = true;
    this.attendanceService.getAttendanceLogsTable(this.request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          console.log(value.payload.data)
          this.dataSource = value.payload.data
          this.totalRows = value.payload.totalRows
          this.isLoadingResults = false;
        }
        else {
          console.log(value.stackTrace)
          console.log(value.message)
          this.isLoadingResults = false;
        }
      },
      error: (e) => {
        console.error(e)
        this.isLoadingResults = false;
      }
    });
  }

  initData() {
    forkJoin({
        dropdownFix: this.masterService.getDropdownFix(this.dropdownFixRequest),
        })
        .subscribe({
            next: (response) => {

                // custom
                this.dropdownOptions.employeeStatusDef = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 36), JSON.stringify)
            },

            error: (e) => {
                console.error(e)
            },
            complete: () => {
            },
        });
    }

    topdiv(){
        var top = "";
        var tagType = this.table.filter.filter(x=>x.type == "e-hierarchy")
        tagType = tagType.length == 0 ? [] : tagType[0].tagType
        if (this.isSAve) {
            top = (this.screenWidth > 957 && this.screenWidth < 1822) ? '190px' : this.screenWidth < 957 ? '300px' : "230px"
        } else
        if ((this.table.filter.length + tagType.length) > 6) {
            top = (this.screenWidth > 957 && this.screenWidth < 1822) ? '130px' : this.screenWidth < 957 ? '180px' : "100px"
        } else {
            top = "90px"
        }
        // console.log(top,this.screenWidth)
        return top
    }

    inactive() {
        //
        // var statsId = [95, 12665]
        // var status = this.timelogsform.value.employeeStatus.filter(x => statsId.includes(x))
        // this.empdstatus = this.timelogsform.value.employeeStatus
        // if (status.length > 0) { // custome
        //
        //     this.tagrequest.includeInactive = true
        //     this.tagrequest.statusID = this.empdstatus
        //     this.includeInactive = true
        // }
    }

    upload(){
        this.router.navigate(['detail/upload']);
    }

}
