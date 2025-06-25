import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import dropdownCustomRoutes from 'app/core/dropdown-custom/dropdown-custom.routes';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { DynamicStatutory } from 'app/model/statutory/setup';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { GF } from 'app/shared/global-functions';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    CardTitleComponent,
    MatTableModule,
    MatPaginatorModule,
    DropdownComponent,
    DropdownCustomComponent,
    MatSelectModule,
    MatDividerModule,
    MatIconModule
],
})

export class SetupComponent implements OnInit {

    uri: string;
    isSave: boolean = false
    update: any
    dynamicForm: FormGroup
    pipe = new DatePipe('en-US');
    isEdit: boolean = false
    statutoryType: number
    check : boolean = false
    passedRequired : boolean = false

    dropdownOptions = new DropdownOptions
    dropdownFixRequest = new DropdownRequest;
    dropdownRequestsub = new DropdownRequest
    failedMessage = { ...FailedMessage}

    firstcutofflist = []
    secondcutofflist = []

    statutory: number = 0
    id: number = 0
    frequencyData: { [key: number]: any } = {};
    initialLoad = true;
    apiDataLoaded = false;
    shodropfirst = true
    shodropsecond = false
    types = [
        { id: 0, description: 'Monthly' },
        { id: 1, description: 'Semi-monthly' },
        { id: 2, description: 'Weekly' },
    ]

    constructor(
        private fb: FormBuilder,
        private masterService: MasterService,
        private message: FuseConfirmationService,
        private payrollService: PayrollService,
        private router: Router,
        private route: ActivatedRoute,
        private coreService: CoreService,
        private cd : ChangeDetectorRef
    ) { }

    get getDy(){ return this.dynamicForm.value }


    ngOnInit() {

        this.uri = this.route.snapshot.paramMap.get('id');

        this.dynamicForm = this.fb.group(new DynamicStatutory());

        this.dynamicForm.get('frequency').valueChanges.subscribe(newFrequency => {
            this.re_type();
            this.restoreData(newFrequency);

            this.calcFull(this.dynamicForm);
          });

        this.frequencyData = {};
        this.apiDataLoaded = false;

          const adds = sessionStorage.getItem("adds");
          const link = {
            SSS: "getDynamicSSS",
            TAX: "getDynamicTAX",
            HDMF: "getDynamicHDMF",
            PHIC: "getDynamicPHIC",
          };

          if (this.uri !== "") {
            this.payrollService.getStatutory(this.uri, link[adds])
              .subscribe({
                next: (value: any) => {
                  this.dropdownFixRequest.id.push(
                    { dropdownID: GF.IsEmptyReturn(value.payload?.statutory, 0), dropdownTypeID: 125 },
                    { dropdownID: GF.IsEmptyReturn(value.payload?.firstCutOff, 0), dropdownTypeID: 126 },
                    { dropdownID: GF.IsEmptyReturn(value.payload?.firstCalc?.basic, 0), dropdownTypeID: 127 },
                    { dropdownID: GF.IsEmptyReturn(value.payload?.firstCalc?.basicvalue, 0), dropdownTypeID: 128 },
                    { dropdownID: GF.IsEmptyReturn(value.payload?.firstCalc, 0), dropdownTypeID: 130 },
                    { dropdownID: GF.IsEmptyReturn(value.payload?.firstCalc, 0), dropdownTypeID: 129 },
                  );

                  if (!GF.IsEmpty(value.payload?.leave)) {
                    value.payload?.leave.forEach(lv => {
                      this.dropdownFixRequest.id.push({ dropdownID: lv, dropdownTypeID: 90 });
                    });
                  } else {
                    this.dropdownFixRequest.id.push({ dropdownID: 0, dropdownTypeID: 90 });
                  }

                  this.dynamicForm.patchValue(value.payload);
                  this.id = value.payload.id;

                  var basic = [
                    value.payload.basic_Current_Month ? 30391 : 0,
                    value.payload.basic_Monthly ? 30392 : 0,
                    value.payload.overtime ? 30393 : 0,
                    value.payload.holiday ? 30394 : 0
                  ];

                  this.dynamicForm.get('basic').setValue(basic.filter(x => x !== 0));

                  this.savedData(value.payload);
                  this.apiDataLoaded = true;

                  const currentFrequency = this.dynamicForm.get('frequency').value;
                  this.restoreData(currentFrequency);

                  this.loadDropdown();
                },
                error: (e) => {
                  console.error(e);
                },
                complete: () => {
                  this.isSave = false;
                }
              });
          } else {
            this.dropdownFixRequest.id.push(
              { dropdownID: 0, dropdownTypeID: 90 },
              { dropdownID: 0, dropdownTypeID: 69 },
              { dropdownID: 0, dropdownTypeID: 125 },
              { dropdownID: 0, dropdownTypeID: 126 },
              { dropdownID: 0, dropdownTypeID: 127 },
              { dropdownID: 0, dropdownTypeID: 128 },
              { dropdownID: 0, dropdownTypeID: 129 },
              { dropdownID: 0, dropdownTypeID: 130 },
            );

            this.loadDropdown();
            this.initialLoad = false;
          }
        }

    loadDropdown() {

        var adds = sessionStorage.getItem("adds")
        this.isEdit = GF.IsEmpty(adds) ? false : true
        this.statutoryType = adds === "SSS" ? 30379 : adds === "TAX" ? 30380 : adds === "HDMF" ? 30381 : adds === "PHIC" ? 30382 : 0
        console.log()
        this.dynamicForm.get("statutory").setValue(this.statutoryType)

        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFixRequest),
            attendance: this.coreService.getCoreDropdown(1020,this.dropdownRequestsub),
            // leave: this.coreService.getCoreDropdown(1032,this.dropdownRequestsub),
            earning: this.coreService.getCoreDropdown(1022,this.dropdownRequestsub),
            // category: this.coreService.getCoreDropdown(1007,this.dropdownRequestsub),

        }).subscribe({
            next: (response) => {

                // MASTER
                this.dropdownOptions.statutoryDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 125 && [30379, 30380, 30381, 30382].includes(x.dropdownID))
                // this.dropdownOptions.statutoryDef       = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 125)
                this.dropdownOptions.calculationTypeDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 126)
                this.firstcutofflist = this.dropdownOptions.calculationTypeDef.filter(x => x.dropdownTypeID === 126 && x.dropdownID !== 30389) // monthly and weekly
                this.dropdownOptions.sssBasisDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 127)
                this.dropdownOptions.sssValueDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 129 && x.dropdownID !== 30400)
                this.dropdownOptions.hdmfFirstCalcDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 129 && x.dropdownID !== 30400)
                this.dropdownOptions.hdmfSecondCalcDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 129 && x.dropdownID !== 30399)
                this.dropdownOptions.taxMonRateDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 130 && x.dropdownID !== 30402 && x.dropdownID !== 30403)
                this.dropdownOptions.taxSemiRateDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 130 && x.dropdownID !== 30401 && x.dropdownID !== 30403 )
                this.dropdownOptions.taxWeekRateDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 130 && x.dropdownID !== 30401 && x.dropdownID !== 30402 )
                this.dropdownOptions.taxSemiCustomDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 130 && x.dropdownID !== 30403 )
                this.dropdownOptions.payoutTypeDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 69)


                  //API
                  this.dropdownOptions.attendanceStatutoryDef = response.attendance.payload
                  this.dropdownOptions.leaveStatutoryDef = response.dropdownFix.payload.filter(x => x.dropdownTypeID === 90)
                  this.dropdownOptions.earningsDef = response.earning.payload
                //   this.dropdownOptions.categoryDef        = response.category.payload


            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
                this.isSave = false
            },
        });

    }

    submit(): void {
        const form = {
            30379: {  service: this.payrollService.postDynamicSSS.bind(this.payrollService)  },
            30380: {  service: this.payrollService.postDynamicTAX.bind(this.payrollService)  },
            30381: {  service: this.payrollService.postDynamicHDMF.bind(this.payrollService) },
            30382: {  service: this.payrollService.postDynamicPHIC.bind(this.payrollService) }
        };

        this.dynamicForm.get('createdBy').setValue(0);

        this.dynamicForm.get('basic_Current_Month') .setValue(this.getDy.basic.some(x=>x===30391));
        this.dynamicForm.get('basic_Monthly')       .setValue(this.getDy.basic.some(x=>x===30392));
        this.dynamicForm.get('overtime')            .setValue(this.getDy.basic.some(x=>x===30393));
        this.dynamicForm.get('holiday')             .setValue(this.getDy.basic.some(x=>x===30394));

        const statutory = this.dynamicForm.value.statutory;
        const selectedForm = form[statutory];

        if (selectedForm) {
            // const validation = selectedForm.form.valid;
            // selectedForm.form.markAllAsTouched();
            this.dynamicForm.markAllAsTouched()
            if (this.dynamicForm.valid) {
                const dialogRef = this.message.open(SaveMessage);
                dialogRef.afterClosed().subscribe((result) => {
                    if (result === 'confirmed') {
                        this.isSave = true;
                        selectedForm.service(this.dynamicForm.value).subscribe({
                            next: (value: any) => {
                                if (value.statusCode === 200) {
                                    this.message.open(SuccessMessage);
                                    this.isSave = false;
                                    this.router.navigate(['/detail/statutory-view']);
                                } else {
                                    this.message.open(FailedMessage);
                                    console.log(value.stackTrace);
                                    console.log(value.message);
                                }
                            },
                            error: (e) => {
                                this.isSave = false;
                                this.message.open(FailedMessage);
                                console.error(e);
                            }
                        });
                    }
                });
            }
        }

    }

    calcFull(form) {

        switch (form.value.frequency) {
            case 0:

                if (form.value.firstCutOff == 30390)
                    form.get('secondCalc').setValue(30397)

                break;

            case 1:

                if (form.value.firstCutOff == 30390 && form.value.secondCutoff == 30388) {
                    form.get('secondCalc').setValue(30397)
                }

                break;
        }
    }

    taxRate(form) {
        // 30401  Monthly Tax Rate
        // 30402  Semi-Monthly Tax Rate
        // 30403  Weekly Tax Rate
        // 30404  Annual Tax Rate
        // 30405  Contractor 5%
        // 30406  Contractor 10%
        var out = []
        switch (this.dynamicForm.value.frequency) {
            case 0:
                out = this.dropdownOptions.taxMonRateDef
                break;
            case 1:

                var oo = []

                var drop = this.dropdownOptions.taxSemiRateDef
                var drop4 = this.dropdownOptions.taxSemiCustomDef.filter(x => x.dropdownTypeID === 130 && x.dropdownID !== 30402 && x.dropdownID !== 30403);

                if (this.dynamicForm.value.firstCalc == 30405) { // 1st contractor 5% then 2nd 5%
                    var drop1 = this.dropdownOptions.taxSemiRateDef.filter(x => x.dropdownTypeID === 130 && x.dropdownID !== 30401 && x.dropdownID !== 30402 && x.dropdownID !== 30403 && x.dropdownID !== 30404 && x.dropdownID !== 30406);
                    this.dynamicForm.get('secondCalc').setValue(30405)
                    oo = form ? drop : drop1
                } else
                    if (this.dynamicForm.value.firstCalc == 30406) { // 1st contractor 10% then 2nd 10%
                        var drop2 = this.dropdownOptions.taxSemiRateDef.filter(x => x.dropdownTypeID === 130 && x.dropdownID !== 30401 && x.dropdownID !== 30402 && x.dropdownID !== 30403 && x.dropdownID !== 30404 && x.dropdownID !== 30405);
                        this.dynamicForm.get('secondCalc').setValue(30406)
                        oo = form ? drop : drop2
                    } else
                        if (this.dynamicForm.value.firstCalc == 30402) { // 1st semi then 2nd month,semi,annual
                            var drop3 = this.dropdownOptions.taxSemiCustomDef.filter(x => x.dropdownTypeID === 130 && x.dropdownID !== 30403 && x.dropdownID !== 30405 && x.dropdownID !== 30406);
                            oo = form ? drop : drop3
                        }
                        else { // 2nd adj then tax rate month,annual,contractor 5%, contractor 10%
                            oo = form ? drop : drop4
                        }
                out = oo
                break;
            case 2:
                out = this.dropdownOptions.taxWeekRateDef
                break;
        }
        return out
    }


    isNotEmpty(){
        return !GF.IsEmpty(this.getDy.statutory);
    }


    showMe(id, idList){
        return GF.IsEqual(id, idList);
    }

    re_new() {
        const newStatutory = this.getDy.statutory;
        const previousStatutory = this.statutory;
        this.statutory = newStatutory;

        const adds = sessionStorage.getItem("adds");

        const statutoryMap = {
            30379: "SSS",
            30380: "TAX",
            30381: "HDMF",
            30382: "PHIC"
        };

        const link = {
            SSS: "getDynamicSSS",
            TAX: "getDynamicTAX",
            HDMF: "getDynamicHDMF",
            PHIC: "getDynamicPHIC",
        };

        if ((adds === "HDMF" && statutoryMap[newStatutory] !== "HDMF") ||
            (adds !== "HDMF" && statutoryMap[newStatutory] === "HDMF") ||
            (previousStatutory !== newStatutory)) {

            this.dynamicForm.reset(new DynamicStatutory());

            this.dynamicForm.get("name").setValue('');
            this.dynamicForm.get("description").setValue('');
            this.dynamicForm.get("statutory").setValue(this.statutory);
            this.dynamicForm.get("id").setValue(this.id);

            if (this.uri !== "" && statutoryMap[newStatutory] === adds) {
                this.payrollService.getStatutory(this.uri, link[adds])
                    .subscribe({
                        next: (value: any) => {
                            this.dynamicForm.patchValue(value.payload);

                            if (value.payload) {
                                const basic = [
                                    value.payload.basic_Current_Month ? 30391 : 0,
                                    value.payload.basic_Monthly ? 30392 : 0,
                                    value.payload.overtime ? 30393 : 0,
                                    value.payload.holiday ? 30394 : 0
                                ];

                                this.dynamicForm.get('basic').setValue(basic.filter(x => x !== 0));
                            }
                        },
                        error: (e) => {
                            console.error(e);
                        }
                    });
            }
        }
    }

    re_type(){
        this.dynamicForm.get("firstCutOff").setValue(0)
        this.dynamicForm.get("firstCalc").setValue(0)
        this.dynamicForm.get("firstMax").setValue(0)

        this.dynamicForm.get("secondCutoff").setValue(0)
        this.dynamicForm.get("secondCalc").setValue(0)
        this.dynamicForm.get("secondMax").setValue(0)
    }

    savedData(payload): void {
        if (payload.frequency === 0 || !this.frequencyData[0]) {
          this.frequencyData[0] = {
            firstCutOff: payload.frequency === 0 ? payload.firstCutOff : null,
            firstCalc: payload.frequency === 0 ? payload.firstCalc : null,
            firstMax: payload.frequency === 0 ? payload.firstMax : null
          };
        }

        if (payload.frequency === 1 || !this.frequencyData[1]) {
          this.frequencyData[1] = {
            firstCutOff: payload.frequency === 1 ? payload.firstCutOff : null,
            firstCalc: payload.frequency === 1 ? payload.firstCalc : null,
            firstMax: payload.frequency === 1 ? payload.firstMax : null,
            secondCutoff: payload.frequency === 1 ? payload.secondCutoff : null,
            secondCalc: payload.frequency === 1 ? payload.secondCalc : null,
            secondMax: payload.frequency === 1 ? payload.secondMax : null
          };
        }

        if (payload.frequency === 2 || !this.frequencyData[2]) {
          this.frequencyData[2] = {
            firstCutOff: payload.frequency === 2 ? payload.firstCutOff : null,
            firstCalc: payload.frequency === 2 ? payload.firstCalc : null,
            firstMax: payload.frequency === 2 ? payload.firstMax : null
          };
        }
      }

      restoreData(frequency): void {
        var savedState = this.frequencyData[frequency];

        var resetValues: any = {
          firstCutOff: null,
          firstCalc: null,
          firstMax: null
        };

        if (frequency === 1) {
          resetValues.secondCutoff = null;
          resetValues.secondCalc = null;
          resetValues.secondMax = null;
        }

        this.dynamicForm.patchValue(resetValues, { emitEvent: false });

        if (savedState && this.apiDataLoaded) {
          this.dynamicForm.patchValue({
            firstCutOff: savedState.firstCutOff,
            firstCalc: savedState.firstCalc,
            firstMax: savedState.firstMax,
            secondCutoff: frequency === 1 ? savedState.secondCutoff : null,
            secondCalc: frequency === 1 ? savedState.secondCalc : null,
            secondMax: frequency === 1 ? savedState.secondMax : null
          }, { emitEvent: false });
        }
      }

    hdmiPHICReset(label) {
        // 30387 "Fixed"
        // 30388 "Calculated"
        // 30389 "ADJ from 1st cut-off"
        // 30390 "Not Applicable"
        this.secondcutofflist = []
        var fieldvalue = this.dynamicForm.value
        if (label == 'First') {
            this.shodropsecond = false
            if (fieldvalue.firstCutOff == 30388 || fieldvalue.firstCutOff == 30387) { // for "Calculated" and "Fixed"
                this.secondcutofflist = this.dropdownOptions.calculationTypeDef.filter(x => x.dropdownTypeID === 126 && x.dropdownID !== 30387) // semi monthly
                this.cd.detectChanges();
            }else if(fieldvalue.firstCutOff == 30390){ // for "Not Applicable"
                this.secondcutofflist = this.dropdownOptions.calculationTypeDef.filter(x => x.dropdownTypeID === 126) // semi monthly
                this.cd.detectChanges();
            }
            this.shodropsecond = true
            this.cd.detectChanges();
            this.dynamicForm.get('firstCalc').setValue(0)
            this.dynamicForm.get('firstMax').setValue(0)

        } else if (label == 'Second') {
                this.firstcutofflist = this.dropdownOptions.calculationTypeDef.filter(x => x.dropdownTypeID === 126 && x.dropdownID !== 30389) // semi monthly
                this.shodropfirst = true
                this.cd.detectChanges();
            this.dynamicForm.get('secondCalc').setValue(0)
            this.dynamicForm.get('secondMax').setValue(0)
        } else {
            this.dynamicForm.get('firstCutOff').setValue(0)
            this.dynamicForm.get('secondCutoff').setValue(0)
            this.dynamicForm.get('firstCalc').setValue(0)
            this.dynamicForm.get('firstMax').setValue(0)
            this.dynamicForm.get('secondCalc').setValue(0)
            this.dynamicForm.get('secondMax').setValue(0)
        }

    }

    dropdownvalue(form){
        // 30387 "Fixed"
        // 30388 "Calculated"
        // 30389 "ADJ from 1st cut-off"
        // 30390 "Not Applicable"
        var oo = []
        if (form.frequency == 1) {
            this.shodropfirst = true
            this.shodropsecond = true
            this.dynamicForm.get('secondCutoff').setValue(30389)
            this.secondcutofflist = this.dropdownOptions.calculationTypeDef.filter(x => x.dropdownTypeID === 126 && x.dropdownID !== 30390 && x.dropdownID !== 30387) // semi monthly
        }else{
            this.firstcutofflist = this.dropdownOptions.calculationTypeDef.filter(x => x.dropdownTypeID === 126 && x.dropdownID !== 30389) // monthly and weekly
        }
    }



}
