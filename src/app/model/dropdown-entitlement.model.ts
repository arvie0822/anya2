import { environment } from "environments/environment";

var uri = environment.apiUrl
//#region interface & class

export class DropdownRequest {
    search: string = ""
    start:  number = 0
    length: number = 20
    id: DropdownID [] = [new DropdownID]
    includeInactive: boolean = false
}



export class DropdownEntitlementRequest {
    id:  number = 0
    id_to:  number = 0

}



export class DropdownID {
    dropdownID: number = 0
    dropdownTypeID: number = 0
}

export interface dropdownEntitlementType {
    type: number
    label: string
    uri: string
    step: number
}
//#endregion

//step reference in entitlement
//id = 1
//id_to = 2
//to_id = 3
//to_id_to = 4
export const dropdownEntitlementType: dropdownEntitlementType[] = [
    { type: 3,  label: "Country",                         step: 1, uri: uri + "master/getDropdownEntitlement"  },
    { type: 10, label: "Region",                          step: 2, uri: uri + "master/getDropdownEntitlement"  },
    { type: 61, label: "Province",                        step: 3, uri: uri + "master/getDropdownEntitlement"  },
    { type: 9,  label: "City",                            step: 3, uri: uri + "master/getDropdownEntitlement"  },
    { type: 6,  label: "City",                            step: 3, uri: uri + "master/getDropdownEntitlement"  },
    { type: 8,  label: "Revenue District Office Branch",  step: 3, uri: uri + "master/getDropdownEntitlement"  },

]