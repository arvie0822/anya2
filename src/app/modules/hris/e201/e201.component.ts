import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { translate, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { e201CompanyAsset, e201EmployeeLearning, e201EmployeeRecord, e201EmployeeRequest, e201IncidentReportMemo, e201NewHire, e201WorkEducationHistory, educationlAttainment, payroll2316, workHistory } from 'app/model/hris/e201';
import { FailedMessage, SaveMessage, setTranslocoService, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import { SharedModule } from 'app/shared/shared.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable, Subject, catchError, combineLatest, finalize, forkJoin, of, switchMap, takeUntil, throwError } from 'rxjs';
import { NewHireRequirmentsComponent } from './new-hire-requirments/new-hire-requirments.component';
import { CompanyAssetsComponent } from './company-assets/company-assets.component';
import { EmployeeMovementComponent } from './employee-movement/employee-movement.component';
import { EmployeeRecordsComponent } from './employee-records/employee-records.component';
import { IncidentReportMemoComponent } from './incident-report-memo/incident-report-memo.component';
import { LearningsComponent } from './learnings/learnings.component';
import { PreviousEmployerComponent } from './previous-employer/previous-employer.component';
import { PreviousListComponent } from './previous-list/previous-list.component';
import { WorkEducationalHistoryComponent } from './work-educational-history/work-educational-history.component';

@Component({
    selector: 'app-e201',
    templateUrl: './e201.component.html',
    styleUrls: ['./e201.component.css'],
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
        TranslocoModule,
        MatMenuModule,
        CompanyAssetsComponent,
        EmployeeMovementComponent,
        EmployeeRecordsComponent,
        IncidentReportMemoComponent,
        LearningsComponent,
        NewHireRequirmentsComponent,
        PreviousEmployerComponent,
        PreviousListComponent,
        WorkEducationalHistoryComponent
    ]
})
export class E201Component implements OnInit {
    id = ""
    ids = 0
    hide
    newhiregroup: FormGroup
    employeerecord: FormGroup
    learning: FormGroup
    companyasset: FormGroup
    incedent: FormGroup
    workeducationgroup: FormGroup
    e201DataRequestform: FormGroup
    isSave: boolean = false
    shownewhire: boolean = false
    loginId = 0
    pipe = new DatePipe('en-US');

    globalImage: any = []
    // new requirments
    newhiredata: any = []
    isactive: boolean = false
    newid = 0
    newhireimagefile: any

    //  work & educational history ================
    allworktable: any = []

    //  employee record ================
    allemployeetable: any = []

    // learnings =============
    allLearningtable: any = []

    // company asset
    companyassettable: any = []

    // incendent report
    demomemotable: any = []

    // 2316
    previousform: FormGroup
    _2316Id: any = []

    DisplayName: string = ''
    saveMessage = { ...SaveMessage }
    successMessage = { ...SuccessMessage }
    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private coreService: CoreService,
        private fb: FormBuilder,
        private message: FuseConfirmationService,
        private router: Router,
        private translocoService : TranslocoService
    ) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        var empid = [this.id]
        this.coreService.encrypt_decrypt(false, empid)
            .subscribe({
                next: (value: any) => {
                    this.loginId = Number(value.payload[0])
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                }
            });



        this.newhiregroup = this.fb.group(new e201NewHire());
        this.workeducationgroup = this.fb.group(new e201WorkEducationHistory());
        this.e201DataRequestform = this.fb.group(new e201EmployeeRequest());
        this.employeerecord = this.fb.group(new e201EmployeeRecord());
        this.learning = this.fb.group(new e201EmployeeLearning());
        this.companyasset = this.fb.group(new e201CompanyAsset());
        this.incedent = this.fb.group(new e201IncidentReportMemo());
        this.previousform = this.fb.group(new payroll2316());

        this.id = this.route.snapshot.paramMap.get('id');
        var action = sessionStorage.getItem("action")


        setTimeout(() => {
            this.shownewhire = true
        }, 1000);
    }

    submit() {
        //new hire requirments

        this.newhiredata.forEach(date => {
            this.pipe.transform(date.dateExpiration, 'yyyy-MM-dd HH:mm')
            this.pipe.transform(date.dateIssued, 'yyyy-MM-dd HH:mm')
            this.pipe.transform(date.dateSubmitted, 'yyyy-MM-dd HH:mm')
        });
        this.newhiregroup.get('e201NewHireDetail').setValue(this.newhiredata)
        this.newhiregroup.get('employeeId').setValue(this.loginId)
        this.newhiregroup.get('id').setValue(this.newid)
        this.newhiregroup.get('isActive').setValue(this.isactive)



        //work education
        this.workeducationgroup.get('workHistory').setValue(this.allworktable[0]?.data.filter(x => x.name == 'work'))
        this.workeducationgroup.get('educationalAttainment').setValue(this.allworktable[0]?.data.filter(x => x.name == 'education'))
        this.workeducationgroup.get('characterReference').setValue(this.allworktable[0]?.data.filter(x => x.name == 'charref'))
        this.workeducationgroup.get('employeeId').setValue(this.loginId)
        this.workeducationgroup.get('id').setValue(this.allworktable[0]?.dataId)
        // this.allworktable[0].imagefile[0].files



        // employee record
        this.employeerecord.get('perfomanceMangement').setValue(this.allemployeetable[0]?.data.filter(x => x.name == 'performance'))
        this.employeerecord.get('medicalRecord').setValue(this.allemployeetable[0]?.data.filter(x => x.name == 'medical'))
        this.employeerecord.get('familyRelationship').setValue(this.allemployeetable[0]?.data.filter(x => x.name == 'family'))
        this.employeerecord.get('visa').setValue(this.allemployeetable[0]?.data.filter(x => x.name == 'visa'))
        this.employeerecord.get('employeeId').setValue(this.loginId)
        this.employeerecord.get('id').setValue(this.allemployeetable[0]?.dataId)

        // learnings
        this.learning.get('skills').setValue(this.allLearningtable[0]?.data.filter(x => x.name == 'skills'))
        this.learning.get('licenses').setValue(this.allLearningtable[0]?.data.filter(x => x.name == 'licenses'))
        this.learning.get('awardsAndRecognitation').setValue(this.allLearningtable[0]?.data.filter(x => x.name == 'award'))
        this.learning.get('trainingAndSeminar').setValue(this.allLearningtable[0]?.data.filter(x => x.name == 'training'))
        this.learning.get('exam').setValue(this.allLearningtable[0]?.data.filter(x => x.name == 'exam'))
        this.learning.get('employeeId').setValue(this.loginId)
        this.learning.get('id').setValue(this.allLearningtable[0]?.dataId)
        this.learning.get('createdBy').setValue(this.allLearningtable[0]?.create)

        // company asset
        this.companyasset.get('companyAssetsDetail').setValue(this.companyassettable[0]?.data.filter(x => x.name == 'asset'))
        this.companyasset.get('employeeId').setValue(this.loginId)
        this.companyasset.get('id').setValue(this.companyassettable[0]?.dataId)

        // incident report
        this.incedent.get('incidentReport').setValue(this.demomemotable[0]?.data.filter(x => x.name == 'demo'))
        this.incedent.get('memo').setValue(this.demomemotable[0]?.data.filter(x => x.name == 'memo'))
        this.incedent.get('employeeId').setValue(this.loginId)
        this.incedent.get('id').setValue(this.demomemotable[0]?.dataId)

        this.previousform.get('employeeId').setValue(this.previousform.value.employeeId)
        this.previousform.get('fromDate').setValue(this.pipe.transform(this.previousform.value.fromDate, 'yyyy-MM-ddTHH:mm'))
        this.previousform.get('toDate').setValue(this.pipe.transform(this.previousform.value.toDate, 'yyyy-MM-ddTHH:mm'))

        // ============================== for saving ===================================
        this.e201DataRequestform.get('employeeId').setValue(this.loginId)
        this.e201DataRequestform.get('e201NewHire').setValue(this.newhiregroup.value)
        this.e201DataRequestform.get('e201WorkEducationHistory').setValue(this.workeducationgroup?.value)
        this.e201DataRequestform.get('e201EmployeeRecord').setValue(this.employeerecord?.value)
        this.e201DataRequestform.get('e201EmployeeLearning').setValue(this.learning?.value)
        this.e201DataRequestform.get('e201CompanyAsset').setValue(this.companyasset?.value)
        this.e201DataRequestform.get('e201IncidentReportMemo').setValue(this.incedent?.value)

        this.e201DataRequestform.get('payroll2316').setValue(GF.IsEmpty(this.previousform.value.employeeId) ? {} : this.previousform.value)

        this.e201DataRequestform.value

        // SaveMessage.message = translate(SaveMessage.message)
        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.isSave = true
                this.isSave = true
                this.userService.postE201EmployeeData(this.e201DataRequestform.value).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            // this.successMessage.message = translate(this.successMessage.message)
                            // this.message.open(this.successMessage);
                            // this.router.navigate(['/search/e201']);
                            this.isSave = false

                            var imageList = [ // for filtering of file to be uploaded
                                ...this.newhiredata.filter(x => !GF.IsEmpty(x.files)).map(z=>z.files),
                                ...this.allworktable[0].data.filter(x => !GF.IsEmpty(x.files)).map(v=>v?.files),
                                ...this.allemployeetable[0].data.filter(x => !GF.IsEmpty(x.files)).map(v=>v?.files),
                                ...this.allLearningtable[0].data.filter(x => !GF.IsEmpty(x.files)).map(v=>v?.files),
                                ...this.companyassettable[0].data.filter(x => !GF.IsEmpty(x.files)).map(v=>v?.files),
                                ...this.demomemotable[0].data.filter(x => !GF.IsEmpty(x.files)).map(v=>v?.files),

                            ]
                            var file = imageList.map(z => ({files: z, isupload: true})) // mapping of file to be uploaded

                            // Get all rowIds where file is undefined
                            const newhire = value.payload.find(n => n.jsonBName === "E201NewHireDetail"); // For New Hire
                            const work = value.payload?.find(n => n.jsonBName === "WorkHistory"); // For Work Education
                            const employeeprefor = value.payload?.find(n => n.jsonBName === "PerformanceManagement"); // For Employee Record
                            const employeemed = value.payload?.find(n => n.jsonBName === "MedicalRecord"); // For Employee Record
                            const learninglicense = value.payload?.find(n => n.jsonBName === "EmployeeLearningLicense"); // For Learning
                            const learningaward = value.payload?.find(n => n.jsonBName === "EmployeeLearningAwardsRecognitation"); // For Learning
                            const learningseminar = value.payload?.find(n => n.jsonBName === "EmployeeLearningTrainingAndSeminar"); // For Learning
                            const learningexam = value.payload?.find(n => n.jsonBName === "EmployeeLearningExam"); // For Learning

                            // Get all rowIds where file is undefined
                            const newhirerowId = this.newhiredata.filter(item => GF.IsEmpty(item.files) && item.rowId).map(item => item.rowId);
                            const allworktablerowId = this.allworktable[0].data.filter(item => item.name == 'work' && !GF.IsEmpty(item.files) && item.rowId).map(item => item.rowId);
                            const employeepreforrowId = this.allemployeetable[0].data.filter(item => item.name == "performance" && !GF.IsEmpty(item.files) && item.rowId).map(item => item.rowId);
                            const employeemedrowId = this.allemployeetable[0].data.filter(item => item.name == "medical" && !GF.IsEmpty(item.files) && item.rowId).map(item => item.rowId);
                            const licensesrowId = this.allLearningtable[0].data.filter(item => item.name == "licenses" && !GF.IsEmpty(item.files) && item.rowId).map(item => item.rowId);
                            const awardsrowId = this.allLearningtable[0].data.filter(item => item.name == "award" && !GF.IsEmpty(item.files) && item.rowId).map(item => item.rowId);
                            const trainingrowId = this.allLearningtable[0].data.filter(item => item.name == "training" && !GF.IsEmpty(item.files) && item.rowId).map(item => item.rowId);
                            const examrowId = this.allLearningtable[0]?.data.filter(item => item.name == "exam" && !GF.IsEmpty(item.files) && item.rowId).map(item => item.rowId);

                            // Remove these rowIds from newhire.rowId
                            newhire.rowId = newhire.rowId.filter(rowId => !newhirerowId.includes(rowId));

                            if(work){
                                work.rowId = work?.rowId.filter(rowId => !allworktablerowId.includes(rowId));
                            }
                            if (employeeprefor) {
                                employeeprefor.rowId = employeeprefor.rowId.filter(rowId => !employeepreforrowId.includes(rowId));
                            }
                            if (employeemed) {
                                employeemed.rowId = employeemed.rowId.filter(rowId => !employeemedrowId.includes(rowId));
                            }
                            if(learninglicense){
                            learninglicense.rowId = learninglicense.rowId.filter(rowId => !licensesrowId.includes(rowId));
                            }
                            if (learningaward) {
                                learningaward.rowId = learningaward?.rowId.filter(rowId => !awardsrowId.includes(rowId));
                            }
                            if (learningseminar) {
                                learningseminar.rowId = learningseminar?.rowId.filter(rowId => !trainingrowId.includes(rowId));
                            }
                            if (learningexam) {
                                learningexam.rowId = learningexam?.rowId.filter(rowId => !examrowId.includes(rowId));
                            }
                            //Final list for RowId
                            var idList = [
                                ...GF.IsEmptyReturn(newhire?.rowId , []),
                                ...GF.IsEmptyReturn(work?.rowId , []),
                                ...GF.IsEmptyReturn(employeeprefor?.rowId , []),
                                ...GF.IsEmptyReturn(employeemed?.rowId , []) ,
                                ...GF.IsEmptyReturn(learninglicense?.rowId , []),
                                ...GF.IsEmptyReturn(learningaward?.rowId , []),
                                ...GF.IsEmptyReturn(learningseminar?.rowId , []),
                                ...GF.IsEmptyReturn(learningexam?.rowId , []),
                            ]

                            idList = idList.filter(x => x != undefined)
                            this.coreService.uploadimage(file,idList, "98", this.loginId)
                            const dialogRefs = this.message.open(this.successMessage);
                            dialogRefs.afterClosed().subscribe((result) => {
                                if (result == "confirmed") {
                                    // this.ngOnInit()
                                    this.router.navigate(['/detail/e201/'+this.id]).then(() => {
                                    window.location.reload();
                                    });
                                }
                            })

                        }
                    }
                })
            }
        });
    }

    show(e) {
        this.hide = e
    }
}

