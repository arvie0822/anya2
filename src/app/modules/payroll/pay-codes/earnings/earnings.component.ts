
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { EarningForm} from 'app/model/payroll/paycodes';
import { CoreService } from 'app/services/coreService/coreService.service';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css'],
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
    DropdownCustomComponent,
    DropdownComponent,
    MatOptionModule,
    TranslocoModule,
    MatTooltipModule
],
})
export class EarningsComponent implements OnInit {
     earningform: FormGroup
     id: string;
    _onDestroy: any
    dropdownFix = new DropdownRequest
    dropdownOptions = new DropdownOptions

    isSave: boolean = false
    disable: boolean = false

  constructor( private route: ActivatedRoute,
    private fb: FormBuilder,
    private message: FuseConfirmationService,
    private payrollService: PayrollService,
    private coreService: CoreService,
    private router: Router,
    private tenantService: TenantService,
    public dialog: MatDialog) { }

    get ef() {
      return this.earningform.value
    }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.earningform = this.fb.group(new EarningForm());
    if (this.id !== "") {
      //fetch edit data here
      this._onDestroy = this.payrollService.getLookupEarningsType(this.id).subscribe({
        next: (value: any) => {
          if (value.statusCode == 200) {
            this.earningform.patchValue(JSON.parse(JSON.stringify(value.payload)))
            this.dropdownFix.id.push(
              { dropdownID: value.payload.categoryID == null ? 0 : value.payload.categoryID,     dropdownTypeID: 92 },
              { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountCode,0)            , dropdownTypeID: 133 },
              { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountId,0)            , dropdownTypeID: 134 },
              { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountCode1,0)            , dropdownTypeID: 133 },
              { dropdownID: GF.IsEmptyReturn(value.payload.jeAccountName1,0)            , dropdownTypeID: 134 },

            )

            this.initData()
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

      this.initData()
      this.loadDropdown()
    } else {
        this.dropdownFix.id.push(
            { dropdownID: 0, dropdownTypeID: 92 },
            { dropdownID: 0, dropdownTypeID: 133 },
            { dropdownID: 0, dropdownTypeID: 134 })
      this.initData()
      this.loadDropdown()
    }
  }

  initData(){
    this._onDestroy = this.coreService.getCoreDropdown(1041,this.dropdownFix)
    .subscribe({
      next: (value: any) => {
          this.dropdownOptions.categoryDef  = value.payload
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        this.earningform.enable();
        this.earningform.get('isTaxable').disable()
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
            this.earningform.enable();
            this.earningform.get('isTaxable').disable()
          }
    });
  }

  taxable(){
    const cat = this.earningform.value.categoryID
    // var this.dropdownOptions.categoryDef.filter(x => x.dropdownID === cat).isTaxable === true
    if ((cat >= 10 && cat <= 21) || cat === 25) {
        this.earningform.get('isTaxable').setValue(true)
    } else {
        this,this.earningform.get('isTaxable').setValue(false)
    }
  }

  submit(){
    this.earningform.markAllAsTouched()
    if (this.earningform.valid) {
      const dialogRef = this.message.open(SaveMessage);
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "confirmed") {
          this.isSave = true

          // Duplicate
          var ac = this.earningform.getRawValue()
          var clone = (sessionStorage.getItem("action") == "duplicate")
          ac.id   = clone ? 0   : ac.id

          this.payrollService.postLookupEarningsType(ac).subscribe({
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
