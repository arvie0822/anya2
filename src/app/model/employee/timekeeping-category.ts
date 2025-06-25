import { Validators } from "@angular/forms"
import { DatePipe } from '@angular/common';

var pipe = new DatePipe('en-US');

//employeeCode = [null, [Validators.required]]

class TimekeepingCategoryForm
{
    timekeepingCategoryId: number = 0
    timekeepingCategoryCode: string = ""
    name = ['', [Validators.required]]
    description  = ['', [Validators.required]]
    scheduleTypeId = [0, [Validators.required, Validators.min(1)]]// dropdown type 108
    cSuite: CSuite = null
    fullFlexi: FullFlexi = null
    partialFlexi: PartialFlexi = null
    breakTypeId: number = 0
    hasHalfday: boolean = false
    assumelogs : 0
    halfDay: HalfDay = null
    hasRangeAbsent: boolean = false
    absentFrom: number = 0
    absentTo: number = 0
    tardySetupId: number = 0 // dropdown type 110
    tardySetup: TardySetup = null
    hasNightDiff: boolean = false
    nightDiffIn: string = pipe.transform(new Date,"HH:mm:ss ")
    nightDiffOut: string = pipe.transform(new Date,"HH:mm:ss ")
    nightDiffMin: number = 0
    nightDiffMax: number = 0
    nightDiffBased: number = 0
    // regularBreakHours: number = 0
    // preBreakHours: number = 0
    // rdBreakHours: number = 0 // remove from front
    rdMinutesAfterSchedIn: number = 0
    nightDiffRoundingId: number = 0 // dropdown type 111
    nightDiffBracket: Bracket[] = null
    nightDiffIncrement: Increment = null
    regularOTTypeId: number = 0 // dropdown type 112
    regularOTBreakTypeId: number = 0
    rDOTTypeId : number = 0 // dropdown type 112
    rDOTBreakTypeId : number = 0
    wRDOTTypeId : number = 0 // dropdown type 112
    wRDOTBreakTypeId : number = 0
    workBreakHours : number = 0
    tkCat: number = 0
    // thresholdHoursAfterClockIn :  number = 0 // remove from front
    rHBased: number = 0 // dropdown type 113
    rHRule: number = 0 // dropdown type 114
    rHShift: number = 0 // dropdown type 112
    // rhHours : number = 0 // remove from front
    rhHolidayBreak : number = 0
    rhNoShift: number = 0 // dropdown type 112
    rHPrio: boolean = false
    sNHBased: number = 0 // dropdown type 113
    sNHRule: number = 0 // dropdown type 114
    sNHShift: number = 0 // dropdown type 112
    // snHours : number = 0
    snHolidayBreak : number = 0
    snhNoShift: number = 0 // dropdown type 112
    sHPrio: boolean = false
    sWHBased: number = 0 // dropdown type 113
    sWHRule: number = 0 // dropdown type 114
    sWHShift: number = 0 // dropdown type 112
    // swHours : number = 0  // remove from front
    swHolidayBreak : number = 0
    swhNoShift: number = 0 // dropdown type 112shPrio
    sWHPrio: boolean = false
    cHBased: number = 0 // dropdown type 113
    cHRule: number = 0 // dropdown type 114
    cHShift: number = 0 // dropdown type 112
    // chHours : number = 0 // remove from front
    chHolidayBreak : number = 0
    cHNoShift: number = 0 // dropdown type 112
    cHPrio: boolean = false
    createdBy: number = 0
    dateCreated: string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    active: boolean = true
    placeHolderOut = [0, [Validators.required, Validators.min(0)]]; //hours after sched out
    placeHolderIn = [0, [Validators.required, Validators.min(0)]]; //hours before sched in
    placeholderOverlap = [0, [Validators.required, Validators.min(1)]]; //rule when rules overlap
    allowMultipleClockInOut: boolean = false
    // additional column
    assumeClockInOut: number = 0//
    displayOn: number = 0

    preAppOTTypeId: number = 0//
    preAppOTBreakTypeId: number = 0//
    preAppMin: number = 0//
    preAppMax: number = 0//

    regularMin: number = 0//
    regularMax: number = 0//

    rDMin: number = 0//
    rDMax: number = 0//

    wRDMin: number = 0//
    wRDMax: number = 0//

    rHMin: number = 0//
    rHMax: number = 0//

    sNHMin: number = 0//
    sNHMax: number = 0//

    sWHMin: number = 0//
    sWHMax: number = 0//

    cHMin: number = 0//
    cHMax: number = 0//

    wrdBaseOn: number = 0//
    rdBaseOn: number = 0//

}

class CSuite
{
    monday: number = 0
    tuesday: number = 0
    wednesday: number = 0
    thursday: number = 0
    friday: number = 0
    saturday: number = 0
    sunday: number = 0
}

class FullFlexi
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

class FullFlexiElement
{
    days: string;
    hours_work:  string;
    minutes:  string;
    deduct_break:  string;
    break_type:  string;
}

class PartialFlexi
{
    clockIn: number = 0
    hours: number = 0
    breakTypeId: number = 0
}

class HalfDay
{
    halfDaySetupId: number = 0 // dropdown type 109
    start: number = 0
    end: number = 0
}

class TardySetup
{
    tardyGraceMins: number = 0
    tardyMins: number = 0
    tardyStart: number = 0
    undertimeStart: number = 0
    tardyRoundingId: number = 0 // dropdown type 111
    tardyBracket: Bracket[] = null
    tardyIncrement: Increment = null
    undertimeGraceMins: number = 0
    undertimeMins: number = 0
    undertimeRoundingId: number = 0 // dropdown type 111
    undertimeBracket: Bracket[] = null
    undertimeIncrement: Increment = null
    sum: Increment = null
    sumDisplayOn: number = 0 // dropdown type 110
}

class Bracket
{
    from: number = 0
    to: number = 0
    deduct: number = 0
}

class Increment
{
    roundId: number = 0 // dropdown type = 71
    mins: number = 0
}

export {
    TimekeepingCategoryForm , CSuite, FullFlexi,
    PartialFlexi, HalfDay, TardySetup, Bracket, Increment,
    FullFlexiElement// Elements
}








