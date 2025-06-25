import { environment } from "environments/environment"
import  { mDatatable } from "./settings";

export const DatatableModal: mDatatable[] = [
    //#region Biometrics
    {
        type: "biometrics",
        title: "Biometrics",
        form: [
            { key: "biometricId",   label: "biometricId",     type: "number",       col: false, visible: false, _value: 0,    required: false, editable: false },
            // e-hierarchy
            // { key: "companyId",     label: "Company",         type: "custom",       col: false, visible: false, _value: null,    required: true, all: false,  multiselect: false, editable: true,  dropdownType: { type: "custom", uri: 1001 } },
            { key: "subCompanyId",  label: "Company",         type: "custom",       col: false, visible: true,  _value: null,    required: true, all: false,  multiselect: false,  editable: true,  dropdownType: { type: "custom", uri: 1001 } },
            { key: "branchId",      label: "Branch",          type: "d-hierarchy",  col: false, visible: true,  _value: null, required: true,    all: false,  multiselect: false,editable: true,  dropdownType: { type: "custom", uri: 1 , id: "subCompanyId", type_id: -1} },
            { key: "serialNumber",  label: "Serial Number",   type: "text",         col: false, visible: true,  _value: "",   required: true,  editable: true,  dropdownType: { type: "fix",    uri: 0    } },
            { key: "model",         label: "Model",           type: "text",         col: false, visible: false, _value: "",   required: true,  editable: true,  dropdownType: { type: "fix",    uri: 0    } },
            { key: "location",      label: "Location",        type: "text",         col: false, visible: true,  _value: "",   required: true,  editable: true,  dropdownType: { type: "fix",    uri: 0    } },
            { key: "groupId",       label: "Group",           type: "number",       col: false, visible: true,  _value: "",   required: false, editable: true,  dropdownType: { type: "fix",    uri: 0    } },
            { key: "status",        label: "Status",          type: "text",         col: false, visible: false, _value: "",   required: false, editable: true,  dropdownType: { type: "fix",    uri: 0    } },
            { key: "active",        label: "Active",          type: "select",       col: false, visible: true,  _value: true, required: false, editable: true,  dropdownType: { type: "fix",    uri: 0    }, dropdown: 305,options: [{dropdownID: true,description: "Active"},{dropdownID: false,description: "Inactive"}] },
        ],
        modal: [ // for modal fields
            { key: "employeeAttendance", label: "Employee Attendance",  type: "custom", all: true, multiselect: true, visible: true,  _value: 0, required: true,  editable: true,  dropdownType: { type: "custom", uri: 1005 } },
            { key: "dateFrom",           label: "Date From",            type: "date",   visible: true,  _value: new Date(), required: false, editable: true },
            { key: "dateTo",             label: "Date To",              type: "date",   visible: true,  _value: new Date(), required: false, editable: true },
        ],
        rows: [
            { title: "Action",        column: "action" ,      modal: true,  type: 'action' ,
                menu: [ // 'form' value from modal above and 'key' use for additional api below
                    {key: "edit",         _value: -1,   name: "Edit",                  modal: false, form: []},
                    {key: "bio_action",   _value: 0,    name: "Download",              modal: true,  form: ['employeeAttendance']},
                    {key: "bio_action",   _value: 1,    name: "Download Fingerprint",  modal: true,  form: ['employeeAttendance']},
                    {key: "bio_action",   _value: 5,    name: "Upload User",           modal: true,  form: ['employeeAttendance']},
                    {key: "bio_action",   _value: 6,    name: "Upload Fingerprint",    modal: true,  form: ['employeeAttendance']},
                    {key: "bio_action",   _value: 18,   name: "Resend Attendance",     modal: true,  form: ['employeeAttendance','dateFrom','dateTo']},
                ]
            },
            { title: "Company",       column: "subCompany",   modal: false, type: 'none', "defaultSort": true },
            { title: "Branch",        column: "branch",       modal: false, type: 'none'   },
            { title: "Serial Number", column: "serialNumber", modal: false, type: 'none'   },
            // { title: "Model",         column: "model",        modal: false, type: 'none'   },
            { title: "Location",      column: "location",     modal: false, type: 'none'   },
            { title: "Group",         column: "group",        modal: false, type: 'none'   },
            { title: "Active",        column: "active",       modal: false, type: 'none'   },
            { title: "Status",        column: "status" ,      modal: false, type: 'badge'  },
        ],
        filter: [
            { id: "subCompany",   _value: 0,    label: "Company",      all : false, multiselect: false ,type: "custom",      dropdownType: { type: "custom", uri: 1001                   } },
            { id: "branch",       _value: null, label: "Branch",        all : false, multiselect: false ,type: "d-hierarchy", dropdownType: { type: "custom", uri: 1,    id: "subCompany" ,type_id: -2 } },
            { id: "serialNumber", _value: "",   label: "Serial Number", multiselect: false ,type: "input",  },
        ],
        api: {
            table:      environment.apiUrl + "master/getBiometricDeviceTable",
            post:       environment.apiUrl + "master/postBiometricDevice",
            get:        environment.apiUrl + "master/getBiometricDevice",
            bio_action: environment.apiUrl + "attendance/postCommandRequest", // key from rows > action > menu
        },
        param: [//for '_menu' id will get '_value' of selected menu. //for '_default' id will get default value for any type
            { id: "_menu",                    key: "commandTypeId" , type: "number",   _value: 0           },
            { id: "modal.employeeAttendance", key: "employeeId"    , type: "list",     _value: []          },
            { id: "_default",                 key: "createdBy"     , type: "number",   _value: 0           },
            { id: "_default",                 key: "dateCreated"   , type: "date",     _value: new Date()  },
            { id: "modal.dateFrom",           key: "dateFrom"      , type: "date",     _value: ""          },
            { id: "modal.dateTo",             key: "dateTo"        , type: "date",     _value: ""          },
            { id: "rows.serialNumber",        key: "serialNumber"  , type: "string",   _value: ""          },
        ]
    },
    //#endregion
]
