
import { Validators } from "@angular/forms"
import { FuseAlertService } from "@fuse/components/alert"

export class EmployeeAttendance {
    dateFrom = [null, [
        Validators.required
    ]]
    dateTo = [null, [
        Validators.required
    ]]
    missingLogs = [false, [
        Validators.required
    ]]

    employeeId = null
    employeeStatus : number[] = []
}
