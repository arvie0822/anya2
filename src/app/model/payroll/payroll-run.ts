import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"
import { DropdownRequest } from "../dropdown.model";
import { TableRequest } from "../datatable.model";

var pipe = new DatePipe('en-US');

export class PayrollDetails {

    id                    : number = 0
    payrollCode           : string = ""
    payoutTypeID          : number = 0
    categoryPayroll       : number = 0
    year                  : number = 0
    month                 : number = 0
    weekly                : number = 0
    cutoffID              : number = 0
    finalStatus           : [] = []
    payoutDateDisplay     = pipe.transform (new Date,"yyyy-MM-dd")
    asofdate              : Date = new Date()
    subCompany            : number[] = []
    branch                : number[] = []
    category              : number[] = []
    department            : number[] = []
    confidential          : number[] = []
    status                : number[] = []
    employee              : number[] = []
    annualize             : number = 2
    description           : string = ""
    rate1                 : string = ""
    rate2                 : string = ""
    employeeCode          : string = ""
    employeeName          : string = ""
    dateFrom              : Date = new Date()
    dateTo                : Date = new Date()
    type                  : number = 0
    tablerequest          = new TableRequest()
    finalList             : PayrollEmployeeParam[] = []
    isLocked              : boolean = false
    basic                 : string  = null
    recurringEarnings     : boolean = true
    recurringDeduction    : boolean = true
    statutory             : boolean = true
    tax                   : boolean = true
    loan                  : boolean = true
    sss                   : boolean = true
    phic                  : boolean = true
    hdmf                  : boolean = true
    thirteenMonth         : boolean = true
    fourteenMonth         : boolean = false
    fifteenMonth          : boolean = false
    sixteenMonth          : boolean = false
    excludedList          : [] = []
    selectedList          : [] = []
    employeeExclude       : [] = []
    // : payrollCategoryException        = new payrollCategoryException
    days                  : string = null
    dailyRate             : string = null
    projectedMonths       : string = null
}

export class PayrollTimekeeping {

    timekeepingType       : number = 0
    uploadFile            : string = ""
    uploadFile2           : string = ""
    timekeepingAdjustment : number = 0
    timekeepingAttendance : number = 0
    timekeepingCode       : number = 0
    timekeeping           : number = 0
    attendance            : number = 0
    search                : string = ""

}


export class PayrollEarning {

    transactionType       : number = 0
    earningType           : number = 0
    uploadFile            : string = ""
    uploadFile2           : string = ""
    uploadFile3           : string = ""
    earningACode          : number = 0
    earningABType         : number = 0
    earningAdjCode        : number = 0
    employeeName          : [] = []
    status                : number = 0
    earning               : number = 0
    attendance            : number = 0
    search                : string = ""

}

export class PayrollDeductions {

    transactionType       : number = 0
    deductionType         : number = 0
    uploadFile            : string = ""
    uploadFile2           : string = ""
    uploadFile3           : string = ""
    deductionABType       : number = 0
    deductionAdjCode      : number = 0
    deductionACode        : number = 0
    employeeName          : number = 0
    status                : number = 0
    deduction             : number = 0
    attendance            : number = 0
    search                : string = ""

}

export class PayrollLoans {

    transactionType       : number = 0
    loanType              : number = 0
    uploadFile            : string = ""
    uploadFile2           : string = ""
    uploadFile3           : string = ""
    loanABType            : number = 0
    loanACode             : number = 0
    loanAdjCode           : number = 0
    employeeName          : number = 0
    status                : number = 0
    loan                  : number = 0
    attendance            : number = 0
    search                : string = ""

}

export class PayrollGovCont {

    transactionType       : number = 0
    uploadFile            : string = ""
    govcon                : number = 0
    search                : string = ""

}

export class PayrollGenerate {

    payslip            : number = 0
    payRegister        : number = 0
    payslipStatus      : number = 0
    bank               : number = 0
    employeeName       : string = ""
    bankOption         : number = 1
    firstName          : string = ""
    lastName           : string = ""
    employeeCode       : string = ""
    code               : string = ""
    rate               : number = 0
    currency           : number = 0
    date               = new Date
    search             : string = ""
}

export class EarningTable {
    amount: number = 0
}

export class GovconTable {
    amount: number = 0
}

export class EmpFilter {
    type: number = 0
    payrollType: number = 0
    payrollCategory: number[] = []
    year: number = 0
    month: number = 0
    weekly: number = 0
    cutoffID: number = 0
    subCompany: number[] = []
    branch: number[] = []
    employeeCategory: number[] = []
    department: number[] = []
    confidential: number[] = []
    dropdownReq: DropdownRequest
    tableReq: TableRequest
    employee: number[] = []
    status: number[] = []
}

export class PayrollRun {
    payrollCode: string = ''
}

export class tkDropdown {
    year  : number = 0
    month : number = 0
    cutoffid  : number = 0
    req: DropdownRequest
}

export class PGEMPLOYEE {

   payrollCode: string = ''
   employeeId: number = 0
   branchId: number = 0

}

export class PayrollEmployeeParam {

    payrollCode            : string = ""
    employeeId             : number = 0
    employeeName           : string = ""
    employeeCode           : string = ""
    status                 : string = ""
    date                   : Date = new Date()
    BasicMonth             : number = 0
    recurringEarnings      : boolean = false
    recurringDeduction     : boolean = false
    loan                   : boolean = false
    statutory              : boolean = false

 }


export class Currency{

    IdCurrency             : number = 0
    currrencyRate          : number = 0

 }

 export class PayrollAnnualized {

    id                     : number = 0
    payrollCode            : string = ""
    divideTaxPay           : number = 0
    projectedGovCon        : boolean = false

 }
