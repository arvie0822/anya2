
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTable } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { translate, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { COE, coeForm } from 'app/model/administration/filing';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { FilingService } from 'app/services/filingService/filing.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-coe',
  templateUrl: './coe.component.html',
  styleUrls: ['./coe.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DropdownComponent,
    MatIconModule,
    TranslocoModule,
    MatTooltipModule
],
})

export class CoeComponent implements OnInit {
    @Input() formgroup : any
    @Input() selectedemployee: any
    coeForm : FormGroup
    isSave : Boolean = false
    dropdownOptions = new DropdownOptions
    dropdownFixRequest = new DropdownRequest
    dropdownRequest = new DropdownRequest
    columns: string[] = ['action','monday'];
    @ViewChild('shiftTable') CSTable: MatTable<any>;
    disabledbutton : boolean = false
    @Output() disabledsubmit = new EventEmitter<any>();
    loginId = 0
    tid : any
    dataSource = [{
        monday: [{ id: null },{ id: null }],
    }]

    id : string = ""
    late : boolean = false
    failedMessage = {...FailedMessage}
    saveMessage = {...SaveMessage}
    coe = [
        {id: 0, description: 'Legal'},
        {id: 1, description: 'Loan'},
        {id: 2, description: 'Local Employment'},
        {id: 3, description: 'Employment Abroad'},
        {id: 4, description: 'Mobile Plan'},
        {id: 5, description: 'Visa Application'},
        {id: 6, description: 'School Requirement'},
    ]

    application = [
        {id: false, description: 'No'},
        {id: true, description: 'Yes'},
    ]

    constructor(private fb: FormBuilder,private message: FuseConfirmationService,private translocoService : TranslocoService,
        private router: Router,
        private filingService : FilingService,private tenantService: TenantService,private route: ActivatedRoute,
        private coreService : CoreService,
        private masterService : MasterService) { }

    ngOnInit() {
        this.disabledsubmit.emit(false)
        this.id = this.route.snapshot.paramMap.get('id');
        this.coeForm  = this.fb.group(new COE());
        var action = sessionStorage.getItem("action")
        this.dropdownFixRequest.id.push(
            { dropdownID: 0, dropdownTypeID: 63},
        )
        this.initData()

        if (this.id !== "") {
            if (action == 'edit') {
                this.disabledbutton = false
                //fetch edit data here
                this.filingService.getCOE(this.id).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.coeForm.patchValue(value.payload)
                        }
                        else {
                            console.log(value.stackTrace)
                            console.log(value.message)
                        }
                        // var action = sessionStorage.getItem("action")
                        // if (action == "view") {
                        //     this.disabledbutton = true
                        //     this.coeForm.disable()
                        // }
                    },
                    error: (e) => {
                        console.error(e)
                    }
                });
            } else if (action == 'view') {
                this.disabledbutton = true
                this.coeForm.disable()
                this.filingService.getCOE(this.id).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.coeForm.patchValue(value.payload)
                        }
                        else {
                            console.log(value.stackTrace)
                            console.log(value.message)
                        }
                        // var action = sessionStorage.getItem("action")
                        // if (action == "view") {
                        //     this.disabledbutton = true
                        //     this.coeForm.disable()
                        // }
                    },
                    error: (e) => {
                        console.error(e)
                    }
                });
            }
        }
    }

    submit(){
        if (sessionStorage.getItem("action") == 'edit') {
            this.tid = this.id
        }else{
            if (sessionStorage.getItem('moduleId') == "81") {
                this.tid = [sessionStorage.getItem('u')]
            } else {
                this.tid = this.selectedemployee
            }
        }

        this.coreService.encrypt_decrypt(false, this.tid)
        .subscribe({
            next: (value: any) => {
                this.loginId = Number(value.payload[0])
                this.coeForm.get('employeeId').setValue(this.loginId)
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            }
        });

        if (this.coeForm.value.purposeId) {
            const dialogRef = this.message.open(SaveMessage);
            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed') {
                    this.isSave = true;

                    this.filingService
                        .postCOE(this.coeForm.value, this.tid, this.late)
                        .subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    this.message.open(SuccessMessage);
                                    (this.isSave = false),
                                        this.router.navigate([
                                            '/search/filing-view',
                                        ]);
                                }
                                //   Error lock cannot file ==============================
                                else if (
                                    (value.payload.lockingState == 2 &&
                                        value.payload.valiationState == 2) ||
                                    (value.payload.lockingState == 2 &&
                                        value.payload.valiationState == 0)
                                ) {
                                    this.failedMessage.message =
                                        translate('Filing for this cutoff is fully locked');
                                    this.message.open(this.failedMessage);
                                    this.disabledsubmit.emit(false);
                                    return;
                                    // valid but not validated =========================
                                } else if (
                                    value.payload.lockingState == 0 &&
                                    value.payload.valiationState == 1
                                ) {
                                    this.failedMessage = value.message;
                                    this.message.open(this.failedMessage);
                                    this.disabledsubmit.emit(false);
                                    // late but validated =================================
                                } else if (
                                    value.payload.lockingState == 1 &&
                                    value.payload.valiationState == 0
                                ) {
                                    this.saveMessage.message =
                                       translate("This will be saved as 'Late Filing'. Continue?");
                                    const dialogRef = this.message.open(
                                        this.saveMessage
                                    );
                                    dialogRef
                                        .afterClosed()
                                        .subscribe((result) => {
                                            if (result == 'confirmed') {
                                                this.disabledsubmit.emit(true);
                                                this.filingService
                                                    .postCOE(
                                                        this.coeForm.value,
                                                        this.tid,
                                                        (this.late = true)
                                                    )
                                                    .subscribe({
                                                        next: (value: any) => {
                                                            if (
                                                                value.statusCode ==
                                                                200
                                                            ) {
                                                                this.message.open(
                                                                    SuccessMessage
                                                                );
                                                                this.isSave =
                                                                    false;
                                                                this.router.navigate(
                                                                    [
                                                                        '/search/filing-view',
                                                                    ]
                                                                );
                                                            }
                                                        },
                                                    });
                                            }
                                        });
                                } else {
                                    this.message.open(FailedMessage);
                                    this.disabledsubmit.emit(false);
                                    console.log(value.stackTrace);
                                    console.log(value.message);
                                }
                            },
                            error: (e) => {
                                this.isSave = false;
                                this.disabledsubmit.emit(false);
                                this.message.open(FailedMessage);
                                console.error(e);
                            },
                        });
                } else {
                    this.disabledsubmit.emit(false);
                }
            });
        } else {
            this.failedMessage.title = 'Warning!';
            this.failedMessage.message = translate('Coe Request Purpose Required!');
            this.message.open(this.failedMessage);
            this.disabledsubmit.emit(false);
            return;
        }

      }

      initData(){
        forkJoin({
            dropdownFixRequest: this.masterService.getDropdownFix(this.dropdownFixRequest),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),
        })
        .subscribe({
            next: (response) => {

                this.dropdownOptions.purposedef = response.dropdownFixRequest.payload.filter(x => x.dropdownTypeID === 63)

            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
            },

        });

    }

    add(index){
        // this.dataSource = [{
        //     monday: [{ id: null },{ id: null }]
        // }]

        this.dataSource[index].monday.push({ id: null })
        this.CSTable.renderRows()
    }

}
