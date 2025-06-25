import { Validators } from "@angular/forms"

class filingForm {
    filingTypes: number = null
    includeExpiry: number = null
    dateFrom : String = null
    dateTo : String = null

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
