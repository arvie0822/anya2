import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
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
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { EmployeeLocation } from 'app/model/employee/employee-location';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { ShiftService } from 'app/services/shiftService/shift.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';

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
  selector: 'app-employee-location',
  templateUrl: './employee-location.component.html',
  styleUrls: ['./employee-location.component.css'],
  encapsulation: ViewEncapsulation.None,
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
    MatDividerModule,
    MatTabsModule,
    MatButtonModule,
    EmployeeHierarchyComponent,
    DropdownCustomComponent
],
})
export class EmployeeLocationComponent implements OnInit {

  locationForm: FormGroup
  pipe = new DatePipe('en-US');
  weekOptions = [
    { dropdownID: 1, description: "No" },
    { dropdownID: 2, description: "Two Week" },
    { dropdownID: 3, description: "Three Week" },
    { dropdownID: 4, description: "Four Week" }
  ]
  defaultTag = [{ id: [0], type: -4 }]
  prevModule = ""
  resultHierarchy = new SearchHierarchy;
  inputChange: UntypedFormControl = new UntypedFormControl();
  hideSubmit: boolean = false
  requiredadd: boolean = false
  dataSource: any = []
  id: string;
  displayColumns: any = ['apply', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  displayDef: any = [
    {def: 'apply',    header: 'Apply to All'},
    {def: 'monday',   header: 'Monday'      },
    {def: 'tuesday',  header: 'Tuesday'     },
    {def: 'wednesday',header: 'Wednesday'   },
    {def: 'thursday', header: 'Thursday'    },
    {def: 'friday',   header: 'Friday'      },
    {def: 'saturday', header: 'Saturday'    },
    {def: 'sunday',   header: 'Sunday'      }
  ];

  dataEmployee = [];
  emplopyeeColumns: string[] = ['employeeCode', 'displayName', 'action'];

  dataDate = [];
  dateColumns: string[] = ['date', 'day', 'location', 'action'];

  totalRows = 0
  request = new TableRequest()
  dropdownRequest = new DropdownRequest
  locations = [
    {description: "WFH", dropdownID: -1},
    {description: "Field", dropdownID: -2},
    {description: "Branch 1", dropdownID: 1},
    {description: "Branch 2", dropdownID: 2},
    {description: "Branch 3", dropdownID: 3},
    {description: "Branch 4", dropdownID: 4},
  ]

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private message: FuseConfirmationService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.prevModule = sessionStorage.getItem('moduleId')
    this.id = this.route.snapshot.paramMap.get('id');
    this.locationForm = this.fb.group(new EmployeeLocation());

    // this.userService.getAssignLocationDropdown(this.dropdownRequest).subscribe({
    //   next: (response) => {
    //     console.log(response)
    //     this.locations = response.payload

    //     this.handlerWeekChange();
    //   },
    //   error: (e) => {
    //     console.error(e)
    //   }
    // });

        this.handlerWeekChange();

        this.dataSource.forEach(week => {
            if (week.monday.id ==null && week.tuesday.id ==null && week.wednesday.id ==null && week.thursday.id ==null && week.friday.id ==null && week.saturday.id ==null && week.sunday.id == null) {
                this.requiredadd = true
            }
        });
    }

    onchange(value : any,i){
        if (value.monday.id !==null && value.tuesday.id !==null && value.wednesday.id !==null && value.thursday.id !==null && value.friday.id !==null && value.saturday.id !==null && value.sunday.id !==null) {
            this.requiredadd = false
        }
    }

  get lf(){
    return this.locationForm.value
  }

  get currentModule() {
    var mgmt = GF.IsEqual(sessionStorage.getItem('moduleId'), ['40'])
    this.defaultTag = mgmt ? [{ id: [0], type: -2 }, { id: [], type: -3 }, { id: [], type: -4 }] : []
    if (!GF.IsEqual(this.prevModule, [sessionStorage.getItem('moduleId')])) {
        this.prevModule = sessionStorage.getItem('moduleId')
        this.dataSource = []
    }
    return mgmt;
}

  handlerWeekChange() {
    this.dataSource = []
    for (let index = 0; index < this.locationForm.value.weekCount; index++) {
      var obj = {}
      this.displayColumns.forEach(day => {
        obj[day] = { id: null, child: [], option: this.locations }
      });
      this.dataSource.push(obj)
    }
  }

  handleApply(event, index, def) {
    console.log(event, index, def)
    if (def == "apply") {
      this.displayColumns.forEach(day => {
        this.dataSource[index][day].id = event
      });
    }
  }

  getNextBatchParent(e) {

  }

  handlePageEvent(e): void {
    this.request.Start = e.pageIndex
    this.request.Length = e.pageSize
    this.handleAddSearch()
  }

  handleAddSearch(){

    if (this.resultHierarchy.Search.length == 0) {
        this.requiredadd = true
        var dates = [ 'apply', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ]

        this.dataSource.forEach(week => {
            dates.forEach(day => {
                week[day].id = null
            });
        });
        return

    }else{
        this.requiredadd = false
    }

    this.locationForm.markAllAsTouched()
    if (!this.locationForm.valid) {
      return
    }
    // Days
    var days = []
    this.dataSource.forEach(da => {
      var myday = {}
      this.displayColumns.forEach(day => {
        myday[day] = GF.IsEmptyReturn(da[day].id,0)
      });
      days.push(myday)
    });

    this.request.SearchColumn = []

    //Request
    this.request.SearchColumn.push({
      "key": "DateFrom",
      "value": this.pipe.transform(this.locationForm.value.dateFrom,"yyyy-MM-dd"),
      "type": 4
    })
    this.request.SearchColumn.push({
      "key": "DateTo",
      "value": this.pipe.transform(this.locationForm.value.dateTo,"yyyy-MM-dd"),
      "type": 5
    })

    this.resultHierarchy.Search.forEach(ee => {
      ee.Value.forEach(ii => {
        this.request.SearchColumn.push({
          "key": ee.Key,
          "value": ii+"",
          "type": 2
        })
      });
    });

    var obj = {
      employeeExclude: [],
      days: days[0],
      request: this.request,
    }

    // console.log(obj)
    this.userService.getAssignLocationMap(obj).subscribe({
      next: (response) => {
        this.dataDate = response.payload.dates
        this.dataEmployee = response.payload.employees
        this.totalRows = response.payload.totalRows
      },
      error: (e) => {
        console.error(e)
      }
    });

  }

  submit(){
    var obj = {
      dates: this.dataDate,
      employeeExclude: [],
      request: this.request
    }

    const dialogRef = this.message.open(SaveMessage);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == "confirmed") {

        this.userService.postAssignLocation(obj).subscribe({
          next: (response) => {
            if (response.statusCode == 200) {
              this.message.open(SuccessMessage);
              this.router.navigate(['/search/employee-location']);
            }
            else {
              this.message.open(FailedMessage);
              console.log(response.stackTrace)
              console.log(response.message)
            }
          },
          error: (e) => {
            console.error(e)
          }
        });


      }
    })



  }

}
