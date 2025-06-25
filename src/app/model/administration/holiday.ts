import { Validators } from "@angular/forms"

class HeaderForm {
    name = [null, [Validators.required]]
    selectedBranch = [null, [Validators.required]]
    description = [null, [Validators.required]]
}

class HolidayForm {
    holidayName = [null, [Validators.required]]
    selectedHolidayType = [null, [Validators.required]]
    holidayTypeDesc = [null, [Validators.required]]
    selectedDate = [null, [Validators.required]]
    working = [null, [Validators.required]]
}

export { HolidayForm, HeaderForm }