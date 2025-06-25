import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SearchHierarchy } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { DatatableModalComponent } from '../datatable-modal.component';
import { fuseAnimations } from '@fuse/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownHierarchyComponent } from 'app/core/dropdown-hierarchy/dropdown-hierarchy.component';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    CdkTableModule,
    MatDividerModule,
    MatCardModule,
    DropdownCustomComponent,
    DropdownComponent,
    MatSelectModule,
    DropdownHierarchyComponent
]
})
export class CrudTableComponent implements OnInit {
  dynamicForm: FormGroup
  @Output() pushEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Input() crudtable: any = []
  @Input() isAdd: boolean = false
  isLoadingResults: boolean = true;
  @ViewChild('MatTable') table: MatTable<any>;
  @ViewChild('dynamicTable') dynamicTable: MatTable<any>;
  @ViewChild(DatatableModalComponent) parent: DatatableModalComponent;
  dataSource: any = []
  columndefs: any = []
  rowCount: number = 4
  field_count = 0
  form = []
  pipe = new DatePipe('en-US');
  resultHierarchy = new SearchHierarchy;

  newTime = {
    hour: null,
    min: null,
    timeclock: null
  }
  constructor(private message: FuseConfirmationService, private coreService: CoreService) { }


  ngOnInit() {
  }

  ngOnChanges() {
    this.form = this.crudtable.form
    // this.settings(this.form)
    var obj = {}
    this.form.map((element,i) => {
      if (element.visible && !this.columndefs.some(i=>i == element.key) || !element.visible && element.col) {
        this.columndefs.push(element.key)
      }
      obj[element.key] = element._value
    });
    this.isAdd ? this.dataSource.push(obj) : null
    this.columndefs.some(i=>i == 'action') ? null : this.columndefs.push('action')
    // this.rowCount = this.form.filter(x => x.visible == true).length
  }

  settings(data) {
    this.dynamicForm = new FormGroup({});
    data.forEach((element) => {
      this.dynamicForm.addControl(element.key, new FormControl(element._value));
      const CONTROL = this.dynamicForm.controls[element.key];

      if (element.required != false) {
        let controlValidators = [];
        controlValidators.push(Validators.required);
        CONTROL.setValidators(controlValidators);
      }
      if(!element.editable){
        CONTROL.disable()
      }
    });
  }

  handleTimeEvent(e,key,i) {
    if (this.crudtable.type == "shift") {
      //   if (this.dynamicForm.value.matTimeIn != null && this.dynamicForm.value.matTimeOut != null) {
      // const name = this.pipe.transform(this.dynamicForm.value.matTimeIn, 'hh') + ":" + this.pipe.transform(this.dynamicForm.value.matTimeIn, 'mm') + this.pipe.transform(this.dynamicForm.value.matTimeIn, 'a').substring(0, 1)
      //   + "_" +
      //   this.pipe.transform(this.dynamicForm.value.matTimeOut, 'hh') + ":" + this.pipe.transform(this.dynamicForm.value.matTimeOut, 'mm') + this.pipe.transform(this.dynamicForm.value.matTimeOut, 'a').substring(0, 1)
      // this.dynamicForm.controls.shiftName.patchValue(name);
      //   }
      var TimeIn  = this.dataSource[i].timeIn
      var TimeOut = this.dataSource[i].timeOut
      if (TimeIn != null && TimeOut != null) {
        const name = this.pipe.transform(TimeIn, 'hh') + ":" + this.pipe.transform(TimeIn, 'mm') + this.pipe.transform(TimeIn, 'a').substring(0, 1)
          + "_" +
          this.pipe.transform(TimeOut, 'hh') + ":" + this.pipe.transform(TimeOut, 'mm') + this.pipe.transform(TimeOut, 'a').substring(0, 1)
        this.dataSource[i].shiftName = name
      }
    }
  }

  setValue(type,ee){
    var out: any = ee
    switch (type) {
      case 'time':
          out = this.pipe.transform(ee,'HH:mm:ss')
        break;
      case 'date':
          out = this.pipe.transform(ee,'yyyy-MM-dd')
        break;
      case 'bool':
        out = ee !== null && ee !== "" ? (ee == 'true') : false
      break;
    }
    return out
  }

  rewrite_datasource(dt){
    var dts = []
    for (let ii = 0; ii < dt.length; ii++) {
      var obj = {}
      this.form.forEach((el,i) => {
          obj[el.key] = this.setValue(el.type, dt[ii][el.key])
      });
      dts.push(obj)
    }
    return dts
  }

  submit() {
    var dts = this.rewrite_datasource(this.dataSource)
    // this.dynamicForm.markAllAsTouched();
    //if (this.dynamicForm.valid) {
    // this.handleCustomEvent()
    const dialogRef = this.message.open(SaveMessage);
    // console.log(this.dynamicForm.value)
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "confirmed") {

          this.coreService.postData(this.crudtable.api.post, dts).subscribe({
            next: (value: any) => {
              if (value.statusCode == 200) {
                this.message.open(SuccessMessage);
                this.pushEvent.emit(true)
              }
              else {
                this.message.open(FailedMessage);
                console.log(value.stackTrace)
                console.log(value.message)
                this.pushEvent.emit(false)
              }
            },
            error: (e) => {
              this.message.open(FailedMessage);
              console.error(e)
              this.pushEvent.emit(false)
            }
          });
      }
    });
    //}
  }

  handleCustomEvent() {
    if (this.crudtable.type == "shift") {

      let eventStartTime = new Date("1900-01-01 " + this.pipe.transform(this.dynamicForm.value.matTimeIn, 'HH:mm:ss'));
      let eventEndTime = new Date("1900-01-01 " + this.pipe.transform(this.dynamicForm.value.matTimeOut, 'HH:mm:ss'));
      if (eventStartTime > eventEndTime) {
        eventEndTime.setDate(eventEndTime.getDate() + 1)
        this.dynamicForm.controls.timeOutDaysCover.patchValue(1);
      }
      else {
        this.dynamicForm.controls.timeOutDaysCover.patchValue(0);
      }
      let duration = eventEndTime.valueOf() - eventStartTime.valueOf();
      this.dynamicForm.controls.totalWorkingHours.patchValue(duration / 1000 / 60 / 60);

      const TimeIn = this.pipe.transform(this.dynamicForm.value.matTimeIn, 'HH:mm:ss')
      const TimeOut = this.pipe.transform(this.dynamicForm.value.matTimeOut, 'HH:mm:ss')
      this.dynamicForm.controls.timeIn.patchValue(TimeIn);
      this.dynamicForm.controls.timeOut.patchValue(TimeOut);
    }
  }

  setTime(time){
    this.newTime.timeclock = time.replace(/[^a-z]/gi, '');
    let timeArry = time.split(/[ :]+/);
    this.newTime.hour = timeArry[0];
    this.newTime.min = timeArry[1];
    let patchTime = new Date()
    patchTime.setHours(this.newTime.hour, this.newTime.min);
    return patchTime
  }

  setDate(e){
    return this.pipe.transform(new Date(e),"yyyy-MM-dd")
  }

  validate(type,e){
    var out: any = e
    if (e !== null && e !== "") {
      out = type == 'time' ? this.setTime(e) :
            type == 'date' ? this.setDate(e) : e
    }
    return out
  }

  add_datasource() {
    var obj = {}
    this.form.map((element,i) => {
      obj[element.key] = element._value
    });
    this.dataSource.push(obj)
    this.dynamicTable.renderRows()
  }
  delete_datasource(i,id) {
    this.dataSource.splice(i,1)
    this.dynamicTable.renderRows()
    this.deleteEvent.emit(id)
  }

  edit_datasource(e){
    var rowExisted = this.dataSource.some(item=>item.encryptId == e.encryptId)
    if (!rowExisted) {
      this.coreService.getData(this.crudtable.api.get, e.encryptId).subscribe({
        next: (value: any) => {
          if (value.statusCode == 200) {
            value.payload["encryptId"] = e.encryptId
            this.dataSource.push(value.payload)
            this.dynamicTable.renderRows()
          }
          else {
            this.message.open(FailedMessage);
            console.log(value.stackTrace)
            console.log(value.message)
          }
        },
        error: (e) => {
          this.message.open(FailedMessage);
          console.error(e)
        }
      });
    }
  }

  colspan(ri,i){
    return ri < 3 ? 3 : 1
  }

  isNumber(col,e){
    if (e !== null) {
        if (isNaN(e)) {
          return col[e] === null || col[e] === undefined ? [] : (Array.isArray(col[e]) ? col[e] : [col[e]])
        }
    }
  }
}
