import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { EmployeeLearningExam, EmployeeLearningTrainingAndSeminar, employeeLearningAwardsRecognitation, employeeLearningLicense, employeeLearningSkills } from 'app/model/hris/e201';
import { FailedMessage } from 'app/model/message.constant';
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
    selector: 'app-learnings',
    templateUrl: './learnings.component.html',
    styleUrls: ['./learnings.component.css'],
encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        CommonModule,
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
        TranslocoModule,
        MatMenuModule,
        MatDatepickerModule,
        DropdownComponent
    ]
})
export class LearningsComponent implements OnInit {
    created  : ''
    skills = [
        { id: 1, description: 'First Skill' },
        { id: 2, description: 'Second Skill' },
        { id: 3, description: 'Super Skill' },
        { id: 4, description: 'Passive Skill' },
        // Add more options as needed
    ];

    specialized = [
        { id: 1, description: 'First specialized' },
        { id: 2, description: 'Second specialized' },
        { id: 3, description: 'Super specialized' },
        { id: 4, description: 'Passive specialized' },
        // Add more options as needed
    ];

    lienseType = [
        { id: 1, description: 'Training Seminar' },
        { id: 2, description: 'Technical Seminar' },
        { id: 3, description: 'Product Seminar' },
        { id: 4, description: 'Motivational Seminar' },
        { id: 5, description: 'Webinar' },
        // Add more options as needed
    ];

    awardtitle = [
        { id: 1, description: 'First award' },
        { id: 2, description: 'Second award' },
        { id: 3, description: 'Super award' },
        { id: 4, description: 'Passive award' },
        // Add more options as needed
    ];

    training = [
        { id: 1, description: 'First training' },
        { id: 2, description: 'Second training' },
        { id: 3, description: 'Super training' },
        { id: 4, description: 'Passive training' },
        // Add more options as needed
    ];

    type = [
        { id: 1, description: 'First type' },
        { id: 2, description: 'Second type' },
        { id: 3, description: 'Super type' },
        { id: 4, description: 'Passive type' },
        // Add more options as needed
    ];

    exam = [
        { id: 1, description: 'First exam' },
        { id: 2, description: 'Second exam' },
        { id: 3, description: 'Super exam' },
        { id: 4, description: 'Passive exam' },
        // Add more options as needed
    ];

    displayedColumns: string[] = ['action', 'skillsId', 'specializedId', 'description'];
    @Input() dataSource: any = []

    displayedColumns1: string[] = ['action', 'lienseType', 'licenseNo', 'issueDate', 'expirationDate', 'uploadPath']
    @Input() dataSource1: any = []

    displayedColumns2: string[] = ['action', 'awardTitleId', 'awardDate', 'description', 'uploadPath'];
    @Input() dataSource2: any = []

    displayedColumns3: string[] = ['action', 'trainingSeminarId', 'typeId', 'location', 'dateFrom', 'dateTo', 'conductedBy', 'uploadPath'];
    @Input() dataSource3: any = []

    displayedColumns4: string[] = ['action', 'examId', 'score', 'location', 'dateFrom', 'dateTo', 'conductedBy', 'uploadPath'];
    @Input() dataSource4: any = []

    @ViewChild('paginator0') paginator0: MatPaginator;
    @ViewChild('paginator1') paginator1: MatPaginator;
    @ViewChild('paginator2') paginator2: MatPaginator;
    @ViewChild('paginator3') paginator3: MatPaginator;

    skillsform: FormGroup
    licensesform: FormGroup
    awardform: FormGroup
    traningform: FormGroup
    examform: FormGroup

    id: string = ""
    action: string = ""
    ids = 0
    failedMessage = { ...FailedMessage }

    dropdownOptions = new DropdownOptions
    dropdownFix = new DropdownRequest
    dropdownRequest = new DropdownRequest

    skillsIds: any = []
    specializedIds: any = []
    lienseTypes: any = []
    awardTitleIds: any = []
    trainingSeminarIds: any = []
    typeseminarIds: any = []
    examIds: any = []
    typeIds: any = []
    imagefiless: any = []
    addimage: any
    imageId: any
    blob: any;
    blobname: any
    editing: boolean = false
    imageIndex: any
    rowidsave : 0
    @Input() learningtable: any = []

    @ViewChild('skilltable') skilltable: MatTable<any>;
    @ViewChild('licensetable') licensetable: MatTable<any>;
    @ViewChild('awardtable') awardtable: MatTable<any>;
    @ViewChild('trainingtable') trainingtable: MatTable<any>;
    @ViewChild('examtable') examtable: MatTable<any>;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator0;
        this.dataSource1.paginator = this.paginator1;
        this.dataSource2.paginator = this.paginator2;
        this.dataSource3.paginator = this.paginator3;
    }

    constructor(
        private fb: FormBuilder,
        private masterService: MasterService,
        private tenantService: TenantService,
        private route: ActivatedRoute,
        private userService: UserService,
        private message: FuseConfirmationService,
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');

        this.skillsform = this.fb.group(new employeeLearningSkills());
        this.licensesform = this.fb.group(new employeeLearningLicense());
        this.awardform = this.fb.group(new employeeLearningAwardsRecognitation());
        this.traningform = this.fb.group(new EmployeeLearningTrainingAndSeminar());
        this.examform = this.fb.group(new EmployeeLearningExam());

        this.dropdownRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 159 },
            { dropdownID: 0, dropdownTypeID: 160 },
            { dropdownID: 0, dropdownTypeID: 161 },
            { dropdownID: 0, dropdownTypeID: 162 },
            { dropdownID: 0, dropdownTypeID: 163 },
            { dropdownID: 0, dropdownTypeID: 164 },
            { dropdownID: 0, dropdownTypeID: 181 },
        )

        this.initData()

    }

    uploadFile(event, id) {
        let fileName = event.target.files[0].name;
        this.addimage = event.target.files[0]
        this.imageId = id
        const fileInputElement = document.getElementById(id) as HTMLInputElement;
        if (fileInputElement) {
            fileInputElement.value = fileName; // Clear the value of the file input
        }
    }

    createBlobFileName(content, filename, mimeType) {
        // Function to create a new Blob object with a specified name
        var blobOptions = { type: mimeType };
        this.blob = new Blob([content], blobOptions)
        // return new Blob([content],blobOptions)
    }

    createFileWithFilename(blob, filename) {
        // Function to create a new File object from a Blob with a specified name
        blob.lastModifiedDate = new Date();
        blob.name = filename
        this.blobname = blob
    } ///// pwede mo rin to shortcut sa iisang function as is ko lang kase nagana na yan :'(


    clickadd(a, name, upId) {
        let fields = [];

        switch (name) {
            case 'skills':
                fields = [
                    { key: 'skillsId', label: 'Skills' },
                    { key: 'specializedId', label: 'Specialized' },
                    { key: 'description', label: 'Description' }
                ];
                break;
            case 'licenses':
                fields = [
                    { key: 'licenseType', label: 'License Type' },
                    { key: 'licenseNo', label: 'License Number' },
                    { key: 'issueDate', label: 'Issue Date', checkEmpty: true },
                    { key: 'expirationDate', label: 'Expiration Date', checkEmpty: true },
                    { key: 'uploadPath', label: 'upload' }
                ];
                break;
            case 'award':
                fields = [
                    { key: 'awardTitleId', label: 'Award Title' },
                    { key: 'awardDate', label: 'Award Date', checkEmpty: true },
                    { key: 'description', label: 'Description' },
                    { key: 'uploadPath', label: 'upload' }
                ];
                break;
            case 'training':
                fields = [
                    { key: 'trainingSeminarId', label: 'Training & Seminar' },
                    { key: 'typeId', label: 'Type' },
                    { key: 'location', label: 'Location' },
                    { key: 'dateFrom', label: 'Date From', checkEmpty: true },
                    { key: 'dateTo', label: 'Date To', checkEmpty: true },
                    { key: 'conductedBy', label: 'Conducted By' },
                    { key: 'uploadPath', label: 'upload' }
                ];
                break;
            case 'exam':
                fields = [
                    { key: 'examId', label: 'Exam' },
                    { key: 'score', label: 'Score' },
                    { key: 'location', label: 'Location' },
                    { key: 'dateFrom', label: 'Date From', checkEmpty: true },
                    { key: 'dateTo', label: 'Date To', checkEmpty: true },
                    { key: 'conductedBy', label: 'Conducted By' },
                    { key: 'uploadPath', label: 'upload' }
                ];
                break;
            default:
                return;
        }

        const emptyFields = fields
            .filter(field => field.checkEmpty ? GF.IsEmpty(this[a].value?.[field.key]) : this[a].value?.[field.key] === "" || this[a].value?.[field.key] === 0 || this[a].value?.[field.key] === null)
            .map(field => field.label);

        if (emptyFields.length > 0) {
            this.failedMessage.title = translate("Warning!");
            this.failedMessage.message = `${emptyFields.join(", ")} ${emptyFields.length > 1 ? 'are' : 'is'} empty`;
            this.message.open(this.failedMessage);
        } else {
            this.adddata(a, name, upId);
        }
    }




    adddata(a, name, upId) {

        if (this.editing) {
            // this.dataSource.splice(this.imageIndex, 1)
            var indexToRemove = this.findIndexByNameAndOccurrence(name, this.imageIndex);

            if (indexToRemove !== -1) {
                this.dataSource.splice(indexToRemove, 1);
            }

            this.dataSource.unshift({
                // skills ==================
                name: name,
                rowId : this.rowidsave,
                skillsDescription: GF.IsEmptyReturn(this.skillsIds[0]?.description, ''),
                skillsId: this[a].value.skillsId,
                specializedDescription: GF.IsEmptyReturn(this.specializedIds[0]?.description, ''),
                specializedId: this[a].value.specializedId,
                description: this[a].value.description,

                // license ===================
                lienseTypeDescription: GF.IsEmptyReturn(this.lienseTypes[0]?.description, ''),
                lienseType: this[a].value.lienseType,
                licenseNo: this[a].value.licenseNo,
                issueDate: this[a].value.issueDate,
                expirationDate: this[a].value.expirationDate,
                uploadPath: this[a].value.uploadPath?.replace("C:\\fakepath\\", ''), /// to display file name in upload field from edit
                files : !GF.IsEmpty(name) ? this.addimage : null,
                // award =========================
                awardTitleDescription: GF.IsEmptyReturn(this.awardTitleIds[0]?.description, ''),
                awardTitleId: this[a].value.awardTitleId,
                awardDate: this[a].value.awardDate,

                // training =======================
                trainingSeminarDescription: GF.IsEmptyReturn(this.trainingSeminarIds[0]?.description, ''),
                trainingSeminarId: this[a].value.trainingSeminarId,
                typeDescription: GF.IsEmptyReturn(this.typeseminarIds[0]?.description, ''),
                typeId: this[a].value.typeId,
                location: this[a].value.location,
                dateFrom: this[a].value.dateFrom,
                dateTo: this[a].value.dateTo,
                conductedBy: this[a].value.conductedBy,

                // exam =========================
                examDescription: GF.IsEmpty(this[a].value?.examId) ? "" : this.dropdownOptions.examdef.find(x => x.dropdownID == this[a].value.examId).description,
                examId: this[a].value.examId,
                score: this[a].value.score,

            })
        } else {
            this.dataSource.unshift({
                // skills ==================
                name: name,
                rowId : 0,
                skillsDescription: GF.IsEmptyReturn(this.skillsIds[0]?.description, ''),
                skillsId: this[a].value.skillsId,
                specializedDescription: GF.IsEmptyReturn(this.specializedIds[0]?.description, ''),
                specializedId: this[a].value.specializedId,
                description: this[a].value.description,

                // license ===================
                lienseTypeDescription: GF.IsEmptyReturn(this.lienseTypes[0]?.description, ''),
                lienseType: this[a].value.lienseType,
                licenseNo: this[a].value.licenseNo,
                issueDate: this[a].value.issueDate,
                expirationDate: this[a].value.expirationDate,
                uploadPath: this[a].value?.uploadPath?.replace("C:\\fakepath\\", ''), /// to display file name in table field from create

                // award =========================
                awardTitleDescription: GF.IsEmptyReturn(this.awardTitleIds[0]?.description, ''),
                awardTitleId: this[a].value.awardTitleId,
                awardDate: this[a].value.awardDate,
                files : !GF.IsEmpty(name) ? this.addimage : null,
                // training =======================
                trainingSeminarDescription: GF.IsEmptyReturn(this.trainingSeminarIds[0]?.description, ''),
                trainingSeminarId: this[a].value.trainingSeminarId,
                typeDescription: GF.IsEmptyReturn(this.typeseminarIds[0]?.description, ''),
                typeId: this[a].value.typeId,
                location: this[a].value.location,
                dateFrom: this[a].value.dateFrom,
                dateTo: this[a].value.dateTo,
                conductedBy: this[a].value.conductedBy,

                // exam =========================
                examDescription: GF.IsEmpty(this[a].value?.examId) ? "" : this.dropdownOptions.examdef.find(x => x.dropdownID == this[a].value.examId).description,
                examId: this[a].value.examId,
                score: this[a].value.score,

            })
        }


        this.skilltable.renderRows()
        this.licensetable.renderRows()
        this.awardtable.renderRows()
        this.trainingtable.renderRows()
        this.examtable.renderRows()

        var skill = ['skillsId', 'specializedId', 'description']
        var license = ['lienseType', 'licenseNo', 'issueDate', 'expirationDate', 'uploadPath']
        var award = ['awardTitleId', 'awardDate', 'description', 'uploadPath']
        var training = ['trainingSeminarId', 'typeId', 'location', 'dateFrom', 'dateTo', 'conductedBy', 'uploadPath']
        var exam = ['examId', 'score', 'location', 'dateFrom', 'dateTo', 'conductedBy', 'uploadPath']
        var table = a == 'skillsform' ? skill : a == 'licensesform' ? license : a == 'awardform' ? award : a == 'traningform' ? training : exam

        if (a !== '') {
            table.forEach(element => {
                if (element == 'uploadPath') {
                    const fileInputElement = document.getElementById(upId) as HTMLInputElement;
                    if (fileInputElement) {
                        fileInputElement.value = ''; // Clear the value of the file input
                    }
                } else {
                    this[a].get(element).setValue(null)
                }
            });
        }

        if (!this.learningtable.some(item => JSON.stringify(item.data) === JSON.stringify(this.dataSource))) {
            this.learningtable.push({
                data: this.dataSource,
                imagefile: JSON.stringify(this.imagefiless),
                module: "98"
            });
        }
        this.editing = false
    }

    deledit(a, e, i) {
        this.rowidsave = e.rowId
        this.imageIndex = i
        switch (a) {
            case "delskills":
                var indexToRemove = this.findIndexByNameAndOccurrence('skills', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.skilltable[i].data = this.dataSource
                this.skilltable.renderRows()
                break;

            case "editskills":
                this.editing = true
                this.skillsform.get('skillsId').setValue(e.skillsId)
                this.skillsform.get('specializedId').setValue(e.specializedId)
                this.skillsform.get('description').setValue(e.description)

                // var indexToRemove = this.findIndexByNameAndOccurrence('skills', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }

                this.skilltable.renderRows()
                break;

            // =============================================

            case "dellicenses":
                this.dataSource = this.dataSource.filter(item => !(item.name === "licenses" && item.id === e.id))
                var indexToRemove = this.findIndexByNameAndOccurrence('licenses', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.learningtable[i].data = this.dataSource
                this.licensetable.renderRows()
                break;

            case "editlicenses":

                this.editing = true
                const fileInputElementlicense = document.getElementById(this.imageId) as HTMLInputElement;
                if (fileInputElementlicense) {
                    if (this.editing) { ///added this function for assigning of file name to table and uploadfield
                        fileInputElementlicense.value = e.uploadPath; // Clear the value of the file input
                    } else {
                        var fileContent = "file Content here"
                        this.createBlobFileName(fileContent, this.addimage.name, "image/jpeg")
                        this.createFileWithFilename(this.blob, e.uploadPath)
                        fileInputElementlicense.value = this.blobname.name
                        /////for edit display on upload field
                    }
                }

                // var indexToRemove = this.findIndexByNameAndOccurrence('licenses', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }

                this.licensesform.get('lienseType').setValue(e.lienseType)
                this.licensesform.get('licenseNo').setValue(e.licenseNo)
                this.licensesform.get('issueDate').setValue(e.issueDate)
                this.licensesform.get('expirationDate').setValue(e.expirationDate)
                this.licensesform.get('uploadPath').setValue(e.uploadPath)
                // this.licensesform.value.uploadPath = e.uploadPath
                // this.licensesform.get('uploadPath').setValue(e.uploadPath)


                this.licensetable.renderRows()
                break;

            // =============================================

            case "delAwards":
                var indexToRemove = this.findIndexByNameAndOccurrence('award', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.awardtable[i].data = this.dataSource
                this.awardtable.renderRows()
                break;

            case "editAwards":
                this.editing = true
                const fileInputElementAwards = document.getElementById(this.imageId) as HTMLInputElement;
                if (fileInputElementAwards) {
                    if (this.editing) {
                        fileInputElementAwards.value = e.uploadPath; // Clear the value of the file input
                    } else {
                        var fileContent = "file Content here"
                        this.createBlobFileName(fileContent, this.addimage.name, "image/jpeg")
                        this.createFileWithFilename(this.blob, e.uploadPath)
                        fileInputElementAwards.value = this.blobname.name
                        /////for edit display on upload field
                    }
                }
                this.editing = true
                this.awardform.get('awardTitleId').setValue(e.awardTitleId)
                this.awardform.get('awardDate').setValue(e.awardDate)
                this.awardform.get('description').setValue(e.description)
                this.awardform.value.uploadPath = e.uploadPath
                this.awardform.get('uploadPath').setValue(e.uploadPath)

                // var indexToRemove = this.findIndexByNameAndOccurrence('award', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }
                this.awardtable.renderRows()
                break;

            // =============================================

            case "delTraining":
                var indexToRemove = this.findIndexByNameAndOccurrence('training', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.trainingtable[i].data = this.dataSource
                this.trainingtable.renderRows()
                break;

            case "editTraining":
                this.editing = true
                const fileInputElementTraining = document.getElementById(this.imageId) as HTMLInputElement;
                if (fileInputElementTraining) {
                    if (this.editing) {
                        fileInputElementTraining.value = e.uploadPath; // Clear the value of the file input
                    } else {
                        var fileContent = "file Content here"
                        this.createBlobFileName(fileContent, this.addimage.name, "image/jpeg")
                        this.createFileWithFilename(this.blob, e.uploadPath)
                        fileInputElementTraining.value = this.blobname.name
                        /////for edit display on upload field
                    }
                }

                this.traningform.get('trainingSeminarId').setValue(e.trainingSeminarId)
                this.traningform.get('typeId').setValue(e.typeId)
                this.traningform.get('location').setValue(e.location)
                this.traningform.get('dateFrom').setValue(e.dateFrom)
                this.traningform.get('dateTo').setValue(e.dateTo)
                this.traningform.get('conductedBy').setValue(e.conductedBy)
                this.traningform.value.uploadPath = e.uploadPath
                this.traningform.get('uploadPath').setValue(e.uploadPath)

                // var indexToRemove = this.findIndexByNameAndOccurrence('training', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }

                this.trainingtable.renderRows()
                break;

            // =============================================

            case "delExam":
                var indexToRemove = this.findIndexByNameAndOccurrence('exam', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.examtable[i].data = this.dataSource
                this.examtable.renderRows()
                break;

            case "editExam":
                this.editing = true
                const fileInputElement = document.getElementById(this.imageId) as HTMLInputElement;
                if (fileInputElement) {
                    if (this.editing) {
                        fileInputElement.value = e.uploadPath; // Clear the value of the file input
                    } else {
                        var fileContent = "file Content here"
                        this.createBlobFileName(fileContent, this.addimage.name, "image/jpeg")
                        this.createFileWithFilename(this.blob, e.uploadPath)
                        fileInputElement.value = this.blobname.name
                        /////for edit display on upload field
                    }
                }

                // var indexToRemove = this.findIndexByNameAndOccurrence('exam', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }

                this.examform.get('examId').setValue(e.examId)
                this.examform.get('score').setValue(e.score)
                this.examform.get('location').setValue(e.location)
                this.examform.get('dateFrom').setValue(e.dateFrom)
                this.examform.get('dateTo').setValue(e.dateTo)
                this.examform.get('conductedBy').setValue(e.conductedBy)
                this.examform.value.uploadPath = e.uploadPath
                this.examform.get('uploadPath').setValue(e.uploadPath)


                this.examtable.renderRows()

                break;

        }
    }

    findIndexByNameAndOccurrence(name, occurrence) {
        var count = 0;
        for (var i = 0; i < this.dataSource.length; i++) {
            if (this.dataSource[i].name === name) {
                if (count === occurrence) {
                    return i;
                }
                count++;
            }
        }
        return -1; // Return -1 if the occurrence is not found
    }


    initData() {
        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),

        }).subscribe({
            next: (value: any) => {
                // Fix ===========
                this.dropdownOptions.skillsdef = value.dropdown.payload.filter(x => x.dropdownTypeID === 159)
                this.dropdownOptions.Specializedef = value.dropdown.payload.filter(x => x.dropdownTypeID === 160)
                this.dropdownOptions.Licensedef = value.dropdown.payload.filter(x => x.dropdownTypeID === 161)
                this.dropdownOptions.awarddef = value.dropdown.payload.filter(x => x.dropdownTypeID === 162)
                this.dropdownOptions.trainingdef = value.dropdown.payload.filter(x => x.dropdownTypeID === 163)
                this.dropdownOptions.seminardef = value.dropdown.payload.filter(x => x.dropdownTypeID === 181)
                this.dropdownOptions.examdef = value.dropdown.payload.filter(x => x.dropdownTypeID === 164)

                // Tenant ===========
                // this.dropdownOptions.occupationDef = value.dropdown.payload.filter(x => x.dropdownTypeID === 37)

                if (this.id !== "") {
                    this.action = sessionStorage.getItem("action")
                    if (this.action == 'edit') {
                        this.userService.getE201EmployeeLearning(this.id).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    value.payload.forEach(data => {
                                        var skills = data.skills.map((item, index) => ({
                                            ...item,
                                            name: "skills",
                                            id: index + 1 ///for identifying the selected item to delete
                                        }))
                                        var licenses = data.licenses.map((item, index) => ({
                                            ...item,
                                            name: "licenses",
                                            id: index + 1
                                        }))
                                        var award = data.awardsAndRecognitation.map((item, index) => ({
                                            ...item,
                                            name: "award",
                                            id: index + 1
                                        }))
                                        var training = data.trainingAndSeminar.map((item, index) => ({
                                            ...item,
                                            name: "training",
                                            id: index + 1
                                        }))
                                        var exam = data.exam.map((item, index) => ({
                                            ...item,
                                            name: "exam",
                                            id: index + 1
                                        }))

                                        this.dataSource = [...skills, ...licenses, ...award, ...training, ...exam]
                                        this.ids = data.id
                                        this.created = data.createdBy

                                    });

                                    if (!this.learningtable.some(item => JSON.stringify(item.data) === JSON.stringify(this.dataSource))) {
                                        this.learningtable.push({
                                            data: this.dataSource,
                                            imagefile: this.imagefiless,
                                            module: "98",
                                            dataId: this.ids,
                                            create : this.created
                                        });
                                    }

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

    dataSourcereturn(name) {
        return this.dataSource.filter(x => x.name == name)
    }

    imageids(id) {
        this.imageId = id + ''
    }

    download(id,filename){
        window.open('https://aanyahrv2.obs.ap-southeast-1.myhuaweicloud.com/'+sessionStorage.getItem('se')+'/'+'shared'+'/'+sessionStorage.getItem('moduleId')+'/'+id+'/'+filename)
    }

}


