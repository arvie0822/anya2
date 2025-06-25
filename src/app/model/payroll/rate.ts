import { Validators } from "@angular/forms"

class LookupRateType {
    id: number = 0
    code = ['',   [Validators.required]]
    description = ['',   [Validators.required]]
    createdBy: number = 0
    dateCreated: string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    active: boolean = true
}

class LookupOvertime
{
    id: number = 0
    rateTypeID: number = 0
    dayTypeID: number = 0
    overtimeCategoryID: number = 0
    code: string = ""
    description: string = ""
    otRate: number = 0
    createdBy: number = 0
    dateCreated: string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    active: boolean = true
}


export { LookupRateType, LookupOvertime }