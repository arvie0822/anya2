import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { myData } from 'app/app.moduleId';
import { PayrollHeader } from 'app/model/administration/payroll-category';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { forkJoin } from 'rxjs';
import _ from 'lodash';
import { GF } from 'app/shared/global-functions';
import { fuseAnimations } from '@fuse/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatOptionModule } from '@angular/material/core';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-payroll-category',
  templateUrl: './payroll-category.component.html',
  styleUrls: ['./payroll-category.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CardTitleComponent,
    DropdownCustomComponent,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    TranslocoModule
],
})
export class PayrollCategoryComponent implements OnInit {

  @Input() parentDetail: any[]
  @Input() hide: boolean = true
  @Input() hidebuttons: boolean = false
  @Input() data: any
  @Input() _id: string = ""
  @Output() formChanged = new EventEmitter<FormGroup>();

  payrollCategoryForm: FormGroup
  view: boolean = false
  _onDestroy: any
  id: string = ""
  dropdownFix = new DropdownRequest
  dropdownRequest = new DropdownRequest
  _13MonthRequest = new DropdownRequest
  _14MonthRequest = new DropdownRequest
  _15MonthRequest = new DropdownRequest
  _16MonthRequest = new DropdownRequest
  dropdownOptions = new DropdownOptions

  isSave: Boolean = false

  datas : any

  boolOption = [
    { dropdownID: 1, description: 'Yes' },
    { dropdownID: 0, description: 'No' },
  ];
  boolOption2 = [
    { dropdownID: true, description: 'Yes' },
    { dropdownID: false, description: 'No' },
  ];

  cutoff = []
  dailyRateList = []
  hourlyRateList = []
  wage = []
  PremRateTypeList = []
  fixedDedList = []
  fixedEarList = []
  sssList = []
  hdmfList = []
  phicList = []
  taxList = []
  dedHierList = []
  repSettingList = []
  sssMatList = []
  _13MonthList = []
  _14MonthList = []
  _15MonthList = []
  _16MonthList = []
  InitialDE = []


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private payrollService: PayrollService,
    private message: FuseConfirmationService,
    private router: Router,
    private tenantService: TenantService,
    private masterService: MasterService,
    private coreService: CoreService,
  ) { }

  get paycat(){
    return this.payrollCategoryForm.value
  }

  ngOnChanges(){
    if (this.parentDetail !== undefined) {
      this.view = this.parentDetail["view"]
      this.id = this._id
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.parentDetail !== undefined) {
      this.view = this.parentDetail["view"]
      this.id = this._id
      // if (this.parentDetail["edit"]) {
      //     this.patchData(this.data)
      // }
    }

    this.payrollCategoryForm = this.fb.group(new PayrollHeader());
    // this.payrollCategoryForm.reset()

    if (this.id !== "") {

      this.payrollCategoryForm.disable();
      this._onDestroy = this.payrollService.getPayrollCategory(this.id).subscribe({
        next: (value: any) => {
          if (value.statusCode == 200) {
            this.payrollCategoryForm.patchValue(JSON.parse(JSON.stringify(value.payload).replace(/\:null/gi, "\:[]")))
            this.dropdownFix.id.push(
              { dropdownID: value.payload.dailyRate     == null ? 0 : value.payload.dailyRate,    dropdownTypeID: 135 },
              { dropdownID: value.payload.hourlyRate    == null ? 0 : value.payload.hourlyRate,   dropdownTypeID: 136 },
              { dropdownID: value.payload.sssMaternity  == null ? 0 : value.payload.sssMaternity, dropdownTypeID: 137 },
              { dropdownID: value.payload.reportSetting == null ? 0 : value.payload.sssMaternity, dropdownTypeID: 140 },
              { dropdownID: value.payload.wageType      == null ? 0 : value.payload.wageType,     dropdownTypeID: 77  },
            )
            this.initData()
            this.payrollCategoryForm.enable();

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
    } else {

        if (sessionStorage.getItem('moduleId') == '17') {
            this.payrollCategoryForm.patchValue(JSON.parse(JSON.stringify(GF.IsEmptyReturn(this.datas,this.data)).replace(/\:null/gi, "\:[]")))
        }

      this.dropdownFix.id.push(
        { dropdownID: 0, dropdownTypeID: 135 },
        { dropdownID: 0, dropdownTypeID: 136 },
        { dropdownID: 0, dropdownTypeID: 137 },
        { dropdownID: 0, dropdownTypeID: 140 },
        { dropdownID: 0, dropdownTypeID: 77 },
      )

      this.initData()
    }
  }


  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  patchData(value){
    this.cutoff            =  _.uniqBy([...this.cutoff,           ...value.payrollCutoff.payload], JSON.stringify)
    this.dailyRateList     =  _.uniqBy([...this.dailyRateList,    ...value.dropdownFix.payload.filter(x => x.dropdownTypeID === 135)], JSON.stringify)
    this.hourlyRateList    =  _.uniqBy([...this.hourlyRateList,   ...value.dropdownFix.payload.filter(x => x.dropdownTypeID === 136)], JSON.stringify)
    this.wage              =  _.uniqBy([...this.wage,             ...value.dropdownFix.payload.filter(x => x.dropdownTypeID === 77)], JSON.stringify)
    this.PremRateTypeList  =  _.uniqBy([...this.PremRateTypeList, ...value.premRate.payload], JSON.stringify)
    this.fixedDedList      =  _.uniqBy([...this.fixedDedList,     ...value.fixedDeductions.payload.filter(x => x.fixed === true)], JSON.stringify)
    this.fixedEarList      =  _.uniqBy([...this.fixedEarList,     ...value.fixedEarnings.payload.filter(x => x.fixed === true)], JSON.stringify)
    this.sssList           =  _.uniqBy([...this.sssList,          ...value.sss.payload], JSON.stringify)
    this.hdmfList          =  _.uniqBy([...this.hdmfList,         ...value.hdmf.payload], JSON.stringify)
    this.phicList          =  _.uniqBy([...this.phicList,         ...value.phic.payload], JSON.stringify)
    this.taxList           =  _.uniqBy([...this.taxList,          ...value.tax.payload], JSON.stringify)
    this.repSettingList    =  _.uniqBy([...this.repSettingList,   ...value.dropdownFix.payload.filter(x => x.dropdownTypeID === 140)], JSON.stringify)
    this.sssMatList        =  _.uniqBy([...this.sssMatList,       ...value.dropdownFix.payload.filter(x => x.dropdownTypeID === 137)], JSON.stringify)
    this._13MonthList      =  _.uniqBy([...this._13MonthList,     ...value._13Month.payload], JSON.stringify)
    this._14MonthList      =  _.uniqBy([...this._14MonthList,     ...value._14Month.payload], JSON.stringify)
    this._15MonthList      =  _.uniqBy([...this._15MonthList,     ...value._15Month.payload], JSON.stringify)
    this._16MonthList      =  _.uniqBy([...this._16MonthList,     ...value._16Month.payload], JSON.stringify)
    this.InitialDE         =  _.uniqBy([...this.InitialDE,        ...value.inDailyEarnings.payload], JSON.stringify)
    this.dedHierList       =  _.uniqBy([...this.dedHierList,      ...value.dedhirarchy.payload], JSON.stringify)
  }

  initData() {
    this._onDestroy = forkJoin({
      // dropdownDynamic: this.tenantService.getDropdown(this.dropdownRequest),
      dropdownFix:     this.masterService.getDropdownFix(this.dropdownFix),
      fixedDeductions: this.coreService.getCoreDropdown(1021,this.dropdownRequest),
      fixedEarnings:   this.coreService.getCoreDropdown(1022,this.dropdownRequest),
      payrollCutoff:   this.coreService.getCoreDropdown(1023,this.dropdownRequest),
      sss:             this.coreService.getCoreDropdown(1024,this.dropdownRequest),
      hdmf:            this.coreService.getCoreDropdown(1025,this.dropdownRequest),
      phic:            this.coreService.getCoreDropdown(1026,this.dropdownRequest),
      tax:             this.coreService.getCoreDropdown(1027,this.dropdownRequest),
      _13Month:        this.coreService.getCoreDropdown(1037,this._13MonthRequest),
      _14Month:        this.coreService.getCoreDropdown(1038,this._14MonthRequest),
      _15Month:        this.coreService.getCoreDropdown(1039,this._15MonthRequest),
      _16Month:        this.coreService.getCoreDropdown(1040,this._16MonthRequest),
      premRate:        this.coreService.getCoreDropdown(1036,this.dropdownRequest),
      inDailyEarnings: this.coreService.getCoreDropdown(1047,this.dropdownRequest),
      dedhirarchy:     this.coreService.getCoreDropdown(1061,this.dropdownRequest),


    }).subscribe({
      next: (value: any) => {
       this.patchData(value)
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        this.isSave = false
        this.payrollCategoryForm.enable();
      }
    });
  }
  public confirm(){
    // SuccessMessage.title = "Confirmed"
    // SuccessMessage.message = "Payroll Category Successfuly Confirmed!"
    // this.message.open(SuccessMessage);
    this.id = ""
    this._id = ""
    var data = this.payrollCategoryForm.value
    this.datas = data
    this.formChanged.emit(data)
  }

  submit() {
    if (this.payrollCategoryForm.valid) {
      // Duplicate

      this.payrollCategoryForm.get('_13thMonthPay').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value._13thMonthPay,0))
      this.payrollCategoryForm.get('_14thMonthPay').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value._14thMonthPay,0))
      this.payrollCategoryForm.get('_15thMonthPay').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value._15thMonthPay,0))
      this.payrollCategoryForm.get('_16thMonthPay').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value._16thMonthPay,0))

      this.payrollCategoryForm.get('premiumRateType').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.premiumRateType,0))
      this.payrollCategoryForm.get('inDailyEarnings').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.inDailyEarnings,[]))
      this.payrollCategoryForm.get('fixedDeductions').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.fixedDeductions,[]))
      this.payrollCategoryForm.get('fixedEarnings').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.fixedEarnings,[]))
      this.payrollCategoryForm.get('payrollCutoff').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.payrollCutoff,0))

      this.payrollCategoryForm.get('sss').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.sss,0))
      this.payrollCategoryForm.get('hdmf').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.hdmf,0))
      this.payrollCategoryForm.get('phic').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.phic,0))
      this.payrollCategoryForm.get('tax').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.tax,0))
      this.payrollCategoryForm.get('deductionHierarchy').setValue(GF.IsEmptyReturn(this.payrollCategoryForm.value.deductionHierarchy,0))

      var pc = this.payrollCategoryForm.value
      var clone = (sessionStorage.getItem("action") == "duplicate")
      pc.id   = clone ? 0   : pc.id
      pc.code = clone ? ""  : pc.code

      const dialogRef = this.message.open(SaveMessage);
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "confirmed") {
          this.isSave = true
          this.payrollService.postPayrollCategory(pc).subscribe({
            next: (value: any) => {
              if (value.statusCode == 200) {
                this.message.open(SuccessMessage);
                this.isSave = false,
                  this.router.navigate(['/search/payroll-category']);
              }
              else {
                this.message.open(FailedMessage);
                console.log(value.stackTrace)
                console.log(value.message)
              }
            },
            error: (e) => {
              this.isSave = false
              this.message.open(FailedMessage);
              console.error(e)
            }
          });
        }
      });
    }

  }

}
