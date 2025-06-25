// moduleId - module id from dynamicmenu (required)
// key - module name (optional)
// runv2 - 'true' to run uploading v2 api and 'false' to fun to uploading v1 (required)
// fixId - this fill if runv2 is 'false' (required if runv2 is false)

// New Instructions
//put here if document dropdown from dropdownFix only and v1 uploading

import { environment } from "environments/environment"

const setup = [
    { moduleId: '17',   key: "Employee",  fixId: [41,121,30015,30016]     }
    // { moduleId: '17',   key: "Employee",            runv1: true,      fixId: [41,121,30015,30016]     },
    // { moduleId: '81',   key: "Filing",              runv1: true,      fixId: [122,123,124,125,126,12] },
    // { moduleId: '83',   key: "Employee Schedule",   runv1: false,     fixId: [] },
    // { moduleId: '67',   key: "Leave Balance",       runv1: false,     fixId: [] },
    // { moduleId: '21',   key: "Time Log",            runv1: false,     fixId: [] },
    // { moduleId: '59',   key: "Earnings",            runv1: false,     fixId: [] },
    // { moduleId: '86',   key: "Loans",               runv1: false,     fixId: [] },
    // { moduleId: '58',   key: "Deductions",          runv1: false,     fixId: [] },
]


const csvSheet = [
    // { licenseKey: "sWRBvqImU7vYvXMFt7ePX2Tpg88o73", id: [30015, 41],  client: ['0001'], api: environment.apiUrl + "user/postCSVEmployee", },
    // { licenseKey: "HUmU3HgmAXH15K50gdl3WjuoHsTYT7", id: [30016, 121], client: ['0001'], api: environment.apiUrl + "user/postCSVEmployeeInformation", },
    { licenseKey: "6BsrzK3rhGmDoTzNt922r6fneE4yRA", moduleId: "26", caseId: 3 }, //Payroll Run
    { licenseKey: "dQx5FzcgJNQN70gKe7cVYMZp7iKDg4", moduleId: "17", caseId: 4 }, //Employee
]

export { setup , csvSheet }
