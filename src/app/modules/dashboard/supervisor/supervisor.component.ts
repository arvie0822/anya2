import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TableRequest } from 'app/model/datatable.model';
import { FilingService } from 'app/services/filingService/filing.service';
import { LeaveService } from 'app/services/leaveService/leave.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { GF } from 'app/shared/global-functions';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { KtdDragEnd, KtdDragStart, KtdGridComponent, KtdGridLayout, KtdGridModule, KtdResizeEnd, KtdResizeStart, ktdTrackById } from '@katoid/angular-grid-layout';
import { DOCUMENT } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { _tableModule } from '../_modal/_tables/_table.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Gleap from 'gleap';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    _tableModule,
    MatMenuModule,
    KtdGridModule
]
})
export class SupervisorComponent implements OnInit {
  cacheKey = ""

  SAsetup = { request: new TableRequest(), loading: false, totalRows: 0, pending: 0, approve: 0, active: 0, inactive: 0, noSched: 0, clockIn: 0, leaved: 0, bday: 0, desc: ""}
  LCsetup = { request: new TableRequest(), loading: false, totalRows: 0, pending: 0, approve: 0, active: 0, inactive: 0, noSched: 0, clockIn: 0, leaved: 0, bday: 0, desc: ""}
  TEsetup = { request: new TableRequest(), loading: false, totalRows: 0, pending: 0, approve: 0, active: 0, inactive: 0, noSched: 0, clockIn: 0, leaved: 0, bday: 0, desc: ""}
  PAsetup = { request: new TableRequest(), loading: false, totalRows: 0, pending: 0, approve: 0, active: 0, inactive: 0, noSched: 0, clockIn: 0, leaved: 0, bday: 0, desc: ""}
  EBsetup = { request: new TableRequest(), loading: false, totalRows: 0, pending: 0, approve: 0, active: 0, inactive: 0, noSched: 0, clockIn: 0, leaved: 0, bday: 0, desc: ""}

  SAdata = []
  LCdata = []
  TEdata = []
  PAdata = []
  EBdata = []

  // Supervisor Alert
  SAcolumns = [
    { title: "Employee Code", column: "employeeCode"  },
    { title: "Employee Name", column: "employeeName"  },
    { title: "Date",          column: "date"          },
    { title: "Type",          column: "type"          },
    { title: "Alert",         column: "alert"         },
  ]

  // Leave Calendar
  LCcolumns = [
    { title: "Date",        column: "date"    },
    { title: "Name",        column: "names"   },
  ]

  // Pending for Approval Fillings
  PAcolumns = [
    { title: "Employee Code", column: "employeeCode"  },
    { title: "Employee Name", column: "employeeName"  },
    { title: "Filing Code",   column: "filingCode"  },
    { title: "Days Pending",  column: "daysPending"  },
    { title: "Status",        column: "status"  },
  ]

  // Today's Employee Status
  TEcolumns = [
    { title: "Emp Code",    column: "employeeCode"  },
    { title: "Emp Name",    column: "employeeName"  },
    // { title: "Status",   column: "status"   },
    // { title: "Schedule", column: "schedIn"  },
    // { title: "Clock In", column: "clockIn"  },
    // { title: "Minutes",  column: "minutes"  },
    { title: "Date",        column: "date"          },
    { title: "Sched",       column: "schedInOut"    },
    { title: "Clock In",    column: "clockIn"       },
    { title: "Clock Out",   column: "clockOut"      },
  ]

  // // Employee's Birthday
  EBcolumns = [
    { title: "Date", column: "employeeBirthday"  },
    { title: "Name", column: "employeeName"  },
  ]

  @ViewChild(KtdGridComponent, {static: true}) grid: KtdGridComponent;
  trackById = ktdTrackById;

  // cols: number = 12;
  // rowHeight: number = 100;
  // compactType: 'vertical' | 'horizontal' | null = 'vertical';
  show: boolean = false
  // autoResize = true;
  // resizeSubscription: Subscription;
  nav = 0
  cols = 12;
  rowHeight: number | string = 'fit';
  compactType: 'vertical' | 'horizontal' | null = 'vertical';
  layout: KtdGridLayout = [
      {id: '0', x: 0, y: 0, w: 4, h: 5},
      {id: '1', x: 4, y: 0, w: 4, h: 2},
      // {id: '2', x: 0, y: 3, w: 3, h: 3, minW: 2, minH: 3},
      // {id: '3', x: 3, y: 3, w: 3, h: 3, minW: 2, maxW: 3, minH: 2, maxH: 5},
      {id: '2', x: 4, y: 3, w: 4, h: 3},
      {id: '3', x: 8, y: 0, w: 4, h: 2},
      {id: '4', x: 8, y: 3, w: 4, h: 3},
  ];

  dragStartThreshold = 0;
  autoScroll = true;
  disableDrag = false;
  disableResize = false;
  disableRemove = false;
  autoResize = true;
  preventCollision = false;
  isDragging = false;
  isResizing = false;
  resizeSubscription: Subscription;

  constructor(private tenantService: TenantService, private leaveService: LeaveService, private filingService: FilingService, @Inject(DOCUMENT) public document: Document) {Gleap.showFeedbackButton(true);}

  ngAfterViewInit(){
    this.show = true;
  }

  ngOnInit() {
    this.layout = GF.IsEmptyReturn(JSON.parse(sessionStorage.getItem("suLayout")),this.layout)
    this.PAsetup.request['CacheKey'] = ""
    this.SAsetup.request.Length = 50
    this.SAsetup.request['navigate'] = 0 // 0 = today
    this.TEsetup.request['navigate'] = 0 // 0 = today
    this.SAsetup.request['payoutDate'] = null
    this.LCsetup.request['type'] = 1// today

    this.fetchFunction(this.SAsetup.request, 'tenantService',  'getSupervisorAlertTable',             'SAdata', 'SAsetup', 'payload.data', 'alert' )
    this.fetchFunction(this.TEsetup.request, 'tenantService',  'getEmployeeStatusTable',              'TEdata', 'TEsetup', 'payload.data', 'status')
    this.fetchFunction(this.LCsetup.request, 'leaveService',   'getSupervisorViewEmployeeFilesLeave', 'LCdata', 'LCsetup', 'payload.data')
    this.fetchFunction(this.PAsetup.request, 'filingService',  'getSupervisorViewApproval',           'PAdata', 'PAsetup', 'payload.data')
    this.fetchFunction(this.EBsetup.request, 'tenantService',  'getSupervisorViewBirthday',           'EBdata', 'EBsetup', 'payload.data')

    this.resizeSubscription = merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange')
    ).pipe(
      debounceTime(50),
      filter(() => this.autoResize)
    ).subscribe(() => {
      this.grid.resize();
    });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

  fetchFunction(event, service, api, data, setup, source?, group?){
    // loading true
    this[setup].loading = true;
    this[setup].request = event;
    // this[setup].request.payoutDate = this[setup].request.payoutDate;
    this[service][api](this[setup].request)
      .subscribe({
        next: (value: any) => {

          if (data == "SAdata") {
            this[setup].request['payoutDate'] = GF.IsEmptyReturn(value.payload['extraData'],null)
          }

          if (data == "TEdata") {
            this[setup].request['CacheKey'] = GF.IsEmptyReturn(value.payload['extraData'],"")
          }


          // get data
          var keys = GF.IsEmptyReturn(source.split('.'),[source]);
          var result = value;
          for (var key of keys) {
            result = result[key];
            this[setup].totalRows = this[setup].totalRows > 0 ? this[setup].totalRows : result['totalRows']
            // this[setup].request['CacheKey']   = GF.IsEmpty(this[setup].request['CacheKey'])   ? GF.IsEmptyReturn(result?.['extraData'],"")   : this[setup].request['CacheKey']
            // if (data == "SAdata") {
            //   this[setup].request['payoutDate'] = GF.IsEmptyReturn(result?.['extraData'], this[setup].request['payoutDate'])
            // }
            if (data == "EBdata" && result.length > 0) {
              this[setup].bday = result.filter(b => b.employeeName.length > 0).length
            }

            if (data == "LCdata" && result.length > 0) {
              this[setup].leaved = result.filter(b => b.names.length > 0).length
            }

            if (data == "TEdata" && result.length > 0) {
              this[setup].clockIn = result.filter(b => GF.IsEmpty(b.clockIn)).length
            }
          }

          this[data] = result

          // Common
          this[setup].desc = this.getSubContext(this[data], group, "count Employee key, ")

          this[setup].loading = false;
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  getSubContext(list,column, str){
    if (GF.IsEmpty(column)) {return ""}
    const counts = list.reduce((acc, obj) => {
      const status = obj[column];
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    var description = ""
    var keys = Object.keys(counts)
    keys.forEach((key,i) => {
      description += counts[key] + " Employee " + key + (((keys.length - 2) == i) ? " and " : ", ")
      //description += //str.replaceAll("key", key).replaceAll("count", counts[key])//counts[key] + " Employee " + key + (((keys.length - 2) == i) ? " and " : ", ")
    });
    return description
  }

  //Next or Previous for timekeeping
tkPageEvent(event, nav,arrow){

     if (arrow === 'left') {
            if (this.nav == 1) {
                this.nav = 0
            } else {
                this.nav -= 1;
            }
        } else if (arrow === 'right' && this.nav !== 0) {
            this.nav += 1;
        }
        event.navigate  = this.nav
    this.fetchFunction(event, 'tenantService','getSupervisorAlertTable', 'SAdata', 'SAsetup', 'payload.data', 'alert')
  }

  lcPageEvent(event, type){
    event.type = type
    var start = this.LCdata[0].dateTime
    var end = this.LCdata[this.LCdata.length-1].dateTime
    event.SearchColumn = [{
      key: "date",
      value: type == 2 ?  end : start
    }]
    this.fetchFunction(this.LCsetup.request, 'leaveService',   'getSupervisorViewEmployeeFilesLeave', 'LCdata', 'LCsetup', 'payload.data')
  }



  onDragStarted(event: KtdDragStart) {
    this.isDragging = true;
    this.calculateRowHeight();
  }

  onResizeStarted(event: KtdResizeStart) {
    this.isResizing = true;
    this.calculateRowHeight();
  }

  onDragEnded(event: KtdDragEnd) {
    this.isDragging = false;
    this.rowHeight = 'fit';
  }

  onResizeEnded(event: KtdResizeEnd) {
    this.isResizing = false;
    this.rowHeight = 'fit';
  }

  onLayoutUpdated(layout: any) { //KtdGridLayout) {
    sessionStorage.setItem("suLayout", JSON.stringify(layout))
    this.layout = layout;
  }

  calculateRowHeight() {
    const screenHeight = window.innerHeight;
    const headerHeight = 25;
    const footerHeight = 25;
    const availableHeight = screenHeight - headerHeight - footerHeight;
    this.rowHeight = Math.floor(availableHeight / this.cols);
  }
}
