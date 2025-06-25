import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { leaveForm, OfficialBusiness, OffsetMonitoring } from 'app/model/administration/filing';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FilingService } from 'app/services/filingService/filing.service';

// ==========import for format of date ==========================================
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatDateAdapter, } from '@angular-material-components/datetime-picker';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { MasterService } from 'app/services/masterService/master.service';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { forkJoin } from 'rxjs';
import _ from 'lodash';
import { myData } from 'app/model/app.moduleId';
import { StorageServiceService } from 'app/services/storageService/storageService.service';
import { CoreService } from 'app/services/coreService/coreService.service';
import { fuseAnimations } from '@fuse/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';
import { translate, translateObject, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';


// =================== For date time picker ============================
// export const MOMENT_DATETIME_WITH_SECONDS_FORMAT = 'MM-DD-YY hh:mm A';
// const CUSTOM_MOMENT_FORMATS: NgxMatDateFormats = {
//     parse: {
//         dateInput: MOMENT_DATETIME_WITH_SECONDS_FORMAT,
//     },
//     display: {
//         dateInput: MOMENT_DATETIME_WITH_SECONDS_FORMAT,
//         monthYearLabel: 'MMM YYYY',
//         dateA11yLabel: MOMENT_DATETIME_WITH_SECONDS_FORMAT,
//         monthYearA11yLabel: 'MMMM YYYY',
//     },
// };
const CUSTOM_DATE_FORMATS = {
    parse: {
        dateInput: 'MM/DD/YYYY hh:mm A',
    },
    display: {
        dateInput: 'MM/DD/YYYY hh:mm A',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'MM-DD-YYYY hh:mm A',
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


@Component({
    selector: 'app-official-business',
    templateUrl: './official-business.component.html',
    styleUrls: ['./official-business.component.css'],
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
        { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
        { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }

        // ============= For date time picker =============
        // {
        //     provide: NGX_MAT_DATE_FORMATS,
        //     useValue: CUSTOM_MOMENT_FORMATS,
        // },
    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    TranslocoModule,
    MatTooltipModule,
    TranslocoModule
],
})
export class OfficialBusinessComponent implements OnInit {
    @ViewChild('OBTable') OBTable: MatTable<any>;
    @Input() datasource: any
    @Input() selectedemployee: any
    @Output() pushEvent = new EventEmitter<any>();
    @Output() employeeIds = new EventEmitter<any>();
    public disabled = false;
    public showSpinners = true;
    public showSeconds = false;
    public touchUi = false;
    public enableMeridian = true;
    public minDate: moment.Moment;
    public maxDate: moment.Moment;
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';
    leaveForm: FormGroup
    officialBForm: FormGroup
    imageUrl: any
    isSave: boolean = false
    disabledreason: boolean = false
    datetodisabled: boolean = true
    id: string
    maxs: any
    mins: any
    editing = false;
    index = 0
    pipe = new DatePipe('en-US');
    disabledbutton: boolean = false
    tid: any
    dropdownRequest = new DropdownRequest
    dropdownOptions = new DropdownOptions
    purpose: any
    saveMessage = { ...SaveMessage }
    late: boolean = false

    dfrom_convert: any
    dTO_convert: any
    official = [
        { id: 1, description: 'Client meeting' },
        { id: 2, description: 'Training' },
        { id: 3, description: 'Offsite meeting' },
        { id: 4, description: 'Team building' },
        { id: 5, description: 'Official travel' },
        { id: 6, description: 'Branch Office' },
        { id: 7, description: 'Others' },
    ]
    OBSource = [];
    OSource: OffsetMonitoring[] = [{
        // include_expired: '',
        overtime_code: 'OT-001',
        overtime: '120',
        offset_used: '30',
        offset_field: '60',
        available: '30',
        expiration: '12/31/2022',
    }];
    failedMessage = { ...FailedMessage }
    obColumns: string[] = ['action', 'date', 'shiftCode', 'dateTimeFrom', 'dateTimeTo', 'reason', 'location', 'remarks', 'status', 'uploadFile'];
    filename: ""
    imagefiless: any = []
    moduleId: any
    fileExtension: string | undefined;
    loginId = 0
    idsimage
    @Output() disabledsubmit = new EventEmitter<any>();
    constructor(private fb: FormBuilder, private message: FuseConfirmationService,
        private route: ActivatedRoute,
        private adapter: DateAdapter<any>,
        private router: Router,
        private tenantService: TenantService,
        private masterService: MasterService,
        private filingService: FilingService,
        private storageServiceService: StorageServiceService,
        private coreService: CoreService,
        private translocoService : TranslocoService
    ) { }
    get ob() {
        return this.officialBForm.value
    }



    ngOnInit() {
        this.disabledsubmit.emit(false)
        var action = sessionStorage.getItem("action")
        this.moduleId = "35"
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id !== "") {
            if (action == "edit") {
                this.disabledbutton = false
                this.filingService.getOfficialBusiness(this.id).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {

                            this.datasource.push({

                                action: [{ id: value.payload.action }],
                                dates: [{ id: this.pipe.transform(value.payload.date, "yyyy-MM-dd"), disabled: true }],
                                date: [{ id: this.pipe.transform(value.payload.date, "yyyy-MM-dd"), disabled: true }],
                                timeFrom: [{ id: this.pipe.transform(value.payload.timeFrom, "yyyy-MM-ddTHH:mm:ss"), disabled: false }],
                                timeTo: [{ id: this.pipe.transform(value.payload.timeTo, "yyyy-MM-ddTHH:mm:ss"), disabled: false }],
                                reasonId: [{ id: value.payload.reasonId, disabled: false }],
                                location: [{ id: value.payload.location, disabled: false }],
                                reason: [{ id: value.payload.reason, disabled: false }],
                                uploadPath: [{ id: value.payload.uploadPath, disabled: false }],
                                status: [{ id: value.payload.status, disabled: true }],
                                disable: [{ id: false, disabled: true }],
                                officialBusinessId: [{ id: value.payload.transactionId, disabled: true }],
                                employeeId: value.payload.employeeId,
                                disabled: false,
                                encryptedId: value.payload.encryptedId,
                                shiftCode: [{ id: value.payload.shiftCode, disabled: true }],
                                shiftId: [{ id: value.payload.shiftId, disabled: true }],

                            })
                            this.coreService.encrypt_decrypt(true, [value.payload.employeeId.toString()])
                                .subscribe({
                                    next: (value: any) => {
                                        this.tid = value.payload[0]
                                    },
                                    error: (e) => {
                                        console.error(e)
                                    },
                                    complete: () => {

                                    }
                                });
                            this.employeeIds.emit(value.payload.employeeId)
                            this.OBTable.renderRows()
                            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 138 })
                            this.initData()

                        }
                        else {
                            console.log(value.stackTrace)
                            console.log(value.message)
                        }
                    },
                    error: (e) => {
                        console.error(e)
                    }
                });
            } else if (action == "view") {
                this.disabledsubmit.emit(true)
                this.disabledbutton = true
                this.filingService.getOfficialBusiness(this.id).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {

                            this.datasource.push({

                                action: [{ id: value.payload.action }],
                                dates: [{ id: this.pipe.transform(value.payload.date, "yyyy-MM-dd"), disabled: true }],
                                date: [{ id: this.pipe.transform(value.payload.date, "yyyy-MM-dd"), disabled: true }],
                                timeFrom: [{ id: this.pipe.transform(value.payload.timeFrom, "yyyy-MM-ddTHH:mm:ss"), disabled: true }],
                                timeTo: [{ id: this.pipe.transform(value.payload.timeTo, "yyyy-MM-ddTHH:mm:ss"), disabled: true }],
                                reasonId: [{ id: value.payload.reasonId, disabled: true }],
                                location: [{ id: value.payload.location, disabled: true }],
                                reason: [{ id: value.payload.reason, disabled: true }],
                                uploadPath: [{ id: value.payload.uploadPath, disabled: true }],
                                status: [{ id: value.payload.status, disabled: true }],
                                disable: [{ id: false, disabled: true }],
                                officialBusinessId: [{ id: value.payload.transactionId, disabled: true }],
                                employeeId: value.payload.employeeId,
                                disabled: true,
                                encryptedId: value.payload.encryptedId,
                                shiftCode: [{ id: value.payload.shiftCode, disabled: true }],
                                shiftId: [{ id: value.payload.shiftId, disabled: true }],

                            })
                            this.coreService.encrypt_decrypt(true, [value.payload.employeeId.toString()])
                                .subscribe({
                                    next: (value: any) => {
                                        this.tid = value.payload[0]
                                    },
                                    error: (e) => {
                                        console.error(e)
                                    },
                                    complete: () => {

                                    }
                                });
                            this.employeeIds.emit(value.payload.employeeId)
                            this.OBTable.renderRows()
                            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 138 })
                            this.initData()

                        }
                        else {
                            console.log(value.stackTrace)
                            console.log(value.message)
                        }
                    },
                    error: (e) => {
                        console.error(e)
                    }
                });
            }
        } else {

            var isRD = this.datasource.every(shift => shift.shiftId.every(id => id.id == 1))

            if (isRD) {
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.actions.confirm.color = 'primary'
                this.failedMessage.message = translate("Official Business on RD")
                this.message.open(this.failedMessage);
            }

            this.datasource.forEach(ele => {

                if (ele.status[0].id == '' && ele.shiftId[0].id == 1) {
                    ele.dates[0].disabled = true
                    ele.shiftCode[0].disabled = true
                    ele.reasonId[0].disabled = true
                    ele.reason[0].disabled = true
                    ele.location[0].disabled = true
                    ele.timeFrom[0].disabled = true
                    ele.timeTo[0].disabled = true
                    ele.status[0].disabled = true
                    ele.uploadPath[0].disabled = true
                } else if (ele.status[0].id == '') {
                    ele.dates[0].disabled = true
                    ele.shiftCode[0].disabled = true
                    ele.reasonId[0].disabled = false
                    ele.reason[0].disabled = false
                    ele.location[0].disabled = false
                    ele.timeFrom[0].disabled = false
                    ele.timeTo[0].disabled = false
                    ele.status[0].disabled = false
                    ele.uploadPath[0].disabled = false
                }
                this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 138 })
                this.initData()

            });

        }
    }

    async initData() {
        try {
            let value = await new Promise((resolve, reject) => {
                this.tenantService.getDropdown(this.dropdownRequest).subscribe({
                    next: (data: any) => resolve(data),
                    error: (e) => reject(e)
                });
            });

            this.dropdownOptions.purposedef = _.uniqBy(value['payload'].filter(x => x.dropdownTypeID == 138), JSON.stringify)

            console.log('1')
            console.log(value)
            console.log(this.dropdownOptions.purposedef)

        } catch (error) {
            console.error(error);
            throw error
        }

    }

    async uploadFile(event, id, names, i, x) {
        this.datasource[i].uploadPath[x].id = event.target.files[0].name;
        console.log(this.datasource[0].uploadPath.id)
        let fileName = event.target.files[0].name;
        this.fileExtension = this.getFileExtension(fileName);
        var namefile = this.fileExtension

        const fileToUpload0 = event.target.files[0];
        const name = fileToUpload0.name;

        let reduce: File;

        console.log(1)
        if (namefile == "jpg" || namefile == "png") {
            try {
                reduce = await this.reduceImageSize(fileToUpload0, 50 * 1024, 0.8);
                console.log(2)

            } catch (error) {
                console.error('Error reducing image size:', error);
                return; // If an error occurs, you might want to handle it accordingly.
            }
        } else {
            reduce = fileToUpload0

        }
        const renamedFile = new File([reduce], name, { type: reduce.type });
        if (this.imagefiless.some((x) => x.index == i)) {
            const idx = this.imagefiless.findIndex((x) => x.index == i);
            this.imagefiless[idx].files = reduce;
            this.imagefiless[idx].isupload = true;
        } else {
            const renamedFile = new File([reduce], name, { type: reduce.type });
            var inx = this.imagefiless.length == 0 ? 0 : this.imagefiless.length - 1
            for (let index = inx; index <= i; index++) {
                var isup = index == i ? true : false
                this.imagefiless.push({
                    index: index,
                    files: renamedFile,
                    isupload: isup
                });
            }

        }

        myData.fileimage = _.uniqBy([...this.imagefiless], JSON.stringify)
        var sample = myData.fileimage
        console.log(this.imagefiless)
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

    obDelete(i, x): void {

        if (x !== 0) {
            this.datasource[i].action.splice(x, 1);
            this.datasource[i].timeTo.splice(x, 1);
            this.datasource[i].dates.splice(x, 1);
            this.datasource[i].date.splice(x, 1);
            this.datasource[i].timeFrom.splice(x, 1);
            this.datasource[i].reasonId.splice(x, 1);
            this.datasource[i].location.splice(x, 1);
            this.datasource[i].reason.splice(x, 1);
            this.datasource[i].status.splice(x, 1);
            this.datasource[i].uploadPath.splice(x, 1);
            this.datasource[i].status.splice(x, 1);
            this.datasource[i].disable.splice(x, 1);
            this.datasource[i].shiftCode.splice(x, 1);
            this.datasource[i].shiftId.splice(x, 1);
            this.datasource[i].officialBusinessId.splice(x, 1);

        } else {
            this.datasource.splice(i, 1);

        }
        this.OBTable.renderRows();
    }


    public async submit(e) {


        var Rd = e.some(x => x.shiftId[0].id == 1)
        if (Rd) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.actions.confirm.color = 'primary'
            this.failedMessage.message = translate("You cannot file a Official Business on RD. Please update RD to WRD to proceed with  Change Log Filing.")
            + "<br><br>" + translate
            translate("Note: Change Log on RG and WRD will still be processed.")

            const dialogRefcl = this.message.open(this.failedMessage);
            dialogRefcl.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.submitss(e)
                }
            })

        } else {
            this.submitss(e)

        }

    }



    public async submitss(e) {
        var final = [];
        var fl = []
        e.forEach(ems => {
            var keys = Object.keys(ems);
            var maxLength = Math.max(...keys.map(key => Array.isArray(ems[key]) ? ems[key].length : 1));

            for (var i = 0; i < maxLength; i++) {
                var obj = {};
                keys.forEach(key => {

                    if (Array.isArray(e[0][key])) {
                        obj[key] = key == "timeFrom" || key == "timeTo" ? this.pipe.transform(ems[key][i].id, "yyyy-MM-ddTHH:mm") : ems[key][i].id;
                    }
                    else {
                        obj[key] = key == "timeFrom" || key == "timeTo" ? this.pipe.transform(ems[key], "yyyy-MM-ddTHH:mm") : ems[key];
                    }
                });
                final.push(obj);
            }
        });

        var ds = final.map(x => ({
            action: x.action,
            date: x.date,
            dates: x.dates,
            disabled: x.disabled,
            encryptedId: x.encryptedId,
            location: x.location,
            reason: x.reason,
            reasonId: x.reasonId,
            status: x.status,
            timeFrom: x.timeFrom,
            timeTo: x.timeTo,
            uploadPath: x.uploadPath,
            disable: x.disable,
            officialBusinessId: x.officialBusinessId,
            employeeId: x.employeeId,
            shiftCode: x.shiftCode,
            shiftId: x.shiftId

        }))

        var save = ds.filter(x => x.status != "Approved" && x.disable == false && x.reasonId != 0 && x.location != '')

        if (save.length == 0) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = translate("All fields are Required!")
            this.message.open(this.failedMessage);
            this.disabledsubmit.emit(false)
            return
        }
        console.log(this.selectedemployee)
        if (sessionStorage.getItem("action") == 'edit') {
            this.tid
        } else {
            this.tid = sessionStorage.getItem('moduleId') == "68" ? this.selectedemployee : sessionStorage.getItem('moduleId') == "160" ? this.selectedemployee : sessionStorage.getItem('u')
        }

        var cancelsave = await this.coreService.required(this.tid, save, '35', 0)
        if (cancelsave) {
            this.disabledsubmit.emit(false)
            return
        }

        save.forEach(element => {
            element.date = this.pipe.transform(element.date, 'yyyy-MM-dd')
        });

        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.isSave = true
                this.filingService.postOfficialBusiness(save, this.tid, this.late).subscribe({

                    next: (value: any) => {
                        //   Error lock cannot file ==============================
                        this.coreService.valid(value, this.late, save.length, true, ['/search/filing-view'], "").then((res) => {
                            if (res.saveNow) {
                                this.late = res.lateSave
                                this.disabledsubmit.emit(false)
                                this.submitss(e)
                                return
                            } else {
                                this.disabledsubmit.emit(false)
                            }

                            if (res.reset) {
                                this.late = false
                            }

                            this.imagefiless = myData.fileimage
                            if (this.imagefiless.length === 0) {
                                return
                            }

                            this.coreService.uploadimage(myData.fileimage, value.payload.transactionIds, this.moduleId, this.loginId)
                        })
                    },
                    error: (e) => {
                        this.isSave = false
                        this.disabledsubmit.emit(false)
                        this.message.open(FailedMessage);
                        console.error(e)
                    }
                });
            } else {
                this.disabledsubmit.emit(false)
            }
        });
    }

    edit(e, i, x) {

        this.index = i
        this.datasource[i].action[x]
        this.datasource[i].dates[x].disabled = true
        this.datasource[i].date[x].disabled = true
        this.datasource[i].reasonId[x].disabled = false
        this.datasource[i].reason[x].disabled = false
        this.datasource[i].location[x].disabled = false
        this.datasource[i].timeFrom[x].disabled = false
        this.datasource[i].timeTo[x].disabled = false
        this.datasource[i].status[x].disabled = false
        this.datasource[i].uploadPath[x].disabled = false
        this.datasource[i].disabled = false
        this.datasource[i].disable[x].id = false
        this.datasource[i].encryptedId
        this.datasource[i].officialBusinessId[x].id
        this.datasource[i].employeeId
        this.datasource[i].shiftCode.disabled = true
        this.datasource[i].shiftId.disabled = true

    }

    add(e, i, x) {

        if (this.id != "") {
            this.datasource[i].action.push({ id: this.datasource[i].action[x].id }),
                this.datasource[i].dates.push({ id: this.pipe.transform(this.datasource[i].dates[x].id, "yyyy-MM-dd"), disabled: true }),
                this.datasource[i].date.push({ id: this.pipe.transform(this.datasource[i].date[x].id, "yyyy-MM-dd"), disabled: true }),
                this.datasource[i].timeFrom.push({ id: this.pipe.transform(this.datasource[i].timeFrom[x].id, "yyyy-MM-ddT00:00"), disabled: false }),
                this.datasource[i].timeTo.push({ id: this.pipe.transform(this.datasource[i].timeTo[x].id, "yyyy-MM-ddT00:00"), disabled: false }),
                this.datasource[i].reasonId.push({ id: 0, disabled: false }),
                this.datasource[i].reason.push({ id: null, disabled: false }),
                this.datasource[i].location.push({ id: null, disabled: false }),
                this.datasource[i].uploadPath.push({ id: this.datasource[i].uploadPath[x].id, disabled: false }),
                this.datasource[i].status.push({ id: "", disabled: true }),
                this.datasource[i].disabled = true,
                this.datasource[i].encryptedId = 0,
                this.datasource[i].officialBusinessId.push({ id: 0, disabled: false }),
                this.datasource[i].employeeId
            this.datasource[i].shiftCode.push({ id: this.datasource[i].shiftCode[x].id, disabled: false }),
                this.datasource[i].shiftId.push({ id: this.datasource[i].shiftId[x].id, disabled: false })
            this.datasource[i].disable.push({ id: false })

        } else {
            this.datasource[i].action.push({ id: this.datasource[i].action[x].id })
            this.datasource[i].dates.push({ id: this.datasource[i].dates[x].id, disabled: true })
            this.datasource[i].date.push({ id: this.datasource[i].date[x].id, disabled: true })
            this.datasource[i].timeFrom.push({ id: this.pipe.transform(this.datasource[i].timeFrom[x].id, "yyyy-MM-ddT00:00"), disabled: false })
            this.datasource[i].timeTo.push({ id: this.pipe.transform(this.datasource[i].timeTo[x].id, "yyyy-MM-ddT23:59"), disabled: false })
            this.datasource[i].reasonId.push({ id: 0, disabled: false })
            this.datasource[i].reason.push({ id: null, disabled: false })
            this.datasource[i].location.push({ id: null, disabled: false })
            this.datasource[i].uploadPath.push({ id: this.datasource[i].uploadPath[x].id, disabled: false })
            this.datasource[i].status.push({ id: "", disabled: true })
            this.datasource[i].disabled = true,
                this.datasource[i].encryptedId,
                this.datasource[i].officialBusinessId.push({ id: 0, disabled: false }),
                this.datasource[i].employeeId
            this.datasource[i].shiftCode.push({ id: this.datasource[i].shiftCode[x].id, disabled: false }),
                this.datasource[i].shiftId.push({ id: this.datasource[i].shiftId[x].id, disabled: false })
            this.datasource[i].disable.push({ id: false })
        }
    }

    samedate(e, i, x) {

        var tf = this.pipe.transform(this.datasource[i].timeFrom[x].id, 'yyyy-MM-dd HH:mm')
        var tt = this.pipe.transform(this.datasource[i].timeTo[x].id, 'yyyy-MM-dd HH:mm')

        var date = this.pipe.transform(this.datasource[i].date[i].id, 'yyyy-MM-dd')

        var datess = date + ' 00:00'
        var datestos = date + ' 23:59'

        var tfparent = this.pipe.transform(this.datasource[i].timeFrom[i].id, date + ' HH:mm')
        var ttparent = this.pipe.transform(this.datasource[i].timeTo[i].id, date + ' HH:mm')

        if (new Date(tf) == new Date(tt)) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = translate("Please Change your DateFrom and DateTo")
            const dialogRef = this.message.open(this.failedMessage);
            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.datasource[i].reasonId[x].id = 0
                    this.pushEvent.emit(true)
                }
            })
            return
        } else if (new Date(tfparent) == new Date(ttparent)) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = translate("Please Change your DateFrom and DateTo")
            const dialogRef = this.message.open(this.failedMessage);
            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.datasource[i].reasonId[i].id = 0
                    this.pushEvent.emit(true)
                }
            })
            return
        } else if (tf == datess && tt == datestos) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = translate("Please Change your DateFrom and DateTo")
            const dialogRef = this.message.open(this.failedMessage);
            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.datasource[i].reasonId.forEach(dis => {
                        dis.disabled = true
                    });
                    this.pushEvent.emit(true)
                }
            })
            return
        }
        else {
            this.pushEvent.emit(false)
            this.datasource[i].reasonId.forEach(dis => {
                dis.disabled = false
            });
            this.datasource[i].timeTo.forEach(dis => {
                dis.disabled = false
            });
        }

    }

    getFormattedTimeValue(): string {
        return moment(this.officialBForm.value.timeFrom).format('hh:mm a');
    }

    validation(e, i, x, d, data) {
        // var event = e
        // var indexparent = i
        // var indexchild = x
        // var name = d
        // var value = data

        for (let index = 0; index < this.datasource[i].timeFrom.length; index++) {
            //date parent
            var date = this.pipe.transform(this.datasource[i].date[x].id, 'yyyy-MM-dd')
            //parent
            var from = this.pipe.transform(this.datasource[i].timeFrom[index].id, date + ' HH:mm')
            var to = this.pipe.transform(this.datasource[i].timeTo[index].id, date + ' HH:mm')
            // child
            var tf = this.pipe.transform(this.datasource[i].timeFrom[x].id, date + ' HH:mm')
            var tt = this.pipe.transform(this.datasource[i].timeTo[x].id, date + ' HH:mm')

            if (from == to) {
                this.failedMessage.title = translate("Warning!")
                var mess = d == "datefrom" ? translate("Time-From is equal to Time-To") : translate("Time-To is equal to Time-From")
                this.failedMessage.message = mess
                this.message.open(this.failedMessage);
                this.datasource[i].reasonId.forEach(dis => {
                    dis.disabled = true
                });
                this.pushEvent.emit(true)
                return
            } else {
                this.datasource[i].reasonId.forEach(dis => {
                    dis.disabled = false
                });
                this.pushEvent.emit(false)
            }

            if (index == x) {
                //do nothing on self
            } else {
                debugger
                var now = this.pipe.transform(e.value, 'yyyy-MM-dd HH:mm')
                const dateFrom = new Date(from);
                const dateTo = new Date(to);
                const today = new Date(now);
                const datef = new Date(tf);
                const datet = new Date(tt)

                var test1 = today > dateFrom && today < dateTo
                var test2 = datef > dateFrom && datef < dateTo
                var test3 = today > dateFrom && datef < dateTo
                var test4 = dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo < datet
                var test5 = today <= dateTo && datet >= dateFrom

                if ((today > dateFrom && today < dateTo) ||
                    (datef > dateFrom && datef < dateTo) ||
                    (today > dateFrom && datef < dateTo) ||
                    (dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo < datet) ||
                    (today < dateTo && datet > dateFrom)) {

                    this.failedMessage.title = translate("Warning!")
                    this.failedMessage.message = translate("This schedule is between to other schedule")
                    this.message.open(this.failedMessage);
                    if (d == 'datefrom') {
                        this.datasource[i].reasonId.forEach(dis => {
                            dis.disabled = true
                        });
                        this.pushEvent.emit(true)
                        return
                    } else {
                        this.datasource[i].reasonId.forEach(dis => {
                            dis.disabled = true
                        });
                        this.pushEvent.emit(true)
                        return
                    }
                } else {
                    this.pushEvent.emit(false)
                    this.datasource[i].reasonId.forEach(dis => {
                        dis.disabled = false
                    });
                }

            }
        }

    }

    date_min_max(e, x, isMin, date, i) { // for DateFrom only
        var df = this.pipe.transform(e.timeFrom[x].id, 'yyyy-MM-dd 00:00')
        var dt = this.pipe.transform(e.timeTo[x].id, 'yyyy-MM-dd 23:59')
        var datemin = new Date(df)
        var datemax = new Date(dt)
        this.mins = new Date(datemin)
        this.maxs = new Date(datemax)

        var min = new Date(datemin.setDate(datemin.getDate() - 1))
        var max = new Date(datemax.setDate(datemax.getDate() + 1))
        return isMin ? min : max
    }

    date_min_max_to(e, x, isMin, date, i) { //for DateTo Only
        var df = this.pipe.transform(e.timeFrom[x].id, 'yyyy-MM-dd 00:00')
        var dt = this.pipe.transform(e.timeTo[x].id, 'yyyy-MM-dd 23:59')
        var datemin = new Date(df)
        var datemax = new Date(dt)
        this.mins = new Date(datemin)
        this.maxs = new Date(datemax)

        var min = new Date(datemin.setDate(datemin.getDate() - 1))
        var max = new Date(datemax.setDate(datemax.getDate() + 1))
        return isMin ? min : max
    }

    setdatefrom(e, x, i) {

        if (x !== 0) {
            e.timeFrom[x].id = new Date(this.pipe.transform(e.date[x].id, "yyyy-MM-dd 00:00"))
        }
    }


    timevalidate(e, a, i,x) {
        debugger
        var origfrom
        var datedromvalidate
        var starttime
        var datetovalidate

        if (a == "df" && x == 0) {

            origfrom = new Date(e.timeFrom[i].id)
            datedromvalidate = new Date(e.timeFrom[i].id)
            starttime = datedromvalidate.setHours(datedromvalidate.getHours() + 1);
            e.timeTo[i].id = new Date(this.pipe.transform(starttime, "yyyy-MM-ddTHH:mm:ss"))
            datetovalidate = new Date(e.timeTo[i].id)
        }else if(a == "df" && x > 0){
            debugger
            origfrom = new Date(e.timeFrom[x].id)
            datedromvalidate = new Date(e.timeFrom[x].id)
            starttime = datedromvalidate.setHours(datedromvalidate.getHours() + 1);
            e.timeTo[x].id = new Date(this.pipe.transform(starttime, "yyyy-MM-ddTHH:mm:ss"))
            datetovalidate = new Date(e.timeTo[x].id)
        }
        else{
            datedromvalidate = new Date(e.timeFrom[i].id)
            datetovalidate = new Date(e.timeTo[i].id)
        }

        if (origfrom > datetovalidate) {
            var message = a == "df" ? translate("Start Time Overlap to End Time") : translate("End Time Overlap to Start Time")
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = message
            this.message.open(this.failedMessage);
            this.disabledsubmit.emit(true)
            return

        } else {
            this.disabledsubmit.emit(false)
        }
    }

}
