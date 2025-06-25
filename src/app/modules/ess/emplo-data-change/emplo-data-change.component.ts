import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { myData } from 'app/model/app.moduleId';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownRequest } from 'app/model/dropdown-custom.model';
import { DropdownOptions, SearchHierarchy } from 'app/model/dropdown.model';
import { EmployeeHierarchy } from 'app/model/employee-hierarchy';
import { SaveMessage, SuccessMessage, FailedMessage} from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { FilingService } from 'app/services/filingService/filing.service';
import { GF } from 'app/shared/global-functions';
import _, { join } from 'lodash';
import { firstValueFrom, forkJoin } from 'rxjs';
import { Validators } from "@angular/forms"
import { fuseAnimations } from '@fuse/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';

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
    selector: 'app-emplo-data-change',
    templateUrl: './emplo-data-change.component.html',
    styleUrls: ['./emplo-data-change.component.css'],
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
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        MatMenuModule,

        DropdownCustomComponent,
        DropdownComponent,
        CardTitleComponent,
        EmployeeHierarchyComponent,
        TranslocoModule,
        MatTooltipModule

  ],
})
export class EmploDataChangeComponent implements OnInit {
    dropdownRequest = new DropdownRequest();
    dropdownFixRequest = new DropdownRequest();
    dropdowntenant = new DropdownRequest();
    dropdownOptions = new DropdownOptions();
    datasource = [];
    show: Boolean = false;
    isSave: Boolean = false;
    dataCForm: FormGroup;
    prevModule = '';
    id = '';
    field_count = 0;
    request = new TableRequest();
    resultHierarchy = new SearchHierarchy();
    tagtypeoption: any;
    fields = [];
    dataencryp: any;
    fieldsedc: any;
    isMgmt: any;
    targetId: any = [];
    csColumns: string[] = ['fieldname', 'fielddata', 'newdata', 'dateeffect'];
    loginId = 0;
    masknumber = '';
    pipe = new DatePipe('en-US');
    fileExtension: string | undefined;
    moduleId: any;
    transactionId: any;
    imagefiless: any = [];
    imageList: any = [];
    outputMessage: any = []

    failedMessage = { ...FailedMessage };
    successMessage = { ...SuccessMessage };

    screenWidth: number;
    min = new Date()
    maxBday = new Date()
    isView: boolean = (sessionStorage.getItem("action") == "view");
    isApproved: boolean = false;

    constructor(
        private fb: FormBuilder,
        private coreService: CoreService,
        private filingService: FilingService,
        private message: FuseConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private renderer: Renderer2,
        private masterService: MasterService,
        private tenantService: TenantService,
    ) {
        this.screenWidth = window.innerWidth;
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.targetId = [];
        this.coreService
            .encrypt_decrypt(false, [sessionStorage.getItem('u')])
            .subscribe({
                next: (value: any) => {
                    this.targetId = Number(value.payload[0]);
                },
            });

        this.dataCForm = this.fb.group({
            dropdown: ['', Validators.pattern('[a-zA-Z]+')],
            employeeId: '',
        });

        if (this.id != '') {
            this.filingService.getEmployeeDataChangeFiling(this.id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        var data = value.payload;
                        this.isApproved = GF.IsEmptyReturn(data?.approved,false)
                        if (data.fieldType == 'Select' && !data.multiple) {
                            data.newValue = JSON.parse(data.newValue);

                           
                        }
                        this.datasource.push(data);
                    }
                },
            });
        }
        // getEmployeeDataChangeFiling
        this.dropdownFixRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 29  },
            { dropdownID: 0, dropdownTypeID: 30  },
            { dropdownID: 0, dropdownTypeID: 31  },
            { dropdownID: 0, dropdownTypeID: 32  },
            { dropdownID: 0, dropdownTypeID: 33  },
            { dropdownID: 0, dropdownTypeID: 34  },
            { dropdownID: 0, dropdownTypeID: 35  },
            { dropdownID: 0, dropdownTypeID: 3   },
            { dropdownID: 0, dropdownTypeID: 10  },
            { dropdownID: 0, dropdownTypeID: 61  },
            { dropdownID: 0, dropdownTypeID: 9   },
            { dropdownID: 0, dropdownTypeID: 3   },
            { dropdownID: 0, dropdownTypeID: 10  },
            { dropdownID: 0, dropdownTypeID: 61  },
            { dropdownID: 0, dropdownTypeID: 9   },
            { dropdownID: 0, dropdownTypeID: 143 },
            { dropdownID: 0, dropdownTypeID: 116 },
            { dropdownID: 0, dropdownTypeID: 123 },
            { dropdownID: 0, dropdownTypeID: 36  },
            { dropdownID: 0, dropdownTypeID: 42  },
            { dropdownID: 0, dropdownTypeID: 2   },
            { dropdownID: 0, dropdownTypeID: 99  },
        );

        this.dropdowntenant.id.push(
            { dropdownID: 0, dropdownTypeID: 121  },
            { dropdownID: 0, dropdownTypeID: 38  },
            { dropdownID: 0, dropdownTypeID: 37  },
            { dropdownID: 0, dropdownTypeID: 39  },
            { dropdownID: 0, dropdownTypeID: 40  },
        )
        this.initData();

        this.renderer.listen('window', 'resize', (event) => {
            this.screenWidth = window.innerWidth;
        });
        this.maxBday.setFullYear(this.maxBday.getFullYear() - 18,11,30);
    }

    minEffectiveDate(fieldKey) {
        return GF.IsEqual(fieldKey, [73, 74]) ? new Date(this.min.getFullYear(), 0, 1) : new Date(this.min.getFullYear(), this.min.getMonth() - 1, this.min.getDate())
    }

    maxDate(fieldKey) {
        return GF.IsEqual(fieldKey, [15]) ? this.maxBday : new Date(this.min.getFullYear()+2, 11, 30)
    }

    get currentModule() {
        // 141 - Ess
        // 142 - Mgmt
        // 209 - HR - 214 dev temp id
        this.isMgmt = GF.IsEqual(sessionStorage.getItem('moduleId'), ['142', '209']);
        this.moduleId = sessionStorage.getItem('moduleId');
        if (!GF.IsEqual(this.prevModule, [sessionStorage.getItem('moduleId')])) {
            this.prevModule = sessionStorage.getItem('moduleId');
        }
        return this.isMgmt;
    }

    getOrdinalSuffix(index){
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const remainder10 = index % 10;
        const remainder100 = index % 100;

        if (remainder10 === 1 && remainder100 !== 11) {
            return index + 'st';
        } else if (remainder10 === 2 && remainder100 !== 12) {
            return index + 'nd';
        } else if (remainder10 === 3 && remainder100 !== 13) {
            return index + 'rd';
        } else {
            return index + 'th';
        }
    }

    validations(){
        // initial data
        var out = { error: false, msg: "" };

        this.datasource.forEach(obj => {
            let missingColumns = [];

            // Check for missing or empty effectiveDate
            if (GF.IsEmpty(obj.effectiveDate)) { missingColumns.push('Effective Date'); }

            // Check for specific requirements based on reasonID
            if (obj.reasonAttachmentId === 31142 && GF.IsEmpty(obj.reason)) {
                missingColumns.push('Remarks');
            } else if (obj.reasonAttachmentId === 31143 && GF.IsEmpty(obj?.attach)) {
                missingColumns.push('Attachment');
            } else if (obj.reasonAttachmentId === 31144) {
                if (GF.IsEmpty(obj.reason)) missingColumns.push('Remarks');
                if (GF.IsEmpty(obj?.attach)) missingColumns.push('Attachment');
            }

            if (GF.IsEmpty(obj.newValue)) {
                missingColumns.unshift(`<strong>${obj.fieldName}</strong> Field`);
            }

            // Generate error message if there are missing columns
            if (missingColumns.length > 0) {
                // Check general columns for null, undefined, or empty string
                if (!GF.IsEmpty(obj.newValue)) {
                    missingColumns.unshift(`<strong>${obj.fieldName}</strong> Field`);
                }
                out.msg += `${missingColumns.join(', ')} is required!<br>`;
            }
        });

        out.error = !GF.IsEmpty(out.msg);
        return out;
    }


    async submit() {
        if (this.isMgmt && this.resultHierarchy.Search.some(x=>x.Key == 'EmployeeID')) {
            const decrypt = await firstValueFrom(this.coreService.encrypt_decrypt(true, [this.tagtypeoption[6].value + '']));
            this.targetId = decrypt.payload[0]; //this.tagtypeoption[5].value + '';
        } else {
            this.targetId = sessionStorage.getItem('u');
        }

        var decrypt = await firstValueFrom(this.coreService.encrypt_decrypt(false, [this.targetId]));
        this.loginId = Number(decrypt.payload[0]);

        const newData = this.datasource.map(item => ({
            ...item,
            effectiveDate: this.pipe.transform(item.effectiveDate, 'yyyy-MM-dd'),
            newValue: item.dataType == 'Date' ? this.pipe.transform(item.newValue, 'yyyy-MM-dd HH:mm') : item.newValue+"",
            dateCreated:  this.pipe.transform(new Date(), 'yyyy-MM-ddTHH:mm'),
        }));

        var output = this.validations();
        if (output.error) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.actions.confirm.label = "Ok"
            this.failedMessage.message = output.msg;
            this.message.open(this.failedMessage);
            return
        } else {
            var dialogRef = this.message.open(SaveMessage);
        }

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result == 'confirmed') {
                this.filingService .postEmployeeDataChange(newData, this.targetId ).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.successMessage.message = translate("Transaction has been Saved. Kindly wait for your supervisor's approval.");
                                this.message.open(this.successMessage);
                                this.isSave = false;
                                this.router.navigate([ '/search/EDC-view', ]);
                                if (this.imagefiless.length === 0) {
                                    return;
                                }

                                this.coreService.uploadimage( this.imagefiless, value.payload, this.moduleId, this.loginId );
                                // this.imagefiless
                            } else {
                                // this.failedMessage.title = "EDC saving failed";
                                this.failedMessage.message = GF.IsEmptyReturn(value.payload?.[0],value.message);
                                this.message.open(this.failedMessage);
                            }
                        },
                        error: (e) => {
                            console.error(e);
                        },
                    });
            }
        });
    }

    dropdownCustom() {
        /// to assign dropdownTypeId based on the dropdownField in custom drodpown
        for (let i = 0; i < this.datasource.length; i++) {
            switch (this.datasource[i].fieldName) {
                case 'Company':
                    this.datasource[i].dropDownTypeId = 1001;
                    break;
                case 'Employee Category':
                    this.datasource[i].dropDownTypeId = 1007;
                    break;
                case 'Access Control':
                    this.datasource[i].dropDownTypeId = 1008;
                    break;
                case 'Timekeeping':
                    this.datasource[i].dropDownTypeId = 1012;
                    break;
                case 'Payroll Category':
                    this.datasource[i].dropDownTypeId = 1009;
                    break;
                case 'Branch':
                    this.datasource[i].dropDownTypeId = 1002;
                    break;
            }
        }
    }

    async search() {
        if (this.isMgmt && this.resultHierarchy.Search.some(x => x.Key == 'EmployeeID')) {
            this.targetId = this.tagtypeoption[6].value;
        } else {
            var decrypt = await firstValueFrom(this.coreService.encrypt_decrypt(false, [sessionStorage.getItem('u')]));
            this.targetId = [Number(decrypt.payload[0])];
        }

        const obj = {
            fields: this.dataCForm.get("dropdown").value,
            employeeId: this.targetId,
        };

        this.filingService.getEmployeePropertiesWithData(obj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    const load = GF.sort(value.payload,"fieldName");
                    this.validateData(load);
                    this.dropdownCustom();

                    // value.payload.forEach((datas) => {

                    //     this.dropdownFixRequest.id.push({
                    //         dropdownID: 0,
                    //         dropdownTypeID: datas.dropDownTypeId, 
                    //     });
                    // });
                    // this.dropdownFixRequest.id = _.uniqBy( this.dropdownFixRequest.id, JSON.stringify)
                    // this.initDatatenant();

                 
                }
            },
            error: (e) => {
                console.error(e);
            },
        });
    }

    validateData(data){
        const fieldKey = data.map(x=>x.fieldKey);
        const eId = data.map(x=>x.employeeId)
        const hasData = this.datasource.filter(x=>fieldKey.includes(x.fieldKey) && eId.includes(x.employeeId)).map(m=>m.fieldKey)
        
        if (!GF.IsEmpty(hasData)) {
            const failedMessage = {...FailedMessage}
            failedMessage.actions.cancel.show = true;
            failedMessage.title = translate('Warning!');
            failedMessage.message = translate('Some fields already exist. Do you want to replace them?');
            failedMessage.actions.confirm.label = "Yes";
            failedMessage.actions.cancel.label = "No";

            const dialogRef = this.message.open(failedMessage);

            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed') {
                    hasData.forEach(key => {
                        const indx = this.datasource.findIndex(x=>x.fieldKey === key)
                        this.datasource.splice(indx,1)
                    });
                    this.datasource = [...this.datasource ,...data]
                } else {
                    const clear = data.filter(x=>!hasData.includes(x.fieldKey))
                    this.datasource = [...this.datasource ,...clear]
                }
            });

        } else {
            this.datasource = [...this.datasource ,...data]
        }
        this.datasource.forEach((data) => {
            data.dropDownList = [
                ...(data.dropDownList || []),
                ...this.dropdownOptions.optionsdef.filter(
                    (x) => x.dropdownTypeID == data.dropDownTypeId
                ),
            ];
        });
         console.log(this.datasource)
    }

    initData() {
        forkJoin({
            fields: this.coreService.getCoreDropdown( 1056, this.dropdownRequest ),
            supervisor: this.coreService.getCoreDropdown( 1035, this.dropdownRequest ),
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFixRequest),
            dropdown: this.tenantService.getDropdown(this.dropdowntenant),
        }).subscribe({
            next: (response) => {
                this.dropdownOptions.userDef = _.uniqBy(
                    response.fields.payload,
                    JSON.stringify
                );
                this.dropdownOptions.employeedef = _.uniqBy(
                    response.supervisor.payload,
                    JSON.stringify
                );

                  this.dropdownOptions.optionsdeftenant = _.uniqBy(
                    response.dropdown.payload,
                    JSON.stringify
                );

                 this.dropdownOptions.optionsdef= _.uniqBy(
                    response.dropdownFix.payload,
                    JSON.stringify
                );
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => {},
        });
    }




    async uploadFile(event, id, i, e) {
        let fileName = event.target.files[0].name;
        this.fileExtension = this.getFileExtension(fileName);
        var namefile = this.fileExtension;

        const fileToUpload0 = event.target.files[0];
        const name = fileToUpload0.name;

        let reduce: File;

        if (namefile == 'jpg' || namefile == 'png') {
            try {
                reduce = fileToUpload0;
            } catch (error) {
                return; // If an error occurs, you might want to handle it accordingly.
            }
        } else {
            reduce = fileToUpload0;
        }
        console.log(this.imageList + 'this is imagelist');

        const renamedFile = new File([reduce], name, { type: reduce.type });
        if (this.imagefiless.some((x) => x.index == i)) {
            const idx = this.imagefiless.findIndex((x) => x.index == i);
            this.imagefiless[idx].files = reduce;
            this.imagefiless[idx].isupload = true;
        } else {
            const renamedFile = new File([reduce], name, { type: reduce.type });
            var inx =
                this.imagefiless.length == 0 ? 0 : this.imagefiless.length - 1;
            for (let index = inx; index <= i; index++) {
                var isup = index == i ? true : false;
                this.imagefiless.push({
                    index: index,
                    files: renamedFile,
                    isupload: isup,
                });
            }
        }
        var idHAsh = '#' + id; // fix on Task # 1165900 it should have unique id's for the display of upload file
        let element: HTMLElement = document.querySelector(idHAsh) as HTMLElement;
        element.setAttribute('value', e.attach.replace('C:\\fakepath\\', ''));

        myData.fileimage = _.uniqBy([...this.imagefiless], JSON.stringify);
        var sample = myData.fileimage;
        e.attach = e.attach.replace('C:\\fakepath\\', '');
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

    reset(){
        this.datasource = []
    }

    remove(i){
        this.datasource.splice(i,1)
    }

    get wid() {
        const out = {
            width: "w-full",
            is100: false
        };

        if (this.isMgmt) {
            out.is100 = (this.screenWidth <= 1440)//1366
            out.width =  out.is100 ? "w-full" : "w-10"
        }
        // console.log(out)
        return out;
    }
}



