import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild ,AfterViewInit, Input, ViewEncapsulation} from '@angular/core';
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
import { e201Requirement, employeeVisa, familyRelationship, medicalRecord, performanceManagement } from 'app/model/hris/e201';
import { FailedMessage } from 'app/model/message.constant';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import { SharedModule } from 'app/shared/shared.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { forkJoin } from 'rxjs';




@Component({
    selector: 'app-employee-records',
    templateUrl: './employee-records.component.html',
    styleUrls: ['./employee-records.component.css'],
    providers: [provideNgxMask()],
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
        DropdownComponent,
        NgxMaskDirective,
    ]
})
export class EmployeeRecordsComponent implements OnInit {

    displayedColumns: string[] = ['action','year', 'period', 'rating', 'feedback','uploadPath'];
     @Input() dataSource : any = []

    displayedColumns1: string[] = ['action','medicalCenter','medicalExam','dateConducted','resultsFinding','uploadPath']
     @Input() dataSource1: any = []

    displayedColumns2: string[] = ['action','lastName', 'firstName', 'middleName', 'dateOfBirth','relationshipId','occupationId','address','contactNumber'];
     @Input() dataSource2: any = []

    displayedColumns3: string[] = ['action','visaType', 'country', 'visaNumber', 'issuedDate','expiredDate','issuedPlace'];
     @Input() dataSource3: any = []

    @Input() empalltable  : any = []

    // table =========================
    @ViewChild('emprecordtable') emprecordtable: MatTable<any>;
    @ViewChild('medicaltable') medicaltable: MatTable<any>;
    @ViewChild('familytable') familytable: MatTable<any>;
    @ViewChild('visatable') visatable: MatTable<any>;

    // pagination =====================
    @ViewChild('paginator0') paginator0: MatPaginator;
    @ViewChild('paginator1') paginator1: MatPaginator;
    @ViewChild('paginator2') paginator2: MatPaginator;
    @ViewChild('paginator3') paginator3: MatPaginator;

    performanceform : FormGroup
    medicalform : FormGroup
    familyform : FormGroup
    visaform : FormGroup

    dropdownOptions = new DropdownOptions
    dropdownFix = new DropdownRequest
    dropdownRequest = new DropdownRequest
    id: string = ""
    action: string = ""
    ids = 0
    datetoday : any
    failedMessage = {...FailedMessage}
    rowidsave : 0
    //for dropdown description

    medicalCenters: any = []
    medicalExams: any = []
    relationshipIds: any = []
    occupationIds: any = []
    visaTypes: any = []
    countrys: any = []
    blob: any;
    blobname: any
    editing : boolean = false

    medcenter = [
        { id: 1, description: 'PDH' },
        { id: 2, description: 'PGH' },
        { id: 3, description: 'Makati Med' },
        { id: 4, description: 'Ospar 1' },
        // Add more options as needed
    ];

    medexam = [
        { id: 1, description: 'X-ray' },
        { id: 2, description: 'Physical exam' },
        { id: 3, description: 'Urine test'},
        { id: 4, description: 'blood test'},
        // Add more options as needed
    ];

    relation = [
        { id: 1, description: 'Father' },
        { id: 2, description: 'Mother' },
        { id: 3, description: 'Brother' },
        { id: 4, description: 'Sister' },
        // Add more options as needed
    ];

    occupation = [
        { id: 1, description: 'Developer' },
        { id: 2, description: 'Accounting' },
        { id: 3, description: 'Sales' },
        { id: 4, description: 'marketing' },
        // Add more options as needed
    ];

    visa = [
        { id: 1, description: 'Tourist visa' },
        { id: 2, description: 'Business visa' },
        { id: 3, description: 'Work visa' },
        { id: 4, description: 'Transit visa' },
        // Add more options as needed
    ];

    country = [
        { id: 1, description: 'Philippines' },
        { id: 2, description: 'United State' },
        { id: 3, description: 'Japan' },
        { id: 4, description: 'korea' },
        // Add more options as needed
    ];

    // for image upload

    addimage : any
    imageId : any
    imageIndex : any
    imagefiless : any = []
    imageList: any = []

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator0;
        this.dataSource1.paginator = this.paginator1;
        this.dataSource2.paginator = this.paginator2;
        this.dataSource3.paginator = this.paginator3;
    }

    constructor(
        private fb: FormBuilder,
        private masterService : MasterService ,
        private tenantService : TenantService,
        private userService : UserService,
        private route: ActivatedRoute,
        private message: FuseConfirmationService,
    ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.datetoday = new Date()

    this.performanceform = this.fb.group(new performanceManagement());
    this.medicalform = this.fb.group(new medicalRecord());
    this.familyform = this.fb.group(new familyRelationship());
    this.visaform = this.fb.group(new employeeVisa());

    this.dropdownFix.id.push(

        { dropdownID: 0, dropdownTypeID: 116 },
        { dropdownID: 0, dropdownTypeID: 3 },
    )
    this.dropdownRequest.id.push(
        { dropdownID: 0, dropdownTypeID: 37 },
        { dropdownID: 0, dropdownTypeID: 156 },
        { dropdownID: 0, dropdownTypeID: 157 },
        { dropdownID: 0, dropdownTypeID: 158 },
    )

    this.initData()
    // this.dataSource2.paginator = this.paginator;

  }


    deledit(a, i, e) {
        this.rowidsave = e.rowId
        this.imageIndex = i
        switch (a) {
            // performance ===================
            case "deleteperformance":
                var indexToRemove = this.findIndexByNameAndOccurrence('performance', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.emprecordtable[i].data = this.dataSource
                this.emprecordtable.renderRows();
                break;

            case "editperformance":
                this.editing = true
                const fileInputElement = document.getElementById(this.imageId) as HTMLInputElement;
                if (fileInputElement) {
                    if(this.editing){
                        fileInputElement.value = e.uploadPath; // Clear the value of the file input
                    } else {
                        var fileContent = "file Content here"
                        this.createBlobFileName(fileContent,this.imageList[i].imageFor.name,"image/jpeg")
                        this.createFileWithFilename(this.blob,e.uploadPath)
                        fileInputElement.value = this.blobname.name
                        /////for edit display on upload field
                    }
                }

                // var indexToRemove = this.findIndexByNameAndOccurrence('performance', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }

                this.performanceform.get('year').setValue(e.year)
                this.performanceform.get('period').setValue(e.period)
                this.performanceform.get('rating').setValue(e.rating)
                this.performanceform.get('feedback').setValue(e.feedback)
                this.performanceform.value.uploadPath = e.uploadPath
                this.performanceform.get('uploadPath').setValue(e.uploadPath)
                // this.performanceform.get('uploadPath').setValue(e.uploadPath)



                this.emprecordtable.renderRows();
                break;
            // medical ============================
            case "deletemedical":
                var indexToRemove = this.findIndexByNameAndOccurrence('medical', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.medicaltable[i].data = this.dataSource
                this.medicaltable.renderRows();
                break;

            case "editmedical":
                this.editing = true
                var fileInputElementMed = document.getElementById(this.imageId) as HTMLInputElement;
                if (fileInputElementMed) {
                    if(this.editing){
                        fileInputElementMed.value = e.uploadPath; // Clear the value of the file input
                    } else {
                        var fileContent = "file Content here"
                        this.createBlobFileName(fileContent,this.addimage.name,"image/jpeg")
                        this.createFileWithFilename(this.blob,e.uploadPath)
                        fileInputElementMed.value = this.blobname.name
                        /////for edit display on upload field
                    }
                }
                // var indexToRemove = this.findIndexByNameAndOccurrence('medical', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }

                this.medicalform.get('medicalCenter').setValue(e.medicalCenter)
                this.medicalform.get('medicalExam').setValue(e.medicalExam)
                this.medicalform.get('dateConducted').setValue(e.dateConducted)
                this.medicalform.get('resultsFinding').setValue(e.resultsFinding)
                this.medicalform.value.uploadPath = e.uploadPath
                this.medicalform.get('uploadPath').setValue(e.uploadPath)

                // this.medicalform.get('uploadPath').setValue(e.uploadPath)


                this.medicaltable.renderRows();
                break;
            // relationship =========================
            case "deletefamily":
                var indexToRemove = this.findIndexByNameAndOccurrence('family', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.familytable[i].data = this.dataSource

                this.familytable.renderRows();
                break;

            case "editfamily":
                this.editing = true
                this.familyform.get('lastName').setValue(e.lastName)
                this.familyform.get('middleName').setValue(e.middleName)
                this.familyform.get('firstName').setValue(e.firstName)
                this.familyform.get('dateOfBirth').setValue(e.dateOfBirth)
                this.familyform.get('relationshipId').setValue(e.relationshipId)
                this.familyform.get('occupationId').setValue(e.occupationId)
                this.familyform.get('address').setValue(e.address)
                this.familyform.get('contactNumber').setValue(e.contactNumber.substring(3))

                // var indexToRemove = this.findIndexByNameAndOccurrence('family', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }
                this.familytable.renderRows();
                break;
            // visa ================================
            case "deletevisa":
                var indexToRemove = this.findIndexByNameAndOccurrence('visa', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.visatable[i].data = this.dataSource

                this.visatable.renderRows();
                break;

            case "editvisa":
                this.editing = true
                this.visaform.get('visaType').setValue(e.visaType)
                this.visaform.get('country').setValue(e.country)
                this.visaform.get('visaNumber').setValue(e.visaNumber)
                this.visaform.get('issuedDate').setValue(e.issuedDate)
                this.visaform.get('expiredDate').setValue(e.expiredDate)
                this.visaform.get('issuedPlace').setValue(e.issuedPlace)

                // var indexToRemove = this.findIndexByNameAndOccurrence('visa', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }
                this.visatable.renderRows();
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

      clickadd(a, name, upId) {
        let fields = [];
        this.dataSource
        switch (name) {
            case 'performance':
                fields = [
                    { key: 'year', label: 'Year' },
                    { key: 'period', label: 'Period' },
                    { key: 'rating', label: 'Rating' },
                    { key: 'feedback', label: 'Feedback' },
                    { key: 'uploadPath', label: 'Upload' },
                ];
                break;
            case 'medical':
                fields = [
                    { key: 'medicalCenter', label: 'Medical Center' },
                    { key: 'medicalExam', label: 'Medical Exam' },
                    { key: 'dateConducted', label: 'Date Conducted', checkEmpty: true },
                    { key: 'resultsFinding', label: 'Results Finding' },
                    { key: 'uploadPath', label: 'Upload' },
                ];
                break;
            case 'family':
                fields = [
                    { key: 'lastName', label: 'Last Name' },
                    { key: 'firstName', label: 'First Name' },
                    { key: 'middleName', label: 'Middle Name' },
                    { key: 'relationshipId', label: 'Relationship' },
                    { key: 'occupationId', label: 'Occupation' },
                    { key: 'address', label: 'Address' },
                    { key: 'contactNumber', label: 'Contact Number' },
                    { key: 'dateOfBirth', label: 'Birth Date', checkEmpty: true }
                ];
                break;
            case 'visa':
                fields = [
                    { key: 'visaType', label: 'Visa Type' },
                    { key: 'country', label: 'Country' },
                    { key: 'visaNumber', label: 'Visa Number' },
                    { key: 'issuedDate', label: 'Issued Date', checkEmpty: true },
                    { key: 'expiredDate', label: 'Expired Date', checkEmpty: true },
                    { key: 'issuedPlace', label: 'Issued Place' }
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

  adddata(a,name,upId){

    var emprecord = this[a].value
    if(this.editing){

        var indexToRemove = this.findIndexByNameAndOccurrence(name, this.imageIndex);

        if (indexToRemove !== -1) {
            this.dataSource.splice(indexToRemove, 1);
        }

        // this.dataSource.splice(this.imageIndex, 1)
        this.dataSource.unshift({
        ...emprecord ,
        // Performance =========================
        rowId : this.rowidsave,
        name : name,
        action : null,
        uploadPath :this[a].value.uploadPath?.replace("C:\\fakepath\\",''), /// to display file name in upload field from edit

        // medical ====================
        medicalCenterDescription : GF.IsEmptyReturn(this.medicalCenters[0]?.description, "") ,
        medicalExamDescription : GF.IsEmptyReturn(this.medicalExams[0]?.description, "") ,
        files : !GF.IsEmpty(name) ? this.addimage : null,
        // Family =====================
        relationshipDescription : GF.IsEmptyReturn(this.relationshipIds[0]?.description,""),
        occupationDescription : GF.IsEmptyReturn(this.occupationIds[0]?.description,""),
        contactNumber : this[a].value.contactNumber?.startsWith("+63") ? this[a].value.contactNumber : "+63" + this[a].value.contactNumber,

        // visa ===============================
        visaTypeDescription : GF.IsEmptyReturn(this.visaTypes[0]?.description,""),
        countryDescription : GF.IsEmptyReturn(this.countrys[0]?.description,""),
        })

        this.editing = false

    }else{

        this.dataSource.unshift({
            ...emprecord ,
            // Performance =========================
            name : name,
            rowId : 0,
            action : null,
            uploadPath : this[a].value?.uploadPath?.replace("C:\\fakepath\\",''), /// to display file name in table field from create

            // medical ====================
            medicalCenterDescription : GF.IsEmptyReturn(this.medicalCenters[0]?.description, "") ,
            medicalExamDescription : GF.IsEmptyReturn(this.medicalExams[0]?.description, "") ,
            files : !GF.IsEmpty(name) ? this.addimage : null,
            // Family =====================
            relationshipDescription : GF.IsEmptyReturn(this.relationshipIds[0]?.description,""),
            occupationDescription : GF.IsEmptyReturn(this.occupationIds[0]?.description,""),
            contactNumber : this[a].value.contactNumber?.startsWith("+63") ? this[a].value.contactNumber : "+63" + this[a].value.contactNumber,

            // visa ===============================
            visaTypeDescription : GF.IsEmptyReturn(this.visaTypes[0]?.description,""),
            countryDescription : GF.IsEmptyReturn(this.countrys[0]?.description,""),

            // RowId : 0
            // IsActive : true
            // IsDeleted : false
            // ModifiedBy :
            // ModifiedDate : new Date()
        })
    }

    this.emprecordtable.renderRows()
    this.medicaltable.renderRows()
    this.familytable.renderRows()
    this.visatable.renderRows()

    var performance = ['year', 'period', 'rating', 'feedback','uploadPath']
    var medical = ['medicalCenter','medicalExam','dateConducted','resultsFinding','uploadPath']
    var family = ['lastName', 'firstName', 'middleName', 'dateOfBirth','relationshipId','occupationId','address','contactNumber']
    var visa = ['visaType', 'country', 'visaNumber', 'issuedDate','expiredDate','issuedPlace']
    var table = a == 'performanceform' ? performance : a == 'medicalform' ? medical : a == 'familyform' ? family : visa

    if (a !== '') {
        table.forEach(element => {
            if (element == 'uploadPath') {
                const fileInputElement = document.getElementById(upId) as HTMLInputElement;
                if (fileInputElement) {
                    fileInputElement.value = ''; // Clear the value of the file input
                    this[a].get(element).setValue(null)
                }
            }else{
                this[a].get(element).setValue(null)
            }
        });
    }

    if (!this.empalltable.some(item => JSON.stringify(item.data) === JSON.stringify(this.dataSource))) {
        this.empalltable.push({
            data: this.dataSource,
            imagefile : JSON.stringify(this.imagefiless),
            module : "98"
        });
    }

  }

    async uploadFile(event, id, names, tab) {
        let fileName = event.target.files[0].name;
        this.addimage = event.target.files[0]
        this.imageId = id
        const fileInputElement = document.getElementById(id) as HTMLInputElement;
        if (fileInputElement) {
            fileInputElement.value = fileName; // Clear the value of the file input
        }
    }

    createBlobFileName(content,filename,mimeType){
        // Function to create a new Blob object with a specified name
        var blobOptions = {type: mimeType};
        this.blob = new Blob([content],blobOptions)
        // return new Blob([content],blobOptions)
    }

    createFileWithFilename(blob, filename){
        // Function to create a new File object from a Blob with a specified name
        blob.lastModifiedDate = new Date();
        blob.name = filename
        this.blobname = blob
    }

  initData(){
    forkJoin({
        dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
        dropdown: this.tenantService.getDropdown(this.dropdownRequest),

    }).subscribe({
        next: (value: any) => {

            // Fix =============
            this.dropdownOptions.medicalcenter = value.dropdown.payload.filter(x => x.dropdownTypeID === 156)
            this.dropdownOptions.medicalexam = value.dropdown.payload.filter(x => x.dropdownTypeID === 157)
            this.dropdownOptions.visatype = value.dropdown.payload.filter(x => x.dropdownTypeID === 158)

            this.dropdownOptions.relationshipDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 116)
            this.dropdownOptions.countryDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 3)

            // Tenant ===========
            this.dropdownOptions.occupationDef = value.dropdown.payload.filter(x => x.dropdownTypeID === 37)

            if (this.id !== "") {
                this.action = sessionStorage.getItem("action")
                if (this.action == 'edit') {
                    this.userService.getE201EmployeeRecord(this.id).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                value.payload.forEach(data => {
                                    var performance = data.perfomanceMangement.map((item,index) => ({
                                        ...item,
                                        name: "performance",
                                        id: index + 1 ///for identifying the selected item to delete
                                    }))
                                    var medical = data.medicalRecord.map((item,index) => ({
                                        ...item,
                                        name: "medical",
                                        id: index + 1
                                    }))
                                    var family = data.familyRelationship.map((item,index) => ({
                                        ...item,
                                        name: "family",
                                        id: index + 1
                                    }))
                                    var visa = data.visa.map((item,index) => ({
                                        ...item,
                                        name: "visa",
                                        id: index + 1
                                    }))

                                    this.dataSource = [...performance,...medical,...family,...visa]
                                    this.ids = data.id
                                });

                                if (!this.empalltable.some(item => JSON.stringify(item.data) === JSON.stringify(this.dataSource))) {
                                    this.empalltable.push({
                                        data: this.dataSource,
                                        dataId : this.ids
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

dataSourcereturn(name){
    return this.dataSource.filter( x => x.name == name)
}

imageids(id){

    this.imageId = id+''
}

download(id,filename){
    window.open('https://aanyahrv2.obs.ap-southeast-1.myhuaweicloud.com/'+sessionStorage.getItem('se')+'/'+'shared'+'/'+sessionStorage.getItem('moduleId')+'/'+id+'/'+filename)
}

}
