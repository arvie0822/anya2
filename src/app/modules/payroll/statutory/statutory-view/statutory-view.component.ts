import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { PayrollHeader } from 'app/model/administration/payroll-category';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { FilingService } from 'app/services/filingService/filing.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DatePipe } from '@angular/common';
import { myData } from 'app/model/app.moduleId';
// import { AuthService2 } from "../../../services/authService/auth.service";

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS,} from '@angular-material-components/datetime-picker';
import { forEach } from 'lodash';
import { GF } from 'app/shared/global-functions';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { MasterService } from 'app/services/masterService/master.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


// =================== For date time picker ============================
export const MOMENT_DATETIME_WITH_SECONDS_FORMAT = 'MM/DD/YY hh:mm A';
const CUSTOM_MOMENT_FORMATS: NgxMatDateFormats = {
    parse: {
        dateInput: MOMENT_DATETIME_WITH_SECONDS_FORMAT,
    },
    display: {
        dateInput: MOMENT_DATETIME_WITH_SECONDS_FORMAT,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: MOMENT_DATETIME_WITH_SECONDS_FORMAT,
        monthYearA11yLabel: 'MMMM YYYY',
    },
};


// =================== For date picker ============================
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


const applications: any[] = [];
export interface PeriodicElement {
    Code: string;
    Date_from: string;
    Date_to: string;
    Shift_code : string;
    Hours : string;
    Reason: string;
    Status: string;
    Approval: string;
    Approval_date: string;
    Requested_by: string;
    Requested_date: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
    // { Code: "VL", Date_from: "sample", Date_to: "sample",Shift_code:"", Reason: "sample", Status: "sample", Approval: "sample", Approval_date: "sample", Requested_by: "sample", Requested_date: "sample" },
    // { Code: "Test Post", Date_from: "sample", Date_to: "sample", Reason: "sample", Status: "sample", Approval: "sample", Approval_date: "sample", Requested_by: "sample", Requested_date: "sample" },
    // { Code: "sample", Date_from: "sample", Date_to: "sample", Reason: "sample", Status: "sample", Approval: "sample", Approval_date: "sample", Requested_by: "sample", Requested_date: "sample" },
    // { Code: "sample", Date_from: "sample", Date_to: "sample", Reason: "sample", Status: "sample", Approval: "sample", Approval_date: "sample", Requested_by: "sample", Requested_date: "sample" },
    // { Code: "sample", Date_from: "sample", Date_to: "sample", Reason: "sample", Status: "sample", Approval: "sample", Approval_date: "sample", Requested_by: "sample", Requested_date: "sample" },
]
@Component({
    selector: 'app-statutory-view',
    templateUrl: './statutory-view.component.html',
    styleUrls: ['./statutory-view.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    DropdownComponent,
    MatMenuModule
],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        // ============= For date picker =============
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_FORMATS,
        },
        // ============= For date time picker =============
        {
            provide: NGX_MAT_DATE_FORMATS,
            useValue: CUSTOM_MOMENT_FORMATS,
        },

    ],
})
export class StatutoryViewComponent implements OnInit {
    @ViewChild(MatTable) matTable: MatTable<any>;
    dateFrom: Date = new Date()
    dateTo: Date = new Date()
    isLoadingResults: boolean = true;
    totalRows: number = 0
    request = new TableRequest()
    dropdownOptions = new DropdownOptions
    filingrequest = new DropdownRequest
    dropdownRequestsub = new DropdownRequest
    dropdownFixRequest = new DropdownRequest;
    displayedColumns: string[] = ['action', 'type', 'name', 'description', 'createdBy', 'dateCreated', 'status'];
    dataSource = []
    moduleid: string = ""
    id: string = ""
    sample: string = ""
    table: any = []
    url: string = ""
    isSave: boolean = false
    pipe = new DatePipe('en-US');
    disabledbutton: boolean = false
    successMessage = {...SuccessMessage}
    globalmoduleId: boolean
    tid : any
    prevModule = ""
    sssForm = new FormGroup({
        // employeeId : new FormControl(null),
        statutory: new FormControl(null),
    });
    loginId : number
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(

        private router: Router,
        private coreService: CoreService,
        private route: ActivatedRoute,
        private http: HttpClient,
        public auth: AuthService,
        private message: FuseConfirmationService,
        private payrollService: PayrollService,
        private masterService: MasterService,
    ) {

        this.request = new TableRequest()
        this.request.Length = 20
        this.table = []
    }


    // ngAfterViewInit() {
    //     this.dataSource = this.paginator;
    // }

    ngOnInit() {

        // this.try()
        this.sssForm.reset
        sessionStorage.setItem("action", "")
        this.initData()
        this.loadData()

        this.globalmoduleId = sessionStorage.getItem('moduleId') == '68' ? true : false;

        // this.id = this.route.snapshot.paramMap.get('id');

        var id = [sessionStorage.getItem("u")]
        this.coreService.encrypt_decrypt(false,id)
        .subscribe({
          next: (value: any) => {

            this.loginId = Number(value.payload[0])
            this.dropdownFixRequest.id.push(
                { dropdownID: value.payload == null || value.payload.statutory == null ? 0 : value.payload.statutory, dropdownTypeID: 125 }
            )
            this.initData()

          },
          error: (e) => {
            console.error(e)
          },
          complete: () => {
          }
        });

    }

    get currentModule() {
        var filinglist =  GF.IsEqual(sessionStorage.getItem('moduleId'),['68']) //sessionStorage.getItem('moduleId') == '41' ? true : false;
        if (!GF.IsEqual(this.prevModule,[sessionStorage.getItem('moduleId')])) {
            this.prevModule = sessionStorage.getItem('moduleId')
        }
        return filinglist;
    }

    handleSortEvent(e): void {
        // this.paginator.pageIndex = 0
        this.request.Start = 0
        this.request.Order = e.active
        this.request.OrderBy = e.direction
        this.loadData()
    }

    async search() {
        var tid = sessionStorage.getItem('u')

        this.request.SearchColumn = []

        if (!GF.IsEmpty(this.sssForm.value.statutory)) {
            this.request.SearchColumn.push({
                "key": "typeId",
                "value": this.sssForm.value.statutory.toString(),
                "type": 2
            })
        }

        this.loadData()



    }

    loadData(): void {

        var eid = sessionStorage.getItem('u')

        this.isLoadingResults = true;

        this.payrollService.getDynamicStatutoryTable(this.request).subscribe({
            next: (value: any) => {
              if (value.statusCode == 200) {
                console.log(value.payload.data)
                this.dataSource = value.payload.data
                this.totalRows = value.payload.totalRows
                this.matTable.renderRows();
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

    // setParams(load) {
    //     if (!load) {
    //         this.request.SearchColumn = []
    //         this.table.filter.filter(item => item.value !== "" && item.value !== 0)
    //             .forEach(ee => {

    //                 if (ee.multiselect) {
    //                     this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== ee.id);
    //                     ee.value.forEach(v => {
    //                         this.request.SearchColumn.push({
    //                             "key": ee.id,
    //                             "value": "" + v,
    //                             "type": 2
    //                         })
    //                     });
    //                 } else {
    //                     var ty = 0
    //                     if (ee.type == "select" || ee.type == "custom") {
    //                         ty = 1
    //                     }
    //                     this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== ee.id);
    //                     this.request.SearchColumn.push({
    //                         "key": ee.id,
    //                         "value": "" + ee.value,
    //                         "type": ty
    //                     })
    //                 }
    //             });
    //     }
    // }


    handlePageEvent(e) {
        this.request.Start = e.pageIndex
        this.request.Length = e.pageSize
        this.search()
     }

    initData() {

            forkJoin({
                statutory: this.masterService.getDropdownFix(this.dropdownFixRequest)
            })

            .subscribe({
                next: (response) => {
                    this.dropdownOptions.statutoryDef = response.statutory.payload.filter(x => x.dropdownTypeID === 125 && [30379, 30380, 30381, 30382].includes(x.dropdownID))
                },

                error: (e) => {
                    console.error(e)
                },
                complete: () => {

                },

            });
    }


    handleClickEvent(a, e): void {
        sessionStorage.setItem("action", a)
        sessionStorage.setItem("adds", e["type"])

        this.router.navigate(['/detail/setup/', e.encryptId]);
    }

    handleCreateEvent(): void {
        sessionStorage.setItem("adds", "")
         sessionStorage.getItem('moduleId')
        this.router.navigate(['/detail/setup']);

    }

    // cancel(e): void {
    //     // cancelChangeSchedule

    //     var mid = this.dropdownOptions.filingdef.find(item => item.dropdownID == this.sssForm.value.filingTypes).encryptID


    //     // SaveMessage.message = "Are you sure you want to Cancel"
    //     var dialogRef = this.message.open(SaveMessage);


    //     dialogRef.afterClosed().subscribe((result) => {

    //       if (result == "confirmed") {
    //             var type = this.sssForm.value.filingTypes
    //             // var uri = type === 32 ? "postCancelFiling" : type === 33 ? "postCancelFiling" : type === 34 ? "postCancelFiling": type === 35 ? "postCancelFiling":type === 36 ? "postCancelFiling":type === 37 ? "postCancelFiling":type === 52 ? "postCancelFiling":type === 64 ? "postCancelFiling": ""
    //             this.filingService.postCancelFiling(mid, e).subscribe({

    //                 next: (value: any) => {
    //                     if (value.statusCode == 200) {
    //                         this.message.open(this.successMessage);
    //                         this.isSave = false
    //                         this.search()
    //                     }
    //                     else {
    //                         this.message.open(FailedMessage);
    //                         console.log(value.stackTrace)
    //                         console.log(value.message)
    //                     }
    //                 },
    //                 error: (e) => {
    //                     this.isSave = false
    //                     this.message.open(FailedMessage);
    //                     console.error(e)
    //                 }
    //             });
    //         }
    //     }
    //     );
    // }

    handleClicdownload(id,empid){
        this.coreService.directDownloadBoldRTemplate("COE",'',"pdf","{'COEID':["+id+"]}", null,false,"")
    }

}
