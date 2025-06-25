import { environment } from "environments/environment";

var uri = environment.apiUrl
//#region interface & class
export class DropdownRequest {
    search: string = ""
    start:  number = 0
    length: number = 20
    id: DropdownID [] = [new DropdownID]
    includeInactive: boolean = false
}

export class DropdownID {
    dropdownID: number = 0
    dropdownTypeID: number = 0
}
export interface dropdownCustomType {
    type: number
    label: string
    uri: string
}
//#endregion

export const dropdownCustomType = [
    { type: 1000,  dropdownType: 30048,  label: "Break Type",                 uri: uri + "category/getBreakTypeDropdown"                  },
    { type: 1001,  dropdownType: 0,      label: "Company",                    uri: uri + "tenant/getSubCompanyDropdown"                   },
    { type: 1002,  dropdownType: 0,      label: "Branch",                     uri: uri + "tenant/getBranchDropdown"                       },
    { type: 1003,  dropdownType: 0,      label: "Dropdown Name",              uri: uri + "master/getDropdownType"                         },
    { type: 1004,  dropdownType: 0,      label: "Dropdown Entrys",             uri: uri + "tenant/getDropdown"                             },
    { type: 1005,  dropdownType: 0,      label: "Employee Name",              uri: uri + "user/getEmployeesDropdown"                       },
    { type: 1006,  dropdownType: 0,      label: "Company",                    uri: uri + "tenant/getSubCompanyDropdown"                   },
    { type: 1007,  dropdownType: 0,      label: "Category",                   uri: uri + "category/getCategoryDropdown"                   },
    { type: 1008,  dropdownType: 0,      label: "Access Control",             uri: uri + "tenant/getAccessControlDropdown"                },
    { type: 1009,  dropdownType: 0,      label: "Payroll Category",           uri: uri + "payroll/getPayrollCategoryDropdown"             },
    { type: 1010,  dropdownType: 0,      label: "HMO",                        uri: uri + "tenant/getSubCompanyDropdown"                   },  //no api
    { type: 1011,  dropdownType: 0,      label: "Supervisor",                 uri: uri + "user/getEmployeeDropdown"                       },
    { type: 1012,  dropdownType: 0,      label: "TimeKeeping",                uri: uri + "category/getTimekeepingCategoryDropdown"        },
    { type: 1013,  dropdownType: 0,      label: "Payroll",                    uri: uri + "payroll/getPayrollCategoryDropdown"             },
    { type: 1014,  dropdownType: 0,      label: "Subsidiary",                 uri: uri + "tenant/getSubCompanyDropdown"                   },
    { type: 1015,  dropdownType: 0,      label: "ModuleLogs",                 uri: uri + "master/getModuleLogsDropdown"                   },
    { type: 1016,  dropdownType: 0,      label: "Loan-type",                  uri: uri + "payroll/getLookupLoansTypeDropdown"             },
    { type: 1017,  dropdownType: 0,      label: "Leave Type",                 uri: uri + "leave/getLeaveTypeDropdown"                     },
    { type: 1018,  dropdownType: 0,      label: "Cut-Off",                    uri: uri + "category/getPayrollCutoffHeaderDropdown"        },
    { type: 1019,  dropdownType: 0,      label: "Deduction",                  uri: uri + "payroll/getLookupDeductionsTypeDropdown"        },
    { type: 1020,  dropdownType: 0,      label: "Attendance",                 uri: uri + "payroll/getLoghoursDropdown"                    },
    { type: 1021,  dropdownType: 0,      label: "Deduction",                  uri: uri + "payroll/getLookupDeductionsTypeDropdown"        },
    { type: 1022,  dropdownType: 0,      label: "Earnings",                   uri: uri + "payroll/getLookupEarningsTypeDropdown"          },
    { type: 1023,  dropdownType: 0,      label: "Payroll Cut-off",            uri: uri + "category/getPayrollCutoffHeaderDropdown"        },
    { type: 1024,  dropdownType: 0,      label: "SSS",                        uri: uri + "payroll/getSSSDropdown"                         },
    { type: 1025,  dropdownType: 0,      label: "HDMF",                       uri: uri + "payroll/getHDMFDropdown"                        },
    { type: 1026,  dropdownType: 0,      label: "PHIC",                       uri: uri + "payroll/getPHICDropdown"                        },
    { type: 1027,  dropdownType: 0,      label: "TAX",                        uri: uri + "payroll/getTAXDropdown"                         },
    { type: 1028,  dropdownType: 0,      label: "Filing Type",                uri: uri + "filing/getFilingModulesDropdown"                },
    { type: 1029,  dropdownType: 0,      label: "Deduct",                     uri: uri + "payroll/getLoghoursDropdown"                    },
    { type: 1030,  dropdownType: 0,      label: "Account Code",               uri: uri + "master/getDropdownType"                         },
    { type: 1031,  dropdownType: 0,      label: "Account Name",               uri: uri + "master/getDropdownType"                         },
    { type: 1032,  dropdownType: 0,      label: "Leave Type",                 uri: uri + "leave/getLeaveTypeDropdown"                     },
    { type: 1033,  dropdownType: 0,      label: "Employee",                   uri: uri + "user/getSupervisorDropdown"                     },
    { type: 1034,  dropdownType: 0,      label: "Leave Type",                 uri: uri + "leave/getLeaveTypeCategoryDropdown"             },
    { type: 1035,  dropdownType: 0,      label: "Employee",                   uri: uri + "user/getSupervisorEmployee"                     },
    { type: 1036,  dropdownType: 0,      label: "Premium Rate Type",          uri: uri + "payroll/getLookupRateTypeDropdown"              },
    { type: 1037,  dropdownType: 30604,  label: "13th Month Pay",             uri: uri + "payroll/getBonusSetupDropdown"                  },
    { type: 1038,  dropdownType: 30605,  label: "14th Month Pay",             uri: uri + "payroll/getBonusSetupDropdown"                  },
    { type: 1039,  dropdownType: 30606,  label: "15th Month Pay",             uri: uri + "payroll/getBonusSetupDropdown"                  },
    { type: 1040,  dropdownType: 30607,  label: "16th Month Pay",             uri: uri + "payroll/getBonusSetupDropdown"                  },
    { type: 1041,  dropdownType: 0,      label: "Category",                   uri: uri + "payroll/getLookupEarningsCategoryDropdown"      },
    { type: 1042,  dropdownType: 0,      label: "Category",                   uri: uri + "payroll/getLookupDeductionsCategoryDropdown"    },
    { type: 1043,  dropdownType: 0,      label: "Category",                   uri: uri + "payroll/getLookupLoansCategoryDropdown"         },
    { type: 1044,  dropdownType: 30049,  label: "Break Type",                 uri: uri + "category/getBreakTypeDropdown"                  },
    { type: 1045,  dropdownType: 0,      label: "Approval Process",           uri: uri + "tenant/getApprovalWorkflowDropdown"             },
    { type: 1046,  dropdownType: 0,      label: "Report Name",                uri: uri + "tenant/getReportTypeDropdown"                   },
    { type: 1047,  dropdownType: 0,      label: "Include in Daily Rate",      uri: uri + "payroll/getLookupEarningsTypeDropdown"          },
    { type: 1048,  dropdownType: 0,      label: "Location",                   uri: uri + "user/getAssignLocationDropdown"                 },
    { type: 1049,  dropdownType: 0,      label: "Leave",                      uri: uri + "leave/getLeaveTypeDropdown"                     },
    { type: 1050,  dropdownType: 0,      label: "Recurring Earnings",         uri: uri + "payroll/getLookupEarningsTypeDropdown"          },
    { type: 1051,  dropdownType: 13,     label: "Employee",                   uri: uri + "tenant/getApprovalEmployeeDropdown"             },
    { type: 1052,  dropdownType: 13,     label: "Employee",                   uri: uri + "tenant/getApprovalApprovedDropdown"             },
    { type: 1053,  dropdownType: 0,      label: "Modules",                    uri: uri + "tenant/getACModulesDropdown"                    },
    { type: 1054,  dropdownType: 0,      label: "Requirments",                uri: uri + "user/getE201RequirementDropdown"                },
    { type: 1055,  dropdownType: 0,      label: "Module",                     uri: uri + "user/getMovementDropdownbyType"                 }, //E201 custome hierarchy
    { type: 1056,  dropdownType: 0,      label: "Fields",                     uri: uri + "filing/getFieldsKeyPropertiesDropDown"          },
    { type: 1057,  dropdownType: 0,      label: "OT start(min)",              uri: uri + "category/getCategoryOvertimeSpecificMinutesDropdown"},
    { type: 1058,  dropdownType: 90,     label: "Leave Category",             uri: uri + "payroll/getPayrollLeaveCategoryDropdown"        },
    { type: 1059,  dropdownType: 0,      label: "Filing Code",                uri: uri + "tenant/getApprovalPendingDropdown"              },
    { type: 1060,  dropdownType: 0,      label: "Deduction",                  uri: uri + "payroll/getDeductionsHierarchyListDropdown"     },
    { type: 1061,  dropdownType: 0,      label: "Deduction Hierarchy",                  uri: uri + "payroll/getPayCatDeductionHierarchyDropdown"     },
]
