import { Validators } from "@angular/forms"

export class Approval {
    dateFrom              = new Date ()
    dateTo                = new Date ()
    employee              : number = null
    code                  : string = ""
}

// export interface ChangeSched {
//     // checkbox: string;
//     // action: string;
//     code: number;
//     name: string;
//     dateFrom: string;
//     dateTo: string;
//     shift: string;
//     schedIn: string;
//     schedOut: string;
//     remarks: string;
//     status: string;
//   }

//   export interface Leave {
//     // checkbox: string;
//     // action: string;
//     code: number;
//     name: string;
//     dateFrom: string;
//     dateTo: string;
//     leaveType: string;
//     fillingType: string;
//     paid: string;
//     reason: string;
//     status: string;
//   }

//   export const Datatable = [

//     { title: "Branch Code", column: "branchCode", type:"text" },
//     { title: "Branch Name", column: "branchName", type:"text"  },

// ]

//  export const Sample = [
//     {
//        "branchCode": "Sample 1", "branchName": "Sample Branch"
//     }
// ]

