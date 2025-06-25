import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { Audit } from 'app/model/administration/audit-logs';
import { TableRequest } from 'app/model/datatable.model';
import { dropdownCustomType } from 'app/model/dropdown-custom.model';
import { DropdownOptions, DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


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
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css'],
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
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    DropdownCustomComponent,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    TranslocoModule
],
})
export class AuditLogsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) matTable: MatTable<any>;
  resultHierarchy = new SearchHierarchy;
  dropdownOptions = new DropdownOptions
  dropdownCustomType: any = dropdownCustomType
  isLoadingResults: boolean
  field_count = 0
  auditForm: FormGroup
  request = new TableRequest()
  dropdownRequest = new DropdownRequest()
  auditSource: any = []
  employee = []
  totalRows: number = 0
  auditColumns: string[] = ['module', 'activity', 'message', 'date', 'doneBy', 'device', 'browser'];
  pipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder, private masterService: MasterService, private tenantService: TenantService, private coreService: CoreService, private core : CoreService,
    private router: Router) { }

  ngOnInit() {
    this.auditForm = this.fb.group(new Audit());
    this.auditForm.disable()
    this.request.SearchColumn = []
    this.request.Order = "dateCreated"
    this.request.OrderBy = "Desc"

    this.dropdownRequest.includeInactive = true


    forkJoin({
      modules: this.coreService.getCoreDropdown(1015, this.dropdownRequest),
      auditType: this.masterService.getAuditTypeEnum(),
      employee: this.coreService.getCoreDropdown(1005, this.dropdownRequest),
    }).subscribe({
      next: (response) => {
        this.dropdownOptions.moduledef = response.modules.payload
        this.dropdownOptions.auditdef = response.auditType.payload
        this.dropdownOptions.employeedef = response.employee.payload
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        this.auditForm.enable()
      },
    });
  }

  handlePageEvent(e): void {
    this.request.Start = e.pageIndex
    this.request.Length = e.pageSize
    this.search(true)
  }

  handleSortEvent(e): void {
    this.paginator.pageIndex = 0
    this.request.Start = 0
    this.request.Order = e.active
    this.request.OrderBy = e.direction
    this.search(true)
  }

  search(isSearch) {
    this.request.SearchColumn = []
    for (const field in this.auditForm.controls) {
      const control = this.auditForm.get(field);

      if (control.value != undefined && control.value != "" && control.value != null) {
        if (field == "moduleId" || field == "createdBy" || field == "auditType") {
          control.value.forEach(element => {
            this.request.SearchColumn.push({
              "key": field,
              "value": element + "",
              "type": 2
            })
          });
        }
        if (field == "dateFrom") {
          this.request.SearchColumn.push({
            "key": "dateCreated",
            "value": this.pipe.transform(control.value, "yyyy-MM-dd"),
            "type": 4
          })
        }
        if (field == "dateTo") {
          this.request.SearchColumn.push({
            "key": "dateCreated",
            "value": this.pipe.transform(control.value, "yyyy-MM-dd"),
            "type": 5
          })
        }
      }

    }

    if(isSearch){
             this.tenantService.getSystemLogs(this.request).subscribe({
      next: (value: any) => {
        console.log(value)

        this.totalRows = value.payload.totalRows
        this.auditSource = value.payload.data
        this.auditSource.paginator = this.paginator;
        this.matTable.renderRows();
      },
      error: (e) => {
        console.error(e)
      }
    });
    }else{
        this.core.exportAll(this.request,'87','1')
    }

  }

}
