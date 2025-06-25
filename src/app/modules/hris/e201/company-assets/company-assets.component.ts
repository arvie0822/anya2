import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { companyAssetsDetail } from 'app/model/hris/e201';
import { FailedMessage } from 'app/model/message.constant';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import { SharedModule } from 'app/shared/shared.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { forkJoin } from 'rxjs';
import { EmployeeMovementComponent } from '../employee-movement/employee-movement.component';
import { EmployeeRecordsComponent } from '../employee-records/employee-records.component';
import { IncidentReportMemoComponent } from '../incident-report-memo/incident-report-memo.component';
import { LearningsComponent } from '../learnings/learnings.component';
import { NewHireRequirmentsComponent } from '../new-hire-requirments/new-hire-requirments.component';
import { PreviousEmployerComponent } from '../previous-employer/previous-employer.component';
import { PreviousListComponent } from '../previous-list/previous-list.component';
import { WorkEducationalHistoryComponent } from '../work-educational-history/work-educational-history.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-company-assets',
    templateUrl: './company-assets.component.html',
    styleUrls: ['./company-assets.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatInputModule,
        MatMomentDateModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatSelectInfiniteScrollModule,
        MatAutocompleteModule,
        SharedModule,
        MatSortModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatBadgeModule,
        MatTimepickerModule,
        MatTabsModule,
        MatPaginatorModule,
        MatDialogModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatMomentModule,
        MatToolbarModule,
        MatRadioModule,
        DragDropModule,
        CdkStepperModule,
        MatTooltipModule,
        TranslocoModule,
        MatMenuModule,
        DropdownComponent,
        MatDatepickerModule
    ]
})
export class CompanyAssetsComponent implements OnInit {
    displayedColumns: string[] = [
        'action',
        'categoryId',
        'model',
        'serialNumber',
        'conditionId',
        'issuedDate',
        'returnedDate',
        'returnedConditionId',
        'replacementValue',
        'remarks',
    ];

    category = [
        { id: 1, description: 'First category' },
        { id: 2, description: 'Second category' },
        { id: 3, description: 'Super category' },
        { id: 4, description: 'Passive category' },
        // Add more options as needed
    ];

    year = [
        { id: 1, description: '2020' },
        { id: 2, description: '2021' },
        { id: 3, description: '2022' },
        { id: 4, description: '2023' },
        // Add more options as needed
    ];

    condition = [
        { id: 1, description: 'New' },
        { id: 2, description: 'Like New' },
        { id: 3, description: 'Good Condition' },
        { id: 4, description: 'Need Maintenance' },
        { id: 5, description: 'End of Life' },
        // Add more options as needed
    ];

    companyassetform: FormGroup;
    @Input() dataSource: any = [];
    @Input() assettable: any = [];
    @ViewChild('paginator0') paginator0: MatPaginator;
    @ViewChild('companyassettable') companyassettable: MatTable<any>;
    pipe = new DatePipe('en-US');
    editing: boolean = false;
    id: string = '';
    action: string = '';
    ids = 0;
    failedMessage = { ...FailedMessage };
    datasourceindex : any
    rowidsave : 0
    categoryIds: any = [];
    conditionIds: any = [];
    returnconditionIds: any = [];

    dropdownOptions = new DropdownOptions();
    dropdownFix = new DropdownRequest();
    dropdownRequest = new DropdownRequest();

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator0;
    }

    constructor(
        private fb: FormBuilder,
        private masterService: MasterService,
        private tenantService: TenantService,
        private userService: UserService,
        private route: ActivatedRoute,
        private message: FuseConfirmationService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.companyassetform = this.fb.group(new companyAssetsDetail());

        this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 165 });
        this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: 182 });
        this.initData();
    }

    addasset(a, name) {
        const fields = [
            { key: 'categoryId', label: 'Category' },
            { key: 'model', label: 'Model' },
            { key: 'serialNumber', label: 'Serial Number' },
            { key: 'conditionId', label: 'Condition' },
            { key: 'issuedDate', label: 'Issued Date', checkEmpty: true },
            { key: 'returnedDate', label: 'Returned Date', checkEmpty: true },
            { key: 'returnedConditionId', label: 'Returned Condition' },
            { key: 'replacementValue', label: 'Replacement Value' },
            { key: 'remarks', label: 'Remarks' },
        ];

        const emptyFields = fields
            .filter(field => field.checkEmpty ? GF.IsEmpty(this[a].value?.[field.key]) : this[a].value?.[field.key] === "" || this[a].value?.[field.key] === 0 || this[a].value?.[field.key] === null)
            .map(field => field.label);

        if (emptyFields.length > 0) {
            this.failedMessage.title = translate("Warning!");
            this.failedMessage.message = `${emptyFields.join(", ")} ${emptyFields.length > 1 ? 'are' : 'is'} empty`;
            this.message.open(this.failedMessage);
        } else {
            this.adddata(a, name);
        }
    }

    adddata(a, name) {

        var indexToRemove = this.findIndexByNameAndOccurrence(name, this.datasourceindex);

        if (indexToRemove !== -1) {
            this.dataSource.splice(indexToRemove, 1);
        }
        this.dataSource.unshift({
            rowId : this.rowidsave,
            action: null,
            name: name,
            categoryDescription: GF.IsEmptyReturn(
                this.categoryIds[0]?.description,
                ''
            ),
            categoryId: this[a].value.categoryId,
            model: this[a].value.model,
            serialNumber: this[a].value.serialNumber,
            conditionDescription: GF.IsEmptyReturn(
                this.conditionIds[0]?.description,
                ''),
            conditionId: this[a].value.conditionId,
            issuedDate: this.pipe.transform(
                this[a].value.issuedDate,
                'yyyy-MM-dd'
            ),
            returnedDate: this.pipe.transform(
                this[a].value.returnedDate,
                'yyyy-MM-dd'
            ),
            returnedConditionDescription: GF.IsEmptyReturn(
                this.returnconditionIds[0]?.description,
                ''),
            returnedConditionId: this[a].value.returnedConditionId,
            replacementValue: this[a].value.replacementValue,
            remarks: this[a].value.remarks,
        });
        this.companyassettable.renderRows();

        var asset = [
            'categoryId',
            'model',
            'serialNumber',
            'conditionId',
            'issuedDate',
            'returnedDate',
            'returnedConditionId',
            'replacementValue',
            'remarks',
        ];
        var table = a == 'companyassetform' ? asset : [];

        if (a !== '') {
            table.forEach((element) => {
                this[a].get(element).setValue(null);
            });
        }

        if (
            !this.assettable.some(
                (item) =>
                    JSON.stringify(item.data) ===
                    JSON.stringify(this.dataSource)
            )
        ) {
            this.assettable.push({
                data: this.dataSource,
            });
        }

        this.editing = false;
    }

    deledit(a, e, i) {
        this.rowidsave = e.rowId
        this.datasourceindex = i
        switch (a) {
            case 'deleteasset':
                this.dataSource.splice(i, 1);
                this.companyassettable.renderRows();
                break;

            case 'editasset':
                this.companyassetform.get('categoryId').setValue(e.categoryId);
                this.companyassetform.get('model').setValue(e.model);
                this.companyassetform
                    .get('serialNumber')
                    .setValue(e.serialNumber);
                this.companyassetform
                    .get('conditionId')
                    .setValue(e.conditionId);
                this.companyassetform.get('issuedDate').setValue(e.issuedDate);
                this.companyassetform
                    .get('returnedDate')
                    .setValue(e.returnedDate);
                this.companyassetform
                    .get('returnedConditionId')
                    .setValue(e.returnedConditionId);
                this.companyassetform
                    .get('replacementValue')
                    .setValue(e.replacementValue);
                this.companyassetform.get('remarks').setValue(e.remarks);
                this.editing = true;

                // this.dataSource.splice(i, 1);
                this.companyassettable.renderRows();
                break;
        }
    }

    initData() {
        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
            dropdown: this.tenantService.getDropdown(this.dropdownRequest),
        }).subscribe({
            next: (value: any) => {
                // Fix ===========
                this.dropdownOptions.categoryDef =value.dropdown.payload.filter((x) => x.dropdownTypeID === 165);
                this.dropdownOptions.conditiondef =value.dropdown.payload.filter((x) => x.dropdownTypeID === 182);

                if (this.id !== '') {
                    this.action = sessionStorage.getItem('action');
                    if (this.action == 'edit') {
                        this.userService
                            .getE201CompanyAssets(this.id)
                            .subscribe({
                                next: (value: any) => {
                                    if (value.statusCode == 200) {
                                        value.payload.forEach((data) => {
                                            var asset =
                                                data.companyAssetsDetail.map(
                                                    (item) => ({
                                                        ...item,
                                                        name: 'asset',
                                                    })
                                                );

                                            this.dataSource = [...asset];
                                            this.ids = data.id;
                                        });

                                        if (
                                            !this.assettable.some(
                                                (item) =>
                                                    JSON.stringify(
                                                        item.data
                                                    ) ===
                                                    JSON.stringify(
                                                        this.dataSource
                                                    )
                                            )
                                        ) {
                                            this.assettable.push({
                                                data: this.dataSource,
                                                dataId: this.ids,
                                            });
                                        }
                                    }
                                },
                            });
                    }
                }

                // Tenant ===========
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => {},
        });
    }

    dataSourcereturn(name) {
        return this.dataSource.filter((x) => x.name == name);
    }

    findIndexByNameAndOccurrence(name, occurrence) {
        var count = 0;
        for (var i = 0; i < this.dataSource.length; i++) {
            if (this.dataSource[i].name === name) {
                if (count === occurrence) {
                    return i;
                }
                count++;
            }
        }
        return -1; // Return -1 if the occurrence is not found
    }
}
