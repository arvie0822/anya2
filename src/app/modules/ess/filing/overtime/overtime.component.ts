import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { otTable, Overtime, overtimeField, overtimefields, Overtimes } from 'app/model/administration/filing';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FilingService } from 'app/services/filingService/filing.service';
import { MasterService } from 'app/services/masterService/master.service';
import { ShiftService } from 'app/services/shiftService/shift.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { ReplaySubject, Subject, async, debounceTime, distinctUntilChanged, forkJoin, takeUntil } from 'rxjs';
import _, { deburr, drop } from 'lodash';
import { SystemSettings } from 'app/model/app.constant';
import { myData } from 'app/model/app.moduleId';

// ==========import for format of date ==========================================
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatDateAdapter, } from '@angular-material-components/datetime-picker';
import { StorageServiceService } from 'app/services/storageService/storageService.service';
import { CoreService } from 'app/services/coreService/coreService.service';
import { GF, } from 'app/shared/global-functions';
import { TableRequest } from 'app/model/datatable.model';
import { fuseAnimations } from '@fuse/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';
import { translate, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';


// =================== For date time picker ============================
const CUSTOM_DATE_FORMATS = {
    parse: {
        dateInput: 'MM/DD/YYYY hh:mm A',
    },
    display: {
        dateInput: 'MM/DD/YYYY hh:mm A',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'MM/DD/YYYY HH:mm A',
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
    selector: 'app-overtime',
    templateUrl: './overtime.component.html',
    styleUrls: ['./overtime.component.css'],
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
        // ============= For date time picker =============
        { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
        { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }

    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatMenuModule,
    TranslocoModule,
    MatTooltipModule,
    TranslocoModule
],
})
export class OvertimeComponent implements OnInit {
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
    approved: boolean = false
    public color: ThemePalette = 'primary';
    isSave: boolean = false
    dropdownOptions = new DropdownOptions
    dropdownFixRequest = new DropdownRequest
    dropdownRequest = new DropdownRequest
    dropdownRequest0 = new DropdownRequest
    id: string
    editing = false
    index = 0
    dropdowns: any = []
    @Output() validate = new EventEmitter<any>();
    @Output() pushEvent = new EventEmitter<any>();
    @Output() pushindex = new EventEmitter<any>();
    @Input() moduleid : any
    @ViewChild('OTTable') OTTable: MatTable<any>;
    pipe = new DatePipe('en-US');
    @Input() datasource: any
    @Input() selectedemployee: any
    public statusArray: any[];
    inputChangeParent: UntypedFormControl = new UntypedFormControl();
    optionsParent: any[] = [];
    dataparent: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    indexParent: number = 1
    complete: boolean = false
    systemSettings = SystemSettings
    min = new Date()
    disabledbutton: boolean = false
    action: string = ""
    shiftidcode: number = 0
    request: any
    otype = []
    ottiming = []
    shiftdrop = []
    protected _onDestroy = new Subject<void>();
    overtime: FormGroup
    otform: FormGroup
    type: number
    leaveForm: FormGroup
    imageUrl: any
    OTSource: Overtimes[] = [];
    otColumns: string[] = ['otaction', 'otdate', 'otshift', 'overtime_type', 'ot_start', 'ot_end', 'otreason', 'status', 'uploadFileot'];
    columns: string[] = ['action', 'monday'];
    filename = ""
    failedMessage = { ...FailedMessage}
    shiftin: any
    shiftout: any
    tid : any
    fileExtension: string | undefined;
    imagefiless : any = []
    moduleId: any
    loginId = 0
    idsimage : any = []

    postinterval : any = []
    preinterval : any = []
    rdhdinterval : any = []

    postspecific : any = []
    prespecific : any = []
    rdhdspecific : any = []

    editbutton : boolean = false
    addbutton : boolean = false
    disabledottype : boolean = false
    schedin : any
    schedout : any
    start : any
    end : any
    dateidentifind : any
    @Output() employeeIds = new EventEmitter<any>();
    @Output() disabledsubmit = new EventEmitter<any>();
    constructor(private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private message: FuseConfirmationService,
        private shiftService: ShiftService,
        private router: Router,
        private filingService: FilingService,
        private route: ActivatedRoute,
        private tenantService: TenantService,
        private coreService: CoreService,
        private storageServiceService : StorageServiceService,
        private translocoService : TranslocoService,
        private masterService: MasterService) { }
        isflexivalida : boolean
        late : boolean = false
        saveMessage = { ...SaveMessage}
    ngOnInit() {
        this.disabledsubmit.emit(false)
        this.overtime = this.fb.group(new Overtimes());
        this.otform = this.fb.group(new otTable());
        this.optionsParent = []
        this.disabledottype = false
        this.shiftidcode = myData.shiftCode

        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id !== "") {
            this.action = sessionStorage.getItem("action")
            this.moduleId = "36"
            if (this.action == 'edit') {
                setTimeout(() => {
                    this.filingService.getOvertime(this.id).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.dropdownRequest0.id.push({ dropdownID: value.payload.shiftId == null ? 0 : value.payload.shiftId, dropdownTypeID: 0 })
                                this.coreService.encrypt_decrypt(true, [value.payload.employeeId.toString()])
                                .subscribe({
                                    next: (value: any) => {
                                        this.tid = value.payload[0]
                                        this.ottype()
                                        this.initData()
                                    },
                                    error: (e) => {
                                        console.error(e)
                                    },
                                    complete: () => {

                                    }
                                });
                                this.datasource.push({
                                    overtimeId: [{id : value.payload.overtimeId}],
                                    overtimeCode: value.payload.overtimeCode,
                                    otaction: [{ id: value.payload.otaction }],
                                    otdate: [{ id: this.pipe.transform(value.payload.date, "MM-dd-yyyy"), disable : true }],
                                    otshift: [{ id: value.payload.shiftId , disable : true }],
                                    overtime_type: [{ id: value.payload.overtimeTypeId , disable : false }],
                                    // ottiming: [{ id: value.payload.timingId , disable : false }],
                                    ot_start: [{ id: this.pipe.transform(value.payload.otStart, "yyyy-MM-ddTHH:mm:ss"), disable : false  }],
                                    ot_end: [{ id: this.pipe.transform(value.payload.otEnd, "yyyy-MM-ddTHH:mm:ss"), disable : false }],
                                    otreason: [{ id: value.payload.reason , disable : false }],
                                    uploadFileot: [{ id: value.payload.uploadPath , disable : false }],
                                    shiftCode: [{ id: value.payload.overtimeCode , disable : true }],
                                    status: [{ id: value.payload.status, disable : true  }],
                                    disabled: [{ id: true, disable: false }],
                                    subShiftId : value.payload.subShiftId,
                                    lateFiling: false,
                                    isUpload: false,
                                    disable: true,
                                    // encryptedId: value.payload.encryptedId,
                                })


                                this.employeeIds.emit(value.payload.employeeId)
                                this.OTTable.renderRows()
                                this.datasource.forEach(element => {
                                    element.otshift.forEach(item => {
                                        this.dropdownRequest0.id.push({ dropdownID: item.id == null ? 0 : item.id, dropdownTypeID: 0 })
                                    });

                                });
                            }
                            else {
                                console.log(value.stackTrace)
                                console.log(value.message)
                            }
                            var action = sessionStorage.getItem("action")
                            if (action == "view") {
                                this.disabledbutton = true
                            } else if (action == "edit") {
                                this.disabledbutton = false
                            }
                        },
                        error: (e) => {
                            console.error(e)
                        }
                    });
                }, 2000);
            }else if(this.action == 'view'){
                setTimeout(() => {
                    this.filingService.getOvertime(this.id).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.dropdownRequest0.id.push({ dropdownID: value.payload.shiftId == null ? 0 : value.payload.shiftId, dropdownTypeID: 0 })
                                this.coreService.encrypt_decrypt(true, [value.payload.employeeId.toString()])
                                .subscribe({
                                    next: (value: any) => {
                                        this.tid = value.payload[0]
                                        this.ottype()
                                        this.initData()
                                    },
                                    error: (e) => {
                                        console.error(e)
                                    },
                                    complete: () => {

                                    }
                                });
                                this.datasource.push({
                                    overtimeId: [{id : value.payload.overtimeId}],
                                    overtimeCode: value.payload.overtimeCode,
                                    otaction: [{ id: value.payload.otaction }],
                                    otdate: [{ id: this.pipe.transform(value.payload.date, "MM-dd-yyyy"), disable : true }],
                                    otshift: [{ id: value.payload.shiftId , disable : true }],
                                    overtime_type: [{ id: value.payload.overtimeTypeId , disable : false }],
                                    // ottiming: [{ id: value.payload.timingId , disable : false }],
                                    ot_start: [{ id: this.pipe.transform(value.payload.otStart, "yyyy-MM-ddTHH:mm:ss"), disable : false  }],
                                    ot_end: [{ id: this.pipe.transform(value.payload.otEnd, "yyyy-MM-ddTHH:mm:ss"), disable : false }],
                                    otreason: [{ id: value.payload.reason , disable : false }],
                                    uploadFileot: [{ id: value.payload.uploadPath , disable : false }],
                                    shiftCode: [{ id: value.payload.overtimeCode , disable : true }],
                                    status: [{ id: value.payload.status, disable : true  }],
                                    disabled: [{ id: true, disable: false }],
                                    subShiftId : value.payload.subShiftId,
                                    lateFiling: false,
                                    isUpload: false,
                                    disable: true,
                                    // encryptedId: value.payload.encryptedId,
                                })

                                this.disabledsubmit.emit(true)
                                this.employeeIds.emit(value.payload.employeeId)
                                this.OTTable.renderRows()
                                this.datasource.forEach(element => {
                                    element.otshift.forEach(item => {
                                        this.dropdownRequest0.id.push({ dropdownID: item.id == null ? 0 : item.id, dropdownTypeID: 0 })
                                    });

                                });
                            }
                            else {
                                console.log(value.stackTrace)
                                console.log(value.message)
                            }
                            var action = sessionStorage.getItem("action")
                            if (action == "view") {
                                this.disabledbutton = true
                            } else if (action == "edit") {
                                this.disabledbutton = false
                            }
                        },
                        error: (e) => {
                            console.error(e)
                        }
                    });
                }, 2000);
            }

        } else {
            this.datasource.forEach(element => {
                element.otshift.forEach(item => {
                    this.dropdownRequest0.id.push({ dropdownID: item.id == null ? 0 : item.id, dropdownTypeID: 0 })
                });
            });
            this.ottype()
            // console.log('ottype 1')
            setTimeout(() => {
                this.initData()
                this.cd.detectChanges()
            // console.log('ottype 2')
            }, 2000);

        }

    }

    get tb() {
        return this.otform.value
    }

    ngOnChanges() {
    }




    async uploadFile(event, id,names ,i,x) {
        this.datasource[i].uploadFileot[x].id = event.target.files[0].name;
        let fileName = event.target.files[0].name;
        this.fileExtension = this.getFileExtension(fileName);
        var namefile =  this.fileExtension

        const fileToUpload0 = event.target.files[0];
        const name = fileToUpload0.name;

        let reduce: File;

        // console.log(1)
        if (namefile == "jpg" || namefile == "png") {
            try {
            reduce = await this.reduceImageSize(fileToUpload0, 50 * 1024 , 0.8);
        // console.log(2)

            } catch (error) {
            // console.error('Error reducing image size:', error);
            return; // If an error occurs, you might want to handle it accordingly.
            }
        }else{
            reduce = fileToUpload0

        }

        const renamedFile = new File([reduce], name, { type: reduce.type });
        if (this.imagefiless.some((x) => x.index == i)) {
            const idx = this.imagefiless.findIndex((x) => x.index == i);
            this.imagefiless[idx].files = reduce;
            this.imagefiless[idx].isupload = true;
        } else {
            const renamedFile = new File([reduce], name, { type: reduce.type });
            var inx = this.imagefiless.length == 0 ? 0 : this.imagefiless.length -1
            for (let index = inx; index <= i ; index++) {
                var isup = index == i? true : false
                this.imagefiless.push({
                    index: index,
                    files: renamedFile,
                    isupload : isup
                });
            }

        }

       myData.fileimage = _.uniqBy([...this.imagefiless ], JSON.stringify)
       var sample = myData.fileimage
    //    console.log(this.imagefiless)

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

    getFileExtension(fileName: string): string {
        // Use regex to extract the file extension from the file name
        const match = /\.([0-9a-z]+)(?:[\?#]|$)/i.exec(fileName);
        if (match && match[1]) {
            return match[1].toLowerCase(); // Convert to lowercase if needed
        } else {
            return 'Unknown';
        }
    }

    handleDeleteBreak(i, x): void {

        if (x !== 0) {
            this.datasource[i].otaction.splice(x, 1);
            this.datasource[i].otdate.splice(x, 1);
            this.datasource[i].otshift.splice(x, 1);
            this.datasource[i].overtime_type.splice(x, 1);
            // this.datasource[i].ottiming.splice(x, 1);
            this.datasource[i].ot_start.splice(x, 1);
            this.datasource[i].ot_end.splice(x, 1);
            this.datasource[i].otreason.splice(x, 1);
            this.datasource[i].uploadFileot.splice(x, 1);
            this.datasource[i].status.splice(x, 1);
            this.datasource[i].shiftCode.splice(x, 1);
            this.datasource[i].disabled.splice(x, 1);
            this.datasource[i].overtimeId.splice(x, 1);
        } else {
            this.datasource.splice(i, 1);
        }

        this.OTTable.renderRows();
    }

    isEdit(i, x,e) {

        this.datasource[i].otaction[x].disable = false
        this.datasource[i].otdate[x].disable = false
        this.datasource[i].otshift[x].disable = false
        this.datasource[i].overtime_type[x].disable = false
        // this.datasource[i].ottiming[x].disable = false
        this.datasource[i].ot_start[x].disable = false
        this.datasource[i].ot_end[x].disable = false
        this.datasource[i].otreason[x].disable = false
        this.datasource[i].uploadFileot[x].disable = false
        this.datasource[i].status[x].disable = false
        this.datasource[i].shiftCode[x].disable = false
        this.datasource[i].disabled[x].id = true
        this.datasource[i].disable
        this.datasource[i].overtimeId
        this.datasource[i].overtimeCode
        this.datasource[i].subShiftId
        this.datasource[i].lateFiling
        this.datasource[i].isUpload
        this.datasource[i].date
        this.editbutton = e
        this.initData()
    }

    public async submit(e) {
        if (sessionStorage.getItem('moduleId') == "68" || sessionStorage.getItem('moduleId') == "160") {
            if(this.action == 'edit'){
                this.idsimage = this.tid
            }else{
                this.idsimage = this.selectedemployee
            }

        }else{
            this.idsimage = [sessionStorage.getItem("u")]
        }

        var id = [sessionStorage.getItem("u")]
        this.coreService.encrypt_decrypt(false, this.idsimage)
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

        var final = [];
        var fl = []
        e.forEach(ems => {
            var keys = Object.keys(ems);
            var maxLength = Math.max(...keys.map(key => Array.isArray(ems[key]) ? ems[key].length : 1));

            for (var i = 0; i < maxLength; i++) {

                var obj = {};
                keys.forEach(key => {
                    if (Array.isArray(e[0][key])) {
                        obj[key] = key == "ot_start" || key == "ot_end" ? this.pipe.transform(ems[key][i].id, "yyyy-MM-ddTHH:mm:ss") : ems[key][i].id;
                    }
                    else {
                        obj[key] = key == "ot_start" || key == "ot_end" ? this.pipe.transform(ems[key], "yyyy-MM-ddTHH:mm:ss") : ems[key];
                    }
                });

                final.push(obj);
            }

        });

        var ds = final.map(x => ({
            overtimeId: x.overtimeId,
            overtimeCode: x.overtimeCode,
            otaction: x.otaction,
            date: x.otdate,
            shiftId: x.otshift,
            overtimeTypeId: x.overtime_type,
            // timingId: x.ottiming,
            otStart: x.ot_start,
            otEnd: x.ot_end,
            reason: x.otreason,
            uploadPath: x.uploadFileot,
            lateFiling: false,
            subShiftId: x.subShiftId,
            isUpload: false,
            disable: x.disable,
            disabled : x.disabled,
            // encryptedId: x.encryptedId,
            status: x.status,
            shiftCode:x.shiftCode
        }))

        if (ds.length != 0) {
            var timeSet = new Set<string>();
            for (const item of ds) {
                debugger
                const startTime = item.otStart;
                const endTime = item.otEnd;
                const timeString = `${startTime}-${endTime}`;
                if(GF.IsEmpty(item.otStart) && GF.IsEmpty(item.otEnd) || GF.IsEmpty(item.otStart) || GF.IsEmpty(item.otEnd)){
                    this.failedMessage.title = translate("Warning!")
                    this.failedMessage.message = translate("Duplicate start Time and End time!")
                    this.message.open(this.failedMessage);
                    this.disabledsubmit.emit(false)
                    return
                }else{
                    if (timeSet.has(timeString)) {
                        this.failedMessage.title = "Warning!"
                        this.failedMessage.message = "Duplicate start Time and End time!"
                        this.message.open(this.failedMessage);
                        this.disabledsubmit.emit(false)
                        return
                    }else{
                        this.disabledsubmit.emit(true)

                    }
                    timeSet.add(timeString);
                }
            }
        }

        var save = ds.filter(x => x.status != "Approved" && x.disabled == true)
        var validateovertimeTypeId = ds.some(x => GF.IsEmpty(x.overtimeTypeId))
        var index = ds.findIndex(x => GF.IsEmpty(x.overtimeTypeId));
        var samedate =  ds.filter(y => y.otStart == y.otEnd)

        if (save.length == 0) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = translate("No overtime changes!")
            this.message.open(this.failedMessage);
            this.disabledsubmit.emit(false)
            return
        }

        if (validateovertimeTypeId) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = translate("Overtime Type is required at Date " + ds[index].date + "!")
            this.message.open(this.failedMessage);
            this.disabledsubmit.emit(false)
            return
        }


        debugger
        if (samedate.length > 0) {
            this.failedMessage.title = "Warning!"
            this.failedMessage.message = "Start Time is equal to End Time!"
            this.message.open(this.failedMessage);
            this.disabledsubmit.emit(false)
            return
        }


        if (sessionStorage.getItem("action") == 'edit') {
            // console.log(this.tid)
            this.tid
        }else{
            // this.tid = sessionStorage.getItem('moduleId') == "68" ? this.selectedemployee : sessionStorage.getItem('u')
            this.tid = sessionStorage.getItem('moduleId') == "68" ? this.selectedemployee : sessionStorage.getItem('moduleId') == "160" ? this.selectedemployee : sessionStorage.getItem('u')
        }
        var cancelsave =  await this.coreService.required(this.tid,save,'36',0)
        if (cancelsave) {
            this.disabledsubmit.emit(false)
            return
        }

        save.forEach(element => {
            element.date = this.pipe.transform(element.date, 'yyyy-MM-dd')
        });

        const dialogRef =  this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.isSave = true
                this.filingService.postOvertime(save, this.tid,this.late).subscribe({
                    next: (value: any) => {
                        this.coreService.valid(value, this.late, save.length,true,['/search/filing-view'],"").then((res)=>{
                            if (res.saveNow) {
                                this.late = res.lateSave
                                this.disabledsubmit.emit(false)
                                this.submit(e)
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

                            this.coreService.uploadimage(myData.fileimage,value.payload.transactionIds,'36',this.loginId)
                        })
                    },
                    error: (e) => {
                        this.isSave = false
                        this.disabledsubmit.emit(false)
                        this.message.open(FailedMessage);
                        console.error(e)
                    }
                });
            }else{
                this.disabledsubmit.emit(false)
            }
        });
    }

    returnList(i, obj) {

        return this.optionsParent[i]?.[obj] || []
    }

    initData() {

        if (this.action == 'edit') {
            this.tid
        }else{
            this.tid = sessionStorage.getItem('u')
        }
        this.datasource.forEach(element => {
            element.otshift.forEach(item => {
                this.dropdownRequest0.id.push({ dropdownID: item.id == null ? 0 : item.id, dropdownTypeID: 0 })
            });
        });

        this.datasource
        this.request = {
            moduleId: this.moduleid,
            subModuleId: 0,
            dateFrom: new Date(),
            dateTo: new Date(),
            overtimeTiming: 0,
            shiftId: 0,
            leaveFilingType: 0,
            targetId: GF.IsEmpty(this.selectedemployee) ? this.tid : this.selectedemployee,
            date :  this.pipe.transform(new Date() , 'yyyy-MM-dd')
        }

        forkJoin({
            fix: this.masterService.getDropdownFix(this.dropdownFixRequest),
            validationtype: this.filingService.getFilingValidationOnUI(this.request),
            shift: this.shiftService.getShiftPerDayDropdown(this.dropdownRequest0),
        })
        .subscribe({
            next: (response) => {
                this.disabledottype = true
                this.datasource.forEach((elements , index) => {
                    this.otype =  response.fix.payload.filter(x => x.dropdownTypeID == 52)
                    // this.ottiming = response.fix.payload.filter(x => x.dropdownTypeID == 70)
                    debugger
                    if (elements.status[0].id == "" || this.editbutton || this.addbutton) {
                        this.otype = this.action == "view" ? this.otype : _.uniqBy([...this.otype.filter(x => response.validationtype.payload.overtimeType.includes(x.dropdownID))], JSON.stringify)
                        // this.ottiming = this.action == "view" ? this.ottiming : _.uniqBy([...this.ottiming.filter(x => response.validationtype.payload.otTiming.includes(x.dropdownID))], JSON.stringify)
                    }
                    else if(elements.status[0].id  !== "" ){
                        this.otype =  _.uniqBy([...this.otype.filter(x => response.validationtype.payload.overtimeType.includes(x.dropdownID))], JSON.stringify)
                        // this.ottiming = _.uniqBy([...this.ottiming.filter(x => response.validationtype.payload.otTiming.includes(x.dropdownID))], JSON.stringify)
                    }


                    if (this.datasource.length > 0) {
                        if (this.optionsParent.length > 0) {
                            // for (let index = 0; index < this.datasource.length; index++) {
                                if (this.optionsParent[index]) {
                                    this.optionsParent[index].shiftCodeDef = this.shiftdrop,
                                    this.optionsParent[index].overtimeTypeDef = this.otype
                                    console.log('test2')
                                    this.disabledottype = false
                                    // this.optionsParent[index].overtimeTimingDef = this.ottiming
                                }
                            // }
                        }
                    }

                });
                // this.shiftdrop = this.action == "view" ? this.shiftdrop : this.shiftdrop

                // console.log(this.optionsParent)
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
                this.inputChangeParent.valueChanges.
                pipe(debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this._onDestroy)).subscribe(() => {
                    this.handlerSearcParent()
                });

            },

        });

        setTimeout(() => {
            this.datasource.forEach(element => {

                if (element.status[0].id == "") {
                    // element.ottiming[0].disable = false
                    element.overtime_type[0].disable = false
                    element.ot_start[0].disable = false
                    element.ot_end[0].disable = false
                    element.otreason[0].disable = false
                    element.uploadFileot[0].disable = false
                    element.disable = false
                }
            });
        }, 1000);
    }


    add(x, i,e,t) {
        debugger

        if (this.id != "") {
            this.datasource[i].otaction.push({ id: "" })
            this.datasource[i].otdate.push({ id: this.datasource[i].otdate[x].id, disable: true })
            this.datasource[i].otshift.push({ id: this.datasource[i].otshift[x].id, disable: true })
            this.datasource[i].overtime_type.push({ id: 0, disable: false })
            // this.datasource[i].ottiming.push({ id: 0, disable: false })
            var adddhours = new Date(this.datasource[i].ot_end[x].id)
            this.datasource[i].ot_start.push({ id: adddhours, disable:false})
            var endhours = new Date(e.ot_end[x].id)
            var finalhours = new Date(endhours.setHours(endhours.getHours()+1))
            this.datasource[i].ot_end.push({ id: finalhours , disable: false })
            this.datasource[i].otreason.push({ id: "", disable: false })
            this.datasource[i].uploadFileot.push({ id: this.datasource[i].uploadFileot[x].id, disable: false })
            this.datasource[i].status.push({ id: "", disable: true })
            this.datasource[i].shiftCode.push({ id:  this.datasource[i].shiftCode[x].id, disable: true })
            this.datasource[i].disabled.push({id : true , disable: true })
            this.datasource[i].disable
            this.datasource[i].overtimeId.push({id: 0}),
            this.datasource[i].overtimeCode
            this.datasource[i].subShiftId
            this.datasource[i].lateFiling
            this.datasource[i].isUpload
            this.datasource[i].date
            this.addbutton = e
            // this.datasource[i].encryptedId = this.id
        }else{
            if (!GF.IsEmpty(e.overtime_type[x].id)) {
                this.datasource[i].otaction.push({ id: "" })
            this.datasource[i].otdate.push({ id: this.datasource[i].otdate[x].id, disable: true })
            this.datasource[i].otshift.push({ id: this.datasource[i].otshift[x].id, disable: true })
            this.datasource[i].overtime_type.push({ id: 0, disable: false })
            // this.datasource[i].ottiming.push({ id: 0, disable: false })
            var adddhours = new Date(this.datasource[i].ot_end[x].id)
            this.datasource[i].ot_start.push({ id: adddhours, disable:false})
            var endhours = new Date(e.ot_end[x].id)
            var finalhours = new Date(endhours.setHours(endhours.getHours()+1))
            this.datasource[i].ot_end.push({ id: finalhours , disable: false })
            this.datasource[i].otreason.push({ id: "", disable: false })
            this.datasource[i].uploadFileot.push({ id: this.datasource[i].uploadFileot[x].id, disable: false })
            this.datasource[i].status.push({ id: "", disable: true })
            this.datasource[i].shiftCode.push({ id: "", disable: true })
            this.datasource[i].disabled.push({ id: true, disable: true })
            this.datasource[i].disable
            this.datasource[i].overtimeId.push({id: 0}),
            this.datasource[i].subShiftId
            this.datasource[i].lateFiling
            this.datasource[i].isUpload
            this.datasource[i].date
            this.addbutton = e
            this.initData()
            }else{
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.message = translate("Please select Overtime Type")
                this.message.open(this.failedMessage);
            }
        }
    }

    cancel(e) {
        // cancelChangeSchedule

        SaveMessage.message = "Are you sure you want to Cancel ?"
        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.isSave = true
                this.filingService.cancelOvertime(e,this.late).subscribe({

                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            SuccessMessage.message = "Cancelation Success"
                            this.message.open(SuccessMessage);
                            this.isSave = false
                        }
                        else if(value.payload.lockingState == 2 && value.payload.valiationState == 2 || value.payload.lockingState == 2 && value.payload.valiationState == 0){
                            this.failedMessage.message = "Filing for this cutoff is fully locked"
                            this.failedMessage.actions.cancel.show = false
                            this.message.open(this.failedMessage);

                            // valid but not validated =========================
                        }else if( value.payload.lockingState == 0 && value.payload.valiationState == 1){
                            this.failedMessage = value.message
                            this.message.open(this.failedMessage);

                            // late but validated =================================
                        }else if( value.payload.lockingState == 1 && value.payload.valiationState == 0){
                            this.saveMessage.message = "This will be tagged as Late Cancel'. Continue?"
                            const dialogRef = this.message.open(this.saveMessage);
                            dialogRef.afterClosed().subscribe((result) => {
                                if (result == "confirmed") {
                                    this.filingService.cancelOvertime(e,this.late = true).subscribe({
                                        next: (value: any) => {
                                            if (value.statusCode == 200) {
                                                this.message.open(SuccessMessage);
                                                this.isSave = false
                                                this.router.navigate(['/detail/filing-view']);
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            FailedMessage.message = value.message
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

    getShiftOT(e) {
        // console.log(e)
        this.validate.emit(e)
    }

    getNextBatchParent() {

        if (!this.complete) {
            const search = this.inputChangeParent.value?.toLowerCase()

            if (search) {
                this.dropdownRequest.search = search
            }
            this.dropdownRequest.search = null
            this.dropdownRequest.start = this.indexParent++
            this.dropdownRequest.id = []
            this.dropdownRequest.length = 10000
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })


            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {
                    this.optionsParent = _.uniqBy([...this.optionsParent, ...value.payload], JSON.stringify)
                    this.optionsParent = this.optionsParent.filter(item => item.dropdownID && item.dropdownID)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.dataparent.next(this.optionsParent);
                    // console.log(this.dataparent)
                },
            });
        }
    }

    handlerSearcParent() {

        const search = this.inputChangeParent.value?.toLowerCase()
        if (!search) {

            this.dataparent.next(this.optionsParent)
        }
        else {
            this.dropdownRequest.search = search
            this.dropdownRequest.id = []
            this.dropdownRequest.length = 10000
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: this.type })

            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {
                    this.optionsParent = _.uniqBy([...this.optionsParent, ...value.payload], JSON.stringify)
                    this.optionsParent = this.optionsParent.filter(item => item.dropdownID && item.dropdownID)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.dataparent.next(this.optionsParent.filter(x => x.description.toLowerCase().indexOf(search) > -1));
                },
            });
            // }
        }
    }


    samedate(i, x) {

        // if (this.datasource[i].otdate[x].id != null || "") {
        //     var timein = moment(new Date).format('HH:mm:ss')
        //     var timeinou = moment(new Date).format('HH:mm:ss')
        //     var date = moment(this.datasource[i].otdate[x].id).format('yyyy-MM-DD')

        //     this.datasource[i].ot_start[x].id = (date + "T" + timein)
        //     this.datasource[i].ot_end[x].id = (date + "T" + timeinou)

        // }
        // this.datasource[i].timeIn = (date + " " + timeinou)
        // this.datasource[i].timeOut = (date + " " + timeinou)
    }

    ottype() {
        debugger
        this.disabledottype = true
        this.dropdownFixRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 52 },
            { dropdownID: 0, dropdownTypeID: 70 }
        )
        if (this.action == 'edit') {
            this.tid
        }else{
            this.tid = sessionStorage.getItem('u')
        }

        forkJoin({
            fix: this.masterService.getDropdownFix(this.dropdownFixRequest),
            shiftiddrop: this.shiftService.getShiftPerDayDropdown(this.dropdownRequest0),
        })

            .subscribe({
                next: (response) => {
                    // console.log("ottype 1")
                    this.disabledottype = true
                    this.otype = response.fix.payload.filter(x => x.dropdownTypeID == 52)


                    // this.ottiming = response.fix.payload.filter(x => x.dropdownTypeID == 70)
                    this.shiftdrop = response.shiftiddrop.payload

                    for (let index = 0; index < this.datasource.length; index++) {
                        this.optionsParent.push({
                            shiftCodeDef: this.shiftdrop,
                            overtimeTypeDef: this.otype,
                            // overtimeTimingDef: this.ottiming,
                        })
                    }
                    setTimeout(() => {
                        this.disabledottype = false
                    }, 3000);
                },

                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.inputChangeParent.valueChanges.
                    pipe(debounceTime(300),
                    distinctUntilChanged(),
                    takeUntil(this._onDestroy)).subscribe(() => {
                        this.handlerSearcParent()
                    });

                },

            });

        this.datasource.forEach(element => {

            if (element.status[0].id == "") {
                // element.ottiming[0].disable = false
                element.overtime_type[0].disable = false
                element.ot_start[0].disable = false
                element.ot_end[0].disable = false
                element.otreason[0].disable = false
                element.uploadFileot[0].disable = false
                element.disable = false
            }
        });
    }

    timeoverlaping(time,i,name,x){
        debugger
        if (name == "end" && this.datasource[i].ot_end[x].id < this.datasource[i].ot_start[x].id){
            this.disabledsubmit.emit(true)
            var message = 'End time cannot be less than start time for this schedule'
            this.failedMessage.message = message
            this.message.open(this.failedMessage)
            return
        }else if(name == 'end'&& x > 0) {

            for (let index = 0; index < this.datasource[i].ot_start.length; index++) {
                //date parent
                var date = this.pipe.transform(this.datasource[i].otdate[x].id, 'yyyy-MM-dd')
                //parent
                var from = this.pipe.transform(this.datasource[i].ot_start[index].id,  date + ' HH:mm')
                var to = this.pipe.transform(this.datasource[i].ot_end[index].id,  date + ' HH:mm')
                // child
                var tf = this.pipe.transform(this.datasource[i].ot_start[x].id, date + ' HH:mm')
                var tt = this.pipe.transform(this.datasource[i].ot_end[x].id, date + ' HH:mm')

                if(name == 'end'&& x > 0 &&  index != x){
                    var now = this.pipe.transform(this.datasource[i].ot_end[x].id, 'yyyy-MM-dd HH:mm')
                    const dateFrom = new Date(from);
                    const dateTo = new Date(to);
                    const today = new Date(now);
                    const datef = new Date(tf);
                    const datet = new Date(tt)
                    debugger
                    var test1 = today > dateFrom && today < dateTo
                    var test2 = datef > dateFrom && datef < dateTo
                    var test3 = today > dateFrom && datef < dateTo
                    var test4 = dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo  < datet
                    var test5 = today <= dateTo && datet > dateFrom

                    if ((today > dateFrom && today < dateTo)||
                        (datef > dateFrom && datef < dateTo)||
                        (today > dateFrom && datef < dateTo) ||
                        (dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo  < datet) ||
                        (today <= dateTo && datet > dateFrom)){

                        this.failedMessage.title = "Warning!"
                        this.failedMessage.message = "This schedule is between to other schedule"
                        this.message.open(this.failedMessage);
                        this.pushEvent.emit(true)
                        return

                    } else {
                        this.pushEvent.emit(false)
                    }

                }
            }
        }else {
            this.disabledsubmit.emit(false)
        }

        if(name == 'start'){
            let dateObj = new Date(this.datasource[i].ot_start[x].id);

            // Add 1 hour
            dateObj.setHours(dateObj.getHours() + 1);
            var format = this.pipe.transform(dateObj, 'MM-dd-yy HH:mm');
            // Format it back using Angular's DatePipe (MM-dd-yy HH:mm)
            this.datasource[i].ot_end[x].id = new Date(format)

            for (let index = 0; index < this.datasource[i].ot_start.length; index++) {
                //date parent
                var date = this.pipe.transform(this.datasource[i].otdate[x].id, 'yyyy-MM-dd')
                //parent
                var from = this.pipe.transform(this.datasource[i].ot_start[index].id,  date + ' HH:mm')
                var to = this.pipe.transform(this.datasource[i].ot_end[index].id,  date + ' HH:mm')
                // child
                var tf = this.pipe.transform(this.datasource[i].ot_start[x].id, date + ' HH:mm')
                var tt = this.pipe.transform(this.datasource[i].ot_end[x].id, date + ' HH:mm')



                if(name == 'start'&& x > 0 &&  index != x){
                    var now = this.pipe.transform(this.datasource[i].ot_start[x].id, 'yyyy-MM-dd HH:mm')
                    const dateFrom = new Date(from);
                    const dateTo = new Date(to);
                    const today = new Date(now);
                    const datef = new Date(tf);
                    const datet = new Date(tt)
                    debugger

                    var test1 = today > dateFrom && today < dateTo
                    var test2 = datef > dateFrom && datef < dateTo
                    var test3 = today > dateFrom && datef < dateTo
                    var test4 = dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo  < datet
                    var test5 = today <= dateTo && datet >= dateFrom

                    if ((today > dateFrom && today < dateTo)||
                        (datef > dateFrom && datef < dateTo)||
                        (today > dateFrom && datef < dateTo) ||
                        (dateTo > dateFrom && today > dateTo && datef < dateTo && dateTo  < datet) ||
                        (today < dateTo && datet > dateFrom)){

                        this.failedMessage.title = "Warning!"
                        this.failedMessage.message = "This schedule is between to other schedule"
                        this.message.open(this.failedMessage);
                        this.pushEvent.emit(true)
                        return

                    } else {
                        this.pushEvent.emit(false)
                    }

                }
            }
        }
    }

    date_min_max(e, x, isMin) {
        //parent
       var df = this.pipe.transform(e.ot_start[x].id,'yyyy-MM-dd')
       var dt = this.pipe.transform(e.ot_end[x].id,'yyyy-MM-dd')

        var datemin = new Date(df + ' 00:00')
        var datemax = new Date(dt + ' 23:59')

        //child
        // var datemin = new Date(e.otdate[x].id + ' 00:00')
        // var datemax = new Date(e.otdate[x].id + ' 23:59')

        //parent
        var min = new Date(datemin.setDate(datemin.getDate() - 1))
        var max = new Date(datemax.setDate(datemax.getDate() + 1))

        //child
        // var min = new Date(datemin.setDate(datemin.getDate() - 1))
        // var max = new Date(datemax.setDate(datemax.getDate() + 1))
        return isMin ? min : max

    }

    getMinutes(timeString: string): number {
        // Split the time string into hours, minutes, and seconds
        const [hours, minutes] = timeString.split(':').map(Number);
        // Return only the minutes
        return minutes;
    }

    dateindentify(date){
        this.dateidentifind = date
    }

    validations(e,i,x,bol){
        this.request = {
            moduleId: this.moduleid,
            subModuleId: 0,
            dateFrom: new Date(),
            dateTo: new Date(),
            overtimeTiming: 0,
            shiftId: GF.IsEmptyReturn(e.otshift[x].id,0),
            leaveFilingType: 0,
            targetId: GF.IsEmpty(this.selectedemployee) ? this.tid : this.selectedemployee,
            date :  this.pipe.transform(e.date , 'yyyy-MM-dd')
        }

        forkJoin({
            validationtype: this.filingService.getFilingValidationOnUI(this.request),
        })
        .subscribe({
            next: (response) => {
                debugger
                if (e.otshift[x].id !== 1 && x == 0) {
                    var schedin = response.validationtype.payload.schedIn
                    var schedout = response.validationtype.payload.schedOut

                    e.ot_start[x].id = GF.IsEmpty(schedin) ? this.pipe.transform(e.date, 'yyyy-MM-dd 00:00') : new Date(schedin)
                    e.ot_end[x].id = GF.IsEmpty(schedout) ? this.pipe.transform(e.date, 'yyyy-MM-dd 23:59') : new Date (schedout)
                }else if(x == 0){
                    e.ot_start[x].id = this.pipe.transform(e.date, 'yyyy-MM-dd 00:00')
                    e.ot_end[x].id = this.pipe.transform(e.date, 'yyyy-MM-dd 23:59')
                }

            },
            error: (e) => {
                console.error(e)
            },
        });


    }


    parseTimeToDates(input,date) {
        const parts = input.split('_'); // Split into ["0800A", "0500P"]
        const today = new Date(date); // Get today's date

        return parts.map(part => {
            const period = part.slice(-1); // Get 'A' or 'P'
            const time = part.slice(0, -1); // Get '0800' or '0500'

            let hours = parseInt(time.slice(0, 2), 10);
            const minutes = parseInt(time.slice(2), 10);

             // Adjust hours for PM
             if (period === 'P' && hours !== 12) hours += 12;
             if (period === 'A' && hours === 12) hours = 0;

             // Create a new Date object
             const date = new Date(today);
             date.setHours(hours, minutes, 0, 0); // Set time on today's date
             return date;
         });
     }


}


