import { Validators } from "@angular/forms"

export class AccessControl {
    accessControlId: number = 0
    accessControlCode: string = ''
    name   = ['',   [Validators.required]]
    description = ['',   [Validators.required]]
    accessControlModule = {}
    employeeEDCFields  = {}
    SupervisorEDCFields   = {}
    hrEDCFields = {}
    active      = [true, [Validators.required]]
    dateCreated = new Date()
    createdBy: number = 0
    accessControlDropdownPost: any = []
}

