import { Validators } from "@angular/forms"

export class EmployeeScheduleTag
{
    tagId: number = 0
    shiftId= [null, [
        Validators.required
    ]]
    dateFrom= [null, [
        Validators.required
    ]]
    dateTo= [null, [
        Validators.required
    ]]
    tagType= [null, [
        Validators.required
    ]]
    tagTypeId= [null, [
        Validators.required
    ]]
    isProcess: boolean = false
    employeeScheduleTagDetail = []
}

export class EmployeeSchedulePerDayTag
{
    tagId: number = 0
    dateFrom= [null, [
        Validators.required
    ]]
    dateTo= [null, [
        Validators.required
    ]]
    tagType= [null, [
        Validators.required
    ]]
    tagTypeId= [null, [
        Validators.required
    ]]
    weekCount= [null, [
        Validators.required
    ]]
    isProcess: boolean = false
    employeeSchedulePerDayTagEmployee = []
    employeeSchedulePerDayTagDate = []
    employeeSchedulePerDayShiftDay = []
    request: any = null
    EmployeeExclude = []
    employeeId = null
}


export class ShiftDays {
    // apply: number = null
    sunday: number = null
    monday: number = null
    tuesday: number = null
    wednesday: number = null
    thursday: number = null
    friday: number = null
    saturday: number = null
}


export class EmployeeSchedulePerDayTagEmployee
{
    tagDetailId: number = 0
    tagId: number = 0
    employeeId: number = 0
}

export class EmployeeSchedulePerDayTagDate
{
    tagDetailId: number = 0
    tagId: number = 0
    shiftId: number = 0
    date = new Date()
}

export class EmployeeScheduleTagDetail
{
    tagDetailId: number = 0
    tagId: number = 0
    shiftId: number = 0
    description: string = ""
    shiftName: string = ""
    employeeId: number = 0
    employeeCode: string = ""
    displayName: string = ""
    dateFrom: string = ""
    dateTo: string = ""
}
