
//#region Datatable-Crud
interface DatatableSetting {
  type: string
  title: string
  form?: forms[]
  rows?: rows[]
  filter?: filter[]
  api: any
  excludeExport: string[]
  delete: {}
  btn_upload?: boolean
  refresh? : boolean
  export? : boolean
  btn_csv?: boolean
}
interface forms {
  key: string
  label: string
  type: 'select' | 'text' | 'number' | 'custom' | 'time' | 'date' | 'switch' | 'bool' | 'datepicker' | 'entitlement' | 'd-hierarchy' | 'static'
  type_id? : number
  visible: boolean
  _value?: any | null
  required: boolean
  editable: boolean
  dropdown?: number
  options?: options[]
  dropdownType?: dropdownType
  max?: number
  multiselect?: boolean
  class?: string
  all?: boolean
  dateFormat?: string
  dropdownValue?: string
  params?: any
  customRequest?: any
  isFix?: boolean
}
interface filter {
  id: string
  label: string
  _value?: any | null
  tagType?: [] | { id: any[]; type: number }[];
  type: 'input' | 'select' | 'custom' | 'select-fix' | 'entitlement' | 'static' | 'date' | 'e-hierarchy'
  multiselect?: boolean
  options?: options[]
  dropdownType?: dropdownType
  icon?: string
  dropdown?: number
  all?: boolean
  isFix?: boolean
}
interface options {
  dropdownID: number | boolean
  description: string
}
interface rows {
  title: string
  column: string
  defaultSort?: boolean
  referenceName?: boolean
}
interface dropdownType {
  type: 'custom' | 'fix' | 'dynamic' | 'static' | 'entitlement'
  type_id?: number
  uri: number
  id?: any // key where id from
  id_to?: any // key where id from
}

export { DatatableSetting, forms, filter, options, rows, dropdownType }
//#endregion

//#region Datatable-Modal
interface mDatatable {
  type: string
  title: string
  form?: mForms[]
  rows?: mRows[]
  modal?: mForms[]
  filter?: mFilter[]
  api: any
  param: any
}
interface mForms {
  key: string
  label: string
  type: 'select' | 'text' | 'number' | 'custom' | 'time' | 'date' | 'switch' | 'bool' | 'e-hierarchy' | 'd-hierarchy'
  visible: boolean
  _value?: any | null
  required: boolean
  editable: boolean
  dropdown?: number
  options?: options[]
  dropdownType?: mDropdownType
  multiselect?: boolean
  all?: boolean
  defaultTag?: any[]
  col?: boolean
}
interface mFilter {
  id: string
  label: string
  _value: any | null
  type: 'input' | 'select' | 'custom' | 'd-hierarchy'
  multiselect?: boolean
  all?: boolean
  options?: options[]
  dropdownType?: mDropdownType
  icon?: string
}
interface mOptions {
  dropdownID: number | boolean
  description: string
  modal?: boolean
}
interface mRows {
  title: string
  column: string
  defaultSort?: boolean
  type: 'badge' | 'none' | 'action' | 'check'
  menu?: mMenu[]
  modal: boolean
  form?: any
}
interface mDropdownType {
  type: 'custom' | 'fix' | 'dynamic'
  uri: number
  id?: any
  type_id?: number
}
interface mMenu {
  name: string
  _value: any
  modal: boolean
  form?: any
  key?: string
}

export { mDatatable, mForms, mFilter, mOptions, mRows, mDropdownType, mMenu }
//#endregion

//#region Default Dropdown
const active = [
  { dropdownID: true,  description: "Active"   },
  { dropdownID: false, description: "Inactive" }
]

const NextDay = [
  { dropdownID: 1,  description: "Yes" },
  { dropdownID: 0,  description: "No"  }
]

const year = [
  {dropdownID: 2022, description:"2022"},
  {dropdownID: 2023, description:"2023"},
  {dropdownID: 2024, description:"2024"},
  {dropdownID: 2025, description:"2025"},
  {dropdownID: 2026, description:"2026"}
]

const month = [
  {dropdownID:1,description:"January"},
  {dropdownID:2,description:"February"},
  {dropdownID:3,description:"March"},
  {dropdownID:4,description:"April"},
  {dropdownID:5,description:"May"},
  {dropdownID:6,description:"June"},
  {dropdownID:7,description:"July"},
  {dropdownID:8,description:"August"},
  {dropdownID:9,description:"September"},
  {dropdownID:10,description:"October"},
  {dropdownID:11,description:"November"},
  {dropdownID:12,description:"December"}
]

var param = [{key: "holidayYear", col: "year"},{key: "holidayId", col: "holidayId"},{key: "rowKey", col: "rowKey"}]
var id =    [25 ,374 ,379 ,380 ,386 ,387 ,381 ,382 ,383 ,384 ,385 ,375 ,376 ,377 ,378 ,26 ,373, 10]
var id_to = [25 ,374 ,379 ,380 ,386 ,387 ,381 ,382 ,383 ,384 ,385 ,375 ,376 ,377 ,378 ,26 ,373, 10]

export { active, month, year, param, id, id_to, NextDay}
//#endregion

