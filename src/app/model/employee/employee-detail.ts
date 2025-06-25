import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"


var pipe = new DatePipe('en-US');

export class Employee {


    effectiveDate              : string = null
    imagePath                  : string = "";

    idSalutation               : number = 0
    firstName                  = ["", [Validators.required]]
    middleName                 : string = ""
    lastName                   = ["", [Validators.required]]
    idSuffix                   : number = 0
    nickName                   : string = ""
    displayName                = ["", [Validators.required]]
    genderId                   = [0, [Validators.required]]
    idCivilStatus              = [0, [Validators.required]]
    idNationality              = [0, [Validators.required]]
    idBloodType                : number = 0
    idReligion                 : number = 0
    birthDate                  = [pipe.transform(new Date,"yyyy-MM-dd"), [Validators.required]]
    birthPlace                 = "" //["", [Validators.required]]
    weight                     : number = 0
    height                     : number = 0

    personalEmailAddress       = ["", [Validators.email]]
    companyEmailAddress        = ["", [Validators.email]]
    officeNumber               : string = ""
    mobile                     = ["", [Validators.required]]
    phone                      : string = ""
    alternateMobile            : string = ""

    employeeId                 : number = 0
    employeeCode               = ["", [Validators.required]]
    ntLogin                    : string = ""
    userName                   = ["", [Validators.required]]
    userHash                   : string = ""

    idEmergencyRelation        : number = 0 //= [0, [Validators.required]] //DropdownFix: Mother=30075,Father=30076,Spouse=30077,Sibling=30078,Child=30079
    emergencyFirstName         : string = "" //["", [Validators.required]]
    emergencyMiddleName        : string = ""
    emergencyLastName          : string = "" //["", [Validators.required]]
    emergencyMobileNumber      : string = "" //["", [Validators.required]]
    emergencyEmail             = ["", [Validators.email]]

    preCountry                 = [0, [Validators.required]]
    preZipCode                 : string = ""
    preRegion                  = 0
    preProvince                = 0
    preCity                    = 0
    preBarangay                : string = ""
    preUnitFloor               : string = ""
    preBuilding                : string = ""
    preStreet                  : string = ""

    perCountry                 = [0, [Validators.required]]
    perZipCode                 : string = ""
    perRegion                  = 0
    perProvince                = 0
    perCity                    = 0
    perBarangay                : string = ""
    perUnitFloor               : string = ""
    perBuilding                : string = ""
    perStreet                  : string = ""

    loginCount                 : number = 0
    lockAccount                : boolean = false
    emailVerified              : boolean = true
    createdBy                  : number = 0
    // dateCreated                = pipe.transform(new Date,"MM--yyyy")
    active                     : boolean = true
    isAdmin                    : boolean = false
    isPwChanged                : boolean = false
    deviceToken                : string = ""


    // employeeEmergency          = []
    // employeeGeneratedCode      : EmployeeGeneratedCode [] = []
    employeeOther              : EmployeeOther[] = [new EmployeeOther]
    employeeDependents         : EmployeeDependents[] = []

    // Relation
    employeeInformation          : EmployeeInformation             = new EmployeeInformation
    employeeIndividualSettings   : EmployeeIndividualSettings      = new EmployeeIndividualSettings
    employeeAdmin                : EmployeeAdmin                   = new EmployeeAdmin
    employeeMovement             : EmployeeMovement []             = [new EmployeeMovement]
    timekeepingCategoryException : timekeepingCategoryException    = new timekeepingCategoryException
    payrollCategoryException     : payrollCategoryException        = new payrollCategoryException
    payrollEmployeeCategory      : EmployeeIndividualSettings      = new EmployeeIndividualSettings
}

export class Unsaved {
    dateFrom                   : string = ""
    dateTo                     : string = ""
    exceptionCateg             : number = 0
    exceptionPayCateg          : number = 0
    categoryDropdown           : number = 0
    idTimekeepingexception     : number = 0
    idPayrollexception         : number = 0
}

export class EmployeeOther {


    id                             : number = 0
    employeeCode1                  : string = ""
    employeeCode2                  : string = ""
    idEmployeeType                 : number = 0
    idBusinessHead                 : number = 0
    idManagingExecutive            : number = 0
    alternateBankId                : number = 0
    alternateBankAccount           : string = ""
    alternateBankAccountTypeId     : number = 0
    idRegionalCode                 : number = 0
    idFunction                     : number = 0
    idFace                         : string = ""
    bonusRate                      : number = 0
    pensionRate                    : number = 0
}

// export class EmployeeGeneratedCode {

//     Id                       : number = 0
//     employeeId               : number = 0
//     generatedCode            : string = ""
//     dateCreated              = pipe.transform(new Date,"MM--yyyy")
// }

export class EmployeeInformation {

    id                     : number = 0
    idBio                  : string = ""
    idERP                  : string = ""
    idSupervisor           : number = 0
    idCategory             = [null, [Validators.required]]
    idAccessControl        = [null, [Validators.required]]
    idSubCompany           = [null, [Validators.required]]
    idBranch               = [null, [Validators.required]]
    idBusinessUnit         : number = 0
    idPeza                 : number = 0
    idDepartment           = [0, [Validators.required]]
    idEmployeeLevel        : number = 0
    idOccupation           = [0, [Validators.required]]
    idEmployeeStatus       = [0, [Validators.required]]
    idCostCenter           : number = 0
    idDivision             : number = 0
    dateHired              = [pipe.transform(new Date,"yyyy-MM-dd"), [Validators.required]]
    dateContractValidity   = pipe.transform(new Date,"yyyy-MM-dd")
    dateProbationary       = [pipe.transform(new Date,"yyyy-MM-dd"), [Validators.required]]
    dateRegularized        = [pipe.transform(new Date,"yyyy-MM-dd"), [Validators.required]]
    dateSeparated          = null// pipe.transform(new Date,"yyyy-MM-dd")
    dateEffective          = null// pipe.transform(new Date,"yyyy-MM-dd")
    dateAccessUntil        = null// pipe.transform(new Date,"yyyy-MM-dd")
    dateFinalPayRelease          = null// pipe.transform(new Date,"yyyy-MM-dd")
    idTimekeeping          = [0, [Validators.required]]
    idPayroll              = [null, [Validators.required]]
    idConfidentiality      : number = 0
    rateMonthly            : number = 0
    rateSemiMonthly        : number = 0
    rateDaily              : number = 0
    rateHourly             : number = 0
    rateAnnual             : number = 0
    idBank                 : number = 0
    bankAccountTypeId      : number = 0
    bankAccount            : string = ""
    sss                    : string = ""
    philhealth             : string = ""
    pagibig                : string = ""
    tin                    : string = ""
    idPayType              : number = 31166 //31166
}

export class EmployeeIndividualSettings {

    individualSettingId      : number = 0
    employeeId               : number = 0
    dateCreated              = pipe.transform(new Date,"yyyy-MM-dd")
    companySettingId         : number = 0
    payrollCutoffHeaderId    : number = 0
    sssSetting               : number = 0
    phicSetting              : number = 0
    hdmfSetting              : number = 0
    taxSetting               : number = 0
    factorRate               : number = 0
    dailyRateSetting         : number = 0
    hourlyRateSetting        : number = 0
    hoursInDay               : number = 0
    mwe                      : boolean = false
    retroactiveSalaryAdj     : boolean = false
    wageTypeSetting          : number = 0
    idRatetype               : number = 0
    reportSetting            : number = 0
    regBasic                 : number = 0
    finalBasic               : number = 0
    finalAllow               : number = 0
    finalLoan                : number = 0
    finalDed                 : number = 0
    specDed                  : number = 0
    specBasic                : number = 0
    specAllow                : number = 0
    specLoan                 : number = 0
    _13thMonth               : number = 0
    _14thMonth               : number = 0
    _15thMonth               : number = 0
    _16thMonth               : number = 0
    sssMaternity             : number = 0
    netPay                   : number = 0
    active                   : boolean = false
}

export class EmployeeMovement {
    // movementId               : number = 0
    movementType             : number = 0
    description              : string = ""
    // createdBy                : number = 0
    // dateCreated              = pipe.transform(new Date,"MM--yyyy")
    // employee                 : any = {}
}

export class EmployeeDependents {

    firstName                : string = ""
    middleName               : string = ""
    lastName                 : string = ""
    birthDate                = pipe.transform (new Date,"yyyy-MM-dd")
    idRelationship           : number = 0
    age                      : number = 0

}

export class EmployeeAdmin {

    id                        : number = 0
    employeeId                : number = 0
    idBand                    : number = 0
    idBandLevel               : number = 0
    idBudgetClassification    : number = 0
    currencyContract          : number = 0
    currencyPayroll           : number = 0
    incentiveCurrency         : number = 0
    idHMO                     : number = 0
    employeeHoldPayroll       : EmployeeHoldPayroll[] = []
}

// Timekeeping Category

export class timekeepingCategoryException {

    // absentFrom                   : number = 0
    // absentTo                     : number = 0
    // active                       : boolean = true
    // breakTypeId                  : number = 0
    // chBased                      : number = 0 // dropdown type 113
    // chNoShift                    : number = 0 // dropdown type 112
    // chPrio                       : boolean = false
    // chRule                       : number = 0 // dropdown type 114
    // chShift                      : number = 0 // dropdown type 112
    // createdBy                    : number = 0
    // cSuite                       : cSuite = null
    // dateCreated                  : string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    // description                  : string = ""
    // employeeId                   : number = 0
    // fullFlexi                    : fullFlexi = null
    // halfDay                      : halfDay = null
    // hasHalfday                   : boolean = false
    // hasNightDiff                 : boolean = false
    // hasRangeAbsent               : boolean = false
    // name                         : string = ""
    // nightDiffBracket             : Bracket[] = null
    // nightDiffIn                  : string = pipe.transform(new Date,"HH:mm:ss")
    // nightDiffIncrement           : Increment = null
    // nightDiffMax                 : number = 0
    // nightDiffMin                 : number = 0
    // nightDiffOut                 : string = pipe.transform(new Date,"HH:mm:ss")
    // nightDiffRoundingId          : number = 0 // dropdown type 111
    // partialFlexi                 : partialFlexi = null
    // placeHolderOut               : number = 0 //hours after sched out
    // placeHolderIn                : number = 0 //hours before sched in
    // placeholderOverlap           : number = 0 //rule when rules overlap
    // rdotBreakTypeId              : number = 0
    // rdotTypeId                   : number = 0 // dropdown type 112
    // regularOTTypeId              : number = 0 // dropdown type 112
    // regularOTBreakTypeId         : number = 0
    // rhBased                      : number = 0 // dropdown type 113
    // rhRule                       : number = 0 // dropdown type 114
    // rhShift                      : number = 0 // dropdown type 112
    // rhNoShift                    : number = 0 // dropdown type 112
    // rhPrio                       : boolean = false
    // scheduleTypeId               : number = 0// dropdown type 108
    // shPrio                       : boolean = false
    // snhBased                     : number = 0 // dropdown type 113
    // snhRule                      : number = 0 // dropdown type 114
    // snhShift                     : number = 0 // dropdown type 112
    // snhNoShift                   : number = 0 // dropdown type 112
    // swhBased                     : number = 0 // dropdown type 113
    // swhRule                      : number = 0 // dropdown type 114
    // swhShift                     : number = 0 // dropdown type 112
    // swhNoShift                   : number = 0 // dropdown type 112
    // swhPrio                      : boolean = false
    // tardySetupId                 : number = 0 // dropdown type 110
    // tardySetup                   : tardySetup = null
    // timekeepingCategoryCode      : string = ""
    // wrdotTypeId                  : number = 0 // dropdown type 112
    // wrdotBreakTypeId             : number = 0
    // timekeepingCategoryId        : number = 0

    // // tkCat                        : number = 0
    // // // pre-approve-overtime
    // // preapproveot                 : number = 0
    // // preapproveottypeid           : number = 0
    timekeepingCategoryId: number = 0
    timekeepingCategoryCode: string = ""
    name: string = ""
    description: string = ""
    scheduleTypeId: number = 0// dropdown type 108
    cSuite: cSuite = null
    fullFlexi: fullFlexi = null
    partialFlexi: partialFlexi = null
    breakTypeId: number = 0
    hasHalfday: boolean = false
    assumelogs : boolean = false
    halfDay: halfDay = null
    hasRangeAbsent: boolean = false
    absentFrom: number = 0
    absentTo: number = 0
    tardySetupId: number = 0 // dropdown type 110
    tardySetup: tardySetup = null
    hasNightDiff: boolean = false
    nightDiffIn: string = pipe.transform(new Date,"HH:mm:ss")
    nightDiffOut: string = pipe.transform(new Date,"HH:mm:ss")
    nightDiffMin: number = 0
    nightDiffMax: number = 0
    nightDiffRoundingId: number = 0 // dropdown type 111
    nightDiffBracket: Bracket[] = null
    nightDiffIncrement: Increment = null
    regularOTTypeId: number = 0 // dropdown type 112
    regularOTBreakTypeId: number = 0
    rdotTypeId: number = 0 // dropdown type 112
    rdotBreakTypeId: number = 0
    wrdotTypeId: number = 0 // dropdown type 112
    wrdotBreakTypeId: number = 0
    tkCat: number = 0

    // pre-approve-overtime

    preapproveot : number = 0
    preapproveottypeid : number = 0

    rhBased: number = 0 // dropdown type 113
    rhRule: number = 0 // dropdown type 114
    rhShift: number = 0 // dropdown type 112
    rhNoShift: number = 0 // dropdown type 112
    rhPrio: boolean = false
    snhBased: number = 0 // dropdown type 113
    snhRule: number = 0 // dropdown type 114
    snhShift: number = 0 // dropdown type 112
    snhNoShift: number = 0 // dropdown type 112
    snhPrio: boolean = false
    swhBased: number = 0 // dropdown type 113
    swhRule: number = 0 // dropdown type 114
    swhShift: number = 0 // dropdown type 112
    swhNoShift: number = 0 // dropdown type 112
    swhPrio: boolean = false
    chBased: number = 0 // dropdown type 113
    chRule: number = 0 // dropdown type 114
    chShift: number = 0 // dropdown type 112
    chNoShift: number = 0 // dropdown type 112
    chPrio: boolean = false
    createdBy: number = 0
    dateCreated: string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    active: boolean = true
    placeHolderOut: number = 0 //hours after sched out
    placeHolderIn: number = 0 //hours before sched in
    placeholderOverlap: number = 0 //rule when rules overlap
}

export class cSuite
{
    monday: number = 0
    tuesday: number = 0
    wednesday: number = 0
    thursday: number = 0
    friday: number = 0
    saturday: number = 0
    sunday: number = 0
}

export class fullFlexi
{
    mondayHrs: number = 0
    tuesdayHrs: number = 0
    wednesdayHrs: number = 0
    thursdayHrs: number = 0
    fridayHrs: number = 0
    saturdayHrs: number = 0
    sundayHrs: number = 0

    mondayMins: number = 0
    tuesdayMins: number = 0
    wednesdayMins: number = 0
    thursdayMins: number = 0
    fridayMins: number = 0
    saturdayMins: number = 0
    sundayMins: number = 0

    mondayDeductBreak: boolean = false
    tuesdayDeductBreak: boolean = false
    wednesdayDeductBreak: boolean = false
    thursdayDeductBreak: boolean = false
    fridayDeductBreak: boolean = false
    saturdayDeductBreak: boolean = false
    sundayDeductBreak: boolean = false

    mondayBreakTypeId: number = 0
    tuesdayBreakTypeId: number = 0
    wednesdayBreakTypeId: number = 0
    thursdayBreakTypeId: number = 0
    fridayBreakTypeId: number = 0
    saturdayBreakTypeId: number = 0
    sundayBreakTypeId: number = 0
}

export class partialFlexi
{
    clockIn: number = 0
    hours: number = 0
    breakTypeId: number = 0
}

export class halfDay
{
    halfDaySetupId: number = 0 // dropdown type 109
    start: number = 0
    end: number = 0
}

export class tardySetup
{
    tardyGrateMins: number = 0
    tardyMins: number = 0
    tardyRoundingId: number = 11 // dropdown type 111
    tardyBracket: Bracket[] = null
    tardyIncrement: Increment = null
    undertimeGrateMins: number = 0
    undertimeMins: number = 0
    undertimeRoundingId: number = 0 // dropdown type 111
    undertimeBracket: Bracket[] = null
    undertimeIncrement: Increment = null
    sum: Increment = null
    sumDisplayOn: number = 0 // dropdown type 110
}

export class Bracket
{
    from: number = 0
    to: number = 0
    deduct: number = 0
}

export class Increment
{
    roundId: number = 0 // dropdown type = 71
    mins: number = 0
}

export class payrollCategoryException
{
    id                  : number = 	0
    code                : string = 	""
    name                : string = 	""
    description         : string = 	""
    payrollCutoff       : boolean = false
    factorRate          : number = 	0.00
    dailyRate           : number = 	0
    hourlyRate          : number = 	0
    hoursInADay         : number = 	0.00
    wageType            : number = 	0
    mwe                 : number = 	0
    retroactiveSalaryAdj: boolean = false
    premiumRateType     : number = 	0
    fixedDeductions     : number[] = []
    fixedEarnings       : number[] = []
    sss                 : number = 	0
    hdmf                : number = 	0
    phic                : number = 	0
    tax                 : number = 	0
    deductionHierarchy  : number = 	0
    reportSetting       : number = 	0
    sssMaternity        : number = 	0
    _13thMonthPay       : number = 	0
    _14thMonthPay       : number = 	0
    _15thMonthPay       : number = 	0
    _16thMonthPay       : number = 	0
    dateCreated         : string = new Date().toISOString().substring(new Date().toISOString().length - 1,0)
    active              : boolean = true
    createdBy           : number = 	0
}


export class EmployeeHoldPayroll {
    adddatefrom               : string  = ""
    rangeId                   : number  = 0
    payrollCutoffLockingId    : number  = 0
    dateFrom                  : string  = ""
    dateTo                    : string  = ""
    payout                    : string  = ""
    createdById               : number  = 0
    createdByName             : string  = ""
    dateCreated               = pipe.transform (new Date,"yyyy-MM-ddTHH:mm:ss")
    adddateto                 : string  = ""
    onHoldReason              : any[] = []


}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Employee========

    // ImagePath
    // IdSalutation
    // FirstName
    // MiddleName
    // LastName
    // IdSuffix
    // NickName
    // DisplayName
    // GenderId
    // IdCivilStatus
    // IdNationality
    // IdBloodType
    // IdReligion
    // BirthDate
    // BirthPlace
    // Weight
    // Height

    // PersonalEmailAddress
    // CompanyEmailAddress
    // OfficeNumber
    // Mobile
    // Phone
    // AlternateMobile

    // EmployeeId
    // EmployeeCode
    // NtLogin
    // UserName
    // UserHash

    // IdEmergencyRelation//DropdownFix: Mother=30075,Father=30076,Spouse=30077,Sibling=30078,Child=30079
    // EmergencyFirstName
    // EmergencyMiddleName
    // EmergencyLastName
    // EmergencyMobileNumber
    // EmergencyEmail

    // PreCountry
    // PreZipCode
    // PreRegion
    // PreProvince
    // PreCity
    // PreBarangay
    // PreUnitFloor
    // PreBuilding
    // PreStreet

    // PerCountry
    // PerZipCode
    // PerRegion
    // PerProvince
    // PerCity
    // PerBarangay
    // PerUnitFloor
    // PerBuilding
    // PerStreet

    // LoginCount
    // LockAccount
    // EmailVerified
    // CreatedBy
    // DateCreated
    // Active
    // IsAdmin
    // IsPwChanged
    // DeviceToken

// EmployeeOther========

        // EmployeeCode1
        // EmployeeCode2
        // NtLogin
        // IdBusinessHead
        // IdManagingExecutive
        // AlternateMobile
        // AlternateBankId
        // AlternateBankAccount
        // AlternateBankAccountTypeId
        // IdBudgetClassification
        // IdRegionalCode
        // IdFunction
        // IdFace
        // BonusRate
        // PensionRate

// EmployeeDependents=======
        // FirstName
        // MiddleName
        // LastName
        // BirthDate
        // Relationship


// EmployeeInformation =========

        // InformationId
        // EmployeeId
        // Employee Employee
        // IdSupervisor
        // string IdBio
        // IdEmployeeStatus
        // IdEmployeeLevel
        // IdAccess
        // IdOccupation
        // IdBranch
        // IdDepartment
        // IdDivision
        // IdUnit
        // IdBand
        // IdType
        // IdCostCenter
        // IdSubCompany
        // IdCategory
        // IdShift
        // IdTimekeeping
        // IdConfidentiality
        // IdBank
        // string BankAccount
        // BankAccountTypeId
        // DateHired
        // DateProduction
        // DateContractValidity
        // DateSeparated
        // DateRegularized
        // ProbationaryDate
        // RateMonthly
        // RateSemiMonthly
        // RateDaily
        // RateHourly
        // RateAnnual
        // RateFactor
        // Sss
        // Philhealth
        // Tin
        // Pagibig
        // TkCategoryId
        // PayrollCategoryId

// EmployeeIndividualSettings======
        // IndividualSettingId
        // EmployeeId
        // Employee Employee
        // CompanySettingId
        // PayrollCutoffHeaderId
        // SSSSetting
        // PHICSetting
        // HDMFSetting
        // TaxSetting
        // FactorRate
        // DailyRateSetting
        // HourlyRateSetting
        // HoursInDay
        // Mwe
        // WageTypeSetting
        // IdRatetype
        // ReportSetting
        // RegBasic
        // FinalBasic
        // FinalAllow
        // FinalLoan
        // FinalDed
        // SpecDed
        // SpecBasic
        // SpecAllow
        // SpecLoan
        // _13thMonth
        // _14thMonth
        // _15thMonth
        // _16thMonth
        // SSSMaternity
        // NetPay
        // CreatedBy
        // DateTime DateCreated
        // Active

// EmployeeMovement=======
        // MovementId
        // EmployeeId
        // Employee Employee
        // MovementType
        // string Description
        // CreatedBy
        // DateCreated



