import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { StepperSelectionEvent, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { TimekeepingCategoryForm , CSuite, FullFlexi,
         PartialFlexi, HalfDay, TardySetup, Bracket, Increment,
         FullFlexiElement } from 'app/model/employee/timekeeping-category';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { setValue, TranslocoModule } from '@ngneat/transloco';
import { forkJoin } from 'rxjs';
import { MasterService } from 'app/services/masterService/master.service';
import { CategoryService } from 'app/services/categoryService/category.service';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { ActivatedRoute, Router } from '@angular/router';
import _, { replace } from 'lodash';
import { GF } from 'app/shared/global-functions';
import { fuseAnimations } from '@fuse/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatIconModule } from '@angular/material/icon';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from 'mat-timepicker';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { TimekeepingService } from 'app/services/timekeepingService/timekeeping.service';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface PeriodicElement
{
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;

}

const ELEMENT_DATA0: PeriodicElement[] =
[
    { Monday: '2', Tuesday: '0', Wednesday: '15', Thursday: '1', Friday: '23', Saturday: '0' ,Sunday:'25'},

];



// FullFlexi
const ELEMENT_FullFlexi: FullFlexiElement[] = [
    { days: 'Monday',    hours_work:'mondayHrs',    minutes:'mondayMins',    deduct_break:'mondayDeductBreak',    break_type:'mondayBreakTypeId'    },
    { days: 'Tuesday',   hours_work:'tuesdayHrs',   minutes:'tuesdayMins',   deduct_break:'tuesdayDeductBreak',   break_type:'tuesdayBreakTypeId'   },
    { days: 'Wednesday', hours_work:'wednesdayHrs', minutes:'wednesdayMins', deduct_break:'wednesdayDeductBreak', break_type:'wednesdayBreakTypeId' },
    { days: 'Thursday',  hours_work:'thursdayHrs',  minutes:'thursdayMins',  deduct_break:'thursdayDeductBreak',  break_type:'thursdayBreakTypeId'  },
    { days: 'Friday',    hours_work:'fridayHrs',    minutes:'fridayMins',    deduct_break:'fridayDeductBreak',    break_type:'fridayBreakTypeId'    },
    { days: 'Saturday',  hours_work:'saturdayHrs',  minutes:'saturdayMins',  deduct_break:'saturdayDeductBreak',  break_type:'saturdayBreakTypeId'  },
    { days: 'Sunday',    hours_work:'sundayHrs',    minutes:'sundayMins',    deduct_break:'sundayDeductBreak',    break_type:'sundayBreakTypeId'    },
];


export interface PeriodicElement2
{
    tardiness_from: string;
    tardiness_to : string ;
    deduct : string;
    action : string;


}

const ELEMENT_DATA2: PeriodicElement2[] =
[
    { tardiness_from: '1',tardiness_to:'3',deduct:'4',action:'5'},
    { tardiness_from: '1',tardiness_to:'3',deduct:'4',action:'5'},
    { tardiness_from: '1',tardiness_to:'3',deduct:'4',action:'5'},

];

const ELEMENT_Bracket: Bracket[] =
[
    { from: 0, to: 0, deduct: 0 }
];


@Component({
  selector: 'app-timekeeping-category',
  templateUrl: './timekeeping-category.component.html',
  styleUrls: ['./timekeeping-category.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CardTitleComponent,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    DropdownCustomComponent,
    MatSelectModule,
    MatTimepickerModule,
    TranslocoModule,
    MatTooltipModule,
    DropdownComponent

],
})
export class TimekeepingCategoryComponent implements OnInit {

    @Input() hide: boolean = true
    @Input() hidebuttons: boolean = false
    @Input() data: any;
    @Input() _id: string
    @Output() formChanged = new EventEmitter<any>();
    datas: any
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 12 };

    onChangeHour(event) {
        console.log('event', event);
    }

    // ngOnChanges(changes: SimpleChanges) {
    //
    //     if (changes.timekeepingCategoryForm) {
    //       console.log('Received new form group data from parent:', changes.timekeepingCategoryForm.currentValue);
    //     }
    //   }

    row2 = [
        {
            ids: '',
            names: '',
            emails: ''
        },
    ]

    displayedColumns: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    displayedColumns2: string[] = ['tardiness_from', 'tardiness_to', 'deduct', 'action',];

    failedMessage = { ...FailedMessage }

    dataSource = ELEMENT_DATA0;
    dataSource2 = ELEMENT_DATA2

    pipe = new DatePipe('en-US');
    istimeerrror: boolean = false
    istimeerrrorto: boolean = false
    istimeerrrortounder: boolean = false
    istimeerrrorunder: boolean = false
    orient: string = "horizontal"
    night_diff = [];
    Over_Time = [];
    Rest_day = [];
    schedule_hour = [];
    dynamiRounding_Policy = [];
    dynamiRounding_Policy_2 = [];
    dropdownOptions = new DropdownOptions
    dropdownRequest = new DropdownRequest
    nightdiff: FormGroup
    overtime: FormGroup
    restday: FormGroup
    holiday: FormGroup
    tardiness: FormGroup
    halfday: FormGroup
    schedulehour: FormGroup
    id: string;
    holidayList = []
    holidayType = [
        { description: "Company Holiday", id: 1 },
        { description: "Regular Holiday", id: 2 },
        { description: "Special Holiday", id: 3 },
    ]

    tkcat = [
        { id: 1, description: 'RNF' },
        { id: 2, description: 'Spvr' },
        { id: 3, description: 'Mgr' },
    ]

    isHourWorks = false

    assume_backFromTime = '22:00 PM';
    newTimeFrom = {
        hour: null,
        min: null,
        timeclock: null,
    };

    assume_backToTime = '06:00 AM';
    newTimeTo = {
        hourTO: null,
        minTO: null,
        timeclockTO: null,
    };

    newTime = {
        hour: null,
        min: null,
        timeclock: null
    }
    assume_backendTime = '1:32 AM';


    //--------new-----------------------------
    @Input() parentDetail: any[]
    view: boolean = false
    // dataSource = ELEMENT_DATA0;
    @ViewChild('bracket') bracket: MatTable<any>;
    @ViewChild('bracketUndertime') bracketUndertime: MatTable<any>;
    @ViewChild('bracketNightDiff') bracketNightDiff: MatTable<any>;
    @ViewChild('tabGroup') tabGroup: MatTabGroup;

    dropdownFixRequest = new DropdownRequest
    dropdownBreakRegRequest = new DropdownRequest
    dropdownBreakRequest = new DropdownRequest
    scheduleType = []
    breakTypeReg = []
    breakType = []
    halfdayType = []
    tardyUnderType = []
    displayOnType = []
    displayOnTypeF = []
    roundPolicyType = []
    regular_RG_OT_Type = []
    regular_RD_OT_Type = []
    regular_WR_OT_Type = []
    regular_PR_OT_Type = []
    preapp_PR_OT_Type = []
    baseOnType = []
    holidayRuleType = []
    hoursbasis = []
    nightdiffbasis = []
    ds_tardiness = [{ from: 0, to: 0, deduct: 0 }]
    dc_bracket: string[] = ['from', 'to', 'deduct', 'delete'];
    // ds_tardiness = ELEMENT_Bracket
    ds_increment = [{ roundId: 0, mins: 0 }]
    ds_undertime = [{ from: 0, to: 0, deduct: 0 }]
    ds_nightdiff = [{ from: 0, to: 0, deduct: 0 }]
    byBracketTitle = "Tardiness and Undertime"
    showUndertimeBracket: boolean = false
    isDialogOpen = false;
    //--------new-----------------------------
    timekeepingCategoryForm: FormGroup
    CSuiteForm: FormGroup
    FullFlexiForm: FormGroup
    PartialFlexiForm: FormGroup
    HalfDayForm: FormGroup
    TardySetupForm: FormGroup
    BracketForm: FormGroup
    BracketUndertimeForm: FormGroup
    BracketNightDiffForm: FormGroup
    IncrementNightDiffForm: FormGroup
    IncrementForm: FormGroup
    SumIncrementForm: FormGroup
    BreakTypeForm: FormGroup
    BreakTypeDetailForm: FormGroup

    // FullFlexi
    dc_FullFlexi: string[] = ['days', 'hours_work', 'minutes', 'deduct_break', 'break_type'];
    ds_FullFlexi = ELEMENT_FullFlexi;

    assume_logs = []
    assume_logsfull = []

    //#region Overtime Setting
    otColumns: string[] = ['description', 'basedOn', 'schedCarryOver', 'shiftBreak', 'breakType'];
    otSettingsData = [];
    searchType: string = '';

    shiftBreakList = [
        { description: "Yes", dropdownID: true },
        { description: "No", dropdownID: false },
    ]
    schedCarryOverList = [
        { description: "Yes", dropdownID: true },
        { description: "No", dropdownID: false },
    ]

    saveMessage = Object.assign({}, SaveMessage)
    isDDLoaded: boolean = false;
    customRequest = new DropdownRequest
    //#endregion


    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private message: FuseConfirmationService,
        private masterService: MasterService,
        private categoryService: CategoryService,
        private timekeepingService: TimekeepingService,
        private router: Router,
        private cdr : ChangeDetectorRef,


    ) { }


    get tk() { return this.timekeepingCategoryForm.getRawValue() }
    get hd() { return this.HalfDayForm.value }
    get ts() { return this.TardySetupForm.value }
    get cs() { return this.CSuiteForm.value }
    get ff() { return this.FullFlexiForm.value }
    get pf() { return this.PartialFlexiForm.value }
    get bf() { return this.BracketForm.value }
    get bu() { return this.BracketUndertimeForm.value }
    get if() { return this.IncrementForm.value }
    get si() { return this.SumIncrementForm.value }
    get bnd() { return this.BracketNightDiffForm.value }
    get ind() { return this.IncrementNightDiffForm.value }

    ngOnChanges() {
        if (this.parentDetail !== undefined) {
            this.view = this.parentDetail["view"]
            this.id = this._id
            this.ngOnInit()
        }
    }

    ngOnInit() {
        //--------new-----------------------------
        // this.timekeepingCategoryForm.valueChanges.subscribe((value: any) => { this.formChanged.emit(this.timekeepingCategoryForm); });
        this.id = this.route.snapshot.paramMap.get('id');

        if (this.parentDetail !== undefined) {
            this.view = this.parentDetail["view"]
            this.id = this._id
            // if (this.parentDetail["edit"]) {
            //     this.patchData(this.data)
            // }
        }
        this.timekeepingCategoryForm = this.fb.group(new TimekeepingCategoryForm());
        this.CSuiteForm = this.fb.group(new CSuite())
        this.FullFlexiForm = this.fb.group(new FullFlexi())
        this.PartialFlexiForm = this.fb.group(new PartialFlexi())
        this.HalfDayForm = this.fb.group(new HalfDay())
        this.TardySetupForm = this.fb.group(new TardySetup())
        this.BracketForm = this.fb.group(new Bracket())
        this.BracketUndertimeForm = this.fb.group(new Bracket())
        this.IncrementForm = this.fb.group(new Increment())
        this.SumIncrementForm = this.fb.group(new Increment())
        this.BracketNightDiffForm = this.fb.group(new Bracket())
        this.IncrementNightDiffForm = this.fb.group(new Increment())
        // this.TardySetupForm.get('tardyRoundingId').reset()

        //--------new-----------------------------
        this.timekeepingCategoryForm.disable()
        this.CSuiteForm.disable()
        this.HalfDayForm.disable()
        this.PartialFlexiForm.disable()
        this.TardySetupForm.disable()

        if (this.id !== "") {
            this.categoryService.getTimekeepingCategory(this.id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.patchData(value)
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
        } else {

            if (sessionStorage.getItem('moduleId') == '17') {
                debugger
                this.timekeepingCategoryForm.patchValue(JSON.parse(JSON.stringify(GF.IsEmptyReturn(this.datas, this.data)).replace(/\:null/gi, "\:[]"))),
                    this.setTime(this.data.nightDiffIn, this.timekeepingCategoryForm, "nightDiffIn"),
                    this.setTime(this.data.nightDiffOut, this.timekeepingCategoryForm, "nightDiffOut")
            } else {
                this.setTime("22:00 AM", this.timekeepingCategoryForm, "nightDiffIn")
                this.setTime("6:00 AM", this.timekeepingCategoryForm, "nightDiffOut")
            }
            this.loadDropdown()
        }
    }

    loadDropdown() {
        this.isDDLoaded = false;
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 71 })
        // this.dropdownFixRequest.id.push({dropdownID: 0, dropdownTypeID: 107 })//break type
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 108 })//schedule type
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 109 })
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 110 })
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 111 })
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 112 })
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 113 })
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 114 })
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 147 })
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 148 })
        this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 181 })

        this.dropdownBreakRegRequest.id.push({ dropdownID: 0, dropdownTypeID: 30048 })
        this.dropdownBreakRequest.id.push({ dropdownID: 0, dropdownTypeID: 30049 }, { dropdownID: 0, dropdownTypeID: 30048 }) // 30049 - breakType
        this.customRequest.id = this.dropdownBreakRequest.id;
        this.dropdownBreakRequest.length = 50;

        forkJoin({
            otSettings: this.timekeepingService.getOvertimeScenario(),
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFixRequest),
            breakTypeReg: this.categoryService.getBreakTypeDropdown(this.dropdownBreakRegRequest),
            breakType: this.categoryService.getBreakTypeDropdown(this.dropdownBreakRequest)
        }).subscribe({

            next: (res) => {
                this.breakTypeReg = _.uniqBy(res.breakTypeReg.payload, JSON.stringify)//.filter(x=>x.dropdownTypeID === 30048)
                this.breakType = _.uniqBy(res.breakType.payload, JSON.stringify)//.filter(x=>x.dropdownTypeID === 30049)
                this.scheduleType = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 108)
                this.halfdayType = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 109)
                this.tardyUnderType = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 110)
                this.displayOnTypeF = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 110 && item.dropdownID !== 30060 && item.dropdownID !== 31159)
                this.roundPolicyType = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 111)
                this.regular_RG_OT_Type = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 112 && item.dropdownID !== 30597 && item.dropdownID !== 31141 && item.dropdownID !== 31146)//=== 112 && item.dropdownID !==30597 && item.dropdownID!==30627 && item.dropdownID!==30636 && item.dropdownID!==30635 && item.dropdownID !== 31146)
                this.regular_RD_OT_Type = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 112 && item.dropdownID !== 30597 && item.dropdownID !== 31141 && item.dropdownID !== 31146)
                this.regular_PR_OT_Type = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 112 && item.dropdownID !== 30597 && item.dropdownID !== 31146)
                this.preapp_PR_OT_Type = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 112 && item.dropdownID == 31146)
                this.baseOnType = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 113)
                this.holidayRuleType = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 114)
                this.hoursbasis = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 147)
                this.assume_logs = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 148)
                this.assume_logsfull = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 148 && item.dropdownID !== 30651 && item.dropdownID !== 30649)
                this.nightdiffbasis = res.dropdownFix.payload.filter(item => item.dropdownTypeID === 181)

                this.otSettingsData = GF.IsEmptyReturn(this.otSettingsData, res.otSettings['payload']);
                this.otSettingsData = this.otSettingsData.map((x, i) => ({ ...x, indx: i }))
                this.isDDLoaded = true;
            },

            error: (e) => {
                console.error(e)
            },
            complete: () => {
                this.timekeepingCategoryForm.enable()
                this.CSuiteForm.enable()
                this.HalfDayForm.enable()
                this.PartialFlexiForm.enable()
                this.TardySetupForm.enable()
            },
        });

    }

    patchData(value) {
        this.timekeepingCategoryForm.patchValue(JSON.parse(JSON.stringify(value.payload).replace(/\:null/gi, "\:[]")))

        // this.timekeepingCategoryForm.get('rHBased').setValue(value.payload.rhBased)
        // this.timekeepingCategoryForm.get('sNHBased').setValue(value.payload.snhBased)
        // this.timekeepingCategoryForm.get('sWHBased').setValue(value.payload.swhBased)
        // this.timekeepingCategoryForm.get('cHBased').setValue(value.payload.chBased)

        this.timekeepingCategoryForm.get('rHShift').setValue(value.payload.rhShift)
        this.timekeepingCategoryForm.get('cHShift').setValue(value.payload.chShift)
        this.timekeepingCategoryForm.get('sNHShift').setValue(value.payload.snhShift)
        this.timekeepingCategoryForm.get('sWHShift').setValue(value.payload.swhShift)

        this.timekeepingCategoryForm.get('rHRule').setValue(value.payload.rhRule)
        this.timekeepingCategoryForm.get('sNHRule').setValue(value.payload.snhRule)
        this.timekeepingCategoryForm.get('sWHRule').setValue(value.payload.swhRule)
        this.timekeepingCategoryForm.get('cHRule').setValue(value.payload.chRule)

        // this.timekeepingCategoryForm.get('wRDMax').setValue(value.payload.wrdMax)
        // this.timekeepingCategoryForm.get('wRDMin').setValue(value.payload.wrdMin)
        // this.timekeepingCategoryForm.get('sNHMin').setValue(value.payload.snhMin)
        // this.timekeepingCategoryForm.get('sNHMax').setValue(value.payload.snhMax)
        // this.timekeepingCategoryForm.get('sWHMin').setValue(value.payload.swhMin)
        // this.timekeepingCategoryForm.get('sWHMax').setValue(value.payload.swhMax)
        // this.timekeepingCategoryForm.get('cHMin').setValue(value.payload.chMin)
        // this.timekeepingCategoryForm.get('cHMax').setValue(value.payload.chMax)
        this.timekeepingCategoryForm.get('rDMin').setValue(value.payload.rdMin)
        this.timekeepingCategoryForm.get('rDMax').setValue(value.payload.rdMxa)
        // this.timekeepingCategoryForm.get('rHMin').setValue(value.payload.rhMin)
        // this.timekeepingCategoryForm.get('rHMax').setValue(value.payload.rhMax)



        this.timekeepingCategoryForm.get('rHPrio').setValue(value.payload.rhPrio)
        this.timekeepingCategoryForm.get('cHPrio').setValue(value.payload.chPrio)
        this.timekeepingCategoryForm.get('sWHPrio').setValue(value.payload.swhPrio)
        this.timekeepingCategoryForm.get('sHPrio').setValue(value.payload.shPrio)


        // this.timekeepingCategoryForm.get('wRDOTBreakTypeId').setValue(value.payload.wrdotBreakTypeId)
        this.timekeepingCategoryForm.get('preAppOTTypeId').setValue(value.payload.preAppOTTypeId)
        // this.timekeepingCategoryForm.get('rDOTBreakTypeId').setValue(value.payload.rdotBreakTypeId)
        this.timekeepingCategoryForm.get('wRDOTTypeId').setValue(value.payload.wrdotTypeId)
        this.timekeepingCategoryForm.get('rDOTTypeId').setValue(value.payload.rdotTypeId)
        // this.timekeepingCategoryForm.get('rhHolidayBreak').setValue(value.payload.rhHolidayBreak)
        // this.timekeepingCategoryForm.get('snHolidayBreak').setValue(value.payload.snHolidayBreak)
        // this.timekeepingCategoryForm.get('swHolidayBreak').setValue(value.payload.swHolidayBreak)
        // this.timekeepingCategoryForm.get('chHolidayBreak').setValue(value.payload.chHolidayBreak)
        this.timekeepingCategoryForm.get('rdMinutesAfterSchedIn').setValue(value.payload.rdMinutesAfterSchedIn)
        // this.timekeepingCategoryForm.get('thresholdHoursAfterClockIn').setValue(value.payload.thresholdHoursAfterClockIn)
        // this.timekeepingCategoryForm.get('workBreakHours').setValue(value.payload.workBreakHours)
        // this.timekeepingCategoryForm.get('rDBreakHours').setValue(value.payload.rdBreakHours)

        this.FullFlexiForm.patchValue(value.payload.fullFlexi)
        this.PartialFlexiForm.patchValue(value.payload.partialFlexi)
        this.HalfDayForm.patchValue(value.payload.halfDay)
        this.TardySetupForm.patchValue(value.payload.tardySetup)
        this.CSuiteForm.patchValue(value.payload.cSuite)
        this.ds_tardiness = value.payload.tardySetup.tardyBracket
        this.ds_undertime = value.payload.tardySetup.undertimeBracket
        this.ds_nightdiff = value.payload.nightDiffBracket


        //#region OT Settings
        this.otSettingsData = GF.IsEmptyReturn(value.payload?.scenario, []);
        this.otSettingsData = this.otSettingsData ?? this.otSettingsData.map((x, i) => ({ ...x, indx: i }))

        this.otSettingsData.filter(x => x.breakType > 0).forEach(item => {
            this.dropdownBreakRequest.id = this.dropdownBreakRequest.id.filter(x => x.dropdownID != item.breakType && x.dropdownID != 0)
            this.dropdownBreakRequest.id.push({ dropdownID: item.breakType, dropdownTypeID: 30049 }, { dropdownID: item.breakType, dropdownTypeID: 30048 })
        });

        this.loadDropdown();
        //#endregion

        this.setTime(value.payload.nightDiffIn, this.timekeepingCategoryForm, "nightDiffIn")
        this.setTime(value.payload.nightDiffOut, this.timekeepingCategoryForm, "nightDiffOut")
    }

    setTime(assume_backendTime, form: FormGroup, fc) {
        this.newTime.timeclock = assume_backendTime.replace(/[^a-z]/gi, '');
        let timeArry = assume_backendTime.split(/[ :]+/);
        this.newTime.hour = timeArry[0];
        this.newTime.min = timeArry[1];
        let patchTime = new Date()
        patchTime.setHours(this.newTime.hour, this.newTime.min);
        form.controls[fc].patchValue(patchTime);
    }

    nightDiff_RP() {
        this.ds_nightdiff = [{ from: 0, to: 0, deduct: 0 }]
        if (this.tk.nightDiffRoundingId === 30061) {
            this.timekeepingCategoryForm.get("nightDiffMin").setValue(0)
            this.timekeepingCategoryForm.get("nightDiffMax").setValue(0)
            this.timekeepingCategoryForm.get("nightDiffMin").disable()
            this.timekeepingCategoryForm.get("nightDiffMax").disable()
        } else {
            this.timekeepingCategoryForm.get("nightDiffMin").enable()
            this.timekeepingCategoryForm.get("nightDiffMax").enable()
        }
    }

    val_changes(ds, k, e, i) {
        ds[i][k] = Number(e.target.value)
    }

    addTardiness() {
        var obj = { from: 0, to: 0, deduct: 0 }
        this.ds_tardiness.push(obj)
        this.bracket.renderRows()
    }

    addUndertime() {
        var obj = { from: 0, to: 0, deduct: 0 }
        this.ds_undertime.push(obj)
        this.bracketUndertime.renderRows()
    }

    addNightDiff() {
        var obj = { from: 0, to: 0, deduct: 0 }
        this.ds_nightdiff.push(obj)
        this.bracketNightDiff.renderRows()
    }

    addTable1() {
        const obj = {
            ids: '',
            names: '',
            emails: ''
        }
        this.row2.push(obj)
    }

    deleteTardiness(x) {
        this.ds_tardiness.splice(x, 1);
        this.bracket.renderRows()
    }

    deleteUndertime(x) {
        this.ds_undertime.splice(x, 1);
        this.bracketUndertime.renderRows()
    }

    deleteNightDiff(x) {
        this.ds_nightdiff.splice(x, 1);
        this.bracketNightDiff.renderRows()
    }

    // submit2(){}
    //     addRow2() {
    //         this.dynamiRounding_Policy_2.push({ RANGE_FROM:'', RANGE_TO:'', DEDUCT_MINS:''});
    //         // console.log('New row added successfully', 'New Row');
    //     }
    //     addRow_restday() {
    //         this.Rest_day.push({ RANGE_FROM:'', RANGE_TO:'', DEDUCT_MINS:''});
    //         // console.log('New row added successfully', 'New Row');
    //     }
    //     addRow_overtime() {
    //         this.Over_Time.push({ RANGE_FROM:'', RANGE_TO:'', DEDUCT_MINS:''});
    //         // console.log('New row added successfully', 'New Row');
    //     }
    //     addRow_nightdiff() {
    //         this.night_diff.push({ });
    //         // console.log('New row added successfully', 'New Row');
    //     }
    //     Delete(index): void {
    //         this.dynamiRounding_Policy.splice(index, 1);
    //     }
    //     Delete2(index): void {
    //         this.dynamiRounding_Policy_2.splice(index, 1);
    //     }
    //     Delete_restday(index): void {
    //         this.Rest_day.splice(index, 1);
    //     }
    //     Delete_overtime(index): void {
    //         this.Over_Time.splice(index, 1);
    //     }
    //     Delete_nightdiff(index): void {
    //         this.night_diff.splice(index, 1);
    //     }


    changeOrient() {
        if (this.orient == "vertical") {
            this.orient = "horizontal"
        } else {
            this.orient = "vertical"
        }
    }

    convert(iden) {
        var values = this.timekeepingCategoryForm.value.thresholdHoursAfterClockIn
        var float = parseFloat(values)
        // let number : number =  parseFloat(value)
        if (iden == 'thresholdHoursAfterClockIn') {
            this.timekeepingCategoryForm.get('thresholdHoursAfterClockIn').setValue(float)
        }

    }

    //   addHoliday() {
    //     //
    //     const selected = this.holidayType.filter(x => x.id === this.holiday.value.holidaytype)[0]
    //     const hasAdded = this.holidayList.filter(x => x.id === selected.id)

    //     if (hasAdded.length > 0) {0
    //       return
    //     }
    //     this.holiday.get("holidaytype").setValue(null)
    //     this.holidayList.push({
    //       id: selected.id,
    //       description: selected.description,
    //       noWork: false,
    //       prefDay: false,
    //       restdayWorking: false,
    //       musFiled: false,
    //     })
    //     // this.setValid()
    //   }
    onSelectionChanged(e) {
        // this.schedulehour.get("SetUpHalfday").setValue(false)
        // console.log(this.schedulehour.value.SetUpHalfday)
        // if (this.schedulehour.value.SetUpHalfday===false) {
        //   this.schedulehour.get("HoursWorkstart").setValue('0')
        //   this.schedulehour.get("HalfdayBasis").setValue('')
        //   this.schedulehour.get("HoursWorkEnd").setValue('0')
        // }
    }

    timeValidator() {
        console.log('condition satisfied 0');
        this.istimeerrror = false

        const In = this.pipe.transform(this.nightdiff.value.betweenhrs, 'HH:mm:ss')
        const Out = this.pipe.transform(this.nightdiff.value.hrsTo, 'HH:mm::ss')

        let fromTime = [];
        let toTime = [];
        fromTime = In.split(':');
        toTime = Out.split(':');

        if (parseInt(fromTime[0]) > parseInt(toTime[0])) {
            console.log('condition satisfied ');
            this.nightdiff.get('hrsTo').setValue('');
            this.istimeerrror = true
            // this.message.open(invalidhalfday);

        }
        else if (parseInt(fromTime[0]) === parseInt(toTime[0]) && parseInt(fromTime[1]) > parseInt(toTime[1])) {
            console.log('condition satisfied ');
            this.nightdiff.get('hrsTo').setValue('');
            this.istimeerrror = true
            // this.istimeerrror=true
            // this.message.open(invalidhalfday);
        }
    }

    // =====================For halfday====================
    greaterthan() {
        this.istimeerrror = false
        var start = this.schedulehour.value.HoursWorkstart
        var end = this.schedulehour.value.HoursWorkEnd
        if ((start !== null && start > 0) && (end !== null && end > 0) && (start !== end)) {
            if (start > end) {
                this.schedulehour.get('HoursWorkEnd').setValue('');
                this.istimeerrror = true

            }
        }
    }
    lessthan() {
        this.istimeerrrorto = false
        var start = this.schedulehour.value.HoursWorkstart
        var end = this.schedulehour.value.HoursWorkEnd
        if ((start !== null && start > 0) && (end !== null && end > 0) && (start !== end)) {
            if (start > end) {
                this.schedulehour.get('HoursWorkstart').setValue('');
                this.istimeerrrorto = true
            }

        }
    }
    // =====================For halfday====================
    greaterthansum(b, m, i) {
        // console.log(m)
        // this.istimeerrror=false
        // // var start = this.tardiness.get(b).value
        // // var end = this.tardiness.get(m).value
        // var start = this.ds_tardiness[i].from
        // var end = this.ds_tardiness[i].to
        // if ((start !== null && start > 0)&&(end !== null && end > 0)&&(start !==  end)) {
        //     if (start > end) {
        //         var start = this.ds_tardiness[i].from = 0
        //         var end = this.ds_tardiness[i].to = 0
        //         var end = this.ds_tardiness[i].deduct = 0
        //         // this.tardiness.get('sumOftardinessminutes').setValue('');
        //         // this.tardiness.get('sumOfundertimeminutes').setValue('');
        //         // this.tardiness.get('sumOfundertarmeminutes').setValue('');

        //         this.istimeerrror=true
        //     //   this.message.open(invalidsumoftardiness);

        //     }
        // }
    }
    lessthanmin(be, mi, i) {
        // console.log(be)
        // this.istimeerrrorto=false
        // // var start = this.tardiness.get(be).value
        // // var end = this.tardiness.get(mi).value
        // var start = this.ds_tardiness[i].from
        // var end = this.ds_tardiness[i].to
        // if ((start !== null && start > 0)&&(end !== null && end > 0)&&(start !==  end)) {
        //     if (start > end) {
        //         this.ds_tardiness[i].from = 0
        //         this.ds_tardiness[i].to = 0
        //         this.ds_tardiness[i].deduct = 0
        //         // this.tardiness.get('sumOftardinessBetween').setValue('');
        //         // this.tardiness.get('sumOfundertimeBetween').setValue('');
        //         // this.tardiness.get('sumOfundertarmeBetween').setValue('');
        //         this.istimeerrrorto=true
        //     //   this.message.open(invalidsumoftardiness);
        //     }
        // }
    }

    greaterthansumunder(j, l) {
        this.istimeerrrortounder = false
        var start = this.tardiness.get(j).value
        var end = this.tardiness.get(l).value
        if ((start !== null && start > 0) && (end !== null && end > 0) && (start !== end)) {
            if (start > end) {
                this.tardiness.get('sumOftarmeminutes').setValue('');
                this.istimeerrrortounder = true
                //   this.message.open(invalidsumoftardiness);

            }
        }
    }
    lessthanminunder(l, j) {
        this.istimeerrrorunder = false
        var start = this.tardiness.get(l).value
        var end = this.tardiness.get(j).value
        if ((start !== null && start > 0) && (end !== null && end > 0) && (start !== end)) {
            if (start > end) {
                this.tardiness.get('sumOftarbetween').setValue('');
                this.istimeerrrorunder = true
                //   this.message.open(invalidsumoftardiness);
            }

        }
    }

    resetfield() {
        // this.istimeerrrorto = false
        // this.istimeerrror = false
        // this.istimeerrrorunder = false
        // this.istimeerrrortounder = false
        this.TardySetupForm.get('tardyRoundingId').setValue(30063)
        this.TardySetupForm.get('undertimeRoundingId').setValue(30063)
        this.ds_tardiness = [{ from: 0, to: 0, deduct: 0 }]
        this.ds_undertime = [{ from: 0, to: 0, deduct: 0 }]
        this.byBracketTitle =
            this.tk.tardySetupId === 30060 ? "Tardiness and Undertime" :
                this.tk.tardySetupId === 30057 ? "Tardiness" :
                    this.tk.tardySetupId === 30059 ? "Tardiness" :
                        this.tk.tardySetupId === 30058 ? "Undertime" : ""

        if (this.tk.tardySetupId === 30059) {
            // this.TardySetupForm.get('tardyRoundingId').setValue(30061)
        }

        this.removeSelectedDoc()

        // var tardy = this.ts.tardySetupId
        // if (tardy == 30057 || tardy == 30058 || tardy == 30059 || tardy == 30060 ) {
        //     this.tardiness.get('sumOftardinessBetween').setValue('0');
        //     this.tardiness.get('sumOftardinessminutes').setValue('0');
        //     this.tardiness.get('sumOfundertimeBetween').setValue('0');
        //     this.tardiness.get('sumOfundertimeminutes').setValue('0');
        //     this.tardiness.get('tardiminues').setValue('');
        //     this.tardiness.get('tardidecay').setValue('');
        //     this.tardiness.get('tardi_Rounding_policy').setValue(null);
        //     this.tardiness.get('tardi_Rounding_policy_tardy').setValue('');
        //     this.tardiness.get('tardi_Rounding_policy_undertime').setValue('')
        //     this.tardiness.get('tardiminues').enable();
        //     this.tardiness.get('tardidecay').enable();
        //     this.tardiness.get('tarundermins').enable();
        //     this.tardiness.get('tarunderdecay').enable();
        //     this.tardiness.get('tarundergracemins').enable();
        //     this.tardiness.get('tarundergracedecay').enable();
        //

        // }else{
        //     // this.tardiness.value.tardidecay.enable();
        // }
        // // console.log(this.tardiness.value.tardySetupId)

    }

    Disablerd() {
        //  this.tardiness.value.tardi_Rounding_policy
        //  this.tardiness.value.tardi_Rounding_policy_tardy
        //  this.tardiness.value.tardi_Rounding_policy_undertime
        //    if (this.tardiness.value.tardi_Rounding_policy==="1" || this.tardiness.value.tardi_Rounding_policy_tardy==="1" ||
        //        this.tardiness.value.tardi_Rounding_policy_undertime==="1" ) {
        //     this.tardiness.get('tardiminues').disable();
        //     this.tardiness.get('tardidecay').disable();
        //     this.tardiness.get('tarundermins').disable();
        //     this.tardiness.get('tarunderdecay').disable();


        //    }else if(this.tardiness.value.tardi_Rounding_policy==="2" || this.tardiness.value.tardi_Rounding_policy==="3" ) {
        //     this.tardiness.get('tardiminues').enable();
        //     this.tardiness.get('tardidecay').enable();
        //    }else if (this.tardiness.value.tardi_Rounding_policy_tardy==="2" || this.tardiness.value.tardi_Rounding_policy_tardy==="3"){
        //     this.tardiness.get('tarundermins').enable();
        //     this.tardiness.get('tarunderdecay').enable();
        //    }

        if (this.TardySetupForm.value.tardyRoundingId === 30061) {
            this.TardySetupForm.get('tardyGrateMins').setValue(0);
            this.TardySetupForm.get('tardyMins').setValue(0);
            this.TardySetupForm.get('tardyGrateMins').disable();
            this.TardySetupForm.get('tardyMins').disable();
        } else {
            this.TardySetupForm.get('tardyGrateMins').enable();
            this.TardySetupForm.get('tardyMins').enable();
        }
    }

    Disablerdunder() {
        if (this.TardySetupForm.value.undertimeRoundingId === 30061) {
            this.TardySetupForm.get('undertimeGraceMins').setValue(0);
            this.TardySetupForm.get('undertimeMins').setValue(0);
            this.TardySetupForm.get('undertimeGraceMins').disable();
            this.TardySetupForm.get('undertimeMins').disable();
        } else {
            this.TardySetupForm.get('undertimeGraceMins').enable();
            this.TardySetupForm.get('undertimeMins').enable();
        }
    }

    validateData() {
        //TardySetup
        this.TardySetupForm.get('tardyBracket').setValue(this.ds_tardiness)
        this.TardySetupForm.get('tardyIncrement').setValue(this.if)
        this.TardySetupForm.get('undertimeBracket').setValue(this.ds_undertime)
        this.TardySetupForm.get('undertimeIncrement').setValue(this.if)
        this.TardySetupForm.get('sum').setValue(this.si)

        //TimekeepingCategory
        this.timekeepingCategoryForm.get('cSuite').setValue(this.cs)
        this.timekeepingCategoryForm.get('fullFlexi').setValue(this.ff)
        this.timekeepingCategoryForm.get('partialFlexi').setValue(this.pf)
        this.timekeepingCategoryForm.get('halfDay').setValue(this.hd)
        this.timekeepingCategoryForm.get('tardySetup').setValue(this.ts)
        this.timekeepingCategoryForm.get('nightDiffBracket').setValue(this.ds_nightdiff)
        this.timekeepingCategoryForm.get('nightDiffIncrement').setValue(this.ind)
        // var ndIn  = this.id === "" ? this.tk.nightDiffIn  : this.pipe.transform(this.tk.nightDiffIn,"HH:mm:ss")
        // var ndOut = this.id === "" ? this.tk.nightDiffOut : this.pipe.transform(this.tk.nightDiffOut,"HH:mm:ss")

        if (sessionStorage.getItem('moduleId') == '17') {
            var tk = this.tk
            tk.nightDiffIn = typeof this.tk.nightDiffIn != "string" ? this.pipe.transform(this.tk.nightDiffIn, "HH:mm:ss") : this.tk.nightDiffIn
            tk.nightDiffOut = typeof this.tk.nightDiffOut != "string" ? this.pipe.transform(this.tk.nightDiffOut, "HH:mm:ss") : this.tk.nightDiffOut
            return tk

        } else {
            var ndIn = this.pipe.transform(this.tk.nightDiffIn, "HH:mm:ss")
            var ndOut = this.pipe.transform(this.tk.nightDiffOut, "HH:mm:ss")
            var tk = this.tk
            tk.nightDiffIn = ndIn
            tk.nightDiffOut = ndOut
            return tk
        }
    }

    public confirm() {
        // SuccessMessage.title = "Confirmed"
        // SuccessMessage.message = "Transaction successfully saved"
        // this.message.open(SuccessMessage);
        this.id = ""
        this._id = ""
        var data = this.timekeepingCategoryForm.value
        this.datas = data
        this.formChanged.emit(this.validateData())
        // this.formChanged.emit(data)
    }

    submit() {
        var tk = this.validateData()
        // Duplicate
        var clone = (sessionStorage.getItem("action") == "duplicate")
        tk.timekeepingCategoryId = clone ? 0 : tk.timekeepingCategoryId
        tk.timekeepingCategoryCode = clone ? "" : tk.timekeepingCategoryCode
        tk.scenario = this.otSettingsData

        this.timekeepingCategoryForm.markAllAsTouched();

        var scheduleTypeId = this.timekeepingCategoryForm.get('scheduleTypeId').value;
        var placeHolderOut = this.timekeepingCategoryForm.get('placeHolderOut').value;
        var placeHolderIn = this.timekeepingCategoryForm.get('placeHolderIn').value;
        var placeholderOverlap = this.timekeepingCategoryForm.get('placeholderOverlap').value;


        if (scheduleTypeId === 0) {
            this.tabGroup.selectedIndex = 0
            return
        }

        if (placeHolderOut === null || placeHolderIn === null || placeholderOverlap === 0) {
            this.tabGroup.selectedIndex = 5
        }

        if (this.timekeepingCategoryForm.valid) {
            const dialogRef = this.message.open(SaveMessage);

            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    // this.isSave = true
                    this.categoryService.postTimekeepingCategory(tk).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.message.open(SuccessMessage);
                                // this.isSave = false,
                                this.router.navigate(['/search/timekeeping-category-view']);
                            }
                            else {
                                this.message.open(FailedMessage);
                                console.log(value.stackTrace)
                                console.log(value.message)
                            }
                        },
                        error: (e) => {
                            // this.isSave = false
                            this.message.open(FailedMessage);
                            console.error(e)
                        }
                    });
                }
            });
        }
    }

    clear(e) {
        if (e == 'regularOt' && this.timekeepingCategoryForm.value.regularOTTypeId !== 0) {
            // this.timekeepingCategoryForm.get('regularBreakHours').setValue(0)
            this.timekeepingCategoryForm.get('rdOtBreakTypeId').setValue(0)
        } else if (e == 'preaaproveot' && this.timekeepingCategoryForm.value.preAppOTTypeId !== 0) {
            // this.timekeepingCategoryForm.get('preBreakHours').setValue(0)
            this.timekeepingCategoryForm.get('preAppOTBreakTypeId').setValue(0)
        } else if (e == 'regularholiday' && this.timekeepingCategoryForm.value.rhShift !== 0) {
            // this.timekeepingCategoryForm.get('rHHours').setValue(0)
            this.timekeepingCategoryForm.get('rhHolidayBreak').setValue(0)
        } else if (e == 'specialholiday' && this.timekeepingCategoryForm.value.snhShift !== 0) {
            // this.timekeepingCategoryForm.get('sNHours').setValue(0)
            this.timekeepingCategoryForm.get('snHolidayBreak').setValue(0)
        } else if (e == 'specialworkingholiday' && this.timekeepingCategoryForm.value.swhShift !== 0) {
            // this.timekeepingCategoryForm.get('sWHours').setValue(0)
            this.timekeepingCategoryForm.get('swHolidayBreak').setValue(0)
        } else if (e == 'companyholiday' && this.timekeepingCategoryForm.value.chShift !== 0) {
            // this.timekeepingCategoryForm.get('cHHours').setValue(0)
            this.timekeepingCategoryForm.get('chHolidayBreak').setValue(0)
        }
    }

    removeSelectedDoc() {
        // return this.documentsList.filter(item=> item.dropdownID != this.sc[a] && item.dropdownID != this.sc[b])
        // if (this.TardySetupForm.value.tardySetupId !== undefined && this.TardySetupForm.value.tardySetupId !== null) {

        // this.displayOnTypeF = this.displayOnType.filter(item=>item.dropdownID!==30059 && item.dropdownID!== this.TardySetupForm.value.tardySetupId)
        // if (this.timekeepingCategoryForm.value.tardySetupId == 30060) {
        //     this.displayOnTypeF = this.displayOnType.filter(item=>item.dropdownID!==30059 && item.dropdownID!==30060)
        // } else {
        //     this.displayOnTypeF = this.displayOnType
        // }
        // }
        // console.log(list)
    }

    // emitFG(){
    //     this.tkForm.emit(this.timekeepingCategoryForm)
    // }

    clearOTBreak(field, event) {
        if (event.value) {
            field.breakType = 0;
        }
    }


    applyToAll(ev, field) {
        if (ev.indx !== 0 || this.isDialogOpen) { return; }

        this.isDialogOpen = true; // Set the guard to prevent multiple dialogs

        this.saveMessage.title = "Apply To All";
        this.saveMessage.message = "Are you sure you want to apply this setup to all?";
        this.saveMessage.actions.confirm.label = "Yes";
        this.saveMessage.actions.cancel.label = "No";

        let dialogRef = this.message.open(this.saveMessage);

        dialogRef.afterClosed().subscribe((result) => {
            this.isDialogOpen = false; // Reset guard after dialog is closed
            if (result === "confirmed") {
                this.otSettingsData.forEach(item => {
                    item[field] = this.otSettingsData[0][field];
                    if (field === 'shiftBreak' && this.otSettingsData[0][field]) {
                        item.breakType = 0;
                    } else if (field === 'breakType' && this.otSettingsData[0][field]) {
                        item.breakType = this.otSettingsData[0][field];
                    }
                });
            }
            this.cdr.detectChanges(); // Trigger change detection to update the view
        });
    }

    showMe(id, idList) {
        return GF.IsEqual(id, idList);
    }

    searchTypeHanlder() {
        return this.otSettingsData.filter(item => item.description.toLowerCase().includes(this.searchType.toLowerCase()));
    }
}
