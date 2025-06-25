import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormControl,
} from '@angular/forms';
import { DropdownPR, SystemSettings } from 'app/model/app.constant';
import { TKFilter, TKForm } from 'app/model/employee/timekeeping-generation';
import {
    Subject,
    debounceTime,
    distinctUntilChanged,
    forkJoin,
    takeUntil,
} from 'rxjs';
import moment from 'moment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenerateDetailedComponent } from './generate-detailed/generate-detailed.component';
import { SummaryGenerateComponent } from './summary-generate/summary-generate.component';
import { TimekeepingService } from 'app/services/timekeepingService/timekeeping.service';
import { DropdownID, DropdownRequest } from 'app/model/dropdown.model';
import { MatDialogModule } from '@angular/material/dialog';
import { FailedMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { GF } from 'app/shared/global-functions';
import _ from 'lodash';
import { fuseAnimations } from '@fuse/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';



enum mode {
    load = 0, // initial
    next = 1, // scroll
    search = 2, // filter
    all = 3, // select all
    change = 4, // any fields calls
    unselectAll = 5, // unselect All
}

@Component({
    selector: 'app-timekeeping-generation',
    templateUrl: './timekeeping-generation.component.html',
    styleUrls: ['./timekeeping-generation.component.css'],
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
    MatIconModule,
    MatButtonModule,
    GenerateDetailedComponent,
    MatTableModule,
    MatDialogModule,
    TranslocoModule,
],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} } // Add this line
      ]
})
export class TimekeepingGenerationComponent implements OnInit {
    displayedColumns: string[] = [
        'employeeCode',
        'displayName',
        'effectiveDate',
        'separationDate',
        'dateFrom',
        'dateTo',
    ];
    dataSource = [];
    object: any;
    complete: boolean = false;
    generates: boolean = false;
    searchgen: boolean = false;
    showbutton: boolean = false;
    disabledgenerate: boolean = true;
    systemSettings = SystemSettings;
    dialogRef: MatDialogRef<GenerateDetailedComponent, any>;
    tkForm: FormGroup;
    dropdownRequest = new DropdownRequest();
    employeeRequest = new DropdownRequest();
    inputChange: UntypedFormControl = new UntypedFormControl();
    inputChange_company: UntypedFormControl = new UntypedFormControl();
    inputChange_branch: UntypedFormControl = new UntypedFormControl();
    inputChange_empCat: UntypedFormControl = new UntypedFormControl();
    inputChange_department: UntypedFormControl = new UntypedFormControl();
    inputChange_confidential: UntypedFormControl = new UntypedFormControl();
    inputChange_empstatus: UntypedFormControl = new UntypedFormControl();

    subCompany_old: any[] = [];
    branch_old: any[] = [];
    category_old: any[] = [];
    department_old: any[] = [];
    confidential_old: any[] = [];
    status_old: any[] = [];

    electedcom: any = [];
    electedbra: any = [];
    electedcat: any = [];
    electeddef: any = [];
    electedcon: any = [];
    electedsta: any = [];

    protected _onDestroy = new Subject<void>();
    tkFilter = new TKFilter();
    payrollCutoff: any[] = [];
    payrollYear: any[] = [];
    payrollMonth: any[] = [];
    cutoffs: any[] = [];
    subCompany: any[] = [];
    branch: any[] = [];
    category: any[] = [];
    department: any[] = [];
    confidential: any[] = [];
    status: any[] = [];
    employee: any[] = [];
    oldemployee: any[] = [];
    selectedEmloyees: any[] = [];
    index: number = 1;
    allemp: boolean = false;
    forscroll: boolean = false;
    empcontrol: string = '';
    failedMessage = { ...FailedMessage };
    dropdownSettings = DropdownPR;
    prev = {
        id: 0,
        text: '',
    };
    mode: number = 0;
    forall: boolean = false;
    @Input() TKCache: string = '';
    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        private timekeepingService: TimekeepingService,
        private message: FuseConfirmationService,
        private cdr: ChangeDetectorRef
    ) {
        this.initializeInputChange(
            this.inputChange_company,
            'subCompany',
            'subCompany_old',
            this.electedcom
        );
        this.initializeInputChange(
            this.inputChange_branch,
            'branch',
            'branch_old',
            this.electedbra
        );
        this.initializeInputChange(
            this.inputChange_empCat,
            'category',
            'category_old',
            this.electedcat
        );
        this.initializeInputChange(
            this.inputChange_department,
            'department',
            'department_old',
            this.electeddef
        );
        this.initializeInputChange(
            this.inputChange_confidential,
            'confidential',
            'confidential_old',
            this.electedcon
        );
        this.initializeInputChange(
            this.inputChange_empstatus,
            'status',
            'status_old',
            this.electedsta
        );
        this.inputChange.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this._onDestroy)
            )
            .subscribe((value) => {
                if (GF.IsEmpty(value)) {
                    this.employee = this.oldemployee;
                    this.tkForm.get('employee').setValue(this.selectedEmloyees);
                    console.log(this.selectedEmloyees);
                } else {
                    this.employeeHandler(mode.search);
                }
            });
    }

    ngOnInit() {
        this.tkForm = this.fb.group(new TKForm());
    }

    typeHandler() {
        this, (this.generates = false);
        this.tkForm.get('subCompany').setValue(null);
        this.tkForm.get('branch').setValue(null);
        this.tkForm.get('category').setValue(null);
        this.tkForm.get('department').setValue(null);
        this.tkForm.get('confidential').setValue(null);
        this.tkForm.get('status').setValue(null);
        this.tkForm.get('employee').setValue(null);
        this.tkForm.disable();
        this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 });
        this.tkFilter.timekeepingType = this.tkForm.value.type;
        this.tkFilter.type = 0;
        forkJoin({
            payrollCutoff: this.timekeepingService.getTKPayrollCutoff(
                this.dropdownRequest
            ),
            tkFilter: this.timekeepingService.getTKFilter(this.tkFilter),
        }).subscribe({
            next: (value: any) => {
                this.payrollCutoff = value.payrollCutoff.payload;
                this.subCompany = value.tkFilter.payload.subCompany;
                this.category = value.tkFilter.payload.category;
                this.department = value.tkFilter.payload.department;
                this.confidential = value.tkFilter.payload.confidential;
                this.status = value.tkFilter.payload.status;
                // console.log(value.tkFilter.payload)
                this.tkForm.enable();
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => {
                this.branchHandler();
            },
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.unsubscribe();
    }

    onSelectOpen(isOpen: boolean): void {
        if (isOpen) {
            // console.log('MatSelect is open');
        } else {
            this.inputChange.setValue('');
            // console.log('MatSelect is closed');
        }
    }

    cutoffHandler(array) {
        array.year.map((item) =>
            this.payrollYear.push({
                id: item,
                description: item,
            })
        );
        this.payrollMonth = array.month;
    }

    cutoffSelectionHandler() {
        // console.log(this.tkForm.value)
        if (
            this.tkForm.value.payrollYear != 0 &&
            this.tkForm.value.payrollMonth != 0
        ) {
            this.cutoffs = this.tkForm.value.payrollId.cutoffs
                .filter(
                    (x) =>
                        x.year == this.tkForm.value.payrollYear &&
                        x.month == this.tkForm.value.payrollMonth
                )
                .map((item) => ({
                    id: item.cutoffId,
                    description: item.cutoffName,
                    dateFrom: item.dateFrom,
                    dateTo: item.dateTo,
                    sample: item.month,
                }));
            //   console.log(this.cutoffs)
            this.cutoffs = GF.sort(this.cutoffs, 'description')
        }
    }

    setCutoffHandler() {
        this.tkForm.controls.dateFrom.setValue(
            new Date(this.tkForm.value.payrollCutoff.dateFrom)
        );
        this.tkForm.controls.dateTo.setValue(
            new Date(this.tkForm.value.payrollCutoff.dateTo)
        );
    }

    initializeInputChange(
        inputChange: UntypedFormControl,
        options,
        options_old,
        selected
    ) {
        inputChange.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this._onDestroy)
            )
            .subscribe((value) => {
                if (GF.IsEmpty(value)) {
                    this[options] = [
                        ...GF.IsEmptyReturn(this[options_old], this[options]),
                    ];
                    this.tkForm.get(options).setValue(selected);
                } else {
                    this[options_old] = _.unionBy(
                        [...this[options], ...this[options_old]],
                        JSON.stringify
                    );
                    this[options] = this[options_old].filter((x) =>
                        x.description
                            .toLowerCase()
                            .includes(value.toLowerCase())
                    );
                    this.cdr.detectChanges();
                }
            });
    }

    branchHandler() {
        this.selectedEmloyees = [];
        this.tkForm.get('employee').setValue([]);
        this.employeeRequest.search = '';
        this.oldemployee = [];
        this.employeeRequest.start = 0;
        this.index = 0;

        this.tkFilter.subCompany = this.electedcom;
        this.tkFilter.type = 1;
        this.tkFilter.timekeepingType = this.tkForm.value.type;
        this.timekeepingService.getTKFilter(this.tkFilter).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.branch = value.payload.branch;
                } else {
                    console.log(value.stackTrace);
                    console.log(value.message);
                }
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => {
                this.employeeHandler(mode.load);
            },
        });
    }

    // Employee Dropdowns Only
    selectedEvent(id) {
        if (this.selectedEmloyees.some((x) => x == id)) {
            var idx = this.selectedEmloyees.findIndex((x) => x == id);
            this.selectedEmloyees.splice(idx, 1);
        } else {
            this.selectedEmloyees.push(id);
        }
    }

    // Other Dropdowns
    selecteddropdown(id, select, fc) {
        let len = this[fc].length;
        this[select] = GF.removeOrPushFromList([], this[select], id);
        let woZero = GF.IsEqual(0, this[select]) ? (this[select].length-1) : this[select].length;
        if (!GF.IsEqual(id, this[select]) && GF.IsEqual(0, this[select]) || (len === woZero) && !GF.IsEqual(0, this[select])) {
            this[select] = GF.removeOrPushFromList([], this[select], 0);
        }
        this.tkForm.get(fc).setValue(this[select]);
    }

    employeeHandler(modes) {
        this.tkFilter.subCompany = GF.IsEmptyReturn(this.electedcom, []);
        this.tkFilter.branch = GF.IsEmptyReturn(this.electedbra, []);
        this.tkFilter.category = GF.IsEmptyReturn(this.electedcat, []);
        this.tkFilter.department = GF.IsEmptyReturn(this.electeddef, []);
        this.tkFilter.confidential = GF.IsEmptyReturn(this.electedcon, []);
        this.tkFilter.status = GF.IsEmptyReturn(this.electedsta, []);
        this.tkForm.value.employee;
        this.tkFilter.type = 2;

        if(this.tkFilter.status.length > 0){
            var statusId = [95,12665]
            var stats =  this.tkForm.value.status.includes(statusId)
            if (!stats) {
                 this.employeeRequest.includeInactive = true
            }
        }

        if (!GF.IsEmpty(this.inputChange.value)) {
            this.employeeRequest.search = this.inputChange.value.toLowerCase();
            this.employeeRequest.id = [];
            this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 0 });
        }
        if (modes == mode.change) {
            this.selectedEmloyees = [];
            this.tkForm.get('employee').setValue([]);
            this.employeeRequest.search = '';
            this.oldemployee = [];
        }
        if (modes == mode.change || modes == mode.search) {
            this.employeeRequest.start = 0;
            this.index = 0;
        }

        this.tkFilter.Req = this.employeeRequest;
        this.tkFilter.timekeepingType = this.tkForm.value.type;
        this.timekeepingService.getTKFilter(this.tkFilter).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    switch (modes) {
                        case mode.all:
                            if (mode.change) {
                                this.employee = _.uniqBy(
                                    [...value.payload.employee],
                                    JSON.stringify
                                );
                            } else {
                                this.employee = _.uniqBy(
                                    [...value.payload.employee],
                                    JSON.stringify
                                );
                                this.tkForm
                                    .get('employee')
                                    .setValue([
                                        ...this.employee.map(
                                            (x) => x.dropdownID
                                        ),
                                        0,
                                    ]);
                            }
                            break;
                        case mode.next:
                            this.employee = _.uniqBy(
                                [...this.employee, ...value.payload.employee],
                                JSON.stringify
                            );
                            if (this.allemp) {
                                this.tkForm
                                    .get('employee')
                                    .setValue([
                                        ...this.employee.map(
                                            (x) => x.dropdownID
                                        ),
                                        0,
                                    ]);
                            }
                            break;
                        case mode.unselectAll:
                            this.employee = _.uniqBy(
                                [...value.payload.employee],
                                JSON.stringify
                            );
                            break;
                        case mode.change:
                        case mode.search:
                            this.employee = _.uniqBy(
                                [...value.payload.employee],
                                JSON.stringify
                            );
                            break;
                        case mode.load:
                            this.employee = _.uniqBy(
                                [...value.payload.employee],
                                JSON.stringify
                            );
                            break;
                    }
                    if (modes !== mode.search) {
                        this.completeChecker(value.payload.employee);
                    }
                    this.oldemployee = _.uniqBy(
                        [...this.oldemployee, ...this.employee],
                        JSON.stringify
                    );
                } else {
                    console.log(value.stackTrace);
                    console.log(value.message);
                }
            },
            error: (e) => {
                console.error(e);
            },
        });
    }

    completeChecker(option): void {
        if (
            this.dropdownSettings &&
            option &&
            this.dropdownSettings.Length > option.length
        ) {
            this.complete = true;
        } else {
            this.complete = false;
        }
    }

    selectAllHandler(ev, control, data) {
        var fm = this.tkForm.get(control) as FormControl;
        this.allemp = ev._selected;
        this.forall = ev._selected;

        var all = ev._selected ? [...data.map((x) => x.dropdownID), 0] : [];
        fm.setValue(all);

        switch (control) {
            case 'subCompany':
                this.electedcom = all;
                this.branchHandler();
                break;
            case 'branch':
                this.electedbra = all;
                this.employeeHandler(4);
                break;
            case 'category':
                this.electedcat = all;
                this.employeeHandler(4);
                break;
            case 'department':
                this.electeddef = all;
                this.employeeHandler(4);
                break;
            case 'confidential':
                this.electedcon = all;
                this.employeeHandler(4);
                break;
            case 'status':
                this.electedsta = all;
                this.employeeHandler(4);
                break;
            default:
                this.selectedEmloyees = all;
                break;
        }
    }

    dateHandler(type, event, index) {
        this.dataSource[index][type] = moment(event).format('YYYY-MM-DD');
    }

    async getNextBatch() {
        console.log(this.complete);
        if (!GF.IsEmpty(this.complete)) {
            this.forscroll = true;
            this.mode = 2;
            this.employeeRequest.search = null;
            this.employeeRequest.start = this.index++;
            this.employeeHandler(mode.next);
        }
    }

    search() {
        this.searchgen = true;
        var obj = {
            dateFrom: this.tkForm.value.dateFrom,
            dateTo: this.tkForm.value.dateTo,
            subCompany: this.tkForm.value.subCompany,
            branch: this.tkForm.value.branch,
            category: this.tkForm.value.category,
            department: this.tkForm.value.department,
            confidential: this.tkForm.value.confidential,
            status: this.tkForm.value.status,
            employee: this.tkForm.value.employee,
            includeInactive: this.tkForm.value.includeInactive,
            timekeepingType: this.tkForm.value.type,
        };
        this.timekeepingService.getTimekeepingFinalEmployee(obj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.dataSource = value.payload;
                    //   console.log(this.dataSource)
                } else {
                    console.log(value.stackTrace);
                    console.log(value.message);
                }
            },
            error: (e) => {
                console.error(e);
            },
        });
    }

    unselect() {
        if (GF.IsEmpty(this.tkForm.value.status)) {
            this.employee = this.oldemployee;
        }
    }

    dropdownempty() {
        if (this.tkForm.value.type == 1) {
            if (
                this.tkForm.value.payrollId == null ||
                this.tkForm.value.payrollYear == null ||
                this.tkForm.value.payrollMonth == null ||
                this.tkForm.value.payrollCutoff?.id == null ||
                this.tkForm.value.subCompany == null ||
                this.tkForm.value.branch == null ||
                this.tkForm.value.category == null ||
                this.tkForm.value.department == null ||
                this.tkForm.value.confidential == null ||
                this.tkForm.value.status == null ||
                this.tkForm.value.employee?.length == 0
            ) {
                this.disabledgenerate = true;
            } else {
                this.disabledgenerate = false;
            }
        } else if (this.tkForm.value.type == 3) {
            if (
                this.tkForm.value.subCompany == null ||
                this.tkForm.value.branch == null ||
                this.tkForm.value.category == null ||
                this.tkForm.value.department == null ||
                this.tkForm.value.confidential == null ||
                this.tkForm.value.status == null ||
                this.tkForm.value.employee.length == 0
            ) {
                this.disabledgenerate = true;
            } else {
                this.disabledgenerate = false;
            }
        }
    }

    generate() {
        if (this.tkForm.value.type == 1) {
            if (
                this.tkForm.value.payrollId == null ||
                this.tkForm.value.payrollYear == null ||
                this.tkForm.value.payrollMonth == null ||
                this.tkForm.value.payrollCutoff.id == null ||
                this.tkForm.value.subCompany == null ||
                this.tkForm.value.branch.length == 0 ||
                this.tkForm.value.category.length == 0 ||
                this.tkForm.value.department.length == 0 ||
                this.tkForm.value.confidential.length == 0 ||
                this.tkForm.value.status.length == 0 ||
                this.tkForm.value.employee.length == 0
            ) {
                this.disabledgenerate = true;
                this.failedMessage.title = 'Warning!';
                this.failedMessage.message = 'Some Field is Empty';
                this.message.open(this.failedMessage);
                return;
            } else {
                this.disabledgenerate = false;
            }
        } else if (this.tkForm.value.type == 3) {
            if (
                this.tkForm.value.subCompany == null ||
                this.tkForm.value.branch.length == 0 ||
                this.tkForm.value.category.length == 0 ||
                this.tkForm.value.department.length == 0 ||
                this.tkForm.value.confidential.length == 0 ||
                this.tkForm.value.status.length == 0 ||
                this.tkForm.value.employee.length == 0
            ) {
                this.disabledgenerate = true;
                this.failedMessage.title = 'Warning!';
                this.failedMessage.message = 'Some Field is Empty';
                this.message.open(this.failedMessage);
                return;
            } else {
                this.disabledgenerate = false;
            }
        }

        this.showbutton = false;
        this.generates = false;
        this.object = [];
        var obj = {
            dateFrom: moment(this.tkForm.value.dateFrom).format('YYYY-MM-DD'),
            dateTo: moment(this.tkForm.value.dateTo).format('YYYY-MM-DD'),
            subCompany: this.tkForm.value.subCompany,
            branch: this.tkForm.value.branch,
            category: this.tkForm.value.category,
            department: this.tkForm.value.department,
            confidential: this.tkForm.value.confidential,
            status: this.tkForm.value.status,
            employee: this.tkForm.value.employee,
            includeInactive: this.tkForm.value.includeInactive,
            timekeepingType: this.tkForm.value.type,
            timekeepingFinalEmployee: this.dataSource,
        };
        this.timekeepingService.generateTimekeeping(obj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.TKCache = value.payload;
                    this.open();
                } else {
                    console.log(value.stackTrace);
                    console.log(value.message);
                }
            },
            error: (e) => {
                console.error(e);
            },
        });
    }

    open() {
        this.generates = true;
        var element = {
            dateFrom: this.tkForm.value.dateFrom,
            dateTo: this.tkForm.value.dateTo,
            subCompany: this.tkForm.value.subCompany,
            branch: this.tkForm.value.branch,
            category: this.tkForm.value.category,
            department: this.tkForm.value.department,
            confidential: this.tkForm.value.confidential,
            status: this.tkForm.value.status,
            employee: this.tkForm.value.employee,
            includeInactive: this.tkForm.value.includeInactive,
            cache: this.TKCache,
            timekeepingType: this.tkForm.value.type,
            payrollCutoff: this.tkForm.value.payrollId.cutoffHeaderId,
            year: this.tkForm.value.payrollYear,
            month: this.tkForm.value.payrollMonth,
            cutoff: this.tkForm.value.payrollCutoff.id,
        };
        var obj = {
            type: 'generate',
            props: element,
            exportType: 1,
        };

        this.object = obj;
        // this.dialogRef = this.dialog.open(GenerateDetailedComponent, {
        //   width: '100%', height: '80%',
        //   panelClass: 'app-dialog',
        //   data: obj
        // });
    }

    isALL(e) {
        return !GF.IsEqual(0, e);
    }

    selDisplayNgModel(values, list) {
        try {
            if (!GF.IsEmpty(values) && !GF.IsEmpty(list)) {
                if (Array.isArray(values)) {
                    if (values.some((x) => x === 0)) {
                        return 'All';
                    } else if (typeof values[0] === 'object') {
                        return values[0].description;
                    }
                } else if (typeof values === 'object') {
                    return values.description;
                }

                var out: string;

                if (values.length === 0) {
                    return '';
                }
                if (values.some((x) => x === 0)) {
                    out = 'All';
                } else {
                    out = list.find(
                        (item) => item.dropdownID === values[0]
                    ).description;
                }
                this.prev.id = values;
                this.prev.text = out;
                return out;
            }
        } catch (error) {
            //  console.log({
            //    error: error.message,
            //    value: values,
            //    list: list,
            //    dropdown: 0
            //  })
        }
    }

    clearSearch() {
        this.forscroll = false;
        this.inputChange_company.setValue(''); // Reset the search query
        this.inputChange_branch.setValue('');
        this.inputChange_empCat.setValue('');
        this.inputChange_department.setValue('');
        this.inputChange_confidential.setValue('');
        this.inputChange_empstatus.setValue('');
    }

    descriptions() {
        var label = this.selDisplayNgModel(
            this.tkForm.value.category,
            this.category
        );
        var len = GF.IsEmptyReturn(this.tkForm.value?.category, []).length;
        return len === 1
            ? label
            : label +
                  ' ' +
                  (len === 2 ? '(+ 1 Other)' : '(+' + (len - 1) + ' Others)');
    }
}
