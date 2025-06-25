import { Validators } from "@angular/forms"

class DetailForm {
    employeeCode = [null, [Validators.required]]
    dateFrom = [null, [Validators.required]]
    dateTo = [null, [Validators.required]]
}

class BioForm {
    biometric_id = [null,[Validators.required]]
    encrypted_biometric_id = [null,[Validators.required]]
    serial_number = [null,[Validators.required]]
    device_id = [null,[Validators.required]]
    model = [null,[Validators.required]]
    location = [null,[Validators.required]]
    biometric_type = [null,[Validators.required]]
    group = [null,[Validators.required]]
}

export { DetailForm, BioForm }