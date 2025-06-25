import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"

var pipe = new DatePipe('en-US');

export class CategoryPayrollCutoffHeader {
    payrollCutoffHeaderId : number = 0
    payrollCutoffCode : string = ""
    payoutTypeId : number = 0
    description : string = ""
    active : boolean = true
    createdBy : number = 0
    dateCreated : string = new Date().toISOString().substring(0,new Date().toISOString().length-1)

    categoryPayrollCutoff : CategoryPayrollCutoff[] = [new CategoryPayrollCutoff]
    categoryPayrollCutoffLocking : CategoryPayrollCutoffLocking[] = [new CategoryPayrollCutoffLocking]
}


export class CategoryPayrollCutoff{
    payrollCutoffId : number = 0
    payrollCutoffHeaderId : number = 0
    // payrollCutoffHeader : any[] = []
    cutoffId : number = 0
    dateStart : number = 0
    dateEnd : number = 0
    payDay : number = 0
    dsMonth : number = 0
    deMonth : number = 0
    pdMonth : number = 0
    reportingMonth  : number = 0
}


export class CategoryPayrollCutoffLocking{
    categoryPayrollCutoffLockingId : number = 0
    payrollCutoffHeaderId : number = 0
    // payrollCutoffHeader : any[] = []
    cutoffName : string = ""
    weekId : number = 0
    monthId : number = 0
    cutoffId : number = 0
    dateFrom : string = ""
    dateTo : string = ""
    payout :string = ""
    filingLockDate :Date=  new Date()
    filingLockStatus : boolean = false
    approvalLockDate = ""
    approvalLockStatus : boolean = false
    year : number = 0
}
