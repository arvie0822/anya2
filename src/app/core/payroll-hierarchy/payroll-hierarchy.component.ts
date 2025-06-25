import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, UntypedFormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { HeirarchyDropdownRequest, HeirarchyPayrollDDRequest, HierarchyList, SearchHierarchy } from 'app/model/dropdown.model';
import { EmployeeHierarchy } from 'app/model/employee-hierarchy';
import { values } from 'lodash';
import { Subject } from 'rxjs';
import _ from 'lodash';
import { DropdownSettings, SystemSettings } from 'app/model/app.constant';
// import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { GF } from 'app/shared/global-functions';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { PayrollHierarchy } from 'app/model/payroll-hierarchy';
import { fuseAnimations } from '@fuse/animations';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';

enum mode {
  next = 1,
  search = 2,
  tagChange = 3,
}

@Component({
  selector: 'app-payroll-hierarchy',
  templateUrl: './payroll-hierarchy.component.html',
  styleUrls: ['./payroll-hierarchy.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    CdkTableModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatSelectInfiniteScrollModule,
    MatAutocompleteModule,
    MatIconModule,
    SharedModule
],
})
export class PayrollHierarchyComponent implements OnInit {
  dropdownRequest = new HeirarchyPayrollDDRequest
  @Input() resultHierarchy: SearchHierarchy;
  @Input() defaultTag : any = [];
  @Input() multiple: boolean = false
  @Input() all: boolean = false
  @Input() showTag: boolean = true
  @Input() payrollID: number = 0
  onload: boolean = false
  dropdowns = PayrollHierarchy
  dropdownlist = []
  taglist: any
  selectedTag = []
  tagOptions = []
  @Output() selected = new EventEmitter<any>();
  @Input() notincludetag : any = []
  placeholder = ""
  dropdownSettings = DropdownSettings
  protected _onDestroy = new Subject<void>();
  @ViewChild('allSelected') private allSelected: MatOption;
  inputChange: UntypedFormControl = new UntypedFormControl();
  index = 0
  complete: boolean = false
  type: number = 0
  currentOption: any
  prev = {
    id: 0,
    text: ""
  }

  currentId = 0
  isMgmt = false

  constructor(private payrollService: PayrollService) {
    this.inputChange.valueChanges
    .pipe(debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this._onDestroy))
    .subscribe((result) => {
      if (result != "") {
        this.loadDropdowns(mode.search)
      } else {
        var __options = this.dropdowns.find(x => x.dropdownTypeID == this.currentId)
        __options.options = __options.oldoptions
      }
    });
   }

  ngOnInit() {
    this.isMgmt = GF.IsEqual(sessionStorage.getItem('moduleId'),['40','41'])
    this.initialize()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultTag?.currentValue?.length !== changes.defaultTag?.previousValue?.length) {
        this.selectedTag = []
        this.isMgmt = GF.IsEqual(sessionStorage.getItem('moduleId'),['40','41'])
        this.initialize()
    }
  }

  initialize(){
    this.onload = true
    this.dropdowns.map(item => { item.visible = false , item.value = null})
    this.payrollService.getHierarchyEmployee().subscribe({

/*************  ✨ Codeium Command ⭐  *************/
      /**
       * Handler for when data is emitted from the observable.
       * If the defaultTag is not empty, then it will set the selectedTag to the defaultTag,
       * call the handlerChange method, and call the selectedevent method.
       * Otherwise, it will filter the tagOptions based on the notincludetag input.
       * If the statusCode is not 200, then it will log the stackTrace and message.
       * @param value The data emitted from the observable.
       */
/******  4c9e13af-4088-4b8c-b067-fc5a1bdaa367  *******/
      next: (value: any) => {

        if (this.defaultTag.length > 0) {
            this.selectedTag = this.defaultTag.map(item=>item.type)
            this.handlerChange()
            this.selectedevent()
        }
        if (value.statusCode == 200) {
               this.tagOptions = value.payload.filter(item => !this.notincludetag.includes(item.dropdownTypeID))
        }

        else {
          console.log(value.stackTrace)
          console.log(value.message)
        }
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  gridcols(e){
    return e
  }

  handlerChange() {
    this.dropdowns.map(item => {
      item.visible = false

    })
    this.selectedTag.forEach(key => {
      this.dropdowns.filter(x => x.dropdownTypeID == key)[0].visible = true
      this.dropdowns.filter(x => x.dropdownTypeID == key)[0].complete = false
    });
    this.loadDropdowns(mode.tagChange)
  }

  compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false; // Arrays have different lengths, they are not equal
    }

    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];

      // Compare the properties of each object
      for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
          return false; // Objects have different values for a property, they are not equal
        }
      }
    }

    return true; // All elements and properties are equal
  }

  completeChecker(option,curOp): void {
    if(this.dropdownSettings.length > option.length){
      curOp.complete = true
    }
    else{
      curOp.complete = false
    }
  }

  currentDropdown(op){
    this.currentOption = op
  }

  loadDropdowns(modes) {
    this.complete = true
    this.dropdownRequest.payrollCode = this.payrollID + ""
    this.dropdownRequest.search = this.inputChange.value
    this.dropdownRequest.start = modes == mode.tagChange ? 0 : this.index
    this.dropdownRequest.id = []

    let selection = []
    this.selectedTag.forEach(key => {
      selection.push(this.dropdowns.filter(x => x.dropdownTypeID == key)[0])
    });

    var selected: any
    if (modes != mode.tagChange) {
      selected = selection.length == 1 ? selection[0] : selection.filter(x=>x.dropdownTypeID != this.currentOption.dropdownTypeID ).sort((a, b) => {
        return b.index - a.index ;
      })[0];
      selected = Object.assign({}, selected);
      selected.dropdownTypeID = this.currentOption.dropdownTypeID
      selected.value = GF.IsEmpty(selected.value) || this.currentOption.key == "EmployeeID"? [] : selected.value.filter(x=>x !== 0)
    } else {
      selected = selection.sort((a, b) => {
        return a.index - b.index ;
      })[0];
    }

    //#1 Filter internal if not employee dropdown
    if (this.inputChange.value && modes != mode.tagChange && this.currentOption.dropdownTypeID !== -4) {
      var search = this.inputChange.value.toLowerCase()
      var tempOp = this.dropdowns.find(x => x.dropdownTypeID == selected.dropdownTypeID).options
      this.dropdowns.find(x => x.dropdownTypeID == selected.dropdownTypeID).options = tempOp.filter(x=>x.description.toLowerCase().indexOf(search) > -1)
      return
    }
    //#1 End

    this.currentId = selected.dropdownTypeID

    // this.removeOptions(this.dropdowns)
    this.dropdownRequest.id.push({dropdownID: [this.payrollID], dropdownTypeID: selected.dropdownTypeID, key: 'PayrollCode'})


    this.payrollService.getPayrollSearchHierarchy(this.dropdownRequest).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          this.complete = false
          var _options = this.dropdowns.find(x => x.dropdownTypeID == selected.dropdownTypeID)
          this.completeChecker(value.payload,_options.options)
          console.log(_options.options,value.payload)
          _options.complete = this.compareArrays(_options.options,value.payload)
          _options.complete = _options.complete ? true : GF.IsEmpty(value.payload)
          var currentOptions = GF.IsEmpty(this.currentOption?.options||[]) ? [] : this.currentOption?.options.filter(x=>x.dropdownTypeID == selected.dropdownTypeID)||[]
          var tempOp1 = modes == mode.search
                      ? _.uniqBy(value.payload, JSON.stringify)
                      : _.uniqBy([...currentOptions,...value.payload], JSON.stringify)
          var tempOp = []
          tempOp1.forEach(op => {
            if (!tempOp.some(x=>x.dropdownID == op.dropdownID)) {
                tempOp.push(op)
            }
          });

          _options.oldoptions = _.uniqBy([..._options.oldoptions,...tempOp], JSON.stringify)

          _options.options = tempOp

          //Select All Even Next Batch
        if (!GF.IsEmpty(this.currentOption) && !GF.IsEmpty(this.currentOption.value) && this.currentOption?.value.includes(0) && !GF.IsEmpty(value.payload)) {
            this.currentOption.value = _.uniqBy([...this.currentOption?.value, ...value.payload.map(x => x.dropdownID)], JSON.stringify)
        }

          console.log(this.currentOption)
          if (this.dropdownRequest.search != "" && this.dropdownRequest.search != null) {
            _options.options = _.uniqBy([..._options.options], JSON.stringify).filter(x => x.description.toLowerCase().indexOf(this.dropdownRequest.search) > -1)
          }

          //////////////SELECT ALL
          if (this.multiple && this.defaultTag.length > 0 && modes == mode.tagChange) {
            this.defaultTag.forEach(tag => {
                var dd = this.dropdowns.find(x => x.dropdownTypeID == tag.type)
                dd.value = tag.id.some(x=>x===0) ? [...tag.id,...dd.options.map(x=>x.dropdownID)] : tag.id
                var ev = {value:tag.id}
                this.taglist = {value:tag.id}
                this.handlerSelectiveChange(dd,ev,true)
            });
          }
        }
        else {
          console.log(value.stackTrace)
          console.log(value.message)
        }
      }});
  }

  handlerSelectiveChange(model, select,all) {
    this.dropdownlist = model
    // if (model.value.some(x=>x===0) && model.value.length < 2) {
    //   this.selectAll(model,event,[])
    //   return
    // }
    let param = new HeirarchyPayrollDDRequest
    let id = 0
    let selection = []
    this.selectedTag.forEach(key => {
      selection.push(this.dropdowns.filter(x => x.dropdownTypeID == key)[0])
    });
    var nextList = selection.filter(x => x.dropdownTypeID != model.dropdownTypeID && x.index > model.index)
    this.setSelection()
    this.removeOptions(nextList)
    if (nextList.length > 0) {
      id = nextList.filter(x => x.dropdownTypeID != model.dropdownTypeID).sort((a, b) => {
        return a.index - b.index;
      })[0].dropdownTypeID;


    // param.id = []
    // param.id.push({
    //     key: "PayrollCode",
    //     dropdownID: [this.payrollID],
    //     dropdownTypeID: id
    // });
    param.payrollCode = this.payrollID + ""
    param.id.push({
        key: model.key,
        dropdownID: Array.isArray(model.value) ? model.value : [model.value],
        dropdownTypeID: id
    });

    if (GF.IsEmpty(model.value)) {
        this.dropdowns.filter(x => x.dropdownTypeID == id)[0].options = model.value
        return
    }
    if(!all){
        this.unselectAll(model)
        this.setSelection()
    }
        this.payrollService.getPayrollSearchHierarchy(param).subscribe({
            next: (value: any) => {
              if (value.statusCode == 200) {
                this.dropdowns.filter(x => x.dropdownTypeID == id)[0].options = _.uniqBy(value.payload, JSON.stringify)
                this.dropdowns.filter(x => x.dropdownTypeID == id)[0].oldoptions = _.uniqBy(value.payload, JSON.stringify)
                // this.defaultTag.forEach(tag => {
                //     var aa = this.dropdowns.find(x => x.dropdownTypeID == tag.type)
                //     aa.value = tag.id[0]
                // });

                //////SELECT ALL
                if(all){
                    var branch = this.dropdowns.find(item => item.key === "SubCompanyID" && item.value.length > 0 )
                    var employee = this.dropdowns.find(item => item.key === "BranchID" && item.value.length > 0 )
                    if(employee.value.length > 1){
                        var bank = this.dropdowns.find(item => item.key === "EmployeeID" && item.value.length > 0 )
                    }
                    if(branch.value){
                        var bank = this.dropdowns.find(item => item.key === "BranchID" && item.value.length > 0 )
                    }
                       if (branch.value.length > 1) {
                         var branchFilter = this.dropdowns.find(item => item.key === "BranchID" && item.options.length > 0)
                         if (branchFilter) {
                                this.selectAll(branchFilter, event, true)
                         }
                        }
                        if(employee.value.length > 1){
                            var employeeFilter = this.dropdowns.find(item => item.key === "EmployeeID" && item.options.length > 0)
                            if (employeeFilter) {
                              this.selectAll(employeeFilter, event, true)
                            }
                          }

                        if(bank.value.length > 1){
                          var bankFilter = this.dropdowns.find(item => item.key === "BankID" && item.options.length > 0)
                          if (bankFilter) {
                            this.selectAll(bankFilter, event, true)
                          }
                        }
                        this.setSelection()
                }
              }
              else {
                console.log(value.stackTrace)
                console.log(value.message)
              }
            },
            error: (e) => {
              console.error(e)
            }
          });
    }

  }

  unselectAll(key){
    var isAll = key.value.some(x=>x===0)
    if(isAll){
        if (!key.value.includes(key.options.map(x=>x.dropdownID))) {
          key.value = key.value.filter(num => num !== 0);
        }
        return
    }
    if (!key.value.includes(key.options.map(x=>x.dropdownID)) && !isAll && key.value.length === key.options.length){
      key.value = [...key.options.map(x=>x.dropdownID),...[0]]
      return
    }
  }

  removeOptions(options){
    options.forEach(key => {
      key.value = null
      key.options = []
    });

    options
  }

  setSelection(){
    this.resultHierarchy.Search = []
    this.dropdowns.forEach(element => {
      if(element.visible){
        if(element.value != 0 && element.value != null && element.value != undefined){
          let search = new HierarchyList
          search.Key = element.key
          search.Type = 2
          search.Value = element.value
          this.resultHierarchy.Search.push(search)
        }
      }
    });

  }

  selectedevent(){
    this.selected.emit(this.selectedTag.length)
  }

  async getNextBatch(){
      if (!this.complete) {
        var inputChange = this.inputChange.value
        this.dropdownRequest.search = GF.IsEmpty( inputChange && inputChange.toLowerCase()) ? inputChange.toLowerCase() : "";
          // this.dropdownRequest.search = null
          this.dropdownRequest.start = this.index++
          this.dropdownRequest.id = []
          this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: this.type, key:''})

          this.loadDropdowns(mode.next)
      }
  }

  selectAll(se, event, all) {
    var isAll = false
    if (Array.isArray(se.value)) {
      isAll = se.value.some(x=>x===0)
      this.setSelection()
    } else {
      isAll = se.value === 0
    }
    if (isAll) {
      if (this.multiple) {
        se.value = [...se.options.map(x=>x.dropdownID),...[0]]
        this.setSelection()
        console.log(se.value)
      }else {
        se.value = 0
      }
    }
    else {
      if (this.multiple) {
        se.value = []
        this.setSelection()
      } else {
        se.value = null
      }
    }
  }

  selDisplayNgModel(values,options){
    if (values !== undefined && values !== null && values !== "" && (values?.length || 1) > 0) {
      if (this.prev.id != values) {
        var out:string
        if (this.multiple) {
          if (values.length === 0) {
            return ""
          }
          if (values.some(x=>x === 0)) {
            out = "All"
          } else {
            out = options.find(item=>item.dropdownID === values[0])?.description
          }
        } else {
          if (values === 0) {
            out = "All"
          } else {
            out = options.find(item=>item.dropdownID === values)?.description
          }
        }
        this.prev.id = values
        this.prev.text = out
        return out;
      } else {
        return this.prev.text;
      }
    }
  }

  isALLs(e){
    if(!GF.IsEmpty(e)){
        if (this.multiple) {
            return !GF.IsEqual(0,e)
          } else {
            if (e === 0) {
              return false
            }
          }
    } else {
        return true;
    }
  }

  bank(model,all){
    let param = new HeirarchyPayrollDDRequest
    let id = 0
    let selection = []
    this.selectedTag.forEach(key => {
        selection.push(this.dropdowns.filter(x => x.dropdownTypeID == key)[0])
      });
    var nextList = selection.filter(x => x.dropdownTypeID != model.dropdownTypeID && x.index > model.index)
    if (nextList.length > 0) {
        id = nextList.filter(x => x.dropdownTypeID != model.dropdownTypeID).sort((a, b) => {
          return a.index - b.index;
        })[0].dropdownTypeID;
    }
    param.payrollCode = this.payrollID + ""
    param.id.push({
        key: model.key,
        dropdownID: Array.isArray(model.value) ? model.value : [model.value],
        dropdownTypeID: id
    });

    this.payrollService.getPayrollSearchHierarchy(param).subscribe({
        next: (value: any) => {
            if (value.statusCode == 200) {

                this.dropdowns.filter(x => x.dropdownTypeID == id)[0].options = _.uniqBy(value.payload, JSON.stringify)
                this.dropdowns.filter(x => x.dropdownTypeID == id)[0].oldoptions = _.uniqBy(value.payload, JSON.stringify)

                if(all){
                    var bank = this.dropdowns.find(item => item.key === "EmployeeID" && item.value.length > 0 )

                    if(bank.value.length > 1){
                        var bankFilter = this.dropdowns.find(item => item.key === "BankID" && item.options.length > 0)
                        if (bankFilter) {
                          this.selectAll(bankFilter, event, true)
                        }
                      }
                      this.setSelection()
                }


            }
        }
    })

  }

}
