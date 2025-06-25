import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"
var pipe = new DatePipe('en-US');
export class PayrollHeader {
    // id                  : number = 0
    // name                = ['', [Validators.required]]
    // description         = ['', [Validators.required]]
    // status              : string = ''
    // payrollCutoff       : number = 0
    // dailyRate           = [null, [Validators.required]]
    // factorRate          = [null, [Validators.required]]
    // hourlyRate          = [null, [Validators.required]]
    // dayHours            = [null, [Validators.required]]
    // wageType            : number = 0
    // mwe                 : number = 0
    // premiumRate         : number = 0
    // fixedDeductions     : number = 0
    // fixedEarnings       : number = 0
    // sss                 : number = 0
    // hdmf                : number = 0
    // phic                : number = 0
    // tax                 : number = 0
    // deductionHierarchy  : number = 0
    // finalPay            : number = 0
    // specialPay          : number = 0
    // sssMaternity        : number = 0
    // _13th_monthPay      : number = 0
    // _14th_16th_monthPay : number = 0

    id                  : number = 	0
    code                : string = 	""
    name                : string = 	""
    description         : string = 	""
    payrollCutoff       : number = 0
    factorRate          : number = 	0.00
    inDailyEarnings     : number = null
    dailyRate           : number = 	0
    hourlyRate          : number = 	0
    hoursInADay         : number = 	0.00
    wageType            : number = 	0
    mwe                 : number = 	0
    retroactiveSalaryAdj: boolean = false
    premiumRateType     : number = 	0
    fixedDeductions     : number = null
    fixedEarnings       : number = null
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
    dateCreated         : string = new Date().toISOString().substring(new Date().toISOString().length - 1,0) // old code
    // dateCreated         : string = pipe.transform(new Date(),"yyyy-MM-dd HH:mm:ss")
    active              : boolean = true
    newHireRegDays      : boolean = false
    createdBy           : number = 	0
    exitingRegDays      : boolean = false
    proratedMaternity    : boolean = false
 }

