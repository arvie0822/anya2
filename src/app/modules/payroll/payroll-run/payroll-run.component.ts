import { DatePipe } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { EmpFilter, PGEMPLOYEE, PayrollAnnualized, PayrollDeductions, PayrollDetails, PayrollEarning, PayrollGenerate, PayrollGovCont, PayrollLoans, PayrollTimekeeping, tkDropdown } from 'app/model/payroll/payroll-run';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { TimekeepingTableComponent } from './timekeeping-table/timekeeping-table.component';
import { DropdownOptions, DropdownRequest, HeirarchyPayrollDDRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'app/services/categoryService/category.service';
import { TimekeepingService } from 'app/services/timekeepingService/timekeeping.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { ReplaySubject, Subject, debounceTime, distinctUntilChanged, forkJoin, takeUntil } from 'rxjs';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FileService } from 'app/services/fileService/file.service';
import { TableRequest } from 'app/model/datatable.model';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { Location } from '@angular/common';
import { MasterService } from 'app/services/masterService/master.service';
import { CoreService } from 'app/services/coreService/coreService.service';
import { DropdownPR } from 'app/model/app.constant';
import _, { includes, truncate } from 'lodash';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatOption, MatRippleModule } from '@angular/material/core';
import { UploadComponent } from './upload/upload.component';
import { GF } from 'app/shared/global-functions';
import { DecimalPipe } from '@angular/common';
import { CrudModalComponent } from 'app/core/datatable-crud/crud-modal/crud-modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { Dialog } from '@angular/cdk/dialog';
import { myData } from 'app/app.moduleId';
import { fuseAnimations } from '@fuse/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { CustomModule } from 'app/shared/custom.module';
import { ApprovalReasonComponent } from './approval-reason/approval-reason.component';
import { BankComponent } from './bank/bank.component';
import { DeductionComponent } from './deduction/deduction.component';
import { DialogComponent } from './dialog/dialog.component';
import { EarningComponent } from './earning/earning.component';
import { GenerateComponent } from './generate/generate.component';
import { GovconComponent } from './govcon/govcon.component';
import { LoanComponent } from './loan/loan.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { EmployeeEarningsComponent } from '../employee-earnings/employee-earnings.component';
import { PayrollLoansComponent } from '../payroll-loans/payroll-loans.component';
import { PayrollDeductionComponent } from '../payroll-deduction/payroll-deduction.component';
import { DatatableComponent } from 'app/core/datatable/datatable.component';
import { DialogBoxCurrencyComponent } from './dialogBoxCurrency/dialogBoxCurrency.component';
import { DialogBoxAnnualizedComponent } from './dialogBoxAnnualized/dialogBoxAnnualized.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';

// import { MatStepperSelectionEvent } from '@angular/material/stepper';
// import { EarningComponent } from './earning/earning.component';

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

enum mode {
    load = 0,
    next = 1,
    search = 2,
    all = 3,
    change = 4
}

@Component({
    selector: 'app-payroll-run',
    templateUrl: './payroll-run.component.html',
    styleUrls: ['./payroll-run.component.css'],
    providers: [
        DecimalPipe, DatePipe,
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
        MatSelectModule,
        MatCardModule,
        CardTitleComponent,
        MatIconModule,
        MatTabsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRippleModule,
        MatMenuModule,
        TranslocoModule,
        DropdownComponent,
        MatNativeDateModule,
        EarningComponent,
        GenerateComponent,
        GovconComponent,
        LoanComponent,
        EmployeeEarningsComponent,
        PayrollDeductionComponent,
        PayrollLoansComponent,
        DatatableComponent,
        TranslocoModule,
        MatTooltipModule,
        EmployeeHierarchyComponent,
        UploadComponent,
        TimekeepingTableComponent,
        DeductionComponent,
        LoanComponent,
        MatSelectInfiniteScrollModule
    ],
})
export class PayrollRunComponent implements OnInit {

    private uri = environment.apiUrl;
    progress: number = 0
    isSupervisor = false
    isMngr = false
    isSave: number = 0
    errorText: string
    selectedData: number
    searchValue: string = '';
    employeeFilter = new EmpFilter;
    tkDD = new tkDropdown
    pgemployee = new PGEMPLOYEE

    detailForm: FormGroup
    timekeepingForm: FormGroup
    earningForm: FormGroup
    deductionForm: FormGroup
    loanForm: FormGroup
    contributionForm: FormGroup
    generateForm: FormGroup
    annualizedForm: FormGroup
    payrolldeducForm: any
    payrollloansForm: any
    payrollearnForm: any
    dropdownOptions = new DropdownOptions
    dropdownRequest = new DropdownRequest;
    dropdownRequestBank = new HeirarchyPayrollDDRequest;
    tableRequest = new TableRequest;
    finalFilter: boolean = false
    dropdownSettings = DropdownPR
    prFilter = new PayrollDetails;
    dropdownFixRequest = new DropdownRequest;
    scId: number = 0
    successMessage = Object.assign({}, SuccessMessage)
    deletemessage = Object.assign({}, SuccessMessage)
    failedMessage = Object.assign({}, FailedMessage)
    savedMessage = Object.assign({}, SaveMessage)

    // selectedProject:  string = 'Summary';
    selectedProject1: string = 'PAYREG';
    selectedProject2: string = 'MISC_REG';
    selectedProject3: string = 'OT_REG'
    selectedProject4: string = 'TAX_REG'
    selectedProject5: string = 'NTAX_REG'
    selectedProject6: string = 'LOAN_REG'
    selectedProject7: string = 'DEDTN_REG'

    isPeI: boolean = true   // Summary
    isWoI: boolean = false  // PAYREG
    isPaI: boolean = false  // ATUL_REG
    isS: boolean = false    // OT_REG
    isL: boolean = false    // TAX_REG
    isOther: boolean = false //NTAX_REG
    isException: boolean = false //LOAN_REG
    isAdmin: boolean = false //DEDTN_REG

    bank: boolean = true
    loading: boolean = false
    disabled: boolean = false
    saving: boolean = true
    buttonDisabled: boolean = false
    isview: boolean = false
    order: string = ''
    tablereqChange: boolean = false

    isPeIfocus = "bg-default"
    isWoIfocus = ""
    isPaIfocus = ""
    isSfocus = ""
    isLfocus = ""
    isOtherfocus = ""
    isEfocus = ""
    isAdfocus = ""

    myFiles: string[] = [];
    sMsg: string = '';
    myFiles2: string[] = [];
    sMsg2: string = '';

    date: Date;
    pipe = new DatePipe('en-US');
    field_count = 0
    field_count2 = 0
    resultHierarchy = new SearchHierarchy;
    defaultTag = [{ id: [], type: -1 }, { id: [], type: -2 }, { id: [], type: -4 }, { id: [], type: -5 }]
    id: string;
    request = new TableRequest
    columnHideT: boolean = false
    columnHideE: boolean = false
    columnHideD: boolean = false
    columnHideL: boolean = false
    columnHideG: boolean = false
    tableFilter: any
    loadHorizontal: boolean = false
    weeklyDisplay: boolean = false

    dropdowntypeid: number
    uploadid: string = "0"
    options: any[] = [];
    type: number = 0
    dropdownDetail = {
        type: 0,
        label: "",
        uri: "",
        dropdownType: 0
    }
    encryptEmployee = []
    encryptPayout = []
    encryptSource = []
    headerList: any[] = []
    headerListReset: any =
        [{ "basicMonth": null, "days": null, "dailyRate": null, "sss": true, "phic": true, "hdmf": true }]

    allSelected: boolean = false

    wordFilter: string = ''
    searchTermTk: string = '';
    searchTermE: string = '';
    searchTermD: string = '';
    searchTermL: string = '';
    searchTermGc: string = '';
    searchTermGp: string = '';
    searchTermPayreg: string = '';
    searchTermMisc: string = '';
    searchTermOt: string = '';
    searchTermTax: string = '';
    searchTermNtax: string = '';
    searchTermLoan: string = '';
    searchTermDed: string = '';

    fileTable = [];
    filteredOptions: any[] = [];
    timekeepingSource = []
    timekeepingABSource = []
    earningSource = []
    earningABSource = []
    earningESource = []
    deductionSource = [];
    deductionESource = [];
    deductionABSource = [];
    loanSource = [];
    adjSource = [];
    loanESource = [];
    loanABSource = [];
    govconSource = [];
    sysSource = [];

    ////// TABLE UPLOADED FILES
    earningUpload = []
    deductionUpload = []
    loanUpload = []
    govtUpload = []
    tkUpload = []
    sysTKUpload = []
    sysUpload = []
    sysAUpload = []

    /////Backup data
    clonedPayreg = []

    totalRows: number = 0
    totalRows1: number = 0
    totalRows2: number = 0
    totalRows3: number = 0
    totalRows4: number = 0
    totalRows5: number = 0
    totalRows6: number = 0
    totalRows7: number = 0
    totalRowsBank: number = 0
    totalRowsDetail: number = 0
    // totalRowsAB: number = 0
    // totalRowsE: number = 0

    tkList = []
    tkListAB = []
    earningList = []
    earningEList = []
    earningListAB = []
    deductionList = []
    deductionEList = []
    deductionListAB = []
    loanList = []
    loanEList = []
    loanListAB = []
    govList = []

    tkid: string

    ////// Upload recent files
    checkedList = []
    checkedListEarn = []
    checkedListEarnAB = []
    checkedListTk = []
    checkedListTkAB = []
    checkedListGov = []
    checkedListDeduc = []
    checkedListDeducE = []
    checkedListDeducAB = []
    checkedListLoan = []
    checkedListLoanE = []
    checkedListLoanAB = []

    ///////Uploaded files
    checkTableE = []
    checkTableD = []
    checkTableL = []
    checkTableG = []
    checkTableT = []
    checkTableTAB = []
    checkTableS = []
    checkTableTS = []

    ///////Deleted files uploaded
    delTableE = []
    delTableD = []
    delTableL = []
    delTableG = []
    delTableT = []
    delTableAB = []
    delTableS = []
    delTableSAB = []
    delTableTS = []

    ///////Deleted files current
    delTableEC = []
    delTableDC = []
    delTableLC = []
    delTableGC = []
    delTableTC = []
    delTableABC = []
    delTableTSC = []

    ////Deleted files
    deleteTK = []



    payRegCheck = []
    payRegExclude = []
    localcontrol = ""
    detailSource = [{
        Emp_Code: 123,
        Emp_Name: "Excluded User 1"
    }, {
        Emp_Code: 124,
        Emp_Name: "Excluded User 2"
    }, {
        Emp_Code: 125,
        Emp_Name: "Excluded User 3"
    }];

    ///// RECENT UPLOADED FILES
    uploadSource: any[] = []
    uploadSource2: any[] = []
    TkSource: any[] = []
    TkABSource: any[] = []
    EarnSource: any[] = []
    EarnESource: any[] = []
    EarnABSource: any[] = []
    DeductionSource: any[] = []
    DeductionESource: any[] = []
    DeductionABSource: any[] = []
    LoanSource: any[] = []
    LoanESource: any[] = []
    LoanABSource: any[] = []
    GovtSource: any[] = []

    /////UPLOADED FILES
    EarnTableSource: any[] = []
    DeductionTableSource: any[] = []
    LoanTableSource: any[] = []
    GovTableSource: any[] = []
    TKTableSource: any[] = []
    TKATableSource: any[] = []
    SysTableSource: any[] = []
    SysATableSource: any[] = []
    SysTKTableSource: any[] = []

    uploadColumns: string[] = [
        'checkbox', 'file'
    ];

    payrollCutoff: any[] = []
    subCompany: any[] = []
    category: any[] = []
    department: any[] = []
    confidential: any[] = []
    year: any[] = []
    cutoff: any[] = []
    branch: any[] = []
    status: any[] = []
    employee: any[] = []
    oldemployee: any[] = []
    selectedEmp: any[] = []
    duplicateEmp: any[] = []
    duplicateEmp2: any[] = []
    dupEmpFilter: any[] = []
    code: any[] = []

    deleteShow: boolean = false
    showCancel: boolean = false
    showSave: boolean = true
    hideCancel: boolean = false
    view: boolean = false
    tkHascontrol: boolean = false
    tkdropdown: boolean = false
    tkadjdropdown: boolean = false

    employeeRequest = new DropdownRequest;
    inputChange: UntypedFormControl = new UntypedFormControl();
    inputChangepayroll: UntypedFormControl = new UntypedFormControl();
    inputChange_company: UntypedFormControl = new UntypedFormControl();
    inputChange_branch: UntypedFormControl = new UntypedFormControl();
    inputChange_empCat: UntypedFormControl = new UntypedFormControl();
    inputChange_department: UntypedFormControl = new UntypedFormControl();
    inputChange_confidential: UntypedFormControl = new UntypedFormControl();
    dataSearch: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    protected _onDestroy = new Subject<void>();
    complete: boolean = false
    index: number = 1
    placeholder: string = "Branch"
    data = []
    uploadData = []
    files = []
    fileName: string = ''
    payrollTypeId: number = 0
    module_id: number = 61
    pcode: string = ''
    isadj: boolean = false
    deleted: boolean = false
    listFilter: boolean = false
    payrollCode: string
    divideTaxPay: number = 0
    projectedGovCon: boolean = false
    PayrollRun: any
    blobdata: string = ''
    listUploadID = []
    selectedIndex: number = 0
    stepperHide: boolean = false
    lockedDate: string = ""
    excluded = []
    selected = []

    @ViewChild('tkfile') tkfile: TimekeepingTableComponent;
    @ViewChild('Table_dependents') Table_dependents: MatTable<any>;
    @ViewChild(MatStepper) stepper: MatStepper;
    @ViewChild('allEmployee') private allEmployee: MatOption;
    @ViewChild('Company') private Company: MatOption;
    @ViewChild('allDepartment') private allDepartment: MatOption;
    @ViewChild('allCategory') private allCategory: MatOption;
    @ViewChild('allConfidential') private allConfidential: MatOption;
    @ViewChild('allBranch') private allBranch: MatOption;
    @ViewChild('branchA') public branchA: MatOption;
    @ViewChild('earnTable', { static: false }) private earnTable: UploadComponent;
    @ViewChild('deducTable', { static: false }) private deducTable: UploadComponent;
    @ViewChild('loanTable', { static: false }) private loanTable: UploadComponent;
    @ViewChild('govtTable', { static: false }) private govtTable: UploadComponent;
    @ViewChild('tkTable', { static: false }) private tkTable: UploadComponent;
    private spinnerDialogRef: MatDialogRef<SpinnerComponent>;
    private dialogBox: MatDialogRef<DialogboxComponent>;
    private dialogCurrency: MatDialogRef<DialogBoxCurrencyComponent>;
    private dialogAnnualized: MatDialogRef<DialogBoxAnnualizedComponent>;
    dataChild: any[] = []


    payout = [
        { id: 1, description: 'Regular' },
        { id: 2, description: '13th Month' },
        { id: 3, description: 'Final Pay' },
        { id: 4, description: 'Special Payroll' },
        { id: 5, description: 'SSS Mat' },
    ];

    annual = [
        { id: 1, description: 'Yes' },
        { id: 2, description: 'No' },
    ];

    transac = [
        { id: 1, description: 'Edit' },
        { id: 2, description: 'Add' },
    ]

    earn = [
        { id: 1, description: 'Manual' },
        { id: 2, description: 'Upload' },
        // { id: 3, description: 'System Generated' },
    ];

    loans = [
        { id: 1, description: 'Manual' },
        { id: 2, description: 'Upload' },
        { id: 3, description: 'System Generated' },
        { id: 4, description: 'Adjustment' },
    ];

    tk = [
        { id: 12704, description: 'Upload Detail' },
        { id: 12703, description: 'Upload Summary' },
        { id: 12686, description: 'System Generated' },
        { id: 31202, description: 'Summary Hours SysGen' },
    ];

    tk1 = [
        { id: 1, description: 'Detailed' },
        { id: 2, description: 'Summary' },
    ];

    payslip = [
        { id: 1, description: 'Publish' },
        { id: 2, description: 'Unpublish' },
        { id: 3, description: 'Download PDF' },
        { id: 4, description: 'Download EXCEL' },
        { id: 5, description: 'Download TXT' },
        { id: 6, description: 'Send' },
    ];

    stat = [
        { id: 0, description: 'All' },
        { id: 1, description: 'Unpublish' },
        { id: 2, description: 'Published' },
    ];

    bm = [
        { id: 1, description: 'Security Bank' },
        { id: 2, description: 'BDO' },
        { id: 3, description: 'BPI' },
        { id: 4, description: 'China Bank' },
        { id: 5, description: 'Eastwest' },
        { id: 5, description: 'Gcash' },
        { id: 5, description: 'Paypal' },
    ];

    ba = [
        { id: 0, description: 'All' },
        { id: 1, description: 'Yes' },
        { id: 2, description: 'No' },
    ];

    //// GENERATE PAYROLL TAB ///////

    payregColumns: any[] = [
        { key: 'payrollCode', label: 'Payroll Code' }, { key: 'payoutType', label: 'Payroll Type' }, { key: 'payoutDate', label: 'Payout Date' }, { key: 'idBranch', label: 'Branch ID' }, { key: 'employeeCode', label: 'Employee Code' }
        , { key: 'lastName', label: 'Last Name' }, { key: 'firstName', label: 'First Name' }, { key: 'position', label: 'Position' }, { key: 'dailyRate', label: 'Daily Rate', decimalPipe: true }, { key: 'monthlyRate', label: 'Monthly Rate', decimalPipe: true }, { key: 'basic', label: 'Basic', decimalPipe: true }
        , { key: 'grossPay', label: 'Gross Pay', decimalPipe: true }, { key: 'attendance', label: 'Attendance', decimalPipe: true }, { key: 'leaveAmount', label: 'Leave Amount', decimalPipe: true }, { key: 'overtimeReg', label: 'Overtime(Reg)' }, { key: 'overtimeHol', label: 'Overtime(Hol)' }, { key: 'earningsTX', label: 'Earning TX', decimalPipe: true }, { key: 'taxableIncome', label: 'Gross Pay', decimalPipe: true }
        , { key: 'grossTaxable', label: 'Gross Taxable', decimalPipe: true }, { key: 'sssee', label: 'Employee SSS', decimalPipe: true }, { key: 'sssmpf', label: 'Employee SSS MPF' }, { key: 'phicee', label: 'Employee PHIC' }, { key: 'hdmfee', label: 'Employee HDMF' }, { key: 'ssser', label: 'Employer SSS', decimalPipe: true }
        , { key: 'taxWithholding', label: 'Witholding Tx' }, { key: 'earningsNTX', label: 'Earnings NTX', decimalPipe: true }, { key: 'deductions', label: 'Deductions' }, { key: 'loans', label: 'Loans' }, { key: 'netPayFinal', label: 'Net Pay Final', decimalPipe: true }, { key: 'dateProcessed', label: 'Date Processed' }
        , { key: 'sssmpfer', label: 'Employer SSS MPF', decimalPipe: true }, { key: 'sssec', label: 'SSS EC', decimalPipe: true }, { key: 'phicer', label: 'Employer PHIC' }, { key: 'hdmfer', label: 'Employer HDMF' }, { key: 'payrollCost', label: 'Payroll Cost', decimalPipe: true }
        , { key: 'processedBy', label: 'Processed By' }, { key: 'cutoffStart', label: 'Cutoff Start' }, { key: 'cutoffEnd', label: 'Cutoff End' }, { key: 'bank', label: 'Bank' }, { key: 'bankAccount', label: 'Bank Account' }

    ];
    payregSource: any[] = []

    miscColumns: any[] = [
        { key: 'payrollnumber', label: 'Payroll Number' }, { key: 'paydate', label: 'Pay Date' }, { key: 'branch', label: 'Branch ID' }, { key: 'employeecode', label: 'Employee Code' }, { key: 'lastname', label: 'Last Name' }, { key: 'firstname', label: 'First Name' }
        , { key: 'filestatus', label: 'File Status' }, { key: 'transactiontype', label: 'Transaction Type' }, { key: 'date', label: 'Date' }, { key: 'costcenter', label: 'Cost Center' }, { key: 'days', label: 'Days', decimalPipe: true }, { key: 'hours', label: 'Hours', decimalPipe: true }
        , { key: 'amount', label: 'Amount', decimalPipe: true }, { key: 'remarks', label: 'Remarks' }, { key: 'from_', label: 'From' }, { key: 'to', label: 'To' }
    ];
    miscSource: any[] = []

    otColumns: any[] = [
        { key: 'payrollnumber', label: 'Payroll Number' }, { key: 'paydate', label: 'Pay Date' }, { key: 'branch', label: 'Branch ID' }, { key: 'employeecode', label: 'Employee Code' }, { key: 'lastname', label: 'Last Name' }, { key: 'firstname', label: 'First Name' }
        , { key: 'filestatus', label: 'File Status' }, { key: 'otcode', label: 'OT Code' }, { key: 'date', label: 'Date' }, { key: 'costcenter', label: 'Cost Center' }, { key: 'otrates', label: 'OT Rates', decimalPipe: true }, { key: 'othours', label: 'OT Hours', decimalPipe: true }
        , { key: 'otminutes', label: 'OT Minutes', decimalPipe: true }, { key: 'otamount', label: 'OT Amount', decimalPipe: true }, { key: 'remarks', label: 'Remarks' }, { key: 'from_', label: 'From' }, { key: 'to', label: 'To' }
    ];
    otSource: any[] = []

    taxColumns: any[] = [
        { key: 'payrollnumber', label: 'Payroll Number' }, { key: 'paydate', label: 'Pay Date' }, { key: 'branch', label: 'Branch ID' }, { key: 'employeecode', label: 'Employee Code' }, { key: 'lastname', label: 'Last Name' }, { key: 'firstname', label: 'First Name' }
        , { key: 'filestatus', label: 'File Status' }, { key: 'incomecode', label: 'Income Code' }, { key: 'date', label: 'Date' }, { key: 'amount', label: 'Amount', decimalPipe: true }, { key: 'recurstart', label: 'Recur Start' }, { key: 'recurend', label: 'Recur End' }
        , { key: 'freq', label: 'Frequency' }, { key: 'costCenter', label: 'Cost Center' }, { key: 'remarks', label: 'Remarks' }, { key: 'from_', label: 'From' }, { key: 'to', label: 'To' }
    ];
    taxSource: any[] = []

    ntaxColumns: any[] = [
        { key: 'payrollnumber', label: 'Payroll Number' }, { key: 'paydate', label: 'Pay Date' }, { key: 'branch', label: 'Branch ID' }, { key: 'employeecode', label: 'Employee Code' }, { key: 'lastname', label: 'Last Name' }, { key: 'firstname', label: 'First Name' }
        , { key: 'filestatus', label: 'File Status' }, { key: 'incomecode', label: 'Income Code' }, { key: 'date', label: 'Date' }, { key: 'amount', label: 'Amount', decimalPipe: true }, { key: 'recurstart', label: 'Recur Start' }, { key: 'recurend', label: 'Recur End' }
        , { key: 'freq', label: 'Frequency' }, { key: 'costcenter', label: 'Cost Center' }, { key: 'remarks', label: 'Remarks' }, { key: 'from_', label: 'From' }, { key: 'to', label: 'To' }
    ];
    ntaxSource: any[] = []

    loanColumns: any[] = [
        { key: 'payrollnumber', label: 'Payroll Number' }, { key: 'paydate', label: 'Pay Date' }, { key: 'branch', label: 'Branch ID' }, { key: 'employeecode', label: 'Employee Code' }, { key: 'lastname', label: 'Last Name' }, { key: 'firstname', label: 'First Name' }
        , { key: 'filestatus', label: 'File Status' }, { key: 'loancode', label: 'Loan Code' }, { key: 'loandatestart', label: 'Loan Date Start' }, { key: 'loanprincipal', label: 'Loan Principal', decimalPipe: true }, { key: 'loanamount', label: 'Loan Amount', decimalPipe: true }, { key: 'loanpayment', label: 'Loan Payment', decimalPipe: true }
        , { key: 'loanbalance', label: 'Loan Balance', decimalPipe: true }, { key: 'loandeductionamount', label: 'Loan Ded Amout', decimalPipe: true }, { key: 'freq', label: 'freq' }, { key: 'loanstatus', label: 'Loan Status' }, { key: 'loandategranted', label: 'Loan Date Granted' }, { key: 'from_', label: 'From' }
        , { key: 'to', label: 'To' }

    ];
    loanGPSource: any[] = []

    dedColumns: any[] = [
        { key: 'payrollnumber', label: 'Payroll Number' }, { key: 'paydate', label: 'Pay Date' }, { key: 'branch', label: 'Branch ID' }, { key: 'employeecode', label: 'Employee Code' }, { key: 'lastname', label: 'Last Name' }, { key: 'firstname', label: 'First Name' }
        , { key: 'filestatus', label: 'File Status' }, { key: 'deductioncode', label: 'Deduction Code' }, { key: 'date', label: 'Date' }, { key: 'deductionamount', label: 'Amount', decimalPipe: true }, { key: 'dedfreq', label: 'Deduction Frequency' }, { key: 'lastdeddate', label: 'Last DED date' }
        , { key: 'costcenter', label: 'Cost Center' }, { key: 'from_', label: 'From' }, { key: 'to', label: 'To' }
    ];
    dedSource: any[] = []

    detailsColumns: any[] = [
        { key: 'employeeCode', label: 'Employee Code' }, { key: 'displayName', label: ' Employee Name' }
    ]
    detailsSource: any[] = []

    bankColumns: any[] = [
        { key: 'subCompany', label: 'Company Name' }, { key: 'branch', label: 'Branch Name' }, { key: 'employeeCode', label: 'Employee ID' }, { key: 'displayName', label: ' Employee Name' }, { key: 'bankName', label: 'Bank Name' }, { key: 'accountNumber', label: 'Account Number' }, { key: 'amount', label: 'Amount', decimalPipe: true }
    ]
    bankSource: any[] = []
    employeeDetailColumns: any[] = [
        { key: 'employeeCode', label: 'Employee Code' }, { key: 'employeeName', label: ' Employee Name' }, { key: 'status', label: 'Final Pay Status' }, { key: 'date', label: 'Date' }, { key: 'basicMonth', label: 'Basic Month', decimalPipe: true, inputfield: true, toolDesc: 'Count of Monthly Salary to use', type: "text" },
        { key: 'recurringEarnings', label: 'Earnings', info: true, toolDesc: 'Include Recurring Earnings', checkLabel: true }, { key: 'recurringDeduction', label: 'Deductions', info: true, toolDesc: 'Include Recurring Deductions', checkLabel: true }, { key: 'loan', label: 'Loans', info: true, toolDesc: "'Pay Gov't Loan Balance in Full'", checkLabel: true }, { key: 'statutory', label: 'Statutory', info: true, toolDesc: "'Calculate Employee's Last Month Remaining Contribution'", checkLabel: true },
        { key: 'thirteenMonth', label: '13th Month', info: true, toolDesc: 'Include 13th Month', checkLabel: true }, { key: 'fourteenMonth', label: '14th Month', info: true, toolDesc: 'Include 14th Month', checkLabel: true }, { key: 'fifteenMonth', label: '15th Month', info: true, toolDesc: 'Include 15th Month', checkLabel: true }, { key: 'sixteenMonth', label: '16th Month', info: true, toolDesc: 'Include 16th Month', checkLabel: true }
    ]
    employeeDetailSource: any[] = []
    specialDetailColumns: any[] = [
        { key: 'employeeCode', label: 'Employee Code' }, { key: 'employeeName', label: ' Employee Name' }, { key: 'basicMonth', label: 'Basic Month', decimalPipe: true, inputfield: true, toolDesc: 'Count of Monthly Salary to use', type: "text" },
        { key: 'recurringEarnings', label: 'Earnings', info: true, toolDesc: 'Include Recurring Earnings', checkLabel: true }, { key: 'recurringDeduction', label: 'Deductions', info: true, toolDesc: 'Include Recurring Deductions', checkLabel: true }, { key: 'loan', label: 'Loans', info: true, toolDesc: "'Include Recurring Loans'", checkLabel: true }, { key: 'statutory', label: 'Statutory', info: true, toolDesc: "'Calculate Employee's Current Month Statutories'", checkLabel: true }
        , { key: 'tax', label: 'Tax', info: true, toolDesc: "'Calculate Tax according to wage type'", checkLabel: true }
    ]
    specialDetailSource: any[] = []
    maternityDetailColumns: any[] = [
        { key: 'employeeCode', label: 'Employee Code' }, { key: 'employeeName', label: ' Employee Name' }, { key: 'status', label: 'Final Pay Status' }, { key: 'date', label: 'Date' }, { key: 'days', label: 'Days', decimalPipe: true, inputfield: true, type: "number" }, { key: 'dailyRate', label: 'Mat Daily Rate', decimalPipe: true, inputfield: true, type: "text" },
        { key: 'recurringEarnings', label: 'Earnings', info: true, toolDesc: 'Include Recurring Earnings', checkLabel: true }, { key: 'recurringDeduction', label: 'Deductions', info: true, toolDesc: 'Include Recurring Deductions', checkLabel: true }, { key: 'loan', label: 'Loans', info: true, toolDesc: "'Pay Gov't Loan Balance in Full'", checkLabel: true }, { key: 'statutory', label: 'Statutory', info: true, toolDesc: "'Calculate Eployee's Last Month Remaining Contribution'", checkLabel: true }
    ]
    maternityDetailSource: any[] = []
    thirteenmonthDetailColumns: any[] = [
        { key: 'employeeCode', label: 'Employee Code' }, { key: 'employeeName', label: ' Employee Name' }, { key: 'projectedMonths', label: 'Projected Month', decimalPipe: true, inputfield: true, toolDesc: 'Count of Monthly Salary to use', type: 'number' }, { key: 'dateFrom', label: 'Date From', type: 'date' }, { key: 'dateTo', label: 'Date To', type: 'date' }, { key: 'thirteenMonth', label: '13th Month', info: true, toolDesc: 'Include 13th Month', checkLabel: true },
        { key: 'fourteenMonth', label: '14th Month', info: true, toolDesc: 'Include 14th Month', checkLabel: true }, { key: 'fifteenMonth', label: '15th Month', info: true, toolDesc: 'Include 15th Month', checkLabel: true }, { key: 'sixteenMonth', label: '16th Month', info: true, toolDesc: 'Include 16th Month', checkLabel: true }
    ]
    thirteenmonthDetailSource: any[] = []
    regularWeeklyColumns: any[] = [
        { key: 'employeeCode', label: 'Employee Code' }, { key: 'employeeName', label: ' Employee Name' }, { key: 'basicMonth', label: 'Basic Month', decimalPipe: true, inputfield: true, toolDesc: 'Count of Monthly Salary to use', type: "text" },
        { key: 'sss', label: 'SSS', info: true, toolDesc: 'Include SSS', checkLabel: true }, { key: 'phic', label: 'PHIC', info: true, toolDesc: 'Include PHIC', checkLabel: true }, { key: 'hdmf', label: 'HDMF', info: true, toolDesc: "'Include HDMF'", checkLabel: true }, { key: 'tax', label: 'Tax', info: true, toolDesc: "'Calculate Tax according to wage type'", checkLabel: true }
    ]
    regularWeeklySource: any[] = []
    filename: any = [{}]
    currencySource: any[] = []
    isEdit: boolean = false
    clicked: string = ''
    isHide: boolean = false
    isDetails: boolean = true
    isStatus: boolean = false
    errorLogs: boolean = true
    iseditdd: boolean = false
    matopt2: boolean = true
    payrollId: number = 0
    encryptId: string = ""
    detailsSaved: boolean = false

    isDelete = false
    isDelete2 = false
    earnDelete = false
    earnEDelete = false
    earnDelete2 = false
    deductionDelete = false
    deductionEDelete = false
    deductionDelete2 = false
    loanDelete = false
    loanEDelete = false
    loanABDelete2 = false
    govtDelete = false

    ////Delete Uploaded
    earnTableDelete = false
    deducTableDelete = false
    loanTableDelete = false
    govTableDelete = false
    tkTableDelete = false
    tkaTableDelete = false
    sysTableDelete = false
    sysATableDelete = false
    sysTKTableDelete = false

    exclude = []
    multiple: boolean = true
    // oldvalue = []
    isAll: boolean = false
    mode = 0;//1 - search;
    edit = 0;//1 - create;
    finalEmpList = []
    selectedEmloyees = []
    employeeExclude = []

    payoutDateDisplayOld = ""


    selectedutoff: any
    backupData = []

    subCompany_old: any[] = []
    branch_old: any[] = []
    category_old: any[] = []
    department_old: any[] = []
    confidential_old: any[] = []
    previousSelection: any;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private handler: HttpBackend,
        private message: FuseConfirmationService,
        public dialog: MatDialog,
        private categoryService: CategoryService,
        private timekeepingService: TimekeepingService,
        private fileService: FileService,
        private router: Router,
        private route: ActivatedRoute,
        private payrollService: PayrollService,
        private tenantService: TenantService,
        private cdr: ChangeDetectorRef,
        private _location: Location,
        private masterService: MasterService,
        private datePipe: DatePipe,
        private coreService: CoreService,
    ) {
        router.events.subscribe(val => {
            if (val instanceof NavigationEnd) {
                myData.bypass = false
            }
        });
        //Employee
        this.inputChange.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe((value) => {
            if (GF.IsEmpty(value)) {
                // this.employee = this.oldemployee
                this.employeeRequest.search = '';
                this.employeeRequest.id = [];
                this.employeeRequest.start = 0;
                this.index = 0;
                this.employeeHandler(mode.search);
                this.detailForm.get('employee').setValue(this.selectedEmloyees)
                // if (this.selectedEmloyees.length < this.employee.length) {
                //     // this.allEmployee.deselect()
                //     // this.findIndexNsplice('selectedEmloyees',0)
                // }
                this.complete = false;
            } else {
                this.employeeHandler(mode.search);
            }
        });
        this.initializeInputChange(this.inputChange_company, 'subCompany', 'subCompany_old');
        this.initializeInputChange(this.inputChange_branch, 'branch', 'branch_old');
        this.initializeInputChange(this.inputChange_empCat, 'category', 'category_old');
        this.initializeInputChange(this.inputChange_department, 'department', 'department_old');
        this.initializeInputChange(this.inputChange_confidential, 'confidential', 'confidential_old');
    }

    initializeInputChange(inputChange: UntypedFormControl, options, options_old) {
        inputChange.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe((value) => {
            if (GF.IsEmpty(value)) {
                this[options] = [...GF.IsEmptyReturn(this[options_old], this[options])]
            } else {
                this[options_old] = _.unionBy([...this[options], ...this[options_old]], JSON.stringify)
                this[options] = this[options_old].filter(x => x.description.toLowerCase().includes(value.toLowerCase()))
            }
        });
    }

    get dF() {
        return this.detailForm.value
    }

    get isUploads() {
        return (sessionStorage.getItem("moduleId") == '156')
    }

    showSteper(id) {
        return GF.IsEmpty(this.payrollId) ? false : this.stepperHide && id === 6 ? true : !this.stepperHide
    }

    ngOnInit() {
        this.payrollCode = this.route.snapshot.paramMap.get('id');
        myData.payrollCode = this.payrollCode
        this.detailForm = this.fb.group(new PayrollDetails());
        this.timekeepingForm = this.fb.group(new PayrollTimekeeping());
        this.earningForm = this.fb.group(new PayrollEarning()); //// value must be an array bug dito
        this.deductionForm = this.fb.group(new PayrollDeductions());
        this.loanForm = this.fb.group(new PayrollLoans());
        this.contributionForm = this.fb.group(new PayrollGovCont());
        this.generateForm = this.fb.group(new PayrollGenerate());
        this.annualizedForm = this.fb.group(new PayrollAnnualized());

        this.detailForm.get('payoutDateDisplay').setValue("");
        this.earningForm.get('transactionType').setValue(2);
        this.earningForm.get('earningType').setValue(2);
        this.deductionForm.get('transactionType').setValue(2);
        this.deductionForm.get('deductionType').setValue(2);
        this.loanForm.get('transactionType').setValue(2);
        this.loanForm.get('loanType').setValue(2);
        this.buttonDisabled = false
        myData.bypass = true
        // this.mode = 5

        this.selectedIndex = this.isUploads ? 1 : 0

        forkJoin({
            payrollCutoff: this.payrollService.getPGPayrollCutoff(this.dropdownRequest),
            tenant: this.tenantService.getNextSeriesView(this.module_id),
            details: this.payrollService.getPGMain(this.payrollCode, this.dropdownRequest),
        }).subscribe({
            next: (value: any) => {

                this.payrollCutoff = value.payrollCutoff.payload
                this.detailForm.get('payrollCode').setValue(value.tenant.payload)

                this.dropdownFixRequest.id.push(
                    { dropdownID: 0, dropdownTypeID: 2 },
                    { dropdownID: 0, dropdownTypeID: 74 },
                    { dropdownID: 0, dropdownTypeID: 53 },
                    { dropdownID: 0, dropdownTypeID: 54 },
                    { dropdownID: 0, dropdownTypeID: 145 },
                    { dropdownID: 0, dropdownTypeID: 36 },
                )

                this.initData()

                if (this.payrollCode !== '') {
                    this.iseditdd = true
                    this.stepperHide = value.details.payload.isLocked
                    this.lockedDate = value.details.payload.dateLocked
                    this.encryptId = value.details.payload.encryptID
                    this.detailForm.patchValue(JSON.parse(JSON.stringify(value.details.payload)))
                    this.finalEmpList = value.details.payload.employee
                    this.selectedEmloyees = value.details.payload.employee
                    this.employeeExclude = value.details.payload.employeeExclude
                    this.isAll = this.finalEmpList.some(x => x === 0);
                    this.detailForm.get("status").setValue(value.details.payload.status)
                    this.payrollCutoff = value.payrollCutoff.payload
                    this.detailForm.get("categoryPayroll").setValue(value.details.payload.categoryPayroll[0])
                    this.detailForm.get("cutoffID").setValue(value.details.payload.cutoffID)
                    this.payrollId = value.details.payload.id
                    sessionStorage.setItem("payrollcode", this.payrollId.toString())
                    var description = this.detailForm.value.descriptionseletc
                    var e = { value: value.details.payload.categoryPayroll }
                    this.payoutDateDisplayOld = value.details.payload.payoutDateDisplay
                    this.typeHandler(e, false)

                    if (myData.backSave) {
                        this.stepper.selectedIndex = myData.stepperIndex
                        if (myData.stepperIndex === 2) {
                            this.earningForm.get('transactionType').setValue(2);
                        } else if (myData.stepperIndex === 3) {
                            this.deductionForm.get('transactionType').setValue(2);
                        } else if (myData.stepperIndex === 4) {
                            this.loanForm.get('transactionType').setValue(2);
                        }

                        myData.backSave = false
                    }
                    this.currencyTable()
                    if (this.iseditdd && this.detailForm.value.payoutTypeID === 12720 || this.iseditdd && this.detailForm.value.payoutTypeID === 12722) {
                        this.finalList()
                    }
                }

            },
            error: (e) => {
                console.error(e)
            },
        });

        this.initData()

    }

    onSelectOpen(isOpen: boolean, input): void {
        if (isOpen) {
            // console.log('MatSelect is open');
        } else {
            input.setValue("");
            // console.log('MatSelect is closed');
        }
    }

    initData() {
        forkJoin({
            dropdownFixRequest: this.masterService.getDropdownFix(this.dropdownFixRequest)
        })
            .subscribe({
                next: (response) => {
                    this.dropdownOptions.payoutTypeDef = _.uniqBy(response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 74), JSON.stringify)
                    this.dropdownOptions.cutoffdef = _.uniqBy(response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID == 53), JSON.stringify)
                    this.dropdownOptions.monthlydef = _.uniqBy(response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 54), JSON.stringify)
                    this.dropdownOptions.finalPayStatDef = _.uniqBy(response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 145), JSON.stringify)
                    this.dropdownOptions.employeeStatusDef = _.uniqBy(response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 36), JSON.stringify)

                    let excludedNumbers: number[] = [2700, 2701, 2704, 2705, 2708, 2738];
                    let dropdownIDs: number[] = [];

                    var neededId = []
                    for (let i = 2700; i <= 2779; i++) {
                        if (excludedNumbers.includes(i)) {
                            neededId.push(i)
                        }
                    }
                    this.dropdownOptions.bankDef = _.uniqBy(response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID == 2), JSON.stringify)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                },

            });
    }

    loadTables(control) {
        if (this.tablereqChange) {
            this.tableRequest.Length = 10
        }
        var payrollcode = this.detailForm.value.payrollCode
        var option = GF.IsEmptyReturn(this.generateForm.value.payslipStatus, 0)
        forkJoin({
            payreg: this.payrollService.getPayregSheet1(option, payrollcode, this.tableRequest),
            misc: this.payrollService.getMiscSheet2(option, payrollcode, this.tableRequest),
            ot: this.payrollService.getOTSheet3(option, payrollcode, this.tableRequest),
            tax: this.payrollService.getTaxSheet4(option, payrollcode, this.tableRequest),
            ntax: this.payrollService.getNTaxSheet5(option, payrollcode, this.tableRequest),
            loan: this.payrollService.getLoanSheet6(option, payrollcode, this.tableRequest),
            dedtn: this.payrollService.getDeductionSheet7(option, payrollcode, this.tableRequest)
        }).subscribe({
            next: (value: any) => {

                ///// PAYREG CUSTOMS
                if (value.payreg.payload !== null) {
                    var transformPayreg = value.payreg.payload.data.map(data => {
                        var date = this.datePipe.transform(data.payoutDate, 'MM/dd/yyyy');
                        var cutoffS = this.datePipe.transform(data.cutoffStart, 'MM/dd/yyyy');
                        var cutoffE = this.datePipe.transform(data.cutoffEnd, 'MM/dd/yyyy');
                        return { ...data, payoutDate: date, cutoffStart: cutoffS, cutoffEnd: cutoffE };
                    });
                    if (value.payreg.payload.list) {
                        this.encryptSource = value.payreg.payload.list
                        this.encryptPayout = value.payreg.payload.payout
                    }
                    this.totalRows1 = value.payreg.payload.totalRows
                }
                //////MISC CUSTOMS
                if (value.misc.payload !== null) {
                    var transformMisc = value.misc.payload.data.map(data => {
                        var pdate = this.datePipe.transform(data.paydate, 'MM/dd/yyyy');
                        var ddate = this.datePipe.transform(data.date, 'MM/dd/yyyy');
                        var fromc = this.datePipe.transform(data.from_, 'MM/dd/yyyy');
                        var toc = this.datePipe.transform(data.to, 'MM/dd/yyyy');
                        return { ...data, date: ddate, paydate: pdate, from_: fromc, to: toc };
                    });
                    this.totalRows2 = value.misc.payload.totalRows
                }
                //////OT CUSTOMS
                if (value.ot.payload !== null) {
                    var transformOT = value.ot.payload.data.map(data => {
                        var ddate = this.datePipe.transform(data.date, 'MM/dd/yyyy');
                        var pdate = this.datePipe.transform(data.paydate, 'MM/dd/yyyy');
                        var fromc = this.datePipe.transform(data.from_, 'MM/dd/yyyy');
                        var toc = this.datePipe.transform(data.to, 'MM/dd/yyyy');
                        return { ...data, date: ddate, paydate: pdate, from_: fromc, to: toc };
                    });
                    this.totalRows3 = value.ot.payload.totalRows
                }
                //////TAX CUSTOMS
                if (value.tax.payload !== null) {
                    var transformTAX = value.tax.payload.data.map(data => {
                        var ddate = this.datePipe.transform(data.date, 'MM/dd/yyyy');
                        var pdate = this.datePipe.transform(data.paydate, 'MM/dd/yyyy');
                        var fromc = this.datePipe.transform(data.from_, 'MM/dd/yyyy');
                        var rS = this.datePipe.transform(data.recurstart, 'MM/dd/yyyy');
                        var rE = this.datePipe.transform(data.recurend, 'MM/dd/yyyy');
                        var toc = this.datePipe.transform(data.to, 'MM/dd/yyyy');
                        return { ...data, date: ddate, paydate: pdate, from_: fromc, to: toc, recurstart: rS, recurend: rE };
                    });
                    this.totalRows4 = value.tax.payload.totalRows
                }
                ///////NTAX CUSTOMS
                if (value.ntax.payload !== null) {
                    var transformNTAX = value.ntax.payload.data.map(data => {
                        var ddate = this.datePipe.transform(data.date, 'MM/dd/yyyy');
                        var pdate = this.datePipe.transform(data.paydate, 'MM/dd/yyyy');
                        var fromc = this.datePipe.transform(data.from_, 'MM/dd/yyyy');
                        var rS = this.datePipe.transform(data.recurstart, 'MM/dd/yyyy');
                        var rE = this.datePipe.transform(data.recurend, 'MM/dd/yyyy');
                        var toc = this.datePipe.transform(data.to, 'MM/dd/yyyy');
                        return { ...data, date: ddate, paydate: pdate, from_: fromc, to: toc, recurstart: rS, recurend: rE };
                    });
                    this.totalRows5 = value.ntax.payload.totalRows
                }
                ////////LOAN CUSTOMS
                if (value.loan.payload !== null) {
                    var transformLOAN = value.loan.payload.data.map(data => {
                        var ddate = this.datePipe.transform(data.loandatestart, 'MM/dd/yyyy');
                        var pdate = this.datePipe.transform(data.paydate, 'MM/dd/yyyy');
                        var fromc = this.datePipe.transform(data.from_, 'MM/dd/yyyy');
                        var lds = this.datePipe.transform(data.loandatestart, 'MM/dd/yyyy');
                        var toc = this.datePipe.transform(data.to, 'MM/dd/yyyy');
                        return { ...data, date: ddate, paydate: pdate, from_: fromc, to: toc, loandatestart: lds };
                    });
                    this.totalRows6 = value.loan.payload.totalRows
                }
                ///////DED Customs
                if (value.dedtn.payload !== null) {
                    var transformDED = value.dedtn.payload.data.map(data => {
                        var ddate = this.datePipe.transform(data.loandatestart, 'MM/dd/yyyy');
                        var pdate = this.datePipe.transform(data.paydate, 'MM/dd/yyyy');
                        var fromc = this.datePipe.transform(data.from_, 'MM/dd/yyyy');
                        var ldd = this.datePipe.transform(data.lastdeddate, 'MM/dd/yyyy');
                        var toc = this.datePipe.transform(data.to, 'MM/dd/yyyy');
                        return { ...data, date: ddate, paydate: pdate, from_: fromc, to: toc, lastdeddate: ldd };
                    });
                    this.totalRows7 = value.dedtn.payload.totalRows
                }


                if (control === 'loadAll') {
                    this.payregSource = transformPayreg
                    this.miscSource = transformMisc
                    this.otSource = transformOT
                    this.taxSource = transformTAX
                    this.ntaxSource = transformNTAX
                    this.loanGPSource = transformLOAN
                    this.dedSource = transformDED
                }

                else if (control === 'payreg') { this.payregSource = transformPayreg }
                else if (control === 'misc') { this.miscSource = transformMisc }
                else if (control === 'ot') { this.otSource = transformOT }
                else if (control === 'tax') { this.taxSource = transformTAX }
                else if (control === 'ntax') { this.ntaxSource = transformNTAX }
                else if (control === 'loan') { this.loanGPSource = transformLOAN }
                else if (control === 'ded') { this.dedSource = transformDED }
            },
            error: (e) => {
                console.error(e)
            },
        });
    }

    searchParams(form, panel) {
        this.tableRequest.SearchColumn = []
        const employeeCode = form.value.employeeCode ? form.value.employeeCode : "";
        const firstName = form.value.firstName ? form.value.firstName : "";
        const lastName = form.value.lastName ? form.value.lastName : "";
        const employeeName = form.value.employeeName ? form.value.employeeName : "";
        if (panel === "gp") {
            this.tableRequest.SearchColumn.push(
                {
                    "key": 'employeeCode',
                    "value": employeeCode,
                    "type": 0
                }, {
                "key": 'firstName',
                "value": firstName,
                "type": 0
            }, {
                "key": 'lastName',
                "value": lastName,
                "type": 0
            }
            )
        } else {
            this.tableRequest.SearchColumn.push(
                {
                    "key": 'employeeName',
                    "value": employeeName,
                    "type": 0
                }, {
                "key": 'employeeCode',
                "value": employeeCode,
                "type": 0
            }
            )
        }
        this.listFilter = true
        panel === "gp" ? this.loadTables('loadAll') :
            panel === "details" ? this.finalList() : ""

    }

    changeLoanType(event) {
        if (GF.IsEqual(event.value, [2, 4])) {
            this.dropdowntypeid = 30002
            this.isadj = false;
            this.isview = false;
            if (event.value === 4) {
                this.isadj = true;
            }
            this.uploadTables('ulT', true, '')
        }
    }

    uploadTables(control, uploadList, e) {
        if (e !== "") {
            this.tableRequest = e
        }
        if (uploadList) {
            this.tableRequest.Length = 0
            this.tableRequest.Order = "DateCreated"
            this.tableRequest.OrderBy = "DESC"
            this.tablereqChange = true
        }
        else if (!uploadList) {
            // if (this.checkTableE.length == 1 || this.checkTableT.length === 1 || this.checkTableD.length === 1 || this.checkTableL.length === 1 || this.checkTableG.length === 1 || this.checkTableS.length == 1 || this.checkTableTAB.length === 1) {
            if (this.checkTableE.length == 1 || this.checkTableT.length === 1 || this.checkTableD.length === 1 || this.checkTableL.length === 1 || this.checkTableG.length === 1 || this.checkTableS.length == 1 || this.checkTableTAB.length === 1 || this.checkTableTS.length === 1) {
                if (this.tableRequest.Length === 0) {
                    this.tableRequest.Length = 10
                }
                this.isview = true
            }
            if (this.deleted) {
                this.isview = false
            }
        }
        this.fileService.getUploadedFileHandler(this.tableRequest, this.dropdowntypeid, this.payrollCode, this.uploadid, this.isview, this.isadj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    var files = value.payload.data.map(item => ({
                        id: item.id,
                        filename: item.filename,
                        uploadID: item.uploadID
                    }))

                    var distinctData = _.uniqBy(files, JSON.stringify)

                    var ctr = {
                        "ueT": ["EarnTableSource", "earningUpload"],
                        "udT": ["DeductionTableSource", "deductionUpload"],
                        "ulT": ["LoanTableSource", "loanUpload"],
                        "ugT": ["GovTableSource", "govtUpload"],
                        "utkT": ["TKTableSource", "tkUpload"],
                        "utkA": ["TKATableSource", "timekeepingABSource"],
                        "utkS": ["SysTKTableSource", "sysTKUpload"],
                        "system": ["SysTableSource", "sysUpload"],
                        "systemAB": ["SysATableSource", "sysAUpload"],
                    }

                    if (!this.isview) {
                        this[ctr[control][0]] = distinctData.map(item => ({
                            file: { name: item.filename, lastModifiedDate: "", uploadID: item.uploadID },
                            id: item.id,
                            checkbox: false
                        }))
                    } else if (this.isview) {
                        this[ctr[control][1]] = value.payload.data
                    }

                    if (!uploadList) {
                        this.totalRows = value.payload.totalRows
                        this.uploadData = value.payload.data

                        if (!GF.IsEmpty(value.payload.data[0].uploadID)) {
                            this.uploadid = value.payload.data[0].uploadID
                        }
                        if (!this.isview) {
                            this[ctr[control][1]] = value.payload.data
                        }
                    }

                    this.cdr.detectChanges()
                }

            },
            complete: () => {
                this.tkHascontrol = false
                this.tkadjdropdown = false
                this.tkdropdown = false
            }
        });
    }


    loadBankTable(search) {


        if (search) {
            this.tableRequest.Start = 0

            this.resultHierarchy.Search.forEach(element => {
                var a = element.Value
                if (Array.isArray(element.Value)) {
                    element.Value.forEach(val => {
                        this.tableRequest.SearchColumn.push({
                            "key": element.Key,
                            "value": val + "",
                            "type": element.Type
                        })
                    });
                }
            });

            this.tableRequest.SearchColumn.push({
                "key": "WithBankAccount",
                "value": this.generateForm.value.bankOption + "",
                "type": 2
            })
        } else if (this.localcontrol == 'bank') {

            this.resultHierarchy.Search.forEach(element => {
                var a = element.Value
                if (Array.isArray(element.Value)) {
                    element.Value.forEach(val => {
                        this.tableRequest.SearchColumn.push({
                            "key": element.Key,
                            "value": val + "",
                            "type": element.Type
                        })
                    });
                }
            });

            this.tableRequest.SearchColumn.push({
                "key": "WithBankAccount",
                "value": this.generateForm.value.bankOption + "",
                "type": 2
            })
            // this.tableRequest.Start = this.tableRequest.Start + 1
        }
        if (this.payrollCode !== '') {
            var idString = this.payrollId.toString()
            var sliced = JSON.parse(JSON.stringify(this.tableRequest));
            sliced.SearchColumn.push({ key: "PayrollCode", value: idString, type: 2 })
        }

        this.payrollService.getBankFile(sliced).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.bankSource = value.payload.data
                    this.totalRowsBank = value.payload.totalRows
                    this.tableRequest.SearchColumn = []
                }

            }
        })
    }

    search(a) {
        switch (a) {
            case 'tk':
                this.searchTermTk = this.timekeepingForm.value.search
                break;
            case 'e':
                this.searchTermE = this.earningForm.value.search
                break;
            case 'd':
                this.searchTermD = this.deductionForm.value.search
                break;
            case 'l':
                this.searchTermL = this.loanForm.value.search
                break;
            case 'gc':
                this.searchTermGc = this.contributionForm.value.search
                break;
            case 'payreg':
                this.searchTermPayreg = this.generateForm.value.search
                break;
            case 'misc':
                this.searchTermMisc = this.generateForm.value.searchMisc
                break;
            case 'ot':
                this.searchTermOt = this.generateForm.value.searchOt
                break;
            case 'tax':
                this.searchTermTax = this.generateForm.value.searchTax
                break;
            case 'ntax':
                this.searchTermNtax = this.generateForm.value.searchNtax
                break;
            case 'loan':
                this.searchTermLoan = this.generateForm.value.searchLoan
                break;
            case 'ded':
                this.searchTermDed = this.generateForm.value.searchDed
                break;
        }
    }


    filterDd(op: any[], form: UntypedFormControl) {
        var newList = [...op]
        var a = form.value
        if (!GF.IsEmpty(op) && !GF.IsEmpty(a)) {
            newList = [...op.filter(x => x.description.toLowerCase().includes(a.toLowerCase()))]
        }
        return newList
    }

    reset() {
        this.detailForm.get('categoryPayroll').setValue(0)
        this.detailForm.get('month').setValue(0)
        this.detailForm.get('year').setValue(0)
        this.detailForm.get('month').setValue(0)
        this.detailForm.get('cutoffID').setValue(0)
        this.detailForm.get('finalStatus').setValue(null)
        this.detailForm.get('payoutDateDisplay').setValue("")
        this.detailForm.get('description').setValue("")
        // this.detailForm.get('status').setValue(0)
        this.detailForm.get('status').setValue(null)
        this.subCompany = []
        this.branch = []
        this.category = []
        this.department = []
        this.confidential = []
        this.employee = []
        this.employeeDetailSource = []
        this.specialDetailSource = []
        this.maternityDetailSource = []
        this.thirteenmonthDetailSource = []
    }
    ///////// DETAIL TAB //////////

    cutoffHandler(id, manual) {
        var array = this.payrollCutoff.filter(x => x.cutoffHeaderId == id.value)
        array[0]?.year.forEach(item => {
            if (!this.year.some(x => x.id == item)) {
                this.year.push({
                    id: item,
                    description: item
                });
            }
        });

        this.setPayoutDateDisplay(manual);

    }

    setPayoutDateDisplay(manual) {
        if (this.detailForm.value.categoryPayroll != 0 && this.detailForm.value.cutoffID != 0 && !GF.IsEmpty(this.cutoff)) {
            // if(this.cutoff[0].id === 107 || this.cutoff[0].id === 108){
            var paydate = this.cutoff.find(x => x.id == this.detailForm.value.cutoffID && x.year === this.detailForm.value.year).payoutDate
            var dt1 = this.pipe.transform(paydate, "yyyy-MM-dd")
            var dt2 = this.pipe.transform(this.payoutDateDisplayOld, "yyyy-MM-dd")
            var date = paydate
            if (!manual) {
                date = (dt1 != dt2) ? GF.IsEmptyReturn(this.payoutDateDisplayOld, paydate) : paydate
            }
            this.detailForm.get('payoutDateDisplay').setValue(date)
            // }
        }
    }

    // payrollDateDisp(){
    //     var payrollCutoff = this.payrollCutoff.filter(x=>x.cutoffHeaderId == this.detailForm.value.categoryPayroll)
    //     var date = payrollCutoff.find(x => x.cutoffID == this.detailForm.value.cutoffID && x.month === this.detailForm.value.month && x.year === this.detailForm.value.year).payOutDate
    //     this.detailForm.get("payoutDateDisplay").setValue(date)
    // }

    resetHierarchy() {
        this.detailForm.get('subCompany').setValue([])
        this.detailForm.get('branch').setValue([])
        this.detailForm.get('category').setValue([])
        this.detailForm.get('department').setValue([])
        this.detailForm.get('confidential').setValue([])
        this.detailForm.get('employee').setValue([])
    }

    cutoffSelectionHandler(manual) {
        if (this.detailForm.value.year != 0 && this.detailForm.value.month != 0 && this.detailForm.value.categoryPayroll != 0) {
            var cutoff0 = this.payrollCutoff.find(x => x.cutoffHeaderId === this.detailForm.value.categoryPayroll).cutoffs
            var cutoff1 = cutoff0.filter(x => x.month == this.detailForm.value.month && x.year == this.detailForm.value.year)
            this.cutoff = cutoff1.map(item => ({
                id: item.cutoffId,
                cutoff: item.cutoff,
                description: item.cutoffName,
                sample: item.month,
                year: item.year,
                payoutDate: item.payOutDate
            }))

            if (manual) {
                this.detailForm.get('cutoffID').setValue(this.cutoff[0].id)
            }

        }

        this.setPayoutDateDisplay(manual);
    }

    completeChecker(option): void {
        if (this.dropdownSettings && option && this.dropdownSettings.Length > option.length) {
            this.complete = true;
        } else {
            this.complete = false;
        }
    }

    branchHandler() {
        this.employeeFilter.subCompany = this.detailForm.value.subCompany == 0 || this.detailForm.value.subCompany == null ? [0] : this.detailForm.value.subCompany
        this.employeeFilter.type = 1
        this.employeeFilter.payrollType = this.detailForm.value.payoutTypeID
        this.employeeFilter.tableReq = this.tableRequest
        this.employeeFilter.dropdownReq = this.employeeRequest
        this.employeeFilter.cutoffID = this.detailForm.value.cutoffID
        this.employeeFilter.month = this.detailForm.value.month
        this.employeeFilter.year = this.detailForm.value.year
        if (Array.isArray(this.detailForm.value.categoryPayroll)) {
            this.employeeFilter.payrollCategory = this.detailForm.value.categoryPayroll;
        } else {
            this.employeeFilter.payrollCategory = [this.detailForm.value.categoryPayroll];
        }
        this.branch = []
        this.payrollService.getPGFilter(this.employeeFilter).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.branch = value.payload.branch
                    if (!this.iseditdd) {
                        this.detailForm.get("branch").setValue([...this.branch.map(x => x.dropdownID), ...[0]])
                    }
                }
                else {
                    console.log(value.stackTrace)
                    console.log(value.message)
                }

            },
            error: (e) => {
                console.error(e)
            }, complete: () => {
                // console.log("branch")
                this.employeeHandler(mode.load)
                this.employeeStatusHandler()

            }
        });
    }

    typeHandler(e, manual) {
        this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
        this.employeeFilter.payrollType = this.detailForm.value.payoutTypeID
        this.employeeFilter.type = 0
        this.employeeFilter.dropdownReq = this.employeeRequest
        this.employeeFilter.tableReq = this.tableRequest
        this.employeeFilter.cutoffID = this.detailForm.value.cutoffID
        this.employeeFilter.month = this.detailForm.value.month
        this.employeeFilter.year = this.detailForm.value.year
        forkJoin({
            payrollCutoff: this.payrollService.getPGPayrollCutoff(this.dropdownRequest),
            prFilter: this.payrollService.getPGFilter(this.employeeFilter),
        }).subscribe({
            next: (value: any) => {
                this.payrollCutoff = value.payrollCutoff.payload
                this.category = value.prFilter.payload.employeeCategory
                this.department = value.prFilter.payload.department
                this.confidential = value.prFilter.payload.confidential
                if (!this.iseditdd) {
                    this.detailForm.get("category").setValue([...this.category.map(x => x.dropdownID), ...[0]])
                    this.detailForm.get("department").setValue([...this.department.map(x => x.dropdownID), ...[0]])
                    this.detailForm.get("confidential").setValue([...this.confidential.map(x => x.dropdownID), ...[0]])

                    // if (this.detailForm.value.payoutTypeID === 12719 || this.detailForm.value.payoutTypeID === 12722 || this.detailForm.value.payoutTypeID === 12723) {
                        if (this.detailForm.value.payoutTypeID === 12723) {
                    this.detailForm.get('status').setValue([93, 94, 30050, 30383])
                    } //final
                    // else if (this.detailForm.value.payoutTypeID === 12720) {
                    //     this.detailForm.get('status').setValue([12665, 95])
                    // } // sss mat
                    // else if (this.detailForm.value.payoutTypeID === 12721) {
                    //     this.detailForm.get('status').setValue([12666])
                    // }
                }
                this.cutoffHandler(e, manual)
                this.cutoffSelectionHandler(manual)
                if (!this.iseditdd) {
                    this.payroll_yyMMHandler(manual) ///for year month initial load
                }

            },
            error: (e) => {
                console.error(e)
            }, complete: () => {
                this.companyHandler()

            }
        });
    }

    companyHandler() {
        this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
        this.employeeFilter.payrollType = this.detailForm.value.payoutTypeID
        this.employeeFilter.type = 4
        this.employeeFilter.dropdownReq = this.employeeRequest
        this.employeeFilter.tableReq = this.tableRequest
        this.employeeFilter.cutoffID = this.detailForm.value.cutoffID
        this.employeeFilter.month = this.detailForm.value.month
        this.employeeFilter.year = this.detailForm.value.year
        if (Array.isArray(this.detailForm.value.categoryPayroll)) {
            this.employeeFilter.payrollCategory = this.detailForm.value.categoryPayroll;
        } else {
            this.employeeFilter.payrollCategory = [this.detailForm.value.categoryPayroll];
        }
        this.payrollService.getPGFilter(this.employeeFilter).subscribe({
            next: (value: any) => {
                this.subCompany = value.payload.subCompany
                if (!this.iseditdd) {
                    this.detailForm.get("subCompany").setValue([...this.subCompany.map(x => x.dropdownID), ...[0]])
                }
            },
            error: (e) => {
                console.error(e)
            }, complete: () => {
                this.branchHandler()
            }
        });
    }

    employeeStatusHandler() {
        this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
        this.employeeFilter.payrollType = this.detailForm.value.payoutTypeID
        this.employeeFilter.subCompany = this.detailForm.value.subCompany == 0 || this.detailForm.value.subCompany == null ? [0] : this.detailForm.value.subCompany
        this.employeeFilter.type = 3
        this.employeeFilter.dropdownReq = this.employeeRequest
        this.employeeFilter.tableReq = this.tableRequest
        this.employeeFilter.cutoffID = this.detailForm.value.cutoffID
        this.employeeFilter.month = this.detailForm.value.month
        this.employeeFilter.year = this.detailForm.value.year
        if (Array.isArray(this.detailForm.value.categoryPayroll)) {
            this.employeeFilter.payrollCategory = this.detailForm.value.categoryPayroll;
        } else {
            this.employeeFilter.payrollCategory = [this.detailForm.value.categoryPayroll];
        }
        this.payrollService.getPGFilter(this.employeeFilter).subscribe({
            next: (value: any) => {
                // this.detailsSource = value.payload.employeeStatus.data
                if (value.payload.employeeStatus && value.payload.employeeStatus.data && value.payload.employeeStatus.data.length > 0) {
                    this.isStatus = true;
                    this.detailsSource = value.payload.employeeStatus.data
                } else {
                    this.isStatus = false;
                    this.detailsSource = []
                }
            },
            error: (e) => {
                console.error(e)
            }
        });
    }

    payroll_yyMMHandler(manual) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentMonthName = monthNames[currentMonth];
        this.detailForm.get('year').setValue(this.year.find(x => x.description === currentYear).id)
        if (this.dropdownOptions.monthlydef) {
            this.detailForm.get('month').setValue(this.dropdownOptions.monthlydef.find(x => x.description === currentMonthName).dropdownID)
        }
        this.cutoffSelectionHandler(manual)
        this.payoutDateHandler()
    }

    payoutDateHandler() {
        var paydate = this.cutoff.find(x => x.id == this.detailForm.value.cutoffID && x.year === this.detailForm.value.year).payoutDate
        this.detailForm.get('payoutDateDisplay').setValue(paydate)
        // this.payrollDescHandler()
    }

    // payrollDescHandler() {
    //     var month = this.dropdownOptions.monthlydef.find(x => x.dropdownID === this.detailForm.value.month).description
    //     var cutoff = this.cutoff.find(x => x.id == this.detailForm.value.cutoffID).description
    //     var description = this.detailForm.value.payrollCode + "_Payroll for " + month + " " + cutoff + ", Payout Date: " + this.detailForm.value.payoutDateDisplay.split("T")[0]
    //     this.detailForm.get('description').setValue(description)
    // }

    selectAllHandler(ev, control, data) {
        var fm = this.detailForm.get(control) as FormControl
        this.isAll = ev._selected
        this.employeeExclude = []
        this.selectedEmloyees = []
        if (ev._selected) {
            var all = data.map(x => x.dropdownID)
            all.push(0)
            fm.setValue(all);
            ev._selected = true;
            this.selectedEmloyees = all
            this.employeeHandler(mode.all)
        }
        if (!ev._selected) {
            fm.setValue([]);
            this.selectedEmloyees = []
            this.employee = []
        }

    }

    getNextBatch() {
        if (!this.complete) {
            this.employeeRequest.search = this.inputChange.value?.toLowerCase()
            this.employeeRequest.start = this.index++
            // this.iseditdd = true
            // this.mode = 3
            console.log("getNextBatch")
            this.isAll = GF.IsEmptyReturn(this.detailForm.value.employee?.some(x => x === 0), false)
            this.employeeHandler(mode.next)
        }
    }

    selectedEvent(id) {
        if (this.selectedEmloyees.some(x => x == id)) {
            this.findIndexNsplice('selectedEmloyees', id)
            // Check if All is true
            if (this.isAll) {
                // Remove zero and deselect 'All' if less than 2 options
                if (this.selectedEmloyees.length < 3) {
                    this.findIndexNsplice('selectedEmloyees', 0)
                    this.allEmployee.deselect()
                }
                this.employeeExclude.push(id);
            }
        } else {
            this.selectedEmloyees.push(id);
            if (this.employeeExclude.some(x => x == id)) {
                this.findIndexNsplice('employeeExclude', id)
            }
        }
    }

    findIndexNsplice(arr, id) {
        var idx = this[arr].findIndex(x => x == id)
        if (idx > -1) { this[arr].splice(idx, 1); }
    }

    employeeChild() {
        // this.mode = 4
        this.employeeHandler(mode.change)
    }

    paginate(array, page_size, page_number) {
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }

    employeeHandler(modee) {
        this.mode = modee;
        this.employeeFilter.type = 2

        // this.employeeFilter.subCompany        = this.detailForm.value.subCompany   == 0 || this.detailForm.value.subCompany    == null ? [] : this.detailForm.value.subCompany
        // this.employeeFilter.branch            = this.detailForm.value.branch       == 0 || this.detailForm.value.branch        == null ? [] : this.detailForm.value.branch
        // this.employeeFilter.employeeCategory  = this.detailForm.value.category     == 0 || this.detailForm.value.category      == null ? [] : this.detailForm.value.category
        // this.employeeFilter.department        = this.detailForm.value.department   == 0 || this.detailForm.value.department    == null ? [] : this.detailForm.value.department
        // this.employeeFilter.confidential      = this.detailForm.value.confidential == 0 || this.detailForm.value.confidential  == null ? [] : this.detailForm.value.confidential

        var hasFilters =
        (this.detailForm.value.subCompany != 0 && this.detailForm.value.subCompany != null) ||
        (this.detailForm.value.branch != 0 && this.detailForm.value.branch != null) ||
        (this.detailForm.value.category != 0 && this.detailForm.value.category != null) ||
        (this.detailForm.value.department != 0 && this.detailForm.value.department != null) ||
        (this.detailForm.value.confidential != 0 && this.detailForm.value.confidential != null) ||
        (this.detailForm.value.status != 0 && this.detailForm.value.status != null);

        if (!hasFilters && !this.iseditdd && modee !== mode.all && modee !== mode.load) {
            this.employee = [];
            return;
        }


        this.employeeFilter.subCompany = this.detailForm.value.subCompany == 0 || this.detailForm.value.subCompany == null ? [] : this.detailForm.value.subCompany
        this.employeeFilter.branch = this.detailForm.value.branch == 0 || this.detailForm.value.branch == null ? [] : this.detailForm.value.branch
        this.employeeFilter.employeeCategory = this.detailForm.value.category == 0 || this.detailForm.value.category == null ? [] : this.detailForm.value.category
        this.employeeFilter.department = this.detailForm.value.department == 0 || this.detailForm.value.department == null ? [] : this.detailForm.value.department
        this.employeeFilter.confidential = this.detailForm.value.confidential == 0 || this.detailForm.value.confidential == null ? [] : this.detailForm.value.confidential
        this.employeeFilter.status = this.detailForm.value.status == 0 || this.detailForm.value.status == null ? [] : this.detailForm.value.status

        if (modee == mode.all) {
            this.employeeRequest.id = []
            this.employeeRequest.start = 0
            this.index = 1
        } else if (modee == mode.change || modee == mode.search) {
            this.employeeRequest.id = []
            this.employeeRequest.start = 0
            this.index = 1

            if (this.iseditdd) {
                this.previousSelection = this.detailForm.get("employee").value;
            }
        }


        if (!GF.IsEmpty(this.inputChange.value)) {
            this.employeeRequest.search = this.inputChange.value.toLowerCase()
            this.employeeRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
        }
        // if (modee == mode.search || modee == mode.change) {
        //     this.employeeRequest.start = 0
        //     this.index = 0
        // }
        if (this.iseditdd && (modee == mode.load || modee == mode.next)) {
            var page = this.employeeRequest.start
            var size = this.employeeRequest.length
            var newFinalEmpList = this.paginate(this.finalEmpList, size, page);
            // console.log(newFinalEmpList)
            this.employeeRequest.id = []
            if (newFinalEmpList.length > 0) {
                newFinalEmpList.forEach(item => {
                    if (!this.employeeRequest.id.some(x => x.dropdownID == item)) {
                        this.employeeRequest.id.push({ dropdownID: item, dropdownTypeID: 0 })
                    }
                });

            } else {
                this.employeeRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
            }
        }

        this.employeeFilter.dropdownReq = this.employeeRequest
        this.employeeFilter.tableReq = this.tableRequest
        this.employeeFilter.payrollType = this.detailForm.value.payoutTypeID
        this.employeeFilter.cutoffID = this.detailForm.value.cutoffID

        this.employeeFilter.payrollCategory = Array.isArray(this.detailForm.value.categoryPayroll) ? this.detailForm.value.categoryPayroll : [this.detailForm.value.categoryPayroll];

        this.employeeFilter.month = this.detailForm.value.month
        this.employeeFilter.year = this.detailForm.value.year
        this.employeeFilter.employee = []

        this.payrollService.getPGFilter(this.employeeFilter).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {

                    // search not include on Complete Checker
                    if (modee !== mode.search) {
                        this.completeChecker(value.payload.employee)
                    }

                    var employeeSort = [];
                    var newEmpoyee = _.uniqBy(value.payload.employee, JSON.stringify)
                    // this.oldemployee = _.uniqBy([...this.oldemployee, ...newEmpoyee], JSON.stringify)

                    if (newEmpoyee.length > 0) {
                        this.oldemployee = _.uniqBy([...this.oldemployee, ...newEmpoyee], JSON.stringify);
                    }

                    // search
                    if (!GF.IsEmpty(this.inputChange.value)) {
                        // if (this.isAll && this.finalEmpList.some(x => x === 0)) {

                        // employeeSort = newEmpoyee

                        if (this.isAll) {
                            if (modee == mode.next) {
                                employeeSort = _.uniqBy([...this.employee, ...newEmpoyee], JSON.stringify);
                            } else {
                                employeeSort = newEmpoyee
                            }

                            var searchlist = _.uniqBy([...this.oldemployee, ...employeeSort], JSON.stringify)
                            var clean = searchlist.filter(x => !this.employeeExclude.includes(x.dropdownID))
                            this.selectedEmloyees = [...clean.map(x => x.dropdownID), ...[0]]
                            this.detailForm.get("employee").setValue([...this.selectedEmloyees, ...[0]]);
                        } else {
                            // employeeSort = newEmpoyee
                            if (modee == mode.next) {
                                employeeSort = _.uniqBy([...this.employee, ...newEmpoyee], JSON.stringify);
                            } else {
                                employeeSort = newEmpoyee
                            }
                        }

                    }else if(modee == mode.all){
                        employeeSort = _.uniqBy([...this.employee, ...newEmpoyee], JSON.stringify);
                    } else if (modee == mode.change) {
                        // this.isAll = false
                        // this.detailForm.get("employee").setValue([])
                        // this.selectedEmloyees = [];
                        // employeeSort = newEmpoyee;

                        if (hasFilters) {
                            this.isAll = false
                            this.detailForm.get("employee").setValue([])
                            this.selectedEmloyees = [];
                            employeeSort = newEmpoyee;
                        } else {
                            // no filters selected, clear employee list
                            employeeSort = [];
                        }

                        // edit mode and changing status, clear previous employee selection
                        if (this.iseditdd && modee == mode.change) {
                            // reset the employee selection to empty
                            this.isAll = false
                            this.detailForm.get("employee").setValue([])
                            this.selectedEmloyees = [];
                        }
                        // inital load
                    } else if (modee == mode.load) {
                        // employeeSort = newEmpoyee
                        if (hasFilters || this.iseditdd) {
                            employeeSort = newEmpoyee;
                        } else {
                            employeeSort = [];
                        }
                        // next batch
                    } else if (modee == mode.search) {
                        // sorting items after clearing search
                        var selected = this.oldemployee.filter(x => this.selectedEmloyees.includes(x.dropdownID))
                        var newSelected = this.employee.filter(x => this.selectedEmloyees.includes(x.dropdownID))
                        var allSelectedEmp = _.uniqBy([...selected, ...newSelected], JSON.stringify)
                        employeeSort = _.uniqBy([...allSelectedEmp, ...newEmpoyee], JSON.stringify)
                    }
                     else {
                        employeeSort = _.uniqBy([...this.employee, ...newEmpoyee], JSON.stringify)
                        if (this.isAll) {
                            var clean = employeeSort.filter(x => !this.employeeExclude.includes(x.dropdownID))
                            this.selectedEmloyees = [...this.selectedEmloyees, ...clean.map(x => x.dropdownID)]
                            this.detailForm.get("employee").setValue([...this.selectedEmloyees, 0]);
                        }
                    }


                    // final load
                    this.employee = employeeSort

                    // This Load & Edit only
                    if (this.iseditdd && modee == mode.load) {
                        if (this.isAll || this.finalEmpList.some(x => x === 0)) {
                            // this.isAll = true;
                            this.selectedEmloyees = [...this.employee.map(x => x.dropdownID), ...[0]]
                            this.detailForm.get("employee").setValue([...this.employee.map(x => x.dropdownID), ...[0]]);
                        } else {
                            this.detailForm.get("employee").setValue(this.finalEmpList);
                        }
                    }
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

    saveDetails() {
        this.headerList = Array.isArray(this.headerList) ? this.headerList : [];
        if (GF.IsEmpty(this.detailForm.value.employee)) {
            this.failedMessage.title = "Failed!"
            this.failedMessage.message = "Please select at least 1 employee"
            this.failedMessage.actions.confirm.label = "Ok"
            this.message.open(this.failedMessage);
            return
        }
        if (this.stepperHide) {
            this.failedMessage.title = 'Payroll was locked on ' + this.lockedDate
            this.failedMessage.message = ""
            this.failedMessage.actions.confirm.label = "Ok"
            this.message.open(this.failedMessage);
            return
        }
        this.detailForm.get('finalList').setValue(this.employeeDetailSource)
        var date = this.pipe.transform(this.detailForm.value.payoutDateDisplay, 'yyyy-MM-ddTHH:mm:ss')
        this.detailForm.get('payoutDateDisplay').setValue(date)
        var dateAsOfDate = this.pipe.transform(this.detailForm.value.asofdate, 'yyyy-MM-ddTHH:mm:ss')
        this.detailForm.get('asofdate').setValue(dateAsOfDate)
        this.detailForm.get('employeeExclude').setValue(this.employeeExclude)
        // this.pgMainRequest()
        if (this.employeeDetailSource.length > 0) {
            this.headerList.forEach(item => {
                if (this.detailForm.controls[item.key]) {
                    this.detailForm.get(item.key).setValue(item.checked);
                }
            });
            this.detailForm.get('basic').setValue(this.headerList.find(item => item.key === 'basicMonth').checked);
            this.detailForm.get('finalList').setValue(this.employeeDetailSource)
            this.detailForm.get('excludedList').setValue(this.excluded)
            this.detailForm.get('selectedList').setValue(this.selected)
        }
        if (this.regularWeeklySource.length > 0) {
            this.headerList.forEach(item => {
                if (this.detailForm.controls[item.key]) {
                    this.detailForm.get(item.key).setValue(item.checked);
                }
            });
            this.detailForm.get('basic').setValue(this.headerList.find(item => item.key === 'basicMonth').checked);
            this.detailForm.get('finalList').setValue(this.regularWeeklySource)
            this.detailForm.get('excludedList').setValue(this.excluded)
            this.detailForm.get('selectedList').setValue(this.selected)
        }
        if (this.specialDetailSource.length > 0) {
            this.headerList.forEach(item => {
                if (this.detailForm.controls[item.key]) {
                    this.detailForm.get(item.key).setValue(item.checked);
                }
            });
            this.detailForm.get('basic').setValue(this.headerList.find(item => item.key === 'basicMonth').checked);
            this.detailForm.get('finalList').setValue(this.specialDetailSource)
            this.detailForm.get('excludedList').setValue(this.excluded)
            this.detailForm.get('selectedList').setValue(this.selected)
        }
        if (this.thirteenmonthDetailSource.length > 0) {
            this.headerList.forEach(item => {
                if (this.detailForm.controls[item.key]) {
                    this.detailForm.get(item.key).setValue(item.checked);
                }
            });

            this.detailForm.get('projectedMonths').setValue(this.headerList.find(item => item.key === 'projectedMonths')?.checked)
            this.detailForm.get('dateFrom').setValue(this.headerList.find(item => item.key === 'dateFrom')?.checked)
            this.detailForm.get('dateTo').setValue(this.headerList.find(item => item.key === 'dateTo')?.checked)

            this.thirteenmonthDetailSource.forEach(item => {
                if (item.dateFrom) {
                    item.dateFrom = this.datePipe.transform(item.dateFrom, 'yyyy-MM-dd');
                }
                if (item.dateTo) {
                    item.dateTo = this.datePipe.transform(item.dateTo, 'yyyy-MM-dd');
                }
            });

            this.detailForm.get('finalList').setValue(this.thirteenmonthDetailSource)
            this.detailForm.get('excludedList').setValue(this.excluded)
            this.detailForm.get('selectedList').setValue(this.selected)
        }
        if (this.maternityDetailSource.length > 0) {
            this.headerList.forEach(item => {
                if (this.detailForm.controls[item.key]) {
                    this.detailForm.get(item.key).setValue(item.checked);
                }
            });
            this.detailForm.get('days').setValue(this.headerList.find(item => item.key === 'days').checked);
            this.detailForm.get('dailyRate').setValue(this.headerList.find(item => item.key === 'dailyRate').checked);
            this.detailForm.get('finalList').setValue(this.maternityDetailSource)
            this.detailForm.get('excludedList').setValue(this.excluded)
            this.detailForm.get('selectedList').setValue(this.selected)
        }
        if (this.detailForm.value.categoryPayroll !== null) {
            if (Array.isArray(this.detailForm.value.categoryPayroll)) {
                this.employeeFilter.payrollCategory = this.detailForm.value.categoryPayroll;
            } else {
                this.detailForm.value.categoryPayroll = [this.detailForm.value.categoryPayroll];
            }
        }
        this.payrollService.postPGMain(this.detailForm.value).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.payrollId = value.payload.id
                    this.encryptId = value.payload.encryptID
                    this.detailForm.get("id").setValue(value.payload.id);
                    this.detailForm.get("payrollCode").setValue(value.payload.payrollCode);
                    this.successMessage.title = "Success!"
                    this.successMessage.message = "Transaction has been Saved!"
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);

                }
                else {
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Transaction Failed!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                }
            },
            error: (e) => {
                this.failedMessage.title = "Failed!"
                this.failedMessage.message = "Transaction Failed!"
                this.failedMessage.actions.confirm.label = "Ok"
                this.message.open(this.failedMessage);
            }
        });
    }
    tkSystemGenDD(bool) {
        if (this.selectedIndex === 1) {
            this.isadj = bool //// to determine which category on tk
            this.isview = false /// to view the uploaded files if true it will view the list
            var control: string
            if (!this.isadj) {
                this.timekeepingForm.value.timekeepingType === 12686 ? control = "system" :
                    // this.timekeepingForm.value.timekeepingType === 12703 || this.timekeepingForm.value.timekeepingType === 12704 ? control = "utkT" : ""
                    this.timekeepingForm.value.timekeepingType === 12703 || this.timekeepingForm.value.timekeepingType === 12704 ? control = "utkT" :
                        this.timekeepingForm.value.timekeepingType === 31202 ? control = "utkS" : ""
                this.dropdowntypeid = this.timekeepingForm.value.timekeepingType
                this.timekeepingSource = [] ///refresh table list view every changes on dropdown
                this.tkUpload = []
                this.sysTKUpload = []
                this.sysUpload = []
            } else {
                this.timekeepingForm.value.timekeepingAdjustment === 12686 ? control = "systemAB" :
                    this.timekeepingForm.value.timekeepingAdjustment === 12703 || this.timekeepingForm.value.timekeepingAdjustment === 12704 ? control = "utkA" : ""
                this.dropdowntypeid = this.timekeepingForm.value.timekeepingAdjustment
                this.timekeepingABSource = [] ///refresh table list view every changes on dropdown
                this.sysAUpload = []
            }
            this.uploadTables(control, true, this.tableRequest)
            if (this.timekeepingForm.value.timekeepingType === 12686) {
                var year = this.detailForm.value.year
                var month = this.detailForm.value.month
                var cutoffid = this.cutoff.find(x => x.id == this.detailForm.value.cutoffID && x.year === year && x.sample === month)?.cutoff
                cutoffid = GF.IsEmptyReturn(cutoffid, 30579)
                var sliced = JSON.parse(JSON.stringify(this.dropdownRequest));
                sliced.id = []
                this.fileService.getTKCodeDropdown(sliced, year, month, cutoffid).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.code = value.payload
                        }
                    },
                });
            }
        }
    }



    //////////Timekeeping Type////////////

    uploadFileTk(event, id, control, bool) {
        if (!GF.IsEmpty(this.TkSource)) {
            this.TkSource = []
        }
        if (!GF.IsEmpty(this.TkABSource)) {
            this.TkABSource = []
        }
        this.isadj = bool
        this.tkHascontrol = true
        let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
        var fileName = event.target.files[0].name;
        this.fileName = fileName.slice(0, fileName.lastIndexOf('.'));
        this.payrollTypeId = this.detailForm.value.payoutTypeID
        element.setAttribute('value', fileName)
        this.files = event.target.files;
        switch (control) {
            case 'tkt':
                this.TkSource = [...this.TkSource, ...[]]
                break;
            case 'tka':
                this.TkABSource = [...this.TkABSource, ...[]]
                break;
        }

        for (var i = 0; i < event.target.files.length; i++) {

            switch (control) {
                case 'tkt':
                    this.TkSource.push({ id: i, checkbox: false, file: event.target.files[i] }); ///multiple upload
                    this.buttonDisabled = true
                    break;
                case 'tka':
                    this.TkABSource.push({ id: i, checkbox: false, file: event.target.files[i] }); ///multiple upload
                    this.buttonDisabled = true
                    // this.EarnABSource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    break;
            }
        }

        if (this.timekeepingForm.value.timekeepingType) {
            this.dropdowntypeid = this.timekeepingForm.value.timekeepingType
        }
        if (this.timekeepingForm.value.timekeepingAdjustment) {
            this.dropdowntypeid = this.timekeepingForm.value.timekeepingAdjustment
        }
        var payrollcode = this.detailForm.value.payrollCode

        var done = this.fileService.postUploadHandler(this.dropdowntypeid, this.files, this.fileName, this.isSave, this.uploadid, this.payrollTypeId, payrollcode, this.isadj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {

                    this.loading = true
                    this.buttonDisabled = false
                    // this.saving = false
                    this.uploadFilev2Tk(event.target.files[0], event.target.files[0].name, control)
                    this.successMessage.title = "Success!"
                    this.successMessage.message = "You can now view and save your file."
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                    this.uploadid = value.message

                    this.uploadView("upload", control)

                } else {
                    this.loading = true
                    this.saving = true
                    this.buttonDisabled = false
                    if (!GF.IsEmpty(this.TkSource)) {
                        this.TkSource = []
                    }
                    if (!GF.IsEmpty(this.TkABSource)) {
                        this.TkABSource = []
                    }
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Incorrect TK file format!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                }
            }
        });
        this.loading = false
    }

    uploadFilev2Tk(fileToUpload, filename, control) {
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(fileToUpload);
        reader.onload = (e: any) => {
            /* create workbook */
            const binarystr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary', cellDates: true, dateNF: 'yyyy-mm-dd' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { raw: false, defval: "" }); // to get 2d array pass 2nd parameter as object {header: 1}
            var transformPayreg = data.map(data => {
                // return { ...data, payoutDate: date, cutoffStart: cutoffS, cutoffEnd: cutoffE };
            });
            switch (control) {
                case 'tkt':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.tkList = [...data, ...this.tkList]
                    break;
                case 'tka':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.tkListAB = [...data, ...this.tkListAB]
                    break;
            }
        }
    }

    checkersTk(control) {
        control = this.timekeepingForm.value.timekeepingType == 12686 ? "system" : control
        switch (control) {
            case 'tkt':
                if (this.checkedListTk.length == 0) {
                    this.timekeepingSource = []
                    this.timekeepingForm.get('attendance').setValue(null)
                    this.timekeepingForm.get('timekeeping').setValue(2)
                    this.checkedListTkAB = []
                    return
                }
                this.timekeepingSource = this.data
                this.resetTk('tkt')
                break;
            case 'utkT':
                if (this.checkTableT.length == 0) {
                    this.tkUpload = []
                    return
                }
                this.uploadid = this.TKTableSource.find(x => x.id == this.checkTableT[0]).file.uploadID
                this.uploadTables('utkT', false, this.tableRequest)
                break;
            case 'utkS':
                if (this.checkTableTS.length == 0) {
                    this.sysTKUpload = []
                    return
                }
                this.uploadid = this.SysTKTableSource.find(x => x.id == this.checkTableTS[0]).file.uploadID
                this.uploadTables('utkS', false, this.tableRequest)
                break;
            case 'tka':
                if (this.checkedListTkAB.length == 0) {
                    this.timekeepingABSource = []
                    return
                }
                this.timekeepingABSource = this.data
                this.timekeepingForm.get('timekeeping').setValue(null)
                this.timekeepingForm.get('attendance').setValue(2)
                this.checkedListTk = []

                this.resetTk('tka')
                break;
            case 'utkA':
                if (this.checkTableTAB.length == 0) {
                    this.timekeepingABSource = []
                    return
                }
                this.uploadid = this.TKATableSource.find(x => x.id == this.checkTableTAB[0]).file.uploadID
                this.uploadTables('utkA', false, this.tableRequest)
                break;
            case 'system':
                if (this.checkTableS.length == 0) {
                    this.sysUpload = []
                    return
                }
                this.uploadid = this.SysTableSource.find(x => x.id == this.checkTableS[0]).file.uploadID
                this.uploadTables('system', false, this.tableRequest)
                break;
        }
    }



    switchTk(control) {
        switch (control) {

            case 'tkt':
                var sliced = JSON.parse(JSON.stringify(this.timekeepingSource));
                switch (this.timekeepingForm.value.timekeeping) {
                    case 1:
                        this.timekeepingSource = sliced
                        break;
                    case 2:
                        const sum = {};
                        sliced.forEach((earning) => {
                            const num = parseInt(earning.earningsAmount);
                            if (!isNaN[num]) {
                                const key = earning.employeeCode;
                                if (!sum[key]) {
                                    earning.earningsAmount = num
                                    sum[key] = earning;
                                } else {
                                    sum[key].earningsAmount += num;
                                }
                            }
                        });
                        const result = Object.keys(sum).map((key) => sum[key]);
                        this.timekeepingSource = result
                        break;
                    default:
                        this.timekeepingSource = sliced
                        break;
                }
                break;

            case 'tka':
                var sliced = JSON.parse(JSON.stringify(this.timekeepingABSource));
                switch (this.timekeepingForm.value.attendance) {
                    case 1:
                        this.timekeepingABSource = sliced
                        break;
                    case 2:
                        const sum = {};
                        sliced.forEach((earning) => {
                            const num = parseInt(earning.earningsAmount);
                            if (!isNaN[num]) {
                                const key = earning.employeeCode;
                                if (!sum[key]) {
                                    earning.earningsAmount = num
                                    sum[key] = earning;
                                } else {
                                    sum[key].earningsAmount += num;
                                }
                            }
                        });
                        const result = Object.keys(sum).map((key) => sum[key]);
                        this.timekeepingABSource = result
                        break;
                    default:
                        this.timekeepingABSource = sliced
                        break;
                }
                break;
        }
    }

    resetTk(filter) {
        // var earning = this.earningSource
        switch (filter) {
            case 'tkt':
                this.timekeepingForm.controls.timekeeping.valueChanges.subscribe(value => {
                    if (value && this.timekeepingForm.controls.attendance.value) {
                        this.timekeepingForm.controls.attendance.setValue(0)
                        this.timekeepingSource;
                    }
                })
                break;
            case 'tka':
                this.timekeepingForm.controls.attendance.valueChanges.subscribe(value => {
                    if (value && this.timekeepingForm.controls.timekeeping.value) {
                        this.timekeepingForm.controls.timekeeping.setValue(0)
                        this.timekeepingABSource;
                    }
                })
                break;
        }
    }


    //////////Earning Type////////////

    uploadFileEarn(event, id, control) {
        this.EarnSource = []
        let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
        var fileName = event.target.files[0].name;
        this.fileName = fileName.slice(0, fileName.lastIndexOf('.'));
        this.payrollTypeId = this.detailForm.value.payoutTypeID
        element.setAttribute('value', fileName)
        this.files = event.target.files;
        switch (control) {
            case 'eT':
                this.EarnSource = [...this.EarnSource, ...[]]
                break;
            case 'eTAB':
                this.EarnABSource = [...this.EarnABSource, ...[]]
                break;
            case 'eE':
                this.EarnESource = [...this.EarnESource, ...[]]
                break;
        }


        for (var i = 0; i < event.target.files.length; i++) {

            switch (control) {
                case 'eT':
                    this.EarnSource.push({ id: [i], checkbox: false, file: event.target.files[i] }); ///multiple upload
                    this.buttonDisabled = true
                    // this.EarnSource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    break;
                case 'eTAB':
                    this.EarnABSource.push({ id: [i], checkbox: false, file: event.target.files[i] }); ///multiple upload
                    this.buttonDisabled = true
                    // this.EarnABSource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    break;
                case 'eE':
                    this.EarnESource.push({ id: [i], checkbox: false, file: event.target.files[i] }); ///multiple upload
                    this.buttonDisabled = true
                    // this.EarnESource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    break;
            }
        }

        this.fileService.postUploadHandler(this.dropdowntypeid, this.files, this.fileName, this.isSave, this.uploadid, this.payrollTypeId, this.detailForm.value.payrollCode, this.isadj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.loading = true
                    this.buttonDisabled = false
                    this.uploadFilev2Earn(event.target.files[0], event.target.files[0].name, control)
                    this.successMessage.title = "Success!"
                    this.successMessage.message = "You can now view and save your file."
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                    this.uploadid = value.message
                    this.uploadView("upload", control)

                } else {
                    this.loading = true
                    this.saving = true
                    this.buttonDisabled = false
                    this.EarnSource = []
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Incorrect Earnings file format!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);

                }
            }
        });
        this.loading = false

    }

    uploadFilev2Earn(fileToUpload, filename, control) {
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(fileToUpload);
        reader.onload = (e: any) => {
            /* create workbook */
            const binarystr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary', cellDates: true, dateNF: 'yyyy-mm-dd' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { raw: false, defval: "" }); // to get 2d array pass 2nd parameter as object {header: 1}

            switch (control) {
                case 'eT':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.earningList = [...data, ...this.earningList]
                    break;
                case 'eTAB':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.earningListAB = [...data, ...this.earningListAB]
                    break;
                case 'eE':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.earningEList = [...data, ...this.earningEList]
                    break;
            }
        }
    }

    checkersEarn(control) {
        switch (control) {
            case 'eT':
                if (this.checkedList.length == 0) {
                    this.earningSource = []
                    return
                }
                this.earningSource = this.data
                this.resetEarn('earn')
                break;
            case 'eTAB':
                if (this.checkedListEarnAB.length == 0) {
                    this.earningABSource = []
                    return
                }
                this.earningABSource = this.data
                this.resetEarn('attendance')
                break;
            case 'eE':
                if (this.checkedListEarn.length == 0) {
                    this.earningESource = []
                    return
                }
                this.earningESource = this.data
                break;
            case 'ueT':
                if (this.checkTableE.length == 0) {
                    this.earningUpload = []
                    return
                }
                this.uploadid = this.EarnTableSource.find(x => x.id == this.checkTableE[0]).file.uploadID
                this.uploadTables('ueT', false, this.tableRequest)
                break;
                break;
        }
        this.switchEarn(control)
    }

    uploadView(ee, control) {
        this.fileService.getUploadHandlerView(this.dropdowntypeid, 0, this.request, this.uploadid, this.isadj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.totalRows = value.payload.totalRows
                    this.tableRequest.Order = 'errorLogs'
                    this.errorLogs = value.payload.isError
                    switch (this.dropdowntypeid) {
                        case 12704:
                            if (this.errorLogs === true) {
                                this.columnHideT = true
                            } else {
                                this.columnHideT = false
                            }
                            break;
                        case 12703:
                            if (this.errorLogs === true) {
                                this.columnHideT = true
                            } else {
                                this.columnHideT = false
                            }
                            break;
                        case 12686:
                            if (this.errorLogs === true) {
                                this.columnHideT = true
                            } else {
                                this.columnHideT = false
                            }
                            break;
                        case 31202:
                            if (this.errorLogs === true) {
                                this.columnHideT = true
                            } else {
                                this.columnHideT = false
                            }
                            break;
                        case 22862:
                            if (this.errorLogs === true) {
                                this.columnHideE = true
                            } else {
                                this.columnHideE = false
                            }
                            break;
                        case 22863:
                            if (this.errorLogs === true) {
                                this.columnHideD = true
                            } else {
                                this.columnHideD = false
                            }
                            break;
                        case 30002:
                            if (this.errorLogs === true) {
                                this.columnHideL = true
                            } else {
                                this.columnHideL = false
                            }
                            break;
                        case 30610:
                            if (this.errorLogs === true) {
                                this.columnHideG = true
                            } else {
                                this.columnHideG = false
                            }
                            break;
                    }
                    if (ee == "next") {
                        switch (control) {
                            case 'utkT':
                                this.timekeepingSource = value.payload.data
                                break;
                            case 'tkt':
                                this.timekeepingSource = value.payload.data
                                break;
                            case 'tka':
                                this.timekeepingABSource = value.payload.data
                                break;
                            case 'eT':
                                this.earningSource = value.payload.data
                                break;
                            case 'eTAB':
                                this.earningABSource = value.payload.data
                                break;
                            case 'ueT':
                                this.earningUpload = value.payload.data
                                break;
                            case 'eE':
                                this.earningESource = value.payload.data
                                break;
                            case 'dT':
                                this.deductionSource = value.payload.data
                                break;
                            case 'dTAB':
                                this.deductionABSource = value.payload.data
                                break;
                            case 'dE':
                                this.deductionESource = value.payload.data
                                break;
                            case 'udT':
                                this.deductionUpload = value.payload.data
                                break;
                            case 'lT':
                                this.loanSource = value.payload.data
                                break;
                            case 'lTAB':
                                this.loanABSource = value.payload.data
                                break;
                            case 'lE':
                                this.loanESource = value.payload.data
                                break;
                            case 'ugT':
                                this.govconSource = value.payload.data
                                break;
                        }
                    } else {
                        this.data = value.payload.data
                    }
                }
            }
        });
    }

    nextPage(e, control, page, uploaded) {
        this.localcontrol = control
        this.tableRequest
        this.request = e
        if (control === 'gp') {

            this.tableRequest = e
            this.loadTables(page)
            return
        }
        // if(control === 'gc'){
        //     this.gcView()
        //     return
        // }
        if (control === 'details') {
            this.tableRequest = e
            this.finalFilter = true
            this.finalList()
            return
        }
        if (control === 'bank') {
            this.tableRequest.Start = e.Start
            this.loadBankTable(false)
            return
        }
        if (uploaded === true) {
            this.uploadTables(control, false, e)
        }
        if (uploaded === false) {
            this.uploadView("next", control)
        }

    }

    switchEarn(control) {
        switch (control) {
            case 'eT':
                var sliced = JSON.parse(JSON.stringify(this.earningSource));
                switch (this.earningForm.value.earning) {
                    case 1:
                        this.earningSource = sliced
                        break;
                    case 2:
                        const sum = {};
                        sliced.forEach((earning) => {
                            const num = parseInt(earning.earningsAmount);
                            if (!isNaN[num]) {
                                const key = earning.employeeName;
                                if (!sum[key]) {
                                    earning.earningsAmount = num
                                    sum[key] = earning;
                                } else {
                                    sum[key].earningsAmount += num;
                                }
                            }
                        });
                        const result = Object.keys(sum).map((key) => sum[key]);
                        this.earningSource = result
                        break;
                    default:
                        this.earningSource = sliced
                        break;
                }
                break;
            case 'eTAB':
                var sliced = JSON.parse(JSON.stringify(this.earningABSource));
                switch (this.earningForm.value.attendance) {
                    case 1:
                        this.earningABSource = sliced
                        break;
                    case 2:
                        const sum = {};
                        sliced.forEach((earning) => {
                            const num = parseInt(earning.earningsAmount);
                            if (!isNaN[num]) {
                                const key = earning.employeeName;
                                if (!sum[key]) {
                                    earning.earningsAmount = num
                                    sum[key] = earning;
                                } else {
                                    sum[key].earningsAmount += num;
                                }
                            }
                        });
                        const result = Object.keys(sum).map((key) => sum[key]);
                        this.earningABSource = result
                        break;
                    default:
                        this.earningABSource = sliced
                        break;
                }
                break;
            case 'ueT':
                this.earningUpload
                break;
        }
    }

    resetEarn(filter) {
        // var earning = this.earningSource
        switch (filter) {
            case 'earn':
                this.earningForm.controls.earning.valueChanges.subscribe(value => {
                    if (value && this.earningForm.controls.attendance.value) {
                        this.earningForm.controls.attendance.setValue(0)
                        this.earningSource;
                    }
                })
                break;
            case 'attendance':
                this.earningForm.controls.attendance.valueChanges.subscribe(value => {
                    if (value && this.earningForm.controls.earning.value) {
                        this.earningForm.controls.earning.setValue(0)
                        this.earningABSource
                    }
                })
                break;

        }

    }

    checkControl(control, equal: string[]) {
        return equal.includes(control)
    }

    Save(type, control) {
        var payrollcode = this.detailForm.value.payrollCode
        //timekeeping
        // var isTKSystemCondition = this.timekeepingForm.value.timekeepingType === 12686 || this.timekeepingForm.value.timekeepingType === 12703 || this.timekeepingForm.value.timekeepingType === 12704 ||
        var isTKSystemCondition = this.timekeepingForm.value.timekeepingType === 12686 || this.timekeepingForm.value.timekeepingType === 12703 || this.timekeepingForm.value.timekeepingType === 12704 || this.timekeepingForm.value.timekeepingType === 31202
        this.timekeepingForm.value.timekeepingAdjustment === 12686 || this.timekeepingForm.value.timekeepingAdjustment === 12703 || this.timekeepingForm.value.timekeepingAdjustment === 12704;
        var isTKsystem = this.checkControl(control, ['tk', 'tka', 'system']) ? isTKSystemCondition : false;
        this.isSave = isTKsystem ? 1 : this.errorLogs === false ? 1 : 0
        //loans
        var loanAdj = this.checkControl(control, ['loans']) && this.loanForm.value.loanType === 4
        this.isSave = (isTKsystem || loanAdj) ? 1 : this.errorLogs === false ? 1 : 0

        if (GF.IsEmpty(this.files) && !isTKsystem) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = "No file uploaded."
            this.message.open(this.failedMessage);
            return
        }

        if (this.isSave === 1) {
            this.savedMessage.message = "Are you sure you want to save?"
            const dialogRef = this.message.open(this.savedMessage);
            dialogRef.afterClosed().subscribe((result) => {
                if (result === "confirmed") {
                    (type === 'second' || loanAdj) ? this.isadj = true : this.isadj = false

                    if (control == "tk" || control == "tka" || control == "system") {
                        this.timekeepingForm.value.timekeepingType === 12686 ? this.uploadid = this.timekeepingForm.value.timekeepingAttendance :
                            this.timekeepingForm.value.timekeepingAdjustment === 12686 ? this.uploadid = this.timekeepingForm.value.timekeepingCode : 0
                    }


                    this.fileService.postUploadHandler(this.dropdowntypeid, this.files, this.fileName, this.isSave, this.uploadid, this.payrollTypeId, payrollcode, this.isadj).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                debugger
                                this.saving = true
                                this.buttonDisabled = false
                                this.successMessage.title = "Success!"
                                this.successMessage.message = "File was saved successfully"
                                this.successMessage.actions.confirm.label = "Ok"
                                this.message.open(this.successMessage);

                                if (this.isSave === 1 && this.uploadid !== "0") {
                                    debugger
                                    this.errorLogs = true
                                    this.uploadid = "0"
                                    this.isSave = 0
                                }
                            } else {
                                this.failedMessage.title = "Failed!"
                                this.failedMessage.message = "Transaction Failed!"
                                this.failedMessage.actions.confirm.label = "Ok"
                                this.message.open(this.failedMessage);
                                this.saving = true
                            }
                        },
                        complete: () => {
                            switch (control) {
                                case 'tk':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.timekeepingSource = []
                                    // let ctr = this.timekeepingForm.value.timekeepingType === 12686 ? 'system' : 'utkT';
                                    let ctr = this.timekeepingForm.value.timekeepingType === 12686 ? 'system' : this.timekeepingForm.value.timekeepingType === 31202 ? 'utkS' : 'utkT';
                                    this.uploadTables(ctr, true, '')
                                    this.TkSource = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'tka':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.timekeepingABSource = []
                                    this.uploadTables('utkA', true, '')
                                    this.TkABSource = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'earnings':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.earningSource = []
                                    this.earnDelete = true
                                    this.uploadTables('ueT', true, '')
                                    this.EarnSource = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'deduction':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.deductionSource = []
                                    this.deductionDelete = true
                                    this.uploadTables('udT', true, '')
                                    this.DeductionSource = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'loans':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.loanSource = []
                                    this.loanDelete = true
                                    this.uploadTables('ulT', true, '')
                                    this.LoanSource = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'govcon':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.govconSource = []
                                    this.govtDelete = true
                                    this.uploadTables('ugT', true, '')
                                    this.GovtSource = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'system':
                                    this.uploadTables('system', false, this.tableRequest)
                                    this.cdr.detectChanges()
                                    break;
                            }

                        },
                    });


                    this.saving = false
                    this.buttonDisabled = true
                }
            })
        }
        else {
            if (this.isSave === 0) {
                this.failedMessage.title = "Failed! Check Error Logs"
                this.failedMessage.message = "Invalid data is present, Please review and resubmit."
                this.failedMessage.actions.confirm.label = "Ok"
                this.message.open(this.failedMessage);
            }
        }
    }

    //////////Deduction Type////////////

    uploadFileDeduc(event, id, control) {
        this.DeductionSource = []
        let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
        var fileName = event.target.files[0].name;
        this.fileName = fileName.slice(0, fileName.lastIndexOf('.'));
        this.payrollTypeId = this.detailForm.value.payoutTypeID
        element.setAttribute('value', fileName)
        this.files = event.target.files;
        switch (control) {
            case 'dT':
                this.DeductionSource = [...this.DeductionSource, ...[]]
                break;
            case 'dTAB':
                this.DeductionABSource = [...this.DeductionABSource, ...[]]
                break;
            case 'dE':
                this.DeductionESource = [...this.DeductionESource, ...[]]
                break;
        }

        if (this.deductionForm.value.deductionABType === 2) {
            this.isadj = true
        }
        var payrollcode = this.detailForm.value.payrollCode

        for (var i = 0; i < event.target.files.length; i++) {

            switch (control) {
                case 'dT':
                    this.DeductionSource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    this.buttonDisabled = true
                    break;
                case 'dTAB':
                    this.DeductionABSource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    this.buttonDisabled = true
                    break;
                case 'dE':
                    this.DeductionESource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    this.buttonDisabled = true
                    break;
            }
        }

        this.fileService.postUploadHandler(this.dropdowntypeid, this.files, this.fileName, this.isSave, this.uploadid, this.payrollTypeId, payrollcode, this.isadj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.loading = true
                    this.buttonDisabled = false
                    this.uploadFilev2Earn(event.target.files[0], event.target.files[0].name, control)
                    this.successMessage.title = "Success!"
                    this.successMessage.message = "You can now view and save your file."
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                    var id = 0
                    this.uploadid = value.message

                    //// VIEWING METHOD
                    this.uploadView("upload", control)

                } else {
                    this.loading = true
                    this.saving = true
                    this.buttonDisabled = false
                    this.DeductionSource = []
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Incorrect deduction file format!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                }
            }
        });
        this.loading = false
    }

    uploadFilev2Deduc(fileToUpload, filename, control) {
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(fileToUpload);
        reader.onload = (e: any) => {
            /* create workbook */
            const binarystr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary', cellDates: true, dateNF: 'yyyy-mm-dd' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { raw: false, defval: "" }); // to get 2d array pass 2nd parameter as object {header: 1}

            switch (control) {
                case 'dT':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.deductionList = [...data, ...this.deductionList]
                    break;
                case 'dTAB':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.deductionListAB = [...data, ...this.deductionListAB]
                    break;
                case 'dE':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.deductionEList = [...data, ...this.deductionEList]
                    break;
            }
        }
    }

    checkersDeduc(control) {
        switch (control) {
            case 'dT':

                if (this.checkedListDeduc.length == 0) {
                    this.deductionSource = []
                    return
                }
                this.deductionSource = this.data
                this.resetDeduc('deduction')
                break;
            case 'dTAB':
                if (this.checkedListDeducAB.length == 0) {
                    this.deductionABSource = []
                    return
                }
                this.deductionABSource = this.data
                this.resetDeduc('attendance')
                break;
            case 'dE':
                if (this.checkedListDeducE.length == 0) {
                    this.deductionESource = []
                    return
                }
                this.deductionESource = this.data
                break;
            case 'udT':
                if (this.checkTableD.length == 0) {
                    this.DeductionSource = []
                    this.deductionUpload = []
                    return
                }
                this.uploadid = this.DeductionTableSource.find(x => x.id == this.checkTableD[0]).file.uploadID
                this.uploadTables('udT', false, this.tableRequest)
                break;
        }
    }

    switchDeduc(control) {
        switch (control) {

            case 'dT':
                var sliced = JSON.parse(JSON.stringify(this.deductionSource));
                switch (this.deductionForm.value.deduction) {
                    case 1:
                        this.deductionSource = sliced
                        break;
                    case 2:
                        const sum = {};
                        sliced.forEach((earning) => {
                            const num = parseInt(earning.deductionsAmount);
                            if (!isNaN[num]) {
                                const key = earning.employeeCode;
                                if (!sum[key]) {
                                    earning.deductionsAmount = num
                                    sum[key] = earning;
                                } else {
                                    sum[key].deductionsAmount += num;
                                }
                            }
                        });
                        const result = Object.keys(sum).map((key) => sum[key]);
                        this.deductionSource = result
                        break;
                    default:
                        this.deductionSource = sliced
                        break;
                }
                break;
            case 'dTAB':
                var sliced = JSON.parse(JSON.stringify(this.deductionABSource));
                switch (this.deductionForm.value.attendance) {
                    case 1:
                        this.deductionABSource = sliced
                        break;
                    case 2:
                        const sum = {};
                        sliced.forEach((earning) => {
                            const num = parseInt(earning.deductionsAmount);
                            if (!isNaN[num]) {
                                const key = earning.employeeCode;
                                if (!sum[key]) {
                                    earning.deductionsAmount = num
                                    sum[key] = earning;
                                } else {
                                    sum[key].deductionsAmount += num;
                                }
                            }
                        });
                        const result = Object.keys(sum).map((key) => sum[key]);
                        this.deductionABSource = result
                        break;
                    default:
                        this.deductionABSource = sliced
                        break;
                }
                break;
        }
    }

    resetDeduc(filter) {
        switch (filter) {
            case 'deduction':
                this.deductionForm.controls.deduction.valueChanges.subscribe(value => {
                    if (value && this.deductionForm.controls.attendance.value) {
                        this.deductionForm.controls.attendance.setValue(0)
                        this.deductionSource;
                    }
                })
                break;
            case 'attendance':
                this.deductionForm.controls.attendance.valueChanges.subscribe(value => {
                    if (value && this.deductionForm.controls.deduction.value) {
                        this.deductionForm.controls.deduction.setValue(0)
                        this.deductionABSource
                    }
                })
                break;

        }
    }

    //////////Loan Type////////////

    uploadFileLoan(event, id, control) {
        this.LoanSource = []
        let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
        var fileName = event.target.files[0].name;
        this.fileName = fileName.slice(0, fileName.lastIndexOf('.'));
        this.payrollTypeId = this.detailForm.value.payoutTypeID
        element.setAttribute('value', fileName)
        this.files = event.target.files;
        switch (control) {
            case 'lT':
                this.LoanSource = [...this.LoanSource, ...[]]
                break;
            case 'lTAB':
                this.LoanABSource = [...this.LoanABSource, ...[]]
                break;
            case 'lE':
                this.LoanESource = [...this.LoanESource, ...[]]
                break;
        }

        var payrollcode = this.detailForm.value.payrollCode

        for (var i = 0; i < event.target.files.length; i++) {

            switch (control) {
                case 'lT':
                    this.LoanSource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    this.buttonDisabled = true
                    break;
                case 'lTAB':
                    this.LoanABSource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    this.buttonDisabled = true
                    break;
                case 'lE':
                    this.LoanESource.push({ id: 0, checkbox: false, file: event.target.files[0] });
                    this.buttonDisabled = true
                    break;
            }
        }

        this.fileService.postUploadHandler(this.dropdowntypeid, this.files, this.fileName, this.isSave, this.uploadid, this.payrollTypeId, payrollcode, this.isadj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.loading = true
                    this.buttonDisabled = false
                    this.uploadFilev2Earn(event.target.files[0], event.target.files[0].name, control)
                    this.successMessage.title = "Success!"
                    this.successMessage.message = "You can now view and save your file."
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                    var id = 0
                    this.uploadid = value.message

                    //// VIEWING METHOD
                    this.uploadView("upload", control)

                } else {
                    this.loading = true
                    this.saving = true
                    this.buttonDisabled = false
                    this.LoanSource = []
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Incorrect loans file format!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                    this.loading = false

                }
            }
        });
        this.loading = false
    }

    uploadFilev2Loan(fileToUpload, filename, control) {
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(fileToUpload);
        reader.onload = (e: any) => {
            /* create workbook */
            const binarystr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary', cellDates: true, dateNF: 'yyyy-mm-dd' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { raw: false, defval: "" }); // to get 2d array pass 2nd parameter as object {header: 1}

            switch (control) {
                case 'lT':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.loanList = [...data, ...this.loanList]
                    break;
                case 'lTAB':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.loanListAB = [...data, ...this.loanListAB]
                    break;
                case 'lE':
                    data.forEach(item => {
                        item["filename"] = filename
                    });
                    this.loanEList = [...data, ...this.loanEList]
                    break;
            }
        }
    }

    checkersLoan(control) {
        switch (control) {
            case 'lT':
                if (this.checkedListLoan.length == 0) {
                    this.loanSource = []
                    return
                }
                this.loanSource = this.data
                this.resetLoan('loans')
                break;
            case 'lTAB':
                if (this.checkedListLoanAB.length == 0) {
                    this.loanABSource = []
                    return
                }
                this.loanABSource = this.data
                this.resetLoan('attendance')
                break;
            case 'lE':
                if (this.checkedListLoanE.length == 0) {
                    this.loanESource = []
                    return
                }
                this.loanESource = this.data
                break;
            case 'ulT':
                if (this.checkTableL.length == 0) {
                    this.LoanSource = []
                    this.loanUpload = []
                    return
                }
                this.uploadid = this.LoanTableSource.find(x => x.id == this.checkTableL[0]).file.uploadID
                this.uploadTables('ulT', false, this.tableRequest)
                break;
        }
    }

    switchLoan(control) {
        switch (control) {
            case 'lT':
                var sliced = JSON.parse(JSON.stringify(this.loanSource));
                switch (this.loanForm.value.loan) {
                    case 1:
                        this.loanSource = sliced
                        break;
                    case 2:
                        const sum = {};
                        sliced.forEach((earning) => {
                            const num = parseInt(earning.amortizationAmount);
                            const num1 = parseInt(earning.totalPayments);
                            const num2 = parseInt(earning.withInterest);
                            const num3 = parseInt(earning.principalAmount);
                            if (!isNaN[num && num1 && num2 && num3]) {
                                const key = earning.employeeCode;
                                if (!sum[key]) {
                                    earning.amortizationAmount = num
                                    earning.totalPayments = num1
                                    earning.withInterest = num2
                                    earning.principalAmount = num3
                                    sum[key] = earning;
                                } else {
                                    sum[key].amortizationAmount += num;
                                    sum[key].totalPayments += num1;
                                    sum[key].withInterest += num2;
                                    sum[key].principalAmount += num3;

                                }
                            }
                        });
                        const result = Object.keys(sum).map((key) => sum[key]);
                        this.loanSource = result
                        break;
                    default:
                        this.loanSource = sliced
                        break;
                }
                break;
            case 'lTAB':
                var sliced = JSON.parse(JSON.stringify(this.loanABSource));
                switch (this.loanForm.value.attendance) {
                    case 1:
                        this.loanABSource = sliced
                        break;
                    case 2:
                        const sum = {};
                        sliced.forEach((earning) => {
                            const num = parseInt(earning.amortizationAmount);
                            if (!isNaN[num]) {
                                const key = earning.employeeCode;
                                if (!sum[key]) {
                                    earning.amortizationAmount = num
                                    sum[key] = earning;
                                } else {
                                    sum[key].amortizationAmount += num;
                                }
                            }
                        });
                        const result = Object.keys(sum).map((key) => sum[key]);
                        this.loanABSource = result
                        break;
                    default:
                        this.loanABSource = sliced
                        break;
                }
                break;
        }
    }

    resetLoan(filter) {
        switch (filter) {
            case 'loans':
                this.loanForm.controls.loan.valueChanges.subscribe(value => {
                    if (value && this.loanForm.controls.attendance.value) {
                        this.loanForm.controls.attendance.setValue(0)
                        this.loanSource;
                    }
                })
                break;
            case 'attendance':
                this.loanForm.controls.attendance.valueChanges.subscribe(value => {
                    if (value && this.loanForm.controls.loan.value) {
                        this.loanForm.controls.loan.setValue(0)
                        this.loanABSource
                    }
                })
                break;

        }
    }


    //////////Govcon Type////////////

    uploadFilegov(event, id, control) {
        this.GovtSource = []
        let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
        var fileName = event.target.files[0].name;
        this.fileName = fileName.slice(0, fileName.lastIndexOf('.'));
        this.payrollTypeId = this.detailForm.value.payoutTypeID
        element.setAttribute('value', fileName)
        this.files = event.target.files;
        this.GovtSource = [...this.GovtSource, ...[]]
        this.buttonDisabled = true

        for (var i = 0; i < event.target.files.length; i++) {
            this.GovtSource.push({ id: 0, checkbox: false, file: event.target.files[0] });
        }

        /////// UPLOAD METHOD
        this.fileService.postUploadHandler(this.dropdowntypeid, this.files, this.fileName, this.isSave, this.uploadid, this.payrollTypeId, this.detailForm.value.payrollCode, this.isadj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.loading = true
                    this.buttonDisabled = false
                    this.uploadFilev2Gov(event.target.files[0], event.target.files[0].name)
                    this.successMessage.title = "Success!"
                    this.successMessage.message = "You can now view and save your file."
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                    // var id = 0
                    this.uploadid = value.message

                    ////// VIEWING METHOD
                    this.uploadView("upload", control)
                }
                else {
                    this.loading = true
                    this.saving = true
                    this.buttonDisabled = false
                    this.GovtSource = []
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Incorrect Govcon file format!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                    this.loading = false


                }
            }
        });
        this.loading = false
    }

    uploadFilev2Gov(fileToUpload, filename) {

        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(fileToUpload);
        reader.onload = (e: any) => {
            /* create workbook */
            const binarystr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary', cellDates: true, dateNF: 'yyyy-mm-dd' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { raw: false, defval: "" }); // to get 2d array pass 2nd parameter as object {header: 1}

            // switch (control) {
            // case 'gc':
            data.forEach(item => {
                item["filename"] = filename
            });
            this.govList = [...data, ...this.govList]
            // break;
            // }
        }
    }

    checkersGov(control) {
        if (control === "ugT") {
            if (this.checkTableG.length == 0) {
                this.govtUpload = []
                return
            }
            this.uploadid = this.GovTableSource.find(x => x.id == this.checkTableG[0]).file.uploadID
            this.uploadTables('ugT', false, this.tableRequest)
        } else {
            if (this.checkedListGov.length == 0) {
                this.govconSource = []
                return
            }
        }
        if (control === 'gT') {
            this.govconSource = this.data
        }
    }

    switchGov() {
        var sliced = JSON.parse(JSON.stringify(this.govconSource));
        switch (this.contributionForm.value.govcon) {
            case 1:
                this.govconSource = sliced
                break;
            case 2:
                const sum = {};
                sliced.forEach((earning) => {
                    const num = parseInt(earning.amount);
                    if (!isNaN[num]) {
                        const key = earning.employeeCode;
                        if (!sum[key]) {
                            earning.amount = num
                            sum[key] = earning;
                        } else {
                            sum[key].amount += num;
                        }
                    }
                });
                const result = Object.keys(sum).map((key) => sum[key]);
                this.govconSource = result
                break;
            default:
                this.govconSource = sliced
                break;
        }
    }

    SaveGC() {
        if (this.errorLogs === false) {
            this.isSave = 1
        }
        // this.isSave = 1
        if (this.isSave === 1) {
            this.savedMessage.message = "Are you sure you want to save?"
            const dialogRef = this.message.open(this.savedMessage);
            dialogRef.afterClosed().subscribe((result) => {

                var uploadid = this.uploadid
                if (result === "confirmed") {

                    this.fileService.postPayrollGovConUploadFinal(uploadid).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.successMessage.title = "Success!"
                                this.successMessage.message = "File was saved successfully"
                                this.successMessage.actions.confirm.label = "Ok"
                                this.message.open(this.successMessage);
                            }
                        },
                        error: () => {
                            this.failedMessage.title = "Failed!"
                            this.failedMessage.message = "Transaction Failed"
                            this.failedMessage.actions.confirm.label = "Ok"
                            this.message.open(this.failedMessage);
                        },
                        complete: () => {
                            this.uploadid = "0"
                            this.isview = false
                            this.govconSource = []
                            this.govtDelete = true
                            this.uploadTables('ugT', true, '')
                            this.GovtSource = []

                        }
                    });
                }
            })
        }
        else {
            this.failedMessage.title = "Failed! Check Error Logs"
            this.failedMessage.message = "Invalid data is present, Please review and resubmit."
            this.failedMessage.actions.confirm.label = "Ok"
            this.message.open(this.failedMessage);
        }
    }

    gcView() {
        this.fileService.getPayrollGovConUploadView(this.request, this.uploadid).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.totalRows = value.payload.totalRows
                    this.tableRequest.Order = 'errorLogs'
                    this.errorLogs = value.payload.isError
                    if (value.payload.isError === true) {
                        this.columnHideG = true
                    } else {
                        this.columnHideG = false
                    }
                    this.data = value.payload.data
                }
            }
        });
    }

    Delete(a, type) {
        if (a == 'tkt' || a == 'tka') {
            a = this.timekeepingForm.value.timekeepingType === 12686 ? "system" :
                this.timekeepingForm.value.timekeepingAdjustment === 12686 ? "system" : a
        }

        switch (a) {
            case 'tkt':
                this.deleteShow = true
                this.showCancel = true
                this.showSave = false
                this.view = false
                this.isDelete = true
                this.tkUpload = []
                this.timekeepingABSource = []
                if (this.delTableT.length > 0) {
                    var list = []
                    for (const Id of this.delTableT) {
                        var ID = this.TKTableSource.find(x => x.id === Id).file.uploadID
                        list.push(ID)
                    }
                    this.listUploadID = list
                    this.deleteUpload(type, this.TKTableSource, 'utkT')
                    this.cdr.detectChanges()
                    return
                }
                if (this.delTableTC.length > 0) {
                    this.TkSource = []
                    this.timekeepingSource = []
                    this.showCancel = false
                    this.deleteShow = false
                }
                if (this.delTableTS.length > 0) {
                    var list = []
                    for (const Id of this.delTableTS) {
                        var ID = this.SysTKTableSource.find(x => x.id === Id).file.uploadID
                        list.push(ID)
                    }
                    this.listUploadID = list
                    this.deleteUpload(type, this.SysTKTableSource, 'utkS')
                    this.cdr.detectChanges()
                    return
                }
                if (this.delTableTSC.length > 0) {
                    this.TkSource = []
                    this.timekeepingSource = []
                    this.showCancel = false
                    this.deleteShow = false
                    this.showSave = true
                }
                break;
            case 'system':
                this.deleteShow = true
                this.showCancel = true
                this.showSave = false
                this.view = false
                this.isDelete = true
                this.sysUpload = []
                if (this.delTableS.length > 0) {
                    var list = []
                    for (const Id of this.delTableS) {
                        var ID = this.SysTableSource.find(x => x.id === Id).file.uploadID
                        list.push(ID)
                    }
                    this.listUploadID = list
                    this.deleteUpload(type, this.SysTableSource, 'system')
                    this.cdr.detectChanges()
                    return
                }
                break;
            case 'tka':
                this.deleteShow = true
                this.showCancel = true
                this.showSave = false
                this.view = false
                this.isDelete = true
                this.tkUpload = []
                this.timekeepingABSource = []
                if (this.delTableAB.length > 0) {
                    var list = []
                    for (const Id of this.delTableAB) {
                        var ID = this.TKATableSource.find(x => x.id === Id).file.uploadID
                        list.push(ID)
                    }
                    this.listUploadID = list
                    this.deleteUpload(type, this.TKATableSource, 'utkA')
                    this.cdr.detectChanges()
                    return
                }
                if (this.delTableABC.length > 0) {
                    this.TkABSource = []
                    this.timekeepingABSource = []
                    this.showCancel = false
                    this.deleteShow = false
                    this.showSave = true
                }
                break;
            case 'eE':
                var picked = this.EarnSource.filter(x => x.checked).map(x => x.employeeId)
                this.earnEDelete = true
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.checkersEarn('eE')
                }, 1000);
                break;
            case 'eT':
                this.deleteShow = true
                this.showCancel = true
                this.showSave = false
                this.view = false
                this.earnDelete = true
                this.earningUpload = []
                if (this.delTableE.length > 0) {
                    var list = []
                    for (const Id of this.delTableE) {
                        var ID = this.EarnTableSource.find(x => x.id === Id).file.uploadID
                        list.push(ID)
                    }
                    this.listUploadID = list
                    this.deleteUpload(type, this.EarnTableSource, 'ueT')
                    this.cdr.detectChanges()
                    return
                }
                if (this.delTableEC.length > 0) {
                    this.EarnSource = []
                    this.earningSource = []
                    this.showCancel = false
                    this.deleteShow = false
                    this.showSave = true
                    this.files = []
                }
                break;
            case 'eTAB':
                this.earnDelete2 = true
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.checkersEarn('eTAB')
                }, 1000);
                break;
            case 'dE':
                this.deductionEDelete = true
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.checkersDeduc('dE')
                }, 1000);
                break;
            case 'dT':
                this.deleteShow = true
                this.showCancel = true
                this.showSave = false
                this.view = false
                this.deductionUpload = []
                this.deductionDelete = true
                this.cdr.detectChanges();
                if (this.delTableD.length > 0) {
                    var list = []
                    for (const Id of this.delTableD) {
                        var ID = this.DeductionTableSource.find(x => x.id === Id).file.uploadID
                        list.push(ID)
                    }
                    this.listUploadID = list
                    this.deleteUpload(type, this.DeductionTableSource, 'udT')
                    this.cdr.detectChanges();
                    return
                }
                if (this.delTableEC.length > 0) {
                    this.DeductionSource = []
                    this.deductionSource = []
                    this.showCancel = false
                    this.deleteShow = false
                    this.showSave = true
                }
                break;
            case 'dTAB':
                this.deductionDelete2 = true
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.checkersDeduc('dTAB')
                }, 1000);
                break;
            case 'lE':
                this.loanEDelete = true
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.checkersLoan('lE')
                }, 1000);
                break;
            case 'lT':
                this.deleteShow = true
                this.showCancel = true
                this.showSave = false
                this.view = false
                this.loanUpload = []
                this.loanDelete = true
                this.cdr.detectChanges();
                if (this.delTableL.length > 0) {
                    var list = []
                    for (const Id of this.delTableL) {
                        var ID = this.LoanTableSource.find(x => x.id === Id).file.uploadID
                        list.push(ID)
                    }
                    this.listUploadID = list
                    this.deleteUpload(type, this.LoanTableSource, 'ulT')
                    this.cdr.detectChanges();
                    return
                }
                if (this.delTableLC.length > 0) {
                    this.LoanSource = []
                    this.loanSource = []
                    this.showCancel = false
                    this.deleteShow = false
                    this.showSave = true
                }
                break;
            case 'lTAB':
                this.loanABDelete2 = true
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.checkersLoan('lTAB')
                }, 1000);
                break;
            case 'gc':
                this.deleteShow = true
                this.showCancel = true
                this.showSave = false
                this.view = false
                this.govtUpload = []
                this.govtDelete = true
                this.cdr.detectChanges();
                if (this.delTableG.length > 0) {
                    var list = []
                    for (const Id of this.delTableG) {
                        var ID = this.GovTableSource.find(x => x.id === Id).file.uploadID
                        list.push(ID)
                    }
                    this.listUploadID = list
                    this.deleteUpload(type, this.GovTableSource, 'ugT')
                    this.cdr.detectChanges();
                    return
                }
                if (this.delTableGC.length > 0) {
                    this.GovtSource = []
                    this.govconSource = []
                    this.showCancel = false
                    this.deleteShow = false
                    this.showSave = true
                }
                break;
        }

    }

    Cancel() {
        this.hideCancel = true
        this.showSave = true
        this.showCancel = false
        this.deleteShow = false
        this.view = true
        if (this.delTableE.length > 0 || this.delTableEC.length > 0) {
            this.delTableE = []
            this.delTableEC = []
            return
        }
        if (this.delTableD.length > 0 || this.delTableDC.length > 0) {
            this.delTableD = []
            this.delTableDC = []
            return
        }
        if (this.delTableL.length > 0 || this.delTableLC.length > 0) {
            this.delTableL = []
            this.delTableLC = []
            return
        }
        if (this.delTableG.length > 0 || this.delTableGC.length > 0) {
            this.delTableG = []
            this.delTableGC = []
            return
        }
        if (this.delTableT.length > 0 || this.delTableTC.length > 0) {
            this.delTableT = []
            this.delTableTC = []
            return
        }
        if (this.delTableAB.length > 0 || this.delTableABC.length > 0) {
            this.delTableAB = []
            this.delTableABC = []
            return
        }
        if (this.delTableS.length > 0) {
            this.delTableS = []
            return
        }
        if (this.delTableSAB.length > 0) {
            this.delTableSAB = []
            return
        }
    }

    deleteUpload(type, uploadTable, control) {
        var ddtypeId = type === 4 ? 31168 : this.dropdowntypeid //31168 ADJ = 4
        this.savedMessage.message = "Are you sure you want to delete the file?"
        const dialogRef = this.message.open(this.savedMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result === "confirmed") {
                this.fileService.PostDeleteUploadedFileHandler(ddtypeId, this.listUploadID).subscribe({
                    next: (value: any) => {
                        var msgAlert
                        if (value.statusCode == 200) {
                            switch (control) {
                                case 'ueT':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.earnTableDelete = true
                                    this.showCancel = false
                                    this.view = true
                                    this.showSave = true
                                    this.uploadTables('ueT', true, '')
                                    this.delTableE = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'udT':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.deducTableDelete = true
                                    this.showCancel = false
                                    this.view = true
                                    this.showSave = true
                                    this.uploadTables('udT', true, '')
                                    this.delTableD = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'ulT':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.loanTableDelete = true
                                    this.showCancel = false
                                    this.view = true
                                    this.showSave = true
                                    this.uploadTables('ulT', true, '')
                                    this.delTableL = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'ugT':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.govTableDelete = true
                                    this.showCancel = false
                                    this.view = true
                                    this.showSave = true
                                    this.uploadTables('ugT', true, '')
                                    this.delTableG = []
                                    this.cdr.detectChanges()
                                    break;
                                case 'utkT':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.tkTableDelete = true
                                    this.showCancel = false
                                    this.showSave = true
                                    this.view = true
                                    this.uploadTables('utkT', true, '')
                                    this.cdr.detectChanges()
                                    break;
                                case 'utkA':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.tkaTableDelete = true
                                    this.showCancel = false
                                    this.showSave = true
                                    this.view = true
                                    this.uploadTables('utkA', true, '')
                                    this.cdr.detectChanges()
                                    break;
                                case 'system':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.sysTableDelete = true
                                    this.showCancel = false
                                    this.showSave = true
                                    this.view = true
                                    this.checkTableS = []
                                    this.uploadTables('system', true, '')
                                    this.cdr.detectChanges()
                                    break;
                                case 'systemAB':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.sysATableDelete = true
                                    this.showCancel = false
                                    this.showSave = true
                                    this.view = true
                                    this.uploadTables('systemAB', true, '')
                                    this.cdr.detectChanges()
                                    break;
                                case 'utkS':
                                    this.uploadid = "0"
                                    this.isview = false
                                    this.sysTKTableDelete = true
                                    this.showCancel = false
                                    this.showSave = true
                                    this.view = true
                                    this.uploadTables('utkS', true, '')
                                    this.cdr.detectChanges()
                                    break;
                            }

                            if (value.payload[0].includes("Deleted successfully")) {
                                msgAlert = this.deletemessage
                                msgAlert.title = "Success!"
                            } else {
                                msgAlert = this.deletemessage
                                msgAlert.title = "Success!"
                                msgAlert.message = value.message
                            }
                        }
                        else {
                            msgAlert = this.failedMessage
                            msgAlert.title = "Failed!"
                        }
                        msgAlert.message = value.payload[0]
                        msgAlert.actions.confirm.label = "Ok"
                        this.message.open(msgAlert);
                        // this.uploadTables(control,false,this.tableRequest)
                    },
                    complete: () => {
                        this.deleteShow = false
                    }
                });
            }
        })
    }

    resetHeader(component) {

        this.isSave = 0

        switch (component) {
            case 'e':
                this.earningForm.get('earningType').setValue(2)
                this.earningForm.get('uploadFile').setValue("")
                this.earningForm.get('earningABType').setValue(0)
                this.earningForm.get('uploadFile3').setValue("")
                this.earningForm.get('uploadFile2').setValue("")
                this.earningForm.get('earning').setValue(0)
                this.earningForm.get('attendance').setValue(0)
                this.EarnABSource = []
                this.EarnSource = []
                this.EarnESource = []
                this.checkedList = []
                this.checkedListEarn = []
                this.checkedListEarnAB = []
                this.earningESource = []
                break;
            case 'd':
                this.deductionForm.get('deductionType').setValue(2)
                this.deductionForm.get('uploadFile').setValue("")
                this.deductionForm.get('deductionABType').setValue(0)
                this.deductionForm.get('uploadFile3').setValue("")
                this.deductionForm.get('uploadFile2').setValue("")
                this.deductionForm.get('deduction').setValue(0)
                this.deductionForm.get('attendance').setValue(0)
                this.DeductionABSource = []
                this.DeductionESource = []
                this.DeductionSource = []
                this.checkedListDeduc = []
                this.checkedListDeducAB = []
                this.checkedListDeducE = []
                this.deductionESource = []
                break;
            case 'l':
                this.loanForm.get('loanType').setValue(2)
                this.loanForm.get('uploadFile').setValue("")
                this.loanForm.get('loanABType').setValue(0)
                this.loanForm.get('uploadFile3').setValue("")
                this.loanForm.get('uploadFile2').setValue("")
                this.loanForm.get('loan').setValue(0)
                this.loanForm.get('attendance').setValue(0)
                this.LoanABSource = []
                this.LoanESource = []
                this.LoanSource = []
                this.checkedListLoan = []
                this.checkedListLoanAB = []
                this.checkedListLoanE = []
                this.loanESource = []
                break;
        }
    }

    resetType(type) {

        switch (type) {
            case 'tkt':
                this.tkdropdown = true
                this.TkSource = []
                this.timekeepingForm.get('timekeepingAttendance').setValue(0)
                this.timekeepingSource = []

                if (this.timekeepingForm.value.timekeepingType === 12703) {
                    this.timekeepingForm.get('timekeeping').setValue(2)
                }

                break;
            case 'tkTAB':
                this.tkadjdropdown = true
                this.TkABSource = []
                this.timekeepingForm.get('timekeepingCode').setValue(0)
                this.timekeepingABSource = []

                if (this.timekeepingForm.value.timekeepingAdjustment === 12703) {
                    this.timekeepingForm.get('attendance').setValue(2)
                }

                break;
            case 'eT':
                this.EarnSource = []
                break;
            case 'eTAB':
                this.EarnABSource = []
                break;
            case 'dT':
                this.DeductionSource = []
                break;
            case 'dTAB':
                this.DeductionABSource = []
                break;
            case 'lT':
                this.LoanSource = []
                break;
            case 'lTAB':
                this.LoanABSource = []
                break;
            case 'gc':
                this.GovtSource = []
                break;
        }
    }

    openModalApprove() {
        if (this.stepperHide) {
            this.failedMessage.title = 'Payroll was locked on ' + this.lockedDate
            this.failedMessage.message = ""
            this.failedMessage.actions.confirm.label = "Ok"
            this.message.open(this.failedMessage);
            return
        }

        this.savedMessage.title = "Warning!"
        this.savedMessage.message = "Are you sure you want to Lock the payroll register?"
        const dialogMessage = this.message.open(this.savedMessage);
        dialogMessage.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.payrollService.postPGMLocking(this.encryptId, true).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.successMessage.title = "Success!"
                            this.successMessage.message = value.message
                            this.successMessage.actions.confirm.label = "Ok"
                            this.message.open(this.successMessage);
                            this.stepperHide = true
                            this.router.navigate(['/search/payroll-run-view']);
                        }
                    }
                });
            }
        });
    }

    uploadModal() {
        this.successMessage.title = "Success!"
        this.successMessage.message = "File has been Uploaded!"
        this.successMessage.actions.confirm.label = "Ok"
        this.message.open(this.successMessage);
        return
    }

    proceed() {
        if (this.generateForm.value.payslip === 5) {
            this.exportPayslipTxt()
            return
        }
        var picked = []
        var clone = JSON.parse(JSON.stringify(this.payRegCheck));
        var data = JSON.parse(JSON.stringify(this.encryptSource));
        if (clone.some(x => x.id === 0)) {
            data = data.filter(item => !this.payRegExclude.includes(item.employeeId))
            for (var i = 0; i < data.length; i++) {
                this.encryptEmployee.push({ id: data.map(x => x.id)[i], name: data.map(x => x.name)[i], filename: data.map(x => x.fileNamePayslip)[i],createdBy: data.map(x => x.createdBy)[i] })
                picked.push(data.map(x => x.employeeId)[i]);
            }
        } else {
            for (const checkID of clone) {
                this.encryptEmployee.push({ id: this.encryptSource.find(x => x.employeeId === checkID.id).id, name: this.encryptSource.find(x => x.employeeId === checkID.id).name, filename: this.encryptSource.find(x => x.employeeId === checkID.id).fileNamePayslip, createdBy: this.encryptSource.find(x => x.employeeId === checkID.id).createdBy  })
                picked.push(checkID.id)
            }
        }

        if (picked.length === 0 || this.generateForm.value.payslip === null) {
            if (picked.length === 0) {
                this.failedMessage.title = "Failed!"
                this.failedMessage.message = "No selected Employee"
                this.failedMessage.actions.confirm.label = "Ok"
                this.message.open(this.failedMessage);
            } else if (this.generateForm.value.payslip === null) {
                this.failedMessage.title = "Failed!"
                this.failedMessage.message = "No selected Payslip Status"
                this.failedMessage.actions.confirm.label = "Ok"
                this.message.open(this.failedMessage);
            }
            return
        }

        this.PayrollRun = {
            payrollCode: this.detailForm.value.payrollCode,
            month: this.detailForm.value.month,
            year: this.detailForm.value.year,
            employeeId: picked
        }
        this.payrollService.postPublish(this.PayrollRun, this.generateForm.value.payslip).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    if (this.generateForm.value.payslip === 1 || this.generateForm.value.payslip === 2) {
                        this.allSelected = false
                        this.successMessage.title = "Success!"
                        this.successMessage.message = this.generateForm.value.payslip === 1 ? "Published successfully!" : "Unpublished successfully!"
                        this.successMessage.actions.confirm.label = "Ok"
                        this.message.open(this.successMessage);
                    }
                    if (this.generateForm.value.payslip === 3 || this.generateForm.value.payslip === 4) {
                        this.bulkdownload()
                        this.spinnerModal(true)

                    }
                }
                else {
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Something went wrong, Try again!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                }
            }, complete: () => {
                this.encryptEmployee = []
                this.encryptPayout = []
                this.payRegCheck = []
                this.generateForm.get('firstName').setValue(null)
                this.generateForm.get('lastName').setValue(null)
                this.generateForm.get('payslip').setValue(null)
                this.tableRequest.SearchColumn = []
                this.loadTables('loadAll')

            }
        });
    }

    exportPayslipTxt() {
        this.fileService.exportPayslipText(this.tableRequest, this.detailForm.value.payrollCode).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.coreService.converB64ToExcel(value.payload.fileData, value.payload.fileName + '.txt')
                    this.successMessage.title = "Success!"
                    this.successMessage.message = "Export completed successfully!"
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                } else {
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Failed to export!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                }
            }
        });
    }



    spinnerModal(bool) {
        if (bool) {
            this.spinnerDialogRef = this.dialog.open(SpinnerComponent, {
                disableClose: true,
            });
        } else {
            this.spinnerDialogRef.close();
        }
    }

    dialogModal() {
        this.dialogBox = this.dialog.open(DialogboxComponent, {
            disableClose: true
        });

        this.dialogBox.afterClosed().subscribe(result => {
            if (result) {
                this.generateForm.value.date = this.pipe.transform(result.date, "MM-dd-yyyy");
                this.generateForm.value.code = result.code;
                this.exportbankFile()
            }
        });

    }

    dialogSetupCurrency() {
        // Use this.dialogCurrency instead of this.dialogBox
        this.dialogCurrency = this.dialog.open(DialogBoxCurrencyComponent, {
            disableClose: true,
            data: {
                code: this.detailForm.value.payrollCode,
                data: this.currencySource
            }
        });

        // Correct the subscription to use this.dialogCurrency.afterClosed()
        this.dialogCurrency.afterClosed().subscribe(result => {
            if (result) {
                this.generateForm.value.rate = result.rate;
                this.generateForm.value.currency = result.currency;

                this.exportbankFile();
            }
        });
    }

    currencyTable() {
        this.payrollService.getCurrencyRate(this.detailForm.value.payrollCode, this.tableRequest).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.currencySource = value.payload.data
                }
            }
        });
    }



    async bulkdownload() {
        var parameter = {
            EncryptedEmployeeId: this.encryptEmployee,
            EncryptedPayoutDate: this.encryptPayout,//01/20/2023
            PayrollCode: this.detailForm.value.payrollCode,
            createdBy: ""
        }
        if (this.generateForm.value.payslip === 3) {
            var extention = "pdf"
        } else {
            var extention = "xlsx"
        }

        var done = await this.coreService.bulkDownloadReport("payslip_master_shared_datasource_bulk", "PaySlip-ZIP", "", extention, "EncryptedEmployeeId", parameter)
        if (done) {
            this.spinnerModal(false)
        }
    }

    async ytd_2316() {
        var clone = JSON.parse(JSON.stringify(this.payRegCheck));
        var data = JSON.parse(JSON.stringify(this.encryptSource));
        var year = this.encryptSource[0].year
        var file2316 = []
        this.spinnerModal(true)

        if (clone.some(x => x.id === 0)) {
            data = data.filter(item => !this.payRegExclude.includes(item.employeeId))
            for (var i = 0; i < data.length; i++) {
                this.encryptEmployee.push({ id: data.map(x => x.employeeId)[i], name: data.map(x => x.name)[i], filename: data.map(x => x.fileNameYTD)[i] })
                file2316.push({ id: data.map(x => x.employeeId)[i], name: data.map(x => x.name)[i], filename: data.map(x => x.fileName2316)[i] })
            }
        } else {
            for (const checkID of clone) {
                this.encryptEmployee.push({ id: this.encryptSource.find(x => x.employeeId === checkID.id).employeeId, name: this.encryptSource.find(x => x.employeeId === checkID.id).name, filename: this.encryptSource.find(x => x.employeeId === checkID.id).fileNameYTD })
                file2316.push({ id: this.encryptSource.find(x => x.employeeId === checkID.id).employeeId, name: this.encryptSource.find(x => x.employeeId === checkID.id).name, filename: this.encryptSource.find(x => x.employeeId === checkID.id).fileName2316 })
            }
        }

        if (this.encryptEmployee.length > 0) {
            var ytd = {
                Employee: this.encryptEmployee,
                Year: year
            }
            var done = await this.coreService.bulkDownloadReport("YTD Individual", "YTD-ZIP", "", "pdf", "Employee", ytd)

            var twoThreeOneSix = {
                Employee: file2316,
                Year: year,
                PayrollCode: this.detailForm.value.payrollCode
            }

            var file = await this.coreService.bulkDownloadReport("2316 PDF_payrollrun", "2316-ZIP", "", "pdf", "Employee", twoThreeOneSix)
        } else {
            this.failedMessage.title = "Failed!"
            this.failedMessage.message = "Please choose an employee"
            this.failedMessage.actions.confirm.label = "Ok"
            this.message.open(this.failedMessage);
            this.spinnerModal(false)
        }

        if (done && file) {
            this.spinnerModal(false)
            this.encryptEmployee = []
            year = ""
        }
    }

    generatePayroll() {
        if (this.stepperHide) {
            this.failedMessage.title = 'Payroll was locked on ' + this.lockedDate
            this.failedMessage.message = ""
            this.failedMessage.actions.confirm.label = "Ok"
            this.message.open(this.failedMessage);
            return
        }

        this.PayrollRun = {
            payrollCode: this.detailForm.value.payrollCode,
            month: GF.IsEmptyReturn(this.detailForm.value.month, 0),
            year: GF.IsEmptyReturn(this.detailForm.value.year, 0),
        }

        this.buttonDisabled = true

        this.payrollService.postPayrollRun(this.PayrollRun).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.successMessage.title = "Success!"
                    this.successMessage.message = "Files has been generated successfully!"
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                    this.loadTables("loadAll")
                }
                else {
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Something went wrong, Try again!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                }

                this.buttonDisabled = false
            }
        });
    }

    exportall() {
        this.loadHorizontal = true
        var request = {
            option: 0,
            payrollcode: this.detailForm.value.payrollCode
        }
        this.fileService.exportPayrollRegister(request).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.coreService.converB64ToExcel(value.payload.fileData, value.payload.fileName)
                    this.loadHorizontal = false
                    this.successMessage.title = "Success!"
                    this.successMessage.message = "Export completed successfully!"
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                } else {
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Failed to export, No data!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                }
            }
        });

    }

    exportbankFile() {
        this.tableRequest.SearchColumn = []
        this.resultHierarchy.Search.forEach(element => {
            var a = element.Value
            if (Array.isArray(element.Value)) {
                element.Value.forEach(val => {
                    this.tableRequest.SearchColumn.push({
                        "key": element.Key,
                        "value": val + "",
                        "type": element.Type
                    })
                });
            }
        });

        this.tableRequest.SearchColumn.push({
            "key": "WithBankAccount",
            "value": this.generateForm.value.bankOption + "",
            "type": 2
        })

        if (this.payrollCode !== '') {
            var idString = this.payrollId.toString()
            var sliced = JSON.parse(JSON.stringify(this.tableRequest));
            sliced.SearchColumn.push({ key: "PayrollCode", value: idString, type: 2 })
        }
        var date = this.generateForm.value.date
        var code = this.generateForm.value.code

        this.fileService.exportBankFile(sliced, date, code).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {

                    value.payload.forEach(elem => {
                        this.coreService.converB64ToExcel(elem.fileData, elem.fileName + '.txt')
                    });
                    // console.log(filedata + "filedata")
                    // console.log(filename + "filename")

                    this.successMessage.title = "Success!"
                    this.successMessage.message = "Export completed successfully!"
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                } else {
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Failed to export!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                }
            }
        });
    }

    onStepperSelectionChange(event: any) {
        this.selectedIndex = this.isUploads ? (event.selectedIndex + 1) : event.selectedIndex;

        switch (this.selectedIndex) {
            case 1:
                if (this.stepperHide) {
                    this.loadTables('loadAll')
                    this.changeTab("woi")
                    this.timekeepingForm.reset()
                    this.loanForm.reset()
                    this.earningForm.reset()
                    this.deductionForm.reset()
                    this.contributionForm.reset()
                }
                this.uploadid = "0"
                this.isview = false
                // this.earningForm.reset()
                // this.deductionForm.reset()
                // this.loanForm.reset()
                this.contributionForm.reset()
                this.generateForm.reset()
                console.log(this.tableRequest)
                //tk
                break;
            case 2:
                this.uploadid = "0"
                this.isview = false
                this.dropdowntypeid = 22862
                this.uploadTables('ueT', true, '')
                myData.backSave = true
                ////earn
                break;
            case 3:
                this.uploadid = "0"
                this.isview = false
                this.dropdowntypeid = 22863
                this.uploadTables('udT', true, '')
                myData.backSave = true
                ////deduc
                break;
            case 4:
                this.uploadid = "0"
                this.isview = false
                // this.dropdowntypeid = 30002
                // this.uploadTables('ulT',true,'')
                this.dropdowntypeid = 30002
                this.uploadTables('ulT', true, '')
                myData.backSave = true
                /////loan
                break;
            case 5:
                this.uploadid = "0"
                this.isview = false
                this.dropdowntypeid = 30610
                this.uploadTables('ugT', true, '')
                /////govt
                break;
            case 6:
                this.loadTables('loadAll')
                this.changeTab("woi")
                console.log(this.tableRequest)
                /////generate
                break;
            default:
                break;
        }
    }


    changeTab(e) {

        // this.isPeI = e == 'pei' ? true : false
        this.isWoI = e == 'woi' ? true : false
        this.isPaI = e == 'pai' ? true : false
        this.isS = e == 's' ? true : false
        this.isL = e == 'l' ? true : false
        this.isOther = e == 'O' ? true : false
        this.isException = e == 'E' ? true : false
        this.isAdmin = e == 'A' ? true : false

        // if (this.isPeI) {
        //     this.isEfocus = ""
        //     this.isPeIfocus = "bg-default"
        //     this.isWoIfocus = ""
        //     this.isOtherfocus = ""
        //     this.isPaIfocus = ""
        //     this.isSfocus = ""
        //     this.isLfocus = ""
        //     this.isAdfocus = ""
        //     this.clicked = 'Summary'
        //     this.loading = false
        //     this.generateForm.get("search").setValue("")

        // } else
        if (this.isWoI) {
            this.isEfocus = ""
            this.isOtherfocus = ""
            this.isWoIfocus = "bg-default"
            // this.isPeIfocus = ""
            this.isPaIfocus = ""
            this.isSfocus = ""
            this.isLfocus = ""
            this.isAdfocus = ""
            this.clicked = 'PAYREG'
            this.loading = false
            this.generateForm.get("search").setValue("")

        } else if (this.isPaI) {
            this.isEfocus = ""
            this.isOtherfocus = ""
            this.isWoIfocus = ""
            // this.isPeIfocus = ""
            this.isPaIfocus = "bg-default"
            this.isSfocus = ""
            this.isLfocus = ""
            this.isAdfocus = ""
            this.clicked = 'MISC_REG'
            this.loading = false
            this.generateForm.get("search").setValue("")

        } else if (this.isS) {
            this.isEfocus = ""
            this.isOtherfocus = ""
            this.isWoIfocus = ""
            // this.isPeIfocus = ""
            this.isPaIfocus = ""
            this.isSfocus = "bg-default"
            this.isLfocus = ""
            this.isAdfocus = ""
            this.clicked = 'OT_REG'
            this.loading = false
            this.generateForm.get("search").setValue("")

        } else if (this.isL) {
            this.isEfocus = ""
            this.isOtherfocus = ""
            this.isWoIfocus = ""
            // this.isPeIfocus = ""
            this.isPaIfocus = ""
            this.isSfocus = ""
            this.isLfocus = "bg-default"
            this.isAdfocus = ""
            this.clicked = 'TAX_REG'
            this.loading = false
            this.generateForm.get("search").setValue("")

        } else if (this.isOther) {
            this.isEfocus = ""
            this.isOtherfocus = "bg-default"
            this.isWoIfocus = ""
            // this.isPeIfocus = ""
            this.isPaIfocus = ""
            this.isSfocus = ""
            this.isLfocus = ""
            this.isAdfocus = ""
            this.clicked = 'NTAX_REG'
            this.loading = false
            this.generateForm.get("search").setValue("")

        } else if (this.isException) {
            this.isEfocus = "bg-default"
            this.isOtherfocus = ""
            this.isWoIfocus = ""
            // this.isPeIfocus = ""
            this.isPaIfocus = ""
            this.isSfocus = ""
            this.isLfocus = ""
            this.isAdfocus = ""
            this.clicked = 'LOAN_REG'
            this.loading = false
            this.generateForm.get("search").setValue("")

        } else if (this.isAdmin) {
            this.isEfocus = ""
            this.isOtherfocus = ""
            this.isWoIfocus = ""
            // this.isPeIfocus = ""
            this.isPaIfocus = ""
            this.isSfocus = ""
            this.isLfocus = ""
            this.isAdfocus = "bg-default"
            this.clicked = 'DEDTN_REG'
            this.loading = false
            this.generateForm.get("search").setValue("")

        }

    }

    download(report) {
        this.coreService.directDownloadBoldRTemplate(report, report, "Excel", "{}", null, false, "")
    }

    PatchDeduction(form: any) {
        this.payrolldeducForm = form
    }

    PatchLoans(form: any) {
        this.payrollloansForm = form
    }

    PatchEarnings(form: any) {
        this.payrollearnForm = form
    }

    saveManual(control) {
        switch (control) {
            case 'deductionType':
                var recurtstart = this.pipe.transform(this.payrolldeducForm.recurStartDate, "yyyy-MM-dd")
                var recurtend = this.pipe.transform(this.payrolldeducForm.recurEndDate, "yyyy-MM-dd")

                var dedForm = this.payrolldeducForm

                dedForm.recurStartDate = recurtstart
                dedForm.recurEndDate = recurtend

                this.savedMessage.message = "Are you sure you want to save?"
                const dialogL = this.message.open(this.savedMessage);
                dialogL.afterClosed().subscribe((result) => {
                    if (result == "confirmed") {

                        this.payrollService.postPayrollDeductions(dedForm).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    this.successMessage.title = "Success!"
                                    this.successMessage.message = "Transaction has been Saved!"
                                    this.successMessage.actions.confirm.label = "Ok"
                                    this.message.open(this.successMessage);
                                }
                                else {
                                    this.failedMessage.title = "Failed!"
                                    this.failedMessage.message = "Transaction Failed!"
                                    this.failedMessage.actions.confirm.label = "Ok"
                                    this.message.open(this.failedMessage);
                                }
                            },
                            error: (e) => {
                                this.failedMessage.title = "Failed!"
                                this.failedMessage.message = "Transaction Failed!"
                                this.failedMessage.actions.confirm.label = "Ok"
                                this.message.open(this.failedMessage);
                                console.error(e)
                            }
                        });
                    }
                });
                break;
            case 'loanType':
                var date = this.pipe.transform(this.payrollloansForm.recurEndDate, "yyyy-MM-ddThh:mm")
                this.payrollloansForm.recurEndDate = date

                var loandates = this.pipe.transform(this.payrollloansForm.loanDate, "yyyy-MM-dd")
                var recurtstart = this.pipe.transform(this.payrollloansForm.recurStartDate, "yyyy-MM-dd")
                var recurtend = this.pipe.transform(this.payrollloansForm.recurEndDate, "yyyy-MM-dd")

                var dedloans = this.payrollloansForm

                dedloans.loanDate = loandates
                dedloans.recurStartDate = recurtstart
                dedloans.recurEndDate = recurtend

                this.savedMessage.message = "Are you sure you want to save?"
                const dialogR = this.message.open(this.savedMessage);
                JSON.stringify(this.payrollloansForm.value)
                dialogR.afterClosed().subscribe((result) => {
                    if (result == "confirmed") {
                        this.payrollService.PostPayrollLoans(dedloans).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    this.successMessage.title = "Success!"
                                    this.successMessage.message = "Transaction has been Saved!"
                                    this.successMessage.actions.confirm.label = "Ok"
                                    this.message.open(this.successMessage);
                                }
                                else {
                                    this.failedMessage.title = "Failed!"
                                    this.failedMessage.message = "Transaction Failed!"
                                    this.failedMessage.actions.confirm.label = "Ok"
                                    this.message.open(this.failedMessage);

                                }
                            },
                            error: (e) => {
                                this.failedMessage.title = "Failed!"
                                this.failedMessage.message = "Transaction Failed!"
                                this.failedMessage.actions.confirm.label = "Ok"
                                this.message.open(this.failedMessage);
                            }
                        });
                    }
                });
                // }
                break;
            case 'earnType':
                var recurtstart = this.pipe.transform(this.payrollearnForm.recurStartDate, "yyyy-MM-dd")
                var recurtend = this.pipe.transform(this.payrollearnForm.recurEndDate, "yyyy-MM-dd")

                var earnForm = this.payrollearnForm

                earnForm.recurStartDate = recurtstart
                earnForm.recurEndDate = recurtend
                if (!this.payrollearnForm.isHoldFrom && !this.payrollearnForm.isHoldTo) {
                    this.payrollearnForm.get('isHoldFrom').setValue(new Date().toISOString().substring(0, new Date().toISOString().length - 1))
                    this.payrollearnForm.get('isHoldTo').setValue(new Date().toISOString().substring(0, new Date().toISOString().length - 1))
                } if (!this.payrollearnForm.dateClosed) {
                    this.payrollearnForm.get('dateClosed').setValue(new Date().toISOString().substring(0, new Date().toISOString().length - 1))
                }

                const dialogRef = this.message.open(SaveMessage);
                dialogRef.afterClosed().subscribe((result) => {
                    if (result == "confirmed") {

                        this.payrollService.postPayrollEarnings(earnForm).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    this.successMessage.title = "Success!"
                                    this.successMessage.message = "Transaction has been Saved!"
                                    this.successMessage.actions.confirm.label = "Ok"
                                    this.message.open(this.successMessage);
                                }
                                else {
                                    this.message.open(this.failedMessage);
                                    console.log(value.stackTrace)
                                    console.log(value.message)
                                }
                            },
                            error: (e) => {
                                this.failedMessage.title = "Failed!"
                                this.failedMessage.message = "Transaction Failed!"
                                this.failedMessage.actions.confirm.label = "Ok"
                                this.message.open(this.failedMessage);
                                console.error(e)
                            }
                        });
                    }
                });
                break;

        }

    }

    onBank() {
        this.bank = false
        this.loadBankTable(false)
    }
    onGP() {
        this.bank = true
    }

    submit(type, control, category, sm) {
        if (type === 1) {
            this.saveManual(sm);
        } else if (GF.IsEqual(type, [2, 4])) {
            this.Save(type, control);
        }
    }

    // displayChange(){
    //     var payrollcode = this.detailForm.value.payrollCode
    //     var year = this.detailForm.value.year
    //     if (this.dropdownOptions && this.dropdownOptions.monthlydef && this.detailForm.value.month) {
    //         var selectedM = this.dropdownOptions.monthlydef.find(x => x.dropdownID === this.detailForm.value.month)
    //         var month = selectedM ? selectedM.description : ""
    //     }
    //     var date = this.pipe.transform(this.detailForm.value.payoutDateDisplay, "MM/dd/yyy")
    //     if (!GF.IsEmpty(this.cutoff)) {
    //         if (this.cutoff[0].id === 107 || this.cutoff[0].id === 108) {
    //             if (this.cutoff && this.cutoff[0].id && this.detailForm.value.cutoffID) {
    //                 var cutoff = this.cutoff.find(x => x.id === this.detailForm.value.cutoffID).description
    //             }
    //             var output = payrollcode + "_" + "Payroll for " + month + " " + year + " " + cutoff + "," + "Payout Date: " + date
    //             this.detailForm.get('description').setValue(output)
    //         }
    //     }
    // }

    displayHeader() {
        var pd = this.dF.payrollCode
        var month = GF.IsEmptyReturn(this.dropdownOptions.monthlydef.find(x => x.dropdownID === this.detailForm.value.month)?.description, "")
        var year = this.dF.year
        var cutoff = GF.IsEmpty(this.cutoff) ? "" : GF.IsEmptyReturn(this.cutoff.find(x => x.id === this.detailForm.value.cutoffID)?.description, "")
        var date = GF.IsEmptyReturn(this.pipe.transform(this.detailForm.value.payoutDateDisplay, "MM/dd/yyy"), "")
        var output = pd + "_" + "Payroll for " + month + " " + year + " " + cutoff + "," + "Payout Date: " + date
        if (output != this.dF.description) {
            this.detailForm.get('description').setValue(output)
        }
        return output.split("_")[1]
    }

    get detailShowHide() {
        if (this.detailForm.value.payoutTypeID !== 12720 || this.detailForm.value.payoutTypeID !== 12721 || this.detailForm.value.payoutTypeID !== 12722) {
            return false
        } else if (this.detailForm.value.payoutTypeID === 12720 || this.detailForm.value.payoutTypeID === 12721) {
            return this.detailForm.value.payoutTypeID === 12720 || this.detailForm.value.payoutTypeID === 12721 ? false : true

        } else {
            return this.detailForm.value.payoutTypeID === 12722 ? true : false
        }
    }

    finalList() {
        // this.pgMainRequest()
        if (this.finalFilter) {
            this.detailForm.get('tablerequest').setValue(this.tableRequest)
        } else {
            if (!this.listFilter) {
                this.detailForm.get('tablerequest').setValue(new TableRequest)
            } else {
                this.detailForm.get('tablerequest').setValue(this.tableRequest)
            }
        }
        // this.headerList.push(this.headerListReset)
        if (this.headerList !== null && this.headerList.length > 0) {
            const resetItem = this.headerListReset[0];
            Object.keys(resetItem).forEach(item => {
                if (this.detailForm.controls[item]) {
                    this.detailForm.get(item).setValue(resetItem[item]);
                }
            });
        }
        if (this.detailForm.value.payoutTypeID === 12721) {
            this.detailForm.get('recurringEarnings').setValue(false)
            this.detailForm.get('recurringDeduction').setValue(false)
            this.detailForm.get('statutory').setValue(false)
            this.detailForm.get('tax').setValue(false)
            this.detailForm.get('loan').setValue(false)
        }

        this.detailForm.get('employeeExclude').setValue(this.employeeExclude)
        this.detailForm.value.categoryPayroll = [this.detailForm.value.categoryPayroll];
        this.payrollService.getFinalList(this.detailForm.value).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.headerList = value.payload.headers

                    var headersInclude = ['thirteenMonth', 'fourteenMonth', 'fifteenMonth', 'sixteenMonth']

                    if (this.detailForm.value.payoutTypeID === 12720) {
                        this.employeeDetailColumns = this.employeeDetailColumns.filter(header => {
                            return !(headersInclude.includes(header.key) && value.payload.list[header.key] !== true);
                        });
                        if (this.iseditdd) {
                            this.detailForm.get('recurringEarnings').setValue(value.payload.headers.recurringEarnings)
                            this.detailForm.get('recurringDeduction').setValue(value.payload.headers.recurringDeduction)
                            this.detailForm.get('loan').setValue(value.payload.headers.loan)
                            this.detailForm.get('statutory').setValue(value.payload.headers.statutory)
                        }
                        this.employeeDetailSource = value.payload.data;

                    } else if (this.detailForm.value.payoutTypeID === 12723) {
                        this.thirteenmonthDetailColumns = this.thirteenmonthDetailColumns.filter(header => {
                            return !(headersInclude.includes(header.key) && value.payload.list[header.key] !== true);
                        });
                        this.thirteenmonthDetailSource = value.payload.data;
                    } else if (this.iseditdd && this.detailForm.value.payoutTypeID === 12722) {
                        this.detailForm.get('recurringEarnings').setValue(value.payload.headers.recurringEarnings)
                        this.detailForm.get('recurringDeduction').setValue(value.payload.headers.recurringDeduction)
                        this.detailForm.get('tax').setValue(value.payload.headers.tax)
                        this.detailForm.get('loan').setValue(value.payload.headers.loan)
                        this.detailForm.get('statutory').setValue(value.payload.headers.statutory)
                    }
                    this.detailForm.value.payoutTypeID === 12719 && this.weeklyDisplay ? this.regularWeeklySource = value.payload.data :
                        this.detailForm.value.payoutTypeID === 12722 ? this.specialDetailSource = value.payload.data :
                            this.detailForm.value.payoutTypeID === 12721 ? this.maternityDetailSource = value.payload.data : ""
                    this.totalRowsDetail = value.payload.totalRows
                    this.finalFilter = false
                    this.listFilter = false

                    this.cdr.detectChanges();
                }
            }
        })
    }


    //   pgMainRequest(){
    //     var detail = this.detailForm.value


    //     detail.cutoffID = this.detailForm.value.cutoffID
    //     var date = new Date(this.detailForm.value.payoutDateDisplay)
    //     date.setDate(date.getDate() + 1)
    //     detail.payoutDateDisplay = date;
    // }

    editPanel(form) {
        this.request.SearchColumn = []
        if (Array.isArray(form.value.employeeName)) {
            form.value.employeeName.forEach(val => {
                this.request.SearchColumn.push({
                    "key": "employeeId",
                    "value": val + "",
                    "type": 2
                })
            });
            this.request.SearchColumn.push(
                {
                    "key": 'statusId',
                    "value": form.value.status + "",
                    "type": 1
                }
            )
            this.tableFilter = this.request.SearchColumn
        }
    }

    refresh(form) {
        form.get("employeeName").setValue([])
        form.get("status").setValue("")
        this.tableFilter = []
    }

    forListview() {
        myData.bypass = false
    }

    showMe(value, find) {
        return GF.IsEqual(value, find)
    }

    // Dynamic Upload
    DynamicUploadFile(event, id, source, control) {
        let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
        var fileName = event.target.files[0].name;
        this.fileName = fileName.slice(0, fileName.lastIndexOf('.'));
        this.payrollTypeId = this.detailForm.value.payoutTypeID
        element.setAttribute('value', fileName)
        this.files = event.target.files;

        var payrollcode = this.detailForm.value.payrollCode

        var ctr = {
            'lT': ['LoanSource', true],
            'lTAB': ['LoanABSource', true],
            'lE': ['LoanESource', true],
        }

        for (var i = 0; i < event.target.files.length; i++) {
            var cons = ctr[control]
            this[cons[0]] = []
            this[cons[0]].push({ id: 0, checkbox: false, file: event.target.files[0] });
            this.buttonDisabled = this[cons[1]]
        }

        this.fileService.postUploadHandler(this.dropdowntypeid, this.files, this.fileName, this.isSave, this.uploadid, this.payrollTypeId, payrollcode, this.isadj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.loading = true
                    this.buttonDisabled = false

                    // Extract Method
                    this.DynamicExtractFile(event.target.files[0], event.target.files[0].name, source)

                    this.successMessage.title = "Success!"
                    this.successMessage.message = "You can now view and save your file."
                    this.successMessage.actions.confirm.label = "Ok"
                    this.message.open(this.successMessage);
                    this.uploadid = value.message

                    // Viewing Method
                    this.DynamicUploadView(true, control)

                } else {
                    this.loading = true
                    this.saving = true
                    this.buttonDisabled = false
                    this.LoanSource = []
                    this.failedMessage.title = "Failed!"
                    this.failedMessage.message = "Incorrect loans file format!"
                    this.failedMessage.actions.confirm.label = "Ok"
                    this.message.open(this.failedMessage);
                    this.loading = false

                }
            }
        });
        this.loading = false
    }

    DynamicExtractFile(files, filename, source) {
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(files);
        reader.onload = (e: any) => {
            /* create workbook */
            const binarystr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary', cellDates: true, dateNF: 'yyyy-mm-dd' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { raw: false, defval: "" }); // to get 2d array pass 2nd parameter as object {header: 1}

            this[source] = [...data.map((x: any) => ({ filename: filename, ...x })), ...this[source]]
        }
    }

    DynamicUploadView(next, control) {
        this.fileService.getUploadHandlerView(this.dropdowntypeid, 0, this.request, this.uploadid, this.isadj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.totalRows = value.payload.totalRows
                    this.tableRequest.Order = 'errorLogs'
                    this.errorLogs = value.payload.isError

                    if (GF.IsEqual(this.dropdowntypeid, [12704, 12703, 12686])) {
                        this.columnHideT = this.errorLogs
                    }
                    if (GF.IsEqual(this.dropdowntypeid, [22862])) {
                        this.columnHideE = this.errorLogs
                    }
                    if (GF.IsEqual(this.dropdowntypeid, [22863])) {
                        this.columnHideD = this.errorLogs
                    }
                    if (GF.IsEqual(this.dropdowntypeid, [30002])) {
                        this.columnHideL = this.errorLogs
                    }
                    if (GF.IsEqual(this.dropdowntypeid, [30610])) {
                        this.columnHideG = this.errorLogs
                    }

                    var ctr = {
                        'utkT': 'timekeepingSource',
                        'tkt': 'timekeepingSource',
                        'tka': 'timekeepingABSource',
                        'eT': 'earningSource',
                        'eTAB': 'earningABSource',
                        'ueT': 'earningUpload',
                        'eE': 'earningESource',
                        'dT': 'deductionSource',
                        'dTAB': 'deductionABSource',
                        'dE': 'deductionESource',
                        'udT': 'deductionUpload',
                        'lT': 'loanSource',
                        'lTAB': 'loanABSource',
                        'lE': 'loanESource',
                        'ugT': 'govconSource',
                    }

                    if (next) {
                        this.data = value.payload.data
                        this[ctr[control]] = value.payload.data
                    } else {
                        this.data = value.payload.data
                    }
                }
            }
        });
    }

    payid() {
        this.payrollId
        // this.dropdownRequest.id.push({dropdownID: [this.payrollId], dropdownTypeID: selected.dropdownTypeID, key: 'PayrollCode'})
        var subhierarchy = new DropdownRequest
        var list = subhierarchy.id = [];
        list = [
            { dropdownID: [this.payrollId], dropdownTypeID: -1, key: "PayrollCode" }
        ]
        subhierarchy.id = list
        return subhierarchy
    }

    dialogSetupAnnualized() {
        this.dialogAnnualized = this.dialog.open(DialogBoxAnnualizedComponent, {
            disableClose: true,
            data: {
                id: this.detailForm.value.id,
                code: this.detailForm.value.payrollCode,
            }
        });
    }

}
