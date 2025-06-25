import { Validators } from "@angular/forms"

export class DropdownSettings {
    dropdownId: number = 0
    dropdownTypeId = [null, [
        Validators.required
    ]]
    dropdownDescription = [null, [
        Validators.required
    ]]
    createdBy: number = 0
    dateCreated: Date = new Date()
    active: boolean = true
    deleted: boolean = false
}