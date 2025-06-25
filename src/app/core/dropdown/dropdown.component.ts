import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { DropdownSettings, SystemSettings } from 'app/model/app.constant';
import { DropdownRequest, dropdownType, dropdownTypeFix } from 'app/model/dropdown.model';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, debounceTime, scan } from 'rxjs/operators';
import { myData } from 'app/app.moduleId';
import Gleap from 'gleap';
import { fuseAnimations } from '@fuse/animations';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient } from '@angular/common/http';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
// import * as data from '../../public/i18n/ph.json';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
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
    MatTooltipModule,
    TranslocoModule
  ],
})
export class DropdownComponent implements OnInit {
  @Input() control: AbstractControl = new FormControl();
  @Input() useControl: boolean = true
  @Input() reset: boolean = false
  @Input() options: any[] = [];
  @Input() icon: string
  @Input() type: number = 0
  @Input() all:  boolean = false
  @Input() id:       string
  @Input() multiple: boolean = false
  @Input() value: any
  @Input() label: string
  @Input() disabled : boolean = false
  @Input() dropdownValue:  string // used for value and label default value = dropdownID , label = description
  @Input() dropdownLabel:  string // used for value and label default value = dropdownID , label = description
  @Input() objectValue:    boolean = false // used for value want object and been relected on '@Output objects'
  @Input() isFix : boolean = false
  @Input() disableOptions: number[] = []
  @Input() orderBy: string = "description"
  @Input() isedit: boolean = false;
  @Output() selected = new EventEmitter<any>();
  @Output() exluded = new EventEmitter<any>();
  @Output() objects = new EventEmitter<any>();
  @Input() multiType: any
  isDropdownFix: boolean = false
  dropdownRequest = new DropdownRequest
  inputChange: UntypedFormControl = new UntypedFormControl();
  data: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  protected _onDestroy = new Subject<void>();
  dropdownTypeFix: any = dropdownTypeFix
  dropdownType: any = dropdownType
  systemSettings = SystemSettings
  dropdownSettings = DropdownSettings
  dropdownDetail = {
    id: 0,
    description: ""
  }
  options_old: any[] = [];
  placeholder: string = ""
  index: number = 1
  complete: boolean = false
  // value = '';
  prev = {
    id: null,
    text: "",
    value: []
  }
  exclude = []
  dataOptions = new BehaviorSubject<string[]>([]);
  options$: Observable<string[]>;
  mode = 0;//1 - search;
  selectedItem: any[] = [];
  translations: { [key: string]: string } = {};
  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(
    private tenantService: TenantService,
    private masterService: MasterService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private translocoService: TranslocoService
  ) {
    this.options$ = this.dataOptions.asObservable().pipe(
      scan((acc, curr) => {
        var out = [];

        //next batch 1 or 0 not
        if (this.mode === 1) {
          out = curr
        } else {
          out = _.uniqBy([...acc, ...curr], JSON.stringify);
        }

        //back-up old record
        var old = _.uniqBy([...this.options_old,...out], JSON.stringify);
        // if (!myData.dropdownBypass) {
        //     this.options_old = GF.sort(old, this.orderBy);
        //     return GF.sort(out, this.orderBy);
        // } else {
            this.options_old = old // GF.sort(old,'description');
            return out // GF.sort(out,'description');
        // }

      }, [])
    );
  }

  ngDoCheck(){
    this.placeholder = this.translocoService.translate(GF.IsEmptyReturn(this.label,this.type+''));
  }

  ngOnInit() {
    if(this.dropdownTypeFix.filter(x => x.id === this.type)[0] == undefined){
      this.dropdownDetail = this.dropdownType.filter(x => x.id === this.type)[0]
      // this.isDropdownFix = this.isFix
    }
    else{
      // this.isDropdownFix = this.isFix
      this.dropdownDetail = this.dropdownTypeFix.filter(x => x.id === this.type)[0]

    }
    this.isDropdownFix = this.isFix
    // this.placeholder = GF.IsEmptyReturn(this.label,this.dropdownDetail?.description);
    this.placeholder = this.translocoService.translate(GF.IsEmptyReturn(this.label,this.type+''));

    this.dropdownValue =  GF.IsEmptyReturn(this.dropdownValue,'dropdownID')
    this.dropdownLabel =  GF.IsEmptyReturn(this.dropdownLabel,'description')

    this.inputChange.valueChanges
    .pipe(debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this._onDestroy))
    .subscribe((res) => {
        if (res != "") {
          this.dropdownRequest.start = 0
          this.filterDropdown(1);
        } else {
          if (this.useControl) {
            var listV = this.multiple ? _.unionBy([...GF.IsEmptyReturn(this.control.value, []),...GF.IsEmptyReturn(this.selectedItem,[])]) : []
            this.control.patchValue(this.multiple ? listV : GF.IsEmptyReturn(this.control.value, 0));
          }
          this.dataOptions.next(this.options_old)
        }
    });

    // this.options_old = this.options.slice();
    // this.dataOptions.next(GF.IsEmptyReturn(this.options,this.options_old))

    if (!this.useControl && this.options.length == 0) {
      this.filterDropdown(0)

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

  ngOnDestroy(): void {
    this._onDestroy.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( 'value' in changes ) {
      // console.log(changes.value.currentValue,"current")
      if (!GF.IsEmpty(changes.value.currentValue)) {
        this.isDropdownFix = this.isFix; //!GF.IsEmpty(this.dropdownTypeFix.filter(x => x.id === this.type)[0])
        this.filterDropdown(0)
      }

      if (this.all && this.multiple && !GF.IsEmpty(this.options_old) && changes.value.currentValue.some(x=>x==0)) {
        this.value = [...this.options_old.map(x=>x[this.dropdownValue]),0]
      }
      else if (!GF.IsEmpty(this.options_old) && !GF.IsEmpty(this.value)) {
        var obj = []
        var ids
        if (this.multiple && !GF.arraysAreEqual(this.prev.value,this.value)) {
          obj = this.options_old.filter(x=>this.value.includes(x.dropdownID))
          ids = obj.map(x=>x.dropdownID)

          this.selected.emit(ids)
          this.objects.emit(obj)
        } else if(this.prev.value !== this.value) {
          obj = this.options_old.filter(x=>x.dropdownID == this.value)
          ids = this.value

          this.selected.emit(ids)
          this.objects.emit(obj)
        }
        this.prev.value = this.value;
      }
    }

    if (this.useControl) {
      this.selectedItem = this.control.value
    }

    if ("reset" in changes) {
      if (this.value && changes.reset.currentValue) {
        this.value = []
      }
    }

    if ( 'options' in changes ) {
      this.dataOptions.next(this.options)
      // this.completeChecker(this.options)
    }

    this.cdr.detectChanges();
  }

  get isRequired(): boolean {
    return this.control.validator && this.control.validator({} as AbstractControl) && this.control.validator({} as AbstractControl).required;
  }

  get isInputEmpty(): boolean {
    return !this.control.value || this.control.value.length === 0;
  }

  filterDropdown(m) {
    this.mode = m;
    const search = this.inputChange.value?.toLowerCase() || ""

    this.dropdownRequest.search = search
    this.dropdownRequest.id = []

    if (this.multiple && !GF.IsEmpty(this.value)) {
      this.value.forEach(id => {
        this.dropdownRequest.id.push({ dropdownID: id, dropdownTypeID: this.type })
      });
    } else {
        this.dropdownRequest.id.push({ dropdownID: GF.IsEmptyReturn(this.value,0) , dropdownTypeID: this.type })
    }

    var service = this.isDropdownFix ? ["masterService", "getDropdownFix"] : ["tenantService", "getDropdown"]
    this[service[0]][service[1]](this.dropdownRequest).subscribe({
      next: (value: any) => {
        this.dataOptions.next(value.payload)

      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      },
    });
  }

  async getNextBatch(m){
    this.mode = m;
    if(!this.complete){
      this.dropdownRequest.search = this.inputChange.value?.toLowerCase() || null
      this.dropdownRequest.start = this.index++
      this.dropdownRequest.id = []
      if (this.multiple && !GF.IsEmpty(this.value)) {
        this.value.forEach(id => {
          this.dropdownRequest.id.push({dropdownID: id, dropdownTypeID: this.type})
        });
      } else {
        this.dropdownRequest.id.push({dropdownID: GF.IsEmptyReturn(this.value,0), dropdownTypeID: this.type})
      }

      var service = this.isDropdownFix ? ["masterService", "getDropdownFix"] : ["tenantService", "getDropdown"]
      this[service[0]][service[1]](this.dropdownRequest).subscribe({
        next: (value: any) => {
          this.completeChecker(value.payload)
          this.dataOptions.next(value.payload)
          if (this.allSelected?.selected) {
            this.selectAll()
          }
        },
        error: (e) => {
          console.error(e)
        },
        complete: () => {
        },
      });
    }
  }

  completeChecker(option): void {
    if(this.dropdownSettings.length > option.length){
      this.complete = true
    }
    else{
      this.complete = false
    }
  }

  selectAll() {
    var result: any
    var obj: any = this.multiple ? [] : 0
    if (this.useControl) {
      if (this.multiple) {
        if (this.allSelected.selected) {
          this.control.patchValue([...this.options_old.map(item => item[this.dropdownValue]), 0])
          obj = [...this.options_old.map(item => item), 0]
        } else {
          this.control.patchValue([]);
        }
      } else {
        if (this.allSelected.selected) {
          this.control.patchValue(0);
          obj = 0
        } else {
          this.control.patchValue(null);
        }
      }
      result = this.control.value
    } else {
      if (this.multiple) {
        if (this.allSelected.selected) {
          this.value = [...this.options_old.map(item => item[this.dropdownValue]), 0]
          obj =        [...this.options_old.map(item => item ), 0]
        } else {
          this.value = []
        }
      } else {
        if (this.allSelected.selected) {
          this.value = 0
          obj = 0
        } else {
          this.value = null
        }
      }
      result = this.value
    }
    // this.initData(mode.all)
    this.selected.emit(result)
    this.objects.emit(obj)
  }

  selectItem(id, val){
    var objVal: any
    if (this.multiple) {
      if (val.some(x => x === 0)) {
        this.exclude = GF.removeOrPushFromList(val,this.exclude,id);
        this.exluded.emit(this.exclude)
      } else {
        this.selectedItem = GF.removeOrPushFromList([],this.selectedItem,id);
      }

      objVal = this.options_old.filter(x=> val.includes(x.dropdownID))
    } else {
      this.selectedItem = val
      objVal = this.options_old.filter(x => x.dropdownID == val)
    }


    this.selected.emit(this.selectedItem)
    this.objects.emit(objVal)
  }

  selectedEvent(e){
    if (e.value !== undefined) {
      if (this.multiple) {
        if (e.value.some(x=>x[this.dropdownValue] === 0)) {
          return
        }
      } else {
        if (e.value === 0) {
          return
        }
      }
      // this.selected.emit(e.value)
      if(!this.isedit) {
        this.selected.emit(e.value)
      }
      // this.objects.emit(e.value)
    }
  }

  selDisplayNgModel(values){
    try {
      if (!GF.IsEmpty(values,true) && !GF.IsEmpty(this.options_old)) {
        var out:string
        if (this.multiple) {
          if (values.length === 0) {
            return ""
          }
          if (values.some(x=>x === 0)) {
            out = "All"
          } else {
            out = this.options_old.find(item=>item[this.dropdownValue] === values[0])[this.dropdownLabel]
          }
        } else {
          if (values === 0 && this.all) {
            out = "All"
          } else {
            if (values === 0) {
              return ""
            }
            out = this.options_old.find(item=>item[this.dropdownValue] === values)[this.dropdownLabel]
          }
        }
        this.prev.id = values
        this.prev.text = out
        return out;
    }
    } catch (error) {
      // console.log({
      //   label: this.placeholder,
      //   error: error.message,
      //   value: values,
      //   list: this.options_old,
      //   dropdown: this.dropdownDetail
      // })
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

  disableOpt(id){
    var hasAll = this.disableOptions.some(x=>x === 0)
    return hasAll ? true : this.disableOptions.some(x=>x === id)
  }

}
