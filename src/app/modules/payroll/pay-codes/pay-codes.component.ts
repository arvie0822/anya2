import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { MasterService } from 'app/services/masterService/master.service';
import { DeductionsComponent } from './deductions/deductions.component';
import { EarningsComponent } from './earnings/earnings.component';
import { LoansComponent } from './loans/loans.component';

import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-pay-codes',
  templateUrl: './pay-codes.component.html',
  styleUrls: ['./pay-codes.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    CardTitleComponent,
    MatOptionModule,
    EarningsComponent,
    DeductionsComponent,
    LoansComponent,
    MatSelectModule,
    TranslocoModule
],
})
export class PayCodesComponent implements OnInit {
    paycodestype : number
    paycodeForm: FormGroup
    id: string;
    _onDestroy: any
    dropdownFix = new DropdownRequest
    dropdownOptions = new DropdownOptions
    @ViewChild(DeductionsComponent) DedChild: DeductionsComponent;
    @ViewChild(LoansComponent) LoanChild: LoansComponent;
    @ViewChild(EarningsComponent) EarChild: EarningsComponent;
    isEdit: boolean = false

  constructor(private masterService: MasterService,) { }


  ngOnDestroy(): void {
    this._onDestroy.unsubscribe()
  }

  ngOnInit() {
    this.dropdownFix.id.push(
      { dropdownID: 0,      dropdownTypeID: 16 },
    )
    this.initData()
  }

  initData(){
    var adds = sessionStorage.getItem("adds")
    this.isEdit = adds == undefined || adds == null || adds == ""  ? false : true
    this.paycodestype = adds === "Earnings" ? 22862 : adds === "Deduction" ? 22863 : adds === "Loan" ? 30002 : 0
    this._onDestroy = this.masterService.getDropdownFix(this.dropdownFix)
    .subscribe({
      next: (value: any) => {
          this.dropdownOptions.paycodeDef   = value.payload.filter(x => x.dropdownTypeID === 16 && [22862 ,22863 ,30002].includes(x.dropdownID))
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  submit(){
    if (this.paycodestype === 22862) {//Earnings module

      this.EarChild.submit();
    } else
    if (this.paycodestype === 22863) {//Deduction module
      this.DedChild.submit();
    } else
    if (this.paycodestype === 30002) {//loan module
      this.LoanChild.submit();
    }
  }
}
