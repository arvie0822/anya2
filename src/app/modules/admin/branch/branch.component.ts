import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DropdownSettings, SystemSettings } from 'app/model/app.constant';
import { BranchContact, BranchEmail, BranchIP } from 'app/model/administration/sub-company';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { DropdownInput, DropdownRequest, DropdownOptions } from 'app/model/dropdown.model';
import { TenantService } from 'app/services/tenantService/tenant.service';
import _, { sample } from 'lodash';
import { Subject, forkJoin } from 'rxjs';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { Branch } from 'app/model/administration/branch';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { StorageServiceService } from 'app/services/storageService/storageService.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { DropdownEntitlementComponent } from 'app/core/dropdown-entitlement/dropdown-entitlement.component';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CustomModule } from 'app/shared/custom.module';
import { TranslocoModule } from '@ngneat/transloco';
import { GF } from 'app/shared/global-functions';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.css'],
    providers: [provideNgxMask()],
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
    MatCheckboxModule,
    MatTableModule,
    MatTabsModule,
    DropdownComponent,
    DropdownCustomComponent,
    DropdownEntitlementComponent,
    MatDividerModule,
    NgxMaskDirective,
    CustomModule,
    TranslocoModule
],
})

export class BranchComponent implements OnInit {
    fileUpload: ElementRef
    //   longitude = "";
    subCompanyForm: FormGroup
    contactForm: FormGroup
    ipForm: FormGroup
    emailForm: FormGroup
    dropdownInput = new DropdownInput
    dropdownRequest = new DropdownRequest
    dropdownFix = new DropdownRequest
    dropdownRequestsub = new DropdownRequest
    dropdownOptions = new DropdownOptions
    systemSettings = SystemSettings
    isSave: boolean = true
    id: string;
    isAction: string;
    encryptID: string;
    _onDestroy: any
    @ViewChild('TablePhone') TablePhone: MatTable<any>;
    @ViewChild('TableEmail') TableEmail: MatTable<any>;
    @ViewChild('TableIP') TableIP: MatTable<any>;
    phoneColumns: string[] = ['Type', 'Number', "Action"]
    phoneDataSource: any[] = []
    emailColumns: string[] = ['Type', 'Address', "Action"]
    emailDataSource: any[] = []
    ipColumns: string[] = ['IP', "To", "Action"]
    ipDataSource: any[] = []
    errIP: boolean = false
    errIPBetween: boolean = false
    errIPFromBetween: boolean = false
    errIPtext = ""

    primarySigList = []
    documentsList = []

    @ViewChild('fileInput') el: ElementRef;
    imageUrl: SafeResourceUrl
    editFile: boolean = true;
    removeUpload: boolean = false;
    dialogRef: MatDialogRef<ModalComponent, any>;
    transactionId: any
    moduleId: any
    imagefile = []
    imageprev: any
    loginId = 0
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private message: FuseConfirmationService,
        private tenantService: TenantService,
        private masterService: MasterService,
        private coreService: CoreService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        private storageServiceService: StorageServiceService,
        public dialog: MatDialog) { }

    get sc() { return this.subCompanyForm.value }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        var id = [sessionStorage.getItem("u")]
        this.coreService.encrypt_decrypt(false, id)
            .subscribe({
                next: (value: any) => {
                    this.loginId = Number(value.payload[0])
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                }
            });

        // this.isAction = sessionStorage.getItem("action")
        this.subCompanyForm = this.fb.group(new Branch());
        this.ipForm = this.fb.group(new BranchIP());
        this.contactForm = this.fb.group(new BranchContact());
        this.emailForm = this.fb.group(new BranchEmail());


        if (this.id !== "") {

            this.subCompanyForm.disable();
            this.ipForm.disable();
            this.contactForm.disable();
            this.emailForm.disable();
            this._onDestroy = this.tenantService.getBranch(this.id).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        if (value.payload.companyLogo != "") {
                            this.imageprev = "companyLogo1-" + value.payload.companyLogo
                            this.previewimage(this.imageprev,value.payload.branchId,sessionStorage.getItem('moduleId'))
                        }
                        this.subCompanyForm.patchValue(JSON.parse(JSON.stringify(value.payload).replace(/\:null/gi, "\:[]")))
                        value.payload.bankBranchCode == null ? this.subCompanyForm.get('bankBranchCode').setValue("") : value.payload.bankBranchCode
                        this.phoneDataSource = value.payload.branchContact == null ? [] : value.payload.branchContact
                        this.emailDataSource = value.payload.branchEmail == null ? [] : value.payload.branchEmail
                        this.ipDataSource = value.payload.branchIp || []
                        this.dropdownRequest.id.push(
                            { dropdownID: value.payload.subCompanyId == null ? 0 : value.payload.subCompanyId, dropdownTypeID: 300 },
                            { dropdownID: 0, dropdownTypeID: 12 }
                        )
                        this.dropdownFix.id.push(
                            { dropdownID: 0, dropdownTypeID: 11 },
                            { dropdownID: value.payload.industry == null ? 0 : value.payload.industry, dropdownTypeID: 1 },
                            { dropdownID: value.payload.bankId == null ? 0 : value.payload.bankId, dropdownTypeID: 2 },
                            { dropdownID: value.payload.country == null ? 0 : value.payload.country, dropdownTypeID: 3 },
                            { dropdownID: value.payload.rdo == null ? 0 : value.payload.rdo, dropdownTypeID: 4 },
                            { dropdownID: value.payload.pagibigBranch == null ? 0 : value.payload.pagibigBranch, dropdownTypeID: 7 },
                            { dropdownID: 12813, dropdownTypeID: 15 },
                            { dropdownID: 2651, dropdownTypeID: 15 },
                            { dropdownID: 12757, dropdownTypeID: 15 },
                        )
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
        }
        else {
            this.dropdownRequest.id.push(
                { dropdownID: 0, dropdownTypeID: 300 },
                { dropdownID: 0, dropdownTypeID: 12 }
            )
            this.dropdownFix.id.push(
                { dropdownID: 0, dropdownTypeID: 1 },
                { dropdownID: 0, dropdownTypeID: 2 },
                { dropdownID: 3, dropdownTypeID: 3 },
                { dropdownID: 0, dropdownTypeID: 4 },
                { dropdownID: 0, dropdownTypeID: 5 },
                { dropdownID: 0, dropdownTypeID: 7 },
                { dropdownID: 0, dropdownTypeID: 9 },
                { dropdownID: 0, dropdownTypeID: 10 },
                { dropdownID: 0, dropdownTypeID: 11 },
                { dropdownID: 0, dropdownTypeID: 61 },
                { dropdownID: 12813, dropdownTypeID: 15 },
                { dropdownID: 2651, dropdownTypeID: 15 },
                { dropdownID: 12757, dropdownTypeID: 15 },
            )
            this.initData()
        }

    }

    loadDataSample(onLoad, Info) {
        if (Info) {

        }

    }

    initData() {
        this._onDestroy = forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
            dropdownDynamic: this.tenantService.getDropdown(this.dropdownRequest),
            subCompany: this.coreService.getCoreDropdown(1001, this.dropdownRequestsub)
        }).subscribe({
            next: (value: any) => {
                this.dropdownOptions.industryDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 1)
                this.dropdownOptions.bankDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 2)
                this.dropdownOptions.countryDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 3)
                this.dropdownOptions.rdoOfficeDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 4)
                // this.dropdownOptions.rdoBranchDef      = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 5)
                this.dropdownOptions.pBranchWithCodeDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 7)
                // this.dropdownOptions.cityDef           = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 9)
                // this.dropdownOptions.regionDef         = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 10)
                this.dropdownOptions.contactDef = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 11)
                // this.dropdownOptions.provinceDef       = value.dropdownFix.payload.filter(x => x.dropdownTypeID === 61)
                this.dropdownOptions.emailDef = value.dropdownDynamic.payload.filter(x => x.dropdownTypeID == 12)
                this.documentsList = _.uniqBy([...this.documentsList, ...value.dropdownFix.payload
                    .filter(x => x.dropdownTypeID === 15 && [12813, 2651, 12757]
                        .includes(x.dropdownID))], JSON.stringify)
                this.dropdownOptions.companynameDef = value.subCompany.payload
                // const dropdownFix = this.coreService.getDropdownFix([3, 4, 5, 6, 9, 10, 61])

            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
                this.isSave = false
                this.subCompanyForm.enable();
                this.ipForm.enable();
                this.contactForm.enable();
                this.emailForm.enable();
                this.addPrimarySigList()
                // var action = sessionStorage.getItem("action")
                // if (action == "view") {
                //     this.subCompanyForm.disable();
                //     this.ipForm.disable();
                //     this.contactForm.disable();
                //     this.emailForm.disable();
                // }else{
                //     this.isSave = false
                //     this.subCompanyForm.enable();
                //     this.ipForm.enable();
                //     this.contactForm.enable();
                //     this.emailForm.enable();
                //     this.addPrimarySigList()
                // }

            }
        });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    handleAddNumber(): void {
        this.phoneDataSource.push({
            dropdownId: this.contactForm.value.dropdownId,
            type: this.dropdownOptions.contactDef.filter(x => x.dropdownID == this.contactForm.value.dropdownId)[0]['description'],
            number: "+63 " + this.contactForm.value.number
        })
        this.TablePhone.renderRows();
        this.contactForm.reset()
    }

    handleDeleteNumber(index): void {
        this.phoneDataSource.splice(index, 1);
        this.TablePhone.renderRows();
    }

    handleAddEmail(): void {

        if (this.contactForm.value.dropdownId) {
            if (this.emailForm.controls.address.valid) {
                var numtype = this.contactForm.value.dropdownId
                this.emailDataSource.push({
                    type: this.dropdownOptions.contactDef.find(x => x.dropdownID == numtype).description || "",
                    dropdownId: numtype,
                    // type: numtype,
                    address: this.emailForm.value.address
                })
                this.TableEmail.renderRows();
                this.emailForm.reset()
            }
        }
    }

    handleDeleteEmail(index): void {
        this.emailDataSource.splice(index, 1);
        this.TableEmail.renderRows();
    }

    between(x, min, max) {
        return x >= min && x <= max;
    }

    KeyUpFrom() {
        this.errIPFromBetween = false
    }

    KeyUpTo() {
        this.errIP = false
        this.errIPBetween = false
    }

    handleAddIP(): void {
        this.errIP = false
        this.errIPBetween = false
        this.errIPFromBetween = false
        if (this.ipForm.value.address == "" || this.ipForm.value.to == "") {
            return
        }
        if (this.ipForm.value.address.split(".").length < 3) {
            return
        }
        var lastIP = this.ipForm.value.address.split(".")[3]
        if (Number(lastIP) > Number(this.ipForm.value.to)) {
            this.errIP = true
            return
        }

        if (this.ipForm.invalid) {
            return
        }

        var lastIndex = this.ipForm.value.address.lastIndexOf('.')
        var _ip = this.ipForm.value.address.substring(0, lastIndex);
        if (this.ipDataSource.some(x => x.address.substring(0, x.address.lastIndexOf('.')) == _ip && (Number(this.ipForm.value.to) <= Number(x.to)))) {
            this.errIPBetween = true
            return
        }
        if (this.ipDataSource.some(x => x.address.substring(0, x.address.lastIndexOf('.')) == _ip && (Number(lastIP) <= Number(x.to)))) {
            this.errIPFromBetween = true
            this.errIPtext = lastIP
            return
        }

        this.ipDataSource.push({
            address: this.ipForm.value.address,
            to: this.ipForm.value.to
        })
        this.TableIP.renderRows();
        this.ipForm.reset()
    }

    handleDeleteIP(index): void {
        this.ipDataSource.splice(index, 1);
        this.TableIP.renderRows();
    }

    submit(): void {

        // console.log(this.subCompanyForm.value)
        // this.subCompanyForm.value.subCompanyId = 0 // static for temporary forever
        this.subCompanyForm.markAllAsTouched();

        this.subCompanyForm.get('branchContact').setValue(this.phoneDataSource);
        this.subCompanyForm.get('branchEmail').setValue(this.emailDataSource);
        this.subCompanyForm.get('branchIp').setValue(this.ipDataSource);

        if (this.subCompanyForm.valid) {
            const dialogRef = this.message.open(SaveMessage);

            dialogRef.afterClosed().subscribe((result) => {
                if (result == "confirmed") {
                    this.isSave = true

                    // Duplicate
                    var ac = this.subCompanyForm.getRawValue()
                    var clone = (sessionStorage.getItem("action") == "duplicate")
                    ac.branchId   = clone ? 0   : ac.branchId
                    ac.branchCode = clone ? ""  : ac.branchCode

                    this.tenantService.postBranch(ac).subscribe({
                        next: (value: any) => {
                            if (value.statusCode == 200) {
                                this.message.open(SuccessMessage);
                                this.isSave = false,
                                this.router.navigate(['/search/branch']);
                                this.transactionId = value.payload.branchId
                                this.uploadimage()
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
    onClick(event) {
        if (this.fileUpload)
            this.fileUpload.nativeElement.click()
    }

    //   ======================== copy ==============================
    sample(e) {

    }



    addPrimarySigList() {
        this.primarySigList = []
        this.sc.signatory1 == null ? null : this.primarySigList.push(this.sc.signatory1)
        this.sc.signatory2 == null ? null : this.primarySigList.push(this.sc.signatory2)
        this.sc.signatory3 == null ? null : this.primarySigList.push(this.sc.signatory3)
    }

    removeSelectedSigList(e) {
        return this.primarySigList.filter(item => item != this.sc[e])
    }

    removeSelectedDoc(a, b) {
        return this.documentsList.filter(item => item.dropdownID != this.sc[a] && item.dropdownID != this.sc[b])
    }

    copyinfo(e) {
        this.open(e);
    }

    open(id) {
        if (this.dialogRef) {
            this.dialogRef.close();

        }
        const dialogRef = this.dialog.open(ModalComponent, {
            panelClass: 'app-dialog',

        })
        dialogRef.afterClosed().subscribe(result => {
            if (!result.confirmed) {
                return
            }
            this.dropdownRequestsub.id = [{ dropdownID: id, dropdownTypeID: 0 }]

            this._onDestroy = this.tenantService.getSubCompanyDropdown(this.dropdownRequestsub).subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        var values = JSON.parse(JSON.stringify(value.payload))
                        // console.log(values)
                        var encryptID = values.find(item => item.dropdownID === this.subCompanyForm.value.subCompanyId).encryptID


                        this._onDestroy = this.tenantService.getSubCompany(encryptID).subscribe({
                            next: (value: any) => {
                                if (value.statusCode == 200) {
                                    this.dropdownRequest.id.push(
                                        { dropdownID: value.payload.subCompanyId == null ? 0 : value.payload.subCompanyId, dropdownTypeID: 300 },
                                        { dropdownID: 0, dropdownTypeID: 12 }
                                    )
                                    this.dropdownFix.id.push(
                                        { dropdownID: 0, dropdownTypeID: 11 },
                                        { dropdownID: value.payload.industry == null ? 0 : value.payload.industry, dropdownTypeID: 1 },
                                        { dropdownID: value.payload.bankId == null ? 0 : value.payload.bankId, dropdownTypeID: 2 },
                                        { dropdownID: value.payload.country == null ? 0 : value.payload.country, dropdownTypeID: 3 },
                                        { dropdownID: value.payload.rdo == null ? 0 : value.payload.rdo, dropdownTypeID: 4 },
                                        { dropdownID: value.payload.pRegionDef == null ? 0 : value.payload.pRegionDef, dropdownTypeID: 6 },
                                        { dropdownID: 12813, dropdownTypeID: 15 },
                                        { dropdownID: 2651, dropdownTypeID: 15 },
                                        { dropdownID: 12757, dropdownTypeID: 15 },
                                    )
                                    this.initData()

                                    if (result.branchinformation) {
                                        this.subCompanyForm.get('branchName').setValue(value.payload.subCompanyName)
                                        this.subCompanyForm.get('industry').setValue(value.payload.industry)
                                        this.subCompanyForm.get('bankId').setValue(value.payload.bankId)
                                        this.subCompanyForm.get('bankAccount').setValue(value.payload.bankAccount)
                                    } if (result.addressinformation) {
                                        this.subCompanyForm.get('country').setValue(value.payload.country)
                                        this.subCompanyForm.get('region').setValue(value.payload.region)
                                        this.subCompanyForm.get('province').setValue(value.payload.province)
                                        this.subCompanyForm.get('city').setValue(value.payload.city)
                                        this.subCompanyForm.get('zipCode').setValue(value.payload.zipCode)
                                        this.subCompanyForm.get('unitFloor').setValue(value.payload.unitFloor)
                                        this.subCompanyForm.get('building').setValue(value.payload.building)
                                        this.subCompanyForm.get('street').setValue(value.payload.street)
                                        this.subCompanyForm.get('barangay').setValue(value.payload.barangay)
                                    } if (result.govermentinfo) {
                                        this.subCompanyForm.get('pagibig').setValue(value.payload.pagibig)
                                        this.subCompanyForm.get('pagibigBranch').setValue(value.payload.pagibigRegion)
                                        // this.subCompanyForm.get('pagibigBranch').setValue(value.payload.pagibigSubCompany)
                                        this.subCompanyForm.get('pagibigCode').setValue(value.payload.pagibigCode)
                                        this.subCompanyForm.get('sss').setValue(value.payload.sss)
                                        this.subCompanyForm.get('philhealth').setValue(value.payload.philhealth)
                                        this.subCompanyForm.get('tin').setValue(value.payload.tin)
                                        this.subCompanyForm.get('rdo').setValue(value.payload.rdo)
                                        this.subCompanyForm.get('rdoBranch').setValue(value.payload.rdoSubCompany)
                                    } if (result.contactinformation) {
                                        this.phoneDataSource = value.payload.contact == null ? [] : value.payload.contact
                                        this.emailDataSource = value.payload.email == null ? [] : value.payload.email
                                    } if (result.branchsettings == true) {
                                        this.ipDataSource = value.payload.ip
                                        this.subCompanyForm.get('signatory1').setValue(value.payload.signatory1)
                                        this.subCompanyForm.get('signatory1Title').setValue(value.payload.signatory1Title)
                                        this.subCompanyForm.get('signatory1Path').setValue(value.payload.signatory1Path)
                                        this.subCompanyForm.get('signatory2').setValue(value.payload.signatory1)
                                        this.subCompanyForm.get('signatory2Path').setValue(value.payload.signatory2Path)
                                        this.subCompanyForm.get('signatory2Title').setValue(value.payload.signatory2Title)
                                        this.subCompanyForm.get('signatory3').setValue(value.payload.signatory3)
                                        this.subCompanyForm.get('signatory3Path').setValue(value.payload.signatory3Path)
                                        this.subCompanyForm.get('signatory3Title').setValue(value.payload.signatory3Title)
                                        this.addPrimarySigList()
                                        this.subCompanyForm.get('document1').setValue(value.payload.document1)
                                        this.subCompanyForm.get('document2').setValue(value.payload.document2)
                                        this.subCompanyForm.get('document3').setValue(value.payload.document3)
                                        this.subCompanyForm.get('backupSig1').setValue(value.payload.backupSig1)
                                        this.subCompanyForm.get('backupSig2').setValue(value.payload.backupSig2)
                                        this.subCompanyForm.get('backupSig3').setValue(value.payload.backupSig3)
                                        this.subCompanyForm.get('primarySig1').setValue(value.payload.primarySig1)
                                        this.subCompanyForm.get('primarySig2').setValue(value.payload.primarySig2)
                                        this.subCompanyForm.get('primarySig3').setValue(value.payload.primarySig3)
                                        this.subCompanyForm.get('latitude').setValue(value.payload.latitude)
                                        this.subCompanyForm.get('longitude').setValue(value.payload.longitude)
                                        this.subCompanyForm.get('range').setValue(value.payload.range)
                                    }
                                }
                            }
                        })
                    }

                    else {
                        console.log(value.stackTrace)
                        console.log(value.message)
                    }

                }

            })


            // {
            //     branchinformation: true,
            //     contactinformation: false,
            //     govermentinfo: false,
            //     addressinformation: true,
            // }



            // var sample = result.branchinformation
            // encryptedId


            // init
            // call api*(encryptedId)
            // if (result.branchinformation) {
            //     this.formGroup.get('company').setValue(value.payrload.company)
            //     this.formGroup.get('company').setValue(value.payrload.company)
            //     this.formGroup.get('company').setValue(value.payrload.company)
            //     this.formGroup.get('company').setValue(value.payrload.company)
            //    }
            //    if (result.contactinformation) {
            //     this.formGroup.get('contact').setValue(value.payrload.contact)
            //     this.formGroup.get('contact').setValue(value.payrload.contact)
            //     this.formGroup.get('contact').setValue(value.payrload.contact
            //    }
            // this.phoneDataSource = value.payload.contact == null ? [] : value.payload.contact
            // this.emailDataSource = value.payload.email == null ? [] : value.payload.email
            // this.ipDataSource = value.payload.ip

        }

        )
    }

    uploadimage() {
        this.moduleId = sessionStorage.getItem('moduleId')
        if (this.imagefile.length === 0) {
            return
        }
        this.imagefile.forEach(file => {
            const fileToUpload = <File>file.files;
            if (fileToUpload) {
                const formData = new FormData();
                formData.append("file", file.files);

                this.storageServiceService.fileUpload(formData, this.transactionId, this.moduleId,this.loginId).subscribe({
                    next: (value: any) => {
                        if (value) {

                        }
                    },
                    error: (e) => {
                    }
                });
            }
        });
    }

    async reduceImageSize(file: File, maxSizeInBytes: number, quality: number): Promise<File> {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function (event: ProgressEvent<FileReader>) {
            const image = new Image();

            image.onload = function () {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              const originalWidth = image.width;
              const originalHeight = image.height;
              let resizedWidth = originalWidth;
              let resizedHeight = originalHeight;

              // Calculate the new width and height to fit the desired file size
              while (file.size > maxSizeInBytes && resizedWidth > 10 && resizedHeight > 10) {
                resizedWidth *= 0.9;
                resizedHeight *= 0.9;

                canvas.width = resizedWidth;
                canvas.height = resizedHeight;

                context.clearRect(0, 0, resizedWidth, resizedHeight);
                context.drawImage(image, 0, 0, resizedWidth, resizedHeight);

                file = dataURLtoFile(canvas.toDataURL(file.type, quality), file.name);
              }
              resolve(file);
            };

            image.src = event.target?.result as string;
          };

          reader.readAsDataURL(file);

          function dataURLtoFile(dataURL: string, fileName: string): File {
            const arr = dataURL.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);

            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], fileName, { type: mime });
          }
        });
      }

      async uploadFile(event: any, id: any, sig: string, fc: string) {
        const fileToUpload0 = event.target.files[0];
        const name = sig + '-' + fileToUpload0.name;
        let reduce: File;


        try {
          reduce = await this.reduceImageSize(fileToUpload0, 50 * 1024 , 0.8);
        } catch (error) {
          console.error('Error reducing image size:', error);
          return; // If an error occurs, you might want to handle it accordingly.
        }

        if (this.imagefile.some((x) => x.source == sig)) {
          const idx = this.imagefile.findIndex((x) => x.source == sig);
          this.imagefile[idx].files = reduce;
          this.cd.detectChanges()

        } else {
          const renamedFile = new File([reduce], name, { type: reduce.type });
          this.imagefile.push({
            source: sig,
            files: renamedFile,
          });
          this.cd.detectChanges()

        }

        switch (fc) {
          case 'companyLogo':
            this.subCompanyForm.get('companyLogo').setValue(reduce.name);
            const readers = new FileReader();
            readers.readAsDataURL(reduce);
            this.cd.detectChanges()
            readers.onload = (event) => {
              this.imageUrl = event.target?.result as string;
              this.cd.detectChanges()

            };
            break;
            case 'signatory1Path':
                this.subCompanyForm.get('signatory1Path').setValue(reduce.name);
            break;
            case 'signatory2Path':
                this.subCompanyForm.get('signatory2Path').setValue(reduce.name);
            break;
            case 'signatory3Path':
                this.subCompanyForm.get('signatory3Path').setValue(reduce.name);
            break;
        }
      }

    previewimage(e, t, m) {
        this.storageServiceService.fileDownload(e, t, m).subscribe({
            next: (response: any) => {
                // extract the base64 file content and content type
                const base64 = response.payload.fileContents
                const contentType = response.payload.contentType || 'application/octet-stream';
                // convert base64 to blob
                // const blob = this.base64ToBlob(base64, contentType);
                const blob = this.coreService.base64ToBlob(base64, contentType);
                var clone = (sessionStorage.getItem("action") == "duplicate")
                if (clone) {
                    this.imagefile.push({
                        source: "duplcate",
                        files: GF.base64ToFile(base64, e, contentType)
                    });
                }
                // create a previewable image URL
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result as string;
                    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(base64data);
                    this.cd.detectChanges();
                };
                reader.readAsDataURL(blob); // read blob for preview
            },
            error: (err) => {
                console.error('Image preview failed:', err);
            }
        });
    }
}
