import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { DeductionForm} from 'app/model/payroll/paycodes';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { CoreService } from 'app/services/coreService/coreService.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { forkJoin } from 'rxjs';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';

import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatSelectModule } from '@angular/material/select';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.css'],
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
    DropdownComponent,
    DropdownCustomComponent,
    MatOptionModule,
    TranslocoModule
],
})
export class DeductionsComponent implements OnInit {
    deductionForm: FormGroup
    id: string;
    _onDestroy: any
    dropdownFix = new DropdownRequest
    dropdownOptions = new DropdownOptions
    isSave: boolean = false
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private coreService: CoreService,
        private payrollService: PayrollService,
        private message: FuseConfirmationService,
        private tenantService: TenantService,

        private router: Router,) { }

    get df() {return this.deductionForm.value}

  ngOnDestroy(): void {
    this._onDestroy.unsubscribe()
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.deductionForm = this.fb.group(new DeductionForm());
    if (this.id !== "") {
      //fetch edit data here
      this._onDestroy = this.payrollService.getLookupDeductionsType(this.id).subscribe({
        next: (value: any) => {
          if (value.statusCode == 200) {
            this.deductionForm.patchValue(JSON.parse(JSON.stringify(value.payload)))
            this.dropdownFix.id.push(
              { dropdownID: value.payload.categoryID == null ? 0 : value.payload.categoryID,     dropdownTypeID: 92 },
              { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountCode,0)            , dropdownTypeID: 133 },
              { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountId,0)            , dropdownTypeID: 134 },
              { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountCode1,0)            , dropdownTypeID: 133 },
              { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountName1,0)            , dropdownTypeID: 134 }
            )

            this.loadDropdown()
            this.initData()
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
      this.loadDropdown()
      this.initData()
    } else {
        this.dropdownFix.id.push(
            { dropdownID: 0, dropdownTypeID: 92 },
            { dropdownID: 0, dropdownTypeID: 133 },
            { dropdownID: 0, dropdownTypeID: 134 })
      this.loadDropdown()
      this.initData()
    }
  }

  initData(){
    this._onDestroy = this.coreService.getCoreDropdown(1042,this.dropdownFix)
    .subscribe({
      next: (value: any) => {
          this.dropdownOptions.categoryDef  = value.payload//.filter(x => x.dropdownTypeID === 92)
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        this.deductionForm.enable();
      }
    });
  }

  loadDropdown(){
    forkJoin({
        tenant: this.tenantService.getDropdown(this.dropdownFix),
    }).subscribe({
        next: (response) => {
            this.dropdownOptions.accountCodeDef  = _.uniqBy(response.tenant.payload.filter(x => x.dropdownTypeID == 133)   , JSON.stringify)
            this.dropdownOptions.accountNameDef  = _.uniqBy(response.tenant.payload.filter(x => x.dropdownTypeID == 134)   , JSON.stringify)
        },
        error: (e) => {
            console.error(e)
        },
        complete: () => {
            this.deductionForm.enable();
          }
    });
  }

  submit(){
    this.deductionForm.markAllAsTouched()
    if (this.deductionForm.valid) {
      const dialogRef = this.message.open(SaveMessage);
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "confirmed") {
          this.isSave = true

          // Duplicate
          var ac = this.deductionForm.getRawValue()
          var clone = (sessionStorage.getItem("action") == "duplicate")
          ac.id   = clone ? 0   : ac.id

          this.payrollService.postLookupDeductionsType(ac).subscribe({
            next: (value: any) => {
              if (value.statusCode == 200) {
                this.message.open(SuccessMessage);
                this.isSave = false,
                this.router.navigate(['/search/pay-codes']);
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
