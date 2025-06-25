import { environment } from "environments/environment"

var today = new Date()
var year: any = []
var yr = today.getFullYear()
for (let idx = (yr - 5); idx < (yr + 5); idx++) {
    year.push({ dropdownID: idx, description: idx + "" })
}

var publishList = [
    { dropdownID: 1, description: "Publish"   },
    { dropdownID: 2, description: "Unpublish" }
]

interface ReportDetail {
    moduleId : number
    reportName : string
    type: "Excel" | "pdf"
    downloadFromBE : boolean
    downloadFromBR : boolean
    isPublish : boolean
    isSearch : boolean
    url : string
    publishUrl? : string
    parameters : ReportParameter[]
    fields : any[]
}

interface ReportParameter {
    id : string
    key : string
}

// Instructions
// moduleId         : 123,           - Module Id
// reportName       : "YTD_ALL",     - For Bold Report Name
// type             : "Excel",       - For Bold Report Type (Excel, Pdf)
// downloadFromBE   : true,          - True , If Download Report from Backend
// downloadFromBR   : false,         - True , If Download Report from Bold Report
// isPublish        : false,         - True , Show button Publish
// isSearch         : false,         - True , Show button Search
// url              : ""             - (API) Download API from Backend
// publishUrl       : ""             - (API) Required only if isPublish = True
// parameters       : []             - Parameters for API (Bold Report/Backend)
// fields           : []             - Parameters Fields

export const details: ReportDetail[] = [
    {
        moduleId: 123,
        reportName: "YTD_ALL",
        type: "Excel",
        downloadFromBE: true,
        downloadFromBR: false,
        isPublish: false,
        isSearch: false,
        url: environment.apiUrl + "file/export/payroll/exportPayrollRegisterYTD",
        parameters: [
            { id: "year",       key: "YearID"        },
            { id: "company",    key: "SubCompanyID"  },
            { id: "branch",     key: "BranchID"      },
            { id: "employee",   key: "EmployeeID"    },
        ],
        fields: [
            { id: "year",       label: "Year",      value: "",   type: "select",       required: true,   all: false,  multiselect: false,  type_id: -4, dropdown: 0,  options: year, dropdownType: { type: "fix", uri: 0  } },
            { id: "company",    label: "Company",   value: "",   type: "custom",       required: true,   all: true,   multiselect: true,   type_id: -1, dropdown: 1001, options: []    },
            { id: "branch",     label: "Branch",    value: "",   type: "d-hierarchy",  required: true,   all: true,   multiselect: true,   type_id: -2, tagType: {type: 1 , id: "company", type_id: -1}, customRequest: [] },
            { id: "employee",   label: "Employee",  value: "",   type: "d-hierarchy",  required: true,   all: true,   multiselect: true,   type_id: -4, tagType: {type: 7 , id: "branch",  type_id: -2}, customRequest: ["year"] },
        ]
    },
    {
        moduleId: 153,
        reportName: "Alphalist Dat",
        type: "Excel",
        downloadFromBE: true,
        downloadFromBR: false,
        isPublish: false,
        isSearch: false,
        url: environment.apiUrl + "file/export/payroll/exportAlphalistDat",
        parameters: [
            { id: "year",       key: "YearID"        },
            { id: "company",    key: "SubCompanyID"  },
            { id: "branch",     key: "BranchID"      },
        ],
        fields: [
            { id: "year",       label: "Year",      value: "",   type: "select",       required: true, all: false,  multiselect: false,  type_id: -4, dropdown: 0,  options: year, dropdownType: { type: "fix", uri: 0  } },
            { id: "company",    label: "Company",   value: "",   type: "custom",       required: true, all: false,  multiselect: false,  type_id: -1, dropdown: 1001, options: []    },
            { id: "branch",     label: "Branch",    value: "",   type: "d-hierarchy",  required: true, all: true,   multiselect: true,   type_id: -2, tagType: {type: 1 , id: "company", type_id: -1}, customRequest: [] },
        ]
    },
    // Removed From UI to Move to Bold report 11/28 ticket #AA-1332
    // {
    //     moduleId: 154,
    //     reportName: "Alphalist Schedule",
    //     type: "Excel",
    //     downloadFromBE: false,
    //     downloadFromBR: true,
    //     isPublish: false,
    //     isSearch: false,
    //     url: "",
    //     parameters: [
    //         { id: "Year",       key: "YearID"        },
    //         { id: "Company",    key: "SubCompanyID"  },
    //     ],
    //     fields: [
    //         { id: "Year",       label: "Year",      value: "",   type: "select",       required: true, all: false,  multiselect: false,  type_id: -4, dropdown: 0,  options: year, dropdownType: { type: "fix", uri: 0  } },
    //         { id: "Company",    label: "Company",   value: "",   type: "custom",       required: true, all: false,  multiselect: false,  type_id: -1, dropdown: 1001, options: []    },
    //     ]
    // },
    {
        moduleId: 110, // 2316 Payroll
        reportName: "2316 PDF_payrollrun",
        type: "pdf",
        downloadFromBE: true,
        downloadFromBR: true,
        isPublish: true,
        isSearch: true,
        url: environment.apiUrl + "payroll/postExecute2316Run",
        publishUrl: environment.apiUrl + "payroll/postPublish2316",
        parameters: [
            { id: "year",       key: "YearID"        },
            { id: "company",    key: "SubCompanyID"  },
            { id: "branch",     key: "BranchID"      },
            { id: "employee",   key: "EmployeeID"    },
            { id: "publish",    key: "PublishedId"   },
        ],
        fields: [
            { id: "year",       label: "Year",      value: "",   type: "select",       required: true,   all: false,  multiselect: false,  type_id: -4, dropdown: 0,  options: year, dropdownType: { type: "fix", uri: 0  } },
            { id: "company",    label: "Company",   value: "",   type: "custom",       required: true,   all: false,  multiselect: false,  type_id: -1, dropdown: 1001, options: []    },
            { id: "branch",     label: "Branch",    value: "",   type: "d-hierarchy",  required: true,   all: true,   multiselect: true,   type_id: -2, tagType: {type: 1 , id: "company", type_id: -1}, customRequest: [] },
            { id: "employee",   label: "Employee",  value: "",   type: "d-hierarchy",  required: true,   all: true,   multiselect: true,   type_id: -4, tagType: {type: 7 , id: "branch",  type_id: -2}, customRequest: ["year"] },
            { id: "publish",    label: "Publish",   value: "",   type: "select",       required: false,  all: true,   multiselect: false,  type_id: -4, dropdown: 0,  options: publishList, dropdownType: { type: "fix", uri: 0  } },
        ]
    },
    {
        moduleId: 157, // 2316 ESS
        reportName: "2316 PDF_payrollrun",
        type: "pdf",
        downloadFromBE: true,
        downloadFromBR: false,
        isPublish: false,
        isSearch: false,
        url: "",
        parameters: [
            { id: "year",       key: "YearID"        },
        ],
        fields: [
            { id: "year",       label: "Year",      value: "",   type: "select",       required: true,   all: false,  multiselect: false,  type_id: -4, dropdown: 0,  options: year, dropdownType: { type: "fix", uri: 0  } },
        ]
    },
    {
        moduleId: 219, // Payroll > Custom Report > Custom YTD
        reportName: "Custom_YTD",
        type: "Excel",
        downloadFromBE: false,
        downloadFromBR: true,
        isPublish: false,
        isSearch: false,
        url: "",
        parameters: [
            { id: "Year",       key: "YearID"        },
        ],
        fields: [
            { id: "Year",       label: "Year",      value: "",   type: "select",       required: true,   all: false,  multiselect: false,  type_id: -4, dropdown: 0,  options: year, dropdownType: { type: "fix", uri: 0  } },
        ]
    },
]
