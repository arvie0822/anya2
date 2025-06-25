import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { additional, e201Requirement } from 'app/model/hris/e201';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
// import { E201ServiceService } from 'app/services/e201Service/e201Service.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import { SharedModule } from 'app/shared/shared.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-assign-requirements',
  templateUrl: 'assign-requirements.component.html',
  styleUrls: ['./assign-requirements.component.css'],
   encapsulation: ViewEncapsulation.None,
      animations: fuseAnimations,
      standalone: true,
      imports: [
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatMomentDateModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatSelectInfiniteScrollModule,
    MatAutocompleteModule,
    SharedModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatTimepickerModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    MatToolbarModule,
    MatRadioModule,
    DragDropModule,
    CdkStepperModule,
    MatTooltipModule,
    CardTitleComponent,
    DropdownComponent,
    TranslocoModule,
    MatMenuModule
]
})
export class AssignRequirmentsComponent implements OnInit {

    displayedColumns: string[] = ['action','requirement', 'dueDate'];
    dataSource : any = []
    assignrequirform : FormGroup
    additionalform : FormGroup
    @ViewChild('assigntable') assigntable: MatTable<any>;
    @ViewChild('paginator0') paginator0: MatPaginator;
    isSave: boolean = false
    showsubmit: boolean = true
    disablebutton: boolean = false
    errors: any
    _onDestroy: any
    failedMessage = { ...FailedMessage}
    savemessage = { ...SaveMessage}
    id: string
    action: string = ""
    dropdownOptions = new DropdownOptions
    dropdownFix = new DropdownRequest
    dropdownRequest = new DropdownRequest
    disableOptions: number[] = []
    reqid : any
    requirementssid : any
    requirementssdes : any
    indexreq : any
    editdisable = false
    requirments = [
        { id: 1, description: 'Police Clearance' },
        { id: 2, description: 'NSO Birthcert' },
        { id: 3, description: 'SSS' },
        { id: 4, description: 'Philhealth' },
        // Add more options as needed
      ];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator0;
    }

  constructor(
    private fb: FormBuilder,
    private message: FuseConfirmationService,
    // private e201service : E201ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private userService : UserService,
    private masterService : MasterService ,
    private tenantService : TenantService
    ) {}

    ngOnInit() {
        this.assignrequirform = this.fb.group(new e201Requirement());
        this.additionalform = this.fb.group(new additional());
        this.id = this.route.snapshot.paramMap.get('id');

        this.dropdownRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 150 },
        )
        this.initData()
    }



    addtable() {
        var requiredId = this.dataSource.some(y => y.requirement == this.additionalform.value.requirement)
        if(GF.IsEmpty(this.additionalform.value.requirement) || GF.IsEmpty(this.additionalform.value.days) || GF.IsEmpty(this.assignrequirform.value.name) ){
            this.additionalform.markAllAsTouched()
            this.assignrequirform.markAllAsTouched()
        }
        else if (requiredId){
            var requirename =  this.dropdownOptions.requirmentdef.find(x => x.dropdownID == this.additionalform.value.requirement).description
            this.failedMessage.message = '' + requirename + ' already exists'
            this.message.open(this.failedMessage)
        }else{
            this.editdisable = false
            this.dataSource.unshift({
                // action: null,
                requirements: this.dropdownOptions.requirmentdef.find(x => x.dropdownID == this.additionalform.value.requirement).description,
                requirement: this.additionalform.value.requirement,
                dueDate: this.additionalform.value.days,
                id : this.reqid,
                e201RequirementId: this.requirementssid,
                e201Requirement: this.requirementssdes
            })
            //  this.dataSource.splice(this.indexreq, 1);
            this.disableOptions = this.dataSource.map(x => x.requirement)
            this.assigntable.renderRows()
            // this.additionalform.get('requirement').setValue(0)
            // this.additionalform.get('days').setValue(0)
        }
    }


    deledit(a, i, e) {
        switch (a) {
            case "delete":
                this.dataSource.splice(i, 1);
                this.assigntable.renderRows();
                break;

            case "edit":
                this.editdisable = true
                this.additionalform.get('requirement').setValue(e.requirement)
                this.additionalform.get('days').setValue(e.dueDate)
                this.reqid = e.id
                this.requirementssid = e.e201RequirementId
                this.requirementssdes = e.e201Requirement
                this.indexreq = i
                this.dataSource.splice(i, 1);
                this.assigntable.renderRows();
            break;
        }
        this.disableOptions = this.dataSource.map(x => x.requirement)
    }

    submit(){
        this.assignrequirform.get('e201RequirementDetail').setValue(this.dataSource)
        if (this.id == "") {
            this.assignrequirform.get('e201RequirementId').setValue(0)
        }
        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.isSave = true
                // postE201Requirement

                this.isSave = true
                this.userService.postE201Requirement(this.assignrequirform.getRawValue()).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.message.open(SuccessMessage);
                            this.router.navigate(['/search/assign-requirements']);
                            this.isSave = false
                        }
                    }
                })
            }
        });
    }

    initData() {
        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),

        }).subscribe({
            next: (value: any) => {
                // Fix ===========
                this.dropdownOptions.requirmentdef = value.dropdown.payload.filter(x => x.dropdownTypeID === 150)
                if (this.id !== "") {
                    this.action = sessionStorage.getItem("action")
                    if (this.action == 'edit') {
                        this._onDestroy = this.userService.getE201Requirement(this.id).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    this.assignrequirform.patchValue(JSON.parse(JSON.stringify(value.payload).replace(/\:null/gi, "\:[]")))
                                    this.dataSource = value.payload.e201RequirementDetail.map(x => ({
                                        requirement : x.requirement,
                                        requirements : this.dropdownOptions.requirmentdef.find(y => y.dropdownID == x.requirement).description,
                                        dueDate : x.dueDate,
                                        e201RequirementId : x.e201RequirementId,
                                        e201Requirement : x.e201Requirement,
                                        id : x.id
                                    }))
                                    this.disableOptions = this.dataSource.map(x => x.requirement)
                                }
                            }
                        })


                    }else if(this.action == 'view'){
                        this.showsubmit = false
                        this.disablebutton = true
                        this._onDestroy = this.userService.getE201Requirement(this.id).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    this.assignrequirform.disable()
                                    this.additionalform.disable()
                                    this.assignrequirform.patchValue(JSON.parse(JSON.stringify(value.payload).replace(/\:null/gi, "\:[]")))
                                    this.dataSource = value.payload.e201RequirementDetail.map(x => ({
                                        requirement : x.requirement,
                                        requirements : this.dropdownOptions.requirmentdef.find(y => y.dropdownID == x.requirement).description,
                                        dueDate : x.dueDate,
                                        e201RequirementId : x.e201RequirementId,
                                        e201Requirement : x.e201Requirement,
                                        id : x.id
                                    }))
                                    this.disableOptions = this.dataSource.map(x => x.requirement)
                                }
                            }
                        })
                    }
                }

            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {

            }
        });
    }

}

