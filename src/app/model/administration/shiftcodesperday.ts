import { Validators } from "@angular/forms"

export class ShiftCodesPerDay {
    shiftPerDayId: number = 0
    shiftName: string = ""
    matTimeIn = [new Date(), [
        Validators.required
    ]]
    timeIn: string = ""
    matTimeOut = [new Date(), [
        Validators.required
    ]]
    timeOut: string = ""
    // type: number = 0
    timeOutDaysCover: number = 0
    // isFlexi: boolean = false
    // totalWorkingHours: number = 0
    createdBy: number = 0
    dateCreated: null
    active: boolean = true
}

export class ShiftDetail {
    shiftPerDayId: number = 0
    shiftName: string = ""
    timeIn = new Date()
    timeOut = new Date()
    type: number = 0
}
