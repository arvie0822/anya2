import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { settings } from 'app/mock-api/apps/mailbox/data';
import { LeaveIncreaseAccrual, LeaveType, LeaveTypeSettings,LeaveProrate, LeaveConvertToCashSettings, LeaveCarryForwardSettings,  } from 'app/model/administration/leaves';
import {  DropdownInput, DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CategoryService } from 'app/services/categoryService/category.service';
import { CoreService } from 'app/services/coreService/coreService.service';
import { LeaveService } from 'app/services/leaveService/leave.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { forkJoin } from 'rxjs';
import _ from 'lodash';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';
import { GF } from 'app/shared/global-functions';

export interface PeriodicElement {
    accruedLeave       : number;
    frequencyId             : number ;
    frequncyMonthId         : number;
    frequencyDays         : number
    after                 : number;
    tenureId              : number;
    accrualEmployeeStatusId : number ;
}

const ELEMENT_DATA: PeriodicElement[] = [];

export interface PeriodicElement2 {
    from: number;
    to: number;
    prorateLeave: number;
}

const ELEMENT_DATA2: PeriodicElement2[] = [];

@Component({
    selector: 'app-leaves',
    templateUrl: './leaves.component.html',
    styleUrls: ['./leaves.component.css'],
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
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    DropdownComponent,
    TranslocoModule,
    MatTableModule
],
})

export class LeavesComponent implements OnInit {
  dropdownOptions = new DropdownOptions
  dropdownFixRequest = new DropdownRequest;
  dropdownFixRequestsample = new DropdownRequest;
  dropdownRequest = new DropdownRequest
  displayedColumns: string[] = [
                                    'accruedLeave',
                                    'frequencyId',
                                    'frequncyMonthId',
                                    'frequencyDays',
                                    'after',
                                    'tenureId',
                                    'accrualEmployeeStatusId',
                                    'action'
                                ];

  displayedColumns2: string[] = ['from', 'to', 'prorateLeave', 'action2'];
  dataSource = [];
  dataSource2 = [];
  leaveForm: FormGroup
  accrualForm: FormGroup
  detailProrateForm: FormGroup
  detailAccrual: FormGroup
  convertForm: FormGroup
  carryform: FormGroup
//   dropdownFix: any = dropdownFix
  isSave: boolean = false
  id : string

  detailAccrual_List = []

  @ViewChild('Table') Table: MatTable<any>;
  @ViewChild('Table2') Table2: MatTable<any>;

    status = [
        {id: true, description: 'Active'},
        {id: false, description: 'Inactive'},
    ];
    option = [
        {id: true, description: 'Yes'},
        {id: false, description: 'No'},
    ];
    optionlwop = [
        {id: true, description: 'Yes'},
        {id: false, description: 'No'},
    ];

    conversion = [
        {id: 0, description: 'Annual conversion'},
        {id: 1, description: 'Upon resignation'},
    ];
    annualUpon = [
        {id: 0, description: 'All'},
        {id: 1, description: 'All remaining from carry forward'},
        {id: 2, description: 'Count'},
    ];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private message: FuseConfirmationService,
        private leaveService: LeaveService,
        private coreService: CoreService,
        private tenantService: TenantService,
        private masterService : MasterService

    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.leaveForm = this.fb.group(new LeaveType());
        this.accrualForm = this.fb.group(new LeaveTypeSettings());
        this.detailAccrual = this.fb.group(new LeaveIncreaseAccrual());
        this.detailProrateForm = this.fb.group(new LeaveProrate());
        this.convertForm = this.fb.group(new LeaveConvertToCashSettings());
        this.carryform = this.fb.group(new LeaveCarryForwardSettings());

        // this.leaveForm.reset()
        // this.accrualForm.reset()
        // this.detailAccrual.reset()
        // this.detailProrateForm.reset()
        // this.convertForm.reset()

        if (this.id !=="") {
            this.leaveService.getLeaveType(this.id).subscribe({
                next: (value: any) =>{
                    if (value.statusCode == 200) {
                        // this.leaveForm.patchValue(value.payload[0])
                        this.leaveForm.patchValue(value.payload[0])
                        this.accrualForm.patchValue(value.payload[0].settings)
                        this.convertForm.patchValue(value.payload[0].settings.detailConvertToCash)
                        this.carryform.patchValue(value.payload[0].settings.detailCarryForward)
                        this.detailAccrual_List = (value.payload[0].settings.detailAccrual)
                        this.dataSource2 = GF.IsEmptyReturn(value.payload[0].settings.detailProrate,[])
                        // this.dataSource = JSON.parse(value.payload[0].settings.detailAccrual))
                        this.dropdownFixRequest.id.push(

                            { dropdownID: value.payload.employeeStatusDef, dropdownTypeID: 36 },
                            { dropdownID: value.payload.empcatleaveremoveonhold, dropdownTypeID: 36 },
                            { dropdownID: value.payload.genderDef, dropdownTypeID: 43 },
                            { dropdownID: value.payload.Leavefilingdef, dropdownTypeID: 79 },
                            { dropdownID: value.payload.leaveTypeDef, dropdownTypeID: 44 },
                            { dropdownID: value.payload.Leavecategory, dropdownTypeID: 90 },
                            { dropdownID: value.payload.leavestartfreqdef, dropdownTypeID: 46 },
                            { dropdownID: value.payload.tenuredef, dropdownTypeID: 115 },
                            { dropdownID: value.payload.monthlydef, dropdownTypeID: 54 },

                        )
                        this.initData()


                    }
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.isSave = false
                }
            })
        }
        else{
            this.dropdownFixRequest.id.push(
                { dropdownID: 0, dropdownTypeID: 43 },
                { dropdownID: 0, dropdownTypeID: 79 },
                { dropdownID: 0, dropdownTypeID: 44 },
                { dropdownID: 0, dropdownTypeID: 90 },
                { dropdownID: 0, dropdownTypeID: 46 },
                { dropdownID: 0, dropdownTypeID: 115 },
                { dropdownID: 0, dropdownTypeID: 36 },
                { dropdownID: 0, dropdownTypeID: 54 },
            )
            this.initData()
        }

    }
    reset(e){
        if(this.accrualForm.value.isCarryForward == false){
            this.carryform.get("carryMaxLeave").setValue(0),
            this.carryform.get("carryStartDay").setValue(0),
            this.carryform.get("carryStartMonthId").setValue(0),
            this.carryform.get("isCarryExpirable").setValue(false),
            this.carryform.get("carryExpireDay").setValue(0),
            this.carryform.get("carryExpireMonthId").setValue(0)
        }

        if(this.accrualForm.value.isProrate == false){
            this.accrualForm.get("from").setValue(""),
            this.accrualForm.get("to").setValue(""),
            this.accrualForm.get("prorateLeave").setValue("")
        }
    }

    resetexpiry(e){
        this.carryform.get("carryExpireMonthId").setValue(0),
        this.carryform.get("carryExpireDay").setValue(0)
    }

    addRow(){
        this.dataSource.push({
            after: this.detailAccrual.value.after,
            tenureId: this.detailAccrual.value.tenureId,
            tenuredescrip: this.dropdownOptions.tenuredef.find(item=>item.dropdownID==this.detailAccrual.value.tenureId).description,
            accruedLeave: this.detailAccrual.value.accruedLeave,
            frequencyId: this.detailAccrual.value.frequencyId,
            frequencydescrip: this.dropdownOptions.leavestartfreqdef.find(item=>item.dropdownID==this.detailAccrual.value.frequencyId).description,
            frequncyMonthId : this.detailAccrual.value.frequencyId == 30386 ? this.detailAccrual.value.frequncyMonthId : 0,
            increasemonth: this.detailAccrual.value.frequencyId == 30386 ? this.dropdownOptions.monthlydef.find(item=>item.dropdownID==this.detailAccrual.value.frequncyMonthId).description : "",
            frequencyDays : this.detailAccrual.value.frequencyId == 30386 ? this.detailAccrual.value.frequencyDays : 0,
            accrualEmployeeStatusId: this.detailAccrual.value.accrualEmployeeStatusId,
            employeestatus: this.dropdownOptions.employeeStatusDef.find(item=>item.dropdownID==this.detailAccrual.value.accrualEmployeeStatusId).description,

        });
        this.Table.renderRows();
        this.clear()
    }

    OnInitAddRow(e){
        e.forEach(items => {
            this.dataSource.push({
                after: items.after,
                tenureId: items.tenureId,
                tenuredescrip: this.dropdownOptions.tenuredef.find(item=>item.dropdownID==items.tenureId).description,
                accruedLeave: items.accruedLeave,
                frequencyId: items.frequencyId,
                frequencydescrip: this.dropdownOptions.leavestartfreqdef.find(item=>item.dropdownID==items.frequencyId).description,
                frequncyMonthId : items.frequencyId == 30386 ? items.frequncyMonthId : 0,
                increasemonth: items.frequencyId == 30386 ? this.dropdownOptions.monthlydef.find(item=>item.dropdownID==items.frequncyMonthId).description: "",
                frequencyDays : items.frequencyId == 30386 ? items.frequencyDays : 0,
                accrualEmployeeStatusId: items.accrualEmployeeStatusId,
                employeestatus: this.dropdownOptions.employeeStatusDef.find(item=>item.dropdownID==items.accrualEmployeeStatusId).description

            });
            this.Table.renderRows();
            this.clear()

        });
    }

    handleDelete(index): void {
        this.dataSource.splice(index, 1);
        this.Table.renderRows();
    }

    clear(){
      this.detailAccrual.get("accruedLeave").setValue(""),
      this.detailAccrual.get("frequencyId").setValue(""),
      this.detailAccrual.get("after").setValue("")
      this.detailAccrual.get("tenureId").setValue("")
      this.detailAccrual.get("accrualEmployeeStatusId").setValue("")
      this.detailAccrual.get("frequncyMonthId").setValue("")
      this.detailAccrual.get("frequencyDays").setValue("")

    }

    addRow2(){

        this.dataSource2.push({
          from: this.detailProrateForm.value.from,
          to: this.detailProrateForm.value.to,
          prorateLeave: this.detailProrateForm.value.prorateLeave,
        });

        this.Table2.renderRows();
        this.detailProrateForm.get("from").setValue(""),
        this.detailProrateForm.get("to").setValue(""),
        this.detailProrateForm.get("prorateLeave").setValue("")
    }

    handleDelete2(index): void {
      this.dataSource2.splice(index, 1);
      this.Table2.renderRows();
    }



    // clearIncreasAccrual================================
    clearRowAccrual(){
        var a = this.accrualForm.value.isIncreaseAccrual
        if (a == true) {
            this.detailAccrual.get("accruedLeave").setValue(""),
            this.detailAccrual.get("frequencyId").setValue(""),
            this.detailAccrual.get("frequencyDays").setValue(""),
            this.detailAccrual.get("frequncyMonthId").setValue(""),
            this.detailAccrual.get("after").setValue(""),
            this.detailAccrual.get("tenureId").setValue(""),
            this.detailAccrual.get("accrualEmployeeStatusId").setValue(""),
            this.dataSource =[]
        }
   }

    clearaccrualform(e){
        if (this.accrualForm.value.accrualStartId==e) {
            this.accrualForm.get("accrualStartBasedOnFrequency").setValue(0),
            this.accrualForm.get("accrualStartFrequencyId").setValue(0),
            this.accrualForm.get("accrualStartAfterId").setValue(0)
        }
    }

    clearRowProrate(){
        if (this.accrualForm.value.isProrate == false) {
            this.detailProrateForm.get("from").setValue(""),
            this.detailProrateForm.get("to").setValue(""),
            this.detailProrateForm.get("prorateLeave").setValue(""),
            this.dataSource2 =[]
        }
    }

    clear_credit(){
        // this.accrualForm.get("creditAccrualFrequency").setValue(""),
        this.accrualForm.get("selectedDay").setValue(""),
        this.accrualForm.get("selectedMonth").setValue("")
    }

    submit(): void {
        this.leaveForm.markAllAsTouched()
        this.accrualForm.get('detailAccrual').setValue(this.dataSource)
        this.accrualForm.get('detailProrate').setValue(this.dataSource2)
        this.accrualForm.get('detailCarryForward').setValue(this.carryform.value)
        this.accrualForm.get('detailConvertToCash').setValue(this.convertForm.value)
        this.leaveForm.get('settings').setValue(this.accrualForm.value)



        if (this.leaveForm.valid) {
            const dialogRef = this.message.open(SaveMessage);
            // Duplicate
            var leaves = this.leaveForm.value
            var clone = (sessionStorage.getItem("action") == "duplicate")
            leaves.id   = clone ? 0   : leaves.id
            leaves.code = clone ? ""  : leaves.code
            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.isSave = true
                    this.leaveService.postLeaveType(leaves).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.message.open(SuccessMessage);
                                this.isSave = false,
                                    this.router.navigate(['/search/leave-view']);
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

    initData(){
        forkJoin({
            dropdownFixRequest: this.masterService.getDropdownFix(this.dropdownFixRequest),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),
        })
        .subscribe({
            next: (response) => {
                this.dropdownOptions.genderDef = response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 43)
                this.dropdownOptions.Leavefilingdef = response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 79)
                this.dropdownOptions.leaveTypeDef = response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 44)
                this.dropdownOptions.Leavecategory = response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 90)
                this.dropdownOptions.leavestartfreqdef = response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 46)
                this.dropdownOptions.tenuredef = response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 115)
                this.dropdownOptions.employeeStatusDef = _.uniqBy([...response.dropdownFixRequest.payload.filter(x => x.dropdownID != 95 && x.dropdownID != 12665 && x.dropdownID != 12666 && x.dropdownTypeID === 36),...[]], JSON.stringify)
                this.dropdownOptions.empcatleaveremoveonhold = _.uniqBy([...response.dropdownFixRequest.payload.filter(x => x.dropdownID != 95 && x.dropdownID != 12665 && x.dropdownID != 12666 && x.dropdownTypeID === 36),...[]],JSON.stringify)
                this.dropdownOptions.monthlydef = response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 54)
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            this.OnInitAddRow(this.detailAccrual_List)
            },

        });

    }

    showhide(e){
        return e == 30383? false : true
    }

    showhideaccrual(e){
        return e == 30386? false : true
    }
    carryforward(e){
        return e == true? false : true
    }
    clearleavestart(e){
        if (this.leaveForm.value.leaveStartId==e) {
            this.leaveForm.get("leaveStartBasedOnFrequency").setValue(0),
            this.leaveForm.get("leaveStartFrequencyId").setValue(0),
            this.leaveForm.get("leaveStartAfterId").setValue(0)
        }
    }

    clearcredit(e){
        if (this.accrualForm.value.frequencyId==e) {
            this.accrualForm.get("month").setValue(0),
            this.accrualForm.get("day").setValue(0)
        }
    }

    formatDecimal(control) {
        var decimal = this.leaveForm.get(control)
        if (decimal && decimal.value !== null) {
        let formattedValue = parseFloat(decimal.value).toFixed(3);
        decimal.setValue(formattedValue);
        }
    }
}
