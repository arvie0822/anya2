import { DropdownRequest } from "../dropdown.model"


class TkGererationForm{

    Subcompany : string = null
    Branch : string = null
    EmployeeCategory : string = null
    Confidential : string = null
    PayrolCutoff : string = null
    CutOfftype : string = null
    MonthYear : Date = null
    GenerateDetailed : string = null
    GenerateSummary : string = null

}
export { TkGererationForm }

export class TKForm {
    type: number = null
    payrollId: number = null
    payrollYear: number = null
    payrollMonth: number = null
    payrollCutoff: number = null
    dateFrom: Date = new Date()
    dateTo: Date = new Date()
    subCompany: number = null
    branch: number = null
    category: number = null
    department: number = null
    confidential: number = null
    status: number = null
    employee: number = null
    includeInactive: boolean = true
}

export class TKFilter {
    subCompany: number[] = []
    branch: number[] = []
    category: number[] = []
    department: number[] = []
    confidential: number[] = []
    status: number[] = []
    type: number = 0
    Req: DropdownRequest
    timekeepingType: number = 0
}
