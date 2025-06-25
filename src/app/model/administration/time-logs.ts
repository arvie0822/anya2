
import { Validators } from "@angular/forms"

export class timelogs {
    dateFrom = [null, [
        Validators.required
    ]]
    dateTo = [null, [
        Validators.required
    ]]
    missingLogs = [null, [
        Validators.required
    ]]
}
