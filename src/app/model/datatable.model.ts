import { environment } from "environments/environment"

export class TableRequest {
    Search: string = ""
    Order: string = ""
    OrderBy: string = "ASC"
    Start: number = 0
    Length: number = sessionStorage.getItem('moduleId') == '46' ? 15 : 10
    SearchColumn: any[] = []
}


export const Datatable = [
    {//default
        type: "default",
        title: "default",
        rows: [],
        filter: [],
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: ""
        },
        api: {
            uri: ""
        }
    },
    {//branch
        type: "branch",
        title: "Branch",
        rows: [
            { "title": "Branch Name", "column": "name", "defaultSort": true },
            { "title": "Company Name", "column": "company", "defaultSort": true },
            { "title": "1", "column": "industry" },
            { "title": "dateCreated", "column": "dateCreated" },
            { "title": "Created By", "column": "createdByName" },
        ],
        filter: [
            // { "id": "branchCode", "value": "", "label": "Branch Code", "type": "input", "icon": "feather:edit-2", },
            { "id": "name", "value": "", "label": "Branch Name", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: ["encryptId", "branchId"],
        hasProcess: false,
        link: {
            uri: "/detail/branch/"
        },
        api: {
            uri: environment.apiUrl + "tenant/getBranchTable"
        }
    },
    {//sub-company
        type: "sub-company",
        title: "Company",
        rows: [
            { "title": "Company Name", "column": "name", "defaultSort": true },
            { "title": "1", "column": "industry" },
            { "title": "dateCreated", "column": "dateCreated" },
            { "title": "Created By", "column": "createdByName" },
        ],
        filter: [
            // { "id": "branchCode", "value": "", "label": "Branch Code", "type": "input", "icon": "feather:edit-2", },
            { "id": "name", "value": "", label: "Company Name", "type": "input", "icon": "feather:search", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,

        excludeExport: [""],
        hasProcess: false,
        link: {
            uri: "/detail/sub-company/"
        },
        api: {
            uri: environment.apiUrl + "tenant/getSubCompanyTable"
        }
    },
    // {// Earnings
    //     type: "earnings",
    //     title: "Earnings",
    //     rows: [
    //         { "title": "PayCode", "column": "", "defaultSort": true },
    //         { "title": "Earning Description", "column": "" },
    //         { "title": "Earning Category  ", "column": "" },
    //         { "title": "Employee Category ", "column": "" },
    //         { "title": "Payroll Category", "column": "" },
    //         { "title": "Frequency", "column": "" },
    //         { "title": "TK Related ", "column": "" },
    //         { "title": "Status", "column": "branchame" },
    //     ],
    //     filter: [
    //         { id: "id", "value": "", label: "", type: "custom", multiselect: true, options: [], dropdownType: { type: "custom", uri: 1001 } },
    //         { id: "id", "value": "", label: "", type: "custom", multiselect: true, options: [], dropdownType: { type: "custom", uri: 1002 } },
    //         { id: "id", "value": "", label: "", type: "custom", multiselect: true, options: [], dropdownType: { type: "custom", uri: 1019 } },
    //         // { id: "id", "value": "", label: "Deduction type", type: "select-fix", all: false, multiselect: true, dropdown: 27, options: [], dropdownType: { type: "fix", uri: 27 } },
    //         { id: "id", "value": "", label: "", type: "custom", multiselect: true, options: [], dropdownType: { type: "custom", uri: 1005 } },
    //         { "id": "", "value": "", "label": "Date From", "type": "date", "icon": "feather:edit-2", },
    //         { "id": "", "value": "", "label": "Date To", "type": "date", "icon": "feather:edit-2", },
    //         { id: "active", _value: "", label: "Loan Status", type: "select", all: false, multiselect: false, dropdown: 3, options: [{ dropdownID: 0, description: "Open" }, { dropdownID: 1, description: "Pause" }, { dropdownID: 1, description: "Close" }] },
    //     ],
    //     btn_search: true,
    //     btn_create: true,
    //     btn_export: true,
    // duplicate: false,//
    // btn_upload: true,
    //     btn_download: true,
    //     btn_delete: true,

    //     excludeExport: [],
    //     hasProcess: false,
    //     link: {
    //         uri: "/detail/employee-earnings/"
    //     },
    //     api: {
    //         uri: ""
    //     }
    // },
    {//leave-view
        type: "leave-view",
        title: "Leave View",
        rows: [
            { "title": "Leave Name", "column": "name", "defaultSort": true },
            { "title": "Description", "column": "description" },
            { "title": "Accrual", "column": "accrual" },
            { "title": "Total accrual", "column": "totalAccrual" },
            { "title": "Accrual increase", "column": "accrualIncrease" },
            { "title": "Prorate", "column": "prorate" },
            { "title": "carryForward", "column": "carryForward" },
            { "title": "convertToCash", "column": "convertToCash" },
            { "title": "Status", "column": "active" },
        ],
        filter: [
            { "id": "name", "value": "", "label": "Leave Name", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [""],
        hasProcess: false,
        link: {
            uri: "/detail/leave-detail/"
        },
        api: {
            uri: environment.apiUrl + "leave/getLeaveTypeTable"
        }
    },
    {//shift-codes
        type: "shift-codes",
        title: "Shift Codes",
        rows: [
            { "title": "Shift Code", "column": "shiftCode", "defaultSort": true },
            { "title": "Shift Name", "column": "shiftName" },
            { "title": "Description", "column": "description" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { "id": "shiftCode", "value": "", "label": "Shift Code", "type": "input", "icon": "feather:edit-2", },
            { "id": "shiftName", "value": "", "label": "Shift Name", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: ["EncryptId", "ShifidtId"],
        hasProcess: false,
        link: {
            uri: "/detail/shift-codes/"
        },
        api: {
            uri: environment.apiUrl + "shift/getShiftTable"
        }
    },
    {//shiftcodesperday-view
        type: "shiftcodesperday-view",
        title: "Shift Codes",
        rows: [
            { "title": "Shift Name", "column": "shiftName", "defaultSort": true },
            { "title": "Type", "column": "type" },
            { "title": "Sched In", "column": "timeIn" },
            { "title": "Sched Out", "column": "timeOut" },
        ],
        filter: [
            { "id": "shiftName", "value": "", "label": "Shift Name", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/shiftcodesperday-detail/"
        },
        api: {
            uri: environment.apiUrl + "shift/getShiftPerDayTable"
        }
    },
    {//payroll-cutoff-view
        type: "payroll-cutoff-view",
        title: "Payroll Cutoff View",
        rows: [
            { "title": "Payroll Cutoff Code", "column": "payrollCutoffCode", "defaultSort": true },
            { "title": "Description", "column": "description" },
            { "title": "Payroll Type", "column": "payrollType" },
            { "title": "Status", "column": "active" },
            { "title": "Created By", "column": "createdByDescription" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { "id": "payrollCutoffCode", "value": "", "label": "Payroll Cutoff Code", "type": "input", "icon": "feather:edit-2", },
            // { "id": "payrollType", "value": "", "label": "Payroll Type", "type": "input", "icon": "feather:edit-2", },
            { id: "payrollType", "value": "", label: "Payroll Type", type:"select-fix", all: false, multiselect: false, dropdown: 69, options: [], dropdownType: { type: "fix", uri: 69 } },

        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: ["encryptid", "headerId"],
        hasProcess: false,
        link: {
            uri: "/detail/payroll-cutoff-detail/"
        },
        api: {
            uri: environment.apiUrl + "category/getPayrollCutoffHeaderTable"
        }
    },
    {//news-announcements-view
        type: "news-announcements-view",
        title: "News-Announcements",
        rows: [
            { "title": "News Code", "column": "newsCode", "defaultSort": true },
            { "title": "Company", "column": [] = "newsCompany" },
            { "title": "Branch", "column": [] = "newsBranch" },
            { "title": "1007", "column": [] = "newsCategory" },
            { "title": "Department", "column": [] = "department" },
            { "title": "Title", "column": "title" },
            { "title": "Description", "column": "description" },
            { "title": "Date From", "column": "dateFrom" },
            { "title": "Date To", "column": "dateTo" },
            { "title": "Status", "column": "active" },
            { "title": "Created By", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { "id": "newsCode", "value": "", "label": "News Code", "type": "input", "icon": "feather:edit-2", },
            { "id": "title", "value": "", "label": "Title", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/news-announcements-detail/"
        },
        api: {
            uri: environment.apiUrl + "tenant/getNewsAnnouncementsTables"
        }
    },
    {//employee-list
        type: "employee-list",
        title: "Employee",
        rows: [
            { "title": "employeeCode", "column": "employeeCode" },
            { "title": "displayName", "column": "displayName", "defaultSort": true },
            { "title": "subCompany", "column": "subCompanyName" },
            { "title": "Branch", "column": "branchName" },
            { "title": "1007", "column": "categoryName" },
            { "title": "1008", "column": "accessName" },
            { "title": "Department", "column": "department" },
            { "title": "Supervisor", "column": "supervisorName" },
            { "title": "Employee status", "column": "employeeStatus" },
        ],
        filter: [
            { "id": "displayName", "value": "", "label": "Employee Name", "type": "input", "icon": "feather:edit-2", },
            { id: "employeeStatusInitial", "value": [93, 94, 12666, 30050, 30383], label: "Employee Status", type:"select-fix", all: false, multiselect: true, dropdown: 36, options: [], dropdownType: { type: "fix", uri: 37 } },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        btn_upload: true,
        btn_csv: true,
        action: true,
        view : true,
        edit : true,
        download: false,
        includeInactive: false,
        excludeExport: ["encryptid", "id"],
        hasProcess: false,
        link: {
            uri: "/detail/employee-detail/"
        },
        api: {
            uri: environment.apiUrl + "user/getEmployeeTable"
        }
    },
    {//category-list
        type: "category-list",
        title: "Category",
        rows: [
            { "title": "Category Code", "column": "categoryCode", "defaultSort": true },
            { "title": "Category Name", "column": "categoryName" },
            { "title": "Description", "column": "categoryDescription" },
            { "title": "active", "column": "active" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { "id": "categoryCode", "value": "", 'label': "Category Code", "type": "input", "icon": "feather:edit-2", },
            { "id": "categoryName", "value": "", "label": "Category Name", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: ["encryptId", "branchId"],
        hasProcess: false,
        link: {
            uri: "/detail/category-detail/"
        },
        api: {
            uri: environment.apiUrl + "category/getCategoryTable"
        }
    },
    {//employee-schedule-tagging
        type: "employee-schedule",
        title: "Employee Schedule",
        rows: [
            { "title": "Schedule Code", "column": "tagCode", "defaultSort": true, "orderBy": "desc" },
            { "title": "Date From", "column": "dateFromString" },
            { "title": "Date To", "column": "dateToString" },
            { "title": "TagType", "column": "tagTypeDescription" },
            { "title": "Created By", "column": "createdByDescription" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            {"id":"tagCode" ,"value": "", "label": "Schedule Code", "type": "input", "icon": "feather:edit-2"},
        ],
        btn_search: true,
        btn_create: true,
        btn_export: false,
        duplicate: false,
        btn_upload: true,
        action: true,
        view : true,
        edit : false,
        includeInactive: false,
        excludeExport: ["encryptId", "tagId", "shiftId"],
        hasProcess: true,
        link: {
            uri: "/detail/employee-schedule/"
        },
        api: {
            uri: environment.apiUrl + "shift/getEmployeeScheduleTagTable"
        }
    },
    {//employee-break-type
        type: "break-type-view",
        title: "Break Type",
        rows: [
            { "title": "Break Type Code", "column": "breakTypeCode", "defaultSort": true },
            { "title": "Description", "column": "description" },
            { "title": "dateCreated", "column": "dateCreated" },
            { "title": "Created By", "column": "createdByDescription" },
        ],
        filter: [
            { "value": "", "label": "Break Type Code", "type": "input", "icon": "feather:edit-2", },
            // { "value": "", "label": "", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/break-type/"
        },
        api: {
            uri: environment.apiUrl + "category/getBreakTypeTable"
        }
    },
    {//employee-timekeeping-category
        type: "timekeeping-category-view",
        title: "Timekeeping Category",
        rows: [
            { "title": "Tk Category Name", "column": "tkCategoryName", "defaultSort": true, "orderBy": "desc" },
            { "title": "Tk Category Code", "column": "tkCategoryCode" },
            { "title": "Description", "column": "tkCategoryDescription" },
            { "title": "dateCreated", "column": "dateCreated" },
            { "title": "Created By", "column": "createdBy" },
        ],
        filter: [
            {"id":"tkCategoryName", "value": "", "label": "Category Name", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/timekeeping-category/"
        },
        api: {
            uri: environment.apiUrl + "category/getTimekeepingCategoryTable"
        }
    },
    {//ACCESS-CONTROL
        type: "access-control-list",
        title: "Access Control",
        rows: [
            { "title": "name",   "column": "name", "defaultSort": true },
            { "title": "Description",   "column": "description" },
            { "title": "Active",        "column": "active" },
            { "title": "Created By",  "column": "createdBy" },
            { "title": "dateCreated",  "column": "dateCreated" }
        ],
        filter: [
            { "id": "name", "value": "", "label": "Access Name", "type": "input", "icon": "feather:search", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        excludeExport: [],
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        hasProcess: false,
        link: {
            uri: "/detail/access-control/"
        },
        api: {
            uri: environment.apiUrl + "tenant/getAccessControlTable"
        }
    },
    {//approval-process
        type: "approval-process",
        title: "Approval Process",
        rows: [
            { "title": "Approval Code", "column": "approvalCode", "defaultSort": true },
            { "title": "Approval Name", "column": "name" },
            { "title": "levelOfApproval", "column": "levelOfApproval" },
            { "title": "active", "column": "active" },
            { "title": "dateCreated", "column": "dateCreated" },
            { "title": "Created By", "column": "createdBy" },
        ],
        filter: [
            { "id":"name", "value": "", "label": "Approval Name", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/approval-process/"
        },
        api: {
            uri: environment.apiUrl + "tenant/getApprovalWorkflowTable"
        }
    },
    {//TK generation
        type: "timekeeping-generation-view",
        title: "Timekeeping",
        rows: [
            { "title": "Timekeeping Code", "column": "timekeepingCode", "defaultSort": true, orderBy: "desc" },
            { "title": "Date From", "column": "dateFrom" },
            { "title": "Date To", "column": "dateTo" },
            { "title": "Type", "column": "type" },
            { "title": "Created By", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },
            { "title": "active", "column": "active" },
        ],
        filter: [
            // { "id": "branchCode", "value": "", "label": "Branch Code", "type": "input", "icon": "feather:edit-2", },
            { "id": "timekeepingCode", "value": "", "label": "Timekeeping Code", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        tkGeneration: true,
        excludeExport: [""],
        link: {
            uri: "/detail/timekeeping-generation/"
        },
        api: {
            uri: environment.apiUrl + "timekeeping/getTimekeepingTable"
        }
    },
    {//employee-break-type
        type: "filing",
        title: "filling",
        rows: [
            { "title": "Code", "column": "code", "defaultSort": true },
            { "title": "Date from", "column": "dateFrom" },
            { "title": "Date to", "column": "dateTo" },
            { "title": "Reason", "column": "reason" },
            { "title": "Status", "column": "status" },
            { "title": "approval", "column": "approval" },
            { "title": "approvalDate", "column": "approvalDate" },
            { "title": "requestedBy", "column": "requestedBy" },
            { "title": "requestDate", "column": "requestedDate" },
        ],
        filter: [
            { "id": "filingType", "value": "", "label": "Filing type", "type": "input", "icon": "feather:edit-2", },
            { "id": "dateFrom", "value": "", "label": "Date from", "type": "input", "icon": "feather:edit-2", },
            { "id": "dateTo", "value": "", "label": "Date to", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            // uri: "/detail/filing/"
        },

        api: {
        }
    },
    {//Statutory
        type: "setup",
        title: "Statutory",
        rows: [
            { "title": "1007", "column": "type", "defaultSort": true },
            { "title": "name", "column": "name"},
            { "title": "Description", "column": "description" },
            { "title": "Created By", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },
            { "title": "Status", "column": "status" },

        ],
        filter: [
            { "id": "type", "value": "", "label": "Statutory", "type": "select", "icon": "feather:search", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: ["encryptId","id"],
        hasProcess: false,
        link: {
            uri: "/detail/setup/",
            adds: "type", // from rows > column
        },
        api: {
            uri: environment.apiUrl + "payroll/getDynamicStatutoryTable"
        }
    },
    {//pay-codes
        type: "pay-codes",
        title: "Pay Codes",
        rows: [
            { "title": "Code", "column": "code", "defaultSort": true },
            { "title": "Description", "column": "description" },
            { "title": "1007", "column": "category" },
            { "title": "Type", "column": "type" },
            { "title": "Status", "column": "status" },
            { "title": "Created By", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },

        ],
        filter: [
            { id: "type", "value": "", label: "Pay Code Type", type: "select", all: false, multiselect: false, dropdown: 16, options: [{dropdownID: "Earnings", description:"Earnings"},{dropdownID: "Deduction", description:"Deduction"},{dropdownID: "Loan", description:"Loan"}], dropdownType: { type: "fix", uri: 16 } },
            { "id": "code",         "value": "", "label": "Code",         "type": "input", "icon": "feather:edit-2", },
            { "id": "description",  "value": "", "label": "Description",   "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: false,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/pay-codes/",
            adds: "type" // from rows > column
        },
        api: {
            uri: environment.apiUrl + "payroll/getLookupPayCodesTable"
        }
    },
    {//payroll-category
        type: "payroll-category",
        title: "Payroll Category",
        rows: [
            { "title": "Code", "column": "code", "defaultSort": true },
            { "title": "Description", "column": "description" },
            { "title": "factorRate", "column": "factorRate" },
            { "title": "Status", "column": "status" },
            { "title": "Created By", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { "id": "code", "value": "", "label": "Code", "type": "input", "icon": "feather:edit-2", },
            { "id": "description", "value": "", "label": "Description", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/payroll-category/"
        },
        api: {
            uri: environment.apiUrl + "payroll/getPayrollCategoryTable"
        }
    },
    {
        type: "loans-view",
        title: "Loans",
        rows: [
            { "title": "Emp ID", "column": "employeeCode", "defaultSort": true },
            { "title": "name", "column": "employeeName" },
            { "title": "Type", "column": "typeCode" },
            { "title": "Start Date", "column": "startDate" },
            { "title": "Frequency", "column": "frequency" },
            { "title": "Loan Amount", "column": "loanAmount" },
            { "title": "Amortization", "column": "amortization" },
            { "title": "Loan Status", "column": "loanStatus" },
            { "title": "Created by", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { key: "tagType",label: "", type: "e-hierarchy", showtag : false, all: true, multiselect: true, tagType: [{id:[],type:-1},{id:[],type:-2},{id:[],type:-4}]},
            { id: "typeId", "value": "", label: "", type: "custom", all: true, multiselect: true, options: [], dropdownType: { type: "custom", uri: 1016 } },
            { id: "recurringStart", "value": "", "label": "Date From", "type": "date", "icon": "feather:edit-2", },
            { id: "recurringEnd", "value": "", "label": "Date To", "type": "date", "icon": "feather:edit-2", },
            { id: "statusId", "value": "", label: "Status", type: "select", all: false, multiselect: false, dropdown: 3, options: [{ dropdownID: 1, description: "Open" }, { dropdownID: 3, description: "Pause" }, { dropdownID: 2, description: "Close" }] },
        ],
        btn_search: true,
        btn_reload: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        btn_upload: true,
        btn_download: false,
        btn_delete: true,
        action: true,
         view : true,
        edit : true,
        includeInactive: true,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/payroll-loans-detail/"
        },
        api: {
            uri: environment.apiUrl + "payroll/getPayrollLoansTable"
        },
        api_delete: {
            uri: environment.apiUrl + "payroll/postDeleteLoans",
        }

    },
    {
        type: "deductions-view",
        title: "Deductions",
        rows: [
            { "title": "Emp ID", "column": "employeeCode", "defaultSort": true },
            { "title": "name", "column": "employeeName" },
            { "title": "Type", "column": "typeCode" },
            { "title": "recurringStart", "column": "recurringStart" },
            { "title": "recurringEnd", "column": "recurringEnd" },
            { "title": "amount", "column": "amount" },
            { "title": "Frequency", "column": "frequency" },
            { "title": "Status", "column": "status" },
            { "title": "remarks", "column": "remarks" },
            { "title": "Created by", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { key: "tagType", label: "", type: "e-hierarchy", showtag : false,  all: true, multiselect: true, tagType: [{id:[],type:-1},{id:[],type:-2},{id:[],type:-4}]},
            { id: "typeId", "value": "", label: "", type: "custom", all: true, multiselect: true, options: [], dropdownType: { type: "custom", uri: 1019 } },
            { id: "recurringStart", "value": "", "label": "Date From", "type": "date", "icon": "feather:edit-2", },
            { id: "recurringEnd", "value": "", "label": "Date To", "type": "date", "icon": "feather:edit-2", },
            { id: "statusId", "value": "", label: "Status", type: "select", all: false, multiselect: false, dropdown: 3, options: [{ dropdownID: 1, description: "Open" }, { dropdownID: 3, description: "Pause" }, { dropdownID: 2, description: "Close" }] },
        ],
        btn_search: true,
        btn_reload: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        btn_upload: true,
        btn_download: false,
        btn_delete: true,
        action: true,
         view : true,
        edit : true,
        includeInactive: true,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/payroll-deductions-detail/"
        },
        api: {
            uri: environment.apiUrl + "payroll/getPayrollDeductionsTable"
        },
        api_delete: {
            uri: environment.apiUrl + "payroll/postDeleteDeductions",
        }
    },
     {//schedule
        type: "schedule",
        title: "Schedule",
        rows: [
            { "title": "Schedule Code", "column": "tagCode", "defaultSort": true },
            { "title": "Date From", "column": "dateFromString" },
            { "title": "Date To", "column": "dateToString" },
            { "title": "TagType", "column": "tagTypeDescription" },
            { "title": "Created By", "column": "createdByDescription" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { "value": "", "label": "Shift Name", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: ["encryptId", "tagId", "shiftId"],
        hasProcess: true,
        link: {
            uri: "/detail/schedule/"
        },
        api: {
            uri: environment.apiUrl + "shift/getEmployeeScheduleTagTable"
        }
    },
    {//file-on-behalf
        type: "file-on-behalf",
        title: "File On Behalf",
        rows: [
            { "title": "employeeCode", "column": "employeeCode", "defaultSort": true },
            { "title": "employeeName", "column": "employeeName"},
            { "title": "Date from", "column": "dateFrom" },
            { "title": "Date to", "column": "dateTo" },
            { "title": "Reason", "column": "reason" },
            { "title": "Status", "column": "status" },
            { "title": "approval", "column": "approval" },
            { "title": "approvalDate", "column": "approvalDate" },
            { "title": "requestedBy", "column": "requestedBy" },
            { "title": "requestDate", "column": "requestedDate" },
        ],
        filter: [
            { "id": "filingType", "value": "", "label": "Filing type", "type": "select", "icon": "feather:edit-2", },
            { "id": "employeeName", "value": "", "label": "Employee Name", "type": "select", "icon": "feather:edit-2", },
            { "id": "dateFrom", "value": "", "label": "Date from", "type": "input", "icon": "feather:edit-2", },
            { "id": "dateTo", "value": "", "label": "Date to", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/file-on-behalf/"
        },
        api: {
        }
    },
    {//ded hierarchy
        type: "deduction-hierarchy",
        title: "Ded Hierarchy",
        rows: [
            { "title": "Hierarchy Name", "column": "name", "defaultSort": true},
            { "title": "Description", "column": "description"},
            { "title": "dateCreated", "column": "dateCreated"},
            { "title": "Created By", "column": "createdBy"},
        ],
        filter: [
            { "id": "Name", "value": "", "label": "Hierarchy Name", "type": "input", "icon": "feather:edit-2", },

        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/deduction-hierarchy/"
        },
        api: {
            uri: environment.apiUrl + "payroll/getDeductionsHierarchyTable"
        }
    },
    {//Rates
        type: "rates",
        title: "Rates",
        rows: [
            { "title": "Code", "column": "code", "defaultSort": true},
            { "title": "Description", "column": "description"},
            { "title": "Status", "column": "active"},
            { "title": "dateCreated", "column": "dateCreated"},
            { "title": "Created By", "column": "createdBy"},
        ],
        filter: [
            { "id": "code", "value": "", "label": "Code", "type": "input", "icon": "feather:edit-2", },
            { "id": "description", "value": "", "label": "Description", "type": "input", "icon": "feather:edit-2", },

        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: true,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/rates/"
        },
        api: {
            uri: environment.apiUrl + "payroll/getLookupRateTypeTable"
        }
    },
    {
        type: "assign-requirments",
        title: "Assign Requirments",
        rows: [
            { "title": "Rquirements Name", "column": "employeeCode", "defaultSort": true },
            { "title": "Occupation", "column": "employeeName" },
            { "title": "Created By", "column": "typeCode" },
            { "title": "dateCreated", "column": "recurringStart" },
            { "title": "Status", "column": "recurringEnd" },
        ],
        filter: [
            { "id": "filingType", "value": "", "label": "Search", "type": "input", "icon": "feather:edit-2", },

        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/assign-requirments/"
        },
        api: {
        }
    },
    // {
    //     type: "pre-approve-ot",
    //     title: "Pre Approve OT",
    //     rows: [
    //         { "title": "Rquirements Name", "column": "Code", "defaultSort": true },
    //         { "title": "Occupation", "column": "Type" },
    //         { "title": "Created By", "column": "OT Start" },
    //         { "title": "dateCreated ", "column": "OT End" },
    //         { "title": "Status", "column": "Created By" },
    //         { "title": "Status", "column": "Date Created" },
    //     ],
    //     filter: [
    //         { "id": "filingType", "value": "", "label": "Code", "type": "input", "icon": "feather:edit-2", },

    //     ],
    //     btn_search: true,
    //     btn_create: true,
    //     btn_export: true,
    //     duplicate: false,
    //     action: true,
    //      view : true,
    //     edit : true,
    //     includeInactive: false,
    //     excludeExport: [],
    //     hasProcess: false,
    //     link: {
    //         // uri: "/detail/pre-approve-ot/"
    //     },
    //     api: {
    //     }
    // },
    { //payroll-run
        type: "payroll-run-view",
        title: "Payroll Run",
        rows: [
            { "title": "Code", "column": "payrollCode", "defaultSort": true , "orderBy":'desc',"hide":false},
            { "title": "69", "column": "payoutType", },
            { "title": "payrollCutoff", "column": "payrollCutoff" },
            { "title": "Company", "column": "company" },
            { "title": "Branch", "column": "branch" },
            { "title": "Cutoff", "column": "cutoff" },
            { "title": "Cutoff Year", "column": "year" },
            { "title": "Cutoff Month", "column": "month" },
            { "title": "payoutDate", "column": "payoutDate" },
            { "title": "dateCreated", "column": "dateCreated" },
            { "title": "Created By", "column": "createdBy" },
        ],
        filter: [
            { "id": "PayrollCode", "value": "", "label": "Code", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        btn_delete: true,
        action: true,
        view : true,
        edit : true,
        upload : true,
        clear: true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/payroll-run/"
        },
        api: {
            uri: environment.apiUrl + "payroll/getPGMainTable"
        },
         api_delete: {
            uri: environment.apiUrl + "payroll/postPGMDelete",
        }
    },{
        type: "earnings-view",
        title: "Earnings",
        rows: [
            { "title": "Emp ID", "column": "employeeCode", "defaultSort": true },
            { "title": "Name", "column": "employeeName" },
            { "title": "Type", "column": "typeCode" },
            { "title": "Recurring Start", "column": "recurringStart" },
            { "title": "recurringEnd", "column": "recurringEnd" },
            { "title": "amount", "column": "amount" },
            { "title": "Frequency", "column": "frequency" },
            { "title": "Status", "column": "status" },
            { "title": "remarks", "column": "remarks" },
            { "title": "Created by", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { key: "tagType", label: "", type: "e-hierarchy", showtag : false,  all: true, multiselect: true, tagType: [{id:[],type:-1},{id:[],type:-2},{id:[],type:-4}]},
            { id: "typeId", "value": "", label: "", type: "custom", all: true, multiselect: true, options: [], dropdownType: { type: "custom", uri: 1022 } },
            { id: "recurringStart", "value": "", "label": "Date From", "type": "date", "icon": "feather:edit-2", },
            { id: "recurringEnd", "value": "", "label": "Date To", "type": "date", "icon": "feather:edit-2", },
            { id: "statusId", "value": "", label: "Status", type: "select", all: false, multiselect: false, dropdown: 3, options: [{ dropdownID: 1, description: "Open" }, { dropdownID: 3, description: "Pause" }, { dropdownID: 2, description: "Close" }] },
        ],
        btn_search: true,
        btn_reload: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        btn_upload: true,
        btn_download: false,
        btn_delete: true,
        action: true,
         view : true,
        edit : true,
        includeInactive: true,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/payroll-earnings-detail/"
        },
        api: {
            uri: environment.apiUrl + "payroll/getPayrollEarningsTable"
        },
        api_delete: {
            uri: environment.apiUrl + "payroll/postDeleteEarnings",
        }
    },
    {//employee-location
        type: "employee-location",
        title: "Employee Location",
        rows: [
            { "title": "employeeCode", "column": "employeeCode", "defaultSort": true },
            { "title": "employeeName", "column": "employeeName" },
            { "title": "Date", "column": "dateFrom" },
            { "title": "location", "column": "location" },
            { "title": "Created By", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { id: "dateFrom", "value": "", "label": "Date From", "type": "date", "icon": "feather:edit-2", },
            { id: "dateTo", "value": "", "label": "Date To", "type": "date", "icon": "feather:edit-2", },
            // { id: "code", "value": "", label: "Code", type: "select", all: false, multiselect: false, dropdown: 3, options: [] },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        duplicate: false,
        btn_upload: true,
        action: false,
        includeInactive: false,
        excludeExport: ["encryptId", "locationId"],
        hasProcess: false,
        link: {
            uri: "/detail/employee-location/"
        },
        api: {
            uri: environment.apiUrl + "user/getAssignLocationTable"
        },

    },{///////payreg-code
        type: "payreg-code-view",
        title: "Payreg Code",
        rows: [
            { "title": "ID", "column": "id", "defaultSort": true, "orderBy":'ASC', "hide":true },
            { "title": "Code", "column": "code"},
            { "title": "Description", "column": "description" },
            { "title": "1030", "column": "jeAccountCode" },
            { "title": "1031", "column": "jeAccountId" }
        ],
        filter: [
            { "id": "payregCode", "value": "", "label": "Payreg Code", "type": "input", "icon": "feather:edit-2"},
        ],
        btn_search: true,
        btn_create: false,
        btn_export: true,
        duplicate: false,
        btn_upload: false,
        btn_download: false,
        btn_delete: false,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/payreg-code/"
        },
        api: {
            uri: environment.apiUrl + "payroll/getLookupPayRegTable"
        }
    },
    { //payroll-uploads
        type: "payroll-uploads",
        title: "Payroll Uploads",
        rows: [
            { "title": "Code", "column": "payrollCode", "defaultSort": true , "orderBy":'desc',"hide":false},
            { "title": "69", "column": "payoutType", },
            { "title": "payrollCutoff", "column": "payrollCutoff" },
            { "title": "Company", "column": "company" },
            { "title": "cutOff", "column": "cutoff" },
            { "title": "Cutoff Year", "column": "year" },
            { "title": "Cutoff Month", "column": "month" },
            { "title": "payoutDate", "column": "payoutDate" },
            { "title": "dateCreated", "column": "dateCreated" },
            { "title": "Created By", "column": "createdBy" },
        ],
        filter: [
            { "id": "PayrollCode", "value": "", "label": "Code", "type": "input", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: false,
        btn_export: false,
        duplicate: false,
        btn_delete: false,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/payroll-run/"
        },
        api: {
            uri: environment.apiUrl + "payroll/getPGMainTable"
        },
         api_delete: {
            uri: environment.apiUrl + "payroll/postPGMDelete",
        }
    },
    {
        type: "EDC-view",
        title: "EDC",
        rows: [
            { "title": "employeeCode",    "column": "employeeCode" ,moduleId: [142,209]},
            { "title": "employeeName",    "column": "employee"     ,moduleId: [142,209]},
            { "title": "fieldName",       "column": "fieldName"    ,"defaultSort": true},
            { "title": "currentData",     "column": "oldValue"         },
            { "title": "Change To",        "column": "newValue"         },
            { "title": "effectivityDate", "column": "effectiveDate"    },
            { "title": "Reason",           "column": "reason"           },
            { "title": "Status",           "column": "status"           },
            { "title": "approvedBy",       "column": "approvedBy"       },
            { "title": "approvalDate",    "column": "approvalDate"     },
            { "title": "requestedBy",     "column": "requestedBy"      },
            { "title": "requestDate",   "column": "requestDate"      },
        ],
        filter: [
            { key: "tagType", label: "",moduleId:[142,209] ,type: "e-hierarchy", showtag : false, isExcluded: false,  all: true, multiselect: true, tagType: [{id:[],type:-2},{id:[],type:-3},{id:[],type:-4}]},
            { id: "fieldName", value:"", label: "", type: "custom", isExcluded: false, reset: false, dropdownValue :'description', all: true, multiselect: true, options: [], dropdownType: { type: "custom", uri: 1056 } },
            { id: "dateFrom", "value": "", "label": "Date From", "type": "date", "icon": "feather:edit-2", },
            { id: "dateTo", "value": "", "label": "Date To", "type": "date", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_reload: false,
        btn_create: true,
        btn_export: true,
        btn_upload: false,
        btn_download: false,
        btn_delete: false,
        action: true,
        edit: true,
        cancel: true,
        view: true,
        includeInactive: true,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/emplo-data-change/"
        },
        api: {
            uri: environment.apiUrl + "filing/getEmployeeDataChangeFilingTable"
        },
        api_delete: {
            // uri: environment.apiUrl + "payroll/postDeleteLoans",
        }
    },
    {
        type: "assign-requirements",
        title: "Assign Requirments",
        rows: [
            { "title": "Requirements Name", "column": "name", "defaultSort": true },
            { "title": "Requirements", "column": "requirementDescription", "defaultSort": true },
            { "title": "Created By", "column": "createdBy" },
            { "title": "dateCreated", "column": "dateCreated" },
        ],
        filter: [
            { "id": "filingType", "value": "", "label": "Search", "type": "input", "icon": "feather:edit-2", },

        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        action: true,
         view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/assign-requirements/"
        },
        api: {
            uri: environment.apiUrl + "user/getE201RequirementTable"
        }
    },
    {
        type: "filing-view",
        title: "filing",
        rows: [
            { "title": "Code", "column": "code", "defaultSort": true },
            { "title": "employeeName", "column": "employee", "defaultSort": true },
            { "title": "Date From", "column": "dateFrom" },
            { "title": "Date To", "column": "dateTo" },
            { "title": "Shift Code", "column": "shiftCode" ,moduleId: [32,34] }, // for Cs and leave
            { "title": "Hours", "column": "offsetHours" ,moduleId: [37]}, // for offset
            { "title": "Leave Type", "column": "leaveType" ,moduleId: [34]}, // for offset
            { "title": "79", "column": "leaveFilingType" ,moduleId: [34]}, // for offset
            { "title": "Halfday Option", "column": "halfDayOption" ,moduleId: [34]}, // for offset
            { "title": "Paid", "column": "paid" ,moduleId: [34]}, // for offset
            { "title": "Reason", "column": "reason" },
            { "title": "Status", "column": "status" },
            { "title": "approvedBy", "column":     "approvedBy" },
            { "title": "approvalDate", "column":  "approvalDate" },
            { "title": "requestedBy", "column":   "requestedBy" },
            { "title": "requestDate", "column": "requestDate" },
        ],
        filter: [
            { id: "moduleId", value:'', label: "",  type: "custom", isExcluded: false, reset: false, dropdownValue :'dropdownID', all: false, multiselect: false, options: [], dropdownType: { type: "custom", uri: 1028 } },
            { id: "employeeId", value:'', label:"Employee",moduleId:[68], type: "custom", isExcluded: false, reset: false, dropdownValue :'dropdownID', all: false, multiselect: true, options: [], dropdownType: { type: "custom", uri: 1035 } },
            { id: "employeeId", value:'', label:"Employee",moduleId:[160], type: "custom", isExcluded: false, reset: false, dropdownValue :'dropdownID', all: false, multiselect: true, options: [], dropdownType: { type: "custom", uri: 1011 } },
            { id: "dateFrom", "value": "", "label": "Date From", "type": "date", "icon": "feather:edit-2", },
            { id: "dateTo", "value": "", "label": "Date To", "type": "date", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        action: true,
        view : true,
        edit : true,
        cancel : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/filing/",
        },
        api: {
            uri: environment.apiUrl + "filing/getFilingTable"
        }
    },
    {
        type: "pre-approve-list",
        title: "Pre-Approved Overtime",
        rows: [
            { "title": "Code", "column": "code", "defaultSort": true },
            { "title": "employeeName", "column": "employee", "defaultSort": true },
            { "title": "Time", "column": "isDuration" },
            { "title": "Date From", "column": "dateFrom" },
            { "title": "Date To", "column": "dateTo" },
            // { "title": "Leave Type", "column": "leaveType" },
            // { "title": "Shift Code", "column": "shiftCode" },
            // { "title": "Hours", "column": "offsetHours" },
            { "title": "Reason", "column": "reason" },
            { "title": "Status", "column": "status" },
            { "title": "requestedBy", "column": "requestedBy" },
            { "title": "requestDate", "column": "requestDate" },
        ],
        filter: [
            { id: "employeeId", value:'', label: "",moduleId:[99], type: "custom", isExcluded: false, reset: false, dropdownValue :'dropdownID', all: true, multiselect: true, options: [], dropdownType: { type: "custom", uri: 1035 } },
            { id: "employeeId", value:'', label: "Employee",moduleId:[159], type: "custom", isExcluded: false, reset: false, dropdownValue :'dropdownID', all: true, multiselect: true, options: [], dropdownType: { type: "custom", uri: 1011 } },
            { id: "dateFrom",   value:'', label: "Date From", "type": "date", "icon": "feather:edit-2", },
            { id: "dateTo",     value:'', label: "Date To", "type": "date", "icon": "feather:edit-2", },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        action: true,
        view : true,
        edit : false,
        cancel: true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/pre-approve-ot/",
        },
        api: {
            uri: environment.apiUrl + "filing/getFilingTable"
        }
    },
    {
        type: "statutory-view",
        title: "Statutory",
        rows: [
            { "title": "1007", "column": "type", "defaultSort": true },
            { "title": "Name", "column": "name", "defaultSort": true },
            { "title": "Description", "column": "description" },
            { "title": "Created By", "column": "createdBy" },
            { "title": "Created Date", "column": "dateCreated" },
            { "title": "Status", "column": "status" },
        ],
        filter: [
            { id: "typeId", "value": "", label: "Statutory", type:"select-fix", all: false, multiselect: false, dropdown:125, options: [], dropdownType: { type: "fix", uri: 125 } },
        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/setup/",
        },
        api: {
            uri: environment.apiUrl + "payroll/getDynamicStatutoryTable"
        }
    },
    {
        type: "e201",
        title: "e201",
        rows: [
            { "title": "employeeId", "column": "employeeCode", "defaultSort": true },
            { "title": "Display Name", "column": "displayName", "defaultSort": true },
            { "title": "Company", "column": "subCompanyName" },
            { "title": "Branch", "column": "branchName" },
            { "title": "Department", "column": "department" },
            { "title": "1007", "column": "categoryName" },
            { "title": "Occupation	", "column": "occupation" },
            { "title": "Employee Status", "column": "employeeStatus" },
        ],
        filter: [
            { key: "tagType",label: "", type: "e-hierarchy", showtag : true,  all: true, multiselect: true, tagType: []},
        ],
        btn_search: true,
        btn_create: false,
        btn_export: true,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/e201/",
        },
        api: {
            uri: environment.apiUrl + "user/getEmployeeTable"
        }
    },

    {//assign with break type
        type: "assign-break",
        title: "Employee Schedule with Break",
        rows: [
            { "title": "Schedule Code", "column": "tagCode", "defaultSort": true, "orderBy": "desc" },
            { "title": "Date From", "column": "dateFromString" },
            { "title": "Date To", "column": "dateToString" },
            { "title": "TagType", "column": "tagTypeDescription" },
            { "title": "Created By", "column": "createdByDescription" },
            { "title": "Date Created", "column": "dateCreated" },
        ],
        filter: [
            {"id":"tagCode" ,"value": "", "label": "Schedule Code", "type": "input", "icon": "feather:edit-2"},
        ],
        btn_search: true,
        btn_create: true,
        btn_export: false,
        duplicate: false,
        btn_upload: true,
        action: true,
        view : true,
        edit : false,
        includeInactive: false,
        excludeExport: ["encryptId", "tagId", "shiftId"],
        hasProcess: true,
        link: {
            uri: "/detail/assign-break/"
        },
        api: {
            uri: environment.apiUrl + "shift/getEmployeeScheduleTagTable"
        }
    },

     {//Dynamic Headers Upload
        type: "dynamicdropdown",
        title: "Map Your Own Template",
        rows: [
            { "title": "Code", "column": "code", "defaultSort": true},
            { "title": "Description", "column": "description"},
            { "title": "dateCreated", "column": "dateCreated"},
            { "title": "Created By", "column": "createdBy"},
        ],
        filter: [
            { "id": "code", "value": "", "label": "Code", "type": "input", "icon": "feather:edit-2", },
            { "id": "description", "value": "", "label": "Description", "type": "input", "icon": "feather:edit-2", },

        ],
        btn_search: true,
        btn_create: true,
        btn_export: true,
        btn_delete: true,
        duplicate: false,
        action: true,
        view : true,
        edit : true,
        includeInactive: false,
        excludeExport: [],
        hasProcess: false,
        link: {
            uri: "/detail/dynamic-headers/",
        },
        api: {
            uri: environment.apiUrl + "file/getDynamicHeaderTemplateTable"
        },
        api_delete: {
           uri: environment.apiUrl + "file/postDeleteDynamicHeaderTemplate",
       }
    },
]
