import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { Employee, EmployeeInformation, EmployeeAdmin, EmployeeDependents, Unsaved, EmployeeMovement, EmployeeOther, EmployeeHoldPayroll } from 'app/model/employee/employee-detail';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CategoryService } from 'app/services/categoryService/category.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { forkJoin } from 'rxjs';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ShiftService } from 'app/services/shiftService/shift.service';
import { DropdownID } from 'app/model/dropdown-custom.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { GF } from 'app/shared/global-functions'
import _ from 'lodash';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { TableRequest } from 'app/model/datatable.model';
import { StorageServiceService } from 'app/services/storageService/storageService.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EffectiveDateComponent } from './effective-date/effective-date.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { fuseAnimations } from '@fuse/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatCardModule } from '@angular/material/card';
import { TimekeepingCategoryComponent } from 'app/modules/timekeeping/timekeeping-category/timekeeping-category.component';
import { PayrollCategoryComponent } from 'app/modules/payroll/payroll-category/payroll-category.component';
import { MatStepperModule } from '@angular/material/stepper';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { DropdownEntitlementComponent } from 'app/core/dropdown-entitlement/dropdown-entitlement.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { _tableModule } from 'app/modules/dashboard/_modal/_tables/_table.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DropdownHierarchyComponent } from 'app/core/dropdown-hierarchy/dropdown-hierarchy.component';

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
    selector: 'app-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.css'],
    providers: [
            provideNgxMask(),CurrencyPipe,

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
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatButtonModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatIconModule,
        MatCardModule,
        CardTitleComponent,
        TimekeepingCategoryComponent,
        PayrollCategoryComponent,
        DropdownComponent,
        DropdownCustomComponent,
        DropdownEntitlementComponent,
        DropdownHierarchyComponent,
        NgxMaskDirective,
        MatPaginatorModule,
        MatGridListModule,
        MatSelectInfiniteScrollModule,
        _tableModule,
        TranslocoModule,
        MatDialogModule,
        MatMenuModule,
        MatDatepickerModule,
        TranslocoModule,
        MatCheckboxModule
    ],
})
export class EmployeeDetailComponent implements OnInit {

    // form = new FormGroup({
    //     rateMonthly : new FormControl('', { })
    // });
    // rateMonthly : number

    formControlsFetched = false;
    formGroup: FormGroup[];
    pipe = new DatePipe('en-US');
    @ViewChild('BioTable') BioTable: MatTable<any>;
    @ViewChild(TimekeepingCategoryComponent) tkComponent: TimekeepingCategoryComponent;
    @ViewChild('Table_payroll') Table_payroll: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(PayrollCategoryComponent) payrollsubmit: PayrollCategoryComponent;
    employeeForm: FormGroup
    adminForm: FormGroup
    unSavedForm: FormGroup
    employeeDependentsForm: FormGroup
    employeeInformationForm: FormGroup
    payrollstatForm: FormGroup

    //tk category
    timekeepingCategoryForm: any
    payrollForm: any

    dropdownFixRequest = new DropdownRequest;
    dropdownRequest = new DropdownRequest
    dropdownCutoffRequest = new DropdownRequest
    dropdownDefRequest = new DropdownRequest
    dropdownOptions = new DropdownOptions
    dropdownID = new DropdownID
    dropdownCustom = new DropdownRequest
    dropdownRequestsub = new DropdownRequest
    category = new DropdownRequest
    supervisor = new DropdownRequest
    subcompany = new DropdownRequest
    access = new DropdownRequest
    branch = new DropdownRequest
    payrollacc = new DropdownRequest
    timekeeping = new DropdownRequest
    edlRequest = new TableRequest
    shiftRequest = new TableRequest
    minDate: Date;
    maxDate: Date;
    date: Date;
    age: number;
    id: string;
    dt: Date;
    isEdit: boolean = false
    imagefile = []
    moduleId : any
    transactionId : any

    exceptiontk = [
        { id: 1, description: 'Timekeeping' },
        { id: 2, description: 'Payroll' },
        // {id: 2, description: 'Employee Category'},
        // {id: 3, description: 'Access Control'},
    ];

    exceptiontk_old = this.exceptiontk.slice()
    relationship = []
    dependents = []

    indef = [
        { id: 1, description: 'By Cutoff' },
        { id: 2, description: 'Indefinite' },
    ];


    dataSource: any = []
    displayedColumns: string[] = ['shiftCode', 'date', 'scheduleIn', 'scheduleOut', 'firstBreakIn', 'firstBreakOut', 'secondBreakIn', 'secondBreakOut', 'thirdBreakIn', 'thirdBreakOut', 'workingHours'];

    displayedColumns_leave: string[] = ['leave_type', 'earned' ,'carried' ,'expired', 'total_balance', 'leave_used', 'pending_approval', 'pending_schedule', 'available'];
    dataSource_leave: any[] = []

    displayedColumns_dependent: string[] = ['idRelationship', 'firstName', 'middleName', 'lastName', 'birthDate', 'age', 'action'];
    dataSource_dependents = [];
    datasource_employeeOther = []
    datasource_employeeMovement = []
    displayedColumns_payroll: string[] = ['actionPay', 'onHoldReason', 'rangeId', 'dateFrom', 'dateTo', 'dateCreated', 'createdByName'];
    dataSource_payroll : any = []

    displayedColumns_EDL: string[] = ['type' ,'employeeId' ,'paycode' ,'amount' ,'cutoffId' ,'recurStartDate' ,'recurEndDate' ]
    dataSource_EDL: any[] = []

    @ViewChild('Table_dependents') Table_dependents: MatTable<any>;
    formData: any;
    selectedTab: string = '';
    isSave: boolean = false
    selectedProject: string = 'emp-pei.pei';
    selectedProject1: string = 'emp-woi';
    selectedProject2: string = 'emp-pai';
    selectedProject3: string = 'emp-s'
    selectedProject4: string = 'emp-l'
    selectedProject5: string = 'emp-O'
    selectedProject6: string = 'Exception'
    selectedProject7: string = 'Admin'
    selectedProject8: string = 'EDL'

    isPeI: boolean = true   // personal information
    isWoI: boolean = false  // work information
    isPaI: boolean = false  // payroll information
    isS: boolean = false    // shift
    isL: boolean = false    // leave
    isOther: boolean = false //others
    isException: boolean = false //exceptions
    isAdminTab: boolean = false //Admin
    isEDLTab: boolean = false //Admin

    isAdmin: boolean = false //Admin
    isView: boolean = true //view
    profile: boolean = false //view own profile
    monRate = 22323;

    isPeIfocus = "bg-default"
    isWoIfocus = ""
    isPaIfocus = ""
    isSfocus = ""
    isLfocus = ""
    isOtherfocus = ""
    isEfocus = ""
    isAdfocus = ""
    isEDLfocus = ""
    parentDetail = []
    submitbutton: boolean = true
    //added 4/26/2023
    personalIndex = 0
    selectedCategory = ""
    target = sessionStorage.getItem('u')
    dialogRef: MatDialogRef<EffectiveDateComponent, any>;
    movements = []

    hidePayroll: boolean = true
    hideAdmin: boolean = true
    hideOthers: boolean = true
    buttondis: boolean = false
    imageUrl: SafeResourceUrl = "images\\avatars\\computer-icons-user.jpg"
    imageprev : any
    loginId = 0
    totalRows: number = 0
    moduleIdstr: string = ""
    failedMessage = {...FailedMessage}
    manual: boolean = false

    fields = {
        rateMonthly: true,
        rateSemiMonthly: true,
        rateDaily: true,
        rateHourly: true,
    }

    edcHRList:any = []

    constructor(
        private fb: FormBuilder,
        private masterService: MasterService,
        // private shiftService: ShiftService,
        private payrollService: PayrollService,
        private tenantService: TenantService,
        private userService: UserService,
        private shiftService: ShiftService,
        private categoryService: CategoryService,
        private message: FuseConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private cp: CurrencyPipe,
        private coreService: CoreService,
        private storageServiceService: StorageServiceService,
        private dialog: MatDialog,
        private cd : ChangeDetectorRef,
    ) { }

    get ei() { return this.employeeInformationForm.getRawValue() }
    get ex() { return this.unSavedForm.getRawValue() }
    get ef() { return this.employeeForm.getRawValue() }
    get ec() { return this.employeeForm.controls }

    async ngOnInit() {
        this.changeTab('pei')
        // this.payrollForm = this.fb.group(new PayrollHeader());
        // this.timekeepingCategoryForm = this.fb.group(new TimekeepingCategoryForm());
        // this.employeeInformationForm.get('rateMonthly').setValue(this.cp.transform(100, 'PHP', 'symbol', '1.2-2'))
        this.parentDetail["view"] = true
        var action = sessionStorage.getItem("action")
        if (action == "view") {
            this.submitbutton = false
            this.isView = true
            this.isAdmin = true
        } else if (action == "view-profile"){
            this.submitbutton = false
            this.isView = true
            this.isAdmin = false
            this.hidePayroll = false
            this.profile = true
        } else {
            this.submitbutton = true
            this.isView = false
            this.isAdmin = true
        }

        if (sessionStorage.getItem('al') == 'Tg3R3dzL5d8qh2W0SyphdQ%3d%3d' || sessionStorage.getItem('al') == 'jJOtHsRVwYECOhoiBc69dA%3d%3d') {
            this.isAdmin = true
            this.hidePayroll = false
            this.hideAdmin = false
            this.hideOthers = false
        }


        this.maxDate = new Date();
        this.maxDate.setMonth(this.maxDate.getMonth() - 12 * 18);

        this.id = this.route.snapshot.paramMap.get('id');
        this.employeeForm = this.fb.group(new Employee());
        this.unSavedForm = this.fb.group(new Unsaved());
        this.employeeDependentsForm = this.fb.group(new EmployeeDependents());
        this.employeeInformationForm = this.fb.group(new EmployeeInformation());
        this.adminForm = this.fb.group(new EmployeeAdmin());
        this.payrollstatForm = this.fb.group(new EmployeeHoldPayroll)
        // this.payrollForm = this.fb.group(new EmployeeHoldPayroll());
        this.datasource_employeeOther.push(new EmployeeOther())
        this.datasource_employeeMovement.push(new EmployeeMovement())
        // this.timekeepingCategoryForm = this.fb.group(new timekeepingCategoryException())

        // var a  = this.curpipe.transform(this.nf.monthlyRate,'PHP', 'symbol', '1.2-2');
        // console.log(a)

        this.employeeInformationForm.get('idPayroll').setValue(null)
        this.employeeInformationForm.get('idTimekeeping').setValue(null)
        this.employeeForm.get('birthDate').setValue("")
        this.employeeDependentsForm.get('birthDate').setValue("")
        this.employeeForm.get('weight').setValue(null)
        this.employeeForm.get('height').setValue(null)
        this.employeeForm.get('idEmergencyRelation').setValue(0)
        this.employeeDependentsForm.get('idRelationship').setValue("")
        this.employeeDependentsForm.get('age').setValue("")

        this.unSavedForm.get('exceptionCateg').setValue("")

        this.edlRequest.OrderBy = "ASC"
        this.edlRequest.Order = "PayCode"

        this.shiftRequest.OrderBy = "ASC"
        this.shiftRequest.Order = "date"

        var moduleId = await this.encryptDecrypt(true,[sessionStorage.getItem('moduleId')]);
        this.moduleIdstr = moduleId['payload'][0]

        // this.regular()
        var dt = new Date();
        dt.setDate(dt.getDate() + 180);
        let dt1 = this.pipe.transform(dt, 'yyyy-MM-dd');
        this.employeeInformationForm.get('dateRegularized').setValue(dt1)
        if (this.id !== "") {
            this.manual = false;
            this.target = this.id
            this.isEdit = true
            this.employeeForm.disable();
            // this.employeeInformationForm.disable();
            this.adminForm.disable();
            this.employeeDependentsForm.disable();

            // this.adminView = (sessionStorage.getItem("ia") == "true")
            // this.parentDetail["edit"] = true

            // this.isView = false
            this.userService.getEmployee(this.id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.employeeForm.patchValue(JSON.parse(JSON.stringify(value.payload)))
                        // console.log(this.employeeForm.value)
                        this.employeeInformationForm.patchValue(value.payload.employeeInformation)
                        this.timekeepingCategoryForm = value.payload.timekeepingCategoryException
                        this.payrollForm = value.payload.payrollEmployeeCategory
                        this.adminForm.patchValue(value.payload.employeeAdmin)
                        // this.employeeDependentsForm.patchValue(value.payload.employeeDependents)
                        this.unSavedForm.patchValue(value.payload.unsaved)
                        this.dataSource_dependents = value.payload.employeeDependents == null ? [] : value.payload.employeeDependents
                        this.dataSource_payroll = GF.IsEmptyReturn(value.payload?.employeeAdmin?.employeeHoldPayroll,[])


                        var profile = "";
                        var defaultPath = "assets\\images\\avatars\\computer-icons-user.jpg"
                        if (value.payload.imagePath != "" && value.payload.imagePath != defaultPath) {
                            this.imageprev = "imagePath1-" + value.payload.imagePath
                            var number = sessionStorage.getItem('moduleId')
                            var moduleid = parseInt(number, 10);
                            this.previewimage(this.imageprev,value.payload.employeeId,moduleid)
                            profile = value.payload.imagePath
                        } else {
                            profile = GF.IsEmptyReturn(value.payload.imagePath, defaultPath)
                        }
                        this.employeeForm.get("imagePath").setValue(profile)



                        this.dropdownFixRequest.id.push(

                            { dropdownID: 3, dropdownTypeID: 3 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.perCountry,0)                              , dropdownTypeID: 3 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idBank,0)              , dropdownTypeID: 2 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.perCity,0)                                 , dropdownTypeID: 9 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.perRegion,0)                               , dropdownTypeID: 10 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idSalutation,0)                            , dropdownTypeID: 29 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idSuffix,0)                                , dropdownTypeID: 30 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idGender,0)                                , dropdownTypeID: 31 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idNationality,0)                           , dropdownTypeID: 32 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idCivilStatus,0)                           , dropdownTypeID: 33 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idBloodType,0)                             , dropdownTypeID: 34 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idReligion,0)                              , dropdownTypeID: 35 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idEmployeeStatus,0)                        , dropdownTypeID: 36 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idConfidentiality,0)                       , dropdownTypeID: 42 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.perProvince,0)                             , dropdownTypeID: 61 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.bankAccountTypeId,0)                       , dropdownTypeID: 99 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.contractCurrencyDef,0)                     , dropdownTypeID: 122 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.currencyPayrollDef,0)                      , dropdownTypeID: 122 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idEmployeeLevel,0)     , dropdownTypeID: 123 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idEmergencyRelation,0)                     , dropdownTypeID: 116 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.rangeId,0)                                 , dropdownTypeID: 139 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idPeza,0)              , dropdownTypeID: 143 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.idPayType,0)                               , dropdownTypeID: 177 },
                        )

                        this.dropdownRequest.id.push(
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idOccupation,0)        , dropdownTypeID: 37 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idDepartment,0)        , dropdownTypeID: 38 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idCostCenter,0)        , dropdownTypeID: 39 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idDivision,0)          , dropdownTypeID: 40 },
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idBusinessUnit,0)      , dropdownTypeID: 121 },
                            { dropdownID: GF.IsEmptyReturn(value.payload?.employeeAdmin?.idBand,0)                  , dropdownTypeID: 95 },
                            { dropdownID: GF.IsEmptyReturn(value.payload?.employeeAdmin?.idBudgetClassification,0)  , dropdownTypeID: 98 },
                            { dropdownID: GF.IsEmptyReturn(value.payload?.employeeAdmin?.idBandLevel,0)             , dropdownTypeID: 112 },
                            { dropdownID: GF.IsEmptyReturn(value.payload?.employeeAdmin?.onHoldReason,0)            , dropdownTypeID: 185 },
                        )

                        this.category.id.push(
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idCategory,0),dropdownTypeID: 0 },
                        )
                        this.supervisor.id.push(
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idSupervisor,0),dropdownTypeID:0},
                        )
                        this.access.id.push(
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idAccessControl,0),dropdownTypeID:0},
                        )
                        this.payrollacc.id.push(
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idPayroll,0),dropdownTypeID:0},
                        )
                        this.timekeeping.id.push(
                            { dropdownID: GF.IsEmptyReturn(value.payload.employeeInformation.idTimekeeping,0),dropdownTypeID:0},
                        )
                        this.initData()
                        this.exception()


                    }
                    else {
                        console.log(value.stackTrace)
                        console.log(value.message)
                    }
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.isSave = false

                    // this.curformat('rateMonthly')
                    // this.curformat('rateSemiMonthly')
                    // this.curformat('rateDaily')
                    // this.curformat('rateHourly')
                }
            });
        }

        else {
            // this.isView = false

            this.dropdownFixRequest.id.push(
                { dropdownID: 0, dropdownTypeID: 2 },
                { dropdownID: 3, dropdownTypeID: 3 },
                { dropdownID: 0, dropdownTypeID: 9 },
                { dropdownID: 0, dropdownTypeID: 10 },
                { dropdownID: 0, dropdownTypeID: 29 },
                { dropdownID: 0, dropdownTypeID: 30 },
                { dropdownID: 0, dropdownTypeID: 31 },
                { dropdownID: 0, dropdownTypeID: 32 },
                { dropdownID: 0, dropdownTypeID: 33 },
                { dropdownID: 0, dropdownTypeID: 34 },
                { dropdownID: 0, dropdownTypeID: 35 },
                { dropdownID: 0, dropdownTypeID: 36 },
                { dropdownID: 0, dropdownTypeID: 41 },
                { dropdownID: 0, dropdownTypeID: 42 },
                { dropdownID: 0, dropdownTypeID: 61 },
                { dropdownID: 0, dropdownTypeID: 99 },
                { dropdownID: 0, dropdownTypeID: 123 },
                { dropdownID: 0, dropdownTypeID: 122 },
                { dropdownID: 0, dropdownTypeID: 112 },
                { dropdownID: 0, dropdownTypeID: 139 },
                { dropdownID: 0, dropdownTypeID: 116 },
                { dropdownID: 0, dropdownTypeID: 143 },
                { dropdownID: 0, dropdownTypeID: 177 })

            this.dropdownRequest.id.push(
                { dropdownID: 0, dropdownTypeID: 37 },
                { dropdownID: 0, dropdownTypeID: 38 },
                { dropdownID: 0, dropdownTypeID: 39 },
                { dropdownID: 0, dropdownTypeID: 40 },
                { dropdownID: 0, dropdownTypeID: 90 },
                { dropdownID: 0, dropdownTypeID: 95 },
                { dropdownID: 0, dropdownTypeID: 98 },
                { dropdownID: 0, dropdownTypeID: 112 },
                { dropdownID: 0, dropdownTypeID: 121 },
                { dropdownID: 0, dropdownTypeID: 185 }
            )

            this.dropdownRequestsub.id.push(
                { dropdownID: 0, dropdownTypeID: 1011 },
                { dropdownID: 0, dropdownTypeID: 1009 }
            )
            this.initData()
        }
    }

    private async encryptDecrypt(mode,params: string[]): Promise<any> {
        try {
          const response = await this.coreService.encrypt_decrypt(mode, params).toPromise();
          return response; // Return the response from the API call
        } catch (error) {
          console.error('Error in encryptDecrypt:', error);
          throw error; // Rethrow the error for proper error handling
        }
      }

    // checkPayrollCat(){
    //     if (this.ei.idPayroll == null || this.ei.idPayroll == 0) {
    //         this.changeTab('pai')
    //         this.employeeInformationForm.markAllAsTouched()
    //         FailedMessage.title = "Warning!"
    //         FailedMessage.message = "Please Select Payroll Category Dropdown first!"
    //         this.message.open(FailedMessage);
    //     }
    // }

    callCutoffDopdown() {
        // this.employeeInformationForm.get("idPayroll").setValue(-1)//test static data
        // this.ei.idPayroll
        var idpayroll = this.dropdownOptions.payrollCategoryDef.find(x => x.dropdownID === this.ei.idPayroll)?.encryptID
        if (idpayroll == undefined) {
            return
        }

        this.categoryService.getPayrollCutoffDropdown(this.dropdownCutoffRequest, idpayroll)
            .subscribe({
                next: (response) => {
                    this.dropdownOptions.cutoffdef = response.payload
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                },
            });
    }

    initData() {
        this.loadEDLTable()

        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFixRequest),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),
            // user: this.userService.getEmployeeDropdown(this.dropdownDefRequest),
            categoryPayroll: this.categoryService.getCategoryPayrollDropdown(this.dropdownDefRequest),
            supervisor: this.coreService.getCoreDropdown(1011, this.supervisor),
            category: this.coreService.getCoreDropdown(1007, this.category),
            subCompany: this.coreService.getCoreDropdown(1001, this.subcompany),
            access: this.coreService.getCoreDropdown(1008, this.access),
            branch: this.coreService.getCoreDropdown(1002, this.branch),
            // businessUnit: this.coreService.getCoreDropdown(1044,this.dropdownRequestsub),
            payroll: this.coreService.getCoreDropdown(1009, this.payrollacc),
            timekeeping: this.coreService.getCoreDropdown(1012, this.timekeeping),
            leavebalance: this.userService.getEmployeeLeaveBalance(this.target),
            accessControl: this.tenantService.getAccessControlPerModule(this.moduleIdstr)
        }).subscribe({
            next: (response) => {


                // MASTER

                this.dropdownOptions.nationalityDef = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 32), JSON.stringify)
                this.dropdownOptions.employeeStatusDef = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 36), JSON.stringify)
                this.dropdownOptions.payrollTypeDef = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 41), JSON.stringify)
                this.dropdownOptions.confidentialDef = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 42), JSON.stringify)

                this.dropdownOptions.countryDef = [...new Map(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 3).map(item =>
                    [item["dropdownID"], item])).values()];

                this.dropdownOptions.regionDef = [...new Map(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 10).map(item =>
                    [item["dropdownID"], item])).values()];

                this.dropdownOptions.provinceDef = [...new Map(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 61).map(item =>
                    [item["dropdownID"], item])).values()];

                this.dropdownOptions.cityDef = [...new Map(response.dropdownFix.payload.filter(x => x.dropdownTypeID === 9).map(item =>
                    [item["dropdownID"], item])).values()];

                this.dropdownOptions.salutationDef       = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 29)   , JSON.stringify)
                this.dropdownOptions.suffixDef           = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 30)   , JSON.stringify)
                this.dropdownOptions.genderDef           = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 31)   , JSON.stringify)
                this.dropdownOptions.civilStatusDef      = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 33)   , JSON.stringify)
                this.dropdownOptions.bloodTypeDef        = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 34)   , JSON.stringify)
                this.dropdownOptions.religionDef         = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 35)   , JSON.stringify)
                this.dropdownOptions.relationshipDef     = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 116 && !GF.IsEqual(x.dropdownID,[30412,30413]))       , JSON.stringify)
                this.dropdownOptions.dependentsDef       = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 116 && !GF.IsEqual(x.dropdownID,[30621,30647,30648])) , JSON.stringify)
                this.dropdownOptions.bankDef             = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 2)    , JSON.stringify)
                this.dropdownOptions.contractCurrencyDef = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 122)  , JSON.stringify)
                this.dropdownOptions.currencyPayrollDef  = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 122)  , JSON.stringify)
                this.dropdownOptions.employeeLevelDef    = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 123)  , JSON.stringify)
                this.dropdownOptions.bankAccountDef      = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 99)   , JSON.stringify)
                this.dropdownOptions.indefinite      = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 139)   , JSON.stringify)

                // TENANT

                this.dropdownOptions.bandsDef              = _.uniqBy(response.dropdown.payload.filter(x => x.dropdownTypeID == 95)     , JSON.stringify)
                this.dropdownOptions.bandsLevelDef         = _.uniqBy(response.dropdown.payload.filter(x => x.dropdownTypeID == 112)    , JSON.stringify)
                this.dropdownOptions.budgetClassDef        = _.uniqBy(response.dropdown.payload.filter(x => x.dropdownTypeID == 98)     , JSON.stringify)
                this.dropdownOptions.costCenterDef         = _.uniqBy(response.dropdown.payload.filter(x => x.dropdownTypeID == 39)     , JSON.stringify)
                this.dropdownOptions.departmentDef         = _.uniqBy(response.dropdown.payload.filter(x => x.dropdownTypeID == 38)     , JSON.stringify)
                this.dropdownOptions.occupationDef         = _.uniqBy(response.dropdown.payload.filter(x => x.dropdownTypeID == 37)     , JSON.stringify)
                this.dropdownOptions.busnissUnitDef        = _.uniqBy(response.dropdown.payload.filter(x => x.dropdownTypeID == 121)    , JSON.stringify)
                this.dropdownOptions.divisionDef           = _.uniqBy(response.dropdown.payload.filter(x => x.dropdownTypeID == 40)     , JSON.stringify)
                this.dropdownOptions.pezaClassificationDef = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 143) , JSON.stringify)
                this.dropdownOptions.unitpaydef            = _.uniqBy(response.dropdownFix.payload.filter(x => x.dropdownTypeID == 177) , JSON.stringify)
                this.dropdownOptions.onHoldReasonDef       = _.uniqBy(response.dropdown.payload.filter(x => x.dropdownTypeID == 185) , JSON.stringify)


                // API
                this.dropdownOptions.categoryDef         = _.uniqBy(response.category.payload     , JSON.stringify)
                this.dropdownOptions.userDef             = _.uniqBy(response.supervisor.payload   , JSON.stringify)

                this.dropdownOptions.subCompanyDef       = _.uniqBy(response.subCompany.payload   , JSON.stringify)
                this.dropdownOptions.AccessControldef    = _.uniqBy(response.access.payload       , JSON.stringify)
                this.dropdownOptions.branchDef           = _.uniqBy(response.branch.payload       , JSON.stringify)
                this.dropdownOptions.payrollCategoryDef  = _.uniqBy(response.payroll.payload      , JSON.stringify)
                this.dropdownOptions.Timekeepingdef      = _.uniqBy(response.timekeeping.payload  , JSON.stringify)
                this.dataSource_leave = _.uniqBy(response.leavebalance.payload, JSON.stringify)

                if (this.dataSource_payroll.length !== 0) {
                    this.dataSource_payroll.forEach(data => {
                        data._rangeId = this.dropdownOptions.indefinite.find(x => x.dropdownID == data.rangeId).description
                        data._onHoldReason = this.dropdownOptions.onHoldReasonDef.find(x => x.dropdownID == data.onHoldReason)?.description
                    });
                }

                if (this.dataSource_dependents.length !== 0 ) {
                    this.dataSource_dependents.forEach(dep => {
                        dep['idRelationshipdescrip'] = this.dropdownOptions.dependentsDef.find(x => x.dropdownID == dep.idRelationship).description
                        dep.birthDate = this.pipe.transform(dep.birthDate, 'yyyy-MM-dd')
                        var timeDiff = Math.abs(Date.now() - new Date(dep.birthDate).getTime());
                        var age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
                        dep['age'] = age
                    });
                }

                //Access Control
                if (!GF.IsEmpty(response?.accessControl?.['payload']?.result)) {
                    var ac = response?.accessControl?.['payload']?.result;
                    this.edcHRList = GF.IsEmptyReturn(response?.accessControl?.['payload']?.hrEDCFields, []);
                    if (ac.isFullAccess) {
                        this.isAdmin = true
                        this.hidePayroll = false
                        this.hideAdmin = false
                        this.hideOthers = false
                    } else {
                        if (ac.isView && !ac.isEdit) {
                            this.isView = true
                            this.submitbutton = false
                        }
                    }
                }
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
                if (!this.isView) {
                    this.callCutoffDopdown()
                }
                if (!this.isView) {
                    this.employeeForm.enable();
                    this.employeeInformationForm.enable();
                    this.adminForm.enable();
                    this.employeeDependentsForm.enable();
                    this.unSavedForm.enable();
                }
                if (this.isEdit) {
                    this.TempHidePayrollTab() // temp code

                     // Access Control > EDC HR
                     if (!GF.IsEmpty(this.edcHRList)) {
                        this.edcHRList.forEach(edc => {
                            let fn = GF.toCamelCase(edc.tableReference) + "Form";
                            let col = GF.toCamelCase(edc.colKey)
                            this[fn].get(col).disable();
                            if (col == "rateMonthly") { this[fn].get("rateSemiMonthly").disable(); }
                        });
                    }
                }
            },
        });

    }

    // JMB Static hide payroll tab 'AA-964' 07-10-24
    TempHidePayrollTab(){
        this.hidePayroll = false
        if (GF.IsEqual(sessionStorage.getItem('al'),['Y7Ubn6c7hvLjihiwyLyQ%2fw%3d%3d', 'Tg3R3dzL5d8qh2W0SyphdQ%3d%3d'])
            && sessionStorage.getItem('sc') == 'X60gRfeYKLkMOZUTut0A5AaYxh1%2bia%2b12gcqZLIvPYg%3d') {
            // this.hidePayroll = true;
            this.fields.rateMonthly = false;
            this.fields.rateSemiMonthly = false;
            this.fields.rateDaily = false;
            this.fields.rateHourly = false;
        }
    }

    loadEDLTable(){
        this.payrollService.getEDLView(this.edlRequest,this.target).subscribe({
            next: (response) => {
                this.dataSource_EDL = _.uniqBy(response.payload.data, JSON.stringify)
            },
            error: (e) => {
                console.error(e)
            }
        });
    }
    // rates(){
    //     var mrate = this.employeeInformationForm.get('monthlyRate').value
    //     console.log(mrate)
    // }

    ShiftSortEvent(e): void {
        this.shiftRequest.Start = 0
        this.shiftRequest.Order = e.active
        this.shiftRequest.OrderBy = e.direction
        this.searchShift()
    }

    handlePageEvent(e){
        this.shiftRequest.Start = e.pageIndex
        this.shiftRequest.Length = e.pageSize
        this.searchShift()
    }

    searchShift() {
        var df = this.pipe.transform(this.unSavedForm.value.dateFrom, "MM/dd/yyyy")
        var dt = this.pipe.transform(this.unSavedForm.value.dateTo, "MM/dd/yyyy")
        this.shiftService.getEmployeeSchedule(this.shiftRequest, df, dt, this.id)
            .subscribe({
                next: (response) => {
                    this.dataSource.paginator = this.paginator;
                    this.totalRows = response.payload.totalRows
                    this.dataSource = response.payload.data
                },
                error: (e) => {
                    console.error(e)
                },
            });
    }


    onChangeName(formname) {
        var display = "";
        var first = GF.IsEmptyReturn(this.employeeForm.get('firstName').value,"")
        var middle = GF.IsEmptyReturn(this.employeeForm.get('middleName').value,"")
        var last = GF.IsEmptyReturn(this.employeeForm.get('lastName').value,"")

        const regex = /^[\p{L}\p{M}\p{N}\s]*$/u;
        var isvalidfirstname = regex.test(first)
        var isvalidmiddlename = regex.test(middle)
        var isvalidlastname = regex.test(last)

        var field = !isvalidfirstname ? 'FirstName' : !isvalidmiddlename ? 'MiddleName' : 'LastName'

        debugger
        if (isvalidfirstname && isvalidmiddlename && isvalidlastname) {
             var suffix = this.dropdownOptions.suffixDef.filter(x => x.dropdownID == this.employeeForm.get('idSuffix').value)
            var suf = GF.IsEmpty(suffix[0]?.description) ? "" : " " + GF.IsEmptyReturn(suffix[0]?.description, "")
            if (first !== "" && last !== "") {
                var mid = middle == "" ? "" : " " + middle.substring(0, 1)[0].toUpperCase() + middle.substring(0, 1).slice(1) + "."
                display = last[0].toUpperCase() + last.slice(1) + ", " + first[0].toUpperCase() + first.slice(1) + mid + suf
            this.employeeForm.get('displayName').setValue(display)
        }
         }else{
            this.failedMessage.message = "Special characters are not allowed in " + field;
            this.employeeForm.get(formname).setValue(null)
            this.employeeForm.get('displayName').setValue(null)
            this.message.open(this.failedMessage);

            return
         }


    }
    onChangeEmployeeId() {
        var code = this.employeeForm.get('employeeCode').value

        this.employeeForm.get('userName').setValue(code)
    }


    onChangeBirthAge() {
        var birth = this.employeeDependentsForm.get('birthDate').value === null || this.employeeDependentsForm.get('birthDate').value === "" ? "" : this.employeeDependentsForm.get('birthDate').value

        if (birth !== "") {
            var timeDiff = Math.abs(Date.now() - new Date(birth).getTime());
            this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
            this.employeeDependentsForm.get('age').setValue(this.age)
        }

    }

    exception() {
        this.exceptiontk = this.exceptiontk_old.slice()
        // For tk
        const idTimekeeping = GF.IsEmpty(this.ei.idTimekeeping);
        const timekeepingIndex = this.exceptiontk.findIndex(item => item.id === 1);
        if (idTimekeeping) {
            this.exceptiontk.splice(timekeepingIndex, 1);
        }
        // For Payroll
        const idPayroll = GF.IsEmpty(this.ei.idPayroll);
        const payrollIndex = this.exceptiontk.findIndex(item => item.id === 2);
        if (idPayroll) {
            this.exceptiontk.splice(payrollIndex, 1);
        }
    }


    regular() {
        var dt = new Date(this.ei.dateProbationary);
        dt.setDate(dt.getDate() + 180);
        let dt1 = this.pipe.transform(dt, 'yyyy-MM-dd');
        this.employeeInformationForm.get('dateRegularized').setValue(dt1)

    }

    regulardate() {
        var dt = new Date(this.ei.dateHired);
        var dt2 = new Date(this.ei.dateHired);
        dt.setDate(dt.getDate() + 180);
        let dt1 = this.pipe.transform(dt, 'yyyy-MM-dd');
        this.employeeInformationForm.get('dateRegularized').setValue(dt1)
        this.employeeInformationForm.get('dateProbationary').setValue(dt2)
    }

    // onChangeReg() {
    //     var dt = new Date();
    //     dt.setDate(dt.getDate() + 180);
    //     let dt1 = this.pipe.transform(dt, 'yyyy-MM-dd');
    //     this.employeeInformationForm.get('dateRegularized').setValue(dt1)
    //     console.log(dt1)
    // }

    // setDateHired(){
    //     var dt = new Date();
    //     let dt1 = this.pipe.transform(dt, 'MM-dd-yyyy');
    //     this.employeeForm.get('dateHired').setValue(this.pipe.transform(new Date(), 'MM-dd-yyyy');)
    // }

    checkSameAddress(e) {

        if (!e.checked) {
            this.employeeForm.get('perCountry').setValue("")
            this.employeeForm.get('perZipCode').setValue("")
            this.employeeForm.get('perRegion').setValue("")
            this.employeeForm.get('perProvince').setValue("")
            this.employeeForm.get('perCity').setValue("")
            this.employeeForm.get('perBarangay').setValue("")
            this.employeeForm.get('perUnitFloor').setValue("")
            this.employeeForm.get('perBuilding').setValue("")
            this.employeeForm.get('perStreet').setValue("")
            return
        }

        var country = this.employeeForm.get('preCountry').value === null || this.employeeForm.get('preCountry').value === "" ? "" : this.employeeForm.get('preCountry').value
        var zipcode = this.employeeForm.get('preZipCode').value === null || this.employeeForm.get('preZipCode').value === "" ? "" : this.employeeForm.get('preZipCode').value
        var region = this.employeeForm.get('preRegion').value === null || this.employeeForm.get('preRegion').value === "" ? "" : this.employeeForm.get('preRegion').value
        var province = this.employeeForm.get('preProvince').value === null || this.employeeForm.get('preProvince').value === "" ? "" : this.employeeForm.get('preProvince').value
        var city = this.employeeForm.get('preCity').value === null || this.employeeForm.get('preCity').value === "" ? "" : this.employeeForm.get('preCity').value
        var barangay = this.employeeForm.get('preBarangay').value === null || this.employeeForm.get('preBarangay').value === "" ? "" : this.employeeForm.get('preBarangay').value
        var unit = this.employeeForm.get('preUnitFloor').value === null || this.employeeForm.get('preUnitFloor').value === "" ? "" : this.employeeForm.get('preUnitFloor').value
        var building = this.employeeForm.get('preBuilding').value === null || this.employeeForm.get('preBuilding').value === "" ? "" : this.employeeForm.get('preBuilding').value
        var street = this.employeeForm.get('preStreet').value === null || this.employeeForm.get('preStreet').value === "" ? "" : this.employeeForm.get('preStreet').value

        this.employeeForm.get('perCountry').setValue(country)
        this.employeeForm.get('perZipCode').setValue(zipcode + "")
        this.employeeForm.get('perRegion').setValue(region)
        this.employeeForm.get('perProvince').setValue(province)
        this.employeeForm.get('perCity').setValue(city)
        this.employeeForm.get('perBarangay').setValue(barangay + "")
        this.employeeForm.get('perUnitFloor').setValue(unit + "")
        this.employeeForm.get('perBuilding').setValue(building + "")
        this.employeeForm.get('perStreet').setValue(street + "")

    }

    validation() {
        this.employeeForm.markAllAsTouched()
        this.unSavedForm.markAllAsTouched()
        this.employeeDependentsForm.markAllAsTouched()
        this.employeeInformationForm.markAllAsTouched()
        this.adminForm.markAllAsTouched()
        this.payrollstatForm.markAllAsTouched()

        if (!this.employeeForm.valid) {
            if (
                GF.IsEmpty(this.ef.firstName) ||
                GF.IsEmpty(this.ef.lastName) ||
                GF.IsEmpty(this.ef.displayName) ||
                GF.IsEmpty(this.ef.birthDate) ||

                GF.IsEmpty(this.ef.mobile) ||

                GF.IsEmpty(this.ef.perCountry) ||

                !this.ec.emergencyEmail.valid
            ) {
                this.changeTab('pei')
                if ( GF.IsEmpty(this.ef.firstName) || GF.IsEmpty(this.ef.lastName) || GF.IsEmpty(this.ef.displayName) || GF.IsEmpty(this.ef.birthDate) ) {
                    this.personalIndex = 0
                } else if ( GF.IsEmpty(this.ef.mobile) || !this.ec.personalEmailAddress.valid || !this.ec.companyEmailAddress.valid ) {
                    this.personalIndex = 1
                    this.InvalidEmail()
                } else if (!this.ec.emergencyEmail.valid) {
                    this.personalIndex = 2
                    this.InvalidEmail()
                } else {
                    this.personalIndex = 3
                }
            } else {
                this.changeTab('woi');
            }
            return true
        }
        // if (!this.employeeInformationForm.valid) {
            if (GF.IsEmpty(this.ei.idCategory) || GF.IsEmpty(this.ei.idEmployeeStatus)) {
                this.changeTab('woi');
                return true

            }
            // if (GF.IsEmpty(this.ei.idPayroll,true) || GF.IsEmpty(this.ei.idTimekeeping,true) || GF.IsEmpty(this.ei.tin)) {
            // if (GF.IsEmpty(this.ei.idPayroll,true) || GF.IsEmpty(this.ei.idTimekeeping,true)) {
                if (GF.IsEmpty(this.ei.idPayroll,true) || GF.IsEmpty(this.ei.idTimekeeping,true) || !this.isValidID(this.ei.sss, 9) || !this.isValidID(this.ei.philhealth, 12) || !this.isValidID(this.ei.pagibig, 12) || !this.isValidID(this.ei.tin, 9)) {
                this.changeTab('pai');
                return true
            }
            if (GF.IsEmpty(this.ei.idSubCompany) || GF.IsEmpty(this.ei.idBranch)) {
                var field = '';
                if (GF.IsEmpty(this.ei.idSubCompany) && GF.IsEmpty(this.ei.idBranch)
                ) {
                    field = 'Company and Branch are Required';
                } else if (GF.IsEmpty(this.ei.idSubCompany)) {
                    field = 'Company is Required';
                } else if (GF.IsEmpty(this.ei.idBranch)) {
                    field = 'Branch is Required';
                }
                var failedMessage = Object.assign({}, FailedMessage);
                failedMessage.title = 'Requried Fields';
                failedMessage.message = field;
                this.message.open(failedMessage);
                return true;
            }
        // }

        if (GF.IsEqual(this.ei.idEmployeeStatus, [95,12665])) {
            var errorMsg =  GF.IsEmpty(this.ei.dateSeparated) ? "Separation Date" : ""
                // errorMsg += GF.IsEmpty(this.ei.dateAccessUntil) ? "Access Until, " : ""
                errorMsg += GF.IsEmpty(this.ei.dateEffective) ? !GF.IsEmpty(errorMsg) ? " and Effective Date" : "Effective Date" : ""
            if (!GF.IsEmpty(errorMsg)) {
                errorMsg +=  " are requried!"
                var failedMessage = Object.assign({},FailedMessage)
                failedMessage.title = "Requried Fields";
                failedMessage.message = errorMsg;
                this.message.open(failedMessage)
                return true
            }
        } else {
            this.employeeInformationForm.get('dateSeparated').setValue(null)
            this.employeeInformationForm.get('dateAccessUntil').setValue(null)
            this.employeeInformationForm.get('dateFinalPayRelease').setValue(null)
            this.employeeInformationForm.get('dateEffective').setValue(null)
        }

        var isOnHold = sessionStorage.getItem('ioh') === 'true';

        if (isOnHold) {
            if (GF.IsEqual(this.ei.idEmployeeStatus, [12666]) && GF.IsEmpty(this.dataSource_payroll)) {
                this.changeTab('A');
                this.payrollstatForm.get('onHoldReason').setValidators([Validators.required]);
                this.payrollstatForm.get('onHoldReason').updateValueAndValidity();
                return true
            } else {
                this.payrollstatForm.get('onHoldReason').clearValidators();
                this.payrollstatForm.get('onHoldReason').updateValueAndValidity();
            }
        }

        return false
    }


    async submit() {

        if (this.validation()) { return }//check tab required
        if (this.employeeForm.valid && this.employeeInformationForm.valid) {

            if (this.ei.idTimekeeping == 0) {
                if (!GF.IsEmpty(this.employeeForm.value.timekeepingCategoryException)) {
                    this.tkComponent.confirm()
                }
            }else{
                this.employeeForm.get('timekeepingCategoryException').setValue([])
            }

            if (this.ei.idPayroll == 0) {
                if (!GF.IsEmpty(this.employeeForm.value.payrollEmployeeCategory)) {
                    this.payrollForm = this.employeeForm.value.payrollEmployeeCategory
                    this.payrollsubmit.confirm()
                }
            }else{
                this.employeeForm.get('payrollEmployeeCategory').setValue([])
            }

            this.employeeInformationForm.get('idSupervisor').setValue(GF.IsEmptyReturn(this.ei.idSupervisor,0))

            // this.tkComponent.confirm()
            // this.payrollsubmit.confirm()
            const dialogRef = this.message.open(SaveMessage);
            // console.log(this.employeeForm.value)
            // JSON.stringify(this.employeeForm.value)

            dialogRef.afterClosed().subscribe(async(result) => {
                if (result == "confirmed") {

                    this.employeeInformationForm.get('idConfidentiality').setValue(GF.IsEmptyReturn(this.ei.idConfidentiality,70))
                    this.employeeForm.get('employeeOther').setValue(this.datasource_employeeOther)
                    this.employeeForm.get('employeeMovement').setValue(this.datasource_employeeMovement)
                    this.employeeForm.get('employeeInformation').setValue(this.employeeInformationForm.getRawValue())
                    this.employeeForm.get('timekeepingCategoryException').setValue(this.timekeepingCategoryForm)
                    this.employeeForm.get('payrollCategoryException').setValue(this.payrollForm)
                    this.employeeForm.get('payrollEmployeeCategory').setValue(this.payrollForm)
                    // this.employeeForm.get('employeeDependents').setValue(this.employeeDependentsForm.value)
                    this.adminForm.get('employeeHoldPayroll').setValue(this.dataSource_payroll)
                    this.employeeForm.get('employeeAdmin').setValue(this.adminForm.value)


                    var emp = this.employeeForm.getRawValue()
                    var empi = this.employeeInformationForm.getRawValue()
                    var empd = this.employeeDependentsForm.getRawValue()
                    emp.birthDate = this.pipe.transform(emp.birthDate, 'yyyy-MM-dd')
                    empi.dateHired = this.pipe.transform(empi.dateHired, 'yyyy-MM-dd')
                    empi.dateContractValidity = this.pipe.transform(empi.dateContractValidity, 'yyyy-MM-dd')
                    empi.dateProbationary = this.pipe.transform(empi.dateProbationary, 'yyyy-MM-dd')
                    empi.dateRegularized = this.pipe.transform(empi.dateRegularized, 'yyyy-MM-dd')
                    empi.dateSeparated = this.pipe.transform(empi.dateSeparated, 'yyyy-MM-dd')
                    empi.dateEffective = this.pipe.transform(empi.dateEffective, 'yyyy-MM-dd')
                    empi.dateAccessUntil = this.pipe.transform(empi.dateAccessUntil, 'yyyy-MM-dd')
                    empi.dateFinalPayRelease = this.pipe.transform(empi.dateFinalPayRelease, 'yyyy-MM-dd')
                    empd.birthDate = this.pipe.transform(empd.birthDate, 'yyyy-MM-dd')
                    emp.effectiveDate = await this.setEffectiveDate();
                    emp.employeeInformation = empi
                    // console.log(emp.replace(/\:null/gi, "\:[]"))

                    this.isSave = true

                    this.userService.postEmployee(emp).subscribe({
                        next: (value: any) => {

                            if (value.statusCode == 200) {
                                this.message.open(SuccessMessage);
                                this.isSave = false,
                                this.router.navigate(['/search/employee-list']);
                                this.transactionId = value.payload
                                this.loginId = value.payload
                                this.uploadimage()
                            }else if(value.statusCode == 404){
                                this.failedMessage.message = value.payload[0]
                                this.message.open(this.failedMessage);
                            }else {
                                this.failedMessage.message = value.message;
                                this.message.open(this.failedMessage);
                                console.log(value.stackTrace)
                                console.log(value.message)
                            }
                        },
                        error: (e) => {
                            // this.curformat('rateMonthly')
                            this.isSave = false
                            this.message.open(FailedMessage);
                            console.error(e)
                        }
                    });
                }
            });
        }
    }

    async setEffectiveDate() {
        // console.log(this.movements);

        if (this.movements.some(x => ['rateMonthly', 'rateSemiMonthly'].includes(x)) && this.employeeForm.value.employeeId !== 0) {
            this.dialogRef = this.dialog.open(EffectiveDateComponent, {
                width: '20%',
                disableClose: true
            });

            const result = await new Promise<any>((resolve) => {
                this.dialogRef.componentInstance.btnConfirmed.subscribe((confirmedResult: any) => {
                    resolve(confirmedResult);
                });
            });

            // const formattedResult = result.toISOString()//this.pipe.transform(result, "MM/dd/yyyy");
            const formattedResult = this.pipe.transform(new Date(result).toLocaleString('en-US', { timeZone: 'Asia/Manila' }), "yyyy-MM-dd")+"T00:00:00.000Z";
            return formattedResult;
        }

        return null;
    }

    checkCategory(e) {
        this.selectedCategory = e === 1 ? this.dropdownOptions.Timekeepingdef.find(x => x.dropdownID == this.unSavedForm.value.idTimekeepingexception).encryptID
            : this.dropdownOptions.payrollCategoryDef.find(x => x.dropdownID == this.unSavedForm.value.idPayrollexception).encryptID
    }

    categoryList(e) {
        return e === 1 ? this.dropdownOptions.Timekeepingdef : e == 0 || e == null ? [] : this.dropdownOptions.payrollCategoryDef
    }

    changeTab(e) {
        this.selectedTab = e;
        this.isPeI        =  (e == 'pei')
        this.isWoI        =  (e == 'woi')
        this.isPaI        =  (e == 'pai')
        this.isS          =  (e == 's')
        this.isL          =  (e == 'l')
        this.isOther      =  (e == 'O')
        this.isException  =  (e == 'E')
        this.isAdminTab   =  (e == 'A')
        this.isEDLTab     =  (e == 'EDL')
    }

    computeRates(rate) {
        if (rate !== 'payrollcat') {
            var cur = this.employeeInformationForm.get(rate).value
            switch (rate) {
                case 'rateMonthly':
                    var semi = cur / 2
                    this.employeeInformationForm.get("rateSemiMonthly").setValue(semi)
                break;
                case 'rateSemiMonthly':
                    var mons = cur * 2
                    this.employeeInformationForm.get("rateMonthly").setValue(mons)
                break;
            }
        }

        if (!this.movements.some(x=>x==rate)) {
            this.movements.push(rate)
        }

        this.userService.getSalaryRate(this.ei.idPayroll,this.ei.rateMonthly).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.employeeInformationForm.get("rateDaily").setValue(value.payload.dailyRate)
                    this.employeeInformationForm.get("rateHourly").setValue(value.payload.hourlyRate)
                } else {
                    console.log(value.stackTrace)
                    console.log(value.message)
                }
            },
            error: (e) => {
                console.error(e)
            }
        });
    }


    handleAdddependent(): void {
        // if (this.employeeDependentsForm.controls.employeeDependents.valid) {
        this.dataSource_dependents.push({

            // type: this.dropdownOptions.emailDef.filter(x => x.dropdownID == this.emailForm.value.Address)[0]['description'],
            idRelationshipdescrip: this.dropdownOptions.dependentsDef.find(item => item.dropdownID == this.employeeDependentsForm.value.idRelationship).description,
            idRelationship: this.employeeDependentsForm.value.idRelationship,
            firstName: this.employeeDependentsForm.value.firstName,
            middleName: this.employeeDependentsForm.value.middleName,
            lastName: this.employeeDependentsForm.value.lastName,
            birthDate: this.pipe.transform(this.employeeDependentsForm.value.birthDate, 'yyyy-MM-dd'),
            age: this.employeeDependentsForm.value.age,
        })


        //   console.log(this.employeeDependentsForm)
        this.Table_dependents.renderRows();
        this.employeeForm.get('employeeDependents').setValue(this.dataSource_dependents);

        this.employeeDependentsForm.reset()
        // }
    }


    Delete(index): void {
        this.dataSource_dependents.splice(index, 1);
        this.Table_dependents.renderRows();
    }
    PatchTK(form: any) {
        this.timekeepingCategoryForm = form
        // console.log(this.timekeepingCategoryForm.value)
    }

    PatchPayroll(form: any) {
        this.payrollForm = form
    }

    dsiabledbutton(a) {
        // this.payrollstatForm.get('payrollCutoffLockingId').setValue(0)
        // this.payrollstatForm.get('adddatefrom').setValue('')
        // this.dataSource_payroll.forEach(element => {
        //     if (element.rangeId == 30595) {
        //         if (this.payrollstatForm.value.adddatefrom !== "" || this.payrollstatForm.value.payrollCutoffLockingId == 0) {
        //             this.buttondis = true
        //             return
        //         }else{
        //             this.buttondis = false
        //             return
        //         }
        //     } else {
        //         this.buttondis = false
        //         return
        //     }
        // });


        if (a === 'duration') {
            if (this.payrollstatForm.value.rangeId === 30595) {
                let date = new Date(3000, 11, 1);
                this.payrollstatForm.get('adddateto')?.setValue(date);
                this.payrollstatForm.get('adddateto')?.disable();

                this.payrollstatForm.get('adddatefrom')?.setValue(null);
                this.payrollstatForm.get('adddatefrom')?.updateValueAndValidity();

                this.payrollstatForm.value.adddatefrom ? this.buttondis = true : this.buttondis = false;
            } else if (this.payrollstatForm.value.rangeId === 30596) {
                this.payrollstatForm.get('adddateto')?.enable();
                this.payrollstatForm.get('adddateto')?.setValue(null);
                this.payrollstatForm.get('adddateto')?.updateValueAndValidity();

                this.payrollstatForm.get('adddatefrom')?.setValue(null);
                this.payrollstatForm.get('adddatefrom')?.updateValueAndValidity();

                this.payrollstatForm.value.adddatefrom && this.payrollstatForm.value.adddateto ? this.buttondis = true : this.buttondis = false;
            } else {
                this.payrollstatForm.get('adddateto')?.setValue(null);
                this.payrollstatForm.get('adddateto')?.enable();
            }
        }
    }

    addPayroll(): void {
        // var range = this.payrollstatForm.value.rangeId
        // let cutoff = range == 30596 ? this.dropdownOptions.cutoffdef.find(x => x.dropdownID === this.payrollstatForm.value.payrollCutoffLockingId) : 0//"2023-01-10 - 2023-03-10"
        // var df = range == 30596 ? cutoff.dateFrom : this.pipe.transform(this.payrollstatForm.value.adddatefrom, 'MM/dd/yyyy')
        // var dt = range == 30596 ? cutoff.dateTo : "12/31/3000"
        // var payout = range == 30596 ? cutoff.datePayout : ""

        var range = this.payrollstatForm.value.rangeId;
        var df, dt, payout;

        if (range == 30596) {
            df = this.pipe.transform(this.payrollstatForm.value.adddatefrom, 'MM/dd/yyyy');
            dt = this.pipe.transform(this.payrollstatForm.value.adddateto, 'MM/dd/yyyy');
            payout = "";
        } else {
            df = this.pipe.transform(this.payrollstatForm.value.adddatefrom, 'MM/dd/yyyy');
            dt = "12/31/3000";
            payout = "";
        }

        this.dataSource_payroll.push({
            rangeId: this.payrollstatForm.value.rangeId,
            _rangeId: this.dropdownOptions.indefinite.find(x => x.dropdownID == this.payrollstatForm.value.rangeId)?.description || "",
            dateFrom: df,
            dateTo: dt,
            payout: payout,
            createdByName: sessionStorage.getItem('dn'),
            dateCreated: this.pipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss'),
            _dateCreated: this.pipe.transform(new Date(), 'yyyy-MM-dd HH:mm a'),
            cutoff: 0,
            isIndefinite: this.payrollstatForm.value.rangeId == 30595 ? true : false,
            onHoldReason: this.payrollstatForm.value.onHoldReason,
            _onHoldReason: this.dropdownOptions.onHoldReasonDef.find(x => x.dropdownID == this.payrollstatForm.value.onHoldReason)?.description
        })
        this.Table_payroll.renderRows();
        this.payrollstatForm.get('rangeId').setValue(0)
        this.payrollstatForm.get('onHoldReason').setValue(0);
    }

    showAddButton() {
        if (!this.payrollstatForm.value.rangeId || this.payrollstatForm.value.rangeId == 0) {
            return false;
        }
        if (this.payrollstatForm.value.rangeId == 30595) {
            return this.payrollstatForm.value.adddatefrom ? true : false;
        }
        if (this.payrollstatForm.value.rangeId == 30596) {
            return this.payrollstatForm.value.adddatefrom && this.payrollstatForm.value.adddateto ? true : false;
        }
        return this.payrollstatForm.value.adddatefrom && this.payrollstatForm.value.adddateto;
    }

    onEdit(element: any, i) {
        this.payrollstatForm.get('rangeId').setValue(element.rangeId)
        this.payrollstatForm.get('payrollCutoffLockingId').setValue(element.cutoff)
        this.dataSource_payroll.splice(i, 1);
        this.Table_payroll.renderRows();
    }

    handleDeleteBreak(index) {
        this.dataSource_payroll.splice(index, 1);
        this.Table_payroll.renderRows();
        this.payrollstatForm.get('rangeId').setValue(0)

    }

    handleSortEvent(e): void {
        this.edlRequest.Start = 0
        this.edlRequest.Order = e.active
        this.edlRequest.OrderBy = e.direction
        this.loadEDLTable()
    }

    uploadimage() {

        this.moduleId = sessionStorage.getItem('moduleId')
        if (this.imagefile.length === 0) {
            return
        }
        this.imagefile.forEach(file => {
            const fileToUpload = <File>file.files;
            if (fileToUpload) {
                const formData = new FormData();
                formData.append("file", file.files);

                this.storageServiceService.fileUpload(formData, this.transactionId, this.moduleId,this.loginId).subscribe({
                    next: (value: any) => {
                        if (value) {

                        }
                    },
                    error: (e) => {
                    }
                });
            }
        });
    }

    // uploadFile(event, id,sig, fc) {
    //     let reader = new FileReader(); // HTML5 FileReader API
    //     const fileToUpload0 = event.target.files[0];
    //     var name = sig + '-' + fileToUpload0.name;

    //     if (this.imagefile.some(x => x.source == sig)) {
    //         var idx = this.imagefile.findIndex(x => x.source == sig);
    //         this.imagefile[idx].files = event.target.files[idx];
    //     } else {
    //         const renamedFile0 = new File([fileToUpload0], name, { type: fileToUpload0.type });
    //         this.imagefile.push({
    //             source: sig,
    //             files: renamedFile0
    //         });
    //     }

    //     var readers = new FileReader();
    //     readers.readAsDataURL(event.target.files[0]);
    //     readers.onload = (events) => {

    //         if (fc == "imagePath") {
    //             this.imageUrl = events.target.result as string;
    //         }
    //         this.employeeForm.get(fc).setValue(event.target.files[0].name)
    //     }

    // }

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

      async uploadFile(event: any, id: any, sig: string, fc: string) {
        const fileToUpload0 = event.target.files[0];
        const name = sig + '-' + fileToUpload0.name;
        let reduce: File;


        try {
          reduce = await this.reduceImageSize(fileToUpload0, 50 * 1024 , 0.8);
        } catch (error) {
          console.error('Error reducing image size:', error);
          return; // If an error occurs, you might want to handle it accordingly.
        }

        if (this.imagefile.some((x) => x.source == sig)) {
          const idx = this.imagefile.findIndex((x) => x.source == sig);
          this.imagefile[idx].files = reduce;
          this.cd.detectChanges();
        } else {
          const renamedFile = new File([reduce], name, { type: reduce.type });
          this.imagefile.push({
            source: sig,
            files: renamedFile,
          });
          this.cd.detectChanges();
        }

        switch (fc) {
          case 'imagePath':
            this.employeeForm.get('imagePath').setValue(reduce.name);
            const readers = new FileReader();
            readers.readAsDataURL(reduce);
            this.cd.detectChanges();
            readers.onload = (event) => {
              this.imageUrl = event.target?.result as string;
              this.cd.detectChanges();
            };
            break;
        }
      }

      previewimage(e, t, m) {
        this.storageServiceService.fileDownload(e, t, m).subscribe({
            next: (response: any) => {
                // extract the base64 file content and content type
                const base64 = response.payload.fileContents
                const contentType = response.payload.fileContents || 'application/octet-stream';
                // convert base64 to blob
                // const blob = this.base64ToBlob(base64, contentType);
                const blob = this.coreService.base64ToBlob(base64, contentType);
                // create a previewable image URL
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result as string;
                    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(base64data);
                    this.cd.detectChanges();
                };
                reader.readAsDataURL(blob); // read blob for preview
            },
            error: (err) => {
                console.error('Image preview failed:', err);
            }
        });
    }

    isNumber(e){
        if (!GF.IsEmpty(e)) {
            // console.log(e)
            if (isNaN(e)) {
              return GF.IsEmpty(e) ? [] : (Array.isArray(e) ? e : [e])
            }
        }
      }


    unitPay(event) {

        if (event === 31167) {
            this.employeeInformationForm.get("rateMonthly").setValue(0)
            this.employeeInformationForm.get("rateSemiMonthly").setValue(0)
        }
    }

    InvalidEmail(){
        if (!this.ec.emergencyEmail.valid || !this.ec.personalEmailAddress.valid || !this.ec.companyEmailAddress.valid) {
            this.failedMessage.title = "Invalid email"
            this.failedMessage.message = "Please ensure the email includes an '@' symbol, has a valid domain (e.g., '.com', '.net'), or does not contain invalid special characters.";
            this.failedMessage.actions.confirm.label = "Ok"
            this.message.open(this.failedMessage)
        }
    }

    validate() {
        if (this.payrollstatForm.value.rangeId == 30596) {
            var dateFrom = this.payrollstatForm.get('adddatefrom').value;
            var dateTo = this.payrollstatForm.get('adddateto').value;

            if (dateFrom && dateTo && dateTo < dateFrom) {
                this.failedMessage.title = "Warning!"
                this.failedMessage.message = "Date To must not be earlier than Date From.";
                this.message.open(this.failedMessage);
                this.buttondis = true;
                return
            } else {
                this.buttondis = false
            }
        }
    }

    isValidID(val, length) {
        return !val || val.replace(/-/,'').length >= length
    }

}
