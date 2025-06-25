import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormControl } from '@angular/forms';
import { DropdownRequest, dropdownEntitlementType } from 'app/model/dropdown-entitlement.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import _ from 'lodash';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, debounceTime } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { MatOption } from '@angular/material/core';
import { GF } from 'app/shared/global-functions';
import { DropdownHierarchyRequest } from 'app/model/dropdown.model';
import { fuseAnimations } from '@fuse/animations';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dropdown-entitlement',
  templateUrl: './dropdown-entitlement.component.html',
  styleUrls: ['./dropdown-entitlement.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatSelectInfiniteScrollModule,
    MatAutocompleteModule,
    MatIconModule,
    SharedModule,
    MatFormFieldModule,
    TranslocoModule,
    MatTooltipModule
  ],
})
export class DropdownEntitlementComponent implements OnInit {
  @Input() control:           AbstractControl = new FormControl();
  @Input() useControl: boolean = false
  @Input() options:           any[] = [];
  @Input() icon:              string
  @Input() type:              number = 0
  @Input() multiple:          boolean = false
  @Input() all:               boolean = false
  @Input() value:             any
  @Input() id:                any[] = []
  @Input() id_to:             any[] = []
  @Input() triggerByParent:   boolean = false
  @Input() customRequest : any

  @Output() selected = new EventEmitter<any>();
  @Output() exluded = new EventEmitter<any>();
  dropdownRequest = new DropdownRequest
  inputChange: UntypedFormControl = new UntypedFormControl();
  data: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  protected _onDestroy = new Subject<void>();
  dropdownEntitlementType: any = dropdownEntitlementType
  dropdownDetail = {
    type: 0,
    label: "",
    uri: "",
    step: 0,
    type_id: 0
  }
  placeholder: string = ""
  index: number = 1
  complete: boolean = false
  _option = []
  cc : number = 0
  prev = {
    id: 0,
    text: ""
  }
  prevEnt = {
    id: null,
    id_to: null
  }
  exclude = []
  @ViewChild('allSelected') private allSelected: MatOption;


  constructor(private coreService: CoreService,private translocoService: TranslocoService) { }

  ngDoCheck(){
    this.placeholder = this.translocoService.translate(GF.IsEmptyReturn(this.dropdownDetail.label, this.type+''));
}

  ngOnInit() {
    this.all
    if(this.dropdownEntitlementType.filter(x => x.type === this.type)[0] !== undefined){
      this.dropdownDetail = this.dropdownEntitlementType.filter(x => x.type === this.type)[0]
    }

    // this.placeholder = this.dropdownDetail.label
    this.placeholder = this.translocoService.translate(GF.IsEmptyReturn(this.dropdownDetail.label,this.type+''));

    this.inputChange.valueChanges
    .pipe(debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterDropdown();
    });

    this.initData(false)
  }



  ngOnDestroy(): void {
    this._onDestroy.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes)
    this.initData(false)

  }

  // selectedEvent(e){
  //   if (e.value !== undefined) {
  //     this.selected.emit(e.value)
  //   }
  // }


  initData(filter){
    //

    this.all
    this.id    = this.id    === null || this.id    === undefined || this.id   .length === 0 ? [0] : Array.isArray(this.id)    ?  this.id : [this.id]        //this.id === ""    || isNaN(this.id)    ||
    this.id_to = this.id_to === null || this.id_to === undefined || this.id_to.length === 0 ? [0] : Array.isArray(this.id_to) ?  this.id_to : [this.id_to]  //this.id_to === "" || isNaN(this.id_to) ||
    var ee = this.dropdownDetail
    if (this.id.length  === 0 || !this.triggerByParent || ee.uri == "" || ee.uri == null || ee.uri == undefined) {return}//return emediately if id/id_to are undefined/null
    if (this.prevEnt.id === this.id && this.prevEnt.id_to === this.id_to) {return}//return emediately if previous ids same into current ids
    // if (this.id_to === 0 && e.step > 2) {return}
    // let params = new HttpParams();
    // params = params.append('id',    this.id   );
    // params = params.append('id_to', this.id_to);


    let params = {
      id: [...this.id],
      toID: this.id_to
    }

    if (!GF.IsEmpty(this.customRequest)) { //for selecting other country but displaying philippines provice
        this.customRequest.forEach(id => {
            params.id.unshift(id)
        });
    }

    this.coreService.getEntitlementv2(ee.uri, params).subscribe({
      next: (value:any) => {

        this._option = value.payload.map(item=>({
          dropdownID:   ee.step === 1 ? item.id       :
                        ee.step === 2 ? item.id_to    :
                        ee.step === 3 ? item.to_id    :
                        ee.step === 4 ? item.to_id_to : 0,

          description:  ee.step === 1 ? item.description       :
                        ee.step === 2 ? item.description_to    :
                        ee.step === 3 ? item.to_description    :
                        ee.step === 4 ? item.to_description_to : 0
        }))
        this.options = []
        this.options = _.uniqBy([...this.options, ...this._option], JSON.stringify)
        this.options = this.options.filter(descrip => descrip.dropdownID !== 0)
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        this.prevEnt.id    = this.id
        this.prevEnt.id_to = this.id_to
        this.data.next(filter ? this.options.filter(item=>item.description.toLowerCase().indexOf(this.dropdownRequest.search) > -1) : this.options);
      },
    });
  }

  async getNextBatch(){

  }

  async filterDropdown(){
    const search = this.inputChange.value.toLowerCase()
    if (!search) {
      this.data.next(this.options)
    } else {
        this.data.next(this.options.filter(item=>item.description.toLowerCase().indexOf(search) > -1));
    }
  }

  selectItem(id, val){
    if (this.multiple) {
      if (val.some(x => x === 0)) {
        if (!val.some(x => x === id)) {
          this.exclude.push(id);
        } else {
          var idx = this.exclude.findIndex(x=>x===id)
          this.exclude.splice(idx,1)
        }
        this.exluded.emit(this.exclude)
      }
    }
  }

  selectAll() {
    var result: any
    if (this.useControl) {
      if (this.multiple) {
        if (this.allSelected.selected) {
          this.control.patchValue([...this.options.map(item => item.dropdownID), 0])
        } else {
          this.control.patchValue([]);
        }
      } else {
        if (this.allSelected.selected) {
          this.control.patchValue(0);
        } else {
          this.control.patchValue(null);
        }
      }
      result = this.control.value
    } else {
      if (this.multiple) {
        if (this.allSelected.selected) {
          this.value = [...this.options.map(item => item.dropdownID), 0]
        } else {
          this.value = []
        }
      } else {
        if (this.allSelected.selected) {
          this.value = 0
        } else {
          this.value = null
        }
      }
      result = this.value
    }

    this.selected.emit(result)
  }

  selectedEvent(e){
      if (e.value !== undefined) {
        if (this.multiple) {
          if (e.value.some(x=>x.dropdownID === 0)) {
            return
          }
        } else {
          if (e.value === 0) {
            return
          }
        }
        this.selected.emit(e.value)
      }

  }

  selDisplayNgModel(values){
    if (values !== undefined && values !== null && values !== "" && (values?.length || 1) > 0 && this.options.length > 0) {
        var out:string
        if (this.multiple) {
          if (values.length === 0) {
            return ""
          }
          if (values.some(x=>x === 0)) {
            out = "All"
          } else {
            out = this.options.find(item=>item.dropdownID === values[0])?.description
          }
        } else {
          if (values === 0 && this.all) {
            out = "All"
          } else {
            out = this.options.find(item=>item.dropdownID === values)?.description || ""
          }
        }
        this.prev.id = values
        this.prev.text = out
        return out;
    }
  }

  isALL(e){
    if (this.multiple) {
      return !GF.IsEqual(0,e)
    } else {
      if (e === 0) {
        return false
      }
    }
  }

  onSelectOpen(isOpen: boolean): void {
    if (isOpen) {
      // console.log('MatSelect is open');
    } else {
      this.inputChange.setValue("");
      // console.log('MatSelect is closed');
    }
  }
}
