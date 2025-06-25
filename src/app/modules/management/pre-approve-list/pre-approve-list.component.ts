import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownOptions, DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { FilingService } from 'app/services/filingService/filing.service';
import { GF } from 'app/shared/global-functions';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
    selector: 'app-pre-approve-list',
    templateUrl: './pre-approve-list.component.html',
    styleUrls: ['./pre-approve-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_FORMATS,
        }
    ],
    imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconButton,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule,
    DropdownCustomComponent,
    MatMenuModule
],
})
export class PreApproveListComponent implements OnInit {
    dropdownOptions = new DropdownOptions
    dataSource = [];
    request = new TableRequest()
    totalRows: number = 0
    dropdownRequestsub = new DropdownRequest
    resultHierarchy = new SearchHierarchy;
    field_count = 0
    pipe = new DatePipe('en-US');
    defaultTag = [{ id: [0], type: -4 }]
    prevModule = ""
    late : boolean = false
    isSave : boolean = false
    displayedColumns: string[] = ['action', 'Code','Name','Time','Date_from', 'Date_to', 'Reason','status', 'Requested_by', 'Requested_date'];
    constructor(private router: Router, private filingService: FilingService, private coreService: CoreService,
        private message: FuseConfirmationService, private route: ActivatedRoute,
        ) { }

    myForm = new FormGroup({
        employeeId: new FormControl(null),
        filingTypes: new FormControl(null),
        dateFrom: new FormControl(null),
        dateTo: new FormControl(null),
    });

    ngOnInit() {
        this.initData()
    }

    get currentModule() {
        var mgmt = GF.IsEqual(sessionStorage.getItem('moduleId'), ['99','159'])
        this.defaultTag = mgmt ? [{ id: [0], type: -2 }, { id: [], type: -3 }, { id: [], type: -4 }] : []
        if (!GF.IsEqual(this.prevModule, [sessionStorage.getItem('moduleId')])) {
            this.prevModule = sessionStorage.getItem('moduleId')
            this.dataSource = []
        }
        return mgmt;
    }

    handleSortEvent(e) { }

    handleCreateEvent(): void {
        sessionStorage.setItem("adds", "")
        sessionStorage.getItem('moduleId')

        var id = ''
        this.router.navigate(["/detail/pre-approve-ot/"]);

    }

    async search() {

        this.request.SearchColumn = []
        this.request.Length = 0

        var empid = this.myForm.value.employeeId
        var employees = this.dropdownOptions.employeedef.filter(item => empid.includes(item.dropdownID))
        var id = employees.map(x => x.encryptID)

        empid.forEach(i => {
            this.request.SearchColumn.push({
                "key": "employeeId",
                "value": i + "",
                "type": 2
            })
        });

        this.request.SearchColumn.push({
            "key": "moduleId",
            "value": '99',
            "type": 2
        })

        this.request.SearchColumn.push({
            "key": "dateFrom",
            "value": this.pipe.transform(this.myForm.value.dateFrom, 'yyyy-MM-dd '),
            "type": 4
        })

        this.request.SearchColumn.push({
            "key": "dateTo",
            "value": this.pipe.transform(this.myForm.value.dateTo, 'yyyy-MM-dd'),
            "type": 5
        })
        this.loadData(true)

    }

    loadData(load): void {

        this.filingService.getFilingTable(this.request).subscribe(data => {

            if (data.statusCode == 200) {
                this.totalRows = data.payload.totalRows
                this.dataSource = data.payload.data.map(x => ({
                    Code : x.code,
                    Name : x.employee,
                    Time : x.isDuration == true ? "Duration" : "Range" ,
                    Date_from : x.dateFrom ,
                    Date_to : x.dateTo ,
                    leaveType : x.leaveType ,
                    Shift_code : x.shiftCode,
                    Hours : x.offsetHours ,
                    Reason : x.reason ,
                    status : x.status ,
                    Requested_by : x.requestedBy,
                    Requested_date : x.requestDate,
                    encryptId : x.encryptId
                })
                )
            }
            else {
                console.log(data.stackTrace)
                console.log(data.message)
            }
        },
            (error: HttpErrorResponse) => {
                console.log(error.error);
            });
    }

    initData() {


        this.coreService.getCoreDropdown(1035, this.dropdownRequestsub)



            .subscribe({
                next: (response) => {
                    // custom
                    this.dropdownOptions.employeedef = response.payload

                },

                error: (e) => {
                    console.error(e)
                },
                complete: () => {

                },

            });
    }

    handleClickEvent(a,e) {
        sessionStorage.setItem("action", a)
        this.router.navigate(['/detail/pre-approve-ot',e.encryptId]);
    }

    handlePageEvent(e){}

    cancel(e): void {
        // cancelChangeSchedule
        var mid = "2NW9BIGRy4HSEQl7q73gRA%3d%3d"

        // SaveMessage.message = "Are you sure you want to Cancel"
        var dialogRef = this.message.open(SaveMessage);


        dialogRef.afterClosed().subscribe((result) => {

          if (result == "confirmed") {
                // var uri = type === 32 ? "postCancelFiling" : type === 33 ? "postCancelFiling" : type === 34 ? "postCancelFiling": type === 35 ? "postCancelFiling":type === 36 ? "postCancelFiling":type === 37 ? "postCancelFiling":type === 52 ? "postCancelFiling":type === 64 ? "postCancelFiling": ""
                this.filingService.postCancelFiling(mid, e, this.late).subscribe({

                    next: (value: any) => {
                        this.coreService.valid(value, this.late, 1,false,"","cancellation").then((res)=>{
                            if (res.saveNow) {
                                this.late = res.lateSave
                                this.cancel(e)
                                return
                            }

                            if (res.reset) {
                                this.late = false
                                this.search()
                            }
                        })
                    },
                    error: (e) => {
                        this.isSave = false
                        this.message.open(FailedMessage);
                        console.error(e)
                    }
                });
            }
        }
        );
    }
}
