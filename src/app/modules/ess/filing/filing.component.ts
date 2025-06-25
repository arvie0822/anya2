//filing ts upload ==============================

import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { setValue, translate, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import {
    filingForm, ChangeLog, ChangeSched, LeaveMonitoring,
    leaveForm, otTable, officialBForm, obTable,
    OffsetMonitoring, offsetForm, offTable, lvTable,
    uhTable, unpaidForm, Overtime, coeForm, ChangeLogs, Leave, Offset, ChangeSchedule
} from 'app/model/administration/filing';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS, NgxMatDatetimePickerModule, NgxMatDateAdapter, NgxMatNativeDateAdapter } from '@angular-material-components/datetime-picker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';
import { ModalBeforeSavingComponent } from './change-schedule/modal-before-saving/modal-before-saving.component';
import { ClModalBeforeSavingComponent } from './change-log/cl-modal-before-saving/cl-modal-before-saving.component';
import { ChangeScheduleComponent } from './change-schedule/change-schedule.component';
import moment from 'moment';
import { LeaveComponent } from './leave/leave.component';
import { DropdownOptions, DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { forkJoin } from 'rxjs';
import { CoreService } from 'app/services/coreService/coreService.service';
import { OfficialBusinessComponent } from './official-business/official-business.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { OffsetComponent } from './offset/offset.component';
import { CoeComponent } from './coe/coe.component';
import { UnpaidHoursComponent } from './unpaid-hours/unpaid-hours.component';
import { TableRequest } from 'app/model/datatable.model';
import { FilingService } from 'app/services/filingService/filing.service';
import { ShiftService } from 'app/services/shiftService/shift.service';
import { myData } from 'app/model/app.moduleId';
import _ from 'lodash';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ChangeLocationComponent } from './change-location/change-location.component';
import { FailedMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { GF } from 'app/shared/global-functions';
import { fuseAnimations } from '@fuse/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatButtonModule } from '@angular/material/button';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { ChangeLogComponent } from './change-log/change-log.component';
import { MatSelectModule } from '@angular/material/select';
import filingViewRoutes from '../filing-view/filing-view-routes';
import { FilingViewComponent } from '../filing-view/filing-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    selector: 'app-filing',
    templateUrl: './filing.component.html',
    styleUrls: ['./filing.component.css'],
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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DropdownCustomComponent,
    MatTableModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    CardTitleComponent,
    LeaveComponent,
    OfficialBusinessComponent,
    OvertimeComponent,
    OffsetComponent,
    CoeComponent,
    UnpaidHoursComponent,
    ChangeScheduleComponent,
    ChangeLocationComponent,
    ChangeLogComponent,
    TranslocoModule,
    MatTooltipModule
],
})
export class FilingComponent implements OnInit {
    dropdownRequestsub = new DropdownRequest
    dropdownRequest = new DropdownRequest
    @Input() datasource: any
    failedMessage = {...FailedMessage}
    globalmoduleId: boolean
    globalfilingtype: number
    viewingmodal: MatDialogRef<ModalBeforeSavingComponent, any>;
    clviewingmodal: MatDialogRef<ClModalBeforeSavingComponent, any>;
    @ViewChild(LeaveComponent) DedChild: LeaveComponent;
    @ViewChild(OfficialBusinessComponent) OB: OfficialBusinessComponent;
    @ViewChild(OvertimeComponent) OT: OvertimeComponent;
    @ViewChild(OffsetComponent) OF: OffsetComponent;
    @ViewChild(CoeComponent) COE: CoeComponent;
    @ViewChild(UnpaidHoursComponent) UP: UnpaidHoursComponent;
    @ViewChild(ChangeScheduleComponent) CS: ChangeScheduleComponent;
    @ViewChild(ChangeLocationComponent) CLoc: ChangeLocationComponent;
    request = new TableRequest()
    resultHierarchy = new SearchHierarchy;
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
    fileUpload: ElementRef
    dropdownOptions = new DropdownOptions
    filingrequest = new DropdownRequest
    ecnrypeemployee : any
    // ot_start: any;
    // ot_end: any;
    // time_incl: any;
    // time_outcl: any;
    // shift_codecl: any;
    isEdit: boolean = false
    @ViewChild('CLTable') CLTable: MatTable<any>;
    @ViewChild('CSTable') CSTable: MatTable<any>;
    @ViewChild('LMTable') LMTable: MatTable<any>;
    @ViewChild('LVTable') LVTable: MatTable<any>;
    @ViewChild('OTTable') OTTable: MatTable<any>;
    @ViewChild('OBTable') OBTable: MatTable<any>;
    @ViewChild('OTable') OTable: MatTable<any>;
    @ViewChild('OFFTable') OFFTable: MatTable<any>;
    @ViewChild('UHTable') UHTable: MatTable<any>;
    @ViewChild('clocationtable') clocationtable: MatTable<any>;
    filingForm: FormGroup
    leaveForm: FormGroup
    overtimeForm: FormGroup
    breaktypeForm: FormGroup
    officialBForm: FormGroup
    offsetForm: FormGroup
    unpaidForm: FormGroup
    coeForm: FormGroup
    action: string = ""
    module : any
    timeerror = false
    breakDeduction = [];
    id: string
    pipe = new DatePipe('en-US');
    CLSource = [];
    tid : any
    empecrypted = ""
    cssubmit  = false
    clsubmit  = false
    dialogShown  = false
    hidedt  = false
    shiftT  = false
    LMSource = [];
    LVSource: Leave[] = [];
    OTSource = [];
    OFFSource = [];
    OBSource = [];
    showdrop = 0
    disabledbutton: boolean = false
    disabledbuttonOT: boolean = false
    tableindex: any
    empidsss: any
    otstart: any
    otend: any
    crypid: any = []
    OSource: OffsetMonitoring[] = [{
        // include_expired: '',
        overtime_code: 'OT-001',
        overtime: '120',
        offset_used: '30',
        offset_field: '60',
        available: '30',
        expiration: '12/31/2022',
    }];
    UHSource = [];
    CSSource = [];
    CLocSource = [];
    images : any = []
    isedit : boolean = false
    // csColumns: string[] = ['actioncs', 'datecs', 'shiftcs', 'new_shiftcs', 'reasoncs', 'upload_filecs',];
    // clColumns: string[] = ['actioncl', 'datecl', 'shift_codecl', 'time_incl', 'time_outcl', 'reasoncl', 'upload_filecl',];
    // lmColumns: string[] = ['leave_type', 'total_leave', 'used_leave', 'pending_approval', 'pending_schedule', 'available_leave'];
    // lvColumns: string[] = ['lvDateFrom', 'lvDateTo', 'lvType', 'lvhourly', 'lvoptions', 'lvstart', 'lvend', 'lvreason', 'lvUpload_File', 'lvAction'];
    // otColumns: string[] = ['otdate', 'otshift', 'overtime_type', 'ottiming', 'ot_start', 'ot_end', 'otreason', 'uploadFileot', 'otaction'];
    // obColumns: string[] = ['dateTimeFrom', 'dateTimeTo', 'reason', 'location', 'remarks', 'uploadFile', 'action'];
    // oColumns: string[] = ['overtime_code', 'overtime', 'offset_used', 'offset_field', 'available', 'expiration'];
    // offColumns: string[] = ['date', 'off_min', 'off_hrs', 'reason', 'uploadFile', 'action'];
    // uhColumns: string[] = ['uhDate', 'uhShift', 'uhDateFrom', 'uhDateTo', 'uhReason', 'uhUpload_file', 'uhAction'];

    // filing = [
    //     { id: 0, description: 'Change Schedule' },
    //     { id: 1, description: 'Change Log' },
    //     { id: 2, description: 'Leave' },
    //     { id: 3, description: 'Overtime' },
    //     { id: 4, description: 'Offset' },
    //     { id: 5, description: 'Official Business' },
    //     { id: 6, description: 'Unpaid Hours' },
    //     { id: 7, description: 'COE' },
    // ]

    // leave = [
    //     { id: 0, description: 'Vacation Leave' },
    //     { id: 1, description: 'Sick Leave' },
    //     { id: 2, description: 'Emergency Leave' },
    // ]
    hour = [
        { id: 0, description: 'Whole day' },
        { id: 1, description: 'Half day' },
        { id: 2, description: 'Hourly' },
    ]
    // shiftot = [
    //     { id: 0, description: 'shifts' },
    //     { id: 1, description: '6Am_10Am_SS' },
    //     { id: 2, description: '3Pm_7Pm_SS' },
    // ]
    ot = [
        { id: 0, description: 'Paid' },
        { id: 1, description: 'Offset' },
    ]
    timing = [
        { id: 0, description: 'Pre-shift' },
        { id: 1, description: 'Post-shift' },
        { id: 2, description: 'RD/Holiday' },
    ]
    application = [
        { id: true, description: 'Yes' },
        { id: false, description: 'No' },
    ]
    half = [
        { id: 0, description: '1st half' },
        { id: 1, description: '2nd half' },
    ]
    coe = [
        { id: 0, description: 'Legal' },
        { id: 1, description: 'Loan' },
        { id: 2, description: 'Local Employment' },
        { id: 3, description: 'Employment Abroad' },
        { id: 4, description: 'Mobile Plan' },
        { id: 5, description: 'Visa Application' },
        { id: 6, description: 'School Requirement' },
    ]
    official = [
        { id: 0, description: 'Client meeting' },
        { id: 1, description: 'Training' },
        { id: 2, description: 'Offsite meeting' },
        { id: 3, description: 'Team building' },
        { id: 4, description: 'Official travel' },
        { id: 5, description: 'Branch Office' },
        { id: 6, description: 'Others' },
    ]
    imageUrl: any
    min = new Date()
    max = new Date()
    filingtypeid = 0
    hidemepmngmt : boolean = false
    hidesearchbut : boolean = true
    shiftTypeList = [
        { dropdownID: true,  description: "Multi Shift"},
        { dropdownID: false, description: "Regular"},
    ]

    constructor(

        private fb: FormBuilder,
        public dialog: MatDialog,
        private coreService: CoreService,
        private filingService: FilingService,
        private shiftService: ShiftService,
        private message: FuseConfirmationService,
        private cdr: ChangeDetectorRef,
        private translocoService: TranslocoService

    ) {

    }

    get ff() {
        return this.filingForm.value
    }
    get lf() {
        return this.leaveForm.value
    }
    get of() {
        return this.overtimeForm.value
    }
    get ob() {
        return this.officialBForm.value
    }
    get off() {
        return this.offsetForm.value
    }
    get uh() {
        return this.unpaidForm.value
    }

    ngOnInit() {
        this.filingForm = this.fb.group(new filingForm());
        this.leaveForm = this.fb.group(new Leave());
        this.officialBForm = this.fb.group(new officialBForm());
        this.offsetForm = this.fb.group(new offsetForm());
        this.unpaidForm = this.fb.group(new unpaidForm());
        this.coeForm = this.fb.group(new coeForm());
        // this.filingForm.get('employeeId').setValue(0)
        this.showdrop = sessionStorage.getItem('moduleId') == '68' ? 68 : 160
        this.initData()
        this.getempdrop()

        this.action = sessionStorage.getItem("action")
        this.module = sessionStorage.getItem('moduleId')
        if (this.action == "edit") {
            this.isedit = true
            this.hidesearchbut = false
            this.hidemepmngmt = sessionStorage.getItem('moduleId') == '68' ? true : false
            this.hidedt = sessionStorage.getItem('moduleId') == '160' ? true : false ;
            this.filingtypeid = this.filingForm.value.filingTypes
            this.disabledbutton = false
            this.filingForm.enable()
        }
        else if (this.action == "view") {

            this.filingtypeid = this.filingForm.value.filingTypes
            this.disabledbutton = true
            this.hidesearchbut = false
            this.filingForm.disable()
        }
    }

    ngOnChanges(changes: SimpleChanges): void {

        if ('employeeId' in changes) {
            this.filingForm.get('filingTypes').setValue(0)
        }
    }

    sample(e) {
        debugger
        this.filingForm.get('shiftType').setValue(e)
        this.shiftT = e

    }

    employeess(e){
    }

    empIds(e){
        debugger
        this.dropdownRequestsub.id.push(
            { dropdownID: e, dropdownTypeID: 0}
        )
        this.empidsss = e
        this.getempdrop()
    }

    submit() {
        debugger
        if (this.filingForm.value.filingTypes === 32) {
            var nullvalue = this.CSSource.filter(x => (x.shiftId.id == 2 && x.shiftId.child[0].id == null) || GF.IsEmpty(x.shiftId.id) ||
                                                      (x.shiftId.id == 3 && x.shiftId.child[0].id == null) ||
                                                      (x.shiftId.id == 6 && x.shiftId.child[0].id == null && x.shiftId.child[1].id == null) ||
                                                      (x.shiftId.id == 6 && x.shiftId.child[0].id !== null && x.shiftId.child[1].id == null) ||
                                                      (x.shiftId.id == 6 && x.shiftId.child[0].id == null && x.shiftId.child[1].id !== null)
                                                )
            debugger

            var wrd = this.CSSource.filter(x => x.shiftId.id == 2 && (GF.IsEmpty(x.shiftId.child[0].id)))
            var offwork = this.CSSource.filter(y => y.shiftId.id == 3 && y.shiftId.child[0].id == null)

            if (nullvalue.length > 0) {
                this.failedMessage.message = translate("New Shift cannot be Empty!")
                this.message.open(this.failedMessage);
            }else{
                this.shiftcodedrop()
            }
        }
        else if (this.filingForm.value.filingTypes === 33) {

            var Rdcl = this.CLSource.every(x => x.shiftId == 1)

            if (this.CLSource.length == 1 && Rdcl) {
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.actions.confirm.color = 'primary'
                this.failedMessage.message = translate("RD to WRD") + "<br><br>" + translate("Note: Change Log on RG and WRD will still be processed.")
                    this.message.open(this.failedMessage);
                }else{
                    this.ecnrypeemployee = this.crypid[0]?.encryptID
                    this.CLmodalviewing()
                }
        }
        else if (this.filingForm.value.filingTypes === 34) {
            this.ecnrypeemployee = this.crypid[0]?.encryptID
            this.disabledbutton = true
            this.DedChild.submit();

        //    myData.disabledbuttonsubmit =  this.disabledbutton
        }
        else if (this.filingForm.value.filingTypes === 35) {
            var Rdob = this.OBSource.every(x => x.shiftId.every(id => { id == 1}))

            this
            if (this.OBSource.length == 1 && Rdob) {
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.actions.confirm.color = 'primary'
                this.failedMessage.message = translate("Official Business on RD to WRD") + "<br><br>" + translate("Note: Change Log on RG and WRD will still be processed.")
                this.message.open(this.failedMessage);
            }else{
                this.disabledbutton = true
                this.ecnrypeemployee = this.crypid[0]?.encryptID
                this.OB.submit(this.OBSource);
            }
        }
        else if (this.filingForm.value.filingTypes === 36) {
            this.disabledbutton = true

            this.ecnrypeemployee = this.crypid[0]?.encryptID

            this.OT.submit(this.OTSource);
        }
        else if (this.filingForm.value.filingTypes === 37) {
                    this.disabledbutton = true
                    this.ecnrypeemployee = this.crypid[0]?.encryptID
                    this.OFFSource.forEach(elemdate => {
                        elemdate.offsetDate = this.pipe.transform(elemdate.offsetDate, 'yyyy-MM-ddTHH:mm');
                    });
                    this.OF.submit(this.OFFSource);
        }
        else if (this.filingForm.value.filingTypes === 52) {
            this.disabledbutton = true

            this.ecnrypeemployee = this.crypid[0]?.encryptID

            this.COE.submit();
        }
        else if (this.filingForm.value.filingTypes === 64) {
            this.disabledbutton = true

            this.ecnrypeemployee = this.crypid[0]?.encryptID

            this.UP.submit(this.UHSource);
        }
        else if (this.filingForm.value.filingTypes === 114) {
            this.disabledbutton = true
            this.ecnrypeemployee = this.crypid[0]?.encryptID
            setTimeout(() => {
                this.CLoc.submit(this.CLocSource);
            }, 2000);
        }
    }

    disabledsub(e){
        this.disabledbutton = e
    }

    CLmodalviewing() {
        if (this.filingForm.value.filingTypes == 33) {
            if (this.viewingmodal) {
                this.viewingmodal.close();
            }
            this.CLSource.forEach(eleme => {
                if (eleme.timeIn == "0" || eleme.timeOut == "0") {
                    this.failedMessage.title = translate("Warning!")
                    this.failedMessage.message = translate("TimeIn and TimeOut can't Be Empty!")
                    this.message.open(this.failedMessage);
                    return
                }
            })

            this.clviewingmodal = this.dialog.open(ClModalBeforeSavingComponent, {

                width: '50%',
                height: '38%',
                panelClass: 'app-dialog',
                data: {
                    field: this.filingForm.value.filingTypes,
                    ds: this.CLSource,
                    empid :  this.ecnrypeemployee
                }
            });
            this.clviewingmodal.afterClosed().subscribe((result) => {
                this.clsubmit = result
                this.cdr.detectChanges();
                setTimeout(() => {
                this.clsubmit = false
                }, 1000);
            })
        }

    }

    handleHoursEvent(): void {
        let eventStartTime = new Date("1900-01-01 " + this.pipe.transform(this.filingForm.value.matTimeIn, 'HH:mm:ss'));
        let eventEndTime = new Date("1900-01-01 " + this.pipe.transform(this.filingForm.value.matTimeOut, 'HH:mm:ss'));
        if (eventStartTime > eventEndTime) {
            eventEndTime.setDate(eventEndTime.getDate() + 1)
            this.filingForm.controls.timeOutDaysCover.patchValue(1);
        }
        else {
            this.filingForm.controls.timeOutDaysCover.patchValue(0);
        }
        let duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        this.filingForm.controls.totalWorkingHours.patchValue(duration / 1000 / 60 / 60);
    }

    lvDelete(index): void {
        this.LVSource.splice(index, 1);
        this.LVTable.renderRows();
    }

    obDelete(index): void {
        this.OBSource.splice(index, 1);
        this.OBTable.renderRows();
    }

    uhDelete(index): void {
        this.UHSource.splice(index, 1);
        this.UHTable.renderRows();
    }

    convertMins() {
        var off = this.offsetForm.get('off_mino').value
        var hours = Math.floor(off / 60);
        var total = hours.toString();
        //  .padStart(2, '0')
        this.offsetForm.get('off_hrso').setValue(total)
    }


    date() {
        let date1 = new Date(this.leaveForm.value.dateFrom).getDate();
        let date2 = new Date(this.leaveForm.value.dateTo).getDate();

        if (date1 > date2) {

            // console.log("Date1 is less than Date2 in terms of year");
        } else if (date1 < date2) {
            // console.log("Date1 is greater than Date2 in terms of year");
        } else {
            // console.log(`Both years are equal`);
        }
    }
    timevalidators() {
        this.timeerror = false

        var time1 = this.leaveForm.value.leaveStartlv
        var time2 = this.leaveForm.value.leaveEndlv

        const t1 = this.pipe.transform(time1, 'HH:mm a')
        const t2 = this.pipe.transform(time2, 'HH:mm a')
        let time_s = [];
        let time_e = [];
        time_s = t1.split(':');
        time_e = t2.split(':');
        if (time_s > time_e) {
            this.leaveForm.get("leaveEndlv").setValue(""),
                this.timeerror = true
        }

    }

    change(index, shift) {

    }

    onClick(event) {
        if (this.fileUpload)
            this.fileUpload.nativeElement.click()
    }
    uploadFile(event, id) {
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        // console.log(id)
        let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
        let fileName = event.target.files[0].name;
        element.setAttribute('value', fileName)
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);

            // When file uploads set it to file formcontrol
            reader.onload = () => {
                this.imageUrl = reader.result;
                this.leaveForm.patchValue({
                    file: reader.result
                });

            }

        }

    }

    leaves() {
        // this.validation(0)

        this.ecnrypeemployee = this.crypid[0]?.encryptID
        this.edit({ id: 0 })



        if (this.filingForm.value.filingTypes == 32 || this.filingForm.value.filingTypes == 33 || this.filingForm.value.filingTypes == 35 || this.filingForm.value.filingTypes == 36) {

            this.filingForm.get('dateFrom').setValue('')
            this.filingForm.get('dateTo').setValue('')
        }
    }

    formatShift(shiftCode, date) {
        const parts = shiftCode[0].id.match(/^(\d{2})(\d{2})([AP])_(\d{2})(\d{2})([AP])$/);

        if (!parts) {
            return { otstart: "Invalid shift code", otend: "Invalid shift code" };
        }

        let hour1 = parseInt(parts[1]);
        const min1 = parts[2];
        const meridiem1 = parts[3];
        let hour2 = parseInt(parts[4]);
        const min2 = parts[5];
        const meridiem2 = parts[6];

        if (meridiem1 === "P" && hour1 < 12) {
            hour1 += 12;
        } else if (meridiem1 === "A" && hour1 === 12) {
            hour1 = 0;
        }

        if (meridiem2 === "P" && hour2 < 12) {
            hour2 += 12;
        } else if (meridiem2 === "A" && hour2 === 12) {
            hour2 = 0;
        }

        const shiftIn = `${hour1.toString().padStart(2, '0')}:${min1}`;
        const shiftOut = `${hour2.toString().padStart(2, '0')}:${min2}`;

        this.otstart = `${this.pipe.transform(date, 'yyyy-MM-dd')} ${shiftIn}`;
        this.otend = `${this.pipe.transform(date, 'yyyy-MM-dd')} ${shiftOut}`;

        return { otstart: this.otstart, otend: this.otend };
    }


    public search() {
        this.cssubmit = false
        this.clsubmit = false
        var df = new Date(this.filingForm.value.dateFrom)
        var dt = new Date(this.filingForm.value.dateTo)

        var timefrom = new Date(df.getFullYear(), df.getMonth(), df.getDate(),0,0,0)
        var timeto = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()+1,0,0,0)

        var df_dt_diff_in_time = timeto.getTime() - timefrom.getTime();
        var df_dt_diff_in_days = df_dt_diff_in_time / (1000 * 3600 * 24);

        this.pipe.transform(new Date, "hh:mm a"),
            this.request.SearchColumn = []
        this.request.Order = "Date"
        this.request.Length = 0
        // Length

        this.request.SearchColumn.push({
            "key": "DateFrom",
            "value": this.pipe.transform(this.filingForm.value.dateFrom, "yyyy-MM-dd"),
            "type": 4
        })

        this.request.SearchColumn.push({
            "key": "DateTo",
            "value": this.pipe.transform(this.filingForm.value.dateTo, "yyyy-MM-dd"),
            "type": 5
        })

        this.loadData()
        this.disabledbuttonOT = false
        // this.edit({ id: 0 })
        // this.validation(0)
    }


    loadData(): void {

        if ( sessionStorage.getItem('moduleId') == "68" || sessionStorage.getItem('moduleId') == "160" ) {
            this.tid = this.crypid[0]?.encryptID

        }else{
            this.tid = sessionStorage.getItem('u')
        }
            var mid = this.dropdownOptions.filingdef.find(x => x.dropdownID == this.filingForm.value.filingTypes).encryptID
            this.filingService.searchFilingTable(this.request, mid, this.tid).subscribe({
                next: (value: any) => {

                    switch (this.filingForm.value.filingTypes) {
                        case 32:
                            debugger
                            this.dialogShown = false;
                            this.CSSource = value.payload.data.map(x => ({
                                datedisplay: this.pipe.transform(x.date, "MM-dd-yyyy"),
                                //    date :  x.date,
                                date: this.pipe.transform(x.date, "yyyy-MM-dd"),
                                // currentshift: x.shiftCode,
                                currentshift: {
                                    id: x.shiftId, child: x.shiftId == 2 ? [{ id: x.previousSubShiftId1 }] : x.shiftId == 6 ? [{ id: x.previousSubShiftId1 }, { id: x.previousSubShiftId2 }] : x.shiftId == 3 ? [{ id: x.previousSubShiftId1 }] : []
                                },
                                shiftCode: x.shiftCode,

                                // shiftId: {},
                                shiftId: {
                                    id: x.newShiftId, child: x.newShiftId == 2 ? [{ id: x.newSubShiftId1 }] : x.newShiftId == 6 ? [{ id: x.newSubShiftId1 }, { id: x.newSubShiftId2 }] : x.newShiftId == 3 ? [{ id: x.newSubShiftId1 }] : []
                                },
                                previousShift : x.shiftId != null ? x.shiftId : null,
                                newSubShiftId1: x.newSubShiftId1,
                                newSubShiftId2: x.newSubShiftId2,
                                reason: x.reason,
                                lateFiling: false,
                                isUpload: false,
                                status: x.status,
                                encryptedId: x.encryptedId,
                                disable: true,
                                changeScheduleId : x.transactionId,
                                uploadPath :  x.uploadFile,
                                employeeId : value.payload.employeeId
                            }))


                            // this.CSTable.renderRows()
                            break;

                        case 33:


                            this.CLSource = value.payload.data.map(x => ({

                                datecl: this.pipe.transform(x.date,'yyyy-MM-dd') ,
                                date: new Date(x.date) ,
                                changeLogCode: x.shiftCode,
                                shiftCode: x.shiftCode,
                                sched_incl: x.schedIn !== '0' ? this.pipe.transform(x.schedIn, 'yyyy-MM-dd hh:mm a'): '0',
                                sched_outcl:  x.schedOut !== '0' ?this.pipe.transform(x.schedOut, 'yyyy-MM-dd hh:mm a'):'0',
                                // sched_incl: "0",
                                // sched_outcl: "0",
                                shiftId: x.shiftId,
                                status: x.status,
                                encryptedId: x.encryptedId,
                                disable: true,
                                reason : x.reason,
                                // timeIn : "",
                                // timeIn : x.timeIn,
                                // timeOut :x.timeOut,
                                minT: new Date(x.date).setDate(new Date(x.date).getDate() - 1),
                                maxT: new Date(x.date).setDate(new Date(x.date).getDate() + 1),
                                timeIn: x.shiftId == 5 ? this.pipe.transform(x.schedIn == "0" ? this.pipe.transform(x.date, 'yyyy-MM-dd 00:00') : x.schedIn ,'yyyy-MM-dd HH:mm') : x.timeIn == "" ? this.pipe.transform(x.schedIn == "0" ? this.pipe.transform(x.date, 'yyyy-MM-dd 00:00') : x.schedIn ,'yyyy-MM-dd HH:mm') : x.timeIn,
                                timeOut: x.shiftId == 5 && x.schedIn == "0" ? "" : x.timeOut == "" ? this.pipe.transform(x.schedOut == "0" ? this.pipe.transform(new Date(x.date).setDate(new Date(x.date).getDate() + 1), 'yyyy-MM-dd 00:00') : x.schedOut ,'yyyy-MM-dd HH:mm'): x.timeOut ,
                                timeIn_display: x.timeIn,
                                timeOut_display: x.timeOut,
                                uploadPath : x.uploadFile,
                                changeLogId : x.transactionId,
                                employeeId :x.employeeId
                            }))
                            // this.CSTable.renderRows()
                            break;

                        case 35:

                            this.OBSource = value.payload.data.map(x => ({

                                // dates: this.pipe.transform(x.date, "MM-dd-yyyy"),
                                action : [{id : ""}],
                                dates: [{id:this.pipe.transform(x.date, "MM-dd-yyyy"),disabled : true}],
                                date: [{id:this.pipe.transform(x.date, "MM-dd-yyyy"),disabled : true}],
                                // timeFrom: x.timeFrom == null ? [{id: this.pipe.transform(x.date, "yyyy-MM-dd HH:mm"),disabled : true}] : [{id: this.pipe.transform(x.timeFrom, "yyyy-MM-dd HH:mm"),disabled : true}],
                                // timeTo: x.timeFrom == null ? [{id: this.pipe.transform(x.date, "yyyy-MM-dd HH:mm"),disabled : true}] : [{id: this.pipe.transform(x.timeTo, "yyyy-MM-dd HH:mm"),disabled : true}],
                                timeFrom: x.timeFrom == null ? [{id: this.pipe.transform(x.date, "yyyy-MM-dd 00:00"),disabled : true}] : [{id: this.pipe.transform(x.timeFrom, "yyyy-MM-dd HH:mm"),disabled : true}],
                                timeTo: x.timeFrom == null ? [{id: this.pipe.transform(x.date,"yyyy-MM-dd 23:59"),disabled : true}] : [{id: this.pipe.transform(x.timeTo, "yyyy-MM-dd HH:mm"),disabled : true}],
                                status : [{id:x.status,disabled : true }],
                                employeeId : x.employeeId,
                                officialBusinessId :[{id : x.transactionId,disabled : true}],
                                location: [{id : x.location,disabled : true}],
                                reason : [{id: x.reason,disabled : true}],
                                reasonId : [{id: x.reasonId,disabled : true}] ,
                                uploadPath : [{id:"",disabled : true}],
                                disable : [{ id: x.status !="" ? true : false, disabled : true}],
                                encryptedId:x.encryptedId,
                                disabled : true,
                                shiftCode : [{id: x.shiftCode, disabled : true}],
                                shiftId :  [{id: x.shiftId, disabled : true}],


                            }))
                            this.OBSource.push

                            case 36:
                                this.OTSource = value.payload.data.map(x => {
                                   var isRd = (x.shiftId == 1 || x.shiftId == 2 || x.shiftId == 3 || x.shiftId == 6 || x.shiftId == 5)
                                   const formattedShift = this.formatShift([{ id: x.shiftCode }], x.date);

                                    return {
                                        overtimeId: [{ id: x.transactionId }],
                                        employeeId: x.employeeId,
                                        date: this.pipe.transform(x.date, "MM-dd-yyyy"),
                                        otaction: [{ id: "" }],
                                        otdate: [{ id: this.pipe.transform(x.date, "MM-dd-yyyy"), disable: true }],
                                        otshift: [{ id: x.shiftId, disable: true }],
                                        overtime_type: [{ id: x.overtimeTypeId, disable: true }],
                                        // ottiming: [{ id: x.timingId, disable: true }],
                                        ot_start: [{ id: (x.status != "") ? x.startTime : isRd ? new Date(this.pipe.transform(x.date, "MM-dd-yyyy 00:00")) : "", disable: (x.status != "") }],
                                        ot_end: [{ id: (x.status != "") ? x.endTime : isRd ? new Date(this.pipe.transform(x.date, "MM-dd-yyyy 23:59")) : "", disable: (x.status != "") }],
                                        otreason: [{ id: x.reason, disable: true }],
                                        uploadFileot: [{ id: x.uploadFile, disable: true }],
                                        shiftCode: [{ id: x.shiftCode, disable: true }],
                                        status: [{ id: x.status, disable: true }],
                                        disabled: [{ id: x.status !== "" ? false : true, disable: true }],
                                        subShiftId : x.subShiftId,
                                        lateFiling: false,
                                        isUpload: false,
                                        disable: true
                                    };
                                });

                                this.cdr.detectChanges();
                                break;


                        case 114:
                            this.CLocSource = value.payload.data.map(x => ({
                                action : [{ id: ""}],
                                date : [{ id: x.date}],
                                locationCode : [{ id: x.currentLocationCode == "" ? "" : x.currentLocationCode}],
                                currentLocationId : [{id : x.currentLocationId}],
                                prevLocation : [{id : x.currentLocationId}],
                                locationId : [{ id: x.locationId, disable : true}],
                                reason : [{ id: x.reason,disable : true}],
                                status : [{ id: x.status}],
                                uploadPath : [{ id: x.uploadFile.replace("C:\\fakepath\\",''),}],
                                changeLocationId : [{ id: x.transactionId}],
                                disabled : [{id : x.status != "" ? true : false}],
                                disable : true
                            }))
                            break;
                        default:

                            break;

                    }
                       this.filingtypeid = this.filingForm.value.filingTypes
                    if (value.statusCode == 200) {

                    }
                    else {
                        console.log(value.stackTrace)
                        console.log(value.message)
                        //   this.isLoadingResults = false;
                    }
                },
                error: (e) => {
                    console.error(e)
                    // this.isLoadingResults = false;

                }
            });

    }

    initData() {
        debugger

        this.coreService.currentdataState.subscribe((idleState) => {
            // this.filingForm.get('employeeId').setValue(idleState == null ? 0 :idleState)
            console.log(idleState)
        });

        this.globalmoduleId =  sessionStorage.getItem('moduleId') == '68' ? true : sessionStorage.getItem('moduleId') == '160' ? true : false;

        this.tid = sessionStorage.getItem("u")
        var adds = sessionStorage.getItem("adds")
        let fid = Number(adds)
        this.isEdit = fid == undefined || fid == null || fid == 0 ? false : true
        this.filingForm.get('filingTypes').setValue(fid)

        var request = {
            moduleId: this.filingForm.value.filingTypes,
            subModuleId: 0,
            dateFrom: new Date(),
            dateTo: new Date(),
            overtimeTiming: 0,
            shiftId: 0,
            leaveFilingType: 0,
            targetId : this.tid
        }

        if (sessionStorage.getItem('moduleId') == "68" || sessionStorage.getItem('moduleId') == "160") {
            forkJoin({
                filingtype: this.coreService.getCoreDropdown(1028, this.filingrequest),
                shift: this.shiftService.getShiftPerDayDropdown(this.dropdownRequest),
            })
            .subscribe({

                next: (response) => {

                    // custom
                        this.dropdownOptions.filingdef = response.filingtype.payload.filter(x => ![52,64].includes(x.dropdownID))
                        this.filingForm.get('shiftType').setValue(GF.IsEmptyReturn(this.shiftT,0))
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                },
            });
        }else{
            forkJoin({
                filingtype: this.coreService.getCoreDropdown(1028, this.filingrequest),
                validationtype: this.filingService.getFilingValidationOnUI(request),
                shift: this.shiftService.getShiftPerDayDropdown(this.dropdownRequest),
            })
            .subscribe({

                next: (response) => {

                    // custom
                        this.dropdownOptions.filingdef = this.action == "view" ? response.filingtype.payload : response.filingtype.payload.filter(x => response.validationtype.payload.modules.includes(x.dropdownID))
                        this.dropdownOptions.shiftCodeDef = response.shift.payload
                        this.filingForm.get('shiftType').setValue(this.shiftT)


                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                },
            });

        }
    }

    edit(e) {
    }

    filingtype() {

        var df = new Date(this.filingForm.value.dateFrom)
        df.setDate(df.getDate() + 1)

        var dt = new Date(this.filingForm.value.dateTo)
        dt.setDate(dt.getDate() + 1)

        myData.filingtype = this.filingForm.value.filingTypes,
        myData.datefrom = df,
        myData.dateto = dt,
        myData.filingtypeencryp = this.filingForm.value.filingTypes
    }

    validation() {

        this.filingtypeid = 0
        var fid = this.filingForm.value.filingTypes
        if (fid == 34 || fid== 37 ||  fid == 64 || fid == 52) {
               this.filingtypeid = fid
        }

        this.CSSource = []
        this.CLSource = []
        this.OTSource = []
        // this.leaves()
        var filingtype = this.leaveForm.value.leaveFileTypeId
        var submodule = this.leaveForm.value.leaveTypeId

        var df = this.leaveForm.value.dateFrom
        var dt = this.leaveForm.value.dateTo

        if ( sessionStorage.getItem('moduleId') == "68") {
            var empencrypr = this.crypid[0]?.encryptID
            var encryp = empencrypr == undefined ? "" : empencrypr
        }else if( sessionStorage.getItem('moduleId') == "160"){
            var empencrypr = this.crypid[0]?.encryptID
            var encryp = empencrypr == undefined ? "" : empencrypr
        }
        else{
            var  encryp = this.tid
        }
        var request = {
            moduleId: fid,
            subModuleId: 0,
            dateFrom: df,
            dateTo: dt,
            overtimeTiming: 0,
            shiftId: 0,
            leaveFilingType: filingtype,
            targetId : encryp,

        }
        this.filingForm.get('dateFrom').disable();
        this.filingForm.get('dateTo').disable();

        forkJoin({
            filingtype: this.coreService.getCoreDropdown(1028, this.filingrequest),
            validationtype: this.filingService.getFilingValidationOnUI(request),
            // supervisor: this.coreService.getCoreDropdown(1035, this.dropdownRequestsub),

        })
        .subscribe({

            next: (response) => {
                    this.dropdownOptions.filingdef = this.action == "view" ? response.filingtype.payload : response.filingtype.payload.filter(x => response.validationtype.payload.modules.includes(x.dropdownID))
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            },
        });
        this.filingtype()
        this.filingService.getFilingValidationOnUI(request).subscribe({

            next: (value: any) => {

                var curretndate = new Date

                var before = value.payload.canFileBefore
                var after = value.payload.canFileAfter

                if (before != null && before > 0) {
                    this.min = new Date(curretndate.setDate(curretndate.getDate() + before + 1))
                    this.filingForm.get('dateFrom').enable();
                    this.filingForm.get('dateTo').enable();
                    console.log('1')
                } else if (after != null && after > 0) {
                    this.min = new Date(curretndate.setDate(curretndate.getDate() - after))
                    this.filingForm.get('dateFrom').enable();
                    this.filingForm.get('dateTo').enable();
                    console.log('2')

                } else {
                    this.min = new Date(1994, 1, 1)
                    this.filingForm.get('dateFrom').enable();
                    this.filingForm.get('dateTo').enable();
                    console.log('3')

                }
            }
        })
    }

    isexpire() {
        myData.isexpire = this.filingForm.value.includeExpiry
    }

   empdropdown() {
        debugger
        this.filingForm.get('filingTypes').setValue(0)
    setTimeout(() => {
            this.ecnrypeemployee = this.crypid[0]?.encryptID
    }, 2000);
    }

    shiftcodedrop() {
        this.dialogShown = false;
        this.ecnrypeemployee = this.crypid[0]?.encryptID

        var arr = this.CSSource.map(e => (e.shiftId?.id || 0) || (e.shiftId.child[0]?.id || 0) || (e.shiftId.child[1]?.id || 0))

        arr.forEach(ee => {
            this.dropdownRequest.id.push({ dropdownID: ee, dropdownTypeID: 0 })
        });

        this.dropdownRequest.id = _.uniqBy(this.dropdownRequest.id, JSON.stringify)

        this.shiftService.getShiftPerDayDropdown(this.dropdownRequest)

            .subscribe({
                next: (response) => {

                    console.log(this.dropdownRequest)

                    this.dropdownOptions.shiftCodeDef = response.payload
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.CSmodalviewing()
                    this.ecnrypeemployee = this.crypid[0]?.encryptID
                },

            });

    }

    CSmodalviewing() {

        if (this.filingForm.value.filingTypes == 32 && !this.dialogShown) {
            if (this.viewingmodal) {
                this.viewingmodal.close();
            }
            this.CSSource.forEach(e => {
                e["new_shift"] = _.uniqBy([this.dropdownOptions.shiftCodeDef.filter(x => x.dropdownID == (e.shiftId?.id || 0) || x.dropdownID == (e.shiftId.child[0]?.id || 0) || x.dropdownID == (e.shiftId.child[1]?.id || 0)).map(y => y.description)], JSON.stringify)
            });



            this.viewingmodal = this.dialog.open(ModalBeforeSavingComponent, {
                panelClass: 'app-dialog',
                width: '50%',
                height: '40%',
                data: {
                    field: this.filingForm.value.filingTypes,
                    ds: this.CSSource,
                    empid: this.crypid[0]?.encryptID
                }
            });
            // Set the dialogShown variable to true to indicate that the dialog has been shown
            this.dialogShown = true;

            this.viewingmodal.afterClosed().subscribe((result) => {
                this.cssubmit = result;
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.cssubmit = false;
                }, 1000);
            });

        }
    }

    disabledsubmit(e){
        console.log(e)

    }

    getempdrop(){
        var employeedef
        var allemplodef
        forkJoin({
            supervisor: this.coreService.getCoreDropdownwithparam(1035, this.dropdownRequestsub,this.ecnrypeemployee),
            allemplo: this.coreService.getCoreDropdownwithparam(1011, this.dropdownRequestsub,this.ecnrypeemployee),
        })
        .subscribe({

            next: (response) => {
                employeedef = response.supervisor.payload
                allemplodef = response.allemplo.payload

            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            console.log(employeedef,'employeedef')
            console.log(allemplodef,'allemplodef')
            console.log(this.empidsss,'test')
            this.dropdownOptions.employeedef = employeedef
            this.dropdownOptions.allemplodef = allemplodef
            this.filingForm.get('employeeId').setValue(GF.IsEmptyReturn(this.empidsss,0))
            },
        });
    }

}
