import { Validators } from "@angular/forms"

// export class LeaveBalance {
//     leaveCategoryId : number = 0
// }


export class LeaveBalanceRequest{

    employeeId : number = 0
    leaveTypeId : number = null
    type : number = 0
    amount : number = 0
    available : number = 0
    remarks : string = ""

}

export class LeaveCalculationParameter {

// Start
employeeStatusId : number = 0
leaveStartId : number = 0

// Leave Start
leaveStartBasedOnFrequency : number = 0
leaveStartFrequencyId : number = 0
leaveStartAfterId : number = 0

probationaryDate : Date
regularizationDate : Date
hiredDate : Date

// Accrual
totalLeaves : number = 0
accrualStartId : number = 0
accrualStartBasedOnFrequency : number = 0
accrualStartFrequency : number = 0
accrualStartAfter : number = 0

accrualFrequency : number = 0
accrualFrequencyDay : number = 0
accrualFrequencyMonth : number = 0

// Increase Accrual
increaseAccrual : any[] = []

balanceAdd : number = 0
balanceDeduct : number = 0

// Custom
dateOfViewing : Date

}
