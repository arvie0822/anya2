const enabled = [
    { id: 1, key: "today",   type: "Today",  enabled: true  },
    { id: 2, key: "week",    type: "Week",   enabled: true  },
    { id: 3, key: "cutoff",  type: "Cutoff", enabled: true  },
    { id: 4, key: "month",   type: "Month",  enabled: true  },
    { id: 5, key: "custom",  type: "Custom", enabled: true  },
]

const presets = [
    { id: 1, modal: "Application Status", type: "custom", dateFrom: new Date(sessionStorage.getItem("s")), dateTo: new Date(sessionStorage.getItem("e")), filingType: 0, status: "0", class: "AS",  enabled: [1,2,3,4,5]},
    { id: 2, modal: "Time Record",        type: "",       dateFrom: new Date(sessionStorage.getItem("s")), dateTo: new Date(sessionStorage.getItem("e")), filingType: 0, status: "0", class: "TR",  enabled: [1,2,3,4]  },
    { id: 3, modal: "Current TK",         type: "custom", dateFrom: new Date(sessionStorage.getItem("s")), dateTo: new Date(sessionStorage.getItem("e")), filingType: 0, status: "0", class: "CTK", enabled: [5]        },
    { id: 4, modal: "Adjustment TK",      type: "custom", dateFrom: new Date(sessionStorage.getItem("s")), dateTo: new Date(sessionStorage.getItem("e")), filingType: 0, status: "0", class: "ATK", enabled: [5]        },
    { id: 5, modal: "Payslip",            type: "custom", dateFrom: new Date(sessionStorage.getItem("s")), dateTo: new Date(sessionStorage.getItem("e")), filingType: 0, status: "0", class: "PAY", enabled: [5]        }
]

const custom = [
    //Application Status
    { id: 1, key: "date",   label: "Date",   type: "date-range", _value: null, option: [] },
    { id: 1, key: "type",   label: "Type",   type: "select",     _value: 0,    option: [] },
    { id: 1, key: "status", label: "Status", type: "select",     _value: 0,    option: [] },
    //Current TK
    { id: 3, key: "date",   label: "Year",   type: "date-range", _value: null, option: [] },
    //Adjustment TK
    { id: 4, key: "tkcode",   label: "TK Code",   type: "select",     _value: null, option: [] },
    // { id: 4, key: "month",  label: "Month",  type: "select",     _value: null, option: [] },
    // { id: 4, key: "cutoff", label: "Cutoff", type: "select",     _value: null, option: [] },
    //Payslip
    { id: 5, key: "payout",   label: "Payout Date",   type: "select", _value: null, option: [] },
]

export { presets ,enabled , custom }
