
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { LookupRateType } from 'app/model/payroll/rate';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { CustomModule } from 'app/shared/custom.module';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
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
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    CustomModule,
    TranslocoModule
],
})
export class RatesComponent implements OnInit {
    displayedColumns: string[] = ['code','description', 'otRatePerc', 'jeAccountCode', 'jeAccountId'];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    data = []
    RateTypeForm: FormGroup
    dateCreated: string = new Date().toISOString().substring(0,new Date().toISOString().length-1)
    id: string;
    _onDestroy : any
    saveMessage = Object.assign({}, SaveMessage)
    dropdownRequest = new DropdownRequest
    accountCodeList = []
    accountNameList = []
    pageIndex = 0

  constructor(
    private route: ActivatedRoute,
    private message: FuseConfirmationService,
    private payrollService: PayrollService,
    private tenantService: TenantService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.RateTypeForm = this.fb.group(new LookupRateType());

    this.dropdownRequest.length = 500;
     if (this.id !== "") {
      forkJoin({
        LookupRateType: this.payrollService.getLookupRateType(this.id),
        rateTypeDetails: this.payrollService.getRateTypeDetails(this.id),
      }).subscribe({
        next: (value: any) => {
          this.data = value.rateTypeDetails.payload
          this.RateTypeForm.patchValue(value.LookupRateType.payload)
          this.formatData()

          // this.dropdownRequest.id.push(
          //   { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountCode,0), dropdownTypeID: 133 },
          //   { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountId,0),   dropdownTypeID: 134 },
          // )
          this.dropdownRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 133 },
            { dropdownID: 0, dropdownTypeID: 134 },
          )
          this.loadDropdown()
        },
        error: (e) => {
          console.error(e)
        }
      });
     } else {
      this.data = [
        { id: 0, rateTypeID: 0, dayTypeID: 1,  overtimeCategoryID: 1, code: "Reg",        description: "Regular Work",              otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular"                  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 1,  overtimeCategoryID: 2, code: "RegND",      description: "Regular Night Diff",        otRate: 0.1,     createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular"                  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 1,  overtimeCategoryID: 3, code: "RegOT",      description: "Regular OT",                otRate: 1.25,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular"                  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 1,  overtimeCategoryID: 4, code: "RegNDOT",    description: "Regular Night Diff OT",     otRate: 1.375,   createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular"                  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 2,  overtimeCategoryID: 1, code: "RD",         description: "Rest Day Work",             otRate: 1.3,     createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Rest Day"                 ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 2,  overtimeCategoryID: 2, code: "RDND",       description: "Rest Day Night Diff",       otRate: 1.43,   createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Rest Day"                 ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 2,  overtimeCategoryID: 3, code: "RDOT",       description: "Rest Day OT",               otRate: 1.69,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Rest Day"                 ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 2,  overtimeCategoryID: 4, code: "RDNDOT",     description: "Rest Day Night Diff OT",    otRate: 1.859,  createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Rest Day"                 ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 3,  overtimeCategoryID: 1, code: "SH",         description: "Special Holiday Work",      otRate: 0.3,     createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Special Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 3,  overtimeCategoryID: 2, code: "SHND",       description: "Special Holiday ND",        otRate: 1.43,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Special Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 3,  overtimeCategoryID: 3, code: "SHOT",       description: "Special Holiday OT",        otRate: 1.69,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Special Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 3,  overtimeCategoryID: 4, code: "SHNDOT",     description: "Special Holiday ND OT",     otRate: 1.859,  createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Special Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 4,  overtimeCategoryID: 1, code: "SHRD",       description: "Special Holiday RD",        otRate: 1.5,     createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Special Holiday Restday"  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 4,  overtimeCategoryID: 2, code: "SHRDND",     description: "Special Holiday RD ND",     otRate: 1.65,   createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Special Holiday Restday"  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 4,  overtimeCategoryID: 3, code: "SHRDOT",     description: "Special Holiday RD OT",     otRate: 1.95,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Special Holiday Restday"  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 4,  overtimeCategoryID: 4, code: "SHRDNDOT",   description: "Special Holiday RD ND OT",  otRate: 2.145,  createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Special Holiday Restday"  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 5,  overtimeCategoryID: 1, code: "LH",         description: "Regular Holiday Work",      otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 5,  overtimeCategoryID: 2, code: "LHND",       description: "Regular Holiday ND",        otRate: 2.2,     createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 5,  overtimeCategoryID: 3, code: "LHOT",       description: "Regular Holiday OT",        otRate: 2.6,     createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 5,  overtimeCategoryID: 4, code: "LHNDOT",     description: "Regular Holiday ND OT",     otRate: 2.86,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 6,  overtimeCategoryID: 1, code: "LHRD",       description: "Regular Holiday RD",        otRate: 1.6,     createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular Holiday Restday"  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 6,  overtimeCategoryID: 2, code: "LHRDND",     description: "Regular Holiday RD ND",     otRate: 2.86,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular Holiday Restday"  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 6,  overtimeCategoryID: 3, code: "LHRDOT",     description: "Regular Holiday RD OT",     otRate: 3.38,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular Holiday Restday"  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 6,  overtimeCategoryID: 4, code: "LHRDNDOT",   description: "Regular Holiday RD ND OT",  otRate: 3.718,   createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Regular Holiday Restday"  ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 7,  overtimeCategoryID: 1, code: "DH",         description: "Double Holiday Work",       otRate: 2,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Double Holiday"           ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 7,  overtimeCategoryID: 2, code: "DHND",       description: "Double Holiday ND",         otRate: 3.3,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Double Holiday"           ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 7,  overtimeCategoryID: 3, code: "DHOT",       description: "Double Holiday OT",         otRate: 3.9,     createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Double Holiday"           ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 7,  overtimeCategoryID: 4, code: "DHNDOT",     description: "Double Holiday ND OT",      otRate: 4.29,   createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Double Holiday"           ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 8,  overtimeCategoryID: 1, code: "DHRD",       description: "Double Holiday RD",         otRate: 2.9,     createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Double Holiday Restday"   ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 8,  overtimeCategoryID: 2, code: "DHRDND",     description: "Double Holiday RD ND",      otRate: 4.29,   createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Double Holiday Restday"   ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 8,  overtimeCategoryID: 3, code: "DHRDOT",     description: "Double Holiday RD OT",      otRate: 5.07,    createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Double Holiday Restday"   ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 8,  overtimeCategoryID: 4, code: "DHRDNDOT",   description: "Double Holiday RD ND OT",   otRate: 5.577,  createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Double Holiday Restday"   ,jeAccountCode: null, jeAccountId: null },
        //Company Holiday
        { id: 0, rateTypeID: 0, dayTypeID: 9,  overtimeCategoryID: 1, code: "CH",         description: "Company Holiday Work",      otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Company Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 9,  overtimeCategoryID: 2, code: "CHND",       description: "Company Holiday ND",        otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Company Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 9,  overtimeCategoryID: 3, code: "CHOT",       description: "Company Holiday OT",        otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Company Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 9,  overtimeCategoryID: 4, code: "CHNDOT",     description: "Company Holiday ND OT",     otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Company Holiday"          ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 10, overtimeCategoryID: 1, code: "CHRD",       description: "Company Holiday RD",        otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Company Holiday Rest Day" ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 10, overtimeCategoryID: 2, code: "CHRDND",     description: "Company Holiday RD ND",     otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Company Holiday Rest Day" ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 10, overtimeCategoryID: 3, code: "CHRDOT",     description: "Company Holiday RD OT",     otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Company Holiday Rest Day" ,jeAccountCode: null, jeAccountId: null },
        { id: 0, rateTypeID: 0, dayTypeID: 10, overtimeCategoryID: 4, code: "CHRDNDOT",   description: "Company Holiday RD ND OT",  otRate: 1,       createdBy: 1, dateCreated: this.dateCreated, active: true, dayType: "Company Holiday Rest Day" ,jeAccountCode: null, jeAccountId: null },
       ]
       this.formatData();

       this.dropdownRequest.id.push(
         { dropdownID: 0, dropdownTypeID: 133 },
         { dropdownID: 0, dropdownTypeID: 134 },
       )
       this.loadDropdown()
     }
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator
  }

  formatData(){
    this.data.forEach(day=>{
      day.otRatePerc = this.decimalToPercentage(day.otRate)
    })

    this.dataSource.data = this.data
  }

  decimalToPercentage(decimal) {
    return (decimal * 100).toFixed(3) + '%';
  }

  percentageToDecimal(percentage: string) {
    if (percentage.includes(".")) {
      const percentageValue = parseFloat(percentage.replace('%', ''));
      return percentageValue / 100;
    } else {
      const percentageValue = parseFloat(percentage.replace('%', ''));
      return percentageValue / 100;
    }
  }

  loadDropdown(){
    this.tenantService.getDropdown(this.dropdownRequest).subscribe({
      next: (value: any) => {
        this.accountCodeList = value.payload.filter(x=>x.dropdownTypeID === 133)
        this.accountNameList = value.payload.filter(x=>x.dropdownTypeID === 134)
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  changeEvent(i, key){
    if (i === 0 && this.pageIndex === 0) {
      this.saveMessage.title = "Confirmation"
      this.saveMessage.message = "Apply to all?"
      this.saveMessage.actions.cancel.label = "No"
      var apply = this.message.open(this.saveMessage);
      apply.afterClosed().subscribe((result) => {
        if (result == "confirmed") {
          var get = this.data[i][key]
          this.data.forEach(item => {
              item[key] = Number(get)
          });
        }
      });
    }
  }

  nextBatch(e){
    this.pageIndex = e.pageIndex
  }

  submit(){
    this.data.forEach(day => {
      day.otRate = this.percentageToDecimal(day.otRatePerc)
    });

    this.RateTypeForm.markAllAsTouched()
    if (!this.RateTypeForm.valid) {
      return
    }

    const dialogRef = this.message.open(SaveMessage);
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "confirmed") {
          // this.isSave = true

          // Duplicate
          var ac = this.RateTypeForm.getRawValue()
          var clone = (sessionStorage.getItem("action") == "duplicate")
          ac.id   = clone ? 0   : ac.id

          this.payrollService.postLookupRateType(ac).subscribe({
            next: (value: any) => {
              if (value.statusCode == 200) {

                this.data.forEach(rateType => {
                  rateType.rateTypeID = value.payload
                  rateType.id = clone ? 0 : rateType.id
                });

                this.payrollService.postRateType(this.data).subscribe({
                  next: (value: any) => {
                    if (value.statusCode == 200) {
                      this.message.open(SuccessMessage);
                      // console.log(value)
                      // this.isSave = false,
                      this.router.navigate(['/search/rates']);
                    }
                    else {
                      this.message.open(FailedMessage);
                      console.log(value.stackTrace)
                      console.log(value.message)
                    }
                  },
                  error: (e) => {
                    // this.isSave = false
                    this.message.open(FailedMessage);
                    console.error(e)
                  }
                });
              }
              else {
                this.message.open(FailedMessage);
                console.log(value.stackTrace)
                console.log(value.message)
              }
            },
            error: (e) => {
              // this.isSave = false
              this.message.open(FailedMessage);
              console.error(e)
            }
          });
        }
      });
  }

}
