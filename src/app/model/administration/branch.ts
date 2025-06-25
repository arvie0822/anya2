import { Validators } from "@angular/forms"

export class Branch {
    branchId: number = 0
    subCompanyId : number = 0
    branchCode: string = ""
    branchName = ['', [
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
    rdoBranch = [null, [
        Validators.required
    ]]
    pagibig = [null, [
        Validators.required
    ]]
    pagibigBranch = [null, [//used for Pag-ibig branch with code
        Validators.required
    ]]
    pagibigCode = "" //unused default = ""

    pagibigRegion = 0//unused default = 0

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
    branchContact : BranchContact  = null
    branchEmail : BranchEmail  = null
    branchIp : BranchIP = null
    bankBranchCode : string = ""


     // assign signatory
     document1: number = 0
     primarySig1: string= ""
     backupSig1: string= ""
     document2: number = 0
     primarySig2: string= ""
     backupSig2: string= ""
     document3: number = 0
     primarySig3: string= ""
     backupSig3: string= ""
}

export class BranchIP {
    address: string = ""
    to = ["", [
        Validators.max(255)
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

