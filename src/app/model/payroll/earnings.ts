import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"
var pipe = new DatePipe('en-US');

export class Earning {

    id : number = 0
    employeeId = [null, [Validators.required]]
    employeecode :number = 0
    earningsTypeID = [null, [Validators.required]]
    earningsAmount : number = 0
    // isOneTime : boolean = false
    payrollTypeId  = [null, [ Validators.required ]]
    cutoffId = [null, [ Validators.required ]]
    frequency : string = ""
    recurStartDate = [pipe.transform(new Date,"yyyy-MM-dd"), [ Validators.required ]]
    recurEndDate = [pipe.transform(new Date,"yyyy-MM-dd"), [ Validators.required ]]
    remarks : string = ""
    // payoutType : string = ""
    filename : string = ""
    closedBy : number = 0
    createdBy : number = 0
    dateCreated = pipe.transform(new Date,"yyyy-MM-dd")
    active : boolean = false
    status = [null, [ Validators.required ]]
    dateClosed  = [new Date().toISOString().substring(0, new Date().toISOString().length - 1), Validators.required]
    isHoldFrom = [new Date().toISOString().substring(0, new Date().toISOString().length - 1), Validators.required]
    isHoldTo =  [new Date().toISOString().substring(0, new Date().toISOString().length - 1), Validators.required]


}
