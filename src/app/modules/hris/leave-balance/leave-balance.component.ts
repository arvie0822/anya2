import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownOptions, DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { EmployeeHierarchy } from 'app/model/employee-hierarchy';
import { LeaveBalanceRequest } from 'app/model/employee/leave-balance';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { LeaveService } from 'app/services/leaveService/leave.service';
import { MasterService } from 'app/services/masterService/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css'],
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
    DropdownCustomComponent,
    EmployeeHierarchyComponent,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    TranslocoModule,
    DropdownComponent,
    MatMenuModule
],
})
export class LeaveBalanceComponent implements OnInit {
  leavebalanceform: FormGroup
  dropdownFixRequest = new DropdownRequest
  leavetyperequest = new DropdownRequest
  dropdownOptions = new DropdownOptions
  pipe = new DatePipe('en-US');
  field_count = 0
  resultHierarchy = new SearchHierarchy;
  dataSource = [];
  isLoadingResults: boolean = true;
  totalRows: number = 0
  request = new TableRequest()
  displayedColumns: string[] = ['action','amount', 'type', 'remarks', 'employeeId', 'leaveTypeId', 'earned', 'carried', 'carryExpiration', 'expired', 'used', 'pendingApproval', 'pendingSchedule', 'available'];
  id : string
  isSave: boolean = false
  isFormFieldEnabled: boolean = true;


  constructor( private fb: FormBuilder,
    private leaveService: LeaveService,
    private masterService : MasterService,
    private route: ActivatedRoute,
    private router: Router,
    private message: FuseConfirmationService,
    private coreService: CoreService,


    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.leavebalanceform = this.fb.group(new LeaveBalanceRequest());
        this.isFormFieldEnabled = false;

        forkJoin({
            leavetype: this.coreService.getCoreDropdown(1017,this.leavetyperequest),
        }).subscribe({
            next: (response) => {
                // custom
                this.dropdownOptions.Leavecategory = response.leavetype.payload

            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            },

        });
    }

    enable(e){
        // this.isFormFieldEnabled = true;
        e.isRemarks = true
        e.isType = true
        e.isAmount = true

    }

    sample(e){

    }

    handleUploadEvent() {
        this.router.navigate(["detail/upload"]);
    }

    Search(ex) {
        var leavetype = this.leavebalanceform.value.leaveTypeId.toString()
        this.request.SearchColumn = []
        this.leavebalanceform.markAllAsTouched();
        if (this.leavebalanceform.valid) {
            // if(this.leavebalanceform.value.leaveTypeId.length > 0){

            // }\
            this.request.SearchColumn = []
            this.leavebalanceform.value.leaveTypeId.forEach(element => {
                this.request.SearchColumn.push({
                    "key": "leaveTypeId",
                    "value": element + "",
                    "type": 2
                })
            });

            if (this.resultHierarchy.Search.length > 0) {
                this.resultHierarchy.Search.forEach(element => {
                    element.Value.forEach(el => {
                        this.request.SearchColumn.push({

                            "key": element.Key,
                            "value": el + "",
                            "type": element.Type
                        })
                    });

                });
            }
            this.dropdownFixRequest.id.push(
                { dropdownID: 0, dropdownTypeID: 82 },
            )
            if (ex) {
                this.coreService.exportAll(this.request, '12662', '1')
            } else {
                this.loadData()
            }
        }
    }

    loadData(): void {
        this.request.Order = "EmployeeId"
        this.isLoadingResults = true;
        this.leaveService.getLeaveBalanceTable(this.request).subscribe({
        next: (value: any) => {
                if (value.statusCode == 200) {

                    console.log(value.payload.data)
                    this.dataSource = value.payload.data
                    this.dataSource.forEach(element => {
                        element["isAmount"] = false
                        element["isType"] = false
                        element["isRemarks"] = false
                    });
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

    handlePageEvent(e): void {
        this.request.Start = e.pageIndex
        this.request.Length = e.pageSize
        this.loadData()
    }

    submit(): void {
        const dialogRef = this.message.open(SaveMessage);
        // console.log(this.leavebalanceform.value)
        // JSON.stringify(this.leavebalanceform.value)

        var dd = this.dataSource.filter(x => x.amount !== 0 && x.type !==0)

        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.isSave = true
                this.leaveService.postLeaveBalance(dd).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.message.open(SuccessMessage);
                            this.isSave = false
                                this.router.navigate(['/detail/leave-balance']);
                                this.loadData()
                        }
                        else {
                            this.message.open(FailedMessage);
                            console.log(value.stackTrace)
                            console.log(value.message)
                        }
                    },
                    error: (e) => {
                        this.isSave = false
                        this.message.open(FailedMessage);
                        console.error(e)
                    }
                });
            }
        });
    }
}
