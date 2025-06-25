import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"

var pipe = new DatePipe('en-US');

export class DynamicStatutory {

    id                   : number = 0
    statutory            : number = 0
    name                 = ['', [Validators.required]]
    description          = ['', [Validators.required]]
    frequency            : number = 0
    firstCutOff          : number = 0
    firstMax             : number = 0
    firstCalc            : number = 0
    secondCutoff         : number = 0
    secondMax            : number = 0
    secondCalc           : number = 0
    active               : boolean = true
    basic_Current_Month  : boolean = false
    basic_Monthly        : boolean = false
    overtime             : boolean = false
    holiday              : boolean = false
    basic                : any = []
    attendance           : any = []
    leave                : any = []
    earnings             : any = []
    createdBy            : number = 0
    dateCreated          = pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    sssId                : string = ""
    phHICId              : string = ""
    taxId                : string = ""
    hdmfid               : string = ""
}


