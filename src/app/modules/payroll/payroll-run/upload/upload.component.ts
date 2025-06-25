import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import _ from 'lodash';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
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
    MatProgressBarModule
  ]
})
export class UploadComponent implements OnInit {


    uploadColumns: any [] = [
        'file'
    ];

    checkedList = []
    viewList = []
    cloneChecklist = []
    cloneChecklist1 = []
    deletedList = []
    isChecked : boolean = false
    isDisabled: boolean = false
    deleteEXC: boolean = false
    view: boolean = false
    // checkedList1 = []

    @Input() datasource: any = []
    @Input() id: string
    @Output() deleted: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() del: boolean = false
    @Input() checkbox: boolean = false;
    @Input() cancel: boolean = false;
    @Input() viewer: boolean = false;
    @Input() isLoadDone: boolean  = false
    @Input() isSaveDone: boolean  = false
    // @Input() isDisabled: boolean  = false
    @Output() selected = new EventEmitter<any>();
    @Output() selectDel = new EventEmitter<any>();

    @ViewChild('tableId') private _table: MatTable<any>;
    filenameList: any = []


    selection = new SelectionModel<Element>(true, []);
    selectView = new SelectionModel<Element>(true, []);


  constructor() { }

  ngOnInit() {
    this.filenameList = this.datasource
    this.view = true
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filenameList = this.datasource
    // setTimeout(() => {
    //     if (changes.datasource && changes.datasource.currentValue !== changes.datasource.previousValue && changes.datasource.previousValue && changes.datasource.currentValue){
    //         console.log(this.datasource)
    //         this.filenameList = this.datasource
    //         // .map(item=>({
    //         //     file: {
    //         //         name: item.filename,
    //         //         lastModifiedDate: "",
    //         //         uploadID: item.uploadID
    //         //     },
    //         //     id: item.id,
    //         //     checkbox: false
    //         // }))
    //         this._table.renderRows();
    //     }
    // }, 1000);

    if('viewer' in changes){
        this.view = this.viewer
    }


    if(this.deleteEXC){
        this.checkedList = []
    }

    if (changes?.del) {
        if (changes.del.currentValue !== changes.del.previousValue && changes.del.currentValue) {
            var cl = this.checkedList.slice()
            cl.forEach(el => {

                let chk = this.checkedList.find(obj => obj === el);
                let ds = this.datasource.findIndex(obj => obj.id === chk);
                this.checkedList.splice(chk)
                this.datasource.splice(ds,1)
            });
            this.deleteEXC = true
            this._table.renderRows();
            this.deleted.emit(false)
        }
    }

    if(this.checkbox){
        if (!this.uploadColumns.includes("checkbox")) {
            this.uploadColumns.unshift("checkbox");
            this.selectView.deselect(this.selectView.selected[0]);
            this.view = false
            return
          }
    } else {
        if (this.uploadColumns.includes("checkbox")) {
            if (this.uploadColumns[0] === "checkbox") {
                this.uploadColumns.shift();
                for(const list of this.checkedList){
                    this.datasource.find(x=>x.id === list).checkbox = false
                }
              }
              return
          }
    }

    if (this.cancel) {
        if (this.uploadColumns.includes("checkbox")) {
            if (this.uploadColumns[0] === "checkbox") {
                this.uploadColumns.shift();
              }
          }
          this.view = true
          return
    }

  }

// check(i,e){
//     if (this.checkedList.some(x=>x==i)) {
//         this.checkedList.splice(i,1)
//         this.isDisabled = true
//     } else {
//         this.checkedList.push(i)
//         this.isDisabled = true
//     }
//     this.selected.emit(this.checkedList)
//     setTimeout(() => {
//         this.isDisabled = false
//     }, 1000);
//   }

//   checkBoxValue(event){
//     console.log(event.checkbox)
//   }

  check(i,e) {
    var id = this.datasource[i].id
    var hasId = this.checkedList.some(x=>x ===id)
    var hasZero = this.checkedList.some(x=>x ===0)

    if (!hasId) {
        this.checkedList.push(id)
        var Items = this.datasource.find(x=>x.checkbox === true).id
        this.checkedList = _.uniqBy([Items,...this.checkedList], JSON.stringify)
        // var count = this.checkedList.filter(x => x.page == this.request.Start).length
        // if (count == this.datasource.length){
        //     this.checkedList.push({id: 0, page: this.request.Start})
        //     this.datasource.filter(x=>x.employeeId === id)
        // }
    } else {
        var idx = this.checkedList.findIndex(x => x == id)
        // this.deletedList.push(idx)
        if (idx > -1) {
            this.checkedList.splice(idx, 1)
        }
        console.log(this.checkedList)
        var zeros  = this.checkedList.filter(x=>x === 0)
        zeros.forEach(ii => {
            if (hasZero) {
                var idxx = this.checkedList.findIndex(x => x.id === 0)
                if (idxx > -1) {
                    this.checkedList.splice(idxx, 1)
                }
            }
        });
    }
    this.selectDel.emit(this.checkedList)
    this.deleteEXC = false
}

// View(i){
//     if (this.checkedList.some(x=>x==i)) {
//                 this.checkedList.splice(i,1)
//                 this.isDisabled = true
//             } else {
//                 this.checkedList.push(i)
//                 this.isDisabled = true
//             }
//             this.selected.emit(this.checkedList)
//             setTimeout(() => {
//                 this.isDisabled = false
//             }, 1000);
//           }

//           checkBoxValue(event){
//             console.log(event.checkbox)
// }



  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.datasource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;

  }

  fileSelected(event: any, datasource){

    var a = datasource
    const file = event.target.files[0].name;
    const reader = new FileReader();
    reader.onload = () => {
        const data = JSON.parse(reader.result.toString());
        this.displayData(data, a)
    };
    reader.readAsText(file);

}

displayData(data: any , a) {
    a = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        a.push({

            Emp_id : key, Emp_Name: key , Date: key, Rd: key, Sched_in: key, Sched_out: key, Time_in: key,
            Time_out: key, Rg: key, Tardy: key, Ut: key, Absent: key, Lwop: key , Vl: key, Sl: key, Otlv: key, Nd: key, Rgot: key,
            Rgotnd: key, Lhot: key, Lhotnd: key, lhot_8: key, lhotnd_8: key, lhrd: key, lhrdnd: key, lhrd_8: key, lhrdnd_8: key,
            shot: key, Shotnd: key, shot_8: key, shotnd_8: key, shrd: key, shrdnd: key, shrd_8: key, shrdnd_8: key, rdot: key,
            rdotnd: key , rdot_8: key , rdotnd_8: key, dhot: key, dhotnd: key, dhot_8: key , dhotnd_8: key, dhrd: key,
            dhrdnd: key, dhrd_8: key, dhrdnd_8: key, Remarks: key

        });
      }
    }
    a = a;
  }

  renderRows(){
    this._table.renderRows();
  }

  onRowClick(i,row: any) {
    if(this.view){
        this.viewList = []
        this.selectView.toggle(row);
        if(this.selectView.selected.length>1){
            this.selectView.deselect(this.selectView.selected[0]);
        }
        if (this.selectView.selected.length>0) {
            var rowID = row.id
            this.viewList.push(rowID)
            this.selected.emit(this.viewList)
        } else {
            this.selectView.deselect(this.selectView.selected[0]);
            this.selected.emit(this.viewList)
          return
        }
    }
  }

}
