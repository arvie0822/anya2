import { CommonModule, DatePipe } from '@angular/common';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { ɵNullViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TableRequest } from 'app/model/datatable.model';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';
import { FailedMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { fuseAnimations } from '@fuse/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const DATE_FORMAT = 'MM/DD/yyyy';

export const MY_FORMATS = {
    parse: {
        dateInput: DATE_FORMAT,
    },
    display: {
        dateInput: DATE_FORMAT,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: DATE_FORMAT,
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

enum mode {
    all = 0,
    next = 1
}

@Component({
    selector: 'app-generate',
    templateUrl: './generate.component.html',
    styleUrls: ['./generate.component.css'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_FORMATS,
        },
    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
      ReactiveFormsModule,
      CommonModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatCardModule,
      MatIconModule,
      MatTableModule,
      MatPaginatorModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatNativeDateModule,
    ]
  })

export class GenerateComponent implements OnInit {

    @Input() datasource: any[] = [];
    @Input() cols: any[] = [];
    displayedColumns: any[] = []
    @Input() label: string
    @Input() details: boolean = true;
    @Input() checkbox: boolean = false;
    @Input() empStatus: boolean = false;
    @Input() hideCols: boolean = true;
    @Output() tablefilter = new EventEmitter<any>();
    request = new TableRequest
    isLoadingResults: boolean = true;
    @Input() totalRows: number
    @Input() avoidChecked: boolean = false;
    selection = new SelectionModel<any>(true, []);
    form = []
    dataInner: any[] = [];
    table: any = []
    checkedList = []
    date = new Date()
    dateFrom = new Date()
    dateTo = new Date()
    all: boolean = false
    allSelected: boolean = false
    selectheader: boolean = false
    basicMonth: string = ""
    days: string = ""
    dailyRate: string = ""
    projectedMonths: string = ""
    checkedcols: string = ""
    paginate: boolean = false
    failedMessage = { ...FailedMessage}
    pipe = new DatePipe('en-US');
    @Output() selected = new EventEmitter<any>();
    // @Output() passCheck = new EventEmitter<any>();
    @Output() data = new EventEmitter<any>();
    @Output() headersChecked = new EventEmitter<any>();
    @Input() headersfromParent: any[] = [];
    @Output() excludedList = new EventEmitter<any>();
    @Output() selectedList = new EventEmitter<any>();
    @ViewChild('TABLE') TABLE: MatTable<any>;

    element = {
        checked : false
    }

    olddatasource = []
    datasource_Internal = []
    selectedItem = []
    excluded: any = []
    excludedFirstCols: any = []
    selecteds: any = []

    headerList: any = [
        { "checked": null, "key": "basicMonth",         "keyValue": "numericvalue"},
        { "checked": null, "key": "projectedMonths",    "keyValue": "numericvalue"},
        { "checked": null, "key": "days",               "keyValue": "numericvalue" },
        { "checked": null, "key": "dailyRate",          "keyValue": "numericvalue" },
        { "checked": null, "key": "dateFrom",           "keyValue": "date" },
        { "checked": null, "key": "dateTo",             "keyValue": "date" },
        { "checked": true, "key": "recurringEarnings",  "keyValue": "boolvalue" },
        { "checked": true, "key": "recurringDeduction", "keyValue": "boolvalue" },
        { "checked": true, "key": "loan",               "keyValue": "boolvalue" },
        { "checked": true, "key": "sss",                "keyValue": "boolvalue" },
        { "checked": true, "key": "phic",               "keyValue": "boolvalue" },
        { "checked": true, "key": "hdmf",               "keyValue": "boolvalue" },
        { "checked": true, "key": "statutory",          "keyValue": "boolvalue" },
        { "checked": true, "key": "tax",                "keyValue": "boolvalue" },
        { "checked": true, "key": "thirteenMonth",      "keyValue": "boolvalue" },
        { "checked": false, "key": "fourteenMonth",      "keyValue": "boolvalue" },
        { "checked": false, "key": "fifteenMonth",       "keyValue": "boolvalue" },
        { "checked": false, "key": "sixteenMonth",       "keyValue": "boolvalue" },
    ]

    dataModel = {
        basicMonth: this.basicMonth,
        days: this.days,
        dailyRate: this.dailyRate,
        projectedMonths: this.projectedMonths,
        dateFrom: null,
        dateTo: null,
    }

  constructor(private route: ActivatedRoute, private message: FuseConfirmationService,) {
        this.displayedColumns = []
   }


  ngOnInit() {

    this.displayedColumns = this.cols.map(column => column.key);
    this.dataInner =  this.datasource.map(function (obj) {
        obj.checked = true;
        return obj;
    });
    if(this.checkbox){
        this.displayedColumns.unshift("checkbox")
    }
    var checks = []
    checks = this.cols.map(y=>y.key)
    checks.forEach((keyValue) => {
        if(this.datasource.length>0){
            if(this.datasource.some(x=>x[keyValue] === false)){
                return
            } else {
                const column = this.cols.find(col => col.key === keyValue)
                    column.checked = true

                    this.data.emit(this.datasource)
                    // this.headerList.forEach(item => {
                    //     if (item.checked !== null) {
                    //       const matchingData = this.datasource.find(data => data[item.key] !== undefined);
                    //       if (matchingData) {
                    //         item.checked = matchingData[item.key];
                    //       }
                    //     }
                    //   });
                    this.headersChecked.emit(this.headerList)
                    this.excludedList.emit(this.excluded)
            }
        }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.headersfromParent.push(this.headerList)

    this.isLoadingResults = false
    var checker = this.checkedList.some(x=>x.id === 0)

    if(this.checkedList.length > 0 && !checker){
        var result = this.datasource.map(item => {
            var match = this.checkedList.find(checkItem => checkItem.id === item.employeeId);
            return match ? { ...item, checked: true } : item;
          });
        this.datasource = result
        this.selected.emit(this.checkedList)
    }

    if ("datasource" in changes) {
        if(this.paginate === false){ //// for edit
            if (this.datasource.length > 0) {
                if(this.headersfromParent !== null){
                    this.dataModel.dateFrom = this.headersfromParent['dateFrom']
                    this.dataModel.dateTo = this.headersfromParent['dateTo']
                    this.dataModel.projectedMonths = this.headersfromParent['projectedMonths']

                    this.headerList.forEach(item => {
                        item.checked = this.headersfromParent[item.key]
                });
                }
                this.headersChecked.emit(this.headerList)
            }
        } else {
            this.datasource.forEach(item => {
                this.headerList.forEach(keys => {
                    if (typeof keys.checked !== 'string' && !GF.IsEmpty(keys.checked)) {
                      //  item[keys.key] = keys.checked
                    }
                });
            });
        }

        if(this.checkbox){
            this.datasource.map(function (obj) {
                obj.checked = false;
                return obj;
            });
            if (this.checkedList.some(x=>x.id===0)) {
                this.selectAllCheckbox({checked:true}, mode.next)
            }
        }

        this.datasource.forEach(item => {
            this.headerList.forEach(keys => {
                if (typeof keys.checked !== 'string' && !GF.IsEmpty(keys.checked)) {
                    var obj = {}
                    obj['boolvalue'] = item[keys.key]
                    obj['stringvalue'] = null
                    obj['numericvalue'] = null
                    obj['isKey'] = keys.key
                    obj['employeeId'] = item.employeeId
                    obj['date'] = item.date

                    if (!GF.IsEmpty(this.headersfromParent) || !GF.IsEmpty(this.excluded)) {
                        if (!this.excluded.some(x => x.isKey == keys.key && x.employeeId == item.employeeId) && !item[keys.key] && keys.checked) {
                            this.excluded.push(obj)
                            this.excluded = this.excluded.filter(x => !GF.IsEmpty(x?.[keys.keyValue]))
                        } else  if (!this.selecteds.some(x => x.isKey == keys.key && x.employeeId == item.employeeId) && item[keys.key] && !keys.checked) {
                            this.selecteds.push(obj)
                        }
                    }
                }
            });
        });

        if (!this.avoidChecked) {
            this.datasource.forEach(item => {
                this.headerList.forEach(keys => {
                  if(typeof keys.checked === 'string' || keys.checked === null){

                      if (GF.IsEmpty(keys.checked)) {
                          item[keys.key] = GF.IsEmptyReturn(this.selecteds.find(x => x.isKey == keys.key && x.employeeId == item.employeeId)?.[keys.keyValue], item[keys.key])
                      } else if (this.excluded.some(x => x.isKey == keys.key && x.employeeId == item.employeeId)) {
                          item[keys.key] = GF.IsEmptyReturn(this.excluded.find(x => x.isKey == keys.key && x.employeeId == item.employeeId)?.[keys.keyValue], item[keys.key])
                      } else if (this.selecteds.some(x => x.isKey == keys.key && x.employeeId == item.employeeId)) {
                          item[keys.key] = GF.IsEmptyReturn(this.selecteds.find(x => x.isKey == keys.key && x.employeeId == item.employeeId)?.[keys.keyValue], item[keys.key])
                      } else if (this.paginate) {
                         // item[keys.key] = keys.checked
                      }
                  } else if(!GF.IsEmpty(keys.checked)) {
                    if (this.paginate) {
                        item[keys.key] = this.excluded.some(x => x.isKey == keys.key && x.employeeId == item.employeeId) ? this.excluded.find(x => x.isKey == keys.key && x.employeeId == item.employeeId)?.[keys.keyValue] : item[keys.key]
                    }
                  } else{
                      item[keys.key] = this.selecteds.some(x => x.isKey == keys.key && x.employeeId == item.employeeId) ? this.selecteds.find(x => x.isKey == keys.key && x.employeeId == item.employeeId)?.[keys.keyValue] : item[keys.key]
                  }

                // if (keys.key === 'dateFrom' || keys.key === 'dateTo') {
                //     item[keys.key] = new Date[item(keys.key)]
                //   }
                });
            });
        }

          this.headersChecked.emit(this.headerList)
          this.excludedList.emit(this.excluded)
      }
  }

  InputChange(input){
    this.basicMonth = input
    const basicItem = this.headerList.find(item => item.key === "basicMonth");
    if (basicItem) {
        basicItem.checked = this.basicMonth;
    }

    this.headersChecked.emit(this.headerList)

  }

  isHeadeChecked(key){
    return GF.IsEmptyReturn(this.headerList.find(x=>x.key == key)?.checked,false)
  }

  handlePageEvent(e): void {
    this.request.Start = e.pageIndex
    this.request.Length = e.pageSize
    this.isLoadingResults = true;
    this.selectheader = true
    this.paginate = true

    this.tablefilter.emit(this.request)
  }

// check box function

  selectOneCheckbox(e,i) {
        var id = this.datasource[i].employeeId
        var hasId = this.checkedList.some(x=>x.id===id)
        var hasZero = this.checkedList.some(x=>x.id===0)

        if (!hasId) {
            this.checkedList.push({id: id, page: this.request.Start})
            // var count = this.checkedList.filter(x => x.page == this.request.Start).length
            // // if (count == this.datasource.length){
            // //     this.checkedList.push({id: 0, page: this.request.Start})
            // // }

            if (hasZero) {
                var ex = this.excludedFirstCols.findIndex(x => x === id)
                if (ex > -1) {
                    this.excludedFirstCols.splice(ex, 1)
                }
            }
        } else {
            var idx = this.checkedList.findIndex(x => x.id == id && x.page == this.request.Start)
            if (idx > -1) {
                this.checkedList.splice(idx, 1)
            }
            if (hasZero) {
                this.excludedFirstCols.push(id);
            }
        }
    this.selected.emit(this.checkedList)
    this.excludedList.emit(this.excludedFirstCols)
}

get isAllSelected() {
    const count = this.checkedList.length
    const numRows = this.datasource.length;
    return count === numRows;
}

selectAllCheckbox(e,m) {
    if (e.checked) {
        var Items = []
        var data = []
        if (m === mode.next) {
            data = this.datasource.filter(x=>!this.excludedFirstCols.includes(x.employeeId))
        } else {
            data = this.datasource
        }
        Items = [...[0],...data.map(x=>x.employeeId)].map(item=>({
            id: item,
            page: this.request.Start
        }))

        this.checkedList = _.uniqBy([...Items,...this.checkedList], JSON.stringify)
    } else {
        this.checkedList = []
        this.excludedFirstCols = []
    }
    this.excludedList.emit(this.excludedFirstCols)
    this.selected.emit(this.checkedList)
}

selectOne(e, i, key, id) {
    var obj = {};

    if (typeof e === 'string' || typeof e === 'number') {
        if (typeof e === 'number') {
            e.toString();
        }
        obj['stringvalue'] = "";
        obj['numericvalue'] = e;
        obj['boolvalue'] = true;
        obj['date'] = null;
    } else if (e instanceof Date) {
        obj['date'] = this.pipe.transform(e, 'yyyy-MM-dd');
        obj['stringvalue'] = null;
        obj['numericvalue'] = null;
        obj['boolvalue'] = false;
    } else if (e === null) {
        obj['stringvalue'] = null;
        obj['numericvalue'] = null;
        obj['boolvalue'] = false;
        obj['date'] = null;
    } else {
        obj['stringvalue'] = null;
        obj['numericvalue'] = null;
        obj['boolvalue'] = e.checked;
        obj['date'] = null;
    }


    obj['isKey'] = key
    var employeeId = this.datasource.find(x => x.id == id).employeeId
    obj['employeeId'] = employeeId

    var header = GF.IsEmptyReturn(this.headerList.find(x => x.key == key).checked, false);
    var item = this.datasource.find(x => x.id == id)[key]

    if (header) {
        if (this.excluded.length > 0) {
            var indx = this.excluded.findIndex(x => x.employeeId === employeeId && x.isKey === key);
            if (indx > -1) {
                this.excluded.splice(indx, 1);
            }
        }
        this.excluded.push(obj);
        this.excludedList.emit(this.excluded);
    } else {
        if (this.selecteds.length > 0) {
            var indx = this.selecteds.findIndex(x => x.employeeId === employeeId && x.isKey === key);
            if (indx > -1) {
                this.selecteds.splice(indx, 1);
            }
        }
        this.selecteds.push(obj);
        this.selectedList.emit(this.selecteds);
    }
}


selectAllHeader(e,key) {
    var obj = {}
    if(typeof e?.checked === 'boolean'){
        obj['checked'] = e.checked
    } else if (typeof e === 'number'|| typeof e === 'string'){
        if(e === ""){
            e = null
        }
        obj['checked'] = e
    }
    obj['key'] = key

    var indx = this.headerList.findIndex(x=>x.key == key)
    obj['keyValue'] = this.headerList[indx].keyValue

    if (indx > -1) {
        this.headerList.splice(indx,1)
    }
    this.headerList.push(obj)
    this.datasource.forEach(item => {
        if(typeof e?.checked === 'boolean'){
            item[key] = e.checked
        } else if (typeof e === 'number'|| typeof e === 'string'){
            item[key] = e
        }
    });

    if(this.selecteds.some(item => item.isKey === key)){
        for (var i = this.selecteds.length - 1; i >= 0; i--) {
            if (this.selecteds[i].isKey === key) {
                this.selecteds.splice(i, 1);
            }
        }
        this.selectedList.emit(this.selecteds)
    } else if(this.excluded.some(item => item.isKey === key)){
        for (var i = this.excluded.length - 1; i >= 0; i--) {
            if (this.excluded[i].isKey === key) {
                this.excluded.splice(i, 1);
            }
        }
        this.excludedList.emit(this.excluded)
    }

    this.headersChecked.emit(this.headerList)
}

itemChecked(all, i){
    var id = this.datasource[i]?.employeeId
    if (!id) { return }
    if (all) {
            return this.checkedList.some(x=>x.id===0 && x.page == this.request.Start)
    } else {
        if (this.checkedList.some(x=>x.id===0 && x.page == this.request.Start && this.excludedFirstCols.includes(x.id))) {
            return true
        } else {
            return this.checkedList.some(x=>x.id===id && x.page == this.request.Start)
        }
    }
}
//end of check box function

headerdate(date, key) {
    this.dataModel[key] = date;

    if (key === 'dateFrom') {
        this.datasource.forEach(item => {
            item.dateFrom = date

            if (new Date(item.dateTo) < new Date(date)) {
                item.dateTo = new Date(date)
            }

            if (this.dataModel.dateTo && new Date(item.dateTo) > new Date(this.dataModel.dateFrom) || (new Date(item.dateTo) <= new Date(this.dataModel.dateFrom))) {
                item.dateTo = new Date(this.dataModel.dateTo)
            }
        });

        if (this.dataModel.dateTo && new Date(this.dataModel.dateTo) < new Date(date)) {
            this.dataModel.dateTo = new Date(date)

            this.datasource.forEach(item => {
                if (new Date(item.dateTo) < new Date(date)) {
                    item.dateTo = new Date(date)
                }
            })
        }

        this.headerList.find(x => x.key == 'dateFrom').checked = this.pipe.transform(this.dataModel.dateFrom, 'yyyy-MM-dd')
    }


    if (key === 'dateTo') {
        this.datasource.forEach(item => {
            item.dateTo = date

            if (new Date(date) < new Date(item.dateFrom)) {
                item.dateTo = new Date(item.dateFrom)
            }
        });

        if (new Date(date) < new Date(this.dataModel.dateFrom)) {
            this.dataModel.dateTo = new Date(this.dataModel.dateFrom)

            this.datasource.forEach(item => {
                item.dateTo = new Date(this.dataModel.dateFrom)
            });
        }

        this.headerList.find(x => x.key == 'dateTo').checked = this.pipe.transform(this.dataModel.dateTo, "yyyy-MM-dd")

    }

    this.headersChecked.emit(this.headerList)

}

datetime(date, i, key) {
    this.datasource[i][key] = date

    if (key === 'dateFrom') {
        if (new Date(date) < new Date(this.datasource[i].dateTo)) {
            this.datasource[i][key] = date;

            if (new Date(this.datasource[i].dateTo) < new Date(date)) {
                this.datasource[i].dateTo = new Date(date);
            }
        }
    } else if (key === 'dateTo') {
        if (new Date(date) > new Date(this.datasource[i].dateFrom)) {
            this.datasource[i][key] = date;
        }
    }

    if (key === 'dateFrom') {
        this.datasource.forEach((item) => {
            // dateFrom item cannot be earlier than the dateFrom header
            // if (new Date(item.dateFrom) < new Date(this.dataModel.dateFrom)) {
            //     item.dateFrom = new Date(this.dataModel.dateFrom);
            // }
            if (new Date(item.dateTo) < new Date(item.dateFrom)) {
                item.dateTo = new Date(item.dateFrom);
            }
        });
    } else if (key === 'dateTo') {
        this.datasource.forEach((item) => {
            // dateTo item cannot be later than the dateTo header
            // if (new Date(item.dateTo) > new Date(this.dataModel.dateTo)) {
            //     item.dateTo = new Date(this.dataModel.dateTo);
            // }
        });
    }
}


date_min_max(key, isMin) {
    if (key === 'dateFrom') {
        var max = null
        var min = null

        return isMin ? min : max

    } else if (key === 'dateTo') {
        var df = this.pipe.transform(this.dataModel.dateFrom,'yyyy-MM-dd')
        var datemin = new Date(df)
        var max = null

        return isMin ? datemin : max
    }
}


date_min_max_items(i, key, isMin) {
    if (key === 'dateFrom') {
        var max = null
        var min = null

        return isMin ? min : max

    } else if (key === 'dateTo') {
        var df = this.pipe.transform(this.datasource[i].dateFrom,'yyyy-MM-dd')
        var datemin = new Date(df)
        var max = null

        return isMin ? datemin : max
    }

}
}
