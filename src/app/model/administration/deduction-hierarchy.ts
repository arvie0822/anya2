import { DatePipe } from "@angular/common";

var pipe = new DatePipe('en-US');

export class Hierarchy {

    id               : number = 0
    name             : string = ''
    description      : string = ''
    allowMinNetPay   : boolean = true
    minNetPayType    : number = 0
    allowCompAdv     : boolean = false
    compAdvType      : number = 0
    amount           : number = 0
    createdBy        : number = 0
    dateCreated       = pipe.transform(new Date(), 'yyyy-MM-ddTHH:mm')
    active           : boolean = true
    isDeleted        : boolean = false
    modifiedBy       : number = 0
    dateModified     = pipe.transform(new Date(), 'yyyy-MM-ddTHH:mm')
    deductionsHierarchyDetail: DeductionHierarchyDetail[] = []

}

export class DeductionHierarchyDetail {
    id                     : number = 0
    hierarchyId            : number = 0
    hierarchyTypeId        : number = 0
    hierarchyDeductionId   : number = 0
    order                  : number = 0
}
