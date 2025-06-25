import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FullCalendarModule } from '@fullcalendar/angular';
import { fuseAnimations } from '@fuse/animations';
import { TableRequest } from 'app/model/datatable.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { _tableModule } from '../_tables/_table.module';

@Component({
  selector: 'app-tk-detail',
  templateUrl: './tk-detail.component.html',
  styleUrls: ['./tk-detail.component.css'],
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
    FullCalendarModule,
    MatMenuModule,
    MatDatepickerModule
]
})
export class TkDetailComponent implements OnInit {
  source: any = []
  pageSize: any = [20, 50, 100]
  loading: any = false
  request = new TableRequest()
  totalRows: number = 0
  pageShow: boolean = true
  columns: any = [
    { tp: "EmployeeCode",   title: "Emp Code",      column: "employeeCode"    },
    { tp: "EmployeeName",   title: "Emp Name",      column: "displayName"     },
    { tp: "SubCompany",     title: "Company",       column: "subCompany"      },
    { tp: "Branch",         title: "Branch",        column: "branch"          },
    { tp: "Date",           title: "Date",          column: "date"            },
    { tp: "RD",             title: "RD",            column: "isRestDay"       },
    { tp: "Type",           title: "Type",          column: "type"            },
    { tp: "ScheduleTimeIn", title: "Sched In",      column: "scheduleTimeIn"  },
    { tp: "ScheduleTimeOut",title: "Sched out",     column: "scheduleTimeOut" },
    { tp: "TimeIn",         title: "Time In",       column: "displayTimeIn"   },
    { tp: "TimeOut",        title: "Time Out",      column: "displayTimeOut"  },
    { tp: "RegularHours",   title: "RG",            column: "regularHours"    },
    { tp: "Late",           title: "Tardy",         column: "late"            },
    { tp: "Undertime",      title: "UT",            column: "undertime"       },
    { tp: "IsAbsent",       title: "Absent",        column: "isAbsent"        },
    { tp: "IsHalfday",      title: "Halfday",       column: "isHalfday"       },
    { tp: "LWOPHour",       title: "LWOP",          column: "lwopHour"        },
    { tp: "PTOHour",        title: "PTO",           column: "ptoHour"         },
    { tp: "VLHour",         title: "VL",            column: "vlHour"          },
    { tp: "SLHour",         title: "SL",            column: "slHour"          },
    { tp: "OTHERLHour",     title: "OTLV",          column: "otherlHour"      },
    { tp: "RegularHoursND", title: "ND",            column: "regularHoursND"  },
    { tp: "OT",             title: "RGOT",          column: "ot"              },
    { tp: "OTND",           title: "RGOTND",        column: "otnd"            },
    { tp: "LH",             title: "LH",            column: "lh"              },
    { tp: "LHOT",           title: "LHOT",          column: "lhot"            },
    { tp: "LHOTND",         title: "LHOTND",        column: "lhotnd"          },
    { tp: "LHOT8",          title: "LHOT > 8",      column: "lhoT8"           },
    { tp: "LHOTND8",        title: "LHOTND > 8",    column: "lhotnD8"         },
    { tp: "LHRDOT",         title: "LHRDOT",        column: "lhrd"            },
    { tp: "LHRDOTND",       title: "LHRDND",        column: "lhrdoT8"         },
    { tp: "LHRDOT8",        title: "LHRD > 8",      column: "lhrdotnd"        },
    { tp: "LHRDOTND8",      title: "LHRDND > 8",    column: "lhrdotnD8"       },
    { tp: "SH",             title: "SH",            column: "sh"              },
    { tp: "SHOT",           title: "SHOT",          column: "shot"            },
    { tp: "SHOTND",         title: "SHOTND",        column: "shotnd"          },
    { tp: "SHOT8",          title: "SHOT > 8",      column: "shoT8"           },
    { tp: "SHOTND8",        title: "SHOTND > 8",    column: "shotnD8"         },
    { tp: "SHRDOT",         title: "SHRDOT",        column: "shrd"            },
    { tp: "SHRDOTND",       title: "SHRDND",        column: "shrdoT8"         },
    { tp: "SHRDOT8",        title: "SHRD > 8",      column: "shrdotnd"        },
    { tp: "SHRDOTND8",      title: "SHRDND > 8",    column: "shrdotnD8"       },
    { tp: "OTRD",           title: "RDOT",          column: "otrd"            },
    { tp: "OTRDND",         title: "RDOTND",        column: "otrdnd"          },
    { tp: "OTRD8",          title: "RDOT > 8",      column: "otrD8"           },
    { tp: "OTRDND8",        title: "RDOTND > 8",    column: "otrdnD8"         },
    { tp: "DH",             title: "DH",            column: "dh"              },
    { tp: "DHOT",           title: "DHOT",          column: "dhot"            },
    { tp: "DHOTND",         title: "DHOTND",        column: "dhotnd"          },
    { tp: "DHOT8",          title: "DHOT > 8",      column: "dhoT8"           },
    { tp: "DHOTND8",        title: "DHOTND > 8",    column: "dhotnD8"         },
    { tp: "DHRDOT",         title: "DHRD",          column: "dhrd"            },
    { tp: "DHRDOTND",       title: "DHRDND",        column: "dhrdoT8"         },
    { tp: "DHRDOT8",        title: "DHRD > 8",      column: "dhrdotnd"        },
    { tp: "DHRDOTND8",      title: "DHRDND > 8",    column: "dhrdotnD8"       },
    { tp: "Remarks",        title: "Remarks",       column: "remarks"         },
  ]

  adjColumn: any = [
    { tp: "TimekeepingId",        title: "Timekeeping ID",          column: "timekeepingId"         },
    { tp: "EmployeeId",           title: "Employee ID",             column: "employeeId"            },
    { tp: "Date",                 title: "Date",                    column: "date"                  },
    { tp: "TimeIn",               title: "Time In",                 column: "timeIn"                },
    { tp: "TimeOut",              title: "Time Out",                column: "timeOut"               },
    { tp: "OBTimeIn",             title: "OB Time In",              column: "obTimeIn"              },
    { tp: "OBTimeOut",            title: "OB Time Out",             column: "obTimeOut"             },
    { tp: "OvertimeHour",         title: "Overtime Hour",           column: "overtimeHour"          },
    { tp: "OffsetHour",           title: "Offset Hour",             column: "offsetHour"            },
    { tp: "VLHour",               title: "Vacation Leave Hour",     column: "vlHour"                },
    { tp: "SLHour",               title: "Sick Leave Hour",         column: "slHour"                },
    { tp: "OTHERLHour",           title: "Other Leave Hour",        column: "otherLHour"            },
    { tp: "LWOPHour",             title: "Leave Without Pay Hour",  column: "lwopHour"              },
    { tp: "IsRestDay",            title: "Is Rest Day",             column: "isRestDay"             },
    { tp: "HolidayType",          title: "Holiday Type",            column: "holidayType"           },
    { tp: "HolidayCount",         title: "Holiday Count",           column: "holidayCount"          },
    { tp: "ScheduleTimeIn",       title: "Schedule Time In",        column: "scheduleTimeIn"        },
    { tp: "ScheduleTimeOut",      title: "Schedule Time Out",       column: "scheduleTimeOut"       },
    { tp: "ScheduleHour",         title: "Schedule Hour",           column: "scheduleHour"          },
    { tp: "BreakHour",            title: "Break Hour",              column: "breakHour"             },
    { tp: "IsHalfday",            title: "Is Halfday",              column: "isHalfday"             },
    { tp: "IsAbsent",             title: "Is Absent",               column: "isAbsent"              },
    { tp: "Late",                 title: "Late",                    column: "late"                  },
    { tp: "Undertime",            title: "Undertime",               column: "undertime"             },
    { tp: "FirstBreakLate",       title: "First Break Late",        column: "firstBreakLate"        },
    { tp: "FirstBreakUndertime",  title: "First Break Undertime",   column: "firstBreakUndertime"   },
    { tp: "SecondBreakLate",      title: "Second Break Late",       column: "secondBreakLate"       },
    { tp: "SecondBreakUndertime", title: "Second Break Undertime",  column: "secondBreakUndertime"  },
    { tp: "ThirdBreakLate",       title: "Third Break Late",        column: "thirdBreakLate"        },
    { tp: "ThirdBreakUndertime",  title: "Third Break Undertime",   column: "thirdBreakUndertime"   },
    { tp: "TotalBreakUndertime",  title: "Total Break Undertime",   column: "totalBreakUndertime"   },
    { tp: "FirstBreakTimeIn",     title: "First Break Time In",     column: "firstBreakTimeIn"      },
    { tp: "FirstBreakTimeOut",    title: "First Break Time Out",    column: "firstBreakTimeOut"     },
    { tp: "SecondBreakTimeIn",    title: "Second Break Time In",    column: "secondBreakTimeIn"     },
    { tp: "SecondBreakTimeOut",   title: "Second Break Time Out",   column: "secondBreakTimeOut"    },
    { tp: "ThirdBreakTimeIn",     title: "Third Break Time In",     column: "thirdBreakTimeIn"      },
    { tp: "ThirdBreakTimeOut",    title: "Third Break Time Out",    column: "thirdBreakTimeOut"     },
    { tp: "RegularHours",         title: "Regular Hours",           column: "regularHours"          },
    { tp: "RegularHoursND",       title: "Regular Hours ND",        column: "regularHoursND"        },
    { tp: "OT",                   title: "Overtime",                column: "ot"                    },
    { tp: "OT8",                  title: "Overtime 8",              column: "ot8"                   },
    { tp: "OTND",                 title: "Overtime ND",             column: "otnd"                  },
    { tp: "OTND8",                title: "Overtime ND 8",           column: "otnd8"                 },
    { tp: "OTRD",                 title: "Overtime RD",             column: "otrd"                  },
    { tp: "OTRD8",                title: "Overtime RD 8",           column: "otrd8"                 },
    { tp: "OTRDND",               title: "Overtime RD ND",          column: "otrdnd"                },
    { tp: "OTRDND8",              title: "Overtime RD ND 8",        column: "otrdnd8"               },
    { tp: "LH",                   title: "Legal Holiday",           column: "lh"                    },
    { tp: "LHOT",                 title: "Legal Holiday OT",        column: "lhot"                  },
    { tp: "LHOT8",                title: "Legal Holiday OT 8",      column: "lhot8"                 },
    { tp: "LHOTND",               title: "Legal Holiday OT ND",     column: "lhotnd"                },
    { tp: "LHOTND8",              title: "Legal Holiday OT ND 8",   column: "lhotnd8"               },
    { tp: "EmployeeCode",         title: "Employee Code",           column: "employeeCode"          },
    { tp: "DisplayName",          title: "Employee Name",           column: "displayName"           },
    { tp: "Remarks",              title: "Remarks",                 column: "remarks"               }
  ]


  pipe = new DatePipe('en-US');

  finalColumns: any = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    public dialogRef: MatDialogRef<TkDetailComponent>
  ) { }

  ngOnInit() {
    // this.columns = this.data.columns
    this.finalColumns = this.data.type == "ATK" ? this.adjColumn : this.columns
    this.source = this.data.source.map(item => ({
      ...item,

      isRestDay:        item.isRestDay ? "Yes" : "No",
      date:             this.pipe.transform(item.date,"MM/dd/yyyy"),
      scheduleTimeIn:   this.pipe.transform(item.scheduleTimeIn,"MM/dd/yyyy hh:mm a"),
      scheduleTimeOut:  this.pipe.transform(item.scheduleTimeOut,"MM/dd/yyyy hh:mm a"),
      isAbsent:         item.isAbsent ? "Yes" : "No",
      isHalfday:        item.isHalfday ? "Yes" : "No"
    }));

    this.totalRows = this.data.source.length
  }

  export(){
    var newData = []
    this.source.forEach(data => {
      var obj = {}
      this.columns.forEach(col => {
        obj[col.tp] = data[col.column]
      });
      newData.push(obj);
    });

    this.coreService.exportToExcel(newData, "Timekeeping Detail");
  }

  close(){
    this.dialogRef.close()
  }

}
