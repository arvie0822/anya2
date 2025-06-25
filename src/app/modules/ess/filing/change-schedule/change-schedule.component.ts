import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { labels } from 'app/mock-api/apps/mailbox/data';
import { coeForm, leaveForm, ChangeSched, ChangeLog, filingForm, otTable } from 'app/model/administration/filing';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { FilingService } from 'app/services/filingService/filing.service';
import { ShiftService } from 'app/services/shiftService/shift.service';
import { debounceTime, distinctUntilChanged, forkJoin, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { ModalDateRangeComponent } from './modal-date-range/modal-date-range.component';
import { ModalReasonComponent } from './modal-reason/modal-reason.component';
import _, { forEach } from 'lodash';
import { SystemSettings } from 'app/model/app.constant';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { myData } from 'app/model/app.moduleId';
// import { ModalBeforeSavingComponent } from '../change-schedule/modal-before-saving/modal-before-saving.component';
import { ModalBeforeSavingComponent } from './modal-before-saving/modal-before-saving.component';
import { StorageServiceService } from 'app/services/storageService/storageService.service';
import { FilingComponent } from '../filing.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { fuseAnimations } from '@fuse/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { GF, } from 'app/shared/global-functions';

@Component({
    selector: 'app-change-schedule',
    templateUrl: './change-schedule.component.html',
    styleUrls: ['./change-schedule.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatSelectModule,
        MatButtonModule,
        MatMenuModule,
        MatDialogModule,
        TranslocoModule,
        MatTooltipModule,
        NgxMatSelectSearchModule,
        MatSelectInfiniteScrollModule

    ],
})
export class ChangeScheduleComponent implements OnInit {
    @Input() datasource: any
    @Input() selectedemployee: any
    @Input() cssubmit: boolean = false

    @ViewChild(FilingComponent) cssearch: FilingComponent;
    @ViewChild('CSTable') CSTable: MatTable<any>;

    @Output() validate = new EventEmitter<any>();
    @Output() image = new EventEmitter<any>();
    @Output() disabledsubmit = new EventEmitter<any>();
    @Output() employeeIds = new EventEmitter<any>();

    filingForm: FormGroup
    viewingmodal: MatDialogRef<ModalBeforeSavingComponent, any>;
    dialogRef: MatDialogRef<ModalDateRangeComponent, any>;
    dialogRefreason: MatDialogRef<ModalReasonComponent, any>;
    imageUrl: any
    coeForm: FormGroup
    leaveForm: FormGroup
    dataparent: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    displaydataparent: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    type: number
    data: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    inputChangeParent: UntypedFormControl = new UntypedFormControl();
    systemSettings = SystemSettings
    dataChild: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    displaydataChild: ReplaySubject<any[]> = new ReplaySubject<any[]>();
    newshiftdropdownRequest = new DropdownRequest;
    dropdownRequest = new DropdownRequest;
    displaydropdownRequest = new DropdownRequest;
    dropdownFixRequest = new DropdownRequest;
    dropdownOptions = new DropdownOptions
    inputChange: UntypedFormControl = new UntypedFormControl();
    protected _onDestroy = new Subject<void>();
    inputChangeChild: UntypedFormControl = new UntypedFormControl();
    options: any[] = [];
    optionsChild: any[] = [];
    displayoptionsChild: any[] = [];
    optionsParent: any[] = [];
    displayoptionsParent: any[] = [];
    imagefiless: any = []
    idsimage: any = []
    isSave: boolean = false
    id: string = ""
    pipe = new DatePipe('en-US');
    complete: boolean = false
    indexParent: number = 1
    indexchild: number = 1
    min = new Date()
    max = new Date()
    disabledbutton: boolean = false
    old_value = 0
    tid: any
    ids: any
    fileExtension: string | undefined;
    moduleId: any
    transactionId: any

    clickCount: number = 0;
    loginId = 0
    late: boolean = false
    request: any
    cancelsave: boolean = false
    saveMessage = { ...SaveMessage }
    failedMessage = { ...FailedMessage }

    csColumns: string[] = ['actioncs', 'datecs', 'shiftcs', 'new_shiftcs', 'reasoncs', 'clstatus', 'upload_filecs'];

    constructor(private fb: FormBuilder,
        public dialog: MatDialog,
        private shiftService: ShiftService,
        private message: FuseConfirmationService,
        private coreService: CoreService,
        private router: Router,
        private filingService: FilingService,
        private tenantService: TenantService,
        private storageServiceService: StorageServiceService,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,) { }

    get c() {
        return this.coeForm.value
    }
    get ff() {
        return this.filingForm.value
    }

    ngOnInit() {
        this.disabledsubmit.emit(false)
        this.coeForm = this.fb.group(new coeForm());
        this.leaveForm = this.fb.group(new leaveForm());
        this.filingForm = this.fb.group(new filingForm());
        var action = sessionStorage.getItem("action")
        this.moduleId = "32"
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id !== "") {
            if (action == 'edit') {

                this.disabledbutton = false
                this.filingService.getChangeSchedule(this.id).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            var child = value.payload.shiftId == 2 ? [{ id: value.payload.subShiftId1 }] : value.payload.shiftId == 3 ? [{ id: value.payload.subShiftId1 }] : value.payload.shiftId == 6 ? [{ id: value.payload.subShiftId1 }, { id: value.payload.subShiftId2 }] : []
                            var currentchild = value.payload.previousShift == 2 ? [{ id: value.payload.previousSubShiftId1 }] : value.payload.previousShift == 3 ? [{ id: value.payload.previousSubShiftId1 }] : value.payload.previousShift == 6 ? [{ id: value.payload.previousSubShiftId1 }, { id: value.payload.previousSubShiftId2 }] : []
                            this.datasource.push({
                                datedisplay: this.pipe.transform(value.payload.date, "MM-dd-yyyy"),
                                currentshift: { id: value.payload.previousShift, child: currentchild },
                                shiftId: { id: value.payload.shiftId, child: child },
                                date: value.payload.date,
                                reason: value.payload.reason,
                                uploadPath: value.payload.uploadPath.replace("C:\\fakepath\\", ''),
                                status: value.payload.status,
                                changeScheduleId: value.payload.changeScheduleId,
                                disable: false,
                                employeeId: value.payload.employeeId
                            })

                            this.coreService.encrypt_decrypt(true, [value.payload.employeeId.toString()])
                                .subscribe({
                                    next: (value: any) => {
                                        this.tid = value.payload[0]
                                    },
                                    error: (e) => {
                                        console.error(e)
                                    },
                                    complete: () => {

                                    }
                                });

                            this.employeeIds.emit(value.payload.employeeId)

                            this.CSTable.renderRows()
                            this.datasource.forEach(element => {
                                this.dropdownRequest.id.push({ dropdownID: element.shiftId.id == null ? 0 : element.shiftId.id, dropdownTypeID: 0 })
                                element.shiftId.child.forEach(item => {
                                    this.dropdownRequest.id.push({ dropdownID: item.id == null ? 0 : item.id, dropdownTypeID: 0 })
                                });

                                this.displaydropdownRequest.id.push({ dropdownID: element.currentshift.id == null ? 0 : element.currentshift.id, dropdownTypeID: 0 })
                                element.currentshift.child.forEach(item => {
                                    this.displaydropdownRequest.id.push({ dropdownID: item.id == null ? 0 : item.id, dropdownTypeID: 0 })
                                });
                            });

                            this.initData()
                        }
                        else {
                            console.log(value.stackTrace)
                            console.log(value.message)


                        }

                    },
                    error: (e) => {
                        console.error(e)
                    },
                    complete: () => {

                    }
                });
            } else if (action == 'view') {

                this.disabledbutton = true
                this.filingService.getChangeSchedule(this.id).subscribe({
                    next: (value: any) => {

                        if (value.statusCode == 200) {

                            var child = value.payload.shiftId == 2 ? [{ id: value.payload.subShiftId1 }] : value.payload.shiftId == 3 ? [{ id: value.payload.subShiftId1 }] : value.payload.shiftId == 6 ? [{ id: value.payload.subShiftId1 }, { id: value.payload.subShiftId2 }] : []
                            var currentchild = value.payload.previousShift == 2 ? [{ id: value.payload.previousSubShiftId1 }] : value.payload.previousShift == 3 ? [{ id: value.payload.previousSubShiftId1 }] : value.payload.previousShift == 6 ? [{ id: value.payload.previousSubShiftId1 }, { id: value.payload.previousSubShiftId2 }] : []
                            this.datasource.push({
                                datedisplay: this.pipe.transform(value.payload.date, "MM-dd-yyyy"),
                                currentshift: { id: value.payload.previousShift, child: currentchild },
                                shiftId: { id: value.payload.shiftId, child: child },
                                date: value.payload.date,
                                reason: value.payload.reason,
                                uploadPath: value.payload.uploadPath,
                                status: value.payload.status,
                                changeScheduleId: value.payload.changeScheduleId,
                                disable: false,
                                employeeId: value.payload.employeeId
                            })
                            this.coreService.encrypt_decrypt(true, [value.payload.employeeId.toString()])
                                .subscribe({
                                    next: (value: any) => {
                                        this.tid = value.payload[0]
                                    },
                                    error: (e) => {
                                        console.error(e)
                                    },
                                    complete: () => {

                                    }
                                });

                            this.employeeIds.emit(value.payload.employeeId)
                            this.disabledsubmit.emit(true)

                            this.CSTable.renderRows()
                            this.datasource.forEach(element => {
                                this.dropdownRequest.id.push({ dropdownID: element.shiftId.id == null ? 0 : element.shiftId.id, dropdownTypeID: 0 })
                                this.dropdownRequest.id.push({ dropdownID: element.currentshift.id == null ? 0 : element.currentshift.id, dropdownTypeID: 0 })

                                element.shiftId.child.forEach(item => {
                                    this.dropdownRequest.id.push({ dropdownID: item.id == null ? 0 : item.id, dropdownTypeID: 0 })
                                });
                                this.displaydropdownRequest.id.push({ dropdownID: element.shiftId.id == null ? 0 : element.shiftId.id, dropdownTypeID: 0 })
                                this.displaydropdownRequest.id.push({ dropdownID: element.currentshift.id == null ? 0 : element.currentshift.id, dropdownTypeID: 0 })

                                element.shiftId.child.forEach(item => {
                                    this.displaydropdownRequest.id.push({ dropdownID: item.id == null ? 0 : item.id, dropdownTypeID: 0 })
                                });

                                this.displaydropdownRequest.id.push({ dropdownID: element.currentshift.id == null ? 0 : element.currentshift.id, dropdownTypeID: 0 })
                                element.currentshift.child.forEach(item => {
                                    this.displaydropdownRequest.id.push({ dropdownID: item.id == null ? 0 : item.id, dropdownTypeID: 0 })
                                });
                            });

                            this.initData()
                        }
                        else {
                            console.log(value.stackTrace)
                            console.log(value.message)


                        }

                    },
                    error: (e) => {
                        console.error(e)
                    },
                    complete: () => {

                    }
                });
            }
            //fetch edit data here
        } else {

            this.datasource.forEach(element => {
                if (element.status == '') {
                    element.disable = false
                } else {
                    element.disable = true
                }
            });

            this.initData()
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ("cssubmit" in changes) {

            this.cdr.detectChanges()
            if (changes.cssubmit.currentValue) {
                this.submit()
            }
        }
    }

    public async submit() {
        this.disabledsubmit.emit(true)
        if (sessionStorage.getItem('moduleId') == "68" || sessionStorage.getItem('moduleId') == "160") {
            this.idsimage = this.selectedemployee

        } else {
            this.idsimage = [sessionStorage.getItem("u")]

        }
        this.coreService.encrypt_decrypt(false, this.idsimage)
            .subscribe({
                next: (value: any) => {
                    var sample = value.payload[0]
                    this.loginId = Number(value.payload[0])
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                }
            });

        const save = this.datasource
            .filter(x => x.status !== "Approved" && x.shiftId && x.shiftId.id !== null && x.shiftId.id !== 0)
            .map(x => ({ ...x }));
        if (save.length == 0) {
            this.failedMessage.title = translate("Warning!")
            this.failedMessage.message = "No changes in schedule!"
            this.message.open(this.failedMessage);
            this.disabledsubmit.emit(false)
            return
        }

        if (sessionStorage.getItem("action") == 'edit') {
            this.tid
        } else {
            if (sessionStorage.getItem('moduleId') == "68" || sessionStorage.getItem('moduleId') == "160") {

                this.tid = this.selectedemployee
            } else {
                this.tid = sessionStorage.getItem('u')
            }
        }

        var cancelsave = await this.coreService.required(this.tid, save, '32', 0)
        if (cancelsave) {
            this.disabledsubmit.emit(false)
            return
        }
        debugger
        var messagetrans = translate("cancelled upon Change Schedule");
        this.saveMessage.message = messagetrans
        const dialogRef = this.message.open(this.saveMessage);
        // const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                save.forEach(o => {
                    o["shiftIds"] = o.shiftId
                    o["shiftId"] = o.shiftId.id
                    //   o["subshiftId1"] = o.shiftId
                    o.shiftIds.child.forEach((sub, i) => {
                        o["subshiftId" + (i + 1)] = sub.id
                    });

                    o.currentshift.child.forEach((subs, ii) => {
                        o["previousSubShiftId" + (ii + 1)] = subs.id
                    });
                });
                this.isSave = true
                this.filingService.postChangeSchedule(save, this.tid, this.late).subscribe({

                    next: (value: any) => {
                        //   Error lock cannot file ==============================
                        this.coreService.valid(value, this.late, save.length, true, ['/search/filing-view'], "").then((res) => {
                            if (res.saveNow) {
                                this.late = res.lateSave
                                this.submit()
                                this.disabledsubmit.emit(false)

                                return
                            }else{
                                debugger
                                this.disabledsubmit.emit(false)
                            }

                            if (res.reset) {
                                this.late = false
                            }



                            this.imagefiless = myData.fileimage
                            if (this.imagefiless.length === 0) {
                                return
                            }

                            this.coreService.uploadimage(myData.fileimage, value.payload.transactionIds, this.moduleId, this.loginId)
                            // this.uploadimage(value.payload.transactionIds)
                        })
                    },
                    error: (e) => {
                        this.isSave = false
                        this.message.open(FailedMessage);
                        this.disabledsubmit.emit(false)
                        console.error(e)
                    }
                });
            } else {
                this.disabledsubmit.emit(false)
            }
        });
    }

    incrementClickCount(i) {
        this.clickCount++;
    }

    async uploadFile(event, id, i, e) {

        let fileName = event.target.files[0].name;
        this.fileExtension = this.getFileExtension(fileName);
        var namefile = this.fileExtension

        const fileToUpload0 = event.target.files[0];
        const name = fileToUpload0.name;

        let reduce: File;

        if (namefile == "jpg" || namefile == "png") {
            try {
                reduce = await this.reduceImageSize(fileToUpload0, 50 * 1024, 0.8);

            } catch (error) {
                return; // If an error occurs, you might want to handle it accordingly.
            }
        } else {
            reduce = fileToUpload0

        }
        const renamedFile = new File([reduce], name, { type: reduce.type });
        if (this.imagefiless.some((x) => x.index == i)) {
            const idx = this.imagefiless.findIndex((x) => x.index == i);
            this.imagefiless[idx].files = reduce;
            this.imagefiless[idx].isupload = true;
        } else {
            const renamedFile = new File([reduce], name, { type: reduce.type });
            var inx = this.imagefiless.length == 0 ? 0 : this.imagefiless.length - 1
            for (let index = inx; index <= i; index++) {
                var isup = index == i ? true : false
                this.imagefiless.push({
                    index: index,
                    files: renamedFile,
                    isupload: isup
                });
            }

        }

        myData.fileimage = _.uniqBy([...this.imagefiless], JSON.stringify)
        var sample = myData.fileimage
        e.uploadPath = e.uploadPath.replace("C:\\fakepath\\", '')
    }

    getFileExtension(fileName: string): string {
        // Use regex to extract the file extension from the file name
        const match = /\.([0-9a-z]+)(?:[\?#]|$)/i.exec(fileName);
        if (match && match[1]) {
            return match[1].toLowerCase(); // Convert to lowercase if needed
        } else {
            return 'Unknown';
        }
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

    modal(e, i, day, elem) {
        debugger
        if (i == 0 && this.datasource.length > 1) {
            if (this.dialogRef) {
                this.dialogRef.close();
            }
            this.dialogRef = this.dialog.open(ModalDateRangeComponent, {
                width: '20%',
                height: '20%',
            })

            this.dialogRef.afterClosed().subscribe(result => {

                if (result) {

                    // for (let ii = 0; ii <= this.datasource.length; ii++) { this.change(0, "shiftId") }

                    for (let ii = 1; ii < this.datasource.length; ii++) {


                        if (this.datasource[ii].status == "Approved" || this.datasource[ii].status == "First Level Approval") {
                            this.datasource[ii].disable = true

                        } else {
                            this.datasource[ii].shiftId.id = e.value
                            this.datasource[ii].disable = false
                        }


                        if (e.value == 6 && this.datasource[ii].status == "") {
                            this.datasource[ii].shiftId["child"] = [{ id: null }, { id: null }]
                        } else if
                            (e.value == 2 && this.datasource[ii].status == "" || e.value == 3 && this.datasource[ii].status == "") {
                            this.datasource[ii].shiftId["child"] = [{ id: null }]
                        } else {
                            this.datasource[ii].shiftId["child"] = []
                        }
                    }

                    this.cdr.detectChanges()

                    // this.CSTable.renderRows()
                }
            })
        }
    }

    change(index, day) {
        this.datasource[index][day].child = []
        if (this.datasource[index][day].id == 6) {
            this.datasource[index][day].child.push({ id: null }, { id: null })
        } else if (this.datasource[index][day].id == 2 || this.datasource[index][day].id == 3) {
            this.datasource[index][day].child.push({ id: null })
        }
        else {
            this.datasource[index][day].child = []
        }
        // this.shiftTable.renderRows();
    }

    reasonmodal(e, i) {
        debugger
        if (i == 0) {
            if (i == 0 && this.datasource.length > 1) {


                if (this.dialogRefreason) {
                    this.dialogRefreason.close();
                }
                this.dialogRefreason = this.dialog.open(ModalReasonComponent, {
                    // width: '20%',
                    // height: '20%',
                })

                this.dialogRefreason.afterClosed().subscribe(result => {
                    if (result) {
                        for (let ii = 1; ii < this.datasource.length; ii++) {
                            if (this.datasource[ii].status == "") {
                                this.datasource[ii].reason = e.target.value
                            }
                        }
                        // this.CSTable.renderRows()
                    }
                this.cdr.detectChanges()
                })
            }
        }
    }

    handleDeleteBreak(index) {
        this.datasource.splice(index, 1);
        this.CSTable.renderRows();

    }

    initData() {

        var action = sessionStorage.getItem("action")
        this.datasource.forEach(element => {
            if (GF.IsEmpty(element.shiftId.id) && action == "") {
                this.newshiftdropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })
            } else {
                this.dropdownRequest.id.push({ dropdownID: element.shiftId.id == null ? 0 : element.shiftId.id, dropdownTypeID: 0 })
                this.dropdownRequest.id.push({ dropdownID: GF.IsEmpty(element.newShiftId) ? 0 : element.newShiftId, dropdownTypeID: 0 })
                this.dropdownRequest.id.push({ dropdownID: element.newSubShiftId1 == null ? 0 : element.newSubShiftId1, dropdownTypeID: 0 })
                this.dropdownRequest.id.push({ dropdownID: element.newSubShiftId2 == null ? 0 : element.newSubShiftId2, dropdownTypeID: 0 })
            }

            if (action == "") {
                this.displaydropdownRequest.id.push({ dropdownID: element.currentshift.id == null ? 0 : element.currentshift.id, dropdownTypeID: 0 })
                if (element.currentshift.id == 6) {
                    this.displaydropdownRequest.id.push({ dropdownID: GF.IsEmpty(element.currentshift.child) ? 0 : element.currentshift.child[0].id, dropdownTypeID: 0 })
                    this.displaydropdownRequest.id.push({ dropdownID: GF.IsEmpty(element.currentshift.child) ? 0 : element.currentshift.child[1].id, dropdownTypeID: 0 })
                } else if (element.currentshift.id == 3 || element.currentshift.id == 2) {
                    this.displaydropdownRequest.id.push({ dropdownID: GF.IsEmpty(element.currentshift.child[0].id) ? 0 : element.currentshift.child[0].id, dropdownTypeID: 0 })
                }
            }

            if (element.newShiftId == null) {
                this.newshiftdropdownRequest = this.displaydropdownRequest
            }
        });

        forkJoin({
            shift: this.shiftService.getShiftPerDayDropdown(this.dropdownRequest),
            // load dropdown without newshift
            newshift: this.shiftService.getShiftPerDayDropdown(this.newshiftdropdownRequest),
            displayshift: this.shiftService.getShiftPerDayDropdown(this.displaydropdownRequest),
        }).subscribe({
            next: (response) => {

                this.dropdownOptions.shiftCodeDef = response.shift.payload
                // this.optionsParent = this.dropdownOptions.shiftCodeDef.filter(item => item.dropdownID && item.dropdownID)
                this.optionsParent = _.uniqBy([...this.dropdownOptions.shiftCodeDef.filter(item => item.dropdownID && item.dropdownID)], JSON.stringify)
                this.dataparent.next(this.optionsParent)

                //for display only
                this.dropdownOptions.displayshiftCodeDef = response.displayshift.payload
                this.displayoptionsParent = this.dropdownOptions.displayshiftCodeDef.filter(item => item.dropdownID && item.dropdownID)
                this.displaydataparent.next(this.displayoptionsParent)

                this.optionsChild = this.dropdownOptions.shiftCodeDef.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                && item.dropdownID != 6 && item.dropdownID != 1)

                //display only
                this.displayoptionsChild = this.dropdownOptions.displayshiftCodeDef.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                && item.dropdownID != 6 && item.dropdownID != 1)

                this.dataChild.next(this.optionsChild)
                this.displaydataChild.next(this.displayoptionsChild)
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {

                this.inputChange.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent();
                        });

                this.inputChangeChild.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearchChild()
                        });

                this.inputChangeParent.valueChanges.
                    pipe(debounceTime(300),
                        distinctUntilChanged(),
                        takeUntil(this._onDestroy)).subscribe(() => {
                            this.handlerSearcParent()
                        });
            },
        });
    }

    handlerSearcParent() {

        const search = this.inputChangeParent.value.toLowerCase()
        if (!search) {

            this.dataparent.next(this.optionsParent)
            this.displaydataparent.next(this.displayoptionsParent)
        }
        else {
            this.dropdownRequest.search = search
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: this.type })

            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {
                    this.optionsParent = _.uniqBy([...this.optionsParent, ...value.payload], JSON.stringify)
                    this.displayoptionsParent = _.uniqBy([...this.displayoptionsParent, ...value.payload], JSON.stringify)
                    this.optionsParent = this.optionsParent.filter(item => item.dropdownID && item.dropdownID)
                    this.displayoptionsParent = this.displayoptionsParent.filter(item => item.dropdownID && item.dropdownID)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.dataparent.next(this.optionsParent.filter(x => x.description.toLowerCase().indexOf(search) > -1));
                    this.displaydataparent.next(this.displayoptionsParent.filter(x => x.description.toLowerCase().indexOf(search) > -1));
                },
            });
            // }
        }
    }

    getNextBatchParent() {

        if (!this.complete) {
            const search = this.inputChangeParent.value?.toLowerCase()

            if (search) {
                this.dropdownRequest.search = search
            }
            this.dropdownRequest.search = null
            this.dropdownRequest.start = this.indexParent++
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })


            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {
                    this.optionsParent = _.uniqBy([...this.optionsParent, ...value.payload], JSON.stringify)
                    this.optionsParent = this.optionsParent.filter(item => item.dropdownID && item.dropdownID)
                    this.displayoptionsParent = _.uniqBy([...this.displayoptionsParent, ...value.payload], JSON.stringify)
                    this.displayoptionsParent = this.displayoptionsParent.filter(item => item.dropdownID && item.dropdownID)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.dataparent.next(this.optionsParent);
                    this.displaydataparent.next(this.displayoptionsParent);
                },
            });
        }
    }

    // ==================== for child frop ========================
    handlerSearchChild() {

        const search = this.inputChangeChild.value.toLowerCase()
        if (!search) {

            this.dataChild.next(this.optionsChild)

            //for display only
            this.displaydataChild.next(this.displayoptionsChild)
        }
        else {
            this.dropdownRequest.search = search
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: this.type })

            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {
                    this.optionsChild = _.uniqBy([...this.optionsChild, ...value.payload], JSON.stringify)
                    this.optionsChild = this.optionsChild.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                    && item.dropdownID != 6 && item.dropdownID != 1)

                    //for display only
                    this.displayoptionsChild = _.uniqBy([...this.displayoptionsChild, ...value.payload], JSON.stringify)
                    this.displayoptionsChild = this.displayoptionsChild.filter(item => item.dropdownID != 3 && item.dropdownID != 2 && item.dropdownID != 4
                    && item.dropdownID != 6 && item.dropdownID != 1)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.dataChild.next(this.optionsChild.filter(x => x.description.toLowerCase().indexOf(search) > -1));

                    //for display only
                    this.displaydataChild.next(this.displayoptionsChild.filter(x => x.description.toLowerCase().indexOf(search) > -1));
                },
            });
            // }
        }
    }

    getNextBatchchild() {

        if (!this.complete) {
            const search = this.inputChangeChild.value?.toLowerCase()

            if (search) {
                this.dropdownRequest.search = search
            }
            this.dropdownRequest.search = null
            this.dropdownRequest.start = +this.indexchild++
            this.dropdownRequest.id = []
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 })


            this.shiftService.getShiftPerDayDropdown(this.dropdownRequest).subscribe({
                next: (value: any) => {
                    this.optionsChild = _.uniqBy([...this.optionsChild, ...value.payload], JSON.stringify)
                    this.optionsChild = this.optionsChild.filter(item => item.dropdownID && item.dropdownID)

                    //for display only
                    this.displayoptionsChild = _.uniqBy([...this.displayoptionsChild, ...value.payload], JSON.stringify)
                    this.displayoptionsChild = this.displayoptionsChild.filter(item => item.dropdownID && item.dropdownID)
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                    this.dataChild.next(this.optionsChild);
                    //for display only
                    this.displaydataChild.next(this.displayoptionsChild);
                },
            });
        }
    }

    cancel(e) {



        var mid = myData.filingtypeencryp

        // cancelChangeSchedule

        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {

            if (result == "confirmed") {

                this.isSave = true
                this.filingService.postCancelFiling(mid, e, this.late).subscribe({

                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.message.open(SuccessMessage);
                            this.isSave = false
                            this.router.navigate(['/seach/filing-view']);
                        }
                        else if (value.payload.lockingState == 2 && value.payload.valiationState == 2 || value.payload.lockingState == 2 && value.payload.valiationState == 0) {
                            this.failedMessage = value.message
                            this.message.open(this.failedMessage);

                            // valid but not validated =========================
                        } else if (value.payload.lockingState == 0 && value.payload.valiationState == 1) {
                            this.failedMessage = value.message
                            this.message.open(this.failedMessage);

                            // late but validated =================================
                        } else if (value.payload.lockingState == 1 && value.payload.valiationState == 0) {
                            this.saveMessage.message = "This will be tagged as Late Cancel'. Continue?"
                            const dialogRef = this.message.open(this.saveMessage);
                            dialogRef.afterClosed().subscribe((result) => {
                                if (result == "confirmed") {
                                    this.filingService.postCancelFiling(mid, e, this.late = true).subscribe({
                                        next: (value: any) => {
                                            if (value.statusCode == 200) {
                                                this.message.open(SuccessMessage);
                                                this.isSave = false
                                                this.router.navigate(['/search/filing-view']);
                                                // need
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            FailedMessage.message = value.message
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

    getshiftId(e) {
        this.validate.emit(e)
    }

}
