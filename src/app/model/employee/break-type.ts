import { Validators } from "@angular/forms"

export class Breaktype {
    breakTypeId = 0
    breakTypeCode = ""
    description = ['', [
        Validators.required
      ]]
    breakId = null
    breakTypeDetail = [[], [
        Validators.required
      ]]
    createdBy = 0
    dateCreated: string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    active : string = null
}

export interface BreaktypeDetail {
    breakTypeDetailId: number
    name: string
    mins: number
    description: string
    hours: number
    type: number
    requireClock: boolean
    paid: boolean
    deductOverBreak: boolean
}
