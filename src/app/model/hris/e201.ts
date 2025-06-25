import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"
var pipe = new DatePipe('en-US');


//================================== post for all =======================================

export class e201EmployeeRequest{
    employeeId : number = 0
    e201NewHire : e201NewHire[] = []
    e201WorkEducationHistory : e201WorkEducationHistory[] = []
    e201EmployeeRecord : e201EmployeeRecord[] = []
    e201EmployeeLearning : e201EmployeeLearning[] = []
    e201CompanyAsset : e201CompanyAsset[] = []
    e201IncidentReportMemo : e201IncidentReportMemo[] = []
    payroll2316 : payroll2316[] = []
}




//==================================== assign requirments ==========================================
export class e201Requirement {
   e201RequirementId : number = 0
   name : string =  ""
   description : string = ""
   createdBy : number = 0
   dateCreated =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
   isActive : boolean =  true
   e201RequirementDetail : e201RequirementDetail[] = []
}

export class additional{
    requirement : number = 0
    days : string = ""
}

export class e201RequirementDetail{
    id : number = 0
    e201RequirementId : number = 0
    requirement : number = 0
    dueDate : number = 0
}


//================================== New Hire Requirment ========================================

export class e201NewHire{
    id : number = 0
    displayName : string =  ''
    employeeId : number = 0
    e201NewHireDetail : e201NewHireDetail[] = []
    createdBy : number = 0
    dateCreated =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    isActive : boolean = false
}

export class e201NewHireDetail{
    e201ReuirementId : string = ""
    isSubmitted : string = ""
    dateSubmitted : string = ""
    dateIssued : string = ""
    dateExpiration : string = ""
    dateDeadLine : string = ""
    uploadPath : string = ""
    dateCreated =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    isActive : boolean = false
    createdBy : number = 0
    rowId : 0
    lastId : 0
}


// ================================= work educational history =====================================
export class e201WorkEducationHistory {
    id : number = 0
    employeeId : number = 0
    workHistory : workHistory[] = []
    educationalAttainment : educationlAttainment[] = []
    characterReference : characterReference[] = []
}

// workhistory ==================================
export class workHistory {
    companyName : string = ""
    address : string = ""
    industryId : number = 0
    occupationId : number = 0
    jobDecsription : string = ""
    fromDate  =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    toDate  =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    leavingReason : string = ""
    uploadPath : string = ""
    rowId : 0
    lastId : 0
}

// educationalattainment =========================
export class educationlAttainment{
    level : number = 0
    schoolName : number = 0
    branch : string = ""
    degree : number = 0
    address : string = ""
    fromDate = pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    toDate = pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    graduatedYear :number = 0
    contactNumber : string = ""
    emailAddress : string = ""
    rowId : 0
    lastId : 0
}
// characterReference =========================
export class characterReference{

    fullName : string = ""
    relationshipId : number = 0
    company : string = ""
    address : string = ""
    occupationId : number = 0
    contactNumber : string = ""
    emailAddress : string = ""
    rowId : 0
    lastId : 0
}

//============================================= employee record =====================================

export class e201EmployeeRecord{
    id : number = 0
    employeeId : number = 0
    perfomanceMangement : performanceManagement[] = []
    medicalRecord : medicalRecord[] = []
    familyRelationship : familyRelationship[] = []
    visa : employeeVisa[] = []
    createdBy : number = 0
    dateCreated =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
}

export class performanceManagement{
    year : number = 0
    period : string = ""
    rating : number = 0
    feedback : string = ""
    uploadPath : string = ""
    rowId : 0
    lastId : 0
}

export class medicalRecord{
    medicalCenter : number = 0
    medicalExam : number = 0
    dateConducted = pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    resultsFinding : string = ""
    uploadPath : string = ""
    rowId : 0
    lastId : 0
}

export class familyRelationship{
    lastName : string = ""
    middleName : string = ""
    firstName : string = ""
    dateOfBirth : string = ""
    relationshipId : number = 0
    occupationId : number = 0
    address : string = ""
    contactNumber : string = ""
    rowId : 0
    lastId : 0
}

export class employeeVisa{
    visaType : number = 0
    country : number = 0
    visaNumber : string = ""
    issuedDate : string = ""
    expiredDate : string = ""
    issuedPlace : string = ""
    rowId : 0
    lastId : 0
}

// =================================================== learning ==================================================

export class e201EmployeeLearning{
    id : number = 0
    employeeId : number = 0
    skills : employeeLearningSkills[] = []
    licenses : employeeLearningLicense[] = []
    awardsAndRecognitation : employeeLearningAwardsRecognitation[] = []
    trainingAndSeminar : EmployeeLearningTrainingAndSeminar[] = []
    exam : EmployeeLearningExam[] = []
    createdBy : number = 0
    dateCreated =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    isActive : boolean = false
}

export class employeeLearningSkills{
    skillsId : number = 0
    specializedId : number = 0
    description : string = ""
    rowId : 0
    lastId : 0
}

export class employeeLearningLicense{
    lienseType : number = 0
    licenseNo : string = ""
    issueDate =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    expirationDate =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    uploadPath : string = ""
    rowId : 0
    lastId : 0
}

export class employeeLearningAwardsRecognitation{
    awardTitleId: number = 0
    awardDate =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    description: string = ""
    uploadPath: string = ""
    rowId : 0
    lastId : 0
}

export class EmployeeLearningTrainingAndSeminar{
    trainingSeminarId : number = 0
    typeId : number = 0
    location : string = ""
    dateFrom =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    dateTo =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    conductedBy : string = ""
    uploadPath : string = ""
    rowId : 0
    lastId : 0
}
export class EmployeeLearningExam{
    examId : number = 0
    score : string = ""
    location : string = ""
    dateFrom =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    dateTo =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    conductedBy : string = ""
    uploadPath : string = ""
    rowId : 0
    lastId : 0
}

// ========================================== Company Asset ======================================================

export class e201CompanyAsset {
    id : number = 0
    employeeId : number = 0
    companyAssetsDetail : companyAssetsDetail[] = []
    createdBy : number = 0
    dateCreated =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    isActive : boolean = false
}

export class companyAssetsDetail{
    categoryId : number = 0
    model : string = ""
    serialNumber : string = ""
    conditionId : number = 0
    issuedDate =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    returnedDate =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    returnedConditionId :number = 0
    replacementValue : number = 0
    remarks : string = ""
    rowId : 0
    lastId : 0
}

// ========================================== Incident Report & Memo ===============================================

export class e201IncidentReportMemo {
    id :  number = 0
    employeeId : number = 0
    incidentReport : incidentReport[] = []
    memo : incidentMemo[] = []
    createdBy :  number = 0
    dateCreated =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    isActive : boolean = false
}

export class incidentReport{
    incidentDate =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    incidentTypeId : number = 0
    incidentCateogryId : number = 0
    description : string = ""
    rowId : 0
    lastId : 0
}

export class incidentMemo{
    offenseLevelId : number = 0
    sectionId : number = 0
    description : string = ""
    disciplinaryActionId : number = 0
    receivedDate =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    slideDate =  pipe.transform(new Date(),'yyyy-MM-ddTHH:mm:ss')
    rowId : 0
    lastId : 0
}

export class movement {
    module : number = 0
    submodule : number = 0
}

export class payroll2316{
    id : number = 0
    gUID : string = ""
    employeeId : number = 0
    payrollCode : string = ""
    idEmployeeStatus : number = 0
    employeeStatus : string = ""
    prevEmployer : boolean = false
    year : number = 0
    fromDate : string = ""
    toDate : string = ""
    toMonth : string = ""
    toDay : string = ""
    tin : string = ""
    displayName : string = ""
    rdo : string = ""
    registeredAddress : string = ""
    rZipCode : string = ""
    localAddress : string = ""
    lZipCode : string = ""
    foreignAddress : string = ""
    number : string = ""
    mWEday : number = 0
    mWEMonth : number = 0
    mWE : boolean = false
    // ertin : number = 0 // need to change back
    ertin : string = "" // need to change back
    erName : string = ""
    erAddress : string = ""
    erZipCode : string = ""
    erType : string = ""
    // erType : number = 0 // need to change back
    erPrevTIN : string = "" // need to change back
    // erPrevTIN : number = 0 // need to change back
    erPrevName : string = ""
    erPrevAddress : string = ""
    erPrevZipCode : string = ""
    grossComp : number = 0
    ntxComp : number = 0
    txComp : number = 0
    txCompPrev : number = 0
    grossTaxable : number = 0
    taxDue : number = 0
    taxPresent : number = 0
    taxPrevious : number = 0
    taxSubTotal : number = 0
    taxPERA : number = 0
    taxTotal : number = 0
    ntxbasic : number = 0
    ntxhol : number = 0
    ntxot : number = 0
    ntxnd : number = 0
    ntxhz : number = 0
    ntX13M : number = 0
    nTXDM : number = 0
    ntxGovStat : number = 0
    ntxSal : number = 0
    ntxTotal : number = 0
    txBasic : number = 0
    txrep : number = 0
    txtrans : number = 0
    txcola : number = 0
    txfh : number = 0
    txothersaName : string = ""
    txothersa : number = 0
    txothersbName : string = ""
    txothersb : number = 0
    txComm : number = 0
    txProfit : number = 0
    txDir : number = 0
    tX13M : number = 0
    txhz : number = 0
    txot : number = 0
    txotheraName : string = ""
    txothera : number = 0
    txotherbName : string = ""
    txotherb : number = 0
    txTotal : number = 0
    filename : string = ""
    signatoryPath : string = ""
    signatoryName : string = ""
    active : boolean = false
    createdBy : number = 0
}


