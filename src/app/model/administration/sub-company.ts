import { Validators } from "@angular/forms"

export class Subcompany {
    allowSendReport : any[] = []
    subCompanyId: number = 0
    subsidiaryId: number = 0
    subCompanyCode: string = ""
    subCompanyName = [null, [
        Validators.required
    ]]
    unitFloor: string = ""
    building: string = ""
    street: string = ""
    barangay: string = ""
    province = [null, [
        Validators.required
    ]]
    city = [null, [
        Validators.required
    ]]
    region = [null, [
        Validators.required
    ]]
    country = [null, [
        Validators.required
    ]]
    zipCode = [null, [
        Validators.required
    ]]
    sss = [null, [
        Validators.required
    ]]
    philhealth = [null, [
        Validators.required
    ]]
    tin = [null, [
        Validators.required
    ]]
    rdo = [null, [
        Validators.required
    ]]
    rdoSubCompany = [null, [
        Validators.required
    ]]
    pagibig = [null, [
        Validators.required
    ]]

    pagibigSubCompany = 0//unused default = 0

    pagibigCode = ""//unused default = ""

    pagibigRegion = [null, [//used for Pag-ibig branch with code
        Validators.required
    ]]
    industry = [null, [
        Validators.required
    ]]
    bankId = [null, [
        Validators.required
    ]]
    bankAccount = [null, [
        Validators.required
    ]]
    companyLogo: string = ""
    createdBy : number = 0
    dateCreated : string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    active: boolean = true
    longitude: number = 0
    latitude: number = 0
    range: number = 0
    signatory1: string = ""
    signatory1Title: string = ""
    signatory1Path: string = ""
    signatory1FileName: string = ""
    signatory2: string = ""
    signatory2Title: string = ""
    signatory2Path: string = ""
    signatory2FileName: string = ""
    signatory3: string = ""
    signatory3Title: string = ""
    signatory3Path: string = ""
    signatory3FileName: string = ""
    // ipaddress : string = ""
    contact: BranchContact = null
    email: 	BranchEmail = null
    ip: BranchIP = null
    bankBranchCode : string = ""

    // assign signatory
    document1: number = 0
    primarySig1: string = ""
    backupSig1: string = ""
    document2: number = 0
    primarySig2: string = ""
    backupSig2: string = ""
    document3: number = 0
    primarySig3: string = ""
    backupSig3: string = ""
}

export class BranchIP {
    address: string = ""
    to = ["", [
        Validators.min(0),Validators.max(255)
    ]]
}

export class BranchContact {
    dropdownId: number = null
    type: string = ""
    number: string = ""
}

export class BranchEmail {
    dropdownId: number = null
    type: string = ""
    address : string = ""

}



