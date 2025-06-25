import { DatePipe } from "@angular/common";
var pipe = new DatePipe('en-US');

export class LookupPayReg {
    id                   : number =    0
    code                 : string =    ""
    description          : string =    ""
    jeCodeId             : number =    0
    jeAccountCode        : number =    0
    jeAccountId          : number =    0
    jeAccountCode1       : number =    0
    jeAccountName1       : number =    0
    debitOrCredit        : number =    0
    costOrHr             : number =    0
    createdBy            : number =    0
    dateCreated          = pipe.transform(new Date,"yyyy-MM-dd")
    active               : boolean = false
    isView               : boolean = false
}
