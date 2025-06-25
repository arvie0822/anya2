import { Validators } from "@angular/forms"

export class EmployeeLocation
{
    // tagId: number = 0
    dateFrom= [null, [
        Validators.required
    ]]
    dateTo= [null, [
        Validators.required
    ]]
    // tagType= [null, [
    //     Validators.required
    // ]]
    // tagTypeId= [null, [
    //     Validators.required
    // ]]
    weekCount= [1, [
        Validators.required
    ]]
    // isProcess: boolean = false
    // employeeSchedulePerDayTagEmployee = []
    // employeeSchedulePerDayTagDate = []
    // employeeSchedulePerDayShiftDay = []
    // request: any = null
    // EmployeeExclude = []
    // employeeId = null
}

