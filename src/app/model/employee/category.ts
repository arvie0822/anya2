import { Validators } from "@angular/forms"

export class CategoryEmployee   {

    categoryId                          : number = 0
    categoryCode                        : string = ""
    categoryName                        = ['', [Validators.required]]
    categoryDescription                 = ['', [Validators.required]]
    active                              : boolean = true
    timeKeepingId                       : number = 0
    payrollId                           : number = 0
    accessLevelId                       : number = 0
    holidayBasedId                      : number = 0
    requirementId : number = 0
    hmoId                               : number = 0
    enableMobile                        : boolean = false
    enableGeofence                      : boolean = false
    enableOfflineLog                    : boolean = false
    enableDashboard                     : boolean = false
    enableFiling                        : boolean = false
    enablePayslip                       : boolean = false
    enableApproval                      : boolean = false
    enableChangeSchedule                : boolean = false
    changeScheduleApprovalLevelId       : number = 0
    changeScheduleBefore                : number = 0
    changeScheduleAfter                 : number = 0
    changeScheduleLateCancellation      : number = 0
    changeScheduleLateFilling           : number = 0
    changeScheduleRequired              : number = 0 //
    enableChangeLog                     : Boolean = false
    changeLogApprovalLevelId            : number = 0
    changeLogBefore                     : number = 0
    changeLogAfter                      : number = 0
    changeLogLateCancellation           : number = 0
    changeLogLateFilling                : number = 0
    changeLogRequired                   : number = 0 //
    enableOfficialBusiness              : Boolean = false
    officialBusinessApprovalLevelId     : number = 0
    officialBusinessBefore              : number = 0
    officialBusinessAfter               : number = 0
    officialBusinessLateCancellation    : number = 0
    officialBusinessLateFilling         : number = 0
    officialBusinessRequired            : number = 0 //
    enableOvertime                      : Boolean = false
    overtimeApprovalLevelId             : number = 0
    overtimeBefore                      : number = 0
    overtimeAfter                       : number = 0
    overtimeLateCancellation            : number = 0
    overtimeLateFilling                 : number = 0
    overtimeRequired                    : number = 0 //
    enableOffset                        : Boolean = false
    offsetApprovalLevelId               : number = 0
    offsetBefore                        : number = 0
    offsetAfter                         : number = 0
    offsetLateCancellation              : number = 0
    offsetLateFilling                   : number = 0
    offsetRequired                      : number = 0 //
    enableCOE                           : Boolean = false
    coeApprovalLevelId                  : number = 0
    coeBefore                           : number = 0
    coeAfter                            : number = 0
    coeLateCancellation                 : number = 0
    coeLateFilling                      : number = 0
    coeRequired                         : number = 0 //
    locationLateFilling                 : number = 0
    enableLocation                      : Boolean = false
    locationApprovalLevelId             : number = 0
    locationBefore                      : number = 0
    locationAfter                       : number = 0
    locationLateCancellation            : number = 0
    locationRequired                    : number = 0 //
    overtimeTypeId                      : number = 0
    enablePreShift                      = [false, [Validators.required]]
    multiplePreShift                    : boolean = false
    preShiftMinimumDays                 : number = 0
    preShiftMaximumDays                 : number = 0
    preShiftStepDays                    : number = 0
    preShiftExpirationBasis             : number = 0
    preShiftNumberOfDaysExpiration      : number = 0
    enablePostShift                     = [false, [Validators.required]]
    multiplePostShift                   : boolean = false
    postShiftMinimumDays                : number = 0
    postShiftMaximumDays                : number = 0
    postShiftStepDays                   : number = 0
    postShiftExpirationBasis            : number = 0
    postShiftNumberOfDaysExpiration     : number = 0
    enableRDHoliday                     = [false, [Validators.required]]
    multipleRDHoliday                   : boolean = false
    rdHolidayMinimumDays                : number = 0
    rdHolidayMaximumDays                : number = 0
    rdHolidayStepDays                   : number = 0
    rdHolidayRDHolidayExpirationBasis   : number = 0
    rdHolidayNumberOfDaysExpiration     : number = 0
    createdBy                           : number = 0
    dateCreated                         : string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    categoryBundyType                   : any = []
    categoryEmployeeLeave               : CategoryEmployeeLeave [] = []
    categoryApproval                    : any = []
    usetiful                            : number = 0
    regularization                      : number = null

    preOtSetup : number = 0
    preShiftDelayStartMinutes  : number = 0
    preShiftSpecificStartMinutes   : any = []

    postOtSetup : number = 0
    postShiftDelayStartMinutes  : number = 0
    postShiftSpecificStartMinutes  : any = []

    rdOtSetup : number = 0
    rdHolidayDelayStartMinutes  : number = 0
    rdHolidaySpecificStartMinutes  : any = []

}

export class CategoryEmployeeLeave
{

    enableLeave                         : boolean = false
    categoryId                          : number = 0
    dropdownId                          : number = 0
    leaveApprovalLevelId                : number = 0
    categoryLeaveBefore                 : number = 0
    categoryLeaveAfter                  : number = 0
    leaveLateFilling                    : number = 0
    leaveLateCancellation               : number = 0
    leaveRequired                       : number = 0
}




    // allowOvertime: boolean = null
    // overtimeTypeId: number = 0
    // categoryAllowedOvertime = []
    // overtimeMin: number = 0
    // overtimeMax: number = 0
    // overtimeStep: number = 0
    // offsetOvertimeExpiration: number = 0
    // offsetReferenceId: number = 0
    // isWeb: boolean = null
    // isMobile: boolean = null
    // leaveTypeId: number = 0
    // bundyId: number = 0
    // categoryEmployeeLeave = []
    // categoryAllowedBundy = []
    // createdBy: number = 0
    // dateCreated = new Date()
    // active: boolean = null

    // categorystatus : boolean = null





    // ==========sample control name filing=================

    // logsapprovalprocess : string = null
    // Changelogbefore : Boolean = null
    // Changelogafter : Boolean = null


    // offiapprovalprocess :string = null
    // OfficialBusinessbefore : Boolean = null
    // OfficialBusinessafter : Boolean = null

    // otapprovalprocess : string = null

    // offapproval : string = null




    // ==========sample control name Leave=================

    // EnableVacationLeave : boolean = null
    // vacapproval : string = null
    // vacbefore : string = null
    // vacafter : string = null

    // EnableSickLeave : boolean = null
    // sickapproval : string = null
    // sickbefore : string = null
    // sickafter : string = null

    // EnableEmergencyLeave : boolean = null
    // emergapproval : string = null
    // emergbefore : string = null
    // emergafter : string = null

    // EnableMaternityLeave : boolean = null
    // materapproval : string = null
    // materbefore : string = null
    // materafter : string = null

    // EnableSoloParent : boolean = null
    // soloapproval : string = null
    // solobefore : string = null
    // soloafter : string = null

    // ==========sample control name Overtime=================

//     EnableOvertimePolicy : string = null

//     // ==========sample control name Overtime=================

//     // ==========Rd/MultipleFiling============================
//     RdMultipleFiling : boolean =  null
//     rdmin = ['', [
//         Validators.required
//     ]]
//     rdmax : string = null
//     rdstep : string = null
//     rdexpi : string = null
//     Rdoffsetexpi : string = null

//     // =========postshift=====================================
//     postmultiplefiling : boolean = null
//     postmin = ['', [
//         Validators.required
//     ]]
//     postmax : string = null
//     poststep : string = null
//     postexpi : string = null
//     Postoffsetexpi : string = null

//     // =========preshift=====================================

//     premultiplefiling : boolean = null
//     premin = ['', [
//         Validators.required
//     ]]
//     premax : string = null
//     prestep : string = null
//     preexpi : string = null
//     Pretoffsetexpi : string = null
// }

// export class CategoryAllowedOvertime {
//     CategoryAllowedOvertimeId: number = 0
//     categoryId: number = 0
//     dropdownIds: number = 0
// }

// export class CategoryEmployeeLeave {
//     categoryEmployeeLeaveId: number = 0
//     categoryId: number = 0
//     leaveTypeId: number = 0
// }

// class CategoryAllowedBundy
// {
//     categoryAllowedBundyId: number = 0
//     categoryId: number = 0
//     dropdownId: number = 0
// }


