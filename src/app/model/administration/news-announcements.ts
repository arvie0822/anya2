import { DatePipe } from "@angular/common";
import { Validators } from "@angular/forms"

var pipe = new DatePipe('en-US');

class NewsForm {
    newsId          : number = 0
    moduleId        : number = 0
    newsCode        : string = ""
    description     = ["", [Validators.required]]
    dateFrom        = [pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss"), [Validators.required]]
    dateTo          = [pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss"), [Validators.required]]
    dateCreated     = pipe.transform(new Date,"yyyy-MM-ddTHH:mm:ss")
    active          : boolean = true
    title           = ["", [Validators.required]]
    uploadFile      : string = ""
    company         : any [] = []
    branch          : any [] = []
    category        : any [] = []
    departmentId    : any [] = []
    displayOn       = [null, [Validators.required]]
    createdBy       : number = 0
}



export { NewsForm }