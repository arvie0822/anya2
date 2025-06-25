import { Validators } from "@angular/forms"

export class LeaveType {

    id                           : number = 0
    code                         : string = ""
    name                         : string = ""
    description                  : string = ""
    maxLeaves                    : number = 0
    leaveCategoryId              : number = 0
    allowFilingIfZero            : number = 0
    willDeductOnAccrual          : Boolean = false
    allowFilingLWOP              : boolean = false
    leaveGenderId                : number = 0
    requiredAttachment           : boolean = false
    filedById                    : number  = 0
    filingTypeId                 : any = []
    leaveStartId                 : number = 0
    leaveStartBasedOnFrequency   : number = 0
    leaveStartFrequencyId        : number = 0
    leaveStartAfterId            : number = 0
    dateCreated                  : string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    createdBy                    : number = 0
    active                       : boolean = true
    settings                     : LeaveTypeSettings = new LeaveTypeSettings
    maxLeavesReflect             : number = 0

}

export class LeaveTypeSettings {
    // accrual ===========================
    accrualStartId                 : number = 0
    accrualStartBasedOnFrequency   : number = 0
    accrualStartFrequencyId        : number = 0
    accrualStartAfterId            : number = 0
    leaveCount                     : number = 0
    frequencyId                    : number = 0
    day                            : number = 0
    month                          : number = 0

    // Increase Accrual ===================
    isIncreaseAccrual    : boolean = false
    detailAccrual        : LeaveIncreaseAccrual[] = [new LeaveIncreaseAccrual]

    // Prorate ============================
    isProrate            : boolean = false
    detailProrate        : LeaveProrate[] = [new LeaveProrate]

    // Carry Forward =========================
    isCarryForward       : boolean = false
    detailCarryForward   : LeaveCarryForwardSettings[] = [new LeaveCarryForwardSettings]

    isConvertToCash : boolean = false
    detailConvertToCash : LeaveConvertToCashSettings[] = [new LeaveConvertToCashSettings]




}


export class LeaveCarryForwardSettings {
    carryMaxLeave        : number = 0
    carryStartDay        : number = 0
    carryStartMonthId    : number = 0
    isCarryExpirable     : boolean = false
    carryExpireDay       : number = 0
    carryExpireMonthId   : number = 0
}

export class LeaveIncreaseAccrual {

    id                       : number = 0
    leaveTypeSettingsId      : number = 0
    accruedLeave             : number = 0
    frequencyId              : number = 0
    frequencyDays            : number = 0
    frequncyMonthId          : number = 0
    after                    : number = 0
    tenureId                 : number = 0
    accrualEmployeeStatusId  : number = 0
    active                   : boolean = true


}

export class LeaveProrate {

    id                      : number = 0
    leaveTypeSettingsId     : number = 0
    from                    : number = 0
    to                      : number = 0
    prorateLeave            : number = 0
    active                  : boolean = true

}

    // Leave Entitlement=================

export class LeaveEntitlement {

    id                : number = 0
    leaveTypeId       : number = 0
    employeeId        : number = 0
    year              : number = 0
    dateCreated       : string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    createdBy         : number  = null

}

    // Leave Balance=================
export class LeaveBalance {

    leaveBalanceId    : number = 0
    employeeId        : number = 0
    year              : number = 0
    leaveTypeId       : number = 0
    balanceType       : number = 0
    amount            : number = 0
    createdBy         : number = 0
    dateCreated       : string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    remarks           : string = null

}

export class LeaveConvertToCashSettings{

    // convertCash: number = 0
    // annualConvertion: number = 0
    // maxNumAnnualLeave: number = 0
    // nonTaxable: number = 0
    // uponResignation: number = 0
    // maxNumAnnualLeaveR: number = 0
    // nonTaxableR: number = 0

    annualConversionType : number  = 0
    annualConversionCount : number  = 0
    annualConversionNonTaxable : number  = 0
    uponResignationType : number  = 0
    uponResignationCount : number  = 0
    uponResignationNonTaxable : number  = 0
}
