
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { LookupPayReg } from 'app/model/payroll/payreg-code';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-payreg-code',
  templateUrl: './payreg-code.component.html',
  styleUrls: ['./payreg-code.component.css'],
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
    DropdownComponent,
    MatSelectModule,
    MatIconModule
]
})
export class PayregCodeComponent implements OnInit {
    payregForm: FormGroup
    dropdownFix = new DropdownRequest
    dropdownOptions = new DropdownOptions
    id: string;
    isSave: boolean = false
    _onDestroy: any

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private message: FuseConfirmationService,
    private router: Router,
    private payrollService: PayrollService,
    private tenantService: TenantService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.payregForm = this.fb.group(new LookupPayReg());

    if (this.id !== "") {
        //fetch edit data here
        this._onDestroy = this.payrollService.getLookupPayReg(this.id).subscribe({
          next: (value: any) => {
            if (value.statusCode == 200) {

              this.payregForm.patchValue(JSON.parse(JSON.stringify(value.payload)))
              this.dropdownFix.id.push(
                { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountId,0)            , dropdownTypeID: 133 },
                { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountCode,0)            , dropdownTypeID: 134 },
                { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountCode1,0)            , dropdownTypeID: 133 },
                { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountName1,0)            , dropdownTypeID: 134 },

              )

              this.loadDropdown()
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
          this.dropdownFix.id.push(
              { dropdownID: 0, dropdownTypeID: 133 },
              { dropdownID: 0, dropdownTypeID: 134 })
        this.loadDropdown()
      }
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
            this.payregForm.enable();
          }
    });
  }

  submit(): void {
    if (this.payregForm.valid) {
        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.isSave = true

                this.payrollService.postLookupPayReg(this.payregForm.value).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.message.open(SuccessMessage);
                            this.isSave = false
                            this.router.navigate(['/search/payreg-code-view']);
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
