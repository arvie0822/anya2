import { Validators } from "@angular/forms"

export class ShiftForm {
  shiftId: number = 0
  shiftCode: string = ""
  shiftName = ['', [
    Validators.required
  ]]
  description = ['', [
    Validators.required
  ]]
  isFlexi: boolean = false
  active: boolean = true
  weekCount = [0, [
    Validators.required
  ]]
  shiftCodeDetail = []
  dateCreated = new Date()
  createdBy: number = 0
}

export const detailHide = ['firstBreakIn', 'firstBreakInDaysCover', 'firstBreakOut', 'firstBreakOutDaysCover', 'secondBreakIn', 'secondBreakInDaysCover', 'secondBreakOut', 'secondBreakOutDaysCover', 'thirdBreakIn', 'thirdBreakInDaysCover', 'thirdBreakOut', 'thirdBreakOutDaysCover']

export const breakDetail = [{
  id: 0,
  description: "No Break",
  show: []
}, {
  id: 1,
  description: "One Break",
  show: ['firstBreakIn', 'firstBreakInDaysCover', 'firstBreakOut', 'firstBreakOutDaysCover']
},
{
  id: 2,
  description: "Two Break",
  show: ['firstBreakIn', 'firstBreakInDaysCover', 'firstBreakOut', 'firstBreakOutDaysCover', 'secondBreakIn', 'secondBreakInDaysCover', 'secondBreakOut', 'secondBreakOutDaysCover']
},
{
  id: 3,
  description: "Three Break",
  show: ['firstBreakIn', 'firstBreakInDaysCover', 'firstBreakOut', 'firstBreakOutDaysCover', 'secondBreakIn', 'secondBreakInDaysCover', 'secondBreakOut', 'secondBreakOutDaysCover', 'thirdBreakIn', 'thirdBreakInDaysCover', 'thirdBreakOut', 'thirdBreakOutDaysCover']
}]

export interface ShiftDetail {
  shiftCodeDetailId: number
  isFlexi: boolean
  timeIn: string
  timeOut: string
  timeOutDaysCover: number
  totalWorkingHours: number
  day: number
  weeks: number
  isRestDay: boolean
  halfDayIn: string
  halfDayInDaysCover: number
  halfDayOut: string
  halfDayOutDaysCover: number
  breakCount: number
  firstBreakIn: string
  firstBreakInDaysCover: number
  firstBreakOut: string
  firstBreakOutDaysCover: number
  secondBreakIn: string
  secondBreakInDaysCover: number
  secondBreakOut: string
  secondBreakOutDaysCover: number
  thirdBreakIn: string
  thirdBreakInDaysCover: number
  thirdBreakOut: string
  thirdBreakOutDaysCover: number
}
