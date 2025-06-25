import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, makeStateKey, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { myData } from 'app/model/app.moduleId';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { characterReference, e201WorkEducationHistory, educationlAttainment, workHistory} from 'app/model/hris/e201';
import { FailedMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import _, { create } from 'lodash';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { forkJoin } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { files } from 'jszip';




@Component({
    selector: 'app-work-educational-history',
    templateUrl: './work-educational-history.component.html',
    styleUrls: ['./work-educational-history.component.css'],
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
export class WorkEducationalHistoryComponent implements OnInit {
    @ViewChild('workhistorytable') workhistorytable: MatTable<any>;
    @ViewChild('educational') educational: MatTable<any>;
    @ViewChild('characterref') characterref: MatTable<any>;

    displayedColumns: string[] = ['action','companyName', 'address', 'industryId', 'occupationId','jobDecsription','fromDate','toDate','leavingReason','uploadPath',];
    @Input() dataSource : any = []


    displayedColumns1: string[] = ['action','level', 'schoolName', 'branch', 'degree','address','fromDate','toDate','graduatedYear','contactNumber','emailAddress'];
    @Input() dataSource1 : any = []


    displayedColumns2: string[] = ['action','fullName', 'relationshipId', 'company', 'address','occupationId','contactNumber','emailAddress',];
    @Input() dataSource2  : any = []

    @Input() alltable  : any = []
    @Input() imagesource  : any = []

    ids = 0


    @ViewChild('paginator0') paginator0: MatPaginator;
    @ViewChild('paginator1') paginator1: MatPaginator;
    @ViewChild('paginator2') paginator2: MatPaginator;
    @ViewChild('paginator3') paginator3: MatPaginator;

    workhistoryform: FormGroup
    educationalform: FormGroup
    characterfrom: FormGroup
    idform: FormGroup
    editing : boolean = false
    pipe = new DatePipe('en-US');
    dropdownOptions = new DropdownOptions
    dropdownFix = new DropdownRequest
    dropdownRequest = new DropdownRequest
    id : string = ''
    loginId = 0
    action: string = ""
    imagefiless : any = []
    fileExtension: string | undefined;
    imageUrl: any
    failedMessage = {...FailedMessage}
    imageIndex : any
    rowidsave : 0
    //for dropdown description {}
    industrys : any = []
    occupations : any = []
    levels : any = []
    schoolNames : any = []
    degrees : any = []
    relationshipIds : any = []
    occupationIds : any = []
    dataBackUp : any = []
    uploadedFileName : any
    imageList: any = []

    industry = [
        { id: 1, description: 'Computer industry' },
        { id: 2, description: 'Creative industry' },
        { id: 3, description: 'Education industry' },
        { id: 4, description: 'Electronics industry' },
        // Add more options as needed
    ];

    occupation = [
        { id: 1, description: 'Developer' },
        { id: 2, description: 'Accounting' },
        { id: 3, description: 'Sales' },
        { id: 4, description: 'marketing' },
        // Add more options as needed
    ];

    level = [
        { id: 1, description: 'Elementary' },
        { id: 2, description: 'High' },
        { id: 3, description: 'College' },
        // Add more options as needed
    ];

    school = [
        { id: 1, description: 'Abra State Institute of Science and Technology' },
        { id: 2, description: 'Adamson University' },
        { id: 3, description: 'Adventist International Institute of Advanced Studies' },
        { id: 4, description: 'Adventist University of the Philippines' },
        // Add more options as needed
    ];

    degree = [
        { id: 1, description: 'AB in Communication' },
        { id: 2, description: 'BSBA in Operations ManagementNo' },
        { id: 3, description: 'AB in Social Science' },
        { id: 4, description: 'BS in Aeronautical Engineering' },
        // Add more options as needed
    ];

    relation = [
        { id: 1, description: 'Father' },
        { id: 2, description: 'Mother' },
        { id: 3, description: 'Brother' },
        { id: 4, description: 'Sister' },
        // Add more options as needed
    ];
    blob: any;
    blobname: any
    addimage : any
    imageId : any

    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator0;
        // this.dataSource1.paginator = this.paginator1;
        // this.dataSource2.paginator = this.paginator2;
    }

  constructor(private fb: FormBuilder,
    private masterService : MasterService ,
    private tenantService : TenantService,
    private route: ActivatedRoute,
    private coreService : CoreService,
    private userService: UserService,
    private message: FuseConfirmationService,
    ) { }

    get ef() { return this.educationalform.controls }
    get cf() { return this.characterfrom.controls }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.workhistoryform = this.fb.group(new workHistory());
    this.educationalform = this.fb.group(new educationlAttainment());
    this.characterfrom = this.fb.group(new characterReference());
    this.idform = this.fb.group(new e201WorkEducationHistory());
    // getE201WorkEducationHistory
    this.initData()

  }

  sample(e,id){
    var sample = this.dataSource
  }

    add(a,name,upId) {

        let fields = [];
        debugger
        switch (name) {
            case 'work':
                fields = [
                    { key: 'companyName', label: 'Company Name', checkEmpty: true },
                    { key: 'address', label: 'Address' },
                    { key: 'industryId', label: 'Industry' },
                    { key: 'occupationId', label: 'Occupation' },
                    { key: 'jobDecsription', label: 'Job Description' },
                    { key: 'fromDate', label: 'From Date', checkEmpty: true },
                    { key: 'toDate', label: 'To Date', checkEmpty: true },
                    { key: 'leavingReason', label: 'Reason For Leaving' },
                    { key: 'uploadPath', label: 'Upload' },
                ];
                break;
            case 'education':
                fields = [
                    { key: 'level', label: 'Level' },
                    { key: 'schoolName', label: 'School Name' },
                    // { key: 'graduatedYear', label: 'Year Graduated' },
                    { key: 'contactNumber', label: 'Contact Number' },
                    { key: 'degree', label: 'Degree' },
                    { key: 'emailAddress', label: 'Email Address' },
                    { key: 'fromDate', label: 'Date From', checkEmpty: true },
                    { key: 'toDate', label: 'Date To', checkEmpty: true },
                    { key: 'branch', label: 'Branch' }
                ];
                break;
            case 'charref':
                fields = [
                    { key: 'fullName', label: 'Full Name' },
                    { key: 'relationshipId', label: 'Relationship' },
                    { key: 'company', label: 'Company' },
                    { key: 'occupationId', label: 'Occupation' },
                    { key: 'contactNumber', label: 'Contact Number' },
                    { key: 'emailAddress', label: 'Email Address' },
                    { key: 'address', label: 'Address' }
                ];
                break;
            default:
                return;
}

        const emptyFields = fields
                .filter(field => field.checkEmpty ? GF.IsEmpty(this[a].value[field.key]) : this[a].value[field.key] === "" || this[a].value[field.key] === 0 || this[a].value?.[field.key] === null)
                .map(field => field.label);

            if (emptyFields.length > 0) {
                this.failedMessage.title = translate("Warning!");
                this.failedMessage.message = `${emptyFields.join(", ")} ${emptyFields.length > 1 ? 'are' : 'is'} empty`;
                this.message.open(this.failedMessage);
            }else{
                this.adddata(a,name,upId)
            }
    }

    adddata(a,name,upId){

        if (this.editing) {

            var indexToRemove = this.findIndexByNameAndOccurrence(name, this.imageIndex);

            if (indexToRemove !== -1) {
                this.dataSource.splice(indexToRemove, 1);
            }

            var work = this[a].value
            debugger
            // this.dataSource.splice(this.imageIndex, 1)
            this.dataSource.unshift({
                ...work ,
                name : name,
                rowId : this.rowidsave,
                industryDescription : GF.IsEmptyReturn(this.industrys[0]?.description,""),
                occupationDescription : GF.IsEmptyReturn(this.occupationIds[0]?.description,""),
                fromDate : GF.IsEmpty(this[a].value.fromDate) ? "" : this.pipe.transform(this[a].value.fromDate, "yyyy-MM-ddTHH:mm"),
                toDate : GF.IsEmpty(this[a].value.toDate) ? "" : this.pipe.transform(this[a].value.toDate, "yyyy-MM-ddTHH:mm"),
                uploadPath :this[a].value.uploadPath?.replace("C:\\fakepath\\",''),
                /// to display file name in upload field from edit
                files : !GF.IsEmpty(name) ? this.addimage : null,
                levelDescription : GF.IsEmptyReturn(this.levels[0]?.description,""),
                schoolNameDescription : GF.IsEmptyReturn(this.schoolNames[0]?.description,""),
                degreeDescription : GF.IsEmptyReturn(this.degrees[0]?.description,""),
                contactNumber : this[a].value.contactNumber?.startsWith("+63") ? this[a].value.contactNumber : "+63" + this[a].value.contactNumber,
                relationshipDescription : GF.IsEmptyReturn(this.relationshipIds[0]?.description,""),
            })

        }else{

            var work = this[a].value

            this.dataSource.unshift({
                ...work ,
                rowId : 0,
                name : name,
                fromDate: GF.IsEmpty(this[a].value.fromDate) ? "" : this.pipe.transform(this[a].value.fromDate, "yyyy-MM-ddTHH:mm"),
                toDate: GF.IsEmpty(this[a].value.toDate) ? "" : this.pipe.transform(this[a].value.toDate, "yyyy-MM-ddTHH:mm"),
                uploadPath: this[a].value?.uploadPath?.replace("C:\\fakepath\\",''), /// to display file name in table field from create
                files :  !GF.IsEmpty(name) ?  this.addimage : null,
                industryDescription: GF.IsEmptyReturn(this.industrys[0]?.description,""),
                occupationDescription: GF.IsEmptyReturn(this.occupationIds[0]?.description,""),
                // educational ==============================
                levelDescription: GF.IsEmptyReturn(this.levels[0]?.description,""),
                schoolNameDescription: GF.IsEmptyReturn(this.schoolNames[0]?.description,""),
                degreeDescription: GF.IsEmptyReturn(this.degrees[0]?.description,""),
                contactNumber: this[a].value.contactNumber?.startsWith("+63") ? this[a].value.contactNumber : "+63" + this[a].value.contactNumber,

                // charref ===========================
                relationshipDescription: GF.IsEmptyReturn(this.relationshipIds[0]?.description,""),
            })

        }

            this.workhistorytable.renderRows()
            this.educational.renderRows()
            this.characterref.renderRows()

            var work = ["companyName", "address", "industryId", "occupationId", "jobDecsription", "fromDate", "toDate", "leavingReason", "uploadPath"]
            var education = ['level', 'schoolName', 'branch', 'degree', 'graduatedYear', 'contactNumber', 'emailAddress','address','fromDate','toDate']
            var charref = ['fullName', 'relationshipId', 'company', 'address', 'occupationId', 'contactNumber', 'emailAddress']
            var table = a == 'workhistoryform' ? work : a == 'educationalform' ? education : a == "characterfrom" ? charref : [];


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

        // console.log(this.dataSource)
        if (!this.alltable.some(item => JSON.stringify(item.data && item.imagefile) === JSON.stringify(this.dataSource))) {
            this.alltable.push({
                data: this.dataSource,
                imagefile : JSON.stringify(this.imagefiless),
                module : "98"

            });
        }
        this.editing = false

}

    deledit(a,e,i){
        this.rowidsave = e.rowId
        this.imageIndex = i
        switch(a){
            // work history ==========================
            case 'delworkhistory' :
                var indexToRemove = this.findIndexByNameAndOccurrence('work', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.workhistorytable[i].data = this.dataSource
                this.workhistorytable.renderRows()
            break;

            case 'editworkhistory' :
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

                debugger

                this.workhistoryform.get('companyName').setValue(e.companyName)
                this.workhistoryform.get('address').setValue(e.address)
                this.workhistoryform.get('industryId').setValue(e.industryId)
                this.workhistoryform.get('occupationId').setValue(e.occupationId)
                this.workhistoryform.get('jobDecsription').setValue(e.jobDecsription)
                this.workhistoryform.get('fromDate').setValue(e.fromDate)
                this.workhistoryform.get('toDate').setValue(e.toDate)
                this.workhistoryform.get('leavingReason').setValue(e.leavingReason)
                this.workhistoryform.value.uploadPath = e.uploadPath
                this.workhistoryform.get('uploadPath').setValue(e.uploadPath)
                this.workhistorytable.renderRows()
            break;

            // educational ==========================
            case 'deleducational' :
                var indexToRemove = this.findIndexByNameAndOccurrence('education', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.educational[i].data = this.dataSource
                this.educational.renderRows()
            break;

            case 'editeducational' :
                this.editing = true
                this.educationalform.get('level').setValue(e.level)
                this.educationalform.get('schoolName').setValue(e.schoolName)
                this.educationalform.get('branch').setValue(e.branch)
                this.educationalform.get('degree').setValue(e.degree)
                this.educationalform.get('address').setValue(e.address)
                this.educationalform.get('fromDate').setValue(e.fromDate)
                this.educationalform.get('toDate').setValue(e.toDate)
                this.educationalform.get('graduatedYear').setValue(e.graduatedYear)
                this.educationalform.get('contactNumber').setValue(e.contactNumber.substring(3))
                this.educationalform.get('emailAddress').setValue(e.emailAddress)
                // this.editing = true

                // var indexToRemove = this.findIndexByNameAndOccurrence('education', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }
                // this.dataSource.splice(i, 1)
                this.educational.renderRows()
            break;

            case 'delcharacterref':
                var indexToRemove = this.findIndexByNameAndOccurrence('charref', i);
                if (indexToRemove !== -1) {
                    this.dataSource.splice(indexToRemove, 1);
                }
                this.characterref[i].data = this.dataSource
                this.characterref.renderRows()
            break;

            case 'editcharacterref':
                this.editing = true
                this.characterfrom.get('fullName').setValue(e.fullName)
                this.characterfrom.get('relationshipId').setValue(e.relationshipId)
                this.characterfrom.get('company').setValue(e.company)
                this.characterfrom.get('address').setValue(e.address)
                this.characterfrom.get('occupationId').setValue(e.occupationId)
                this.characterfrom.get('contactNumber').setValue(e.contactNumber.substring(3))
                this.characterfrom.get('emailAddress').setValue(e.emailAddress)
                // this.editing = true

                // var indexToRemove = this.findIndexByNameAndOccurrence('charref', i);

                // if (indexToRemove !== -1) {
                //     this.dataSource.splice(indexToRemove, 1);
                // }

                // this.dataSource.splice(i, 1)
                this.characterref.renderRows()
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

    initData(){

        this.dropdownRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 37 },
            { dropdownID: 0, dropdownTypeID: 151 },
            { dropdownID: 0, dropdownTypeID: 152 },
            { dropdownID: 0, dropdownTypeID: 153 },
            { dropdownID: 0, dropdownTypeID: 154 },
            { dropdownID: 0, dropdownTypeID: 155 },
        )

        this.dropdownFix.id.push(
            { dropdownID: 0, dropdownTypeID: 1 },
            { dropdownID: 0, dropdownTypeID: 116 },
        )

        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),

        }).subscribe({
            next: (value: any) => {
                // Fix ===========
                this.dropdownOptions.industryDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 1)
                this.dropdownOptions.leveldef = value.dropdown.payload.filter(x => x.dropdownTypeID === 151)
                this.dropdownOptions.schooldef = value.dropdown.payload.filter(x => x.dropdownTypeID === 154 ) // && x.dropdownTypeID === 152 && x.dropdownTypeID === 153
                this.dropdownOptions.degreedef = value.dropdown.payload.filter(x => x.dropdownTypeID === 155)
                this.dropdownOptions.relationshipDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 116)

                // Tenant ===========
                this.dropdownOptions.occupationDef = value.dropdown.payload.filter(x => x.dropdownTypeID === 37)

                if (this.id !== "") {
                    this.action = sessionStorage.getItem("action")
                    if (this.action == 'edit') {
                        this.userService.getE201WorkEducationHistory(this.id).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    value.payload.forEach(data => {

                                        var work = data.workHistory.map((item,index) => ({
                                            ...item,
                                            name: "work",
                                            id: index + 1 ///for identifying the selected item to delete
                                        }))
                                        var education = data.educationalAttainment.map((item,index) => ({
                                            ...item,
                                            name: "education",
                                            id: index + 1
                                        }))
                                        var charref = data.characterReference.map((item,index) => ({
                                            ...item,
                                            name: "charref",
                                            id: index + 1
                                        }))
                                        this.dataSource = [...work,...education,...charref]
                                        this.ids = data.id
                                    });

                                    if (!this.alltable.some(item => JSON.stringify(item.data) === JSON.stringify(this.dataSource))) {
                                        this.alltable.push({
                                            data: this.dataSource,
                                            imagefile : this.imagefiless,
                                            module : "98",
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

    async uploadFile(event, id,names,tab) {
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

    getFileExtension(fileName: string): string {
        // Use regex to extract the file extension from the file name
        const match = /\.([0-9a-z]+)(?:[\?#]|$)/i.exec(fileName);
        if (match && match[1]) {
            return match[1].toLowerCase(); // Convert to lowercase if needed
        } else {
            return 'Unknown';
        }
    }

    InvalidEmail(){
        if (!this.ef.emailAddress.valid || !this.cf.emailAddress.valid) {
            this.failedMessage.title = "Invalid email"
            this.failedMessage.message = "Please ensure the email includes an '@' symbol, has a valid domain (e.g., '.com', '.net'), or does not contain invalid special characters.";
            this.failedMessage.actions.confirm.label = "Ok"
            this.message.open(this.failedMessage)
        }
    }

    imageids(id){
        this.imageId = id+''
    }

    download(id,filename){
        window.open('https://aanyahrv2.obs.ap-southeast-1.myhuaweicloud.com/'+sessionStorage.getItem('se')+'/'+'shared'+'/'+sessionStorage.getItem('moduleId')+'/'+id+'/'+filename)
    }


}
