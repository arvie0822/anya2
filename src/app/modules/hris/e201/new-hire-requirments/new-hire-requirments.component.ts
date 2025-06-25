import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { TranslocoModule } from '@ngneat/transloco';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { myData } from 'app/model/app.moduleId';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { e201NewHire } from 'app/model/hris/e201';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { SharedModule } from 'app/shared/shared.module';
import _, { forEach } from 'lodash';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { forkJoin } from 'rxjs';



@Component({
    selector: 'app-new-hire-requirments',
    templateUrl: './new-hire-requirments.component.html',
    styleUrls: ['./new-hire-requirments.component.css'],
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
    TranslocoModule,
    MatMenuModule,
    MatDatepickerModule
]
})
export class NewHireRequirmentsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('newhiretable') newhiretable: MatTable<any>;

    displayedColumns: string[] = ['action','e201ReuirementId', 'isSubmitted', 'dateSubmitted', 'dateIssued', 'dateExpiration', 'dateDeadLine', 'uploadPath'];
    @Input() dataSource: any = []
    imageUrl: any
    id = ""
    action: string = ""
    _onDestroy: any
    dropdownOptions = new DropdownOptions
    dropdownFix = new DropdownRequest
    dropdownRequest = new DropdownRequest
    @Output() datasource = new EventEmitter<any>();
    @Output() newhireimage = new EventEmitter<any>();
    @Output() ids = new EventEmitter<any>();
    @Output() isactive = new EventEmitter<any>();
    @Output() empname = new EventEmitter<any>();
    pipe = new DatePipe('en-US');
    loginId = 0
    fileExtension: string | undefined;
    newhireimagefile : any = []
    imagefiless: any = []

    requirments = [
        { id: 1, description: 'Police Clearance' },
        { id: 2, description: 'NSO Birthcert' },
        { id: 3, description: 'SSS' },
        { id: 4, description: 'Philhealth' },
        // Add more options as needed
    ];

    newhireform: FormGroup

    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private masterService: MasterService,
        private tenantService: TenantService,
        private coreService : CoreService,
        private fb: FormBuilder,

    ) { }

    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    // }

     ngOnInit() {
         this.newhireform = this.fb.group(new e201NewHire());
        this.id = this.route.snapshot.paramMap.get('id');
        this.dropdownFix.id.push(
            { dropdownID: 0, dropdownTypeID: 150 },
        );
        this.initData()

    }


    initData() {

        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),

        }).subscribe({
            next: (res: any) => {
                // Fix ===========
                this.dropdownOptions.requirmentdef = res.dropdownFix.payload.filter(x => x.dropdownTypeID === 150)
                if (this.id !== "") {
                    this.action = sessionStorage.getItem("action")
                    if (this.action == 'edit') {
                        this.userService.getE201NewHireRequirement(this.id).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {

                                        this.dataSource = value.payload[0].e201NewHireDetail.map(x => ({
                                            requirementDescription: x.requirementDescription,
                                            e201RequirementId: x.e201RequirementId,
                                            isSubmitted: x.isSubmitted,
                                            dateSubmitted: x.dateSubmitted == null ? null : x.dateSubmitted,
                                            dateIssued: x.dateIssued == null ? null : x.dateIssued,
                                            dateExpiration: x.dateExpiration == null ?  null : x.dateExpiration,
                                            dateDeadLine: x.dateDeadLine == null ?  "2023-11-30T16:00:00.000Z" : x.dateDeadLine,
                                            uploadPath: x.uploadPath ==  null ? "" : x.uploadPath.replace("C:\\fakepath\\",''),
                                            isActive : x.isActive,
                                            rowId:x.rowId,
                                            lastId : x.lastID,
                                            createdBy : x.createdBy,
                                            dateCreated : x.dateCreated,
                                            isRequirementDeleted : x.isRequirementDeleted
                                        }))


                                    this.datasource.emit(this.dataSource)
                                    this.ids.emit(value.payload[0].id)
                                    this.isactive.emit(value.payload[0].isActive)
                                    this.empname.emit(value.payload[0].displayName)
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


    async uploadFile(event, id,i,e) {

        this.dataSource[i].uploadPath = event.target.files[0].name;
        const input = event.target as HTMLInputElement;
        const file = input.files[0];
        const uploadPath = file.name.replace("C:\\fakepath\\", ''); // Get file name
        const fileToUpload0 = event.target.files[0];
        const name = fileToUpload0.name;


        this.dataSource[i].uploadPath = event.target.files[0].name;
        this.dataSource[i].files = file


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

    clearDate(element,value) { /// Task # 1162989 for reset of dates
        element[value] = null;
    }

    async reduceImageSize(file: File, maxSizeInBytes: number, quality: number): Promise<File> {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function (event: ProgressEvent<FileReader>) {
                const image = new Image();

                image.onload = function () {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const originalWidth = image.width;
                    const originalHeight = image.height;
                    let resizedWidth = originalWidth;
                    let resizedHeight = originalHeight;

                    // Calculate the new width and height to fit the desired file size
                    while (file.size > maxSizeInBytes && resizedWidth > 10 && resizedHeight > 10) {
                        resizedWidth *= 0.9;
                        resizedHeight *= 0.9;

                        canvas.width = resizedWidth;
                        canvas.height = resizedHeight;

                        context.clearRect(0, 0, resizedWidth, resizedHeight);
                        context.drawImage(image, 0, 0, resizedWidth, resizedHeight);

                        file = dataURLtoFile(canvas.toDataURL(file.type, quality), file.name);
                    }
                    resolve(file);
                };

                image.src = event.target?.result as string;
            };

            reader.readAsDataURL(file);

            function dataURLtoFile(dataURL: string, fileName: string): File {
                const arr = dataURL.split(',');
                const mime = arr[0].match(/:(.*?);/)[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                return new File([u8arr], fileName, { type: mime });
            }
        });
    }

    download(id,filename){
        window.open('https://aanyahrv2.obs.ap-southeast-1.myhuaweicloud.com/'+sessionStorage.getItem('se')+'/'+'shared'+'/'+sessionStorage.getItem('moduleId')+'/'+id+'/'+filename)
    }
}


