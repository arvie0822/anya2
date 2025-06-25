import { DatePipe } from "@angular/common";


var pipe = new DatePipe('en-US');


export class ApprovalProcess {
    approvalID: number = 0
    approvalCode: string = ""
    name: string = ""
    description: string = ""
    approvalLevel: string = ""
    approvalDetail: ApprovalDetail[] = []
    approvalEscalationDetail: EscalationDetail[] = []
    createdBy: number = 0
    dateCreated = pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    active: boolean = true
}

export class ApprovalDetail {
    sequence: number
    employeeID: number
    notification = []
}

export class EscalationDetail {
    sequence: number
    hasEscalation: boolean
    days: number
    employeeID: number
    notification = []
}

