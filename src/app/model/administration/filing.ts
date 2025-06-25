import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"
var pipe = new DatePipe('en-US');


class filingForm {
    filingTypes: number = null
    includeExpiry: boolean = true
    dateFrom : String = null
    dateTo : String = null
    employeeId : number = 0
    shiftType : boolean = null

}
class leaveForm {
    dateFromlv = [null, [Validators.required]]
    dateTolv = [null, [Validators.required]]
    typelv = [null, [Validators.required]]
    hourlylv = [null, [Validators.required]]
    withPaylv: number = null
    leaveStartlv = null
    leaveEndlv = null
    optlv: number = null
    reasonlv : string = ""
    upload_filelv = null
}

class officialBForm {
    obdTFrom = [null, [Validators.required]]
    obdTTo= [null, [Validators.required]]
    timeTo = [null, [Validators.required]]
    obreason: number = null
    oblocation = [null, [Validators.required]]
    obremarks = [null, [Validators.required]]
    obupload_file = null;
}
class offsetForm {
    dateo = [null, [Validators.required]]
    off_mino= [null, [Validators.required]]
    off_hrso = [null]
    reasono = [null, [Validators.required]]
    upload_fileo = null;
}
class unpaidForm {
    dateuh = [null, [Validators.required]]
    shiftuh: number = null
    dateFromuh = [null, [Validators.required]]
    dateTouh = [null, [Validators.required]]
    reasonuh: number = null
    upload_fileuh = null;
}
class coeForm {
    coe:number = null
    coeOpt: number = null
    remarksOpt= [null, [Validators.required]]
}


export class ChangeLog {

    datecl: string = null
    shift_codecl: string = null
    sched_incl: string = null
    sched_outcl: string = null
    time_incl: string = null
    time_outcl: string = null
    reasoncl: string = null
    upload_filecl:string = null
    clstatus : string = null
}
export class ChangeSched {
    datecs: string;
    shiftcs: string;
    new_shiftcs: number = null
    reasoncs: string;
    upload_filecs: string;
    actioncs: string;
}
export class LeaveMonitoring {
    leave_type:  string;
    total_leave: number;
    used_leave: number;
    pending_approval: number;
    pending_schedule: number;
    available_leave: number;
    carry_forward: number;
    carry_expiration: string;
    expired: number;
}
export class Overtime {
    overtimeDate: string;
    ot_shifts: string;
    overtime_typef: string;
    ot_timing: string;
    otStart : string;
    otEnd : string;
    ot_reason : string;
    otupload_file: string;
    otaction: string;

}

export class overtimeField {
    date  = [null, [Validators.required]]
    shift = [null, [Validators.required]]
    overtimeType = [null, [Validators.required]]
    timing = [null, [Validators.required]]
    otstart = [null, [Validators.required]]
    otend = [null, [Validators.required]]
    reason : string = null
    upload : string = null

    // otdate1:  string  =null
    // otshift1: string  =null
    // overtime_type1: string  =null
    // ottiming1: string  =null
    // ot_start1:  string  =null
    // ot_end1:  string  =null
    // otreason1:  string  =null
    // uploadFileot : string  =null
}
export class lvTable {
    lvDateFrom:  string;
    lvDateTo: string;
    lvType: string;
    lvhourly: string;
    lvoptions: string;
    lvstart: string;
    lvend: string;
    // lvpay: string;
    lvreason:  string;
    lvUpload_File:  string;
}
export class otTable {
    otdate:  string =null
    otshift: string =null
    overtime_type: string =null
    ottiming: string =null
    ot_start: string =null
    ot_end:  string =null
    otreason:  string =null
    uploadFileot : string = null
    status: string = null
}

export class overtimefields{

}
export class OffsetMonitoring {
    // include_expired: string;
    overtime_code: string;
    overtime: string;
    offset_used: string;
    offset_field: string;
    available: string;
    expiration: string;
}
export class offTable {
    date: string;
    off_min: string;
    off_hrs: string;
    reason: string;
    uploadFile: string;
}
export class obTable {
    date : string
    dateTimeFrom:  string;
    dateTimeTo: string;
    reason: string;
    location: string;
    remarks: string;
    uploadFile: string;
}
export class uhTable {
    uhDate: string
    uhShift: string
    uhDateFrom: string
    uhDateTo: string
    uhReason: string
    uhUpload_file: string
}

export { filingForm, leaveForm, officialBForm, offsetForm, unpaidForm, coeForm }



export class ChangeSchedule{

    changeScheduleId    : number = 0
    changeScheduleCode  : string = ""
    employeeId  : number = 0
    date   = pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    shiftId : number = 0
    currentshift
    reason              : string = ""
    lateFiling          : boolean = false
    isUpload            : boolean = false
    uploadPath          : string = ""
    status              : string = ""
    approved            : boolean = false
    dateApproved        : Date
    createdBy           : number = 0
    dateCreated         : Date
    active              : boolean = false

}

export class ChangeLogs {

    changeLogId    : number = 0
    changeLogCode  : string = ""
    employeeId : number = 0
    timeIn =  pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    timeOut = pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    reason         : string = ""
    lateFiling     : boolean = false
    isUpload       : boolean = false
    uploadPath     : string = ""
    status         : string = ""
    approved       : boolean = false
    dateApproved   : Date
    createdBy      : number = 0
    dateCreated    : Date
    active         : boolean = false

}

export class Leave {

    leaveCode        : string = ""
    employeeId       : number = 0
    dateFrom         = pipe.transform(new Date,"yyyy-MM-dd")
    dateTo           = pipe.transform(new Date,"yyyy-MM-dd")
    leaveTypeId      : number = 0
    leaveFileTypeId  : number = 0
    halfdayOption : number = 0
    dateTimeFrom = pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    dateTimeTo = pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    isPaid           : boolean = false
    reason           : string = ""
    lateFiling       : boolean = false
    isUpload         : boolean = false
    uploadPath      : string = ""
    status           : string = ""
    approved         : boolean = false
    dateApproved     = pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    createdBy        : number = 0
    dateCreated      = pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    active           : boolean = false
    shiftId          : number = 0

}

export class Overtimes {

    overtimeId             : number = 0
    overtimeCode           : string = ""
    employeeId             : number = 0
    date                   = new Date
    shiftId                : number = 0
    overtimeTypeId         : number = 1
    timingId               : number = 0
    otStart             = new Date
    otEnd               = new Date
    reason                 : string = ""
    lateFiling             : boolean = false
    isUpload               : boolean = false
    uploadPath             : string = ""
    status                 : string = ""
    approved               : boolean = false
    dateApproved           : Date
    createdBy              : number = 0
    dateCreated            : Date
    active                 : boolean = false

}

export class Offset {

    offsetId              : number = 0
    offsetCode            : string = ""
    employeeId            : number = 1
    offsetDate            = new Date ()
    offsetMin             : number = 0
    offsetHrs            : number = 0 // for display not for saving
    reason                : string = ""
    lateFiling            : boolean = false
    isUpload              : boolean = false
    uploadPath            : string = ""
    status                : string = ""
    approved              : boolean = false
    dateApproved          : Date
    createdBy             : number = 0
    dateCreated           : Date
    active                : boolean = false

}

export class OfficialBusiness {

    officialBusinessId      : number = 0
    officialBusinessCode    : string = ""
    employeeId              : number = 0
    date =  new Date
    timeFrom                = new  Date()
    timeTo                  = new  Date()
    reasonId                : number = 0
    location                : string = ""
    reason : string = ""
    lateFiling              : boolean = false
    isUpload                : boolean = false
    uploadPath : string = ""
    status                  : string = ""
    approved                : boolean = false
    dateApproved            : Date
    createdBy               : number = 0
    dateCreated             : Date
    active                  : boolean = false

}

export class UnpaidBreak {

    unpaidBreakId     : number = 0
    unpaidBreakCode   : string = ""
    employeeId        : number = 0
    date              = new Date
    shiftId           : number = 0
    dateTimeFrom      = new Date
    dateTimeTo        = new Date
    reasonId          : number = 0
    lateFiling        : boolean = false
    isUpload          : boolean = false
    uploadPath        : string = ""
    status            : string = ""
    approved          : boolean = false
    dateApproved      : Date
    createdBy         : number = 0
    dateCreated       : Date
    active            : boolean = false

}

export class COE {

    coeId            : number = 0
    coeCode          : string = ""
    employeeId       : number = 0
    purposeId : number = 0
    withSalary : boolean = false
    coePath          : string = ""
    reason : string = ""
    status           : string = ""
    approved         : boolean = false
    dateApproved     : Date
    createdBy        : number = 0
    dateCreated      : Date
    active           : boolean = false

}


export class Location {

    date : ""
    currentlocation : ""
    newlocation : ""
    reason : ""
    status : ""
    upload : ""




}
