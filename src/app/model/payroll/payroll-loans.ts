import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"
var pipe = new DatePipe('en-US');

export class PayrollLoans {

    id : number = 0
    loanTypeID = [null, [Validators.required]]
    employeeId  = [null, [Validators.required]]
    empId: number = 0
    amortizationAmount : number = 0
    totalPayments : number = 0
    totalLoans : number = 0
    tenure : number = 0 //new
    loanNumber : string = "" //new
    withInterest : number = 0
    principalAmount : number = 0
    loanDate  : string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    // isOneTime : boolean = false
    payrollTypeId = [null, [ Validators.required ]]
    cutoffId = [null, [ Validators.required ]]
    frequency : string  = ""
    recurStartDate = [new Date().toISOString().substring(0,new Date().toISOString().length-1), [ Validators.required ]]
    recurEndDate = [new Date().toISOString(), [ Validators.required ]]
    promissoryNoteNum : string = ""
    remarks : string = ""
    payoutType : string = ""
    filename : string = ""
    closedBy : number = 0
    createdBy : number = 0
    dateCreated : string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    active : boolean = false
    loanStatus = [null, [ Validators.required ]]
    dateClosed  = [new Date().toISOString().substring(0, new Date().toISOString().length - 1), Validators.required]
    isHoldFrom = [new Date().toISOString().substring(0, new Date().toISOString().length - 1), Validators.required]
    isHoldTo =  [new Date().toISOString().substring(0, new Date().toISOString().length - 1), Validators.required]

}


