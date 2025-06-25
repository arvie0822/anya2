import { UntypedFormControl } from "@angular/forms";

export class DropdownInput {
    industry: UntypedFormControl = new UntypedFormControl();
    bank:     UntypedFormControl = new UntypedFormControl();
    contact:  UntypedFormControl = new UntypedFormControl();
    email:    UntypedFormControl = new UntypedFormControl();
}

export class DropdownHierarchyRequest {
    search: string = ""
    start:  number = 0
    length: number = 20
    id: DropdownHierarchyID[] = [new DropdownHierarchyID]
    includeInactive: boolean = false
}

export class SearchHierarchy {
    Search: HierarchyList[] = []
}

export class HierarchyList {
    Type: number
    Key: string
    Value: any
}


export class DropdownRequest {
    search: string = ""
    start:  number = 0
    length: number = 20
    statusID: any[] = []
    id: DropdownID[] = [new DropdownID]
    includeInactive: boolean = false
}

export class HeirarchyDropdownRequest {
    search: string = ""
    payrollCode: string = ""
    start:  number = 0
    length: number = 20
    statusID : any[] = []
    id: DropdownHierarchyID[] = [new DropdownHierarchyID]
    includeInactive: boolean = true
}

export class HeirarchyPayrollDDRequest {
    search: string = ""
    payrollCode: string = ""
    start:  number = 0
    length: number = 20
    id: DropdownHierarchyID[] = []
    includeInactive: boolean = false
}

export class DropdownOptions {
    industryDef          : any[] = [];
    bankDef              : any[] = [];
    contactDef           : any[] = [];
    emailDef             : any[] = [];
    countryDef           : any[] = [];
    rdoOfficeDef         : any[] = [];
    rdoBranchDef         : any[] = [];
    pRegionDef           : any[] = [];
    regionDef            : any[] = [];
    cityDef              : any[] = [];
    provinceDef          : any[] = [];
    tkBasisDef           : any[] = [];
    dropdownTypeDef      : any[] = [];
    shiftCodeDef         : any[] = [];
    tagTypeDef           : any[] = [];
    dropdownNameDef      : any[] = [];
    branchDef            : any[] = [];
    shiftTypeDef         : any[] = [];
    salutationDef        : any[] = [];
    suffixDef            : any[] = [];
    genderDef            : any[] = [];
    bloodTypeDef         : any[] = [];
    nationalityDef       : any[] = [];
    religionDef          : any[] = [];
    civilStatusDef       : any[] = [];
    employeeStatusDef    : any[] = [];
    userDef              : any[] = [];
    occupationDef        : any[] = [];
    departmentDef        : any[] = [];
    costCenterDef        : any[] = [];
    divisionDef          : any[] = [];
    categoryDef          : any[] = [];
    payrollTypeDef       : any[] = [];
    confidentialDef      : any[] = [];
    payrollCategoryDef   : any[] = [];
    accessLevelDef       : any[] = [];
    approvalGroupDef     : any[] = [];
    offsetTypepDef       : any[] = [];
    overtimeTypeDef      : any[] = [];
    platformTypeDef      : any[] = [];
    holidayBasedDef      : any[] = [];
    leaveTypeDef         : any[] = [];
    accessTypeDef        : any[] = [];
    companynameDef       : any[] = [];
    breakTypeDef         : any[] = [];
    breakDeductionDef    : any[] = [];
    AccessControldef     : any[] = [];
    busnissUnitDef       : any[] = [];
    bandsDef             : any[] = [];
    bandsLevelDef        : any[] = [];
    bundydef             : any[] = [];
    relationshipDef      : any[] = [];
    employeeLevelDef     : any[] = [];
    bankAccountDef       : any[] = [];
    contractCurrencyDef  : any[] = [];
    subCompanyDef        : any[] = [];
    budgetClassDef       : any[] = [];
    Leavecategory        : any[] = [];
    leavestartdef        : any[] = [];
    leavestartfreqdef    : any[] = [];
    tenuredef            : any[] = [];
    Leavefilingdef       : any[] = [];
    monthlydef           : any[] = [];
    currencyPayrollDef   : any[] = [];
    moduledef            : any[] = [];
    auditdef             : any[] = [];
    employeedef          : any[] = [];
    allowedfilingdef     : any[] = [];
    Timekeepingdef       : any[] = [];
    empcatpayrolldef     : any[] = [];
    empcatleaveremoveonhold : any[]=[]
    pBranchWithCodeDef   : any[] = [];
    approvalDef   : any[] = [];
    leavedeductiondef : any[] = []
    paycodeDef   : any[] = [];
    statutoryDef         : any[] = [];
    calculationTypeDef   : any[] = [];
    sssBasisDef          : any[] = [];
    sssValueDef          : any[] = [];
    hdmfFirstCalcDef     : any[] = [];
    hdmfSecondCalcDef    : any[] = [];
    taxMonRateDef        : any[] = [];
    taxSemiRateDef       : any[] = [];
    taxWeekRateDef       : any[] = [];
    leaveStatutoryDef    : any[] = [];
    payrolldef           : any[] = []
    loantypedef          : any[] = [];
    cutoffdef            : any[] = [];
    deductiontypedef     : any[] = [];
    filingdef            : any[] = [];
    purposedef           : any[] = [];
    overtimeTimingDef    : any[] = [];
    attendanceStatutoryDef: any[] = [];
    taxSemiCustomDef     : any[] = [];
    payoutTypeDef        : any[] = [];
    earningsDef          : any[] = [];
    pezaClassificationDef : any[] = [];
    usetiful              : any[] = [];
    accountCodeDef        : any[] = [];
    accountNameDef        : any[] = [];
    finalPayStatDef       : any[] = [];
    beyondLogs            : any[] = [];
    indefinite            : any[] = [];
    emprequirdef          : any[] = [];
    dependentsDef         : any[] = [];
    allemplodef           : any[] = [];
    medicalcenter         : any[] = [];
    medicalexam           : any[] = [];
    xvisatype             : any[] = [];
    leveldef              : any[] = [];
    schooldef             : any[] = [];
    degreedef             : any[] = [];
    skillsdef             : any[] = [];
    Specializedef         : any[] = [];
    Licensedef            : any[] = [];
    awarddef              : any[] = [];
    trainingdef           : any[] = [];
    examdef               : any[] = [];
    incidentdef           : any[] = [];
    violationdef          : any[] = [];
    visatype              : any[] = [];
    offencedef            : any[] = [];
    sectiondef            : any[] = [];
    disciplinary          : any[] = [];
    requirmentdef         : any[] = [];
    requirmentsdef        : any[] = [];
    movementdef           : any[] = [];
    fieldnamedef          : any[] = [];
    unitpaydef            : any[] = [];
    durationdef           : any[] = [];
    displayshiftCodeDef   : any[] = [];
    newshiftCodeDef       : any[] = [];
    onHoldReasonDef       : any[] = [];
    conditiondef          : any[] = [];
    seminardef            : any[] = [];
    dynamicHeadersDef     : any[] = [];
    optionsdef            : any[] = [];
    optionsdeftenant      : any[] = [];
 }

export class DropdownID {
    dropdownID: number = 0
    dropdownTypeID: number = 0
}

export class DropdownHierarchyID {
    dropdownID: any = []
    dropdownTypeID: number = 0
    key: string = ""
}

export const dropdownType = [
    // {
    //     id: 1,
    //     description: "Industry",
    // },
    // {
    //     id: 2,
    //     description: "Bank",
    // },
    // {
    //     id: 11,
    //     description: "Department",
    // },
    {
        id: 138,
        description: "Reason",
    },
    {
        id: 12,
        description: "Email Type",
    },
    {
        id: 14,
        description: "Access Type",
    },
    {
        id: 17,
        description: "Approval Level",
    },
    {
        id: 22,
        description: "Contribution Group",
    },
    {
        id: 25,
        description: "Payroll Rate Group",
    },
    {
        id: 29,
        description: "Salutation",
    },
    {
        id: 30,
        description: "Suffix",
    },
    {
        id: 35,
        description: "Religion",
    },
    {
        id: 37,
        description: "Occupation",
    },
    {
        id: 38,
        description: "Department",
    },
    {
        id: 39,
        description: "Cost Center",
    },
    {
        id: 40,
        description: "Division",
    },
    {
        id: 81,
        description: "Report Group",
    },
    {
        id: 94,
        description: "Employee Type",
    },
    {
        id: 95,
        description: "Band",
    },
    {
        id: 96,
        description: "Level",
    },
    {
        id: 97,
        description: "Function",
    },
    {
        id: 98,
        description: "Budget Classification",
    },
    {
        id: 99,
        description: "Bank Account Type",
    },
    {
        id: 100,
        description: "Regional Code",
    },
    {
        id: 101,
        description: "Termination Reason",
    },
    {
        id: 102,
        description: "Termination Type",
    },
    {
        id: 103,
        description: "Managing Executive",
    },
    {
        id: 104,
        description: "Schedule Type",
    },
    {
        id: 106,
        description: "Break Deduction",
    },
    {
        id: 107,
        description: "Break Type",
    },
    {
        id: 108,
        description: "Access Control",
    },
    {
        id: 122,
        description: "Contract Currency",
    },
    {
        id: 110,
        description: "Business Unit",
    },
    {
        id: 121,
        description: "Currency Contract",
    },
    {
        id: 123,
        description: "Employee Level",
    },

      // smple dropdown admin

      {
        id: 111,
        description: "Band",
      },

      {
        id: 112,
        description: "Band Level",
      },

      {
        id: 113,
        description: "Budget Classification",
      },

     // sample-dropdown-nightdiff

     {
        id: 200,
        description: "Timekeeping Type",
    },
    {
        id: 201,
        description: "Schedule Policy",
    },
    {
        id: 202,
        description: "Within Shift",
    },
    {
        id: 203,
        description: "Break Type",
    },
    {
        id: 204,
        description: "Rounding Policy",
    },
    {
        id: 205,
        description: "Rounding",
    },


    // sample-dropdown-overtime
    {
        id: 206,
        description: "Must be filed",
    },
    {
        id: 207,
        description: "Render Type",
    },
    {
        id: 208,
        description: "Break Type",
    },
    {
        id: 209,
        description: "Rounding Policy",
    },
    {
        id: 210,
        description: "Rounding",
    },

    // sample-dropdown-restday

    {
        id: 211,
        description: "Restday Based",
    },
    {
        id: 212,
        description: "Required Shift",
    },
    {
        id: 213,
        description: "Need Filing",
    },
    {
        id: 214,
        description: "Render Type",
    },
    {
        id: 215,
        description: "Rounding Policy",
    },
    {
        id: 216,
        description: "Break Type",
    },
    {
        id: 217,
        description: "Rounding",
    },

    // sample-dropdown-holiday

    {
        id: 218,
        description: "Holiday Based",
    },
    {
        id: 219,
        description: "Holiday Type",
    },

    // sample-dropdown-tardiness

    {
        id: 220,
        description: "Combine Both",
    },
    {
        id: 221,
        description: "Tardy Grace Period Decaying",
    },
    {
        id: 222,
        description: "Rounding Policy",
    },
    {
        id: 223,
        description: "Tardy Rounding",
    },
    {
        id: 224,
        description: "Undertime Grace Period Decaying",
    },
    {
        id: 225,
        description: "Rounding Policy",
    },
    {
        id: 226,
        description: "Undertime Rounding",
    },

    // sample-dropdown-schedulehour

    {
        id: 227,
        description: "No Schedule Absent",
    },
    {
        id: 228,
        description: "Automatic Schedule",
    },
    {
        id: 229,
        description: "Based Hours Work",
    },
    {
        id: 230,
        description: "Use Biometrics In/Out",
    },
    {
        id: 231,
        description: "Auto Deduct Break",
    },
    {
        id: 232,
        description: "Break Type",
    },
    {
        id: 235,
        description: "Leave Type",
    },

    // sample-dropdown-category-timekeeping

    {
        id: 236,
        description: "Select Payroll Cutoff",
    },
    {
        id: 237,
        description: "Allowed Bundy",
    },

    {
        id: 238,
        description: "Select Allowed Overtime",
    },

    {
        id: 239,
        description: "Select Offset Reference",
    },
    {
        id: 240,
        description: "Select Holiday Based",
    },

    // sample-dropdown-category-payroll

    {
        id: 241,
        description: "Payroll Rates",
    },
    {
        id: 242,
        description: "Government Contribution Rates",
    },
    {
        id: 243,
        description: "Basis for SSS Deduction",
    },
    {
        id: 244,
        description: "Basis for Philhealth Deduction",
    },
    {
        id: 245,
        description: "Basis for Pagibig Deduction",
    },

    // sample-dropdown-breaktype

    {
        id: 246,
        description: "Break Type",
    },
    {
        id: 247,
        description: "Break Shift Hours Greater than 8",
    },
    {
        id: 248,
        description: "Overbreak Deduction",
    },
    {
        id: 249,
        description: "Break Hours Worked End",
    },
    {
        id: 250,
        description: "Break Hours Worked Gap",
    },
    {
        id: 251,
        description: "Break Shift Hours Greater than 8",
    },
    //sample companynamdef
    {
        id:300,
        description: "Company Name",
    },
    {
        id:301,
        description: "Documents",
    },
    {
        id:302,
        description: "Primary Signatory",
    },

    {
        id:303,
        description: "Backup",
    },
    {
        id:304,
        description: "Subsidiary Of",
    },
    {
        id:305,
        description: "Active",
    },
    {
        id:306,
        description: "Bonus Type",
    },
    {
        id:307,
        description: "Calculation Basis",
    },
    {
        id:308,
        description: "Earnings",
    },
    {
        id:309,
        description: "Deduct",
    },
    {
        id: 133,
        description: "Account Code",
    },
    {
        id: 134,
        description: "Account Name",
    },
]

export const dropdownTypeFix = [
    {
        id: 1,
        description: "Industry",
    },
    {
        id: 2,
        description: "Bank",
    },
    {
        id: 3,
        description: "Country",
    },
    {
        id: 4,
        description: "Revenue District Office",
    },
    {
        id: 5,
        description: "Revenue District Office Branch",
    },
    {
        id: 6,
        description: "Pag-ibig Region",
    },
    {
        id: 7,
        description: "Pag-ibig Branch with Code",
    },
    {
        id: 8,
        description: "Pag-ibig Code",
    },
    {
        id: 9,
        description: "City",
    },
    {
        id: 10,
        description: "Region",
    },
    {
        id: 11,
        description: "Department",
    },
    {
        id: 13,
        description: "Module Type",
    },
    {
        id: 15,
        description: "Report",
    },
    {
        id: 16,
        description: "Data Upload",
    },

    {
        id: 18,
        description: "Module List",
    },
    {
        id: 19,
        description: "Holiday Type",
    },
    {
        id: 20,
        description: "Holiday Base",
    },
    {
        id: 21,
        description: "Deduction Basis",
    },
    {
        id: 23,
        description: "Contribution Type",
    },
    {
        id: 24,
        description: "Transaction Type",
    },
    {
        id: 26,
        description: "Recurring Type",
    },
    {
        id: 27,
        description: "Deduction Type",
    },
    {
        id: 28,
        description: "Government Type",
    },
    {
        id: 31,
        description: "Gender",
    },
    {
        id: 32,
        description: "Nationality",
    },
    {
        id: 33,
        description: "Civil Status",
    },
    {
        id: 34,
        description: "Blood Type",
    },
    {
        id: 36,
        description: "Employee Status",
    },
    {
        id: 41,
        description: "Payroll Type",
    },
    {
        id: 42,
        description: "Confidentiality",
    },
    {
        id: 43,
        description: "Leave Type Gender",
    },
    {
        id: 44,
        description: "Leave Filed",
    },
    {
        id: 45,
        description: "Leave Start",
    },
    {
        id: 46,
        description: "Frequency",
    },
    {
        id: 47,
        description: "Leave Priority to Convert",
    },
    {
        id: 48,
        description: "Amount Type",
    },
    {
        id: 49,
        description: "Contribution Payroll Type",
    },
    {
        id: 50,
        description: "Tag Type",
    },
    {
        id: 51,
        description: "Movement Type",
    },
    {
        id: 52,
        description: "Overtime Type",
    },
    {
        id: 53,
        description: "Cut Off",
    },
    {
        id: 54,
        description: "Month",
    },
    {
        id: 55,
        description: "Tax Status",
    },
    {
        id: 56,
        description: "Allowance Timing",
    },
    {
        id: 57,
        description: "Deduction Timing",
    },
    {
        id: 58,
        description: "Loan Type",
    },
    {
        id: 59,
        description: "Loan Timing",
    },
    {
        id: 60,
        description: "Government Timing",
    },
    {
        id: 61,
        description: "Province",
    },
    {
        id: 62,
        description: "Timekeeping Generation Reference",
    },
    {
        id: 63,
        description: "Coe Request Purpose",
    },
    {
        id: 64,
        description: "Leave Balance Type",
    },
    {
        id: 65,
        description: "Report Category",
    },
    {
        id: 66,
        description: "Payroll Basis",
    },
    {
        id: 67,
        description: "Report Type",
    },
    {
        id: 68,
        description: "Platform",
    },
    {
        id: 69,
        description: "Payout Type",
    },
    {
        id: 70,
        description: "Overtime Filing Type",
    },
    {
        id: 71,
        description: "Increment Rounding",
    },
    {
        id: 72,
        description: "Gov't Calculation Setting",
    },
    {
        id: 73,
        description: "PaymentTerms",
    },
    {
        id: 74,
        description: "Payroll Generation Type",
    },
    {
        id: 75,
        description: "Break Deduction Type",
    },
    {
        id: 76,
        description: "Schedule Policy",
    },
    {
        id: 77,
        description: "Wage Type",
    },
    {
        id: 78,
        description: "OT Expiration Reference",
    },
    {
        id: 79,
        description: "Leave Filing Type",
    },
    {
        id: 80,
        description: "Holiday Base Type",
    },
    {
        id: 82,
        description: "Leave Balance Deduction Type",
    },
    {
        id: 83,
        description: "Hours Work Base",
    },
    {
        id: 84,
        description: "Overtime Render Type",
    },
    {
        id: 85,
        description: "Rest Day Base",
    },
    {
        id: 87,
        description: "Rest Day Render Type",
    },
    {
        id: 88,
        description: "Timekeeping Detail Base",
    },
    {
        id: 89,
        description: "Timekeeping Category Detail",
    },
    {
        id: 90,
        description: "Leave Category",
    },
    {
        id: 91,
        description: "Recurring Category Earnings",
    },
    {
        id: 92,
        description: "Recurring Category Deductions",
    },
    {
        id: 93,
        description: "Leave Type Default",
    },
    {
        id: 1000,
        description: "Shift Code",
    },
    {
        id: 1001,
        description: "Branch",
    },
    {
        id: 1002,
        description: "Alternate Week",
    },
    {
        id: 1003,
        description: "Supervisor",
    },
    {
        id: 1004,
        description: "Category",
    },
    {
        id: 1005,
        description: "Payroll Category",
    },

     // ====work informatiom====
    {
        id: 1006,
        description: "Employee Level",
    },
    {
        id: 1007,
        description: "Tk Category",
    },
    {
        id: 1008,
        description: "Access",
    },
    {
        id: 1009,
        description: "Unit",
    },
    {
        id: 1010,
        description: "Band",
    },
    {
        id: 1011,
        description: "Type",
    },

    // ====payroll===

    {
        id: 1012,
        description: "Timekeeping",
    },
    {
        id: 1013,
        description: "Back Account Type",
    },

    // ====holiday===

    {
        id: 1014,
        description: "Month",
    },
    {
        id: 1015,
        description: "Year",
    },
    {
        id: 1016,
        description: "Date",
    },

    // ====Dropdown settings===
    {
        id: 1017,
        description: "Dropdown Name",
    },
    {
        id: 1019,
        description: "Status",
    },
    // ====Statutory===
    {
        id: 125,
        description: "Statutory",
    },
    {
        id: 126,
        description: "Calculation Type",
    },
    {
        id: 127,
        description: "Basis",
    },
    {
        id: 128,
        description: "Calculation",
    },
    {
        id: 129,
        description: "Calculation",
    },
    {
        id: 130,
        description: "Tax Rate",
    },
    {
        id: 141,
        description: "Calculation Basis",
    },
    {
        id: 142,
        description: "Bonus Type",
    },
    {
        id: 118,
        description: "Tour",
    },
    {
        id: 146,
        description: "Calculation Basis",
    },
    {
        id: 149,
        description: "Allow filing",
    },
    {
        id: 180,
        description: "Tax Basis",
    },
    ];

export const dropdownFix = [
]

// export const dropdownFix = [
//     {
//         id: 1,
//         type_id: 99000001,
//         description: "Placeholder 1",
//     },
//     {
//         id: 2,
//         type_id: 99000002,
//         description: "Placeholder 2",
//     },
//     {
//         id: 3,
//         type_id: 3,
//         description: "Philippines",
//     },
//     {
//         id: 4,
//         type_id: 4,
//         description: "1",
//     },
//     {
//         id: 5,
//         type_id: 5,
//         description: "Laoag City, Ilocos Norte  ",
//     },
//     {
//         id: 6,
//         type_id: 6,
//         description: "Region 1",
//     },
//     {
//         id: 7,
//         type_id: 7,
//         description: "Pasig",
//     },
//     {
//         id: 8,
//         type_id: 8,
//         description: "1",
//     },
//     {
//         id: 9,
//         type_id: 9,
//         description: "Port Area",
//     },
//     {
//         id: 10,
//         type_id: 99000010,
//         description: "Placeholder 10",
//     },
//     {
//         id: 11,
//         type_id: 99000011,
//         description: "Placeholder 11",
//     },
//     {
//         id: 12,
//         type_id: 99000012,
//         description: "Placeholder 12",
//     },
//     {
//         id: 13,
//         type_id: 99000013,
//         description: "Placeholder 13",
//     },
//     {
//         id: 14,
//         type_id: 3,
//         description: "Afghanistan  ",
//     },
//     {
//         id: 15,
//         type_id: 4,
//         description: "2",
//     },
//     {
//         id: 16,
//         type_id: 5,
//         description: "Vigan, Ilocos Sur  ",
//     },
//     {
//         id: 17,
//         type_id: 5,
//         description: "San Fernando, La Union  ",
//     },
//     {
//         id: 18,
//         type_id: 6,
//         description: "NCR",
//     },
//     {
//         id: 19,
//         type_id: 7,
//         description: "Makati",
//     },
//     {
//         id: 20,
//         type_id: 8,
//         description: "9999",
//     },
//     {
//         id: 21,
//         type_id: 9,
//         description: "Santa Ana",
//     },
//     {
//         id: 22,
//         type_id: 9,
//         description: "Quiapo",
//     },
//     {
//         id: 23,
//         type_id: 9,
//         description: "San Nicolas",
//     },
//     {
//         id: 24,
//         type_id: 9,
//         description: "Santa Cruz",
//     },
//     {
//         id: 25,
//         type_id: 10,
//         description: "NCR - National Capital Region  ",
//     },
//     {
//         id: 26,
//         type_id: 10,
//         description: "ARMM - Autonomous Region in Muslim Mindanao  ",
//     },
//     {
//         id: 27,
//         type_id: 99000027,
//         description: "Placeholder 27",
//     },
//     {
//         id: 28,
//         type_id: 99000028,
//         description: "Placeholder 28",
//     },
//     {
//         id: 29,
//         type_id: 99000029,
//         description: "Placeholder 29",
//     },
//     {
//         id: 30,
//         type_id: 99000030,
//         description: "Placeholder 30",
//     },
//     {
//         id: 31,
//         type_id: 13,
//         description: "Module",
//     },
//     {
//         id: 32,
//         type_id: 13,
//         description: "Report",
//     },
//     {
//         id: 33,
//         type_id: 13,
//         description: "Data Upload",
//     },
//     {
//         id: 34,
//         type_id: 99000034,
//         description: "Placeholder 34",
//     },
//     {
//         id: 35,
//         type_id: 99000035,
//         description: "Placeholder 35",
//     },
//     {
//         id: 36,
//         type_id: 99000036,
//         description: "Placeholder 36",
//     },
//     {
//         id: 37,
//         type_id: 99000037,
//         description: "Placeholder 37",
//     },
//     {
//         id: 38,
//         type_id: 15,
//         description: "BIR Form 1601C - Monthly Remittance",
//     },
//     {
//         id: 39,
//         type_id: 15,
//         description: "BIR Form 1604C - Annual Information Return of Income taxes",
//     },
//     {
//         id: 40,
//         type_id: 16,
//         description: "Dropdown Settings",
//     },
//     {
//         id: 41,
//         type_id: 16,
//         description: "Employee",
//     },
//     {
//         id: 42,
//         type_id: 19,
//         description: "Regular Holiday",
//     },
//     {
//         id: 43,
//         type_id: 19,
//         description: "Special Holiday",
//     },
//     {
//         id: 44,
//         type_id: 20,
//         description: "Calendar Days",
//     },
//     {
//         id: 45,
//         type_id: 20,
//         description: "Working Days",
//     },
//     {
//         id: 46,
//         type_id: 21,
//         description: "Basic Salary",
//     },
//     {
//         id: 47,
//         type_id: 21,
//         description: "Gross Pay",
//     },
//     {
//         id: 48,
//         type_id: 23,
//         description: "SSS Table",
//     },
//     {
//         id: 49,
//         type_id: 23,
//         description: "Pagibig Table",
//     },
//     {
//         id: 50,
//         type_id: 23,
//         description: "PhilHealth Table",
//     },
//     {
//         id: 51,
//         type_id: 24,
//         description: "Add",
//     },
//     {
//         id: 52,
//         type_id: 24,
//         description: "Edit",
//     },
//     {
//         id: 53,
//         type_id: 24,
//         description: "Delete",
//     },
//     {
//         id: 54,
//         type_id: 24,
//         description: "Approved",
//     },
//     {
//         id: 55,
//         type_id: 24,
//         description: "Disapproved",
//     },
//     {
//         id: 56,
//         type_id: 24,
//         description: "Cancelled",
//     },
//     {
//         id: 57,
//         type_id: 26,
//         description: "Deduction",
//     },
//     {
//         id: 58,
//         type_id: 26,
//         description: "Addition",
//     },
//     {
//         id: 59,
//         type_id: 27,
//         description: "Government Deduction",
//     },
//     {
//         id: 60,
//         type_id: 27,
//         description: "Company Deduction",
//     },
//     {
//         id: 61,
//         type_id: 28,
//         description: "SSS Deduction",
//     },
//     {
//         id: 62,
//         type_id: 28,
//         description: "PhilHealth Deduction",
//     },
//     {
//         id: 63,
//         type_id: 28,
//         description: "Pagibig Deduction",
//     },
//     {
//         id: 64,
//         type_id: 32,
//         description: "PHILIPPINES  ",
//     },
//     {
//         id: 65,
//         type_id: 32,
//         description: "AFGHANISTAN  ",
//     },
//     {
//         id: 66,
//         type_id: 41,
//         description: "Daily",
//     },
//     {
//         id: 67,
//         type_id: 41,
//         description: "Semi-Monthly",
//     },
//     {
//         id: 68,
//         type_id: 41,
//         description: "Monthly",
//     },
//     {
//         id: 69,
//         type_id: 42,
//         description: "Confidential",
//     },
//     {
//         id: 70,
//         type_id: 42,
//         description: "Non-Confidential",
//     },
//     {
//         id: 71,
//         type_id: 24,
//         description: "View",
//     },
//     {
//         id: 72,
//         type_id: 43,
//         description: "All",
//     },
//     {
//         id: 73,
//         type_id: 43,
//         description: "Male",
//     },
//     {
//         id: 74,
//         type_id: 43,
//         description: "Female",
//     },
//     {
//         id: 75,
//         type_id: 44,
//         description: "Standard 8 Hours",
//     },
//     {
//         id: 76,
//         type_id: 44,
//         description: "Schedule Hours",
//     },
//     {
//         id: 77,
//         type_id: 45,
//         description: "Date Hired",
//     },
//     {
//         id: 78,
//         type_id: 45,
//         description: "Regularization Date",
//     },
//     {
//         id: 79,
//         type_id: 46,
//         description: "Monthly",
//     },
//     {
//         id: 80,
//         type_id: 46,
//         description: "Yearly",
//     },
//     {
//         id: 81,
//         type_id: 47,
//         description: "Taxable",
//     },
//     {
//         id: 82,
//         type_id: 47,
//         description: "Non-Taxable",
//     },
//     {
//         id: 83,
//         type_id: 48,
//         description: "Percentage",
//     },
//     {
//         id: 84,
//         type_id: 48,
//         description: "Fix Amount",
//     },
//     {
//         id: 85,
//         type_id: 49,
//         description: "Daily",
//     },
//     {
//         id: 86,
//         type_id: 49,
//         description: "Semi-Monthly",
//     },
//     {
//         id: 87,
//         type_id: 49,
//         description: "Monthly",
//     },
//     {
//         id: 88,
//         type_id: 49,
//         description: "Annual",
//     },
//     {
//         id: 89,
//         type_id: 50,
//         description: "Employee",
//     },
//     {
//         id: 90,
//         type_id: 50,
//         description: "Department",
//     },
//     {
//         id: 91,
//         type_id: 23,
//         description: "Tax Table",
//     },
//     {
//         id: 92,
//         type_id: 32,
//         description: "ALAND ISLANDS  ",
//     },
//     {
//         id: 93,
//         type_id: 36,
//         description: "Regular",
//     },
//     {
//         id: 94,
//         type_id: 36,
//         description: "Probationary",
//     },
//     {
//         id: 95,
//         type_id: 36,
//         description: "Terminated",
//     },
//     {
//         id: 96,
//         type_id: 51,
//         description: "Personal Information",
//     },
//     {
//         id: 97,
//         type_id: 51,
//         description: "Work Information",
//     },
//     {
//         id: 98,
//         type_id: 51,
//         description: "Payroll Information",
//     },
//     {
//         id: 99,
//         type_id: 51,
//         description: "Employee Schedule",
//     },
//     {
//         id: 100,
//         type_id: 51,
//         description: "Leave Trail",
//     },
//     {
//         id: 101,
//         type_id: 51,
//         description: "Allowance / Deduction",
//     },
//     {
//         id: 102,
//         type_id: 50,
//         description: "Branch",
//     },
//     {
//         id: 103,
//         type_id: 50,
//         description: "Company",
//     },
//     {
//         id: 104,
//         type_id: 52,
//         description: "Paid",
//     },
//     {
//         id: 105,
//         type_id: 52,
//         description: "Offset",
//     },
//     {
//         id: 106,
//         type_id: 99000106,
//         description: "Placeholder 106",
//     },
//     {
//         id: 107,
//         type_id: 53,
//         description: "First Cutoff",
//     },
//     {
//         id: 108,
//         type_id: 53,
//         description: "Second Cutoff",
//     },
//     {
//         id: 109,
//         type_id: 54,
//         description: "January",
//     },
//     {
//         id: 110,
//         type_id: 54,
//         description: "February",
//     },
//     {
//         id: 111,
//         type_id: 54,
//         description: "March",
//     },
//     {
//         id: 112,
//         type_id: 54,
//         description: "April",
//     },
//     {
//         id: 113,
//         type_id: 54,
//         description: "May",
//     },
//     {
//         id: 114,
//         type_id: 54,
//         description: "June",
//     },
//     {
//         id: 115,
//         type_id: 54,
//         description: "July",
//     },
//     {
//         id: 116,
//         type_id: 54,
//         description: "August",
//     },
//     {
//         id: 117,
//         type_id: 54,
//         description: "September",
//     },
//     {
//         id: 118,
//         type_id: 54,
//         description: "October",
//     },
//     {
//         id: 119,
//         type_id: 54,
//         description: "November",
//     },
//     {
//         id: 120,
//         type_id: 54,
//         description: "December",
//     },
//     {
//         id: 121,
//         type_id: 16,
//         description: "Employee Information",
//     },
//     {
//         id: 122,
//         type_id: 16,
//         description: "Change Log",
//     },
//     {
//         id: 123,
//         type_id: 16,
//         description: "Change Schedule",
//     },
//     {
//         id: 124,
//         type_id: 16,
//         description: "Official Business",
//     },
//     {
//         id: 125,
//         type_id: 16,
//         description: "Leave",
//     },
//     {
//         id: 126,
//         type_id: 16,
//         description: "Overtime",
//     },
//     {
//         id: 127,
//         type_id: 16,
//         description: "Offset",
//     },
//     {
//         id: 128,
//         type_id: 3,
//         description: "Aland Islands",
//     },
//     {
//         id: 129,
//         type_id: 3,
//         description: "Albania",
//     },
//     {
//         id: 130,
//         type_id: 3,
//         description: "Algeria",
//     },
//     {
//         id: 131,
//         type_id: 3,
//         description: "American Samoa",
//     },
//     {
//         id: 132,
//         type_id: 3,
//         description: "Andorra",
//     },
//     {
//         id: 133,
//         type_id: 3,
//         description: "Angola",
//     },
//     {
//         id: 134,
//         type_id: 3,
//         description: "Anguilla",
//     },
//     {
//         id: 135,
//         type_id: 3,
//         description: "Antarctica",
//     },
//     {
//         id: 136,
//         type_id: 3,
//         description: "Antigua and Barbuda",
//     },
//     {
//         id: 137,
//         type_id: 3,
//         description: "Argentina",
//     },
//     {
//         id: 138,
//         type_id: 3,
//         description: "Armenia",
//     },
//     {
//         id: 139,
//         type_id: 3,
//         description: "Aruba",
//     },
//     {
//         id: 140,
//         type_id: 3,
//         description: "Australia",
//     },
//     {
//         id: 141,
//         type_id: 3,
//         description: "Austria",
//     },
//     {
//         id: 142,
//         type_id: 3,
//         description: "Azerbaijan",
//     },
//     {
//         id: 143,
//         type_id: 3,
//         description: "Bahamas",
//     },
//     {
//         id: 144,
//         type_id: 3,
//         description: "Bahrain",
//     },
//     {
//         id: 145,
//         type_id: 3,
//         description: "Bangladesh",
//     },
//     {
//         id: 146,
//         type_id: 3,
//         description: "Barbados",
//     },
//     {
//         id: 147,
//         type_id: 3,
//         description: "Belarus",
//     },
//     {
//         id: 148,
//         type_id: 3,
//         description: "Belgium",
//     },
//     {
//         id: 149,
//         type_id: 3,
//         description: "Belize",
//     },
//     {
//         id: 150,
//         type_id: 3,
//         description: "Benin",
//     },
//     {
//         id: 151,
//         type_id: 3,
//         description: "Bermuda",
//     },
//     {
//         id: 152,
//         type_id: 3,
//         description: "Bhutan",
//     },
//     {
//         id: 153,
//         type_id: 3,
//         description: "Bolivia",
//     },
//     {
//         id: 154,
//         type_id: 3,
//         description: "Bosnia and Herzegovina",
//     },
//     {
//         id: 155,
//         type_id: 3,
//         description: "Botswana",
//     },
//     {
//         id: 156,
//         type_id: 3,
//         description: "Bouvet Island",
//     },
//     {
//         id: 157,
//         type_id: 3,
//         description: "Brazil",
//     },
//     {
//         id: 158,
//         type_id: 3,
//         description: "British Virgin Islands",
//     },
//     {
//         id: 159,
//         type_id: 3,
//         description: "British Indian Ocean Territory",
//     },
//     {
//         id: 160,
//         type_id: 3,
//         description: "Brunei Darussalam",
//     },
//     {
//         id: 161,
//         type_id: 3,
//         description: "Bulgaria",
//     },
//     {
//         id: 162,
//         type_id: 3,
//         description: "Burkina Faso",
//     },
//     {
//         id: 163,
//         type_id: 3,
//         description: "Burundi",
//     },
//     {
//         id: 164,
//         type_id: 3,
//         description: "Cambodia",
//     },
//     {
//         id: 165,
//         type_id: 3,
//         description: "Cameroon",
//     },
//     {
//         id: 166,
//         type_id: 3,
//         description: "Canada",
//     },
//     {
//         id: 167,
//         type_id: 3,
//         description: "Cape Verde",
//     },
//     {
//         id: 168,
//         type_id: 3,
//         description: "Cayman Islands ",
//     },
//     {
//         id: 169,
//         type_id: 3,
//         description: "Central African Republic",
//     },
//     {
//         id: 170,
//         type_id: 3,
//         description: "Chad",
//     },
//     {
//         id: 171,
//         type_id: 3,
//         description: "Chile",
//     },
//     {
//         id: 172,
//         type_id: 3,
//         description: "China",
//     },
//     {
//         id: 173,
//         type_id: 3,
//         description: "Hong Kong, SAR China",
//     },
//     {
//         id: 174,
//         type_id: 3,
//         description: "Macao, SAR China",
//     },
//     {
//         id: 175,
//         type_id: 3,
//         description: "Christmas Island",
//     },
//     {
//         id: 176,
//         type_id: 3,
//         description: "Cocos (Keeling) Islands",
//     },
//     {
//         id: 177,
//         type_id: 3,
//         description: "Colombia",
//     },
//     {
//         id: 178,
//         type_id: 3,
//         description: "Comoros",
//     },
//     {
//         id: 179,
//         type_id: 3,
//         description: "Congo (Brazzaville)",
//     },
//     {
//         id: 180,
//         type_id: 3,
//         description: "Congo, (Kinshasa)",
//     },
//     {
//         id: 181,
//         type_id: 3,
//         description: "Cook Islands ",
//     },
//     {
//         id: 182,
//         type_id: 3,
//         description: "Costa Rica",
//     },
//     {
//         id: 183,
//         type_id: 3,
//         description: "Côte d Ivoire",
//     },
//     {
//         id: 184,
//         type_id: 3,
//         description: "Croatia",
//     },
//     {
//         id: 185,
//         type_id: 3,
//         description: "Cuba",
//     },
//     {
//         id: 186,
//         type_id: 3,
//         description: "Cyprus",
//     },
//     {
//         id: 187,
//         type_id: 3,
//         description: "Czech Republic",
//     },
//     {
//         id: 188,
//         type_id: 3,
//         description: "Denmark",
//     },
//     {
//         id: 189,
//         type_id: 3,
//         description: "Djibouti",
//     },
//     {
//         id: 190,
//         type_id: 3,
//         description: "Dominica",
//     },
//     {
//         id: 191,
//         type_id: 3,
//         description: "Dominican Republic",
//     },
//     {
//         id: 192,
//         type_id: 3,
//         description: "Ecuador",
//     },
//     {
//         id: 193,
//         type_id: 3,
//         description: "Egypt",
//     },
//     {
//         id: 194,
//         type_id: 3,
//         description: "El Salvador",
//     },
//     {
//         id: 195,
//         type_id: 3,
//         description: "Equatorial Guinea",
//     },
//     {
//         id: 196,
//         type_id: 3,
//         description: "Eritrea",
//     },
//     {
//         id: 197,
//         type_id: 3,
//         description: "Estonia",
//     },
//     {
//         id: 198,
//         type_id: 3,
//         description: "Ethiopia",
//     },
//     {
//         id: 199,
//         type_id: 3,
//         description: "Falkland Islands (Malvinas) ",
//     },
//     {
//         id: 200,
//         type_id: 3,
//         description: "Faroe Islands",
//     },
//     {
//         id: 201,
//         type_id: 3,
//         description: "Fiji",
//     },
//     {
//         id: 202,
//         type_id: 3,
//         description: "Finland",
//     },
//     {
//         id: 203,
//         type_id: 3,
//         description: "France",
//     },
//     {
//         id: 204,
//         type_id: 3,
//         description: "French Guiana",
//     },
//     {
//         id: 205,
//         type_id: 3,
//         description: "French Polynesia",
//     },
//     {
//         id: 206,
//         type_id: 3,
//         description: "French Southern Territories",
//     },
//     {
//         id: 207,
//         type_id: 3,
//         description: "Gabon",
//     },
//     {
//         id: 208,
//         type_id: 3,
//         description: "Gambia",
//     },
//     {
//         id: 209,
//         type_id: 3,
//         description: "Georgia",
//     },
//     {
//         id: 210,
//         type_id: 3,
//         description: "Germany",
//     },
//     {
//         id: 211,
//         type_id: 3,
//         description: "Ghana",
//     },
//     {
//         id: 212,
//         type_id: 3,
//         description: "Gibraltar ",
//     },
//     {
//         id: 213,
//         type_id: 3,
//         description: "Greece",
//     },
//     {
//         id: 214,
//         type_id: 3,
//         description: "Greenland",
//     },
//     {
//         id: 215,
//         type_id: 3,
//         description: "Grenada",
//     },
//     {
//         id: 216,
//         type_id: 3,
//         description: "Guadeloupe",
//     },
//     {
//         id: 217,
//         type_id: 3,
//         description: "Guam",
//     },
//     {
//         id: 218,
//         type_id: 3,
//         description: "Guatemala",
//     },
//     {
//         id: 219,
//         type_id: 3,
//         description: "Guernsey",
//     },
//     {
//         id: 220,
//         type_id: 3,
//         description: "Guinea",
//     },
//     {
//         id: 221,
//         type_id: 3,
//         description: "Guinea-Bissau",
//     },
//     {
//         id: 222,
//         type_id: 3,
//         description: "Guyana",
//     },
//     {
//         id: 223,
//         type_id: 3,
//         description: "Haiti",
//     },
//     {
//         id: 224,
//         type_id: 3,
//         description: "Heard and Mcdonald Islands",
//     },
//     {
//         id: 225,
//         type_id: 3,
//         description: "Holy See (Vatican City State)",
//     },
//     {
//         id: 226,
//         type_id: 3,
//         description: "Honduras",
//     },
//     {
//         id: 227,
//         type_id: 3,
//         description: "Hungary",
//     },
//     {
//         id: 228,
//         type_id: 3,
//         description: "Iceland",
//     },
//     {
//         id: 229,
//         type_id: 3,
//         description: "India",
//     },
//     {
//         id: 230,
//         type_id: 3,
//         description: "Indonesia",
//     },
//     {
//         id: 231,
//         type_id: 3,
//         description: "Iran, Islamic Republic of",
//     },
//     {
//         id: 232,
//         type_id: 3,
//         description: "Iraq",
//     },
//     {
//         id: 233,
//         type_id: 3,
//         description: "Ireland",
//     },
//     {
//         id: 234,
//         type_id: 3,
//         description: "Isle of Man ",
//     },
//     {
//         id: 235,
//         type_id: 3,
//         description: "Israel",
//     },
//     {
//         id: 236,
//         type_id: 3,
//         description: "Italy",
//     },
//     {
//         id: 237,
//         type_id: 3,
//         description: "Jamaica",
//     },
//     {
//         id: 238,
//         type_id: 3,
//         description: "Japan",
//     },
//     {
//         id: 239,
//         type_id: 3,
//         description: "Jersey",
//     },
//     {
//         id: 240,
//         type_id: 3,
//         description: "Jordan",
//     },
//     {
//         id: 241,
//         type_id: 3,
//         description: "Kazakhstan",
//     },
//     {
//         id: 242,
//         type_id: 3,
//         description: "Kenya",
//     },
//     {
//         id: 243,
//         type_id: 3,
//         description: "Kiribati",
//     },
//     {
//         id: 244,
//         type_id: 3,
//         description: "Korea (North)",
//     },
//     {
//         id: 245,
//         type_id: 3,
//         description: "Korea (South)",
//     },
//     {
//         id: 246,
//         type_id: 3,
//         description: "Kuwait",
//     },
//     {
//         id: 247,
//         type_id: 3,
//         description: "Kyrgyzstan",
//     },
//     {
//         id: 248,
//         type_id: 3,
//         description: "Lao PDR",
//     },
//     {
//         id: 249,
//         type_id: 3,
//         description: "Latvia",
//     },
//     {
//         id: 250,
//         type_id: 3,
//         description: "Lebanon",
//     },
//     {
//         id: 251,
//         type_id: 3,
//         description: "Lesotho",
//     },
//     {
//         id: 252,
//         type_id: 3,
//         description: "Liberia",
//     },
//     {
//         id: 253,
//         type_id: 3,
//         description: "Libya",
//     },
//     {
//         id: 254,
//         type_id: 3,
//         description: "Liechtenstein",
//     },
//     {
//         id: 255,
//         type_id: 3,
//         description: "Lithuania",
//     },
//     {
//         id: 256,
//         type_id: 3,
//         description: "Luxembourg",
//     },
//     {
//         id: 257,
//         type_id: 3,
//         description: "Macedonia, Republic of",
//     },
//     {
//         id: 258,
//         type_id: 3,
//         description: "Madagascar",
//     },
//     {
//         id: 259,
//         type_id: 3,
//         description: "Malawi",
//     },
//     {
//         id: 260,
//         type_id: 3,
//         description: "Malaysia",
//     },
//     {
//         id: 261,
//         type_id: 3,
//         description: "Maldives",
//     },
//     {
//         id: 262,
//         type_id: 3,
//         description: "Mali",
//     },
//     {
//         id: 263,
//         type_id: 3,
//         description: "Malta",
//     },
//     {
//         id: 264,
//         type_id: 3,
//         description: "Marshall Islands",
//     },
//     {
//         id: 265,
//         type_id: 3,
//         description: "Martinique",
//     },
//     {
//         id: 266,
//         type_id: 3,
//         description: "Mauritania",
//     },
//     {
//         id: 267,
//         type_id: 3,
//         description: "Mauritius",
//     },
//     {
//         id: 268,
//         type_id: 3,
//         description: "Mayotte",
//     },
//     {
//         id: 269,
//         type_id: 3,
//         description: "Mexico",
//     },
//     {
//         id: 270,
//         type_id: 3,
//         description: "Micronesia, Federated States of",
//     },
//     {
//         id: 271,
//         type_id: 3,
//         description: "Moldova",
//     },
//     {
//         id: 272,
//         type_id: 3,
//         description: "Monaco",
//     },
//     {
//         id: 273,
//         type_id: 3,
//         description: "Mongolia",
//     },
//     {
//         id: 274,
//         type_id: 3,
//         description: "Montenegro",
//     },
//     {
//         id: 275,
//         type_id: 3,
//         description: "Montserrat",
//     },
//     {
//         id: 276,
//         type_id: 3,
//         description: "Morocco",
//     },
//     {
//         id: 277,
//         type_id: 3,
//         description: "Mozambique",
//     },
//     {
//         id: 278,
//         type_id: 3,
//         description: "Myanmar",
//     },
//     {
//         id: 279,
//         type_id: 3,
//         description: "Namibia",
//     },
//     {
//         id: 280,
//         type_id: 3,
//         description: "Nauru",
//     },
//     {
//         id: 281,
//         type_id: 3,
//         description: "Nepal",
//     },
//     {
//         id: 282,
//         type_id: 3,
//         description: "Netherlands",
//     },
//     {
//         id: 283,
//         type_id: 3,
//         description: "Netherlands Antilles",
//     },
//     {
//         id: 284,
//         type_id: 3,
//         description: "New Caledonia",
//     },
//     {
//         id: 285,
//         type_id: 3,
//         description: "New Zealand",
//     },
//     {
//         id: 286,
//         type_id: 3,
//         description: "Nicaragua",
//     },
//     {
//         id: 287,
//         type_id: 3,
//         description: "Niger",
//     },
//     {
//         id: 288,
//         type_id: 3,
//         description: "Nigeria",
//     },
//     {
//         id: 289,
//         type_id: 3,
//         description: "Niue ",
//     },
//     {
//         id: 290,
//         type_id: 3,
//         description: "Norfolk Island",
//     },
//     {
//         id: 291,
//         type_id: 3,
//         description: "Northern Mariana Islands",
//     },
//     {
//         id: 292,
//         type_id: 3,
//         description: "Norway",
//     },
//     {
//         id: 293,
//         type_id: 3,
//         description: "Oman",
//     },
//     {
//         id: 294,
//         type_id: 3,
//         description: "Pakistan",
//     },
//     {
//         id: 295,
//         type_id: 3,
//         description: "Palau",
//     },
//     {
//         id: 296,
//         type_id: 3,
//         description: "Palestinian Territory",
//     },
//     {
//         id: 297,
//         type_id: 3,
//         description: "Panama",
//     },
//     {
//         id: 298,
//         type_id: 3,
//         description: "Papua New Guinea",
//     },
//     {
//         id: 299,
//         type_id: 3,
//         description: "Paraguay",
//     },
//     {
//         id: 300,
//         type_id: 3,
//         description: "Peru",
//     },
//     {
//         id: 301,
//         type_id: 3,
//         description: "Pitcairn",
//     },
//     {
//         id: 302,
//         type_id: 3,
//         description: "Poland",
//     },
//     {
//         id: 303,
//         type_id: 3,
//         description: "Portugal",
//     },
//     {
//         id: 304,
//         type_id: 3,
//         description: "Puerto Rico",
//     },
//     {
//         id: 305,
//         type_id: 3,
//         description: "Qatar",
//     },
//     {
//         id: 306,
//         type_id: 3,
//         description: "Réunion",
//     },
//     {
//         id: 307,
//         type_id: 3,
//         description: "Romania",
//     },
//     {
//         id: 308,
//         type_id: 3,
//         description: "Russian Federation",
//     },
//     {
//         id: 309,
//         type_id: 3,
//         description: "Rwanda",
//     },
//     {
//         id: 310,
//         type_id: 3,
//         description: "Saint-Barthélemy",
//     },
//     {
//         id: 311,
//         type_id: 3,
//         description: "Saint Helena",
//     },
//     {
//         id: 312,
//         type_id: 3,
//         description: "Saint Kitts and Nevis",
//     },
//     {
//         id: 313,
//         type_id: 3,
//         description: "Saint Lucia",
//     },
//     {
//         id: 314,
//         type_id: 3,
//         description: "Saint-Martin (French part)",
//     },
//     {
//         id: 315,
//         type_id: 3,
//         description: "Saint Pierre and Miquelon ",
//     },
//     {
//         id: 316,
//         type_id: 3,
//         description: "Saint Vincent and Grenadines",
//     },
//     {
//         id: 317,
//         type_id: 3,
//         description: "Samoa",
//     },
//     {
//         id: 318,
//         type_id: 3,
//         description: "San Marino",
//     },
//     {
//         id: 319,
//         type_id: 3,
//         description: "Sao Tome and Principe",
//     },
//     {
//         id: 320,
//         type_id: 3,
//         description: "Saudi Arabia",
//     },
//     {
//         id: 321,
//         type_id: 3,
//         description: "Senegal",
//     },
//     {
//         id: 322,
//         type_id: 3,
//         description: "Serbia",
//     },
//     {
//         id: 323,
//         type_id: 3,
//         description: "Seychelles",
//     },
//     {
//         id: 324,
//         type_id: 3,
//         description: "Sierra Leone",
//     },
//     {
//         id: 325,
//         type_id: 3,
//         description: "Singapore",
//     },
//     {
//         id: 326,
//         type_id: 3,
//         description: "Slovakia",
//     },
//     {
//         id: 327,
//         type_id: 3,
//         description: "Slovenia",
//     },
//     {
//         id: 328,
//         type_id: 3,
//         description: "Solomon Islands",
//     },
//     {
//         id: 329,
//         type_id: 3,
//         description: "Somalia",
//     },
//     {
//         id: 330,
//         type_id: 3,
//         description: "South Africa",
//     },
//     {
//         id: 331,
//         type_id: 3,
//         description: "South Georgia and the South Sandwich Islands",
//     },
//     {
//         id: 332,
//         type_id: 3,
//         description: "South Sudan",
//     },
//     {
//         id: 333,
//         type_id: 3,
//         description: "Spain",
//     },
//     {
//         id: 334,
//         type_id: 3,
//         description: "Sri Lanka",
//     },
//     {
//         id: 335,
//         type_id: 3,
//         description: "Sudan",
//     },
//     {
//         id: 336,
//         type_id: 3,
//         description: "Suriname",
//     },
//     {
//         id: 337,
//         type_id: 3,
//         description: "Svalbard and Jan Mayen Islands ",
//     },
//     {
//         id: 338,
//         type_id: 3,
//         description: "Swaziland",
//     },
//     {
//         id: 339,
//         type_id: 3,
//         description: "Sweden",
//     },
//     {
//         id: 340,
//         type_id: 3,
//         description: "Switzerland",
//     },
//     {
//         id: 341,
//         type_id: 3,
//         description: "Syrian Arab Republic (Syria)",
//     },
//     {
//         id: 342,
//         type_id: 3,
//         description: "Taiwan, Republic of China",
//     },
//     {
//         id: 343,
//         type_id: 3,
//         description: "Tajikistan",
//     },
//     {
//         id: 344,
//         type_id: 3,
//         description: "Tanzania, United Republic of",
//     },
//     {
//         id: 345,
//         type_id: 3,
//         description: "Thailand",
//     },
//     {
//         id: 346,
//         type_id: 3,
//         description: "Timor-Leste",
//     },
//     {
//         id: 347,
//         type_id: 3,
//         description: "Togo",
//     },
//     {
//         id: 348,
//         type_id: 3,
//         description: "Tokelau ",
//     },
//     {
//         id: 349,
//         type_id: 3,
//         description: "Tonga",
//     },
//     {
//         id: 350,
//         type_id: 3,
//         description: "Trinidad and Tobago",
//     },
//     {
//         id: 351,
//         type_id: 3,
//         description: "Tunisia",
//     },
//     {
//         id: 352,
//         type_id: 3,
//         description: "Turkey",
//     },
//     {
//         id: 353,
//         type_id: 3,
//         description: "Turkmenistan",
//     },
//     {
//         id: 354,
//         type_id: 3,
//         description: "Turks and Caicos Islands ",
//     },
//     {
//         id: 355,
//         type_id: 3,
//         description: "Tuvalu",
//     },
//     {
//         id: 356,
//         type_id: 3,
//         description: "Uganda",
//     },
//     {
//         id: 357,
//         type_id: 3,
//         description: "Ukraine",
//     },
//     {
//         id: 358,
//         type_id: 3,
//         description: "United Arab Emirates",
//     },
//     {
//         id: 359,
//         type_id: 3,
//         description: "United Kingdom",
//     },
//     {
//         id: 360,
//         type_id: 3,
//         description: "United States of America",
//     },
//     {
//         id: 361,
//         type_id: 3,
//         description: "US Minor Outlying Islands",
//     },
//     {
//         id: 362,
//         type_id: 3,
//         description: "Uruguay",
//     },
//     {
//         id: 363,
//         type_id: 3,
//         description: "Uzbekistan",
//     },
//     {
//         id: 364,
//         type_id: 3,
//         description: "Vanuatu",
//     },
//     {
//         id: 365,
//         type_id: 3,
//         description: "Venezuela (Bolivarian Republic)",
//     },
//     {
//         id: 366,
//         type_id: 3,
//         description: "Viet Nam",
//     },
//     {
//         id: 367,
//         type_id: 3,
//         description: "Virgin Islands, US",
//     },
//     {
//         id: 368,
//         type_id: 3,
//         description: "Wallis and Futuna Islands ",
//     },
//     {
//         id: 369,
//         type_id: 3,
//         description: "Western Sahara",
//     },
//     {
//         id: 370,
//         type_id: 3,
//         description: "Yemen",
//     },
//     {
//         id: 371,
//         type_id: 3,
//         description: "Zambia",
//     },
//     {
//         id: 372,
//         type_id: 3,
//         description: "Zimbabwe",
//     },
//     {
//         id: 373,
//         type_id: 10,
//         description: "CAR - Cordillera Administrative Region  ",
//     },
//     {
//         id: 374,
//         type_id: 10,
//         description: "REGION 1 - Ilocos Region  ",
//     },
//     {
//         id: 375,
//         type_id: 10,
//         description: "REGION 10 - Northern Mindanao  ",
//     },
//     {
//         id: 376,
//         type_id: 10,
//         description: "REGION 11 - Davao Region  ",
//     },
//     {
//         id: 377,
//         type_id: 10,
//         description: "REGION 12 - Socsargen  ",
//     },
//     {
//         id: 378,
//         type_id: 10,
//         description: "REGION 13 - Caraga  ",
//     },
//     {
//         id: 379,
//         type_id: 10,
//         description: "REGION 2 - Cagayan Valley  ",
//     },
//     {
//         id: 380,
//         type_id: 10,
//         description: "REGION 3 - Central Luzon  ",
//     },
//     {
//         id: 381,
//         type_id: 10,
//         description: "REGION 5 - Bicol Region  ",
//     },
//     {
//         id: 382,
//         type_id: 10,
//         description: "REGION 6 - Western Visayas  ",
//     },
//     {
//         id: 383,
//         type_id: 10,
//         description: "REGION 7 - Central Visayas  ",
//     },
//     {
//         id: 384,
//         type_id: 10,
//         description: "REGION 8 - Eastern Visayas  ",
//     },
//     {
//         id: 385,
//         type_id: 10,
//         description: "REGION 9 - Zamboanga Peninsula  ",
//     },
//     {
//         id: 386,
//         type_id: 10,
//         description: "REGION 4A - CALABARZON  ",
//     },
//     {
//         id: 387,
//         type_id: 10,
//         description: "REGION 4B - MIMAROPA  ",
//     },
//     {
//         id: 388,
//         type_id: 9,
//         description: "Sampaloc",
//     },
//     {
//         id: 389,
//         type_id: 9,
//         description: "San Miguel",
//     },
//     {
//         id: 390,
//         type_id: 9,
//         description: "Ermita",
//     },
//     {
//         id: 391,
//         type_id: 9,
//         description: "Intramuros",
//     },
//     {
//         id: 392,
//         type_id: 9,
//         description: "Malate",
//     },
//     {
//         id: 393,
//         type_id: 9,
//         description: "Paco",
//     },
//     {
//         id: 394,
//         type_id: 9,
//         description: "Pandacan",
//     },
//     {
//         id: 395,
//         type_id: 9,
//         description: "Tondo I / II",
//     },
//     {
//         id: 396,
//         type_id: 9,
//         description: "Binondo",
//     },
//     {
//         id: 397,
//         type_id: 9,
//         description: "Pateros",
//     },
//     {
//         id: 398,
//         type_id: 9,
//         description: "Caloocan",
//     },
//     {
//         id: 399,
//         type_id: 9,
//         description: "Las Piñas",
//     },
//     {
//         id: 400,
//         type_id: 9,
//         description: "Makati",
//     },
//     {
//         id: 401,
//         type_id: 9,
//         description: "Malabon",
//     },
//     {
//         id: 402,
//         type_id: 9,
//         description: "Mandaluyong",
//     },
//     {
//         id: 403,
//         type_id: 9,
//         description: "Manila",
//     },
//     {
//         id: 404,
//         type_id: 9,
//         description: "Marikina",
//     },
//     {
//         id: 405,
//         type_id: 9,
//         description: "Muntinlupa",
//     },
//     {
//         id: 406,
//         type_id: 9,
//         description: "Navotas",
//     },
//     {
//         id: 407,
//         type_id: 9,
//         description: "Parañaque",
//     },
//     {
//         id: 408,
//         type_id: 9,
//         description: "Pasay",
//     },
//     {
//         id: 409,
//         type_id: 9,
//         description: "Pasig",
//     },
//     {
//         id: 410,
//         type_id: 9,
//         description: "Quezon City",
//     },
//     {
//         id: 411,
//         type_id: 9,
//         description: "San Juan",
//     },
//     {
//         id: 412,
//         type_id: 9,
//         description: "Taguig",
//     },
//     {
//         id: 413,
//         type_id: 9,
//         description: "Valenzuela",
//     },
//     {
//         id: 414,
//         type_id: 9,
//         description: "Santa Marcela",
//     },
//     {
//         id: 415,
//         type_id: 9,
//         description: "Calanasan",
//     },
//     {
//         id: 416,
//         type_id: 9,
//         description: "Conner",
//     },
//     {
//         id: 417,
//         type_id: 9,
//         description: "Flora",
//     },
//     {
//         id: 418,
//         type_id: 9,
//         description: "Kabugao",
//     },
//     {
//         id: 419,
//         type_id: 9,
//         description: "Luna",
//     },
//     {
//         id: 420,
//         type_id: 9,
//         description: "Pudtol",
//     },
//     {
//         id: 421,
//         type_id: 9,
//         description: "Bangued",
//     },
//     {
//         id: 422,
//         type_id: 9,
//         description: "Boliney",
//     },
//     {
//         id: 423,
//         type_id: 9,
//         description: "Bucay",
//     },
//     {
//         id: 424,
//         type_id: 9,
//         description: "Bucloc",
//     },
//     {
//         id: 425,
//         type_id: 9,
//         description: "Daguioman",
//     },
//     {
//         id: 426,
//         type_id: 9,
//         description: "Danglas",
//     },
//     {
//         id: 427,
//         type_id: 9,
//         description: "Dolores",
//     },
//     {
//         id: 428,
//         type_id: 9,
//         description: "La Paz",
//     },
//     {
//         id: 429,
//         type_id: 9,
//         description: "Lacub",
//     },
//     {
//         id: 430,
//         type_id: 9,
//         description: "Lagangilang",
//     },
//     {
//         id: 431,
//         type_id: 9,
//         description: "Lagayan",
//     },
//     {
//         id: 432,
//         type_id: 9,
//         description: "Langiden",
//     },
//     {
//         id: 433,
//         type_id: 9,
//         description: "Licuan-Baay",
//     },
//     {
//         id: 434,
//         type_id: 9,
//         description: "Luba",
//     },
//     {
//         id: 435,
//         type_id: 9,
//         description: "Malibcong",
//     },
//     {
//         id: 436,
//         type_id: 9,
//         description: "Manabo",
//     },
//     {
//         id: 437,
//         type_id: 9,
//         description: "Peñarrubia",
//     },
//     {
//         id: 438,
//         type_id: 9,
//         description: "Pidigan",
//     },
//     {
//         id: 439,
//         type_id: 9,
//         description: "Pilar",
//     },
//     {
//         id: 440,
//         type_id: 9,
//         description: "Sallapadan",
//     },
//     {
//         id: 441,
//         type_id: 9,
//         description: "San Isidro",
//     },
//     {
//         id: 442,
//         type_id: 9,
//         description: "San Juan",
//     },
//     {
//         id: 443,
//         type_id: 9,
//         description: "San Quintin",
//     },
//     {
//         id: 444,
//         type_id: 9,
//         description: "Tayum",
//     },
//     {
//         id: 445,
//         type_id: 9,
//         description: "Tineg",
//     },
//     {
//         id: 446,
//         type_id: 9,
//         description: "Tubo",
//     },
//     {
//         id: 447,
//         type_id: 9,
//         description: "Villaviciosa",
//     },
//     {
//         id: 448,
//         type_id: 9,
//         description: "Baguio City",
//     },
//     {
//         id: 449,
//         type_id: 9,
//         description: "Atok",
//     },
//     {
//         id: 450,
//         type_id: 9,
//         description: "Bakun",
//     },
//     {
//         id: 451,
//         type_id: 9,
//         description: "Bokod",
//     },
//     {
//         id: 452,
//         type_id: 9,
//         description: "Buguias",
//     },
//     {
//         id: 453,
//         type_id: 9,
//         description: "Itogon",
//     },
//     {
//         id: 454,
//         type_id: 9,
//         description: "Kabayan",
//     },
//     {
//         id: 455,
//         type_id: 9,
//         description: "Kapangan",
//     },
//     {
//         id: 456,
//         type_id: 9,
//         description: "Kibungan",
//     },
//     {
//         id: 457,
//         type_id: 9,
//         description: "La Trinidad",
//     },
//     {
//         id: 458,
//         type_id: 9,
//         description: "Mankayan",
//     },
//     {
//         id: 459,
//         type_id: 9,
//         description: "Sablan",
//     },
//     {
//         id: 460,
//         type_id: 9,
//         description: "Tuba",
//     },
//     {
//         id: 461,
//         type_id: 9,
//         description: "Tublay",
//     },
//     {
//         id: 462,
//         type_id: 9,
//         description: "Aguinaldo",
//     },
//     {
//         id: 463,
//         type_id: 9,
//         description: "ALFONSO LISTA",
//     },
//     {
//         id: 464,
//         type_id: 9,
//         description: "Asipulo",
//     },
//     {
//         id: 465,
//         type_id: 9,
//         description: "Banaue",
//     },
//     {
//         id: 466,
//         type_id: 9,
//         description: "Hingyon",
//     },
//     {
//         id: 467,
//         type_id: 9,
//         description: "Hungduan",
//     },
//     {
//         id: 468,
//         type_id: 9,
//         description: "Kiangan",
//     },
//     {
//         id: 469,
//         type_id: 9,
//         description: "Lagawe",
//     },
//     {
//         id: 470,
//         type_id: 9,
//         description: "Lamut",
//     },
//     {
//         id: 471,
//         type_id: 9,
//         description: "Mayoyao",
//     },
//     {
//         id: 472,
//         type_id: 9,
//         description: "Tinoc",
//     },
//     {
//         id: 473,
//         type_id: 9,
//         description: "Tadian",
//     },
//     {
//         id: 474,
//         type_id: 9,
//         description: "Barlig",
//     },
//     {
//         id: 475,
//         type_id: 9,
//         description: "Baukod",
//     },
//     {
//         id: 476,
//         type_id: 9,
//         description: "Besao",
//     },
//     {
//         id: 477,
//         type_id: 9,
//         description: "Bontoc",
//     },
//     {
//         id: 478,
//         type_id: 9,
//         description: "Natonin",
//     },
//     {
//         id: 479,
//         type_id: 9,
//         description: "Paracelis",
//     },
//     {
//         id: 480,
//         type_id: 9,
//         description: "Sabangan",
//     },
//     {
//         id: 481,
//         type_id: 9,
//         description: "Sadanga",
//     },
//     {
//         id: 482,
//         type_id: 9,
//         description: "Sagada",
//     },
//     {
//         id: 483,
//         type_id: 9,
//         description: "Tabuk City",
//     },
//     {
//         id: 484,
//         type_id: 9,
//         description: "Balbalan",
//     },
//     {
//         id: 485,
//         type_id: 9,
//         description: "Lubuagan",
//     },
//     {
//         id: 486,
//         type_id: 9,
//         description: "Pasil",
//     },
//     {
//         id: 487,
//         type_id: 9,
//         description: "Pinukpuk",
//     },
//     {
//         id: 488,
//         type_id: 9,
//         description: "Rizal",
//     },
//     {
//         id: 489,
//         type_id: 9,
//         description: "Tanudan",
//     },
//     {
//         id: 490,
//         type_id: 9,
//         description: "Tinglayan",
//     },
//     {
//         id: 491,
//         type_id: 9,
//         description: "Tabuan-Lasa",
//     },
//     {
//         id: 492,
//         type_id: 9,
//         description: "Isabela City",
//     },
//     {
//         id: 493,
//         type_id: 9,
//         description: "Lamitan City",
//     },
//     {
//         id: 494,
//         type_id: 9,
//         description: "Akbar",
//     },
//     {
//         id: 495,
//         type_id: 9,
//         description: "Hadji Mohammad Aju",
//     },
//     {
//         id: 496,
//         type_id: 9,
//         description: "Lantawan",
//     },
//     {
//         id: 497,
//         type_id: 9,
//         description: "Maluso",
//     },
//     {
//         id: 498,
//         type_id: 9,
//         description: "Sumisip",
//     },
//     {
//         id: 499,
//         type_id: 9,
//         description: "Tipo-Tipo",
//     },
//     {
//         id: 500,
//         type_id: 9,
//         description: "Tuburan",
//     },
//     {
//         id: 501,
//         type_id: 9,
//         description: "Ungkaya Pukan",
//     },
//     {
//         id: 502,
//         type_id: 9,
//         description: "Al-Barka",
//     },
//     {
//         id: 503,
//         type_id: 9,
//         description: "Marawi City",
//     },
//     {
//         id: 504,
//         type_id: 9,
//         description: "Bacolod-Kalawi",
//     },
//     {
//         id: 505,
//         type_id: 9,
//         description: "Balabagan",
//     },
//     {
//         id: 506,
//         type_id: 9,
//         description: "Balindong",
//     },
//     {
//         id: 507,
//         type_id: 9,
//         description: "Bayang",
//     },
//     {
//         id: 508,
//         type_id: 9,
//         description: "Binidayan",
//     },
//     {
//         id: 509,
//         type_id: 9,
//         description: "Buadiposo-Buntong",
//     },
//     {
//         id: 510,
//         type_id: 9,
//         description: "Bubong",
//     },
//     {
//         id: 511,
//         type_id: 9,
//         description: "Bumbaran",
//     },
//     {
//         id: 512,
//         type_id: 9,
//         description: "Butig",
//     },
//     {
//         id: 513,
//         type_id: 9,
//         description: "Calanogas",
//     },
//     {
//         id: 514,
//         type_id: 9,
//         description: "Ditsaan-Ramain",
//     },
//     {
//         id: 515,
//         type_id: 9,
//         description: "Ganassi",
//     },
//     {
//         id: 516,
//         type_id: 9,
//         description: "Kapai",
//     },
//     {
//         id: 517,
//         type_id: 9,
//         description: "Kapatagan",
//     },
//     {
//         id: 518,
//         type_id: 9,
//         description: "Lumba-Bayabao",
//     },
//     {
//         id: 519,
//         type_id: 9,
//         description: "Lumbaca-Unayan",
//     },
//     {
//         id: 520,
//         type_id: 9,
//         description: "Lumbatan",
//     },
//     {
//         id: 521,
//         type_id: 9,
//         description: "Lumbayanague",
//     },
//     {
//         id: 522,
//         type_id: 9,
//         description: "Madalum",
//     },
//     {
//         id: 523,
//         type_id: 9,
//         description: "Madamba",
//     },
//     {
//         id: 524,
//         type_id: 9,
//         description: "Maguing",
//     },
//     {
//         id: 525,
//         type_id: 9,
//         description: "Malabang",
//     },
//     {
//         id: 526,
//         type_id: 9,
//         description: "Marantao",
//     },
//     {
//         id: 527,
//         type_id: 9,
//         description: "Marogong",
//     },
//     {
//         id: 528,
//         type_id: 9,
//         description: "Masiu",
//     },
//     {
//         id: 529,
//         type_id: 9,
//         description: "Mulondo",
//     },
//     {
//         id: 530,
//         type_id: 9,
//         description: "Pagayawan",
//     },
//     {
//         id: 531,
//         type_id: 9,
//         description: "Piagapo",
//     },
//     {
//         id: 532,
//         type_id: 9,
//         description: "Poona Bayabao",
//     },
//     {
//         id: 533,
//         type_id: 9,
//         description: "Pualas",
//     },
//     {
//         id: 534,
//         type_id: 9,
//         description: "Saguiaran",
//     },
//     {
//         id: 535,
//         type_id: 9,
//         description: "Sultan Dumalondong",
//     },
//     {
//         id: 536,
//         type_id: 9,
//         description: "Picong",
//     },
//     {
//         id: 537,
//         type_id: 9,
//         description: "Tagoloan Ii",
//     },
//     {
//         id: 538,
//         type_id: 9,
//         description: "Tamparan",
//     },
//     {
//         id: 539,
//         type_id: 9,
//         description: "Taraka",
//     },
//     {
//         id: 540,
//         type_id: 9,
//         description: "Tubaran",
//     },
//     {
//         id: 541,
//         type_id: 9,
//         description: "Tugaya",
//     },
//     {
//         id: 542,
//         type_id: 9,
//         description: "Wao",
//     },
//     {
//         id: 543,
//         type_id: 9,
//         description: "Sultan Mastura",
//     },
//     {
//         id: 544,
//         type_id: 9,
//         description: "Barira",
//     },
//     {
//         id: 545,
//         type_id: 9,
//         description: "Upi",
//     },
//     {
//         id: 546,
//         type_id: 9,
//         description: "Kabuntalan(tumbao)",
//     },
//     {
//         id: 547,
//         type_id: 9,
//         description: "Datu Salibo",
//     },
//     {
//         id: 548,
//         type_id: 9,
//         description: "Sultan Kudarat(nuling)",
//     },
//     {
//         id: 549,
//         type_id: 9,
//         description: "Parang",
//     },
//     {
//         id: 550,
//         type_id: 9,
//         description: "Matanog",
//     },
//     {
//         id: 551,
//         type_id: 9,
//         description: "Datu Odin Sinsuat(dinaig)",
//     },
//     {
//         id: 552,
//         type_id: 9,
//         description: "Buldon",
//     },
//     {
//         id: 553,
//         type_id: 9,
//         description: "Datu Hoffer Ampatuan",
//     },
//     {
//         id: 554,
//         type_id: 9,
//         description: "Northern Kabuntalan",
//     },
//     {
//         id: 555,
//         type_id: 9,
//         description: "BARIRA",
//     },
//     {
//         id: 556,
//         type_id: 9,
//         description: "BULDON",
//     },
//     {
//         id: 557,
//         type_id: 9,
//         description: "DATU BLAH T. SINSUAT",
//     },
//     {
//         id: 558,
//         type_id: 9,
//         description: "DATU ODIN SINSUAT",
//     },
//     {
//         id: 559,
//         type_id: 9,
//         description: "KABUNTALAN",
//     },
//     {
//         id: 560,
//         type_id: 9,
//         description: "MATANOG",
//     },
//     {
//         id: 561,
//         type_id: 9,
//         description: "NORTHERN KABUNTALAN",
//     },
//     {
//         id: 562,
//         type_id: 9,
//         description: "PARANG",
//     },
//     {
//         id: 563,
//         type_id: 9,
//         description: "SULTAN KUDARAT",
//     },
//     {
//         id: 564,
//         type_id: 9,
//         description: "SULTAN MASTURA",
//     },
//     {
//         id: 565,
//         type_id: 9,
//         description: "UPI",
//     },
//     {
//         id: 566,
//         type_id: 9,
//         description: "Cotabato City",
//     },
//     {
//         id: 567,
//         type_id: 9,
//         description: "Ampatuan",
//     },
//     {
//         id: 568,
//         type_id: 9,
//         description: "Buluan",
//     },
//     {
//         id: 569,
//         type_id: 9,
//         description: "Datu Abdullah Sangki",
//     },
//     {
//         id: 570,
//         type_id: 9,
//         description: "Datu Anggal Midtimbang",
//     },
//     {
//         id: 571,
//         type_id: 9,
//         description: "Datu Paglas",
//     },
//     {
//         id: 572,
//         type_id: 9,
//         description: "Datu Piang",
//     },
//     {
//         id: 573,
//         type_id: 9,
//         description: "Datu Saudi-Ampatuan",
//     },
//     {
//         id: 574,
//         type_id: 9,
//         description: "Datu Unsay",
//     },
//     {
//         id: 575,
//         type_id: 9,
//         description: "Gen. S. K. Pendatun",
//     },
//     {
//         id: 576,
//         type_id: 9,
//         description: "Guindulungan",
//     },
//     {
//         id: 577,
//         type_id: 9,
//         description: "Mamasapano",
//     },
//     {
//         id: 578,
//         type_id: 9,
//         description: "Mangudadatu",
//     },
//     {
//         id: 579,
//         type_id: 9,
//         description: "Pagagawan",
//     },
//     {
//         id: 580,
//         type_id: 9,
//         description: "Pagalungan",
//     },
//     {
//         id: 581,
//         type_id: 9,
//         description: "Paglat",
//     },
//     {
//         id: 582,
//         type_id: 9,
//         description: "Pandag",
//     },
//     {
//         id: 583,
//         type_id: 9,
//         description: "Rajah Buayan",
//     },
//     {
//         id: 584,
//         type_id: 9,
//         description: "Shariff Aguak",
//     },
//     {
//         id: 585,
//         type_id: 9,
//         description: "South Upi",
//     },
//     {
//         id: 586,
//         type_id: 9,
//         description: "Sultan sa Barongis",
//     },
//     {
//         id: 587,
//         type_id: 9,
//         description: "Talayan",
//     },
//     {
//         id: 588,
//         type_id: 9,
//         description: "SULTAN SUMAGKA",
//     },
//     {
//         id: 589,
//         type_id: 9,
//         description: "Luuk",
//     },
//     {
//         id: 590,
//         type_id: 9,
//         description: "Maimbung",
//     },
//     {
//         id: 591,
//         type_id: 9,
//         description: "Old Panamao",
//     },
//     {
//         id: 592,
//         type_id: 9,
//         description: "Omar",
//     },
//     {
//         id: 593,
//         type_id: 9,
//         description: "Pandami",
//     },
//     {
//         id: 594,
//         type_id: 9,
//         description: "Panglima Estino",
//     },
//     {
//         id: 595,
//         type_id: 9,
//         description: "Pangutaran",
//     },
//     {
//         id: 596,
//         type_id: 9,
//         description: "Parang",
//     },
//     {
//         id: 597,
//         type_id: 9,
//         description: "Pata",
//     },
//     {
//         id: 598,
//         type_id: 9,
//         description: "Patikul",
//     },
//     {
//         id: 599,
//         type_id: 9,
//         description: "Siasi",
//     },
//     {
//         id: 600,
//         type_id: 9,
//         description: "Talipao",
//     },
//     {
//         id: 601,
//         type_id: 9,
//         description: "Tapul",
//     },
//     {
//         id: 602,
//         type_id: 9,
//         description: "Tongkil",
//     },
//     {
//         id: 603,
//         type_id: 9,
//         description: "Hadji Panglima Tahil",
//     },
//     {
//         id: 604,
//         type_id: 9,
//         description: "Indanan",
//     },
//     {
//         id: 605,
//         type_id: 9,
//         description: "Jolo",
//     },
//     {
//         id: 606,
//         type_id: 9,
//         description: "Kalingalan Caluang",
//     },
//     {
//         id: 607,
//         type_id: 9,
//         description: "Lugus",
//     },
//     {
//         id: 608,
//         type_id: 9,
//         description: "Bongao",
//     },
//     {
//         id: 609,
//         type_id: 9,
//         description: "Languyan",
//     },
//     {
//         id: 610,
//         type_id: 9,
//         description: "Mapun",
//     },
//     {
//         id: 611,
//         type_id: 9,
//         description: "Panglima Sugala",
//     },
//     {
//         id: 612,
//         type_id: 9,
//         description: "Sapa-Sapa",
//     },
//     {
//         id: 613,
//         type_id: 9,
//         description: "Sibutu",
//     },
//     {
//         id: 614,
//         type_id: 9,
//         description: "Simunul",
//     },
//     {
//         id: 615,
//         type_id: 9,
//         description: "Sitangkai",
//     },
//     {
//         id: 616,
//         type_id: 9,
//         description: "South Ubian",
//     },
//     {
//         id: 617,
//         type_id: 9,
//         description: "Tandubas",
//     },
//     {
//         id: 618,
//         type_id: 9,
//         description: "Turtle Islands",
//     },
//     {
//         id: 619,
//         type_id: 9,
//         description: "Laoag City",
//     },
//     {
//         id: 620,
//         type_id: 9,
//         description: "Batac City",
//     },
//     {
//         id: 621,
//         type_id: 9,
//         description: "Adams",
//     },
//     {
//         id: 622,
//         type_id: 9,
//         description: "Bacarra",
//     },
//     {
//         id: 623,
//         type_id: 9,
//         description: "Badoc",
//     },
//     {
//         id: 624,
//         type_id: 9,
//         description: "Bangui",
//     },
//     {
//         id: 625,
//         type_id: 9,
//         description: "Banna",
//     },
//     {
//         id: 626,
//         type_id: 9,
//         description: "Burgos",
//     },
//     {
//         id: 627,
//         type_id: 9,
//         description: "Carasi",
//     },
//     {
//         id: 628,
//         type_id: 9,
//         description: "Currimao",
//     },
//     {
//         id: 629,
//         type_id: 9,
//         description: "Dingras",
//     },
//     {
//         id: 630,
//         type_id: 9,
//         description: "Dumalneg",
//     },
//     {
//         id: 631,
//         type_id: 9,
//         description: "Marcos",
//     },
//     {
//         id: 632,
//         type_id: 9,
//         description: "Nueva Era",
//     },
//     {
//         id: 633,
//         type_id: 9,
//         description: "Pagudpud",
//     },
//     {
//         id: 634,
//         type_id: 9,
//         description: "Paoay",
//     },
//     {
//         id: 635,
//         type_id: 9,
//         description: "Pasuquin",
//     },
//     {
//         id: 636,
//         type_id: 9,
//         description: "Piddig",
//     },
//     {
//         id: 637,
//         type_id: 9,
//         description: "Pinili",
//     },
//     {
//         id: 638,
//         type_id: 9,
//         description: "San Nicolas",
//     },
//     {
//         id: 639,
//         type_id: 9,
//         description: "Sarrat",
//     },
//     {
//         id: 640,
//         type_id: 9,
//         description: "Solsona",
//     },
//     {
//         id: 641,
//         type_id: 9,
//         description: "Vintar",
//     },
//     {
//         id: 642,
//         type_id: 9,
//         description: "Candon City",
//     },
//     {
//         id: 643,
//         type_id: 9,
//         description: "Vigan City",
//     },
//     {
//         id: 644,
//         type_id: 9,
//         description: "Alilem",
//     },
//     {
//         id: 645,
//         type_id: 9,
//         description: "Banayoyo",
//     },
//     {
//         id: 646,
//         type_id: 9,
//         description: "Bantay",
//     },
//     {
//         id: 647,
//         type_id: 9,
//         description: "Burgos",
//     },
//     {
//         id: 648,
//         type_id: 9,
//         description: "Cabugao",
//     },
//     {
//         id: 649,
//         type_id: 9,
//         description: "Caoayan",
//     },
//     {
//         id: 650,
//         type_id: 9,
//         description: "Cervantes",
//     },
//     {
//         id: 651,
//         type_id: 9,
//         description: "Galimuyod",
//     },
//     {
//         id: 652,
//         type_id: 9,
//         description: "Gregorio Del Pilar",
//     },
//     {
//         id: 653,
//         type_id: 9,
//         description: "Lidlidda",
//     },
//     {
//         id: 654,
//         type_id: 9,
//         description: "Magsingal",
//     },
//     {
//         id: 655,
//         type_id: 9,
//         description: "Nagbukel",
//     },
//     {
//         id: 656,
//         type_id: 9,
//         description: "Narvacan",
//     },
//     {
//         id: 657,
//         type_id: 9,
//         description: "Quirino",
//     },
//     {
//         id: 658,
//         type_id: 9,
//         description: "Salcedo",
//     },
//     {
//         id: 659,
//         type_id: 9,
//         description: "San Emilio",
//     },
//     {
//         id: 660,
//         type_id: 9,
//         description: "San Esteban",
//     },
//     {
//         id: 661,
//         type_id: 9,
//         description: "San Ildefonso",
//     },
//     {
//         id: 662,
//         type_id: 9,
//         description: "San Juan",
//     },
//     {
//         id: 663,
//         type_id: 9,
//         description: "San Vicente",
//     },
//     {
//         id: 664,
//         type_id: 9,
//         description: "Santa",
//     },
//     {
//         id: 665,
//         type_id: 9,
//         description: "Santa Catalina",
//     },
//     {
//         id: 666,
//         type_id: 9,
//         description: "Santa Cruz",
//     },
//     {
//         id: 667,
//         type_id: 9,
//         description: "Santa Lucia",
//     },
//     {
//         id: 668,
//         type_id: 9,
//         description: "Santa Maria",
//     },
//     {
//         id: 669,
//         type_id: 9,
//         description: "Santiago",
//     },
//     {
//         id: 670,
//         type_id: 9,
//         description: "Santo Domingo",
//     },
//     {
//         id: 671,
//         type_id: 9,
//         description: "Sigay",
//     },
//     {
//         id: 672,
//         type_id: 9,
//         description: "Sinait",
//     },
//     {
//         id: 673,
//         type_id: 9,
//         description: "Sugpon",
//     },
//     {
//         id: 674,
//         type_id: 9,
//         description: "Suyo",
//     },
//     {
//         id: 675,
//         type_id: 9,
//         description: "Tagudin",
//     },
//     {
//         id: 676,
//         type_id: 9,
//         description: "San Fernando City",
//     },
//     {
//         id: 677,
//         type_id: 9,
//         description: "Agoo",
//     },
//     {
//         id: 678,
//         type_id: 9,
//         description: "Aringay",
//     },
//     {
//         id: 679,
//         type_id: 9,
//         description: "Bacnotan",
//     },
//     {
//         id: 680,
//         type_id: 9,
//         description: "Bagulin",
//     },
//     {
//         id: 681,
//         type_id: 9,
//         description: "Balaoan",
//     },
//     {
//         id: 682,
//         type_id: 9,
//         description: "Bangar",
//     },
//     {
//         id: 683,
//         type_id: 9,
//         description: "Bauang",
//     },
//     {
//         id: 684,
//         type_id: 9,
//         description: "Burgos",
//     },
//     {
//         id: 685,
//         type_id: 9,
//         description: "Caba",
//     },
//     {
//         id: 686,
//         type_id: 9,
//         description: "Luna",
//     },
//     {
//         id: 687,
//         type_id: 9,
//         description: "Naguilian",
//     },
//     {
//         id: 688,
//         type_id: 9,
//         description: "Pugo",
//     },
//     {
//         id: 689,
//         type_id: 9,
//         description: "Rosario",
//     },
//     {
//         id: 690,
//         type_id: 9,
//         description: "San Gabriel",
//     },
//     {
//         id: 691,
//         type_id: 9,
//         description: "San Juan",
//     },
//     {
//         id: 692,
//         type_id: 9,
//         description: "Santo Tomas",
//     },
//     {
//         id: 693,
//         type_id: 9,
//         description: "Santol",
//     },
//     {
//         id: 694,
//         type_id: 9,
//         description: "Sudipen",
//     },
//     {
//         id: 695,
//         type_id: 9,
//         description: "Tubao",
//     },
//     {
//         id: 696,
//         type_id: 9,
//         description: "Balungao",
//     },
//     {
//         id: 697,
//         type_id: 9,
//         description: "Bani",
//     },
//     {
//         id: 698,
//         type_id: 9,
//         description: "Basista",
//     },
//     {
//         id: 699,
//         type_id: 9,
//         description: "Bautista",
//     },
//     {
//         id: 700,
//         type_id: 9,
//         description: "Bayambang",
//     },
//     {
//         id: 701,
//         type_id: 9,
//         description: "Binalonan",
//     },
//     {
//         id: 702,
//         type_id: 9,
//         description: "Binmaley",
//     },
//     {
//         id: 703,
//         type_id: 9,
//         description: "Bolinao",
//     },
//     {
//         id: 704,
//         type_id: 9,
//         description: "Bugallon",
//     },
//     {
//         id: 705,
//         type_id: 9,
//         description: "Burgos",
//     },
//     {
//         id: 706,
//         type_id: 9,
//         description: "Alaminos City",
//     },
//     {
//         id: 707,
//         type_id: 9,
//         description: "Dagupan City",
//     },
//     {
//         id: 708,
//         type_id: 9,
//         description: "San Carlos City",
//     },
//     {
//         id: 709,
//         type_id: 9,
//         description: "Urdaneta City",
//     },
//     {
//         id: 710,
//         type_id: 9,
//         description: "Agno",
//     },
//     {
//         id: 711,
//         type_id: 9,
//         description: "Aguilar",
//     },
//     {
//         id: 712,
//         type_id: 9,
//         description: "Alcala",
//     },
//     {
//         id: 713,
//         type_id: 9,
//         description: "Anda",
//     },
//     {
//         id: 714,
//         type_id: 9,
//         description: "Asingan",
//     },
//     {
//         id: 715,
//         type_id: 9,
//         description: "Santa Barbara",
//     },
//     {
//         id: 716,
//         type_id: 9,
//         description: "Santa Maria",
//     },
//     {
//         id: 717,
//         type_id: 9,
//         description: "Santo Tomas",
//     },
//     {
//         id: 718,
//         type_id: 9,
//         description: "Sison",
//     },
//     {
//         id: 719,
//         type_id: 9,
//         description: "Sual",
//     },
//     {
//         id: 720,
//         type_id: 9,
//         description: "Tayug",
//     },
//     {
//         id: 721,
//         type_id: 9,
//         description: "Umingan",
//     },
//     {
//         id: 722,
//         type_id: 9,
//         description: "Urbiztondo",
//     },
//     {
//         id: 723,
//         type_id: 9,
//         description: "Villasis",
//     },
//     {
//         id: 724,
//         type_id: 9,
//         description: "Mangatarem",
//     },
//     {
//         id: 725,
//         type_id: 9,
//         description: "Mapandan",
//     },
//     {
//         id: 726,
//         type_id: 9,
//         description: "Natividad",
//     },
//     {
//         id: 727,
//         type_id: 9,
//         description: "Pozzorubio",
//     },
//     {
//         id: 728,
//         type_id: 9,
//         description: "Rosales",
//     },
//     {
//         id: 729,
//         type_id: 9,
//         description: "San Fabian",
//     },
//     {
//         id: 730,
//         type_id: 9,
//         description: "San Jacinto",
//     },
//     {
//         id: 731,
//         type_id: 9,
//         description: "San Manuel",
//     },
//     {
//         id: 732,
//         type_id: 9,
//         description: "San Nicolas",
//     },
//     {
//         id: 733,
//         type_id: 9,
//         description: "San Quintin",
//     },
//     {
//         id: 734,
//         type_id: 9,
//         description: "Calasiao",
//     },
//     {
//         id: 735,
//         type_id: 9,
//         description: "Dasol",
//     },
//     {
//         id: 736,
//         type_id: 9,
//         description: "Infanta",
//     },
//     {
//         id: 737,
//         type_id: 9,
//         description: "Labrador",
//     },
//     {
//         id: 738,
//         type_id: 9,
//         description: "Laoac",
//     },
//     {
//         id: 739,
//         type_id: 9,
//         description: "Lingayen",
//     },
//     {
//         id: 740,
//         type_id: 9,
//         description: "Mabini",
//     },
//     {
//         id: 741,
//         type_id: 9,
//         description: "Malasiqui",
//     },
//     {
//         id: 742,
//         type_id: 9,
//         description: "Manaoag",
//     },
//     {
//         id: 743,
//         type_id: 9,
//         description: "Mangaldan",
//     },
//     {
//         id: 744,
//         type_id: 9,
//         description: "Malaybalay City",
//     },
//     {
//         id: 745,
//         type_id: 9,
//         description: "Valencia City",
//     },
//     {
//         id: 746,
//         type_id: 9,
//         description: "Baungon",
//     },
//     {
//         id: 747,
//         type_id: 9,
//         description: "Cabanglasan",
//     },
//     {
//         id: 748,
//         type_id: 9,
//         description: "Damulog",
//     },
//     {
//         id: 749,
//         type_id: 9,
//         description: "Dangcagan",
//     },
//     {
//         id: 750,
//         type_id: 9,
//         description: "Don Carlos",
//     },
//     {
//         id: 751,
//         type_id: 9,
//         description: "Impasug-Ong",
//     },
//     {
//         id: 752,
//         type_id: 9,
//         description: "Kadingilan",
//     },
//     {
//         id: 753,
//         type_id: 9,
//         description: "Kalilangan",
//     },
//     {
//         id: 754,
//         type_id: 9,
//         description: "Kibawe",
//     },
//     {
//         id: 755,
//         type_id: 9,
//         description: "Kitaotao",
//     },
//     {
//         id: 756,
//         type_id: 9,
//         description: "Lantapan",
//     },
//     {
//         id: 757,
//         type_id: 9,
//         description: "Libona",
//     },
//     {
//         id: 758,
//         type_id: 9,
//         description: "Malitbog",
//     },
//     {
//         id: 759,
//         type_id: 9,
//         description: "Manolo Fortich",
//     },
//     {
//         id: 760,
//         type_id: 9,
//         description: "Maramag",
//     },
//     {
//         id: 761,
//         type_id: 9,
//         description: "Pangantucan",
//     },
//     {
//         id: 762,
//         type_id: 9,
//         description: "Quezon",
//     },
//     {
//         id: 763,
//         type_id: 9,
//         description: "San Fernando",
//     },
//     {
//         id: 764,
//         type_id: 9,
//         description: "Sumilao",
//     },
//     {
//         id: 765,
//         type_id: 9,
//         description: "Talakag",
//     },
//     {
//         id: 766,
//         type_id: 9,
//         description: "Catarman",
//     },
//     {
//         id: 767,
//         type_id: 9,
//         description: "Guinsiliban",
//     },
//     {
//         id: 768,
//         type_id: 9,
//         description: "Mahinog",
//     },
//     {
//         id: 769,
//         type_id: 9,
//         description: "Mambajao",
//     },
//     {
//         id: 770,
//         type_id: 9,
//         description: "Sagay",
//     },
//     {
//         id: 771,
//         type_id: 9,
//         description: "Iligan City",
//     },
//     {
//         id: 772,
//         type_id: 9,
//         description: "Bacolod",
//     },
//     {
//         id: 773,
//         type_id: 9,
//         description: "Baloi",
//     },
//     {
//         id: 774,
//         type_id: 9,
//         description: "Baroy",
//     },
//     {
//         id: 775,
//         type_id: 9,
//         description: "Kapatagan",
//     },
//     {
//         id: 776,
//         type_id: 9,
//         description: "Kauswagan",
//     },
//     {
//         id: 777,
//         type_id: 9,
//         description: "Kolambugan",
//     },
//     {
//         id: 778,
//         type_id: 9,
//         description: "Lala",
//     },
//     {
//         id: 779,
//         type_id: 9,
//         description: "Linamon",
//     },
//     {
//         id: 780,
//         type_id: 9,
//         description: "Magsaysay",
//     },
//     {
//         id: 781,
//         type_id: 9,
//         description: "Maigo",
//     },
//     {
//         id: 782,
//         type_id: 9,
//         description: "Matungao",
//     },
//     {
//         id: 783,
//         type_id: 9,
//         description: "Munai",
//     },
//     {
//         id: 784,
//         type_id: 9,
//         description: "Nunungan",
//     },
//     {
//         id: 785,
//         type_id: 9,
//         description: "Pantao Ragat",
//     },
//     {
//         id: 786,
//         type_id: 9,
//         description: "Pantar",
//     },
//     {
//         id: 787,
//         type_id: 9,
//         description: "Poona Piagapo",
//     },
//     {
//         id: 788,
//         type_id: 9,
//         description: "Salvador",
//     },
//     {
//         id: 789,
//         type_id: 9,
//         description: "Sapad",
//     },
//     {
//         id: 790,
//         type_id: 9,
//         description: "Sultan Naga Dimaporo",
//     },
//     {
//         id: 791,
//         type_id: 9,
//         description: "Tagoloan",
//     },
//     {
//         id: 792,
//         type_id: 9,
//         description: "Tangcal",
//     },
//     {
//         id: 793,
//         type_id: 9,
//         description: "Tubod",
//     },
//     {
//         id: 794,
//         type_id: 9,
//         description: "Villanueva",
//     },
//     {
//         id: 795,
//         type_id: 9,
//         description: "Lugait",
//     },
//     {
//         id: 796,
//         type_id: 9,
//         description: "Magsaysay",
//     },
//     {
//         id: 797,
//         type_id: 9,
//         description: "Manticao",
//     },
//     {
//         id: 798,
//         type_id: 9,
//         description: "Medina",
//     },
//     {
//         id: 799,
//         type_id: 9,
//         description: "Naawan",
//     },
//     {
//         id: 800,
//         type_id: 9,
//         description: "Opol",
//     },
//     {
//         id: 801,
//         type_id: 9,
//         description: "Salay",
//     },
//     {
//         id: 802,
//         type_id: 9,
//         description: "Sugbongcogon",
//     },
//     {
//         id: 803,
//         type_id: 9,
//         description: "Tagoloan",
//     },
//     {
//         id: 804,
//         type_id: 9,
//         description: "Talisayan",
//     },
//     {
//         id: 805,
//         type_id: 9,
//         description: "Cagayan de Oro",
//     },
//     {
//         id: 806,
//         type_id: 9,
//         description: "Gingoog City",
//     },
//     {
//         id: 807,
//         type_id: 9,
//         description: "El Salvador City",
//     },
//     {
//         id: 808,
//         type_id: 9,
//         description: "Alubijid",
//     },
//     {
//         id: 809,
//         type_id: 9,
//         description: "Balingasag",
//     },
//     {
//         id: 810,
//         type_id: 9,
//         description: "Balingoan",
//     },
//     {
//         id: 811,
//         type_id: 9,
//         description: "Binuangan",
//     },
//     {
//         id: 812,
//         type_id: 9,
//         description: "Claveria",
//     },
//     {
//         id: 813,
//         type_id: 9,
//         description: "El Salvador",
//     },
//     {
//         id: 814,
//         type_id: 9,
//         description: "Gitagum",
//     },
//     {
//         id: 815,
//         type_id: 9,
//         description: "Initao",
//     },
//     {
//         id: 816,
//         type_id: 9,
//         description: "Jasaan",
//     },
//     {
//         id: 817,
//         type_id: 9,
//         description: "Kinoguitan",
//     },
//     {
//         id: 818,
//         type_id: 9,
//         description: "Lagonglong",
//     },
//     {
//         id: 819,
//         type_id: 9,
//         description: "Laguindingan",
//     },
//     {
//         id: 820,
//         type_id: 9,
//         description: "Libertad",
//     },
//     {
//         id: 821,
//         type_id: 9,
//         description: "Oroquieta City",
//     },
//     {
//         id: 822,
//         type_id: 9,
//         description: "Ozamis City",
//     },
//     {
//         id: 823,
//         type_id: 9,
//         description: "Tangub City",
//     },
//     {
//         id: 824,
//         type_id: 9,
//         description: "Aloran",
//     },
//     {
//         id: 825,
//         type_id: 9,
//         description: "Baliangao",
//     },
//     {
//         id: 826,
//         type_id: 9,
//         description: "Bonifacio",
//     },
//     {
//         id: 827,
//         type_id: 9,
//         description: "Calamba",
//     },
//     {
//         id: 828,
//         type_id: 9,
//         description: "Clarin",
//     },
//     {
//         id: 829,
//         type_id: 9,
//         description: "Concepcion",
//     },
//     {
//         id: 830,
//         type_id: 9,
//         description: "Don Victoriano Chiongbian",
//     },
//     {
//         id: 831,
//         type_id: 9,
//         description: "Jimenez",
//     },
//     {
//         id: 832,
//         type_id: 9,
//         description: "Lopez Jaena",
//     },
//     {
//         id: 833,
//         type_id: 9,
//         description: "Panaon",
//     },
//     {
//         id: 834,
//         type_id: 9,
//         description: "Plaridel",
//     },
//     {
//         id: 835,
//         type_id: 9,
//         description: "Sapang Dalaga",
//     },
//     {
//         id: 836,
//         type_id: 9,
//         description: "Sinacaban",
//     },
//     {
//         id: 837,
//         type_id: 9,
//         description: "Tudela",
//     },
//     {
//         id: 838,
//         type_id: 9,
//         description: "Compostela",
//     },
//     {
//         id: 839,
//         type_id: 9,
//         description: "Laak",
//     },
//     {
//         id: 840,
//         type_id: 9,
//         description: "Mabini",
//     },
//     {
//         id: 841,
//         type_id: 9,
//         description: "Maco",
//     },
//     {
//         id: 842,
//         type_id: 9,
//         description: "Maragusan",
//     },
//     {
//         id: 843,
//         type_id: 9,
//         description: "Mawab",
//     },
//     {
//         id: 844,
//         type_id: 9,
//         description: "Monkayo",
//     },
//     {
//         id: 845,
//         type_id: 9,
//         description: "Montevista",
//     },
//     {
//         id: 846,
//         type_id: 9,
//         description: "Nabunturan",
//     },
//     {
//         id: 847,
//         type_id: 9,
//         description: "New Bataan",
//     },
//     {
//         id: 848,
//         type_id: 9,
//         description: "Pantukan",
//     },
//     {
//         id: 849,
//         type_id: 9,
//         description: "Island Garden City of Samal",
//     },
//     {
//         id: 850,
//         type_id: 9,
//         description: "Panabo City",
//     },
//     {
//         id: 851,
//         type_id: 9,
//         description: "Tagum City",
//     },
//     {
//         id: 852,
//         type_id: 9,
//         description: "Asuncion",
//     },
//     {
//         id: 853,
//         type_id: 9,
//         description: "Braulio E. Dujali",
//     },
//     {
//         id: 854,
//         type_id: 9,
//         description: "Carmen",
//     },
//     {
//         id: 855,
//         type_id: 9,
//         description: "Kapalong",
//     },
//     {
//         id: 856,
//         type_id: 9,
//         description: "New Corella",
//     },
//     {
//         id: 857,
//         type_id: 9,
//         description: "San Isidro",
//     },
//     {
//         id: 858,
//         type_id: 9,
//         description: "Santo Tomas",
//     },
//     {
//         id: 859,
//         type_id: 9,
//         description: "Talaingod",
//     },
//     {
//         id: 860,
//         type_id: 9,
//         description: "Davao City",
//     },
//     {
//         id: 861,
//         type_id: 9,
//         description: "Digos City",
//     },
//     {
//         id: 862,
//         type_id: 9,
//         description: "Bansalan",
//     },
//     {
//         id: 863,
//         type_id: 9,
//         description: "Hagonoy",
//     },
//     {
//         id: 864,
//         type_id: 9,
//         description: "Kiblawan",
//     },
//     {
//         id: 865,
//         type_id: 9,
//         description: "Magsaysay",
//     },
//     {
//         id: 866,
//         type_id: 9,
//         description: "Malalag",
//     },
//     {
//         id: 867,
//         type_id: 9,
//         description: "Matanao",
//     },
//     {
//         id: 868,
//         type_id: 9,
//         description: "Padada",
//     },
//     {
//         id: 869,
//         type_id: 9,
//         description: "Santa Cruz",
//     },
//     {
//         id: 870,
//         type_id: 9,
//         description: "Sulop",
//     },
//     {
//         id: 871,
//         type_id: 9,
//         description: "City of Mati (Capital)",
//     },
//     {
//         id: 872,
//         type_id: 9,
//         description: "Baganga",
//     },
//     {
//         id: 873,
//         type_id: 9,
//         description: "Banaybanay",
//     },
//     {
//         id: 874,
//         type_id: 9,
//         description: "Boston",
//     },
//     {
//         id: 875,
//         type_id: 9,
//         description: "Caraga",
//     },
//     {
//         id: 876,
//         type_id: 9,
//         description: "Cateel",
//     },
//     {
//         id: 877,
//         type_id: 9,
//         description: "Governor Generoso",
//     },
//     {
//         id: 878,
//         type_id: 9,
//         description: "Lupon",
//     },
//     {
//         id: 879,
//         type_id: 9,
//         description: "Manay",
//     },
//     {
//         id: 880,
//         type_id: 9,
//         description: "San Isidro",
//     },
//     {
//         id: 881,
//         type_id: 9,
//         description: "Tarragona",
//     },
//     {
//         id: 882,
//         type_id: 9,
//         description: "Kidapawan City",
//     },
//     {
//         id: 883,
//         type_id: 9,
//         description: "Alamada",
//     },
//     {
//         id: 884,
//         type_id: 9,
//         description: "Aleosan",
//     },
//     {
//         id: 885,
//         type_id: 9,
//         description: "Antipas",
//     },
//     {
//         id: 886,
//         type_id: 9,
//         description: "Arakan",
//     },
//     {
//         id: 887,
//         type_id: 9,
//         description: "Banisilan",
//     },
//     {
//         id: 888,
//         type_id: 9,
//         description: "Carmen",
//     },
//     {
//         id: 889,
//         type_id: 9,
//         description: "Kabacan",
//     },
//     {
//         id: 890,
//         type_id: 9,
//         description: "Libungan",
//     },
//     {
//         id: 891,
//         type_id: 9,
//         description: "M Lang",
//     },
//     {
//         id: 892,
//         type_id: 9,
//         description: "Magpet",
//     },
//     {
//         id: 893,
//         type_id: 9,
//         description: "Makilala",
//     },
//     {
//         id: 894,
//         type_id: 9,
//         description: "Matalam",
//     },
//     {
//         id: 895,
//         type_id: 9,
//         description: "Midsayap",
//     },
//     {
//         id: 896,
//         type_id: 9,
//         description: "Pigkawayan",
//     },
//     {
//         id: 897,
//         type_id: 9,
//         description: "Pikit",
//     },
//     {
//         id: 898,
//         type_id: 9,
//         description: "President Roxas",
//     },
//     {
//         id: 899,
//         type_id: 9,
//         description: "Tulunan",
//     },
//     {
//         id: 900,
//         type_id: 9,
//         description: "Cotabato City",
//     },
//     {
//         id: 901,
//         type_id: 9,
//         description: "Alabel",
//     },
//     {
//         id: 902,
//         type_id: 9,
//         description: "Glan",
//     },
//     {
//         id: 903,
//         type_id: 9,
//         description: "Kiamba",
//     },
//     {
//         id: 904,
//         type_id: 9,
//         description: "Maasim",
//     },
//     {
//         id: 905,
//         type_id: 9,
//         description: "Maitum",
//     },
//     {
//         id: 906,
//         type_id: 9,
//         description: "Malapatan",
//     },
//     {
//         id: 907,
//         type_id: 9,
//         description: "Malungon",
//     },
//     {
//         id: 908,
//         type_id: 9,
//         description: "General Santos City",
//     },
//     {
//         id: 909,
//         type_id: 9,
//         description: "Koronadal City",
//     },
//     {
//         id: 910,
//         type_id: 9,
//         description: "Banga",
//     },
//     {
//         id: 911,
//         type_id: 9,
//         description: "Lake Sebu",
//     },
//     {
//         id: 912,
//         type_id: 9,
//         description: "Norala",
//     },
//     {
//         id: 913,
//         type_id: 9,
//         description: "Polomolok",
//     },
//     {
//         id: 914,
//         type_id: 9,
//         description: "Santo Niño",
//     },
//     {
//         id: 915,
//         type_id: 9,
//         description: "Surallah",
//     },
//     {
//         id: 916,
//         type_id: 9,
//         description: "T`Boli",
//     },
//     {
//         id: 917,
//         type_id: 9,
//         description: "Tampakan",
//     },
//     {
//         id: 918,
//         type_id: 9,
//         description: "Tantangan",
//     },
//     {
//         id: 919,
//         type_id: 9,
//         description: "Tupi",
//     },
//     {
//         id: 920,
//         type_id: 9,
//         description: "Lebak",
//     },
//     {
//         id: 921,
//         type_id: 9,
//         description: "Lutayan",
//     },
//     {
//         id: 922,
//         type_id: 9,
//         description: "Palimbang",
//     },
//     {
//         id: 923,
//         type_id: 9,
//         description: "President Quirino",
//     },
//     {
//         id: 924,
//         type_id: 9,
//         description: "Sen. Ninoy Aquino",
//     },
//     {
//         id: 925,
//         type_id: 9,
//         description: "Tacurong City",
//     },
//     {
//         id: 926,
//         type_id: 9,
//         description: "Bagumbayan",
//     },
//     {
//         id: 927,
//         type_id: 9,
//         description: "Columbio",
//     },
//     {
//         id: 928,
//         type_id: 9,
//         description: "Esperanza",
//     },
//     {
//         id: 929,
//         type_id: 9,
//         description: "Isulan",
//     },
//     {
//         id: 930,
//         type_id: 9,
//         description: "Kalamansig",
//     },
//     {
//         id: 931,
//         type_id: 9,
//         description: "Lambayong",
//     },
//     {
//         id: 932,
//         type_id: 9,
//         description: "Basilisia (Rizal)",
//     },
//     {
//         id: 933,
//         type_id: 9,
//         description: "Cagdianao",
//     },
//     {
//         id: 934,
//         type_id: 9,
//         description: "Dinagat",
//     },
//     {
//         id: 935,
//         type_id: 9,
//         description: "Libjo (Albor)",
//     },
//     {
//         id: 936,
//         type_id: 9,
//         description: "Loreto",
//     },
//     {
//         id: 937,
//         type_id: 9,
//         description: "San Jose",
//     },
//     {
//         id: 938,
//         type_id: 9,
//         description: "Tubajon",
//     },
//     {
//         id: 939,
//         type_id: 9,
//         description: "Surigao City",
//     },
//     {
//         id: 940,
//         type_id: 9,
//         description: "Alegria",
//     },
//     {
//         id: 941,
//         type_id: 9,
//         description: "Bacuag",
//     },
//     {
//         id: 942,
//         type_id: 9,
//         description: "Burgos",
//     },
//     {
//         id: 943,
//         type_id: 9,
//         description: "Claver",
//     },
//     {
//         id: 944,
//         type_id: 9,
//         description: "Dapa",
//     },
//     {
//         id: 945,
//         type_id: 9,
//         description: "Del Carmen",
//     },
//     {
//         id: 946,
//         type_id: 9,
//         description: "General Luna",
//     },
//     {
//         id: 947,
//         type_id: 9,
//         description: "Gigaquit",
//     },
//     {
//         id: 948,
//         type_id: 9,
//         description: "Mainit",
//     },
//     {
//         id: 949,
//         type_id: 9,
//         description: "Malimono",
//     },
//     {
//         id: 950,
//         type_id: 9,
//         description: "Pilar",
//     },
//     {
//         id: 951,
//         type_id: 9,
//         description: "Placer",
//     },
//     {
//         id: 952,
//         type_id: 9,
//         description: "San Benito",
//     },
//     {
//         id: 953,
//         type_id: 9,
//         description: "San Francisco",
//     },
//     {
//         id: 954,
//         type_id: 9,
//         description: "San Isidro",
//     },
//     {
//         id: 955,
//         type_id: 9,
//         description: "Santa Monica",
//     },
//     {
//         id: 956,
//         type_id: 9,
//         description: "Sison",
//     },
//     {
//         id: 957,
//         type_id: 9,
//         description: "Socorro",
//     },
//     {
//         id: 958,
//         type_id: 9,
//         description: "Tagana-an",
//     },
//     {
//         id: 959,
//         type_id: 9,
//         description: "Tubod",
//     },
//     {
//         id: 960,
//         type_id: 9,
//         description: "San Agustin",
//     },
//     {
//         id: 961,
//         type_id: 9,
//         description: "San Miguel",
//     },
//     {
//         id: 962,
//         type_id: 9,
//         description: "Tagbina",
//     },
//     {
//         id: 963,
//         type_id: 9,
//         description: "Tago",
//     },
//     {
//         id: 964,
//         type_id: 9,
//         description: "Bislig CIty",
//     },
//     {
//         id: 965,
//         type_id: 9,
//         description: "Tandag CIty",
//     },
//     {
//         id: 966,
//         type_id: 9,
//         description: "Barobo",
//     },
//     {
//         id: 967,
//         type_id: 9,
//         description: "Bayabas",
//     },
//     {
//         id: 968,
//         type_id: 9,
//         description: "Cagwait",
//     },
//     {
//         id: 969,
//         type_id: 9,
//         description: "Cantilan",
//     },
//     {
//         id: 970,
//         type_id: 9,
//         description: "Carmen",
//     },
//     {
//         id: 971,
//         type_id: 9,
//         description: "Carrascal",
//     },
//     {
//         id: 972,
//         type_id: 9,
//         description: "Cortes",
//     },
//     {
//         id: 973,
//         type_id: 9,
//         description: "Hinatuan",
//     },
//     {
//         id: 974,
//         type_id: 9,
//         description: "Lanuza",
//     },
//     {
//         id: 975,
//         type_id: 9,
//         description: "Lianga",
//     },
//     {
//         id: 976,
//         type_id: 9,
//         description: "Lingig",
//     },
//     {
//         id: 977,
//         type_id: 9,
//         description: "Madrid",
//     },
//     {
//         id: 978,
//         type_id: 9,
//         description: "Marihatag",
//     },
//     {
//         id: 979,
//         type_id: 9,
//         description: "Sabtang",
//     },
//     {
//         id: 980,
//         type_id: 9,
//         description: "Basco",
//     },
//     {
//         id: 981,
//         type_id: 9,
//         description: "Mahatao",
//     },
//     {
//         id: 982,
//         type_id: 9,
//         description: "Itbayat",
//     },
//     {
//         id: 983,
//         type_id: 9,
//         description: "Ivana",
//     },
//     {
//         id: 984,
//         type_id: 9,
//         description: "Uyugan",
//     },
//     {
//         id: 985,
//         type_id: 9,
//         description: "Tuguegarao City",
//     },
//     {
//         id: 986,
//         type_id: 9,
//         description: "Abulug",
//     },
//     {
//         id: 987,
//         type_id: 9,
//         description: "Alcala",
//     },
//     {
//         id: 988,
//         type_id: 9,
//         description: "Allacapan",
//     },
//     {
//         id: 989,
//         type_id: 9,
//         description: "Amulung",
//     },
//     {
//         id: 990,
//         type_id: 9,
//         description: "Aparri",
//     },
//     {
//         id: 991,
//         type_id: 9,
//         description: "Baggao",
//     },
//     {
//         id: 992,
//         type_id: 9,
//         description: "Ballesteros",
//     },
//     {
//         id: 993,
//         type_id: 9,
//         description: "Buguey",
//     },
//     {
//         id: 994,
//         type_id: 9,
//         description: "Calayan",
//     },
//     {
//         id: 995,
//         type_id: 9,
//         description: "Camalaniugan",
//     },
//     {
//         id: 996,
//         type_id: 9,
//         description: "Claveria",
//     },
//     {
//         id: 997,
//         type_id: 9,
//         description: "Enrile",
//     },
//     {
//         id: 998,
//         type_id: 9,
//         description: "Gattaran",
//     },
//     {
//         id: 999,
//         type_id: 9,
//         description: "Gonzaga",
//     },
//     {
//         id: 1000,
//         type_id: 9,
//         description: "Iguig",
//     },
//     {
//         id: 1001,
//         type_id: 9,
//         description: "Lal-Lo",
//     },
//     {
//         id: 1002,
//         type_id: 9,
//         description: "Lasam",
//     },
//     {
//         id: 1003,
//         type_id: 9,
//         description: "Pamplona",
//     },
//     {
//         id: 1004,
//         type_id: 9,
//         description: "Peñablanca",
//     },
//     {
//         id: 1005,
//         type_id: 9,
//         description: "Piat",
//     },
//     {
//         id: 1006,
//         type_id: 9,
//         description: "Rizal",
//     },
//     {
//         id: 1007,
//         type_id: 9,
//         description: "Sanchez-Mira",
//     },
//     {
//         id: 1008,
//         type_id: 9,
//         description: "Santa Ana",
//     },
//     {
//         id: 1009,
//         type_id: 9,
//         description: "Santa Praxedes",
//     },
//     {
//         id: 1010,
//         type_id: 9,
//         description: "Santa Teresita",
//     },
//     {
//         id: 1011,
//         type_id: 9,
//         description: "Santo Niño",
//     },
//     {
//         id: 1012,
//         type_id: 9,
//         description: "Solana",
//     },
//     {
//         id: 1013,
//         type_id: 9,
//         description: "Tuao",
//     },
//     {
//         id: 1014,
//         type_id: 9,
//         description: "City of Isabela (Capital)",
//     },
//     {
//         id: 1015,
//         type_id: 9,
//         description: "Cauayan City",
//     },
//     {
//         id: 1016,
//         type_id: 9,
//         description: "Santiago City",
//     },
//     {
//         id: 1017,
//         type_id: 9,
//         description: "Alicia",
//     },
//     {
//         id: 1018,
//         type_id: 9,
//         description: "Angadanan",
//     },
//     {
//         id: 1019,
//         type_id: 9,
//         description: "Aurora",
//     },
//     {
//         id: 1020,
//         type_id: 9,
//         description: "Benito Soliven",
//     },
//     {
//         id: 1021,
//         type_id: 9,
//         description: "Burgos",
//     },
//     {
//         id: 1022,
//         type_id: 9,
//         description: "Cabagan",
//     },
//     {
//         id: 1023,
//         type_id: 9,
//         description: "Cabatuan",
//     },
//     {
//         id: 1024,
//         type_id: 9,
//         description: "Cordon",
//     },
//     {
//         id: 1025,
//         type_id: 9,
//         description: "Delfin Albano",
//     },
//     {
//         id: 1026,
//         type_id: 9,
//         description: "Dinapigue",
//     },
//     {
//         id: 1027,
//         type_id: 9,
//         description: "Divilacan",
//     },
//     {
//         id: 1028,
//         type_id: 9,
//         description: "Echague",
//     },
//     {
//         id: 1029,
//         type_id: 9,
//         description: "Gamu",
//     },
//     {
//         id: 1030,
//         type_id: 9,
//         description: "Ilagan",
//     },
//     {
//         id: 1031,
//         type_id: 9,
//         description: "Jones",
//     },
//     {
//         id: 1032,
//         type_id: 9,
//         description: "Luna",
//     },
//     {
//         id: 1033,
//         type_id: 9,
//         description: "Maconacon",
//     },
//     {
//         id: 1034,
//         type_id: 9,
//         description: "Mallig",
//     },
//     {
//         id: 1035,
//         type_id: 9,
//         description: "Naguilian",
//     },
//     {
//         id: 1036,
//         type_id: 9,
//         description: "Palanan",
//     },
//     {
//         id: 1037,
//         type_id: 9,
//         description: "Quezon",
//     },
//     {
//         id: 1038,
//         type_id: 9,
//         description: "Quirino",
//     },
//     {
//         id: 1039,
//         type_id: 9,
//         description: "Ramon",
//     },
//     {
//         id: 1040,
//         type_id: 9,
//         description: "Reina Mercedes",
//     },
//     {
//         id: 1041,
//         type_id: 9,
//         description: "Roxas",
//     },
//     {
//         id: 1042,
//         type_id: 9,
//         description: "San Agustin",
//     },
//     {
//         id: 1043,
//         type_id: 9,
//         description: "San Guillermo",
//     },
//     {
//         id: 1044,
//         type_id: 9,
//         description: "San Isidro",
//     },
//     {
//         id: 1045,
//         type_id: 9,
//         description: "San Manuel",
//     },
//     {
//         id: 1046,
//         type_id: 9,
//         description: "San Mariano",
//     },
//     {
//         id: 1047,
//         type_id: 9,
//         description: "San Mateo",
//     },
//     {
//         id: 1048,
//         type_id: 9,
//         description: "San Pablo",
//     },
//     {
//         id: 1049,
//         type_id: 9,
//         description: "Santa Maria",
//     },
//     {
//         id: 1050,
//         type_id: 9,
//         description: "Santo Tomas",
//     },
//     {
//         id: 1051,
//         type_id: 9,
//         description: "Tumauini",
//     },
//     {
//         id: 1052,
//         type_id: 9,
//         description: "Diadi",
//     },
//     {
//         id: 1053,
//         type_id: 9,
//         description: "Dupax del Norte",
//     },
//     {
//         id: 1054,
//         type_id: 9,
//         description: "Dupax del Sur",
//     },
//     {
//         id: 1055,
//         type_id: 9,
//         description: "Kasibu",
//     },
//     {
//         id: 1056,
//         type_id: 9,
//         description: "Kayapa",
//     },
//     {
//         id: 1057,
//         type_id: 9,
//         description: "Quezon",
//     },
//     {
//         id: 1058,
//         type_id: 9,
//         description: "Santa Fe",
//     },
//     {
//         id: 1059,
//         type_id: 9,
//         description: "Solano",
//     },
//     {
//         id: 1060,
//         type_id: 9,
//         description: "Villaverde",
//     },
//     {
//         id: 1061,
//         type_id: 9,
//         description: "Alfonso Castaneda",
//     },
//     {
//         id: 1062,
//         type_id: 9,
//         description: "Ambaguio",
//     },
//     {
//         id: 1063,
//         type_id: 9,
//         description: "Aritao",
//     },
//     {
//         id: 1064,
//         type_id: 9,
//         description: "Bagabag",
//     },
//     {
//         id: 1065,
//         type_id: 9,
//         description: "Bambang",
//     },
//     {
//         id: 1066,
//         type_id: 9,
//         description: "Bayombong",
//     },
//     {
//         id: 1067,
//         type_id: 9,
//         description: "Aglipay",
//     },
//     {
//         id: 1068,
//         type_id: 9,
//         description: "Cabarroguis",
//     },
//     {
//         id: 1069,
//         type_id: 9,
//         description: "Diffun",
//     },
//     {
//         id: 1070,
//         type_id: 9,
//         description: "Maddela",
//     },
//     {
//         id: 1071,
//         type_id: 9,
//         description: "Nagtipunan",
//     },
//     {
//         id: 1072,
//         type_id: 9,
//         description: "Saguday",
//     },
//     {
//         id: 1073,
//         type_id: 9,
//         description: "Dinalungan",
//     },
//     {
//         id: 1074,
//         type_id: 9,
//         description: "Maria Aurora",
//     },
//     {
//         id: 1075,
//         type_id: 9,
//         description: "San Luis",
//     },
//     {
//         id: 1076,
//         type_id: 9,
//         description: "Dingalan",
//     },
//     {
//         id: 1077,
//         type_id: 9,
//         description: "Dipaculao",
//     },
//     {
//         id: 1078,
//         type_id: 9,
//         description: "Baler",
//     },
//     {
//         id: 1079,
//         type_id: 9,
//         description: "Casiguran",
//     },
//     {
//         id: 1080,
//         type_id: 9,
//         description: "Dilasag",
//     },
//     {
//         id: 1081,
//         type_id: 9,
//         description: "Abucay",
//     },
//     {
//         id: 1082,
//         type_id: 9,
//         description: "Balanga City",
//     },
//     {
//         id: 1083,
//         type_id: 9,
//         description: "Samal",
//     },
//     {
//         id: 1084,
//         type_id: 9,
//         description: "Pilar",
//     },
//     {
//         id: 1085,
//         type_id: 9,
//         description: "Orani",
//     },
//     {
//         id: 1086,
//         type_id: 9,
//         description: "Orion",
//     },
//     {
//         id: 1087,
//         type_id: 9,
//         description: "Morong",
//     },
//     {
//         id: 1088,
//         type_id: 9,
//         description: "Mariveles",
//     },
//     {
//         id: 1089,
//         type_id: 9,
//         description: "Bagac",
//     },
//     {
//         id: 1090,
//         type_id: 9,
//         description: "Dinalupihan",
//     },
//     {
//         id: 1091,
//         type_id: 9,
//         description: "Hermosa",
//     },
//     {
//         id: 1092,
//         type_id: 9,
//         description: "Limay",
//     },
//     {
//         id: 1093,
//         type_id: 9,
//         description: "Malolos City",
//     },
//     {
//         id: 1094,
//         type_id: 9,
//         description: "Meycauayan City",
//     },
//     {
//         id: 1095,
//         type_id: 9,
//         description: "San Jose del Monte City",
//     },
//     {
//         id: 1096,
//         type_id: 9,
//         description: "Angat",
//     },
//     {
//         id: 1097,
//         type_id: 9,
//         description: "Balagtas",
//     },
//     {
//         id: 1098,
//         type_id: 9,
//         description: "Baliuag",
//     },
//     {
//         id: 1099,
//         type_id: 9,
//         description: "Bocaue",
//     },
//     {
//         id: 1100,
//         type_id: 9,
//         description: "Bulacan",
//     },
//     {
//         id: 1101,
//         type_id: 9,
//         description: "Bustos",
//     },
//     {
//         id: 1102,
//         type_id: 9,
//         description: "Calumpit",
//     },
//     {
//         id: 1103,
//         type_id: 9,
//         description: "Doña Remedios Trinidad",
//     },
//     {
//         id: 1104,
//         type_id: 9,
//         description: "Guiguinto",
//     },
//     {
//         id: 1105,
//         type_id: 9,
//         description: "Hagonoy",
//     },
//     {
//         id: 1106,
//         type_id: 9,
//         description: "Marilao",
//     },
//     {
//         id: 1107,
//         type_id: 9,
//         description: "Norzagaray",
//     },
//     {
//         id: 1108,
//         type_id: 9,
//         description: "Obando",
//     },
//     {
//         id: 1109,
//         type_id: 9,
//         description: "Pandi",
//     },
//     {
//         id: 1110,
//         type_id: 9,
//         description: "Paombong",
//     },
//     {
//         id: 1111,
//         type_id: 9,
//         description: "Plaridel",
//     },
//     {
//         id: 1112,
//         type_id: 9,
//         description: "Pulilan",
//     },
//     {
//         id: 1113,
//         type_id: 9,
//         description: "San Ildefonso",
//     },
//     {
//         id: 1114,
//         type_id: 9,
//         description: "San Miguel",
//     },
//     {
//         id: 1115,
//         type_id: 9,
//         description: "San Rafael",
//     },
//     {
//         id: 1116,
//         type_id: 9,
//         description: "Santa Maria",
//     },
//     {
//         id: 1117,
//         type_id: 9,
//         description: "Cabanatuan City",
//     },
//     {
//         id: 1118,
//         type_id: 9,
//         description: "Gapan City",
//     },
//     {
//         id: 1119,
//         type_id: 9,
//         description: "Palayan City",
//     },
//     {
//         id: 1120,
//         type_id: 9,
//         description: "San Jose City",
//     },
//     {
//         id: 1121,
//         type_id: 9,
//         description: "Science City of Muñoz",
//     },
//     {
//         id: 1122,
//         type_id: 9,
//         description: "Aliaga",
//     },
//     {
//         id: 1123,
//         type_id: 9,
//         description: "Bongabon",
//     },
//     {
//         id: 1124,
//         type_id: 9,
//         description: "Cabiao",
//     },
//     {
//         id: 1125,
//         type_id: 9,
//         description: "Carranglan",
//     },
//     {
//         id: 1126,
//         type_id: 9,
//         description: "Cuyapo",
//     },
//     {
//         id: 1127,
//         type_id: 9,
//         description: "Gabaldon",
//     },
//     {
//         id: 1128,
//         type_id: 9,
//         description: "General Mamerto Natividad",
//     },
//     {
//         id: 1129,
//         type_id: 9,
//         description: "General Tinio",
//     },
//     {
//         id: 1130,
//         type_id: 9,
//         description: "Guimba",
//     },
//     {
//         id: 1131,
//         type_id: 9,
//         description: "Jaen",
//     },
//     {
//         id: 1132,
//         type_id: 9,
//         description: "Laur",
//     },
//     {
//         id: 1133,
//         type_id: 9,
//         description: "Licab",
//     },
//     {
//         id: 1134,
//         type_id: 9,
//         description: "Llanera",
//     },
//     {
//         id: 1135,
//         type_id: 9,
//         description: "Lupao",
//     },
//     {
//         id: 1136,
//         type_id: 9,
//         description: "Nampicuan",
//     },
//     {
//         id: 1137,
//         type_id: 9,
//         description: "Pantabangan",
//     },
//     {
//         id: 1138,
//         type_id: 9,
//         description: "Peñaranda",
//     },
//     {
//         id: 1139,
//         type_id: 9,
//         description: "Quezon",
//     },
//     {
//         id: 1140,
//         type_id: 9,
//         description: "Rizal",
//     },
//     {
//         id: 1141,
//         type_id: 9,
//         description: "San Antonio",
//     },
//     {
//         id: 1142,
//         type_id: 9,
//         description: "San Isidro",
//     },
//     {
//         id: 1143,
//         type_id: 9,
//         description: "San Leonardo",
//     },
//     {
//         id: 1144,
//         type_id: 9,
//         description: "Santa Rosa",
//     },
//     {
//         id: 1145,
//         type_id: 9,
//         description: "Santo Domingo",
//     },
//     {
//         id: 1146,
//         type_id: 9,
//         description: "Talavera",
//     },
//     {
//         id: 1147,
//         type_id: 9,
//         description: "Talugtug",
//     },
//     {
//         id: 1148,
//         type_id: 9,
//         description: "Zaragoza",
//     },
//     {
//         id: 1149,
//         type_id: 9,
//         description: "Angeles City",
//     },
//     {
//         id: 1150,
//         type_id: 9,
//         description: "Magalang",
//     },
//     {
//         id: 1151,
//         type_id: 9,
//         description: "Masantol",
//     },
//     {
//         id: 1152,
//         type_id: 9,
//         description: "Mexico",
//     },
//     {
//         id: 1153,
//         type_id: 9,
//         description: "Minalin",
//     },
//     {
//         id: 1154,
//         type_id: 9,
//         description: "Porac",
//     },
//     {
//         id: 1155,
//         type_id: 9,
//         description: "San Luis",
//     },
//     {
//         id: 1156,
//         type_id: 9,
//         description: "San Simon",
//     },
//     {
//         id: 1157,
//         type_id: 9,
//         description: "Santa Ana",
//     },
//     {
//         id: 1158,
//         type_id: 9,
//         description: "Santa Rita",
//     },
//     {
//         id: 1159,
//         type_id: 9,
//         description: "Santo Tomas",
//     },
//     {
//         id: 1160,
//         type_id: 9,
//         description: "City of San Fernando",
//     },
//     {
//         id: 1161,
//         type_id: 9,
//         description: "Apalit",
//     },
//     {
//         id: 1162,
//         type_id: 9,
//         description: "Arayat",
//     },
//     {
//         id: 1163,
//         type_id: 9,
//         description: "Bacolor",
//     },
//     {
//         id: 1164,
//         type_id: 9,
//         description: "Candaba",
//     },
//     {
//         id: 1165,
//         type_id: 9,
//         description: "Floridablanca",
//     },
//     {
//         id: 1166,
//         type_id: 9,
//         description: "Guagua",
//     },
//     {
//         id: 1167,
//         type_id: 9,
//         description: "Lubao",
//     },
//     {
//         id: 1168,
//         type_id: 9,
//         description: "Mabalacat",
//     },
//     {
//         id: 1169,
//         type_id: 9,
//         description: "Macabebe",
//     },
//     {
//         id: 1170,
//         type_id: 9,
//         description: "Sasmuan",
//     },
//     {
//         id: 1171,
//         type_id: 9,
//         description: "Santa Ignacia",
//     },
//     {
//         id: 1172,
//         type_id: 9,
//         description: "Victoria",
//     },
//     {
//         id: 1173,
//         type_id: 9,
//         description: "Tarlac City",
//     },
//     {
//         id: 1174,
//         type_id: 9,
//         description: "Anao",
//     },
//     {
//         id: 1175,
//         type_id: 9,
//         description: "Bamban",
//     },
//     {
//         id: 1176,
//         type_id: 9,
//         description: "Camiling",
//     },
//     {
//         id: 1177,
//         type_id: 9,
//         description: "Capas",
//     },
//     {
//         id: 1178,
//         type_id: 9,
//         description: "Concepcion",
//     },
//     {
//         id: 1179,
//         type_id: 9,
//         description: "Gerona",
//     },
//     {
//         id: 1180,
//         type_id: 9,
//         description: "La Paz",
//     },
//     {
//         id: 1181,
//         type_id: 9,
//         description: "Mayantoc",
//     },
//     {
//         id: 1182,
//         type_id: 9,
//         description: "Moncada",
//     },
//     {
//         id: 1183,
//         type_id: 9,
//         description: "Paniqui",
//     },
//     {
//         id: 1184,
//         type_id: 9,
//         description: "Pura",
//     },
//     {
//         id: 1185,
//         type_id: 9,
//         description: "Ramos",
//     },
//     {
//         id: 1186,
//         type_id: 9,
//         description: "San Clemente",
//     },
//     {
//         id: 1187,
//         type_id: 9,
//         description: "San Jose",
//     },
//     {
//         id: 1188,
//         type_id: 9,
//         description: "San Manuel",
//     },
//     {
//         id: 1189,
//         type_id: 9,
//         description: "Olongapo City",
//     },
//     {
//         id: 1190,
//         type_id: 9,
//         description: "Botolan",
//     },
//     {
//         id: 1191,
//         type_id: 9,
//         description: "Cabangan",
//     },
//     {
//         id: 1192,
//         type_id: 9,
//         description: "Candelaria",
//     },
//     {
//         id: 1193,
//         type_id: 9,
//         description: "Castillejos",
//     },
//     {
//         id: 1194,
//         type_id: 9,
//         description: "Iba",
//     },
//     {
//         id: 1195,
//         type_id: 9,
//         description: "Masinloc",
//     },
//     {
//         id: 1196,
//         type_id: 9,
//         description: "Palauig",
//     },
//     {
//         id: 1197,
//         type_id: 9,
//         description: "San Antonio",
//     },
//     {
//         id: 1198,
//         type_id: 9,
//         description: "San Felipe",
//     },
//     {
//         id: 1199,
//         type_id: 9,
//         description: "San Marcelino",
//     },
//     {
//         id: 1200,
//         type_id: 9,
//         description: "San Narciso",
//     },
//     {
//         id: 1201,
//         type_id: 9,
//         description: "Santa Cruz",
//     },
//     {
//         id: 1202,
//         type_id: 9,
//         description: "Subic",
//     },
//     {
//         id: 1203,
//         type_id: 9,
//         description: "Lobo",
//     },
//     {
//         id: 1204,
//         type_id: 9,
//         description: "Mabini",
//     },
//     {
//         id: 1205,
//         type_id: 9,
//         description: "Malvar",
//     },
//     {
//         id: 1206,
//         type_id: 9,
//         description: "Mataas na Kahoy",
//     },
//     {
//         id: 1207,
//         type_id: 9,
//         description: "Nasugbu",
//     },
//     {
//         id: 1208,
//         type_id: 9,
//         description: "Padre Garcia",
//     },
//     {
//         id: 1209,
//         type_id: 9,
//         description: "Rosario",
//     },
//     {
//         id: 1210,
//         type_id: 9,
//         description: "San Jose",
//     },
//     {
//         id: 1211,
//         type_id: 9,
//         description: "San Juan",
//     },
//     {
//         id: 1212,
//         type_id: 9,
//         description: "San Luis",
//     },
//     {
//         id: 1213,
//         type_id: 9,
//         description: "San Nicolas",
//     },
//     {
//         id: 1214,
//         type_id: 9,
//         description: "San Pascual",
//     },
//     {
//         id: 1215,
//         type_id: 9,
//         description: "Santa Teresita",
//     },
//     {
//         id: 1216,
//         type_id: 9,
//         description: "Santo Tomas",
//     },
//     {
//         id: 1217,
//         type_id: 9,
//         description: "Taal",
//     },
//     {
//         id: 1218,
//         type_id: 9,
//         description: "Talisay",
//     },
//     {
//         id: 1219,
//         type_id: 9,
//         description: "Taysan",
//     },
//     {
//         id: 1220,
//         type_id: 9,
//         description: "Tingloy",
//     },
//     {
//         id: 1221,
//         type_id: 9,
//         description: "Tuy",
//     },
//     {
//         id: 1222,
//         type_id: 9,
//         description: "Lemery",
//     },
//     {
//         id: 1223,
//         type_id: 9,
//         description: "Laurel",
//     },
//     {
//         id: 1224,
//         type_id: 9,
//         description: "Ibaan",
//     },
//     {
//         id: 1225,
//         type_id: 9,
//         description: "Cuenca",
//     },
//     {
//         id: 1226,
//         type_id: 9,
//         description: "Calatagan",
//     },
//     {
//         id: 1227,
//         type_id: 9,
//         description: "Calaca",
//     },
//     {
//         id: 1228,
//         type_id: 9,
//         description: "Bauan",
//     },
//     {
//         id: 1229,
//         type_id: 9,
//         description: "Balete",
//     },
//     {
//         id: 1230,
//         type_id: 9,
//         description: "Balayan",
//     },
//     {
//         id: 1231,
//         type_id: 9,
//         description: "Alitagtag",
//     },
//     {
//         id: 1232,
//         type_id: 9,
//         description: "Agoncillo",
//     },
//     {
//         id: 1233,
//         type_id: 9,
//         description: "Tanauan City",
//     },
//     {
//         id: 1234,
//         type_id: 9,
//         description: "Lipa City",
//     },
//     {
//         id: 1235,
//         type_id: 9,
//         description: "Batangas City",
//     },
//     {
//         id: 1236,
//         type_id: 9,
//         description: "Lian",
//     },
//     {
//         id: 1237,
//         type_id: 9,
//         description: "Cavite City",
//     },
//     {
//         id: 1238,
//         type_id: 9,
//         description: "Tagaytay City",
//     },
//     {
//         id: 1239,
//         type_id: 9,
//         description: "Trece Martires City",
//     },
//     {
//         id: 1240,
//         type_id: 9,
//         description: "Alfonso",
//     },
//     {
//         id: 1241,
//         type_id: 9,
//         description: "Amadeo",
//     },
//     {
//         id: 1242,
//         type_id: 9,
//         description: "Bacoor",
//     },
//     {
//         id: 1243,
//         type_id: 9,
//         description: "Carmona",
//     },
//     {
//         id: 1244,
//         type_id: 9,
//         description: "Dasmariñas",
//     },
//     {
//         id: 1245,
//         type_id: 9,
//         description: "Gen. Mariano Alvarez",
//     },
//     {
//         id: 1246,
//         type_id: 9,
//         description: "Gen. Emilio Aguinaldo",
//     },
//     {
//         id: 1247,
//         type_id: 9,
//         description: "Gen. Trias",
//     },
//     {
//         id: 1248,
//         type_id: 9,
//         description: "Imus",
//     },
//     {
//         id: 1249,
//         type_id: 9,
//         description: "Indang",
//     },
//     {
//         id: 1250,
//         type_id: 9,
//         description: "Kawit",
//     },
//     {
//         id: 1251,
//         type_id: 9,
//         description: "Magallanes",
//     },
//     {
//         id: 1252,
//         type_id: 9,
//         description: "Maragondon",
//     },
//     {
//         id: 1253,
//         type_id: 9,
//         description: "Mendez",
//     },
//     {
//         id: 1254,
//         type_id: 9,
//         description: "Naic",
//     },
//     {
//         id: 1255,
//         type_id: 9,
//         description: "Noveleta",
//     },
//     {
//         id: 1256,
//         type_id: 9,
//         description: "Rosario",
//     },
//     {
//         id: 1257,
//         type_id: 9,
//         description: "Silang",
//     },
//     {
//         id: 1258,
//         type_id: 9,
//         description: "Tanza",
//     },
//     {
//         id: 1259,
//         type_id: 9,
//         description: "Ternate",
//     },
//     {
//         id: 1260,
//         type_id: 9,
//         description: "Calamba City",
//     },
//     {
//         id: 1261,
//         type_id: 9,
//         description: "San Pablo City",
//     },
//     {
//         id: 1262,
//         type_id: 9,
//         description: "Santa Rosa City",
//     },
//     {
//         id: 1263,
//         type_id: 9,
//         description: "Alaminos",
//     },
//     {
//         id: 1264,
//         type_id: 9,
//         description: "Bay",
//     },
//     {
//         id: 1265,
//         type_id: 9,
//         description: "Biñan",
//     },
//     {
//         id: 1266,
//         type_id: 9,
//         description: "Cabuyao",
//     },
//     {
//         id: 1267,
//         type_id: 9,
//         description: "Calauan",
//     },
//     {
//         id: 1268,
//         type_id: 9,
//         description: "Cavinti",
//     },
//     {
//         id: 1269,
//         type_id: 9,
//         description: "Famy",
//     },
//     {
//         id: 1270,
//         type_id: 9,
//         description: "Kalayaan",
//     },
//     {
//         id: 1271,
//         type_id: 9,
//         description: "Liliw",
//     },
//     {
//         id: 1272,
//         type_id: 9,
//         description: "Los Baños",
//     },
//     {
//         id: 1273,
//         type_id: 9,
//         description: "Luisiana",
//     },
//     {
//         id: 1274,
//         type_id: 9,
//         description: "Lumban",
//     },
//     {
//         id: 1275,
//         type_id: 9,
//         description: "Mabitac",
//     },
//     {
//         id: 1276,
//         type_id: 9,
//         description: "Magdalena",
//     },
//     {
//         id: 1277,
//         type_id: 9,
//         description: "Majayjay",
//     },
//     {
//         id: 1278,
//         type_id: 9,
//         description: "Nagcarlan",
//     },
//     {
//         id: 1279,
//         type_id: 9,
//         description: "Paete",
//     },
//     {
//         id: 1280,
//         type_id: 9,
//         description: "Pagsanjan",
//     },
//     {
//         id: 1281,
//         type_id: 9,
//         description: "Pakil",
//     },
//     {
//         id: 1282,
//         type_id: 9,
//         description: "Pangil",
//     },
//     {
//         id: 1283,
//         type_id: 9,
//         description: "Pila",
//     },
//     {
//         id: 1284,
//         type_id: 9,
//         description: "Rizal",
//     },
//     {
//         id: 1285,
//         type_id: 9,
//         description: "San Pedro",
//     },
//     {
//         id: 1286,
//         type_id: 9,
//         description: "Santa Cruz",
//     },
//     {
//         id: 1287,
//         type_id: 9,
//         description: "Santa Maria",
//     },
//     {
//         id: 1288,
//         type_id: 9,
//         description: "Siniloan",
//     },
//     {
//         id: 1289,
//         type_id: 9,
//         description: "Victoria",
//     },
//     {
//         id: 1290,
//         type_id: 9,
//         description: "Boac",
//     },
//     {
//         id: 1291,
//         type_id: 9,
//         description: "Buenavista",
//     },
//     {
//         id: 1292,
//         type_id: 9,
//         description: "Gasan",
//     },
//     {
//         id: 1293,
//         type_id: 9,
//         description: "Mogpog",
//     },
//     {
//         id: 1294,
//         type_id: 9,
//         description: "Santa Cruz",
//     },
//     {
//         id: 1295,
//         type_id: 9,
//         description: "Torrijos",
//     },
//     {
//         id: 1296,
//         type_id: 9,
//         description: "Abra de Ilog",
//     },
//     {
//         id: 1297,
//         type_id: 9,
//         description: "Calintaan",
//     },
//     {
//         id: 1298,
//         type_id: 9,
//         description: "Looc",
//     },
//     {
//         id: 1299,
//         type_id: 9,
//         description: "Lubang",
//     },
//     {
//         id: 1300,
//         type_id: 9,
//         description: "Magsaysay",
//     },
//     {
//         id: 1301,
//         type_id: 9,
//         description: "Mamburao",
//     },
//     {
//         id: 1302,
//         type_id: 9,
//         description: "Paluan",
//     },
//     {
//         id: 1303,
//         type_id: 9,
//         description: "Rizal",
//     },
//     {
//         id: 1304,
//         type_id: 9,
//         description: "Sablayan",
//     },
//     {
//         id: 1305,
//         type_id: 9,
//         description: "San Jose",
//     },
//     {
//         id: 1306,
//         type_id: 9,
//         description: "Santa Cruz",
//     },
//     {
//         id: 1307,
//         type_id: 9,
//         description: "Puerto Galera",
//     },
//     {
//         id: 1308,
//         type_id: 9,
//         description: "Roxas",
//     },
//     {
//         id: 1309,
//         type_id: 9,
//         description: "San Teodoro",
//     },
//     {
//         id: 1310,
//         type_id: 9,
//         description: "Socorro",
//     },
//     {
//         id: 1311,
//         type_id: 9,
//         description: "Victoria",
//     },
//     {
//         id: 1312,
//         type_id: 9,
//         description: "Calapan City",
//     },
//     {
//         id: 1313,
//         type_id: 9,
//         description: "Baco",
//     },
//     {
//         id: 1314,
//         type_id: 9,
//         description: "Bansud",
//     },
//     {
//         id: 1315,
//         type_id: 9,
//         description: "Bongabong",
//     },
//     {
//         id: 1316,
//         type_id: 9,
//         description: "Bulalacao",
//     },
//     {
//         id: 1317,
//         type_id: 9,
//         description: "Gloria",
//     },
//     {
//         id: 1318,
//         type_id: 9,
//         description: "Mansalay",
//     },
//     {
//         id: 1319,
//         type_id: 9,
//         description: "Naujan",
//     },
//     {
//         id: 1320,
//         type_id: 9,
//         description: "Pinamalayan",
//     },
//     {
//         id: 1321,
//         type_id: 9,
//         description: "Pola",
//     },
//     {
//         id: 1322,
//         type_id: 9,
//         description: "Linapacan",
//     },
//     {
//         id: 1323,
//         type_id: 9,
//         description: "Magsaysay",
//     },
//     {
//         id: 1324,
//         type_id: 9,
//         description: "Narra",
//     },
//     {
//         id: 1325,
//         type_id: 9,
//         description: "Quezon",
//     },
//     {
//         id: 1326,
//         type_id: 9,
//         description: "Rizal",
//     },
//     {
//         id: 1327,
//         type_id: 9,
//         description: "Roxas",
//     },
//     {
//         id: 1328,
//         type_id: 9,
//         description: "San Vicente",
//     },
//     {
//         id: 1329,
//         type_id: 9,
//         description: "Sofronio Española",
//     },
//     {
//         id: 1330,
//         type_id: 9,
//         description: "Taytay",
//     },
//     {
//         id: 1331,
//         type_id: 9,
//         description: "Bataraza",
//     },
//     {
//         id: 1332,
//         type_id: 9,
//         description: "Brooke`s Point",
//     },
//     {
//         id: 1333,
//         type_id: 9,
//         description: "Busuanga",
//     },
//     {
//         id: 1334,
//         type_id: 9,
//         description: "Cagayancillo",
//     },
//     {
//         id: 1335,
//         type_id: 9,
//         description: "Coron",
//     },
//     {
//         id: 1336,
//         type_id: 9,
//         description: "Culion",
//     },
//     {
//         id: 1337,
//         type_id: 9,
//         description: "Cuyo",
//     },
//     {
//         id: 1338,
//         type_id: 9,
//         description: "Dumaran",
//     },
//     {
//         id: 1339,
//         type_id: 9,
//         description: "El Nido",
//     },
//     {
//         id: 1340,
//         type_id: 9,
//         description: "Kalayaan",
//     },
//     {
//         id: 1341,
//         type_id: 9,
//         description: "Puerto Princesa City",
//     },
//     {
//         id: 1342,
//         type_id: 9,
//         description: "Aborlan",
//     },
//     {
//         id: 1343,
//         type_id: 9,
//         description: "Agutaya",
//     },
//     {
//         id: 1344,
//         type_id: 9,
//         description: "Araceli",
//     },
//     {
//         id: 1345,
//         type_id: 9,
//         description: "Balabac",
//     },
//     {
//         id: 1346,
//         type_id: 9,
//         description: "Real",
//     },
//     {
//         id: 1347,
//         type_id: 9,
//         description: "Sampaloc",
//     },
//     {
//         id: 1348,
//         type_id: 9,
//         description: "San Andres",
//     },
//     {
//         id: 1349,
//         type_id: 9,
//         description: "San Antonio",
//     },
//     {
//         id: 1350,
//         type_id: 9,
//         description: "San Francisco",
//     },
//     {
//         id: 1351,
//         type_id: 9,
//         description: "San Narciso",
//     },
//     {
//         id: 1352,
//         type_id: 9,
//         description: "Sariaya",
//     },
//     {
//         id: 1353,
//         type_id: 9,
//         description: "Tagkawayan",
//     },
//     {
//         id: 1354,
//         type_id: 9,
//         description: "Tiaong",
//     },
//     {
//         id: 1355,
//         type_id: 9,
//         description: "Unisan",
//     },
//     {
//         id: 1356,
//         type_id: 9,
//         description: "Mulanay",
//     },
//     {
//         id: 1357,
//         type_id: 9,
//         description: "Padre Burgos",
//     },
//     {
//         id: 1358,
//         type_id: 9,
//         description: "Pagbilao",
//     },
//     {
//         id: 1359,
//         type_id: 9,
//         description: "Panukulan",
//     },
//     {
//         id: 1360,
//         type_id: 9,
//         description: "Patnanungan",
//     },
//     {
//         id: 1361,
//         type_id: 9,
//         description: "Perez",
//     },
//     {
//         id: 1362,
//         type_id: 9,
//         description: "Pitogo",
//     },
//     {
//         id: 1363,
//         type_id: 9,
//         description: "Plaridel",
//     },
//     {
//         id: 1364,
//         type_id: 9,
//         description: "Polillo",
//     },
//     {
//         id: 1365,
//         type_id: 9,
//         description: "Quezon",
//     },
//     {
//         id: 1366,
//         type_id: 9,
//         description: "General Luna",
//     },
//     {
//         id: 1367,
//         type_id: 9,
//         description: "General Nakar",
//     },
//     {
//         id: 1368,
//         type_id: 9,
//         description: "Guinayangan",
//     },
//     {
//         id: 1369,
//         type_id: 9,
//         description: "Gumaca",
//     },
//     {
//         id: 1370,
//         type_id: 9,
//         description: "Infanta",
//     },
//     {
//         id: 1371,
//         type_id: 9,
//         description: "Jomalig",
//     },
//     {
//         id: 1372,
//         type_id: 9,
//         description: "Lopez",
//     },
//     {
//         id: 1373,
//         type_id: 9,
//         description: "Lucban",
//     },
//     {
//         id: 1374,
//         type_id: 9,
//         description: "Macalelon",
//     },
//     {
//         id: 1375,
//         type_id: 9,
//         description: "Mauban",
//     },
//     {
//         id: 1376,
//         type_id: 9,
//         description: "Lucena City",
//     },
//     {
//         id: 1377,
//         type_id: 9,
//         description: "Tayabas City",
//     },
//     {
//         id: 1378,
//         type_id: 9,
//         description: "Agbangan",
//     },
//     {
//         id: 1379,
//         type_id: 9,
//         description: "Alabat",
//     },
//     {
//         id: 1380,
//         type_id: 9,
//         description: "Atimonan",
//     },
//     {
//         id: 1381,
//         type_id: 9,
//         description: "Buenavista",
//     },
//     {
//         id: 1382,
//         type_id: 9,
//         description: "Burdeos",
//     },
//     {
//         id: 1383,
//         type_id: 9,
//         description: "Calauag",
//     },
//     {
//         id: 1384,
//         type_id: 9,
//         description: "Candelaria",
//     },
//     {
//         id: 1385,
//         type_id: 9,
//         description: "Catanauan",
//     },
//     {
//         id: 1386,
//         type_id: 9,
//         description: "Dolores",
//     },
//     {
//         id: 1387,
//         type_id: 9,
//         description: "Alcantara",
//     },
//     {
//         id: 1388,
//         type_id: 9,
//         description: "Banton",
//     },
//     {
//         id: 1389,
//         type_id: 9,
//         description: "Cajidiocan",
//     },
//     {
//         id: 1390,
//         type_id: 9,
//         description: "Calatrava",
//     },
//     {
//         id: 1391,
//         type_id: 9,
//         description: "Concepcion",
//     },
//     {
//         id: 1392,
//         type_id: 9,
//         description: "Corcuera",
//     },
//     {
//         id: 1393,
//         type_id: 9,
//         description: "Ferrol",
//     },
//     {
//         id: 1394,
//         type_id: 9,
//         description: "Looc",
//     },
//     {
//         id: 1395,
//         type_id: 9,
//         description: "Magdiwang",
//     },
//     {
//         id: 1396,
//         type_id: 9,
//         description: "Odiongan",
//     },
//     {
//         id: 1397,
//         type_id: 9,
//         description: "Romblon",
//     },
//     {
//         id: 1398,
//         type_id: 9,
//         description: "San Agustin",
//     },
//     {
//         id: 1399,
//         type_id: 9,
//         description: "San Andres",
//     },
//     {
//         id: 1400,
//         type_id: 9,
//         description: "San Fernando",
//     },
//     {
//         id: 1401,
//         type_id: 9,
//         description: "San Jose",
//     },
//     {
//         id: 1402,
//         type_id: 9,
//         description: "Santa Fe",
//     },
//     {
//         id: 1403,
//         type_id: 9,
//         description: "Santa Maria",
//     },
//     {
//         id: 1404,
//         type_id: 9,
//         description: "Ligao City",
//     },
//     {
//         id: 1405,
//         type_id: 9,
//         description: "Tabaco City",
//     },
//     {
//         id: 1406,
//         type_id: 9,
//         description: "Legazpi City",
//     },
//     {
//         id: 1407,
//         type_id: 9,
//         description: "Bacacay",
//     },
//     {
//         id: 1408,
//         type_id: 9,
//         description: "Camalig",
//     },
//     {
//         id: 1409,
//         type_id: 9,
//         description: "Daraga",
//     },
//     {
//         id: 1410,
//         type_id: 9,
//         description: "Guinobatan",
//     },
//     {
//         id: 1411,
//         type_id: 9,
//         description: "Jovellar",
//     },
//     {
//         id: 1412,
//         type_id: 9,
//         description: "Libon",
//     },
//     {
//         id: 1413,
//         type_id: 9,
//         description: "Malilipot",
//     },
//     {
//         id: 1414,
//         type_id: 9,
//         description: "Malinao",
//     },
//     {
//         id: 1415,
//         type_id: 9,
//         description: "Manito",
//     },
//     {
//         id: 1416,
//         type_id: 9,
//         description: "Oas",
//     },
//     {
//         id: 1417,
//         type_id: 9,
//         description: "Pio Duran",
//     },
//     {
//         id: 1418,
//         type_id: 9,
//         description: "Polangui",
//     },
//     {
//         id: 1419,
//         type_id: 9,
//         description: "Rapu-Rapu",
//     },
//     {
//         id: 1420,
//         type_id: 9,
//         description: "Santo Domingo",
//     },
//     {
//         id: 1421,
//         type_id: 9,
//         description: "Tiwi",
//     },
//     {
//         id: 1422,
//         type_id: 9,
//         description: "Basud",
//     },
//     {
//         id: 1423,
//         type_id: 9,
//         description: "Capalonga",
//     },
//     {
//         id: 1424,
//         type_id: 9,
//         description: "Daet",
//     },
//     {
//         id: 1425,
//         type_id: 9,
//         description: "Jose Panganiban",
//     },
//     {
//         id: 1426,
//         type_id: 9,
//         description: "Labo",
//     },
//     {
//         id: 1427,
//         type_id: 9,
//         description: "Mercedes",
//     },
//     {
//         id: 1428,
//         type_id: 9,
//         description: "Paracale",
//     },
//     {
//         id: 1429,
//         type_id: 9,
//         description: "San Lorenzo Ruiz",
//     },
//     {
//         id: 1430,
//         type_id: 9,
//         description: "San Vicente",
//     },
//     {
//         id: 1431,
//         type_id: 9,
//         description: "Santa Elena",
//     },
//     {
//         id: 1432,
//         type_id: 9,
//         description: "Talisay",
//     },
//     {
//         id: 1433,
//         type_id: 9,
//         description: "Vinzons",
//     },
//     {
//         id: 1434,
//         type_id: 9,
//         description: "Iriga City",
//     },
//     {
//         id: 1435,
//         type_id: 9,
//         description: "Naga City",
//     },
//     {
//         id: 1436,
//         type_id: 9,
//         description: "Baao",
//     },
//     {
//         id: 1437,
//         type_id: 9,
//         description: "Balatan",
//     },
//     {
//         id: 1438,
//         type_id: 9,
//         description: "Bato",
//     },
//     {
//         id: 1439,
//         type_id: 9,
//         description: "Bombon",
//     },
//     {
//         id: 1440,
//         type_id: 9,
//         description: "Buhi",
//     },
//     {
//         id: 1441,
//         type_id: 9,
//         description: "Bula",
//     },
//     {
//         id: 1442,
//         type_id: 9,
//         description: "Cabusao",
//     },
//     {
//         id: 1443,
//         type_id: 9,
//         description: "Calabanga",
//     },
//     {
//         id: 1444,
//         type_id: 9,
//         description: "Camaligan",
//     },
//     {
//         id: 1445,
//         type_id: 9,
//         description: "Canaman",
//     },
//     {
//         id: 1446,
//         type_id: 9,
//         description: "Caramoan",
//     },
//     {
//         id: 1447,
//         type_id: 9,
//         description: "Del Gallego",
//     },
//     {
//         id: 1448,
//         type_id: 9,
//         description: "Gainza",
//     },
//     {
//         id: 1449,
//         type_id: 9,
//         description: "Garchitorena",
//     },
//     {
//         id: 1450,
//         type_id: 9,
//         description: "Goa",
//     },
//     {
//         id: 1451,
//         type_id: 9,
//         description: "Lagonoy",
//     },
//     {
//         id: 1452,
//         type_id: 9,
//         description: "Libmanan",
//     },
//     {
//         id: 1453,
//         type_id: 9,
//         description: "Lupi",
//     },
//     {
//         id: 1454,
//         type_id: 9,
//         description: "Magarao",
//     },
//     {
//         id: 1455,
//         type_id: 9,
//         description: "Milaor",
//     },
//     {
//         id: 1456,
//         type_id: 9,
//         description: "Minalabac",
//     },
//     {
//         id: 1457,
//         type_id: 9,
//         description: "Nabua",
//     },
//     {
//         id: 1458,
//         type_id: 9,
//         description: "Ocampo",
//     },
//     {
//         id: 1459,
//         type_id: 9,
//         description: "Pamplona",
//     },
//     {
//         id: 1460,
//         type_id: 9,
//         description: "Pasacao",
//     },
//     {
//         id: 1461,
//         type_id: 9,
//         description: "Pili",
//     },
//     {
//         id: 1462,
//         type_id: 9,
//         description: "Presentacion",
//     },
//     {
//         id: 1463,
//         type_id: 9,
//         description: "Ragay",
//     },
//     {
//         id: 1464,
//         type_id: 9,
//         description: "Sagñay",
//     },
//     {
//         id: 1465,
//         type_id: 9,
//         description: "San Fernando",
//     },
//     {
//         id: 1466,
//         type_id: 9,
//         description: "San Jose",
//     },
//     {
//         id: 1467,
//         type_id: 9,
//         description: "Sipocot",
//     },
//     {
//         id: 1468,
//         type_id: 9,
//         description: "Siruma",
//     },
//     {
//         id: 1469,
//         type_id: 9,
//         description: "Tigaon",
//     },
//     {
//         id: 1470,
//         type_id: 9,
//         description: "Tinambac",
//     },
//     {
//         id: 1471,
//         type_id: 9,
//         description: "Bagamanoc",
//     },
//     {
//         id: 1472,
//         type_id: 9,
//         description: "Baras",
//     },
//     {
//         id: 1473,
//         type_id: 9,
//         description: "Bato",
//     },
//     {
//         id: 1474,
//         type_id: 9,
//         description: "Caramoran",
//     },
//     {
//         id: 1475,
//         type_id: 9,
//         description: "Gigmoto",
//     },
//     {
//         id: 1476,
//         type_id: 9,
//         description: "Pandan",
//     },
//     {
//         id: 1477,
//         type_id: 9,
//         description: "Panganiban",
//     },
//     {
//         id: 1478,
//         type_id: 9,
//         description: "San Andres",
//     },
//     {
//         id: 1479,
//         type_id: 9,
//         description: "San Miguel",
//     },
//     {
//         id: 1480,
//         type_id: 9,
//         description: "Viga",
//     },
//     {
//         id: 1481,
//         type_id: 9,
//         description: "Virac",
//     },
//     {
//         id: 1482,
//         type_id: 9,
//         description: "Masbate City",
//     },
//     {
//         id: 1483,
//         type_id: 9,
//         description: "Aroroy",
//     },
//     {
//         id: 1484,
//         type_id: 9,
//         description: "Baleno",
//     },
//     {
//         id: 1485,
//         type_id: 9,
//         description: "Balud",
//     },
//     {
//         id: 1486,
//         type_id: 9,
//         description: "Batuan",
//     },
//     {
//         id: 1487,
//         type_id: 9,
//         description: "Cataingan",
//     },
//     {
//         id: 1488,
//         type_id: 9,
//         description: "Cawayan",
//     },
//     {
//         id: 1489,
//         type_id: 9,
//         description: "Claveria",
//     },
//     {
//         id: 1490,
//         type_id: 9,
//         description: "Dimasalang",
//     },
//     {
//         id: 1491,
//         type_id: 9,
//         description: "Esperanza",
//     },
//     {
//         id: 1492,
//         type_id: 9,
//         description: "Mandaon",
//     },
//     {
//         id: 1493,
//         type_id: 9,
//         description: "Milagros",
//     },
//     {
//         id: 1494,
//         type_id: 9,
//         description: "Mobo",
//     },
//     {
//         id: 1495,
//         type_id: 9,
//         description: "Monreal",
//     },
//     {
//         id: 1496,
//         type_id: 9,
//         description: "Palanas",
//     },
//     {
//         id: 1497,
//         type_id: 9,
//         description: "Pio V. Corpuz",
//     },
//     {
//         id: 1498,
//         type_id: 9,
//         description: "Placer",
//     },
//     {
//         id: 1499,
//         type_id: 9,
//         description: "San Fernando",
//     },
//     {
//         id: 1500,
//         type_id: 9,
//         description: "San Jacinto",
//     },
//     {
//         id: 1501,
//         type_id: 9,
//         description: "San Pascual",
//     },
//     {
//         id: 1502,
//         type_id: 9,
//         description: "Uson",
//     },
//     {
//         id: 1503,
//         type_id: 9,
//         description: "Bulusan",
//     },
//     {
//         id: 1504,
//         type_id: 9,
//         description: "Casiguran",
//     },
//     {
//         id: 1505,
//         type_id: 9,
//         description: "Castilla",
//     },
//     {
//         id: 1506,
//         type_id: 9,
//         description: "Donsol",
//     },
//     {
//         id: 1507,
//         type_id: 9,
//         description: "Gubat",
//     },
//     {
//         id: 1508,
//         type_id: 9,
//         description: "Irosin",
//     },
//     {
//         id: 1509,
//         type_id: 9,
//         description: "Juban",
//     },
//     {
//         id: 1510,
//         type_id: 9,
//         description: "Magallanes",
//     },
//     {
//         id: 1511,
//         type_id: 9,
//         description: "Matnog",
//     },
//     {
//         id: 1512,
//         type_id: 9,
//         description: "Pilar",
//     },
//     {
//         id: 1513,
//         type_id: 9,
//         description: "Prieto Diaz",
//     },
//     {
//         id: 1514,
//         type_id: 9,
//         description: "Santa Magdalena",
//     },
//     {
//         id: 1515,
//         type_id: 9,
//         description: "Sorsogon City",
//     },
//     {
//         id: 1516,
//         type_id: 9,
//         description: "Barcelona",
//     },
//     {
//         id: 1517,
//         type_id: 9,
//         description: "Bulan",
//     },
//     {
//         id: 1518,
//         type_id: 9,
//         description: "Altavas",
//     },
//     {
//         id: 1519,
//         type_id: 9,
//         description: "Balete",
//     },
//     {
//         id: 1520,
//         type_id: 9,
//         description: "Banga",
//     },
//     {
//         id: 1521,
//         type_id: 9,
//         description: "Batan",
//     },
//     {
//         id: 1522,
//         type_id: 9,
//         description: "Buruanga",
//     },
//     {
//         id: 1523,
//         type_id: 9,
//         description: "Ibajay",
//     },
//     {
//         id: 1524,
//         type_id: 9,
//         description: "Kalibo",
//     },
//     {
//         id: 1525,
//         type_id: 9,
//         description: "Lezo",
//     },
//     {
//         id: 1526,
//         type_id: 9,
//         description: "Libacao",
//     },
//     {
//         id: 1527,
//         type_id: 9,
//         description: "Madalag",
//     },
//     {
//         id: 1528,
//         type_id: 9,
//         description: "Makato",
//     },
//     {
//         id: 1529,
//         type_id: 9,
//         description: "Malay",
//     },
//     {
//         id: 1530,
//         type_id: 9,
//         description: "Malinao",
//     },
//     {
//         id: 1531,
//         type_id: 9,
//         description: "Nabas",
//     },
//     {
//         id: 1532,
//         type_id: 9,
//         description: "New Washington",
//     },
//     {
//         id: 1533,
//         type_id: 9,
//         description: "Numancia",
//     },
//     {
//         id: 1534,
//         type_id: 9,
//         description: "Tangalan",
//     },
//     {
//         id: 1535,
//         type_id: 9,
//         description: "Anini-y",
//     },
//     {
//         id: 1536,
//         type_id: 9,
//         description: "Barbaza",
//     },
//     {
//         id: 1537,
//         type_id: 9,
//         description: "Belison",
//     },
//     {
//         id: 1538,
//         type_id: 9,
//         description: "Bugasong",
//     },
//     {
//         id: 1539,
//         type_id: 9,
//         description: "Caluya",
//     },
//     {
//         id: 1540,
//         type_id: 9,
//         description: "Culasi",
//     },
//     {
//         id: 1541,
//         type_id: 9,
//         description: "Hamtic",
//     },
//     {
//         id: 1542,
//         type_id: 9,
//         description: "Laua-an",
//     },
//     {
//         id: 1543,
//         type_id: 9,
//         description: "Libertad",
//     },
//     {
//         id: 1544,
//         type_id: 9,
//         description: "Pandan",
//     },
//     {
//         id: 1545,
//         type_id: 9,
//         description: "Patnongan",
//     },
//     {
//         id: 1546,
//         type_id: 9,
//         description: "San Jose",
//     },
//     {
//         id: 1547,
//         type_id: 9,
//         description: "San Remigio",
//     },
//     {
//         id: 1548,
//         type_id: 9,
//         description: "Sebaste",
//     },
//     {
//         id: 1549,
//         type_id: 9,
//         description: "Sibalom",
//     },
//     {
//         id: 1550,
//         type_id: 9,
//         description: "Tibiao",
//     },
//     {
//         id: 1551,
//         type_id: 9,
//         description: "Tobias Fornier",
//     },
//     {
//         id: 1552,
//         type_id: 9,
//         description: "Valderrama",
//     },
//     {
//         id: 1553,
//         type_id: 9,
//         description: "Roxas City",
//     },
//     {
//         id: 1554,
//         type_id: 9,
//         description: "Cuartero",
//     },
//     {
//         id: 1555,
//         type_id: 9,
//         description: "Dao",
//     },
//     {
//         id: 1556,
//         type_id: 9,
//         description: "Dumalag",
//     },
//     {
//         id: 1557,
//         type_id: 9,
//         description: "Dumarao",
//     },
//     {
//         id: 1558,
//         type_id: 9,
//         description: "Ivisan",
//     },
//     {
//         id: 1559,
//         type_id: 9,
//         description: "Jamindan",
//     },
//     {
//         id: 1560,
//         type_id: 9,
//         description: "Ma-ayon",
//     },
//     {
//         id: 1561,
//         type_id: 9,
//         description: "Mambusao",
//     },
//     {
//         id: 1562,
//         type_id: 9,
//         description: "Panay",
//     },
//     {
//         id: 1563,
//         type_id: 9,
//         description: "Panitan",
//     },
//     {
//         id: 1564,
//         type_id: 9,
//         description: "Pilar",
//     },
//     {
//         id: 1565,
//         type_id: 9,
//         description: "Pontevedra",
//     },
//     {
//         id: 1566,
//         type_id: 9,
//         description: "President Roxas",
//     },
//     {
//         id: 1567,
//         type_id: 9,
//         description: "Sapi-an",
//     },
//     {
//         id: 1568,
//         type_id: 9,
//         description: "Sigma",
//     },
//     {
//         id: 1569,
//         type_id: 9,
//         description: "Tapaz",
//     },
//     {
//         id: 1570,
//         type_id: 9,
//         description: "Buenavista",
//     },
//     {
//         id: 1571,
//         type_id: 9,
//         description: "Jordan",
//     },
//     {
//         id: 1572,
//         type_id: 9,
//         description: "Nueva Valencia",
//     },
//     {
//         id: 1573,
//         type_id: 9,
//         description: "San Lorenzo",
//     },
//     {
//         id: 1574,
//         type_id: 9,
//         description: "Sibunag",
//     },
//     {
//         id: 1575,
//         type_id: 9,
//         description: "Passi City",
//     },
//     {
//         id: 1576,
//         type_id: 9,
//         description: "Iloilo City",
//     },
//     {
//         id: 1577,
//         type_id: 9,
//         description: "Ajuy",
//     },
//     {
//         id: 1578,
//         type_id: 9,
//         description: "Alimodian",
//     },
//     {
//         id: 1579,
//         type_id: 9,
//         description: "Anilao",
//     },
//     {
//         id: 1580,
//         type_id: 9,
//         description: "Badiangan",
//     },
//     {
//         id: 1581,
//         type_id: 9,
//         description: "Balasan",
//     },
//     {
//         id: 1582,
//         type_id: 9,
//         description: "Banate",
//     },
//     {
//         id: 1583,
//         type_id: 9,
//         description: "Barotac Nuevo",
//     },
//     {
//         id: 1584,
//         type_id: 9,
//         description: "Barotac Viejo",
//     },
//     {
//         id: 1585,
//         type_id: 9,
//         description: "Batad",
//     },
//     {
//         id: 1586,
//         type_id: 9,
//         description: "Bingawan",
//     },
//     {
//         id: 1587,
//         type_id: 9,
//         description: "Cabatuan",
//     },
//     {
//         id: 1588,
//         type_id: 9,
//         description: "Calinog",
//     },
//     {
//         id: 1589,
//         type_id: 9,
//         description: "Carles",
//     },
//     {
//         id: 1590,
//         type_id: 9,
//         description: "Concepcion",
//     },
//     {
//         id: 1591,
//         type_id: 9,
//         description: "Dingle",
//     },
//     {
//         id: 1592,
//         type_id: 9,
//         description: "Dueñas",
//     },
//     {
//         id: 1593,
//         type_id: 9,
//         description: "Dumangas",
//     },
//     {
//         id: 1594,
//         type_id: 9,
//         description: "Estancia",
//     },
//     {
//         id: 1595,
//         type_id: 9,
//         description: "Guimbal",
//     },
//     {
//         id: 1596,
//         type_id: 9,
//         description: "Igbaras",
//     },
//     {
//         id: 1597,
//         type_id: 9,
//         description: "Janiuay",
//     },
//     {
//         id: 1598,
//         type_id: 9,
//         description: "Lambunao",
//     },
//     {
//         id: 1599,
//         type_id: 9,
//         description: "Leganes",
//     },
//     {
//         id: 1600,
//         type_id: 9,
//         description: "Lemery",
//     },
//     {
//         id: 1601,
//         type_id: 9,
//         description: "Leon",
//     },
//     {
//         id: 1602,
//         type_id: 9,
//         description: "Maasin",
//     },
//     {
//         id: 1603,
//         type_id: 9,
//         description: "Miagao",
//     },
//     {
//         id: 1604,
//         type_id: 9,
//         description: "Mina",
//     },
//     {
//         id: 1605,
//         type_id: 9,
//         description: "New Lucena",
//     },
//     {
//         id: 1606,
//         type_id: 9,
//         description: "Oton",
//     },
//     {
//         id: 1607,
//         type_id: 9,
//         description: "Pavia",
//     },
//     {
//         id: 1608,
//         type_id: 9,
//         description: "Pototan",
//     },
//     {
//         id: 1609,
//         type_id: 9,
//         description: "San Dionisio",
//     },
//     {
//         id: 1610,
//         type_id: 9,
//         description: "San Enrique",
//     },
//     {
//         id: 1611,
//         type_id: 9,
//         description: "San Joaquin",
//     },
//     {
//         id: 1612,
//         type_id: 9,
//         description: "San Miguel",
//     },
//     {
//         id: 1613,
//         type_id: 9,
//         description: "San Rafael",
//     },
//     {
//         id: 1614,
//         type_id: 9,
//         description: "Santa Barbara",
//     },
//     {
//         id: 1615,
//         type_id: 9,
//         description: "Sara",
//     },
//     {
//         id: 1616,
//         type_id: 9,
//         description: "Tigbauan",
//     },
//     {
//         id: 1617,
//         type_id: 9,
//         description: "Tubungan",
//     },
//     {
//         id: 1618,
//         type_id: 9,
//         description: "Zarraga",
//     },
//     {
//         id: 1619,
//         type_id: 9,
//         description: "San Enrique",
//     },
//     {
//         id: 1620,
//         type_id: 9,
//         description: "Toboso",
//     },
//     {
//         id: 1621,
//         type_id: 9,
//         description: "Valladolid",
//     },
//     {
//         id: 1622,
//         type_id: 9,
//         description: "Hinoba-an",
//     },
//     {
//         id: 1623,
//         type_id: 9,
//         description: "Ilog",
//     },
//     {
//         id: 1624,
//         type_id: 9,
//         description: "Isabela",
//     },
//     {
//         id: 1625,
//         type_id: 9,
//         description: "La Castellana",
//     },
//     {
//         id: 1626,
//         type_id: 9,
//         description: "Manapla",
//     },
//     {
//         id: 1627,
//         type_id: 9,
//         description: "Moises Padilla",
//     },
//     {
//         id: 1628,
//         type_id: 9,
//         description: "Murcia",
//     },
//     {
//         id: 1629,
//         type_id: 9,
//         description: "Pontevedra",
//     },
//     {
//         id: 1630,
//         type_id: 9,
//         description: "Pulupandan",
//     },
//     {
//         id: 1631,
//         type_id: 9,
//         description: "Salvador Benedicto",
//     },
//     {
//         id: 1632,
//         type_id: 9,
//         description: "Bacolod City",
//     },
//     {
//         id: 1633,
//         type_id: 9,
//         description: "Bago City",
//     },
//     {
//         id: 1634,
//         type_id: 9,
//         description: "Cadiz City",
//     },
//     {
//         id: 1635,
//         type_id: 9,
//         description: "Escalante City",
//     },
//     {
//         id: 1636,
//         type_id: 9,
//         description: "Himamaylan City",
//     },
//     {
//         id: 1637,
//         type_id: 9,
//         description: "Kabankalan City",
//     },
//     {
//         id: 1638,
//         type_id: 9,
//         description: "La Carlota City",
//     },
//     {
//         id: 1639,
//         type_id: 9,
//         description: "Sagay City",
//     },
//     {
//         id: 1640,
//         type_id: 9,
//         description: "San Carlos City",
//     },
//     {
//         id: 1641,
//         type_id: 9,
//         description: "Silay City",
//     },
//     {
//         id: 1642,
//         type_id: 9,
//         description: "Sipalay City",
//     },
//     {
//         id: 1643,
//         type_id: 9,
//         description: "Talisay City",
//     },
//     {
//         id: 1644,
//         type_id: 9,
//         description: "Victorias City",
//     },
//     {
//         id: 1645,
//         type_id: 9,
//         description: "Binalbagan",
//     },
//     {
//         id: 1646,
//         type_id: 9,
//         description: "Calatrava",
//     },
//     {
//         id: 1647,
//         type_id: 9,
//         description: "Candoni",
//     },
//     {
//         id: 1648,
//         type_id: 9,
//         description: "Cauayan",
//     },
//     {
//         id: 1649,
//         type_id: 9,
//         description: "Enrique B. Magalona",
//     },
//     {
//         id: 1650,
//         type_id: 9,
//         description: "Hinigaran",
//     },
//     {
//         id: 1651,
//         type_id: 9,
//         description: "Tagbilaran City",
//     },
//     {
//         id: 1652,
//         type_id: 9,
//         description: "Alburquerque",
//     },
//     {
//         id: 1653,
//         type_id: 9,
//         description: "Alicia",
//     },
//     {
//         id: 1654,
//         type_id: 9,
//         description: "Anda",
//     },
//     {
//         id: 1655,
//         type_id: 9,
//         description: "Antequera",
//     },
//     {
//         id: 1656,
//         type_id: 9,
//         description: "Baclayon",
//     },
//     {
//         id: 1657,
//         type_id: 9,
//         description: "Balilihan",
//     },
//     {
//         id: 1658,
//         type_id: 9,
//         description: "Batuan",
//     },
//     {
//         id: 1659,
//         type_id: 9,
//         description: "Bien Unido",
//     },
//     {
//         id: 1660,
//         type_id: 9,
//         description: "Bilar",
//     },
//     {
//         id: 1661,
//         type_id: 9,
//         description: "Buenavista",
//     },
//     {
//         id: 1662,
//         type_id: 9,
//         description: "Calape",
//     },
//     {
//         id: 1663,
//         type_id: 9,
//         description: "Candijay",
//     },
//     {
//         id: 1664,
//         type_id: 9,
//         description: "Carmen",
//     },
//     {
//         id: 1665,
//         type_id: 9,
//         description: "Catigbian",
//     },
//     {
//         id: 1666,
//         type_id: 9,
//         description: "Clarin",
//     },
//     {
//         id: 1667,
//         type_id: 9,
//         description: "Corella",
//     },
//     {
//         id: 1668,
//         type_id: 9,
//         description: "Cortes",
//     },
//     {
//         id: 1669,
//         type_id: 9,
//         description: "Dagohoy",
//     },
//     {
//         id: 1670,
//         type_id: 9,
//         description: "Danao",
//     },
//     {
//         id: 1671,
//         type_id: 9,
//         description: "Dauis",
//     },
//     {
//         id: 1672,
//         type_id: 9,
//         description: "Dimiao",
//     },
//     {
//         id: 1673,
//         type_id: 9,
//         description: "Duero",
//     },
//     {
//         id: 1674,
//         type_id: 9,
//         description: "Garcia Hernandez",
//     },
//     {
//         id: 1675,
//         type_id: 9,
//         description: "Guindulman",
//     },
//     {
//         id: 1676,
//         type_id: 9,
//         description: "Inabanga",
//     },
//     {
//         id: 1677,
//         type_id: 9,
//         description: "Jagna",
//     },
//     {
//         id: 1678,
//         type_id: 9,
//         description: "Jetafe",
//     },
//     {
//         id: 1679,
//         type_id: 9,
//         description: "Lila",
//     },
//     {
//         id: 1680,
//         type_id: 9,
//         description: "Loay",
//     },
//     {
//         id: 1681,
//         type_id: 9,
//         description: "Loboc",
//     },
//     {
//         id: 1682,
//         type_id: 9,
//         description: "Loon",
//     },
//     {
//         id: 1683,
//         type_id: 9,
//         description: "Mabini",
//     },
//     {
//         id: 1684,
//         type_id: 9,
//         description: "Maribojoc",
//     },
//     {
//         id: 1685,
//         type_id: 9,
//         description: "Panglao",
//     },
//     {
//         id: 1686,
//         type_id: 9,
//         description: "Pilar",
//     },
//     {
//         id: 1687,
//         type_id: 9,
//         description: "Pres. Carlos P. Garcia",
//     },
//     {
//         id: 1688,
//         type_id: 9,
//         description: "Sagbayan",
//     },
//     {
//         id: 1689,
//         type_id: 9,
//         description: "San Isidro",
//     },
//     {
//         id: 1690,
//         type_id: 9,
//         description: "San Miguel",
//     },
//     {
//         id: 1691,
//         type_id: 9,
//         description: "Sevilla",
//     },
//     {
//         id: 1692,
//         type_id: 9,
//         description: "Sierra Bullones",
//     },
//     {
//         id: 1693,
//         type_id: 9,
//         description: "Sikatuna",
//     },
//     {
//         id: 1694,
//         type_id: 9,
//         description: "Talibon",
//     },
//     {
//         id: 1695,
//         type_id: 9,
//         description: "Trinidad",
//     },
//     {
//         id: 1696,
//         type_id: 9,
//         description: "Tubigon",
//     },
//     {
//         id: 1697,
//         type_id: 9,
//         description: "Ubay",
//     },
//     {
//         id: 1698,
//         type_id: 9,
//         description: "Valencia",
//     },
//     {
//         id: 1699,
//         type_id: 9,
//         description: "Bogo City",
//     },
//     {
//         id: 1700,
//         type_id: 9,
//         description: "Carcar City",
//     },
//     {
//         id: 1701,
//         type_id: 9,
//         description: "Cebu City",
//     },
//     {
//         id: 1702,
//         type_id: 9,
//         description: "Danao City",
//     },
//     {
//         id: 1703,
//         type_id: 9,
//         description: "Lapu-Lapu City",
//     },
//     {
//         id: 1704,
//         type_id: 9,
//         description: "Mandaue City",
//     },
//     {
//         id: 1705,
//         type_id: 9,
//         description: "Talisay City",
//     },
//     {
//         id: 1706,
//         type_id: 9,
//         description: "Toledo City",
//     },
//     {
//         id: 1707,
//         type_id: 9,
//         description: "Naga City",
//     },
//     {
//         id: 1708,
//         type_id: 9,
//         description: "Alcantara",
//     },
//     {
//         id: 1709,
//         type_id: 9,
//         description: "Alcoy",
//     },
//     {
//         id: 1710,
//         type_id: 9,
//         description: "Alegria",
//     },
//     {
//         id: 1711,
//         type_id: 9,
//         description: "Aloguinsan",
//     },
//     {
//         id: 1712,
//         type_id: 9,
//         description: "Argao",
//     },
//     {
//         id: 1713,
//         type_id: 9,
//         description: "Asturias",
//     },
//     {
//         id: 1714,
//         type_id: 9,
//         description: "Badian",
//     },
//     {
//         id: 1715,
//         type_id: 9,
//         description: "Balamban",
//     },
//     {
//         id: 1716,
//         type_id: 9,
//         description: "Bantayan",
//     },
//     {
//         id: 1717,
//         type_id: 9,
//         description: "Barili",
//     },
//     {
//         id: 1718,
//         type_id: 9,
//         description: "Boljoon",
//     },
//     {
//         id: 1719,
//         type_id: 9,
//         description: "Borbon",
//     },
//     {
//         id: 1720,
//         type_id: 9,
//         description: "Carmen",
//     },
//     {
//         id: 1721,
//         type_id: 9,
//         description: "Catmon",
//     },
//     {
//         id: 1722,
//         type_id: 9,
//         description: "Compostela",
//     },
//     {
//         id: 1723,
//         type_id: 9,
//         description: "Consolacion",
//     },
//     {
//         id: 1724,
//         type_id: 9,
//         description: "Cordoba",
//     },
//     {
//         id: 1725,
//         type_id: 9,
//         description: "Daanbantayan",
//     },
//     {
//         id: 1726,
//         type_id: 9,
//         description: "Dalaguete",
//     },
//     {
//         id: 1727,
//         type_id: 9,
//         description: "Dumanjug",
//     },
//     {
//         id: 1728,
//         type_id: 9,
//         description: "Ginatilan",
//     },
//     {
//         id: 1729,
//         type_id: 9,
//         description: "Liloan",
//     },
//     {
//         id: 1730,
//         type_id: 9,
//         description: "Madridejos",
//     },
//     {
//         id: 1731,
//         type_id: 9,
//         description: "Malabuyoc",
//     },
//     {
//         id: 1732,
//         type_id: 9,
//         description: "Medellin",
//     },
//     {
//         id: 1733,
//         type_id: 9,
//         description: "Minglanilla",
//     },
//     {
//         id: 1734,
//         type_id: 9,
//         description: "Moalboal",
//     },
//     {
//         id: 1735,
//         type_id: 9,
//         description: "Oslob",
//     },
//     {
//         id: 1736,
//         type_id: 9,
//         description: "Pilar",
//     },
//     {
//         id: 1737,
//         type_id: 9,
//         description: "Pinamungahan",
//     },
//     {
//         id: 1738,
//         type_id: 9,
//         description: "Poro",
//     },
//     {
//         id: 1739,
//         type_id: 9,
//         description: "Ronda",
//     },
//     {
//         id: 1740,
//         type_id: 9,
//         description: "Samboan",
//     },
//     {
//         id: 1741,
//         type_id: 9,
//         description: "San Fernando",
//     },
//     {
//         id: 1742,
//         type_id: 9,
//         description: "San Francisco",
//     },
//     {
//         id: 1743,
//         type_id: 9,
//         description: "San Remigio",
//     },
//     {
//         id: 1744,
//         type_id: 9,
//         description: "Santa Fe",
//     },
//     {
//         id: 1745,
//         type_id: 9,
//         description: "Santander",
//     },
//     {
//         id: 1746,
//         type_id: 9,
//         description: "Sibonga",
//     },
//     {
//         id: 1747,
//         type_id: 9,
//         description: "Sogod",
//     },
//     {
//         id: 1748,
//         type_id: 9,
//         description: "Tabogon",
//     },
//     {
//         id: 1749,
//         type_id: 9,
//         description: "Tabuelan",
//     },
//     {
//         id: 1750,
//         type_id: 9,
//         description: "Tuburan",
//     },
//     {
//         id: 1751,
//         type_id: 9,
//         description: "Tudela",
//     },
//     {
//         id: 1752,
//         type_id: 9,
//         description: "Bais",
//     },
//     {
//         id: 1753,
//         type_id: 9,
//         description: "Bayawan",
//     },
//     {
//         id: 1754,
//         type_id: 9,
//         description: "Canlaon",
//     },
//     {
//         id: 1755,
//         type_id: 9,
//         description: "Dumaguete",
//     },
//     {
//         id: 1756,
//         type_id: 9,
//         description: "Guihulngan",
//     },
//     {
//         id: 1757,
//         type_id: 9,
//         description: "Tanjay",
//     },
//     {
//         id: 1758,
//         type_id: 9,
//         description: "Amlan",
//     },
//     {
//         id: 1759,
//         type_id: 9,
//         description: "Ayungon",
//     },
//     {
//         id: 1760,
//         type_id: 9,
//         description: "Bacong",
//     },
//     {
//         id: 1761,
//         type_id: 9,
//         description: "Basay",
//     },
//     {
//         id: 1762,
//         type_id: 9,
//         description: "Bindoy",
//     },
//     {
//         id: 1763,
//         type_id: 9,
//         description: "Dauin",
//     },
//     {
//         id: 1764,
//         type_id: 9,
//         description: "Jimalalud",
//     },
//     {
//         id: 1765,
//         type_id: 9,
//         description: "La Libertad",
//     },
//     {
//         id: 1766,
//         type_id: 9,
//         description: "Mabinay",
//     },
//     {
//         id: 1767,
//         type_id: 9,
//         description: "Manjuyod",
//     },
//     {
//         id: 1768,
//         type_id: 9,
//         description: "Pamplona",
//     },
//     {
//         id: 1769,
//         type_id: 9,
//         description: "San Jose",
//     },
//     {
//         id: 1770,
//         type_id: 9,
//         description: "Santa Catalina",
//     },
//     {
//         id: 1771,
//         type_id: 9,
//         description: "Siaton",
//     },
//     {
//         id: 1772,
//         type_id: 9,
//         description: "Sibulan",
//     },
//     {
//         id: 1773,
//         type_id: 9,
//         description: "Tayasan",
//     },
//     {
//         id: 1774,
//         type_id: 9,
//         description: "Valencia",
//     },
//     {
//         id: 1775,
//         type_id: 9,
//         description: "Vallehermoso",
//     },
//     {
//         id: 1776,
//         type_id: 9,
//         description: "Zamboanguita",
//     },
//     {
//         id: 1777,
//         type_id: 9,
//         description: "Enrique Villanueva",
//     },
//     {
//         id: 1778,
//         type_id: 9,
//         description: "Larena",
//     },
//     {
//         id: 1779,
//         type_id: 9,
//         description: "Lazi",
//     },
//     {
//         id: 1780,
//         type_id: 9,
//         description: "Maria",
//     },
//     {
//         id: 1781,
//         type_id: 9,
//         description: "San Juan",
//     },
//     {
//         id: 1782,
//         type_id: 9,
//         description: "Siquijor",
//     },
//     {
//         id: 1783,
//         type_id: 9,
//         description: "Butuan City",
//     },
//     {
//         id: 1784,
//         type_id: 9,
//         description: "Cabadbaran City",
//     },
//     {
//         id: 1785,
//         type_id: 9,
//         description: "Buenavista",
//     },
//     {
//         id: 1786,
//         type_id: 9,
//         description: "Carmen",
//     },
//     {
//         id: 1787,
//         type_id: 9,
//         description: "Jabonga",
//     },
//     {
//         id: 1788,
//         type_id: 9,
//         description: "Kitcharao",
//     },
//     {
//         id: 1789,
//         type_id: 9,
//         description: "Las Nieves",
//     },
//     {
//         id: 1790,
//         type_id: 9,
//         description: "Magallanes",
//     },
//     {
//         id: 1791,
//         type_id: 9,
//         description: "Nasipit",
//     },
//     {
//         id: 1792,
//         type_id: 9,
//         description: "Remedios T. Romualdez",
//     },
//     {
//         id: 1793,
//         type_id: 9,
//         description: "Santiago",
//     },
//     {
//         id: 1794,
//         type_id: 9,
//         description: "Tubay",
//     },
//     {
//         id: 1795,
//         type_id: 9,
//         description: "Trento",
//     },
//     {
//         id: 1796,
//         type_id: 9,
//         description: "Veruela",
//     },
//     {
//         id: 1797,
//         type_id: 9,
//         description: "Talacogon",
//     },
//     {
//         id: 1798,
//         type_id: 9,
//         description: "Bayugan",
//     },
//     {
//         id: 1799,
//         type_id: 9,
//         description: "Bunawan",
//     },
//     {
//         id: 1800,
//         type_id: 9,
//         description: "Esperanza",
//     },
//     {
//         id: 1801,
//         type_id: 9,
//         description: "La Paz",
//     },
//     {
//         id: 1802,
//         type_id: 9,
//         description: "Loreto",
//     },
//     {
//         id: 1803,
//         type_id: 9,
//         description: "Prosperidad",
//     },
//     {
//         id: 1804,
//         type_id: 9,
//         description: "Rosario",
//     },
//     {
//         id: 1805,
//         type_id: 9,
//         description: "San Francisco",
//     },
//     {
//         id: 1806,
//         type_id: 9,
//         description: "San Luis",
//     },
//     {
//         id: 1807,
//         type_id: 9,
//         description: "Santa Josefa",
//     },
//     {
//         id: 1808,
//         type_id: 9,
//         description: "Sibagat",
//     },
//     {
//         id: 1809,
//         type_id: 9,
//         description: "Almeria",
//     },
//     {
//         id: 1810,
//         type_id: 9,
//         description: "Biliran",
//     },
//     {
//         id: 1811,
//         type_id: 9,
//         description: "Cabucgayan",
//     },
//     {
//         id: 1812,
//         type_id: 9,
//         description: "Caibiran",
//     },
//     {
//         id: 1813,
//         type_id: 9,
//         description: "Culaba",
//     },
//     {
//         id: 1814,
//         type_id: 9,
//         description: "Kawayan",
//     },
//     {
//         id: 1815,
//         type_id: 9,
//         description: "Maripipi",
//     },
//     {
//         id: 1816,
//         type_id: 9,
//         description: "Naval",
//     },
//     {
//         id: 1817,
//         type_id: 9,
//         description: "Borongan City",
//     },
//     {
//         id: 1818,
//         type_id: 9,
//         description: "Arteche",
//     },
//     {
//         id: 1819,
//         type_id: 9,
//         description: "Balangiga",
//     },
//     {
//         id: 1820,
//         type_id: 9,
//         description: "Balangkayan",
//     },
//     {
//         id: 1821,
//         type_id: 9,
//         description: "Can-avid",
//     },
//     {
//         id: 1822,
//         type_id: 9,
//         description: "Dolores",
//     },
//     {
//         id: 1823,
//         type_id: 9,
//         description: "General MacArthur",
//     },
//     {
//         id: 1824,
//         type_id: 9,
//         description: "Giporlos",
//     },
//     {
//         id: 1825,
//         type_id: 9,
//         description: "Guiuan",
//     },
//     {
//         id: 1826,
//         type_id: 9,
//         description: "Hernani",
//     },
//     {
//         id: 1827,
//         type_id: 9,
//         description: "Jipapad",
//     },
//     {
//         id: 1828,
//         type_id: 9,
//         description: "Lawaan",
//     },
//     {
//         id: 1829,
//         type_id: 9,
//         description: "Llorente",
//     },
//     {
//         id: 1830,
//         type_id: 9,
//         description: "Maslog",
//     },
//     {
//         id: 1831,
//         type_id: 9,
//         description: "Maydolong",
//     },
//     {
//         id: 1832,
//         type_id: 9,
//         description: "Mercedes",
//     },
//     {
//         id: 1833,
//         type_id: 9,
//         description: "Oras",
//     },
//     {
//         id: 1834,
//         type_id: 9,
//         description: "Quinapondan",
//     },
//     {
//         id: 1835,
//         type_id: 9,
//         description: "Salcedo",
//     },
//     {
//         id: 1836,
//         type_id: 9,
//         description: "San Julian",
//     },
//     {
//         id: 1837,
//         type_id: 9,
//         description: "San Policarpo",
//     },
//     {
//         id: 1838,
//         type_id: 9,
//         description: "Sulat",
//     },
//     {
//         id: 1839,
//         type_id: 9,
//         description: "Taft",
//     },
//     {
//         id: 1840,
//         type_id: 9,
//         description: "Baybay City",
//     },
//     {
//         id: 1841,
//         type_id: 9,
//         description: "Ormoc City",
//     },
//     {
//         id: 1842,
//         type_id: 9,
//         description: "Tacloban City",
//     },
//     {
//         id: 1843,
//         type_id: 9,
//         description: "Abuyog",
//     },
//     {
//         id: 1844,
//         type_id: 9,
//         description: "Alangalang",
//     },
//     {
//         id: 1845,
//         type_id: 9,
//         description: "Albuera",
//     },
//     {
//         id: 1846,
//         type_id: 9,
//         description: "Babatngon",
//     },
//     {
//         id: 1847,
//         type_id: 9,
//         description: "Barugo",
//     },
//     {
//         id: 1848,
//         type_id: 9,
//         description: "Bato",
//     },
//     {
//         id: 1849,
//         type_id: 9,
//         description: "Burauen",
//     },
//     {
//         id: 1850,
//         type_id: 9,
//         description: "Calubian",
//     },
//     {
//         id: 1851,
//         type_id: 9,
//         description: "Capoocan",
//     },
//     {
//         id: 1852,
//         type_id: 9,
//         description: "Carigara",
//     },
//     {
//         id: 1853,
//         type_id: 9,
//         description: "Dagami",
//     },
//     {
//         id: 1854,
//         type_id: 9,
//         description: "Dulag",
//     },
//     {
//         id: 1855,
//         type_id: 9,
//         description: "Hilongos",
//     },
//     {
//         id: 1856,
//         type_id: 9,
//         description: "Hindang",
//     },
//     {
//         id: 1857,
//         type_id: 9,
//         description: "Inopacan",
//     },
//     {
//         id: 1858,
//         type_id: 9,
//         description: "Isabel",
//     },
//     {
//         id: 1859,
//         type_id: 9,
//         description: "Jaro",
//     },
//     {
//         id: 1860,
//         type_id: 9,
//         description: "Javier",
//     },
//     {
//         id: 1861,
//         type_id: 9,
//         description: "Julita",
//     },
//     {
//         id: 1862,
//         type_id: 9,
//         description: "Kananga",
//     },
//     {
//         id: 1863,
//         type_id: 9,
//         description: "La Paz",
//     },
//     {
//         id: 1864,
//         type_id: 9,
//         description: "Leyte",
//     },
//     {
//         id: 1865,
//         type_id: 9,
//         description: "Macarthur",
//     },
//     {
//         id: 1866,
//         type_id: 9,
//         description: "Mahaplag",
//     },
//     {
//         id: 1867,
//         type_id: 9,
//         description: "Matag-ob",
//     },
//     {
//         id: 1868,
//         type_id: 9,
//         description: "Matalom",
//     },
//     {
//         id: 1869,
//         type_id: 9,
//         description: "Mayorga",
//     },
//     {
//         id: 1870,
//         type_id: 9,
//         description: "Merida",
//     },
//     {
//         id: 1871,
//         type_id: 9,
//         description: "Palo",
//     },
//     {
//         id: 1872,
//         type_id: 9,
//         description: "Palompon",
//     },
//     {
//         id: 1873,
//         type_id: 9,
//         description: "Pastrana",
//     },
//     {
//         id: 1874,
//         type_id: 9,
//         description: "San Isidro",
//     },
//     {
//         id: 1875,
//         type_id: 9,
//         description: "San Miguel",
//     },
//     {
//         id: 1876,
//         type_id: 9,
//         description: "Santa Fe",
//     },
//     {
//         id: 1877,
//         type_id: 9,
//         description: "Tabango",
//     },
//     {
//         id: 1878,
//         type_id: 9,
//         description: "Tabontabon",
//     },
//     {
//         id: 1879,
//         type_id: 9,
//         description: "Tanauan",
//     },
//     {
//         id: 1880,
//         type_id: 9,
//         description: "Tolosa",
//     },
//     {
//         id: 1881,
//         type_id: 9,
//         description: "Tunga",
//     },
//     {
//         id: 1882,
//         type_id: 9,
//         description: "Villaba",
//     },
//     {
//         id: 1883,
//         type_id: 9,
//         description: "Silvino Lobos",
//     },
//     {
//         id: 1884,
//         type_id: 9,
//         description: "Victoria",
//     },
//     {
//         id: 1885,
//         type_id: 9,
//         description: "Allen",
//     },
//     {
//         id: 1886,
//         type_id: 9,
//         description: "Biri",
//     },
//     {
//         id: 1887,
//         type_id: 9,
//         description: "Bobon",
//     },
//     {
//         id: 1888,
//         type_id: 9,
//         description: "Capul",
//     },
//     {
//         id: 1889,
//         type_id: 9,
//         description: "Catarman",
//     },
//     {
//         id: 1890,
//         type_id: 9,
//         description: "Catubig",
//     },
//     {
//         id: 1891,
//         type_id: 9,
//         description: "Gamay",
//     },
//     {
//         id: 1892,
//         type_id: 9,
//         description: "Laoang",
//     },
//     {
//         id: 1893,
//         type_id: 9,
//         description: "Lapinig",
//     },
//     {
//         id: 1894,
//         type_id: 9,
//         description: "Las Navas",
//     },
//     {
//         id: 1895,
//         type_id: 9,
//         description: "Lavezares",
//     },
//     {
//         id: 1896,
//         type_id: 9,
//         description: "Lope de Vega",
//     },
//     {
//         id: 1897,
//         type_id: 9,
//         description: "Mapanas",
//     },
//     {
//         id: 1898,
//         type_id: 9,
//         description: "Mondragon",
//     },
//     {
//         id: 1899,
//         type_id: 9,
//         description: "Palapag",
//     },
//     {
//         id: 1900,
//         type_id: 9,
//         description: "Pambujan",
//     },
//     {
//         id: 1901,
//         type_id: 9,
//         description: "Rosario",
//     },
//     {
//         id: 1902,
//         type_id: 9,
//         description: "San Antonio",
//     },
//     {
//         id: 1903,
//         type_id: 9,
//         description: "San Isidro",
//     },
//     {
//         id: 1904,
//         type_id: 9,
//         description: "San Jose",
//     },
//     {
//         id: 1905,
//         type_id: 9,
//         description: "San Roque",
//     },
//     {
//         id: 1906,
//         type_id: 9,
//         description: "San Vicente",
//     },
//     {
//         id: 1907,
//         type_id: 9,
//         description: "Basey",
//     },
//     {
//         id: 1908,
//         type_id: 9,
//         description: "Calbiga",
//     },
//     {
//         id: 1909,
//         type_id: 9,
//         description: "Daram",
//     },
//     {
//         id: 1910,
//         type_id: 9,
//         description: "Gandara",
//     },
//     {
//         id: 1911,
//         type_id: 9,
//         description: "Hinabangan",
//     },
//     {
//         id: 1912,
//         type_id: 9,
//         description: "Jiabong",
//     },
//     {
//         id: 1913,
//         type_id: 9,
//         description: "Marabut",
//     },
//     {
//         id: 1914,
//         type_id: 9,
//         description: "Matuguinao",
//     },
//     {
//         id: 1915,
//         type_id: 9,
//         description: "Motiong",
//     },
//     {
//         id: 1916,
//         type_id: 9,
//         description: "Pagsanghan",
//     },
//     {
//         id: 1917,
//         type_id: 9,
//         description: "Paranas",
//     },
//     {
//         id: 1918,
//         type_id: 9,
//         description: "Pinabacdao",
//     },
//     {
//         id: 1919,
//         type_id: 9,
//         description: "San Jorge",
//     },
//     {
//         id: 1920,
//         type_id: 9,
//         description: "San Jose De Bauan",
//     },
//     {
//         id: 1921,
//         type_id: 9,
//         description: "San Sebastian",
//     },
//     {
//         id: 1922,
//         type_id: 9,
//         description: "Santa Margarita",
//     },
//     {
//         id: 1923,
//         type_id: 9,
//         description: "Santa Rita",
//     },
//     {
//         id: 1924,
//         type_id: 9,
//         description: "Santo Niño",
//     },
//     {
//         id: 1925,
//         type_id: 9,
//         description: "Tagapul-an",
//     },
//     {
//         id: 1926,
//         type_id: 9,
//         description: "Talalora",
//     },
//     {
//         id: 1927,
//         type_id: 9,
//         description: "Tarangnan",
//     },
//     {
//         id: 1928,
//         type_id: 9,
//         description: "Villareal",
//     },
//     {
//         id: 1929,
//         type_id: 9,
//         description: "Zumarraga",
//     },
//     {
//         id: 1930,
//         type_id: 9,
//         description: "Catbalogan City",
//     },
//     {
//         id: 1931,
//         type_id: 9,
//         description: "Calbayog City",
//     },
//     {
//         id: 1932,
//         type_id: 9,
//         description: "Almagro",
//     },
//     {
//         id: 1933,
//         type_id: 9,
//         description: "Maasin CIty",
//     },
//     {
//         id: 1934,
//         type_id: 9,
//         description: "Anahawan",
//     },
//     {
//         id: 1935,
//         type_id: 9,
//         description: "Bontoc",
//     },
//     {
//         id: 1936,
//         type_id: 9,
//         description: "Hinunangan",
//     },
//     {
//         id: 1937,
//         type_id: 9,
//         description: "Hinundayan",
//     },
//     {
//         id: 1938,
//         type_id: 9,
//         description: "Libagon",
//     },
//     {
//         id: 1939,
//         type_id: 9,
//         description: "Silago",
//     },
//     {
//         id: 1940,
//         type_id: 9,
//         description: "Sogod",
//     },
//     {
//         id: 1941,
//         type_id: 9,
//         description: "Tomas Oppus",
//     },
//     {
//         id: 1942,
//         type_id: 9,
//         description: "Liloan",
//     },
//     {
//         id: 1943,
//         type_id: 9,
//         description: "Limasawa",
//     },
//     {
//         id: 1944,
//         type_id: 9,
//         description: "Macrohon",
//     },
//     {
//         id: 1945,
//         type_id: 9,
//         description: "Malitbog",
//     },
//     {
//         id: 1946,
//         type_id: 9,
//         description: "Padre Burgos",
//     },
//     {
//         id: 1947,
//         type_id: 9,
//         description: "Pintuyan",
//     },
//     {
//         id: 1948,
//         type_id: 9,
//         description: "Saint Bernard",
//     },
//     {
//         id: 1949,
//         type_id: 9,
//         description: "San Francisco",
//     },
//     {
//         id: 1950,
//         type_id: 9,
//         description: "San Juan",
//     },
//     {
//         id: 1951,
//         type_id: 9,
//         description: "San Ricardo",
//     },
//     {
//         id: 1952,
//         type_id: 9,
//         description: "Antipolo City",
//     },
//     {
//         id: 1953,
//         type_id: 9,
//         description: "Angono",
//     },
//     {
//         id: 1954,
//         type_id: 9,
//         description: "Baras",
//     },
//     {
//         id: 1955,
//         type_id: 9,
//         description: "Binangonan",
//     },
//     {
//         id: 1956,
//         type_id: 9,
//         description: "Cainta",
//     },
//     {
//         id: 1957,
//         type_id: 9,
//         description: "Cardona",
//     },
//     {
//         id: 1958,
//         type_id: 9,
//         description: "Jalajala",
//     },
//     {
//         id: 1959,
//         type_id: 9,
//         description: "Morong",
//     },
//     {
//         id: 1960,
//         type_id: 9,
//         description: "Pililla",
//     },
//     {
//         id: 1961,
//         type_id: 9,
//         description: "Rodriguez",
//     },
//     {
//         id: 1962,
//         type_id: 9,
//         description: "San Mateo",
//     },
//     {
//         id: 1963,
//         type_id: 9,
//         description: "Tanay",
//     },
//     {
//         id: 1964,
//         type_id: 9,
//         description: "Taytay",
//     },
//     {
//         id: 1965,
//         type_id: 9,
//         description: "Teresa",
//     },
//     {
//         id: 1966,
//         type_id: 9,
//         description: "Dapitan City",
//     },
//     {
//         id: 1967,
//         type_id: 9,
//         description: "Dipolog CIty",
//     },
//     {
//         id: 1968,
//         type_id: 9,
//         description: "Bacungan",
//     },
//     {
//         id: 1969,
//         type_id: 9,
//         description: "Baliguian",
//     },
//     {
//         id: 1970,
//         type_id: 9,
//         description: "Godod",
//     },
//     {
//         id: 1971,
//         type_id: 9,
//         description: "Gutalac",
//     },
//     {
//         id: 1972,
//         type_id: 9,
//         description: "Jose Dalman",
//     },
//     {
//         id: 1973,
//         type_id: 9,
//         description: "Kalawit",
//     },
//     {
//         id: 1974,
//         type_id: 9,
//         description: "Katipunan",
//     },
//     {
//         id: 1975,
//         type_id: 9,
//         description: "La Libertad",
//     },
//     {
//         id: 1976,
//         type_id: 9,
//         description: "Labason",
//     },
//     {
//         id: 1977,
//         type_id: 9,
//         description: "Liloy",
//     },
//     {
//         id: 1978,
//         type_id: 9,
//         description: "Manukan",
//     },
//     {
//         id: 1979,
//         type_id: 9,
//         description: "Mutia",
//     },
//     {
//         id: 1980,
//         type_id: 9,
//         description: "Piñan",
//     },
//     {
//         id: 1981,
//         type_id: 9,
//         description: "Polanco",
//     },
//     {
//         id: 1982,
//         type_id: 9,
//         description: "Pres. Manuel A. Roxas",
//     },
//     {
//         id: 1983,
//         type_id: 9,
//         description: "Rizal",
//     },
//     {
//         id: 1984,
//         type_id: 9,
//         description: "Salug",
//     },
//     {
//         id: 1985,
//         type_id: 9,
//         description: "Sergio Osmeña Sr.",
//     },
//     {
//         id: 1986,
//         type_id: 9,
//         description: "Siayan",
//     },
//     {
//         id: 1987,
//         type_id: 9,
//         description: "Sibuco",
//     },
//     {
//         id: 1988,
//         type_id: 9,
//         description: "Sibutad",
//     },
//     {
//         id: 1989,
//         type_id: 9,
//         description: "Sindangan",
//     },
//     {
//         id: 1990,
//         type_id: 9,
//         description: "Siocon",
//     },
//     {
//         id: 1991,
//         type_id: 9,
//         description: "Sirawai",
//     },
//     {
//         id: 1992,
//         type_id: 9,
//         description: "Tampilisan",
//     },
//     {
//         id: 1993,
//         type_id: 9,
//         description: "Tukuran",
//     },
//     {
//         id: 1994,
//         type_id: 9,
//         description: "Vicencio Sagun",
//     },
//     {
//         id: 1995,
//         type_id: 9,
//         description: "Pagadian City",
//     },
//     {
//         id: 1996,
//         type_id: 9,
//         description: "Zamboanga City",
//     },
//     {
//         id: 1997,
//         type_id: 9,
//         description: "Aurora",
//     },
//     {
//         id: 1998,
//         type_id: 9,
//         description: "Bayog",
//     },
//     {
//         id: 1999,
//         type_id: 9,
//         description: "Dimataling",
//     },
//     {
//         id: 2000,
//         type_id: 9,
//         description: "Dinas",
//     },
//     {
//         id: 2001,
//         type_id: 9,
//         description: "Dumalinao",
//     },
//     {
//         id: 2002,
//         type_id: 9,
//         description: "Dumingag",
//     },
//     {
//         id: 2003,
//         type_id: 9,
//         description: "Guipos",
//     },
//     {
//         id: 2004,
//         type_id: 9,
//         description: "Josefina",
//     },
//     {
//         id: 2005,
//         type_id: 9,
//         description: "Kumalarang",
//     },
//     {
//         id: 2006,
//         type_id: 9,
//         description: "Labangan",
//     },
//     {
//         id: 2007,
//         type_id: 9,
//         description: "Lakewood",
//     },
//     {
//         id: 2008,
//         type_id: 9,
//         description: "Lapuyan",
//     },
//     {
//         id: 2009,
//         type_id: 9,
//         description: "Mahayag",
//     },
//     {
//         id: 2010,
//         type_id: 9,
//         description: "Margo Sa Tubig",
//     },
//     {
//         id: 2011,
//         type_id: 9,
//         description: "Midsalip",
//     },
//     {
//         id: 2012,
//         type_id: 9,
//         description: "Molave",
//     },
//     {
//         id: 2013,
//         type_id: 9,
//         description: "Pitogo",
//     },
//     {
//         id: 2014,
//         type_id: 9,
//         description: "Ramon Magsaysay",
//     },
//     {
//         id: 2015,
//         type_id: 9,
//         description: "San Miguel",
//     },
//     {
//         id: 2016,
//         type_id: 9,
//         description: "San Pablo",
//     },
//     {
//         id: 2017,
//         type_id: 9,
//         description: "Sominot",
//     },
//     {
//         id: 2018,
//         type_id: 9,
//         description: "Tabina",
//     },
//     {
//         id: 2019,
//         type_id: 9,
//         description: "Tambulig",
//     },
//     {
//         id: 2020,
//         type_id: 9,
//         description: "Tigbao",
//     },
//     {
//         id: 2021,
//         type_id: 9,
//         description: "Alicia",
//     },
//     {
//         id: 2022,
//         type_id: 9,
//         description: "Buug",
//     },
//     {
//         id: 2023,
//         type_id: 9,
//         description: "Diplahan",
//     },
//     {
//         id: 2024,
//         type_id: 9,
//         description: "Imelda",
//     },
//     {
//         id: 2025,
//         type_id: 9,
//         description: "Ipil",
//     },
//     {
//         id: 2026,
//         type_id: 9,
//         description: "Kabasalan",
//     },
//     {
//         id: 2027,
//         type_id: 9,
//         description: "Mabuhay",
//     },
//     {
//         id: 2028,
//         type_id: 9,
//         description: "Malangas",
//     },
//     {
//         id: 2029,
//         type_id: 9,
//         description: "Naga",
//     },
//     {
//         id: 2030,
//         type_id: 9,
//         description: "Olutanga",
//     },
//     {
//         id: 2031,
//         type_id: 9,
//         description: "Payao",
//     },
//     {
//         id: 2032,
//         type_id: 9,
//         description: "Roseller Lim",
//     },
//     {
//         id: 2033,
//         type_id: 9,
//         description: "Siay",
//     },
//     {
//         id: 2034,
//         type_id: 9,
//         description: "Talusan",
//     },
//     {
//         id: 2035,
//         type_id: 9,
//         description: "Titay",
//     },
//     {
//         id: 2036,
//         type_id: 9,
//         description: "Tungawan",
//     },
//     {
//         id: 2037,
//         type_id: 9,
//         description: "DON MARCELINO",
//     },
//     {
//         id: 2038,
//         type_id: 9,
//         description: "JOSE ABAD SANTOS",
//     },
//     {
//         id: 2039,
//         type_id: 9,
//         description: "MALITA",
//     },
//     {
//         id: 2040,
//         type_id: 9,
//         description: "SANTA MARIA",
//     },
//     {
//         id: 2041,
//         type_id: 9,
//         description: "SARANGANI",
//     },
//     {
//         id: 2042,
//         type_id: 32,
//         description: "ALBANIA",
//     },
//     {
//         id: 2043,
//         type_id: 32,
//         description: "ALGERIA",
//     },
//     {
//         id: 2044,
//         type_id: 32,
//         description: "AMERICAN SAMOA",
//     },
//     {
//         id: 2045,
//         type_id: 32,
//         description: "ANDORRA",
//     },
//     {
//         id: 2046,
//         type_id: 32,
//         description: "ANGOLA",
//     },
//     {
//         id: 2047,
//         type_id: 32,
//         description: "ANGUILLA",
//     },
//     {
//         id: 2048,
//         type_id: 32,
//         description: "ANTARCTICA",
//     },
//     {
//         id: 2049,
//         type_id: 32,
//         description: "ANTIGUA AND BARBUDA",
//     },
//     {
//         id: 2050,
//         type_id: 32,
//         description: "ARGENTINA",
//     },
//     {
//         id: 2051,
//         type_id: 32,
//         description: "ARMENIA",
//     },
//     {
//         id: 2052,
//         type_id: 32,
//         description: "ARUBA",
//     },
//     {
//         id: 2053,
//         type_id: 32,
//         description: "AUSTRALIA",
//     },
//     {
//         id: 2054,
//         type_id: 32,
//         description: "AUSTRIA",
//     },
//     {
//         id: 2055,
//         type_id: 32,
//         description: "AZERBAIJAN",
//     },
//     {
//         id: 2056,
//         type_id: 32,
//         description: "BAHAMAS",
//     },
//     {
//         id: 2057,
//         type_id: 32,
//         description: "BAHRAIN",
//     },
//     {
//         id: 2058,
//         type_id: 32,
//         description: "BANGLADESH",
//     },
//     {
//         id: 2059,
//         type_id: 32,
//         description: "BARBADOS",
//     },
//     {
//         id: 2060,
//         type_id: 32,
//         description: "BELARUS",
//     },
//     {
//         id: 2061,
//         type_id: 32,
//         description: "BELGIUM",
//     },
//     {
//         id: 2062,
//         type_id: 32,
//         description: "BELIZE",
//     },
//     {
//         id: 2063,
//         type_id: 32,
//         description: "BENIN",
//     },
//     {
//         id: 2064,
//         type_id: 32,
//         description: "BERMUDA",
//     },
//     {
//         id: 2065,
//         type_id: 32,
//         description: "BHUTAN",
//     },
//     {
//         id: 2066,
//         type_id: 32,
//         description: "BOLIVIA",
//     },
//     {
//         id: 2067,
//         type_id: 32,
//         description: "BOSNIA AND HERZEGOVINA",
//     },
//     {
//         id: 2068,
//         type_id: 32,
//         description: "BOTSWANA",
//     },
//     {
//         id: 2069,
//         type_id: 32,
//         description: "BOUVET ISLAND",
//     },
//     {
//         id: 2070,
//         type_id: 32,
//         description: "BRAZIL",
//     },
//     {
//         id: 2071,
//         type_id: 32,
//         description: "BRITISH INDIAN OCEAN TERRITORY",
//     },
//     {
//         id: 2072,
//         type_id: 32,
//         description: "BRITISH VIRGIN ISLANDS",
//     },
//     {
//         id: 2073,
//         type_id: 32,
//         description: "BRUNEI DARUSSALAM",
//     },
//     {
//         id: 2074,
//         type_id: 32,
//         description: "BULGARIA",
//     },
//     {
//         id: 2075,
//         type_id: 32,
//         description: "BURKINA FASO",
//     },
//     {
//         id: 2076,
//         type_id: 32,
//         description: "BURUNDI",
//     },
//     {
//         id: 2077,
//         type_id: 32,
//         description: "CAMBODIA",
//     },
//     {
//         id: 2078,
//         type_id: 32,
//         description: "CAMEROON",
//     },
//     {
//         id: 2079,
//         type_id: 32,
//         description: "CANADA",
//     },
//     {
//         id: 2080,
//         type_id: 32,
//         description: "CAPE VERDE",
//     },
//     {
//         id: 2081,
//         type_id: 32,
//         description: "CAYMAN ISLANDS ",
//     },
//     {
//         id: 2082,
//         type_id: 32,
//         description: "CENTRAL AFRICAN REPUBLIC",
//     },
//     {
//         id: 2083,
//         type_id: 32,
//         description: "CHAD",
//     },
//     {
//         id: 2084,
//         type_id: 32,
//         description: "CHILE",
//     },
//     {
//         id: 2085,
//         type_id: 32,
//         description: "CHINA",
//     },
//     {
//         id: 2086,
//         type_id: 32,
//         description: "CHRISTMAS ISLAND",
//     },
//     {
//         id: 2087,
//         type_id: 32,
//         description: "COCOS (KEELING) ISLANDS",
//     },
//     {
//         id: 2088,
//         type_id: 32,
//         description: "COLOMBIA",
//     },
//     {
//         id: 2089,
//         type_id: 32,
//         description: "COMOROS",
//     },
//     {
//         id: 2090,
//         type_id: 32,
//         description: "CONGO (BRAZZAVILLE)",
//     },
//     {
//         id: 2091,
//         type_id: 32,
//         description: "CONGO, (KINSHASA)",
//     },
//     {
//         id: 2092,
//         type_id: 32,
//         description: "COOK ISLANDS ",
//     },
//     {
//         id: 2093,
//         type_id: 32,
//         description: "COSTA RICA",
//     },
//     {
//         id: 2094,
//         type_id: 32,
//         description: "CÔTE D IVOIRE",
//     },
//     {
//         id: 2095,
//         type_id: 32,
//         description: "CROATIA",
//     },
//     {
//         id: 2096,
//         type_id: 32,
//         description: "CUBA",
//     },
//     {
//         id: 2097,
//         type_id: 32,
//         description: "CYPRUS",
//     },
//     {
//         id: 2098,
//         type_id: 32,
//         description: "CZECH REPUBLIC",
//     },
//     {
//         id: 2099,
//         type_id: 32,
//         description: "DENMARK",
//     },
//     {
//         id: 2100,
//         type_id: 32,
//         description: "DJIBOUTI",
//     },
//     {
//         id: 2101,
//         type_id: 32,
//         description: "DOMINICA",
//     },
//     {
//         id: 2102,
//         type_id: 32,
//         description: "DOMINICAN REPUBLIC",
//     },
//     {
//         id: 2103,
//         type_id: 32,
//         description: "ECUADOR",
//     },
//     {
//         id: 2104,
//         type_id: 32,
//         description: "EGYPT",
//     },
//     {
//         id: 2105,
//         type_id: 32,
//         description: "EL SALVADOR",
//     },
//     {
//         id: 2106,
//         type_id: 32,
//         description: "EQUATORIAL GUINEA",
//     },
//     {
//         id: 2107,
//         type_id: 32,
//         description: "ERITREA",
//     },
//     {
//         id: 2108,
//         type_id: 32,
//         description: "ESTONIA",
//     },
//     {
//         id: 2109,
//         type_id: 32,
//         description: "ETHIOPIA",
//     },
//     {
//         id: 2110,
//         type_id: 32,
//         description: "FALKLAND ISLANDS (MALVINAS) ",
//     },
//     {
//         id: 2111,
//         type_id: 32,
//         description: "FAROE ISLANDS",
//     },
//     {
//         id: 2112,
//         type_id: 32,
//         description: "FIJI",
//     },
//     {
//         id: 2113,
//         type_id: 32,
//         description: "FINLAND",
//     },
//     {
//         id: 2114,
//         type_id: 32,
//         description: "FRANCE",
//     },
//     {
//         id: 2115,
//         type_id: 32,
//         description: "FRENCH GUIANA",
//     },
//     {
//         id: 2116,
//         type_id: 32,
//         description: "FRENCH POLYNESIA",
//     },
//     {
//         id: 2117,
//         type_id: 32,
//         description: "FRENCH SOUTHERN TERRITORIES",
//     },
//     {
//         id: 2118,
//         type_id: 32,
//         description: "GABON",
//     },
//     {
//         id: 2119,
//         type_id: 32,
//         description: "GAMBIA",
//     },
//     {
//         id: 2120,
//         type_id: 32,
//         description: "GEORGIA",
//     },
//     {
//         id: 2121,
//         type_id: 32,
//         description: "GERMANY",
//     },
//     {
//         id: 2122,
//         type_id: 32,
//         description: "GHANA",
//     },
//     {
//         id: 2123,
//         type_id: 32,
//         description: "GIBRALTAR ",
//     },
//     {
//         id: 2124,
//         type_id: 32,
//         description: "GREECE",
//     },
//     {
//         id: 2125,
//         type_id: 32,
//         description: "GREENLAND",
//     },
//     {
//         id: 2126,
//         type_id: 32,
//         description: "GRENADA",
//     },
//     {
//         id: 2127,
//         type_id: 32,
//         description: "GUADELOUPE",
//     },
//     {
//         id: 2128,
//         type_id: 32,
//         description: "GUAM",
//     },
//     {
//         id: 2129,
//         type_id: 32,
//         description: "GUATEMALA",
//     },
//     {
//         id: 2130,
//         type_id: 32,
//         description: "GUERNSEY",
//     },
//     {
//         id: 2131,
//         type_id: 32,
//         description: "GUINEA",
//     },
//     {
//         id: 2132,
//         type_id: 32,
//         description: "GUINEA-BISSAU",
//     },
//     {
//         id: 2133,
//         type_id: 32,
//         description: "GUYANA",
//     },
//     {
//         id: 2134,
//         type_id: 32,
//         description: "HAITI",
//     },
//     {
//         id: 2135,
//         type_id: 32,
//         description: "HEARD AND MCDONALD ISLANDS",
//     },
//     {
//         id: 2136,
//         type_id: 32,
//         description: "HOLY SEE (VATICAN CITY STATE)",
//     },
//     {
//         id: 2137,
//         type_id: 32,
//         description: "HONDURAS",
//     },
//     {
//         id: 2138,
//         type_id: 32,
//         description: "HONG KONG, SAR CHINA",
//     },
//     {
//         id: 2139,
//         type_id: 32,
//         description: "HUNGARY",
//     },
//     {
//         id: 2140,
//         type_id: 32,
//         description: "ICELAND",
//     },
//     {
//         id: 2141,
//         type_id: 32,
//         description: "INDIA",
//     },
//     {
//         id: 2142,
//         type_id: 32,
//         description: "INDONESIA",
//     },
//     {
//         id: 2143,
//         type_id: 32,
//         description: "IRAN, ISLAMIC REPUBLIC OF",
//     },
//     {
//         id: 2144,
//         type_id: 32,
//         description: "IRAQ",
//     },
//     {
//         id: 2145,
//         type_id: 32,
//         description: "IRELAND",
//     },
//     {
//         id: 2146,
//         type_id: 32,
//         description: "ISLE OF MAN ",
//     },
//     {
//         id: 2147,
//         type_id: 32,
//         description: "ISRAEL",
//     },
//     {
//         id: 2148,
//         type_id: 32,
//         description: "ITALY",
//     },
//     {
//         id: 2149,
//         type_id: 32,
//         description: "JAMAICA",
//     },
//     {
//         id: 2150,
//         type_id: 32,
//         description: "JAPAN",
//     },
//     {
//         id: 2151,
//         type_id: 32,
//         description: "JERSEY",
//     },
//     {
//         id: 2152,
//         type_id: 32,
//         description: "JORDAN",
//     },
//     {
//         id: 2153,
//         type_id: 32,
//         description: "KAZAKHSTAN",
//     },
//     {
//         id: 2154,
//         type_id: 32,
//         description: "KENYA",
//     },
//     {
//         id: 2155,
//         type_id: 32,
//         description: "KIRIBATI",
//     },
//     {
//         id: 2156,
//         type_id: 32,
//         description: "KOREA (NORTH)",
//     },
//     {
//         id: 2157,
//         type_id: 32,
//         description: "KOREA (SOUTH)",
//     },
//     {
//         id: 2158,
//         type_id: 32,
//         description: "KUWAIT",
//     },
//     {
//         id: 2159,
//         type_id: 32,
//         description: "KYRGYZSTAN",
//     },
//     {
//         id: 2160,
//         type_id: 32,
//         description: "LAO PDR",
//     },
//     {
//         id: 2161,
//         type_id: 32,
//         description: "LATVIA",
//     },
//     {
//         id: 2162,
//         type_id: 32,
//         description: "LEBANON",
//     },
//     {
//         id: 2163,
//         type_id: 32,
//         description: "LESOTHO",
//     },
//     {
//         id: 2164,
//         type_id: 32,
//         description: "LIBERIA",
//     },
//     {
//         id: 2165,
//         type_id: 32,
//         description: "LIBYA",
//     },
//     {
//         id: 2166,
//         type_id: 32,
//         description: "LIECHTENSTEIN",
//     },
//     {
//         id: 2167,
//         type_id: 32,
//         description: "LITHUANIA",
//     },
//     {
//         id: 2168,
//         type_id: 32,
//         description: "LUXEMBOURG",
//     },
//     {
//         id: 2169,
//         type_id: 32,
//         description: "MACAO, SAR CHINA",
//     },
//     {
//         id: 2170,
//         type_id: 32,
//         description: "MACEDONIA, REPUBLIC OF",
//     },
//     {
//         id: 2171,
//         type_id: 32,
//         description: "MADAGASCAR",
//     },
//     {
//         id: 2172,
//         type_id: 32,
//         description: "MALAWI",
//     },
//     {
//         id: 2173,
//         type_id: 32,
//         description: "MALAYSIA",
//     },
//     {
//         id: 2174,
//         type_id: 32,
//         description: "MALDIVES",
//     },
//     {
//         id: 2175,
//         type_id: 32,
//         description: "MALI",
//     },
//     {
//         id: 2176,
//         type_id: 32,
//         description: "MALTA",
//     },
//     {
//         id: 2177,
//         type_id: 32,
//         description: "MARSHALL ISLANDS",
//     },
//     {
//         id: 2178,
//         type_id: 32,
//         description: "MARTINIQUE",
//     },
//     {
//         id: 2179,
//         type_id: 32,
//         description: "MAURITANIA",
//     },
//     {
//         id: 2180,
//         type_id: 32,
//         description: "MAURITIUS",
//     },
//     {
//         id: 2181,
//         type_id: 32,
//         description: "MAYOTTE",
//     },
//     {
//         id: 2182,
//         type_id: 32,
//         description: "MEXICO",
//     },
//     {
//         id: 2183,
//         type_id: 32,
//         description: "MICRONESIA, FEDERATED STATES OF",
//     },
//     {
//         id: 2184,
//         type_id: 32,
//         description: "MOLDOVA",
//     },
//     {
//         id: 2185,
//         type_id: 32,
//         description: "MONACO",
//     },
//     {
//         id: 2186,
//         type_id: 32,
//         description: "MONGOLIA",
//     },
//     {
//         id: 2187,
//         type_id: 32,
//         description: "MONTENEGRO",
//     },
//     {
//         id: 2188,
//         type_id: 32,
//         description: "MONTSERRAT",
//     },
//     {
//         id: 2189,
//         type_id: 32,
//         description: "MOROCCO",
//     },
//     {
//         id: 2190,
//         type_id: 32,
//         description: "MOZAMBIQUE",
//     },
//     {
//         id: 2191,
//         type_id: 32,
//         description: "MYANMAR",
//     },
//     {
//         id: 2192,
//         type_id: 32,
//         description: "NAMIBIA",
//     },
//     {
//         id: 2193,
//         type_id: 32,
//         description: "NAURU",
//     },
//     {
//         id: 2194,
//         type_id: 32,
//         description: "NEPAL",
//     },
//     {
//         id: 2195,
//         type_id: 32,
//         description: "NETHERLANDS",
//     },
//     {
//         id: 2196,
//         type_id: 32,
//         description: "NETHERLANDS ANTILLES",
//     },
//     {
//         id: 2197,
//         type_id: 32,
//         description: "NEW CALEDONIA",
//     },
//     {
//         id: 2198,
//         type_id: 32,
//         description: "NEW ZEALAND",
//     },
//     {
//         id: 2199,
//         type_id: 32,
//         description: "NICARAGUA",
//     },
//     {
//         id: 2200,
//         type_id: 32,
//         description: "NIGER",
//     },
//     {
//         id: 2201,
//         type_id: 32,
//         description: "NIGERIA",
//     },
//     {
//         id: 2202,
//         type_id: 32,
//         description: "NIUE ",
//     },
//     {
//         id: 2203,
//         type_id: 32,
//         description: "NORFOLK ISLAND",
//     },
//     {
//         id: 2204,
//         type_id: 32,
//         description: "NORTHERN MARIANA ISLANDS",
//     },
//     {
//         id: 2205,
//         type_id: 32,
//         description: "NORWAY",
//     },
//     {
//         id: 2206,
//         type_id: 32,
//         description: "OMAN",
//     },
//     {
//         id: 2207,
//         type_id: 32,
//         description: "PAKISTAN",
//     },
//     {
//         id: 2208,
//         type_id: 32,
//         description: "PALAU",
//     },
//     {
//         id: 2209,
//         type_id: 32,
//         description: "PALESTINIAN TERRITORY",
//     },
//     {
//         id: 2210,
//         type_id: 32,
//         description: "PANAMA",
//     },
//     {
//         id: 2211,
//         type_id: 32,
//         description: "PAPUA NEW GUINEA",
//     },
//     {
//         id: 2212,
//         type_id: 32,
//         description: "PARAGUAY",
//     },
//     {
//         id: 2213,
//         type_id: 32,
//         description: "PERU",
//     },
//     {
//         id: 2214,
//         type_id: 32,
//         description: "PITCAIRN",
//     },
//     {
//         id: 2215,
//         type_id: 32,
//         description: "POLAND",
//     },
//     {
//         id: 2216,
//         type_id: 32,
//         description: "PORTUGAL",
//     },
//     {
//         id: 2217,
//         type_id: 32,
//         description: "PUERTO RICO",
//     },
//     {
//         id: 2218,
//         type_id: 32,
//         description: "QATAR",
//     },
//     {
//         id: 2219,
//         type_id: 32,
//         description: "RÉUNION",
//     },
//     {
//         id: 2220,
//         type_id: 32,
//         description: "ROMANIA",
//     },
//     {
//         id: 2221,
//         type_id: 32,
//         description: "RUSSIAN FEDERATION",
//     },
//     {
//         id: 2222,
//         type_id: 32,
//         description: "RWANDA",
//     },
//     {
//         id: 2223,
//         type_id: 32,
//         description: "SAINT HELENA",
//     },
//     {
//         id: 2224,
//         type_id: 32,
//         description: "SAINT KITTS AND NEVIS",
//     },
//     {
//         id: 2225,
//         type_id: 32,
//         description: "SAINT LUCIA",
//     },
//     {
//         id: 2226,
//         type_id: 32,
//         description: "SAINT PIERRE AND MIQUELON ",
//     },
//     {
//         id: 2227,
//         type_id: 32,
//         description: "SAINT VINCENT AND GRENADINES",
//     },
//     {
//         id: 2228,
//         type_id: 32,
//         description: "SAINT-BARTHÉLEMY",
//     },
//     {
//         id: 2229,
//         type_id: 32,
//         description: "SAINT-MARTIN (FRENCH PART)",
//     },
//     {
//         id: 2230,
//         type_id: 32,
//         description: "SAMOA",
//     },
//     {
//         id: 2231,
//         type_id: 32,
//         description: "SAN MARINO",
//     },
//     {
//         id: 2232,
//         type_id: 32,
//         description: "SAO TOME AND PRINCIPE",
//     },
//     {
//         id: 2233,
//         type_id: 32,
//         description: "SAUDI ARABIA",
//     },
//     {
//         id: 2234,
//         type_id: 32,
//         description: "SENEGAL",
//     },
//     {
//         id: 2235,
//         type_id: 32,
//         description: "SERBIA",
//     },
//     {
//         id: 2236,
//         type_id: 32,
//         description: "SEYCHELLES",
//     },
//     {
//         id: 2237,
//         type_id: 32,
//         description: "SIERRA LEONE",
//     },
//     {
//         id: 2238,
//         type_id: 32,
//         description: "SINGAPORE",
//     },
//     {
//         id: 2239,
//         type_id: 32,
//         description: "SLOVAKIA",
//     },
//     {
//         id: 2240,
//         type_id: 32,
//         description: "SLOVENIA",
//     },
//     {
//         id: 2241,
//         type_id: 32,
//         description: "SOLOMON ISLANDS",
//     },
//     {
//         id: 2242,
//         type_id: 32,
//         description: "SOMALIA",
//     },
//     {
//         id: 2243,
//         type_id: 32,
//         description: "SOUTH AFRICA",
//     },
//     {
//         id: 2244,
//         type_id: 32,
//         description: "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",
//     },
//     {
//         id: 2245,
//         type_id: 32,
//         description: "SOUTH SUDAN",
//     },
//     {
//         id: 2246,
//         type_id: 32,
//         description: "SPAIN",
//     },
//     {
//         id: 2247,
//         type_id: 32,
//         description: "SRI LANKA",
//     },
//     {
//         id: 2248,
//         type_id: 32,
//         description: "SUDAN",
//     },
//     {
//         id: 2249,
//         type_id: 32,
//         description: "SURINAME",
//     },
//     {
//         id: 2250,
//         type_id: 32,
//         description: "SVALBARD AND JAN MAYEN ISLANDS ",
//     },
//     {
//         id: 2251,
//         type_id: 32,
//         description: "SWAZILAND",
//     },
//     {
//         id: 2252,
//         type_id: 32,
//         description: "SWEDEN",
//     },
//     {
//         id: 2253,
//         type_id: 32,
//         description: "SWITZERLAND",
//     },
//     {
//         id: 2254,
//         type_id: 32,
//         description: "SYRIAN ARAB REPUBLIC (SYRIA)",
//     },
//     {
//         id: 2255,
//         type_id: 32,
//         description: "TAIWAN, REPUBLIC OF CHINA",
//     },
//     {
//         id: 2256,
//         type_id: 32,
//         description: "TAJIKISTAN",
//     },
//     {
//         id: 2257,
//         type_id: 32,
//         description: "TANZANIA, UNITED REPUBLIC OF",
//     },
//     {
//         id: 2258,
//         type_id: 32,
//         description: "THAILAND",
//     },
//     {
//         id: 2259,
//         type_id: 32,
//         description: "TIMOR-LESTE",
//     },
//     {
//         id: 2260,
//         type_id: 32,
//         description: "TOGO",
//     },
//     {
//         id: 2261,
//         type_id: 32,
//         description: "TOKELAU ",
//     },
//     {
//         id: 2262,
//         type_id: 32,
//         description: "TONGA",
//     },
//     {
//         id: 2263,
//         type_id: 32,
//         description: "TRINIDAD AND TOBAGO",
//     },
//     {
//         id: 2264,
//         type_id: 32,
//         description: "TUNISIA",
//     },
//     {
//         id: 2265,
//         type_id: 32,
//         description: "TURKEY",
//     },
//     {
//         id: 2266,
//         type_id: 32,
//         description: "TURKMENISTAN",
//     },
//     {
//         id: 2267,
//         type_id: 32,
//         description: "TURKS AND CAICOS ISLANDS ",
//     },
//     {
//         id: 2268,
//         type_id: 32,
//         description: "TUVALU",
//     },
//     {
//         id: 2269,
//         type_id: 32,
//         description: "UGANDA",
//     },
//     {
//         id: 2270,
//         type_id: 32,
//         description: "UKRAINE",
//     },
//     {
//         id: 2271,
//         type_id: 32,
//         description: "UNITED ARAB EMIRATES",
//     },
//     {
//         id: 2272,
//         type_id: 32,
//         description: "UNITED KINGDOM",
//     },
//     {
//         id: 2273,
//         type_id: 32,
//         description: "UNITED STATES OF AMERICA",
//     },
//     {
//         id: 2274,
//         type_id: 32,
//         description: "URUGUAY",
//     },
//     {
//         id: 2275,
//         type_id: 32,
//         description: "US MINOR OUTLYING ISLANDS",
//     },
//     {
//         id: 2276,
//         type_id: 32,
//         description: "UZBEKISTAN",
//     },
//     {
//         id: 2277,
//         type_id: 32,
//         description: "VANUATU",
//     },
//     {
//         id: 2278,
//         type_id: 32,
//         description: "VENEZUELA (BOLIVARIAN REPUBLIC)",
//     },
//     {
//         id: 2279,
//         type_id: 32,
//         description: "VIET NAM",
//     },
//     {
//         id: 2280,
//         type_id: 32,
//         description: "VIRGIN ISLANDS, US",
//     },
//     {
//         id: 2281,
//         type_id: 32,
//         description: "WALLIS AND FUTUNA ISLANDS ",
//     },
//     {
//         id: 2282,
//         type_id: 32,
//         description: "WESTERN SAHARA",
//     },
//     {
//         id: 2283,
//         type_id: 32,
//         description: "YEMEN",
//     },
//     {
//         id: 2284,
//         type_id: 32,
//         description: "ZAMBIA",
//     },
//     {
//         id: 2285,
//         type_id: 32,
//         description: "ZIMBABWE",
//     },
//     {
//         id: 2286,
//         type_id: 55,
//         description: "S",
//     },
//     {
//         id: 2287,
//         type_id: 56,
//         description: "Per Day",
//     },
//     {
//         id: 2288,
//         type_id: 56,
//         description: "Per Cutoff",
//     },
//     {
//         id: 2289,
//         type_id: 57,
//         description: "Per Cutoff",
//     },
//     {
//         id: 2290,
//         type_id: 58,
//         description: "Company",
//     },
//     {
//         id: 2291,
//         type_id: 58,
//         description: "SSS",
//     },
//     {
//         id: 2292,
//         type_id: 58,
//         description: "Pag-Ibig",
//     },
//     {
//         id: 2293,
//         type_id: 58,
//         description: "PhilHealth",
//     },
//     {
//         id: 2294,
//         type_id: 59,
//         description: "Per Cutoff",
//     },
//     {
//         id: 2295,
//         type_id: 59,
//         description: "First Cutoff",
//     },
//     {
//         id: 2296,
//         type_id: 59,
//         description: "Second Cutoff",
//     },
//     {
//         id: 2297,
//         type_id: 51,
//         description: "Loan",
//     },
//     {
//         id: 2298,
//         type_id: 60,
//         description: "Per Cutoff",
//     },
//     {
//         id: 2299,
//         type_id: 60,
//         description: "First Cutoff",
//     },
//     {
//         id: 2300,
//         type_id: 60,
//         description: "Second Cutoff",
//     },
//     {
//         id: 2301,
//         type_id: 51,
//         description: "Contribution",
//     },
//     {
//         id: 2302,
//         type_id: 4,
//         description: "3",
//     },
//     {
//         id: 2303,
//         type_id: 4,
//         description: "4",
//     },
//     {
//         id: 2304,
//         type_id: 4,
//         description: "5",
//     },
//     {
//         id: 2305,
//         type_id: 4,
//         description: "6",
//     },
//     {
//         id: 2306,
//         type_id: 4,
//         description: "7",
//     },
//     {
//         id: 2307,
//         type_id: 4,
//         description: "8",
//     },
//     {
//         id: 2308,
//         type_id: 4,
//         description: "9",
//     },
//     {
//         id: 2309,
//         type_id: 4,
//         description: "10",
//     },
//     {
//         id: 2310,
//         type_id: 4,
//         description: "11",
//     },
//     {
//         id: 2311,
//         type_id: 4,
//         description: "12",
//     },
//     {
//         id: 2312,
//         type_id: 4,
//         description: "13",
//     },
//     {
//         id: 2313,
//         type_id: 4,
//         description: "14",
//     },
//     {
//         id: 2314,
//         type_id: 4,
//         description: "15",
//     },
//     {
//         id: 2315,
//         type_id: 4,
//         description: "16",
//     },
//     {
//         id: 2316,
//         type_id: 4,
//         description: "17A",
//     },
//     {
//         id: 2317,
//         type_id: 4,
//         description: "17B",
//     },
//     {
//         id: 2318,
//         type_id: 4,
//         description: "18",
//     },
//     {
//         id: 2319,
//         type_id: 4,
//         description: "19",
//     },
//     {
//         id: 2320,
//         type_id: 4,
//         description: "20",
//     },
//     {
//         id: 2321,
//         type_id: 4,
//         description: "21A",
//     },
//     {
//         id: 2322,
//         type_id: 4,
//         description: "21B",
//     },
//     {
//         id: 2323,
//         type_id: 4,
//         description: "21C",
//     },
//     {
//         id: 2324,
//         type_id: 4,
//         description: "22",
//     },
//     {
//         id: 2325,
//         type_id: 4,
//         description: "23A",
//     },
//     {
//         id: 2326,
//         type_id: 4,
//         description: "23B",
//     },
//     {
//         id: 2327,
//         type_id: 4,
//         description: "24",
//     },
//     {
//         id: 2328,
//         type_id: 4,
//         description: "25A",
//     },
//     {
//         id: 2329,
//         type_id: 4,
//         description: "25B",
//     },
//     {
//         id: 2330,
//         type_id: 4,
//         description: "26",
//     },
//     {
//         id: 2331,
//         type_id: 4,
//         description: "27",
//     },
//     {
//         id: 2332,
//         type_id: 4,
//         description: "28",
//     },
//     {
//         id: 2333,
//         type_id: 4,
//         description: "29",
//     },
//     {
//         id: 2334,
//         type_id: 4,
//         description: "30",
//     },
//     {
//         id: 2335,
//         type_id: 4,
//         description: "31",
//     },
//     {
//         id: 2336,
//         type_id: 4,
//         description: "32",
//     },
//     {
//         id: 2337,
//         type_id: 4,
//         description: "33",
//     },
//     {
//         id: 2338,
//         type_id: 4,
//         description: "34",
//     },
//     {
//         id: 2339,
//         type_id: 4,
//         description: "35",
//     },
//     {
//         id: 2340,
//         type_id: 4,
//         description: "36",
//     },
//     {
//         id: 2341,
//         type_id: 4,
//         description: "37",
//     },
//     {
//         id: 2342,
//         type_id: 4,
//         description: "38",
//     },
//     {
//         id: 2343,
//         type_id: 4,
//         description: "39",
//     },
//     {
//         id: 2344,
//         type_id: 4,
//         description: "40",
//     },
//     {
//         id: 2345,
//         type_id: 4,
//         description: "41",
//     },
//     {
//         id: 2346,
//         type_id: 4,
//         description: "42",
//     },
//     {
//         id: 2347,
//         type_id: 4,
//         description: "43",
//     },
//     {
//         id: 2348,
//         type_id: 4,
//         description: "44",
//     },
//     {
//         id: 2349,
//         type_id: 4,
//         description: "45",
//     },
//     {
//         id: 2350,
//         type_id: 4,
//         description: "46",
//     },
//     {
//         id: 2351,
//         type_id: 4,
//         description: "47",
//     },
//     {
//         id: 2352,
//         type_id: 4,
//         description: "48",
//     },
//     {
//         id: 2353,
//         type_id: 4,
//         description: "49",
//     },
//     {
//         id: 2354,
//         type_id: 4,
//         description: "50",
//     },
//     {
//         id: 2355,
//         type_id: 4,
//         description: "51",
//     },
//     {
//         id: 2356,
//         type_id: 4,
//         description: "52",
//     },
//     {
//         id: 2357,
//         type_id: 4,
//         description: "53A",
//     },
//     {
//         id: 2358,
//         type_id: 4,
//         description: "53B",
//     },
//     {
//         id: 2359,
//         type_id: 4,
//         description: "54A",
//     },
//     {
//         id: 2360,
//         type_id: 4,
//         description: "54B",
//     },
//     {
//         id: 2361,
//         type_id: 4,
//         description: "55",
//     },
//     {
//         id: 2362,
//         type_id: 4,
//         description: "56",
//     },
//     {
//         id: 2363,
//         type_id: 4,
//         description: "57",
//     },
//     {
//         id: 2364,
//         type_id: 4,
//         description: "58",
//     },
//     {
//         id: 2365,
//         type_id: 4,
//         description: "59",
//     },
//     {
//         id: 2366,
//         type_id: 4,
//         description: "60",
//     },
//     {
//         id: 2367,
//         type_id: 4,
//         description: "61",
//     },
//     {
//         id: 2368,
//         type_id: 4,
//         description: "62",
//     },
//     {
//         id: 2369,
//         type_id: 4,
//         description: "63",
//     },
//     {
//         id: 2370,
//         type_id: 4,
//         description: "64",
//     },
//     {
//         id: 2371,
//         type_id: 4,
//         description: "65",
//     },
//     {
//         id: 2372,
//         type_id: 4,
//         description: "66",
//     },
//     {
//         id: 2373,
//         type_id: 4,
//         description: "67",
//     },
//     {
//         id: 2374,
//         type_id: 4,
//         description: "68",
//     },
//     {
//         id: 2375,
//         type_id: 4,
//         description: "69",
//     },
//     {
//         id: 2376,
//         type_id: 4,
//         description: "70",
//     },
//     {
//         id: 2377,
//         type_id: 4,
//         description: "71",
//     },
//     {
//         id: 2378,
//         type_id: 4,
//         description: "72",
//     },
//     {
//         id: 2379,
//         type_id: 4,
//         description: "73",
//     },
//     {
//         id: 2380,
//         type_id: 4,
//         description: "74",
//     },
//     {
//         id: 2381,
//         type_id: 4,
//         description: "75",
//     },
//     {
//         id: 2382,
//         type_id: 4,
//         description: "76",
//     },
//     {
//         id: 2383,
//         type_id: 4,
//         description: "77",
//     },
//     {
//         id: 2384,
//         type_id: 4,
//         description: "78",
//     },
//     {
//         id: 2385,
//         type_id: 4,
//         description: "79",
//     },
//     {
//         id: 2386,
//         type_id: 4,
//         description: "80",
//     },
//     {
//         id: 2387,
//         type_id: 4,
//         description: "81",
//     },
//     {
//         id: 2388,
//         type_id: 4,
//         description: "82",
//     },
//     {
//         id: 2389,
//         type_id: 4,
//         description: "83",
//     },
//     {
//         id: 2390,
//         type_id: 4,
//         description: "84",
//     },
//     {
//         id: 2391,
//         type_id: 4,
//         description: "85",
//     },
//     {
//         id: 2392,
//         type_id: 4,
//         description: "86",
//     },
//     {
//         id: 2393,
//         type_id: 4,
//         description: "87",
//     },
//     {
//         id: 2394,
//         type_id: 4,
//         description: "88",
//     },
//     {
//         id: 2395,
//         type_id: 4,
//         description: "89",
//     },
//     {
//         id: 2396,
//         type_id: 4,
//         description: "90",
//     },
//     {
//         id: 2397,
//         type_id: 4,
//         description: "91",
//     },
//     {
//         id: 2398,
//         type_id: 4,
//         description: "92",
//     },
//     {
//         id: 2399,
//         type_id: 4,
//         description: "093A",
//     },
//     {
//         id: 2400,
//         type_id: 4,
//         description: "093B",
//     },
//     {
//         id: 2401,
//         type_id: 4,
//         description: "94",
//     },
//     {
//         id: 2402,
//         type_id: 4,
//         description: "95",
//     },
//     {
//         id: 2403,
//         type_id: 4,
//         description: "96",
//     },
//     {
//         id: 2404,
//         type_id: 4,
//         description: "97",
//     },
//     {
//         id: 2405,
//         type_id: 4,
//         description: "98",
//     },
//     {
//         id: 2406,
//         type_id: 4,
//         description: "99",
//     },
//     {
//         id: 2407,
//         type_id: 4,
//         description: "100",
//     },
//     {
//         id: 2408,
//         type_id: 4,
//         description: "101",
//     },
//     {
//         id: 2409,
//         type_id: 4,
//         description: "102",
//     },
//     {
//         id: 2410,
//         type_id: 4,
//         description: "103",
//     },
//     {
//         id: 2411,
//         type_id: 4,
//         description: "104",
//     },
//     {
//         id: 2412,
//         type_id: 4,
//         description: "105",
//     },
//     {
//         id: 2413,
//         type_id: 4,
//         description: "106",
//     },
//     {
//         id: 2414,
//         type_id: 4,
//         description: "107",
//     },
//     {
//         id: 2415,
//         type_id: 4,
//         description: "108",
//     },
//     {
//         id: 2416,
//         type_id: 4,
//         description: "109",
//     },
//     {
//         id: 2417,
//         type_id: 4,
//         description: "110",
//     },
//     {
//         id: 2418,
//         type_id: 4,
//         description: "111",
//     },
//     {
//         id: 2419,
//         type_id: 4,
//         description: "112",
//     },
//     {
//         id: 2420,
//         type_id: 4,
//         description: "113A",
//     },
//     {
//         id: 2421,
//         type_id: 4,
//         description: "113B",
//     },
//     {
//         id: 2422,
//         type_id: 4,
//         description: "114",
//     },
//     {
//         id: 2423,
//         type_id: 4,
//         description: "115",
//     },
//     {
//         id: 2424,
//         type_id: 5,
//         description: "Calasiao, West Pangasinan",
//     },
//     {
//         id: 2425,
//         type_id: 5,
//         description: "Alaminos, Pangasinan",
//     },
//     {
//         id: 2426,
//         type_id: 5,
//         description: "Urdaneta, Pangasinan",
//     },
//     {
//         id: 2427,
//         type_id: 5,
//         description: "Bangued, Abra",
//     },
//     {
//         id: 2428,
//         type_id: 5,
//         description: "Baguio City",
//     },
//     {
//         id: 2429,
//         type_id: 5,
//         description: "La Trinidad, Benguet",
//     },
//     {
//         id: 2430,
//         type_id: 5,
//         description: "Bontoc, Mt. Province",
//     },
//     {
//         id: 2431,
//         type_id: 5,
//         description: "Tabuk City, Kalinga",
//     },
//     {
//         id: 2432,
//         type_id: 5,
//         description: "Lagawe, Ifugao",
//     },
//     {
//         id: 2433,
//         type_id: 5,
//         description: "Tuguegarao, Cagayan",
//     },
//     {
//         id: 2434,
//         type_id: 5,
//         description: "Bayombong, Nueva Vizcaya",
//     },
//     {
//         id: 2435,
//         type_id: 5,
//         description: "Naguilian, Isabela",
//     },
//     {
//         id: 2436,
//         type_id: 5,
//         description: "Cabarroguis, Quirino",
//     },
//     {
//         id: 2437,
//         type_id: 5,
//         description: "Tarlac City, Tarlac",
//     },
//     {
//         id: 2438,
//         type_id: 5,
//         description: "Paniqui, Tarlac",
//     },
//     {
//         id: 2439,
//         type_id: 5,
//         description: "Olongapo City",
//     },
//     {
//         id: 2440,
//         type_id: 5,
//         description: "Subic Bay Freeport Zone",
//     },
//     {
//         id: 2441,
//         type_id: 5,
//         description: "Balanga, Bataan",
//     },
//     {
//         id: 2442,
//         type_id: 5,
//         description: "North Pampanga",
//     },
//     {
//         id: 2443,
//         type_id: 5,
//         description: "South Pampanga",
//     },
//     {
//         id: 2444,
//         type_id: 5,
//         description: "Clark Freeport Zone",
//     },
//     {
//         id: 2445,
//         type_id: 5,
//         description: "Baler, Aurora",
//     },
//     {
//         id: 2446,
//         type_id: 5,
//         description: "North Nueva Ecija",
//     },
//     {
//         id: 2447,
//         type_id: 5,
//         description: "South Nueva Ecija",
//     },
//     {
//         id: 2448,
//         type_id: 5,
//         description: "Valenzuela City",
//     },
//     {
//         id: 2449,
//         type_id: 5,
//         description: "Plaridel, Bulacan",
//     },
//     {
//         id: 2450,
//         type_id: 5,
//         description: "Sta. Maria, Bulacan",
//     },
//     {
//         id: 2451,
//         type_id: 5,
//         description: "Malabon-Navotas",
//     },
//     {
//         id: 2452,
//         type_id: 5,
//         description: "Caloocan City",
//     },
//     {
//         id: 2453,
//         type_id: 5,
//         description: "Novaliches",
//     },
//     {
//         id: 2454,
//         type_id: 5,
//         description: "Tondo - San Nicolas",
//     },
//     {
//         id: 2455,
//         type_id: 5,
//         description: "Binondo",
//     },
//     {
//         id: 2456,
//         type_id: 5,
//         description: "Sta. Cruz",
//     },
//     {
//         id: 2457,
//         type_id: 5,
//         description: "Quiapo-Sampaloc-San Miguel-Sta. Mesa",
//     },
//     {
//         id: 2458,
//         type_id: 5,
//         description: "Intramuros-Ermita-Malate",
//     },
//     {
//         id: 2459,
//         type_id: 5,
//         description: "Paco-Pandacan-Sta. Ana-San Andres",
//     },
//     {
//         id: 2460,
//         type_id: 5,
//         description: "Romblon",
//     },
//     {
//         id: 2461,
//         type_id: 5,
//         description: "Puerto Princesa",
//     },
//     {
//         id: 2462,
//         type_id: 5,
//         description: "San Jose, Occidental Mindoro",
//     },
//     {
//         id: 2463,
//         type_id: 5,
//         description: "North Quezon City",
//     },
//     {
//         id: 2464,
//         type_id: 5,
//         description: "South Quezon City",
//     },
//     {
//         id: 2465,
//         type_id: 5,
//         description: "Cubao",
//     },
//     {
//         id: 2466,
//         type_id: 5,
//         description: "Mandaluyong City",
//     },
//     {
//         id: 2467,
//         type_id: 5,
//         description: "San Juan",
//     },
//     {
//         id: 2468,
//         type_id: 5,
//         description: "Pasig",
//     },
//     {
//         id: 2469,
//         type_id: 5,
//         description: "Taguig-Pateros",
//     },
//     {
//         id: 2470,
//         type_id: 5,
//         description: "Marikina",
//     },
//     {
//         id: 2471,
//         type_id: 5,
//         description: "Cainta-Taytay",
//     },
//     {
//         id: 2472,
//         type_id: 5,
//         description: "East Makati",
//     },
//     {
//         id: 2473,
//         type_id: 5,
//         description: "West Makati",
//     },
//     {
//         id: 2474,
//         type_id: 5,
//         description: "North Makati",
//     },
//     {
//         id: 2475,
//         type_id: 5,
//         description: "South Makati",
//     },
//     {
//         id: 2476,
//         type_id: 5,
//         description: "Pasay City",
//     },
//     {
//         id: 2477,
//         type_id: 5,
//         description: "Parañaque",
//     },
//     {
//         id: 2478,
//         type_id: 5,
//         description: "Las Piñas City",
//     },
//     {
//         id: 2479,
//         type_id: 5,
//         description: "Muntinlupa City",
//     },
//     {
//         id: 2480,
//         type_id: 5,
//         description: "Trece Martirez City, East Cavite",
//     },
//     {
//         id: 2481,
//         type_id: 5,
//         description: "Kawit, West Cavite",
//     },
//     {
//         id: 2482,
//         type_id: 5,
//         description: "San Pablo City",
//     },
//     {
//         id: 2483,
//         type_id: 5,
//         description: "Calamba, Laguna",
//     },
//     {
//         id: 2484,
//         type_id: 5,
//         description: "Biñan, Laguna",
//     },
//     {
//         id: 2485,
//         type_id: 5,
//         description: "Batangas City",
//     },
//     {
//         id: 2486,
//         type_id: 5,
//         description: "Lipa City",
//     },
//     {
//         id: 2487,
//         type_id: 5,
//         description: "Lucena City",
//     },
//     {
//         id: 2488,
//         type_id: 5,
//         description: "Gumaca, Quezon",
//     },
//     {
//         id: 2489,
//         type_id: 5,
//         description: "Boac, Marinduque",
//     },
//     {
//         id: 2490,
//         type_id: 5,
//         description: "Calapan, Oriental Mindoro",
//     },
//     {
//         id: 2491,
//         type_id: 5,
//         description: "Talisay, Camarines Norte",
//     },
//     {
//         id: 2492,
//         type_id: 5,
//         description: "Naga City",
//     },
//     {
//         id: 2493,
//         type_id: 5,
//         description: "Iriga City",
//     },
//     {
//         id: 2494,
//         type_id: 5,
//         description: "Legazpi City, Albay",
//     },
//     {
//         id: 2495,
//         type_id: 5,
//         description: "Sorsogon, Sorsogon",
//     },
//     {
//         id: 2496,
//         type_id: 5,
//         description: "Virac, Catanduanes",
//     },
//     {
//         id: 2497,
//         type_id: 5,
//         description: "Masbate, Masbate",
//     },
//     {
//         id: 2498,
//         type_id: 5,
//         description: "Kalibo, Aklan",
//     },
//     {
//         id: 2499,
//         type_id: 5,
//         description: "Roxas City",
//     },
//     {
//         id: 2500,
//         type_id: 5,
//         description: "San Jose, Antique",
//     },
//     {
//         id: 2501,
//         type_id: 5,
//         description: "Iloilo City",
//     },
//     {
//         id: 2502,
//         type_id: 5,
//         description: "Zarraga, Iloilo City",
//     },
//     {
//         id: 2503,
//         type_id: 5,
//         description: "Victorias City, Negros Occidental",
//     },
//     {
//         id: 2504,
//         type_id: 5,
//         description: "Bacolod City",
//     },
//     {
//         id: 2505,
//         type_id: 5,
//         description: "Binalbagan, Negros Occidental",
//     },
//     {
//         id: 2506,
//         type_id: 5,
//         description: "Dumaguete City",
//     },
//     {
//         id: 2507,
//         type_id: 5,
//         description: "Mandaue City",
//     },
//     {
//         id: 2508,
//         type_id: 5,
//         description: "Cebu City North",
//     },
//     {
//         id: 2509,
//         type_id: 5,
//         description: "Cebu City South",
//     },
//     {
//         id: 2510,
//         type_id: 5,
//         description: "Talisay City, Cebu",
//     },
//     {
//         id: 2511,
//         type_id: 5,
//         description: "Tagbilaran City",
//     },
//     {
//         id: 2512,
//         type_id: 5,
//         description: "Catarman, Northern Samar",
//     },
//     {
//         id: 2513,
//         type_id: 5,
//         description: "Borongan, Eastern Samar",
//     },
//     {
//         id: 2514,
//         type_id: 5,
//         description: "Calbayog City, Samar",
//     },
//     {
//         id: 2515,
//         type_id: 5,
//         description: "Tacloban City",
//     },
//     {
//         id: 2516,
//         type_id: 5,
//         description: "Ormoc City",
//     },
//     {
//         id: 2517,
//         type_id: 5,
//         description: "Maasin, Southern Leyte",
//     },
//     {
//         id: 2518,
//         type_id: 5,
//         description: "Dipolog City",
//     },
//     {
//         id: 2519,
//         type_id: 5,
//         description: "Pagadian City, Zamboanga del Sur",
//     },
//     {
//         id: 2520,
//         type_id: 5,
//         description: "Zamboanga City, Zamboanga del Sur",
//     },
//     {
//         id: 2521,
//         type_id: 5,
//         description: "Ipil, Zamboanga Sibugay",
//     },
//     {
//         id: 2522,
//         type_id: 5,
//         description: "Isabela, Basilan",
//     },
//     {
//         id: 2523,
//         type_id: 5,
//         description: "Jolo, Sulu",
//     },
//     {
//         id: 2524,
//         type_id: 5,
//         description: "Bongao, Tawi-Tawi",
//     },
//     {
//         id: 2525,
//         type_id: 5,
//         description: "Gingoog City",
//     },
//     {
//         id: 2526,
//         type_id: 5,
//         description: "Cagayan de Oro City",
//     },
//     {
//         id: 2527,
//         type_id: 5,
//         description: "Malaybalay City, Bukidnon",
//     },
//     {
//         id: 2528,
//         type_id: 5,
//         description: "Ozamis City",
//     },
//     {
//         id: 2529,
//         type_id: 5,
//         description: "Iligan City",
//     },
//     {
//         id: 2530,
//         type_id: 5,
//         description: "Marawi City",
//     },
//     {
//         id: 2531,
//         type_id: 5,
//         description: "Butuan City",
//     },
//     {
//         id: 2532,
//         type_id: 5,
//         description: "Bayugan City, Agusan del Sur",
//     },
//     {
//         id: 2533,
//         type_id: 5,
//         description: "Surigao City",
//     },
//     {
//         id: 2534,
//         type_id: 5,
//         description: "Tandag, Surigao del Sur",
//     },
//     {
//         id: 2535,
//         type_id: 5,
//         description: "Cotabato City",
//     },
//     {
//         id: 2536,
//         type_id: 5,
//         description: "Kidapawan, North Cotabato",
//     },
//     {
//         id: 2537,
//         type_id: 5,
//         description: "Tacurong, Sultan Kudarat",
//     },
//     {
//         id: 2538,
//         type_id: 5,
//         description: "General Santos City",
//     },
//     {
//         id: 2539,
//         type_id: 5,
//         description: "Koronadal City, South Cotabato",
//     },
//     {
//         id: 2540,
//         type_id: 5,
//         description: "Tagum, Davao del Norte",
//     },
//     {
//         id: 2541,
//         type_id: 5,
//         description: "West Davao City",
//     },
//     {
//         id: 2542,
//         type_id: 5,
//         description: "East Davao City",
//     },
//     {
//         id: 2543,
//         type_id: 5,
//         description: "Mati, Davao Oriental",
//     },
//     {
//         id: 2544,
//         type_id: 5,
//         description: "Digos, Davao del Sur",
//     },
//     {
//         id: 2545,
//         type_id: 57,
//         description: "First Cutoff",
//     },
//     {
//         id: 2546,
//         type_id: 57,
//         description: "Second Cutoff",
//     },
//     {
//         id: 2547,
//         type_id: 61,
//         description: "Metro Manila",
//     },
//     {
//         id: 2548,
//         type_id: 61,
//         description: "Ilocos Norte",
//     },
//     {
//         id: 2549,
//         type_id: 61,
//         description: "Ilocos Sur",
//     },
//     {
//         id: 2550,
//         type_id: 61,
//         description: "La Union",
//     },
//     {
//         id: 2551,
//         type_id: 61,
//         description: "Pangasinan",
//     },
//     {
//         id: 2552,
//         type_id: 61,
//         description: "Batanes",
//     },
//     {
//         id: 2553,
//         type_id: 61,
//         description: "Cagayan",
//     },
//     {
//         id: 2554,
//         type_id: 61,
//         description: "Isabela",
//     },
//     {
//         id: 2555,
//         type_id: 61,
//         description: "Nueva Vizcaya",
//     },
//     {
//         id: 2556,
//         type_id: 61,
//         description: "Quirino",
//     },
//     {
//         id: 2557,
//         type_id: 61,
//         description: "Aurora",
//     },
//     {
//         id: 2558,
//         type_id: 61,
//         description: "Bataan",
//     },
//     {
//         id: 2559,
//         type_id: 61,
//         description: "Bulacan",
//     },
//     {
//         id: 2560,
//         type_id: 61,
//         description: "Nueva Ecija",
//     },
//     {
//         id: 2561,
//         type_id: 61,
//         description: "Pampanga",
//     },
//     {
//         id: 2562,
//         type_id: 61,
//         description: "Tarlac",
//     },
//     {
//         id: 2563,
//         type_id: 61,
//         description: "Zambales",
//     },
//     {
//         id: 2564,
//         type_id: 61,
//         description: "Batangas",
//     },
//     {
//         id: 2565,
//         type_id: 61,
//         description: "Cavite",
//     },
//     {
//         id: 2566,
//         type_id: 61,
//         description: "Laguna",
//     },
//     {
//         id: 2567,
//         type_id: 61,
//         description: "Quezon",
//     },
//     {
//         id: 2568,
//         type_id: 61,
//         description: "Rizal",
//     },
//     {
//         id: 2569,
//         type_id: 61,
//         description: "Marinduque",
//     },
//     {
//         id: 2570,
//         type_id: 61,
//         description: "Occidental Mindoro",
//     },
//     {
//         id: 2571,
//         type_id: 61,
//         description: "Oriental Mindoro",
//     },
//     {
//         id: 2572,
//         type_id: 61,
//         description: "Palawan",
//     },
//     {
//         id: 2573,
//         type_id: 61,
//         description: "Romblon",
//     },
//     {
//         id: 2574,
//         type_id: 61,
//         description: "Albay",
//     },
//     {
//         id: 2575,
//         type_id: 61,
//         description: "Camarines Norte",
//     },
//     {
//         id: 2576,
//         type_id: 61,
//         description: "Camarines Sur",
//     },
//     {
//         id: 2577,
//         type_id: 61,
//         description: "Catanduanes",
//     },
//     {
//         id: 2578,
//         type_id: 61,
//         description: "Masbate",
//     },
//     {
//         id: 2579,
//         type_id: 61,
//         description: "Sorsogon",
//     },
//     {
//         id: 2580,
//         type_id: 61,
//         description: "Aklan",
//     },
//     {
//         id: 2581,
//         type_id: 61,
//         description: "Antique",
//     },
//     {
//         id: 2582,
//         type_id: 61,
//         description: "Capiz",
//     },
//     {
//         id: 2583,
//         type_id: 61,
//         description: "Guimaras",
//     },
//     {
//         id: 2584,
//         type_id: 61,
//         description: "Iloilo",
//     },
//     {
//         id: 2585,
//         type_id: 61,
//         description: "Negros Occidental",
//     },
//     {
//         id: 2586,
//         type_id: 61,
//         description: "Bohol",
//     },
//     {
//         id: 2587,
//         type_id: 61,
//         description: "Cebu",
//     },
//     {
//         id: 2588,
//         type_id: 61,
//         description: "Negros Oriental",
//     },
//     {
//         id: 2589,
//         type_id: 61,
//         description: "Siquijor",
//     },
//     {
//         id: 2590,
//         type_id: 61,
//         description: "Biliran",
//     },
//     {
//         id: 2591,
//         type_id: 61,
//         description: "Eastern Samar",
//     },
//     {
//         id: 2592,
//         type_id: 61,
//         description: "Leyte",
//     },
//     {
//         id: 2593,
//         type_id: 61,
//         description: "Northern Samar",
//     },
//     {
//         id: 2594,
//         type_id: 61,
//         description: "Samar",
//     },
//     {
//         id: 2595,
//         type_id: 61,
//         description: "Southern Leyte",
//     },
//     {
//         id: 2596,
//         type_id: 61,
//         description: "Zamboanga Del Norte",
//     },
//     {
//         id: 2597,
//         type_id: 61,
//         description: "Zamboanga Del Sur",
//     },
//     {
//         id: 2598,
//         type_id: 61,
//         description: "Zamboanga Sibugay",
//     },
//     {
//         id: 2599,
//         type_id: 61,
//         description: "Bukidnon",
//     },
//     {
//         id: 2600,
//         type_id: 61,
//         description: "Camiguin",
//     },
//     {
//         id: 2601,
//         type_id: 61,
//         description: "Lanao Del Norte",
//     },
//     {
//         id: 2602,
//         type_id: 61,
//         description: "Misamis Oriental",
//     },
//     {
//         id: 2603,
//         type_id: 61,
//         description: "Misamis Occidental",
//     },
//     {
//         id: 2604,
//         type_id: 61,
//         description: "Compostela Valley",
//     },
//     {
//         id: 2605,
//         type_id: 61,
//         description: "Davao Del Norte",
//     },
//     {
//         id: 2606,
//         type_id: 61,
//         description: "Davao Del Sur",
//     },
//     {
//         id: 2607,
//         type_id: 61,
//         description: "Davao Oriental",
//     },
//     {
//         id: 2608,
//         type_id: 61,
//         description: "Davao Occidental",
//     },
//     {
//         id: 2609,
//         type_id: 61,
//         description: "Cotabato",
//     },
//     {
//         id: 2610,
//         type_id: 61,
//         description: "Saranggani",
//     },
//     {
//         id: 2611,
//         type_id: 61,
//         description: "South Cotabato",
//     },
//     {
//         id: 2612,
//         type_id: 61,
//         description: "Sultan Kudarat",
//     },
//     {
//         id: 2613,
//         type_id: 61,
//         description: "Dinagat Islands",
//     },
//     {
//         id: 2614,
//         type_id: 61,
//         description: "Surigao Del Norte",
//     },
//     {
//         id: 2615,
//         type_id: 61,
//         description: "Surigao Del Sur",
//     },
//     {
//         id: 2616,
//         type_id: 61,
//         description: "Agusan Del Norte",
//     },
//     {
//         id: 2617,
//         type_id: 61,
//         description: "Agusan Del Sur",
//     },
//     {
//         id: 2618,
//         type_id: 61,
//         description: "Basilan",
//     },
//     {
//         id: 2619,
//         type_id: 61,
//         description: "Lanao Del Sur",
//     },
//     {
//         id: 2620,
//         type_id: 61,
//         description: "Maguindanao",
//     },
//     {
//         id: 2621,
//         type_id: 61,
//         description: "Sulu",
//     },
//     {
//         id: 2622,
//         type_id: 61,
//         description: "Tawi-Tawi",
//     },
//     {
//         id: 2623,
//         type_id: 61,
//         description: "Apayao",
//     },
//     {
//         id: 2624,
//         type_id: 61,
//         description: "Abra",
//     },
//     {
//         id: 2625,
//         type_id: 61,
//         description: "Benguet",
//     },
//     {
//         id: 2626,
//         type_id: 61,
//         description: "Ifugao",
//     },
//     {
//         id: 2627,
//         type_id: 61,
//         description: "Mountain Province",
//     },
//     {
//         id: 2628,
//         type_id: 61,
//         description: "Kalinga",
//     },
//     {
//         id: 2629,
//         type_id: 56,
//         description: "First Cutoff",
//     },
//     {
//         id: 2630,
//         type_id: 56,
//         description: "Second Cutoff",
//     },
//     {
//         id: 2631,
//         type_id: 15,
//         description: "Annual Alphalist",
//     },
//     {
//         id: 2632,
//         type_id: 15,
//         description: "BIR Form 2316",
//     },
//     {
//         id: 2633,
//         type_id: 15,
//         description: "Philhealth Remittance List",
//     },
//     {
//         id: 2634,
//         type_id: 99002634,
//         description: "Placeholder 2634",
//     },
//     {
//         id: 2635,
//         type_id: 99002635,
//         description: "Placeholder 2635",
//     },
//     {
//         id: 2636,
//         type_id: 99002636,
//         description: "Placeholder 2636",
//     },
//     {
//         id: 2637,
//         type_id: 99002637,
//         description: "Placeholder 2637",
//     },
//     {
//         id: 2638,
//         type_id: 15,
//         description: "SSS Remittance List",
//     },
//     {
//         id: 2639,
//         type_id: 15,
//         description: "Pagibig Remittance List",
//     },
//     {
//         id: 2640,
//         type_id: 15,
//         description: "SSS Loan Collection List",
//     },
//     {
//         id: 2641,
//         type_id: 15,
//         description: "Pagibig Loan Collection List",
//     },
//     {
//         id: 2642,
//         type_id: 15,
//         description: "Employee Attendance",
//     },
//     {
//         id: 2643,
//         type_id: 15,
//         description: "Employee Master List (201 File)",
//     },
//     {
//         id: 2644,
//         type_id: 15,
//         description: "Loans",
//     },
//     {
//         id: 2645,
//         type_id: 99002645,
//         description: "Placeholder 2645",
//     },
//     {
//         id: 2646,
//         type_id: 99002646,
//         description: "Placeholder 2646",
//     },
//     {
//         id: 2647,
//         type_id: 99002647,
//         description: "Placeholder 2647",
//     },
//     {
//         id: 2648,
//         type_id: 99002648,
//         description: "Placeholder 2648",
//     },
//     {
//         id: 2649,
//         type_id: 15,
//         description: "Leaves",
//     },
//     {
//         id: 2650,
//         type_id: 15,
//         description: "Payroll Register",
//     },
//     {
//         id: 2651,
//         type_id: 15,
//         description: "Payslip",
//     },
//     {
//         id: 2652,
//         type_id: 15,
//         description: "Bank File",
//     },
//     {
//         id: 2653,
//         type_id: 15,
//         description: "Certificate of Employment (COE)",
//     },
//     {
//         id: 2654,
//         type_id: 0,
//         description: "SSS/2 by Monthly Rate",
//     },
//     {
//         id: 2655,
//         type_id: 21,
//         description: "Monthly Rate",
//     },
//     {
//         id: 2656,
//         type_id: 21,
//         description: "Semi-Monthly Rate",
//     },
//     {
//         id: 2657,
//         type_id: 99002657,
//         description: "Placeholder 2657",
//     },
//     {
//         id: 2658,
//         type_id: 99002658,
//         description: "Placeholder 2658",
//     },
//     {
//         id: 2659,
//         type_id: 99002659,
//         description: "Placeholder 2659",
//     },
//     {
//         id: 2660,
//         type_id: 99002660,
//         description: "Placeholder 2660",
//     },
//     {
//         id: 2661,
//         type_id: 99002661,
//         description: "Placeholder 2661",
//     },
//     {
//         id: 2662,
//         type_id: 99002662,
//         description: "Placeholder 2662",
//     },
//     {
//         id: 2663,
//         type_id: 99002663,
//         description: "Placeholder 2663",
//     },
//     {
//         id: 2664,
//         type_id: 99002664,
//         description: "Placeholder 2664",
//     },
//     {
//         id: 2665,
//         type_id: 99002665,
//         description: "Placeholder 2665",
//     },
//     {
//         id: 2666,
//         type_id: 99002666,
//         description: "Placeholder 2666",
//     },
//     {
//         id: 2667,
//         type_id: 99002667,
//         description: "Placeholder 2667",
//     },
//     {
//         id: 2668,
//         type_id: 99002668,
//         description: "Placeholder 2668",
//     },
//     {
//         id: 2669,
//         type_id: 99002669,
//         description: "Placeholder 2669",
//     },
//     {
//         id: 2670,
//         type_id: 99002670,
//         description: "Placeholder 2670",
//     },
//     {
//         id: 2671,
//         type_id: 99002671,
//         description: "Placeholder 2671",
//     },
//     {
//         id: 2672,
//         type_id: 99002672,
//         description: "Placeholder 2672",
//     },
//     {
//         id: 2673,
//         type_id: 99002673,
//         description: "Placeholder 2673",
//     },
//     {
//         id: 2674,
//         type_id: 99002674,
//         description: "Placeholder 2674",
//     },
//     {
//         id: 2675,
//         type_id: 99002675,
//         description: "Placeholder 2675",
//     },
//     {
//         id: 2676,
//         type_id: 99002676,
//         description: "Placeholder 2676",
//     },
//     {
//         id: 2677,
//         type_id: 99002677,
//         description: "Placeholder 2677",
//     },
//     {
//         id: 2678,
//         type_id: 99002678,
//         description: "Placeholder 2678",
//     },
//     {
//         id: 2679,
//         type_id: 99002679,
//         description: "Placeholder 2679",
//     },
//     {
//         id: 2680,
//         type_id: 99002680,
//         description: "Placeholder 2680",
//     },
//     {
//         id: 2681,
//         type_id: 99002681,
//         description: "Placeholder 2681",
//     },
//     {
//         id: 2682,
//         type_id: 99002682,
//         description: "Placeholder 2682",
//     },
//     {
//         id: 2683,
//         type_id: 99002683,
//         description: "Placeholder 2683",
//     },
//     {
//         id: 2684,
//         type_id: 99002684,
//         description: "Placeholder 2684",
//     },
//     {
//         id: 2685,
//         type_id: 99002685,
//         description: "Placeholder 2685",
//     },
//     {
//         id: 2686,
//         type_id: 99002686,
//         description: "Placeholder 2686",
//     },
//     {
//         id: 2687,
//         type_id: 99002687,
//         description: "Placeholder 2687",
//     },
//     {
//         id: 2688,
//         type_id: 99002688,
//         description: "Placeholder 2688",
//     },
//     {
//         id: 2689,
//         type_id: 99002689,
//         description: "Placeholder 2689",
//     },
//     {
//         id: 2690,
//         type_id: 99002690,
//         description: "Placeholder 2690",
//     },
//     {
//         id: 2691,
//         type_id: 99002691,
//         description: "Placeholder 2691",
//     },
//     {
//         id: 2692,
//         type_id: 99002692,
//         description: "Placeholder 2692",
//     },
//     {
//         id: 2693,
//         type_id: 99002693,
//         description: "Placeholder 2693",
//     },
//     {
//         id: 2694,
//         type_id: 99002694,
//         description: "Placeholder 2694",
//     },
//     {
//         id: 2695,
//         type_id: 99002695,
//         description: "Placeholder 2695",
//     },
//     {
//         id: 2696,
//         type_id: 99002696,
//         description: "Placeholder 2696",
//     },
//     {
//         id: 2697,
//         type_id: 99002697,
//         description: "Placeholder 2697",
//     },
//     {
//         id: 2698,
//         type_id: 99002698,
//         description: "Placeholder 2698",
//     },
//     {
//         id: 2699,
//         type_id: 99002699,
//         description: "Placeholder 2699",
//     },
//     {
//         id: 12656,
//         type_id: 62,
//         description: "Date Hired",
//     },
//     {
//         id: 12657,
//         type_id: 63,
//         description: "COE Purposes",
//     },
//     {
//         id: 12658,
//         type_id: 63,
//         description: "Visa Application",
//     },
//     {
//         id: 12659,
//         type_id: 63,
//         description: "Loan Purpose",
//     },
//     {
//         id: 12660,
//         type_id: 63,
//         description: "Legal Purpose",
//     },
//     {
//         id: 12661,
//         type_id: 63,
//         description: "Mobile Plan",
//     },
//     {
//         id: 12662,
//         type_id: 16,
//         description: "Leave Balance",
//     },
//     {
//         id: 12663,
//         type_id: 64,
//         description: "Balance",
//     },
//     {
//         id: 12664,
//         type_id: 64,
//         description: "Used",
//     },
//     {
//         id: 12665,
//         type_id: 36,
//         description: "Resigned",
//     },
//     {
//         id: 12666,
//         type_id: 36,
//         description: "On-Hold",
//     },
//     {
//         id: 12667,
//         type_id: 13,
//         description: "Confidentiality",
//     },
//     {
//         id: 12668,
//         type_id: 16,
//         description: "Loan",
//     },
//     {
//         id: 12669,
//         type_id: 16,
//         description: "Allowance and Deduction",
//     },
//     {
//         id: 12670,
//         type_id: 65,
//         description: "DE MINIMIS  ",
//     },
//     {
//         id: 12675,
//         type_id: 65,
//         description: "13TH MONTH",
//     },
//     {
//         id: 12676,
//         type_id: 65,
//         description: "13TH MONTH OTHERS",
//     },
//     {
//         id: 12677,
//         type_id: 65,
//         description: "OTHER ALLOWANCES",
//     },
//     {
//         id: 12678,
//         type_id: 65,
//         description: "NON-TAXABLE SALARIES AND OTHERS",
//     },
//     {
//         id: 12679,
//         type_id: 65,
//         description: "BASIC PAY",
//     },
//     {
//         id: 12680,
//         type_id: 65,
//         description: "TRANSPORTATION",
//     },
//     {
//         id: 12681,
//         type_id: 65,
//         description: "TAXABLE OTHER INCOME RECURRING",
//     },
//     {
//         id: 12682,
//         type_id: 65,
//         description: "TAXABLE 13TH MONTH",
//     },
//     {
//         id: 12683,
//         type_id: 65,
//         description: "OVERTIME PAY",
//     },
//     {
//         id: 12684,
//         type_id: 65,
//         description: "TAXABLE OTHER INCOME NON-RECURRING",
//     },
//     {
//         id: 12685,
//         type_id: 65,
//         description: "OTHER ADJUSTMENTS",
//     },
//     {
//         id: 12686,
//         type_id: 66,
//         description: "System Generated Timekeeping",
//     },
//     {
//         id: 12687,
//         type_id: 66,
//         description: "Manually Upload Timekeeping",
//     },
//     {
//         id: 12689,
//         type_id: 15,
//         description: "BIR Form 1601C - Monthly Remittance (Tabular)",
//     },
//     {
//         id: 12690,
//         type_id: 67,
//         description: "Data Table",
//     },
//     {
//         id: 12691,
//         type_id: 67,
//         description: "PDF",
//     },
//     {
//         id: 12692,
//         type_id: 68,
//         description: "Web",
//     },
//     {
//         id: 12693,
//         type_id: 68,
//         description: "Mobile",
//     },
//     {
//         id: 12694,
//         type_id: 68,
//         description: "Biometric Device",
//     },
//     {
//         id: 12695,
//         type_id: 69,
//         description: "Monthly",
//     },
//     {
//         id: 12696,
//         type_id: 69,
//         description: "Semi-Monthly",
//     },
//     {
//         id: 12697,
//         type_id: 69,
//         description: "Weekly",
//     },
//     {
//         id: 12698,
//         type_id: 70,
//         description: "Pre-Overtime",
//     },
//     {
//         id: 12699,
//         type_id: 70,
//         description: "Post-Overtime",
//     },
//     {
//         id: 12700,
//         type_id: 71,
//         description: "Round-Up",
//     },
//     {
//         id: 12701,
//         type_id: 71,
//         description: "Round-Down",
//     },
//     {
//         id: 12702,
//         type_id: 67,
//         description: "Excel",
//     },
//     {
//         id: 12703,
//         type_id: 15,
//         description: "Summary Hours",
//     },
//     {
//         id: 12704,
//         type_id: 15,
//         description: "Summary Hours Daily",
//     },
//     {
//         id: 12705,
//         type_id: 15,
//         description: "Meal and Transportation",
//     },
//     {
//         id: 12706,
//         type_id: 15,
//         description: "Bank Report - BDO",
//     },
//     {
//         id: 12707,
//         type_id: 72,
//         description: "0",
//     },
//     {
//         id: 12708,
//         type_id: 70,
//         description: "Rest Day or Holiday",
//     },
//     {
//         id: 12709,
//         type_id: 73,
//         description: "EOM",
//     },
//     {
//         id: 12710,
//         type_id: 73,
//         description: "FRST",
//     },
//     {
//         id: 12711,
//         type_id: 73,
//         description: "SCND",
//     },
//     {
//         id: 12712,
//         type_id: 73,
//         description: "BOTH",
//     },
//     {
//         id: 12719,
//         type_id: 74,
//         description: "Regular",
//     },
//     {
//         id: 12720,
//         type_id: 74,
//         description: "Final",
//     },
//     {
//         id: 12721,
//         type_id: 74,
//         description: "SSS Mat",
//     },
//     {
//         id: 12722,
//         type_id: 74,
//         description: "Special",
//     },
//     {
//         id: 12723,
//         type_id: 74,
//         description: "13th Month",
//     },
//     {
//         id: 12724,
//         type_id: 75,
//         description: "Total Hours Work",
//     },
//     {
//         id: 12725,
//         type_id: 75,
//         description: "After Schedule In",
//     },
//     {
//         id: 12726,
//         type_id: 75,
//         description: "Work Period",
//     },
//     {
//         id: 12727,
//         type_id: 76,
//         description: "Shift Code",
//     },
//     {
//         id: 12728,
//         type_id: 76,
//         description: "Timekeeping Category",
//     },
//     {
//         id: 12729,
//         type_id: 72,
//         description: "1",
//     },
//     {
//         id: 12730,
//         type_id: 72,
//         description: "2",
//     },
//     {
//         id: 12731,
//         type_id: 72,
//         description: "3",
//     },
//     {
//         id: 12732,
//         type_id: 72,
//         description: "4",
//     },
//     {
//         id: 12733,
//         type_id: 72,
//         description: "5",
//     },
//     {
//         id: 12734,
//         type_id: 72,
//         description: "6",
//     },
//     {
//         id: 12735,
//         type_id: 72,
//         description: "7",
//     },
//     {
//         id: 12736,
//         type_id: 72,
//         description: "8",
//     },
//     {
//         id: 12737,
//         type_id: 72,
//         description: "9",
//     },
//     {
//         id: 12738,
//         type_id: 72,
//         description: "10",
//     },
//     {
//         id: 12739,
//         type_id: 72,
//         description: "11",
//     },
//     {
//         id: 12740,
//         type_id: 72,
//         description: "12",
//     },
//     {
//         id: 12741,
//         type_id: 72,
//         description: "13",
//     },
//     {
//         id: 12742,
//         type_id: 67,
//         description: "Text",
//     },
//     {
//         id: 12743,
//         type_id: 77,
//         description: "Daily",
//     },
//     {
//         id: 12744,
//         type_id: 77,
//         description: "Monthly",
//     },
//     {
//         id: 12745,
//         type_id: 77,
//         description: "Hourly",
//     },
//     {
//         id: 12746,
//         type_id: 78,
//         description: "Schedule Date",
//     },
//     {
//         id: 12747,
//         type_id: 78,
//         description: "Filing Date",
//     },
//     {
//         id: 12748,
//         type_id: 78,
//         description: "Approval Date",
//     },
//     {
//         id: 12749,
//         type_id: 15,
//         description: "Daily Activity",
//     },
//     {
//         id: 12750,
//         type_id: 15,
//         description: "Change Schedule",
//     },
//     {
//         id: 12751,
//         type_id: 15,
//         description: "Change Log",
//     },
//     {
//         id: 12752,
//         type_id: 15,
//         description: "Official Business",
//     },
//     {
//         id: 12753,
//         type_id: 15,
//         description: "Overtime",
//     },
//     {
//         id: 12754,
//         type_id: 15,
//         description: "Leave",
//     },
//     {
//         id: 12755,
//         type_id: 15,
//         description: "Offset",
//     },
//     {
//         id: 12756,
//         type_id: 15,
//         description: "Unpaid Hours",
//     },
//     {
//         id: 12757,
//         type_id: 15,
//         description: "CoE Request",
//     },
//     {
//         id: 12758,
//         type_id: 79,
//         description: "Half Day",
//     },
//     {
//         id: 12759,
//         type_id: 79,
//         description: "Whole Day",
//     },
//     {
//         id: 12760,
//         type_id: 79,
//         description: "Hourly",
//     },
//     {
//         id: 12761,
//         type_id: 80,
//         description: "Regular Holiday",
//     },
//     {
//         id: 12762,
//         type_id: 80,
//         description: "Special Holiday",
//     },
//     {
//         id: 12763,
//         type_id: 15,
//         description: "Summary Hours ADJ",
//     },
//     {
//         id: 12764,
//         type_id: 15,
//         description: "Summary Hours Daily ADJ",
//     },
//     {
//         id: 12775,
//         type_id: 81,
//         description: "BIR",
//     },
//     {
//         id: 12776,
//         type_id: 81,
//         description: "SSS",
//     },
//     {
//         id: 12777,
//         type_id: 81,
//         description: "HDMF",
//     },
//     {
//         id: 12778,
//         type_id: 81,
//         description: "PHIC",
//     },
//     {
//         id: 12779,
//         type_id: 81,
//         description: "2316",
//     },
//     {
//         id: 12780,
//         type_id: 81,
//         description: "Other Payroll",
//     },
//     {
//         id: 12781,
//         type_id: 81,
//         description: "Employee",
//     },
//     {
//         id: 12782,
//         type_id: 81,
//         description: "Attendance",
//     },
//     {
//         id: 12783,
//         type_id: 81,
//         description: "Custom",
//     },
//     {
//         id: 12784,
//         type_id: 15,
//         description: "BIR_1601C",
//     },
//     {
//         id: 12785,
//         type_id: 15,
//         description: "BIR_1601C_NEW",
//     },
//     {
//         id: 12786,
//         type_id: 15,
//         description: "BIR_1601C_NTX",
//     },
//     {
//         id: 12787,
//         type_id: 15,
//         description: "BIR_1601C_XLS",
//     },
//     {
//         id: 12788,
//         type_id: 15,
//         description: "SUMMARY_MTD_PEZA",
//     },
//     {
//         id: 12789,
//         type_id: 15,
//         description: "SUMMARY_TAX_PER_MONTH",
//     },
//     {
//         id: 12790,
//         type_id: 15,
//         description: "Certificate of Employment",
//     },
//     {
//         id: 12791,
//         type_id: 15,
//         description: "Certificate of Contribution - HDMF",
//     },
//     {
//         id: 12792,
//         type_id: 15,
//         description: "Certificate of Contribution - PHIC",
//     },
//     {
//         id: 12793,
//         type_id: 15,
//         description: "Certificate of Contribution - SSS",
//     },
//     {
//         id: 12794,
//         type_id: 15,
//         description: "Employee Information",
//     },
//     {
//         id: 12795,
//         type_id: 15,
//         description: "Biometrics ID",
//     },
//     {
//         id: 12796,
//         type_id: 15,
//         description: "HDMF_MSRF",
//     },
//     {
//         id: 12797,
//         type_id: 15,
//         description: "HDMF_PAY",
//     },
//     {
//         id: 12798,
//         type_id: 15,
//         description: "HDMF_STLRF",
//     },
//     {
//         id: 12799,
//         type_id: 15,
//         description: "HDMF_LOAN",
//     },
//     {
//         id: 12800,
//         type_id: 15,
//         description: "HDMF_PYMT",
//     },
//     {
//         id: 12801,
//         type_id: 15,
//         description: "PHIC_ER2",
//     },
//     {
//         id: 12802,
//         type_id: 15,
//         description: "PHIC_RF-1",
//     },
//     {
//         id: 12803,
//         type_id: 15,
//         description: "PHIC_EPRS",
//     },
//     {
//         id: 12804,
//         type_id: 15,
//         description: "PHIC_ER2_XLS",
//     },
//     {
//         id: 12805,
//         type_id: 15,
//         description: "SSS_FIL",
//     },
//     {
//         id: 12806,
//         type_id: 15,
//         description: "SSS_LOAN",
//     },
//     {
//         id: 12807,
//         type_id: 15,
//         description: "SSS_ML-1",
//     },
//     {
//         id: 12808,
//         type_id: 15,
//         description: "SSS_ML-2",
//     },
//     {
//         id: 12809,
//         type_id: 15,
//         description: "SSS_R-1A",
//     },
//     {
//         id: 12810,
//         type_id: 15,
//         description: "SSS_R-3",
//     },
//     {
//         id: 12811,
//         type_id: 15,
//         description: "SSS_R-5",
//     },
//     {
//         id: 12812,
//         type_id: 15,
//         description: "SSS_PREMIUM",
//     },
//     {
//         id: 12813,
//         type_id: 15,
//         description: "2316",
//     },
//     {
//         id: 12814,
//         type_id: 15,
//         description: "Daily Activity",
//     },
//     {
//         id: 12815,
//         type_id: 15,
//         description: "Leaves",
//     },
//     {
//         id: 12816,
//         type_id: 15,
//         description: "Overtime",
//     },
//     {
//         id: 12817,
//         type_id: 15,
//         description: "Summary Hours",
//     },
//     {
//         id: 12818,
//         type_id: 15,
//         description: "Summary Hours ADJ",
//     },
//     {
//         id: 12819,
//         type_id: 15,
//         description: "Summary Hours Daily",
//     },
//     {
//         id: 12820,
//         type_id: 15,
//         description: "Summary Hours Daily ADJ",
//     },
//     {
//         id: 12821,
//         type_id: 15,
//         description: "Year-To-Date",
//     },
//     {
//         id: 12822,
//         type_id: 15,
//         description: "Employee Loans",
//     },
//     {
//         id: 12823,
//         type_id: 15,
//         description: "Payroll_Register",
//     },
//     {
//         id: 12824,
//         type_id: 82,
//         description: "Add",
//     },
//     {
//         id: 12825,
//         type_id: 82,
//         description: "Deduct",
//     },
//     {
//         id: 12826,
//         type_id: 82,
//         description: "New Entry",
//     },
//     {
//         id: 12827,
//         type_id: 67,
//         description: "Link",
//     },
//     {
//         id: 12828,
//         type_id: 80,
//         description: "Company Holiday",
//     },
//     {
//         id: 12829,
//         type_id: 83,
//         description: "Earliest In/Latest Out",
//     },
//     {
//         id: 12830,
//         type_id: 83,
//         description: "Actual In/Out",
//     },
//     {
//         id: 12831,
//         type_id: 84,
//         description: "All Approved",
//     },
//     {
//         id: 12832,
//         type_id: 84,
//         description: "Lower of Logs/Approved",
//     },
//     {
//         id: 12833,
//         type_id: 88,
//         description: "By Increment",
//     },
//     {
//         id: 12834,
//         type_id: 88,
//         description: "By Setup",
//     },
//     {
//         id: 12835,
//         type_id: 87,
//         description: "Within Shift",
//     },
//     {
//         id: 12836,
//         type_id: 87,
//         description: "All Approved",
//     },
//     {
//         id: 12837,
//         type_id: 87,
//         description: "Lower of Logs/Approved",
//     },
//     {
//         id: 12838,
//         type_id: 85,
//         description: "Calendar Days",
//     },
//     {
//         id: 12839,
//         type_id: 85,
//         description: "Working Days",
//     },
//     {
//         id: 12840,
//         type_id: 89,
//         description: "Tardy",
//     },
//     {
//         id: 12841,
//         type_id: 89,
//         description: "Undertime",
//     },
//     {
//         id: 12842,
//         type_id: 89,
//         description: "Night Differential",
//     },
//     {
//         id: 12843,
//         type_id: 89,
//         description: "Overtime",
//     },
//     {
//         id: 12844,
//         type_id: 89,
//         description: "Rest Day",
//     },
//     {
//         id: 12845,
//         type_id: 89,
//         description: "Combine Tardy and Undertime",
//     },
//     {
//         id: 12846,
//         type_id: 15,
//         description: "Bank Report - BPI",
//     },
//     {
//         id: 12847,
//         type_id: 90,
//         description: "Vacation Leave (VL)",
//     },
//     {
//         id: 12848,
//         type_id: 90,
//         description: "Sick Leave (SL)",
//     },
//     {
//         id: 12849,
//         type_id: 90,
//         description: "Other Leave (OTL)",
//     },
//     {
//         id: 12850,
//         type_id: 81,
//         description: "Filing",
//     },
//     {
//         id: 12851,
//         type_id: 81,
//         description: "Filing",
//     },
//     {
//         id: 12853,
//         type_id: 77,
//         description: "Semi-Monthly",
//     },
//     {
//         id: 12855,
//         type_id: 81,
//         description: "Payroll",
//     },
//     {
//         id: 12861,
//         type_id: 92,
//         description: "Company",
//     },
//     {
//         id: 12862,
//         type_id: 92,
//         description: "Government",
//     },
//     {
//         id: 12863,
//         type_id: 92,
//         description: "Bank",
//     },
//     {
//         id: 12864,
//         type_id: 91,
//         description: "DE MINIMIS",
//     },
//     {
//         id: 12865,
//         type_id: 91,
//         description: "13TH MONTH",
//     },
//     {
//         id: 12866,
//         type_id: 91,
//         description: "13TH MONTH OTHERS",
//     },
//     {
//         id: 12867,
//         type_id: 91,
//         description: "OTHER ALLOWANCES",
//     },
//     {
//         id: 12868,
//         type_id: 91,
//         description: "NT SAL AND OTHERS",
//     },
//     {
//         id: 12869,
//         type_id: 91,
//         description: "BASIC PAY",
//     },
//     {
//         id: 12870,
//         type_id: 91,
//         description: "TRANSPORTATION",
//     },
//     {
//         id: 12871,
//         type_id: 91,
//         description: "TX OTHER INC RECURRING",
//     },
//     {
//         id: 12872,
//         type_id: 91,
//         description: "TAXABLE 13TH MONTH",
//     },
//     {
//         id: 12873,
//         type_id: 91,
//         description: "OVERTIME PAY",
//     },
//     {
//         id: 12874,
//         type_id: 91,
//         description: "TX OTHER INC NOT RECURRING",
//     },
//     {
//         id: 12875,
//         type_id: 91,
//         description: "OTHER ADJUSTMENTS",
//     },
//     {
//         id: 12876,
//         type_id: 91,
//         description: "FRINGE BENEFITS",
//     },
//     {
//         id: 12877,
//         type_id: 91,
//         description: "NOTINC2316andSSS",
//     },
//     {
//         id: 12880,
//         type_id: 15,
//         description: "Offset Overtime",
//     },
//     {
//         id: 22847,
//         type_id: 91,
//         description: "DE MINIMIS",
//     },
//     {
//         id: 22848,
//         type_id: 91,
//         description: "13TH MONTH",
//     },
//     {
//         id: 22849,
//         type_id: 91,
//         description: "13TH MONTH OTHERS",
//     },
//     {
//         id: 22850,
//         type_id: 91,
//         description: "OTHER ALLOWANCES",
//     },
//     {
//         id: 22851,
//         type_id: 91,
//         description: "NT SAL AND OTHERS",
//     },
//     {
//         id: 22852,
//         type_id: 91,
//         description: "BASIC PAY",
//     },
//     {
//         id: 22853,
//         type_id: 91,
//         description: "TRANSPORTATION",
//     },
//     {
//         id: 22854,
//         type_id: 91,
//         description: "TX OTHER INC RECURRING",
//     },
//     {
//         id: 22855,
//         type_id: 91,
//         description: "TAXABLE 13TH MONTH",
//     },
//     {
//         id: 22856,
//         type_id: 91,
//         description: "OVERTIME PAY",
//     },
//     {
//         id: 22857,
//         type_id: 91,
//         description: "TX OTHER INC NOT RECURRING",
//     },
//     {
//         id: 22858,
//         type_id: 91,
//         description: "OTHER ADJUSTMENTS",
//     },
//     {
//         id: 22859,
//         type_id: 92,
//         description: "Company",
//     },
//     {
//         id: 22860,
//         type_id: 92,
//         description: "Government",
//     },
//     {
//         id: 22861,
//         type_id: 92,
//         description: "Bank",
//     },
//     {
//         id: 22862,
//         type_id: 16,
//         description: "Earnings",
//     },
//     {
//         id: 22863,
//         type_id: 16,
//         description: "Deductions",
//     },
//     {
//         id: 22864,
//         type_id: 15,
//         description: "Offset Overtime",
//     },
//     {
//         id: 22867,
//         type_id: 16,
//         description: "Bulk Edit Earnings",
//     },
//     {
//         id: 22869,
//         type_id: 16,
//         description: "Bulk Edit Deductions",
//     },
//     {
//         id: 22872,
//         type_id: 16,
//         description: "Bulk Edit Loans",
//     },
//     {
//         id: 22876,
//         type_id: 15,
//         description: "Journal Entries",
//     },
//     {
//         id: 22877,
//         type_id: 15,
//         description: "Bank Listing",
//     },
//     {
//         id: 22878,
//         type_id: 15,
//         description: "Remittance Schedule",
//     },
//     {
//         id: 22879,
//         type_id: 15,
//         description: "Finance Report OT",
//     },
//     {
//         id: 22880,
//         type_id: 15,
//         description: "Payroll Summary",
//     },
//     {
//         id: 22881,
//         type_id: 15,
//         description: "Transaction Prooflist",
//     },
//     {
//         id: 22882,
//         type_id: 15,
//         description: "Funding Report",
//     },
//     {
//         id: 29999,
//         type_id: 99029999,
//         description: "Placeholder 29999",
//     },
//     {
//         id: 30000,
//         type_id: 99030000,
//         description: "Placeholder 30000",
//     },
//     {
//         id: 30001,
//         type_id: 93,
//         description: "Maternity Leave",
//     },
//     {
//         id: 30002,
//         type_id: 16,
//         description: "Loan Legacy",
//     },
//     {
//         id: 30003,
//         type_id: 15,
//         description: "Pension Report",
//     },
//     {
//         id: 30004,
//         type_id: 93,
//         description: "Maternity Leave Extension (Solo Parent)",
//     },
//     {
//         id: 30005,
//         type_id: 93,
//         description: "Maternity Leave (Miscarriage)",
//     },
//     {
//         id: 30006,
//         type_id: 15,
//         description: "Finance Report FTE",
//     },
//     {
//         id: 30007,
//         type_id: 15,
//         description: "Peza Report",
//     },
//     {
//         id: 30008,
//         type_id: 15,
//         description: "Masterlist Report",
//     },
//     {
//         id: 30009,
//         type_id: 16,
//         description: "Employee Schedule",
//     },
//     {
//         id: 30010,
//         type_id: 63,
//         description: "Local Employment",
//     },
//     {
//         id: 30011,
//         type_id: 63,
//         description: "Employment Abroad",
//     },
//     {
//         id: 30012,
//         type_id: 63,
//         description: "School Requirement",
//     },
//     {
//         id: 30013,
//         type_id: 15,
//         description: "13th Month Accrual Report",
//     },
//     {
//         id: 30014,
//         type_id: 99030014,
//         description: "Placeholder 30014",
//     },
//     {
//         id: 30015,
//         type_id: 16,
//         description: "Update Employee",
//     },
//     {
//         id: 30016,
//         type_id: 16,
//         description: "Update Employee Information",
//     },
//     {
//         id: 30017,
//         type_id: 15,
//         description: "Finance Report PR",
//     },
//     {
//         id: 30018,
//         type_id: 15,
//         description: "Variance Report",
//     },
//     {
//         id: 30019,
//         type_id: 16,
//         description: "2316 -- ITR From Previous Employer",
//     },
//     {
//         id: 30020,
//         type_id: 99030020,
//         description: "Placeholder 30020",
//     },
//     {
//         id: 30021,
//         type_id: 99030021,
//         description: "Placeholder 30021",
//     },
//     {
//         id: 30022,
//         type_id: 15,
//         description: "Available",
//     },
//     {
//         id: 30023,
//         type_id: 15,
//         description: "Available",
//     },
//     {
//         id: 30024,
//         type_id: 15,
//         description: "Meal and Transporation ADJ",
//     },
//     {
//         id: 30025,
//         type_id: 15,
//         description: "HDMF Contribution (RCBC)",
//     },
//     {
//         id: 30026,
//         type_id: 15,
//         description: "HDMF Multi-Purpose Loan (RCBC)",
//     },
//     {
//         id: 30027,
//         type_id: 15,
//         description: "HDMF Calamity Loan (RCBC)",
//     },
//     {
//         id: 30028,
//         type_id: 15,
//         description: "HDMF Contribution (SBC)",
//     },
//     {
//         id: 30029,
//         type_id: 15,
//         description: "HDMF Calamity Loan (SBC)",
//     },
//     {
//         id: 30030,
//         type_id: 15,
//         description: "HDMF Multi-Purpose Loan (SBC)",
//     },
//     {
//         id: 30031,
//         type_id: 15,
//         description: "HDMF Modified Pag-ibig 2 (SBC)",
//     },
//     {
//         id: 30032,
//         type_id: 15,
//         description: "Alphalist Schedule",
//     },
//     {
//         id: 30033,
//         type_id: 15,
//         description: "Alphalist DAT",
//     },
//     {
//         id: 30034,
//         type_id: 15,
//         description: "Annualization",
//     },
//     {
//         id: 30072,
//         type_id: 115,
//         description: "Day/s",
//     },
//     {
//         id: 30073,
//         type_id: 115,
//         description: "Month/s",
//     },
//     {
//         id: 30074,
//         type_id: 115,
//         description: "Year/s",
//     },
// ];

