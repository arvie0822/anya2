import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DatatableCrud } from 'app/model/datatable-crud.model';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { debounceTime, filter, forkJoin, fromEvent, merge, Subscription } from 'rxjs';
import { CrudModalComponent } from './crud-modal/crud-modal.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import _ from 'lodash';
import { GF } from 'app/shared/global-functions';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fuseAnimations } from '@fuse/animations';
import { SharedModule } from 'app/shared/shared.module';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { EmployeeHierarchyComponent } from '../employee-hierarchy/employee-hierarchy.component';
import { DropdownHierarchyComponent } from '../dropdown-hierarchy/dropdown-hierarchy.component';
import { DropdownEntitlementComponent } from '../dropdown-entitlement/dropdown-entitlement.component';
import { MonthDateComponent } from './crud-modal/dateformat/month-date.component';
import { MatTimepickerModule } from 'mat-timepicker';
import { DropdownCustomComponent } from '../dropdown-custom/dropdown-custom.component';
import { translate, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatMomentAdapter } from '@angular-material-components/moment-adapter';

const DATE_FORMAT = 'MM/DD/yyyy';

export const MY_FORMATS = {
    parse: {
        dateInput: DATE_FORMAT,
    },
    display: {
        dateInput: DATE_FORMAT,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: DATE_FORMAT,
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

const CUSTOM_DATE_FORMATS = {
    parse: {
        dateInput: 'MM-DD-YYYY HH:mm A',
    },
    display: {
        dateInput: 'MM-DD-YYYY HH:mm A',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'MM-DD-YYYY HH:mm A',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

enum mode {
    all = 0,
    next = 1
}

@Component({
    selector: 'app-datatable-crud',
    templateUrl: './datatable-crud.component.html',
    styleUrls: ['./datatable-crud.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_FORMATS,
        },
        { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
        { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
    ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    CdkTableModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    DropdownComponent,
    EmployeeHierarchyComponent,
    DropdownEntitlementComponent,
    DropdownCustomComponent,
    CrudTableComponent,
    MatTimepickerModule,
    TranslocoModule,

  ],

})
export class DatatableCrudComponent implements OnInit {
    @ViewChild(CrudTableComponent) child: CrudTableComponent;
    @Output() crudtable: any = []
    @Input() tagType: any = []
    @ViewChild(MatTable) matTable: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    columns: any = []
    table: any = []
    checkedList = []
    columndefs: any = []
    isLoadingResults: boolean = true;
    allowEdit: boolean = true;
    allowCreate: boolean = true;
    isSAve: boolean = false
    isAdd: boolean = false
    isDelete: boolean = false
    request: any = []
    dataSource: any = []
    dropdowns: any = []
    totalRows: number = 0
    dropdownFix = new DropdownRequest
    dropdownRequest = new DropdownRequest
    dropdownDynamic = new DropdownRequest
    resultHierarchy = new SearchHierarchy;
    pipe = new DatePipe('en-US');
    dropdownsDynamic: any = []
    selectedElement: any = []
    optionStored = []
    selectedItem = []
    excluded = []
    dialogRef: any = []
    confirmed: boolean = false
    resetFix: boolean = false
    resetCustom: boolean = false
    input: boolean = false
    resetHierarchy: boolean = false
    rows: number = 0
    screenWidth: number;
    deleteUrl: string = ""
    tittlelist: string = " List"
    successMessage = Object.assign({}, SuccessMessage)
    failedMessage = Object.assign({}, FailedMessage)
    savedMessage = Object.assign({}, SaveMessage)
    confirmMessage = Object.assign({}, SaveMessage)
    resizeSubscription: Subscription;
    autoResize = true;

    constructor(private cd: ChangeDetectorRef,
        private translocoService: TranslocoService,
        private route: ActivatedRoute,
        private coreService: CoreService,
        public dialog: MatDialog,
        private masterService: MasterService,
        private tenantService: TenantService,
        private message: FuseConfirmationService,
        private router: Router,) {

        this.request = new TableRequest()
        route.params.subscribe(val => {
            this.columns = []
            this.table = []
            this.columndefs = []
            this.dataSource = []
            this.isSAve = false
            this.initialize(val.id)
        });
    }

    // ngDoCheck(){
    //     this.table.filter.forEach((data,ii) => {
    //         this.table.filter[ii].label = this.translocoService.translate(GF.IsEmptyReturn(this.table.filter[ii].label,''));
    //         this.cd.detectChanges();
    //     });
    // }

    ngDoCheck() {
        this.table.filter.forEach(filterItem => {
            // Use `originalLabel` to store the translation key or original value
            if (!filterItem.originalLabel) {
                filterItem.originalLabel = filterItem.label;
            }

            // Translate dynamically from `originalLabel`
            filterItem.label = this.translocoService.translate(GF.IsEmptyReturn(filterItem.originalLabel, ''));
        });

        this.translocoService.langChanges$.subscribe(() => {
            this.updateTableLabels();
        });
    }


    ngOnInit() {

        this.translocoService.langChanges$.subscribe(() => {
            this.updateTableLabels();
        });

        this.screenWidth = window.innerWidth;
        this.resizeSubscription = merge(
            fromEvent(window, 'resize'),
            fromEvent(window, 'orientationchange')
        ).pipe(
            debounceTime(50),
            filter(() => this.autoResize)
        ).subscribe(() => {
            this.screenWidth = window.innerWidth;
        });
    }

    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }

    initialize(val) {
        if (sessionStorage.getItem('moduleId') == "155") {
            this.tittlelist = ''
        } else {
            this.tittlelist = ' List'
        }
        this.table = DatatableCrud.filter(x => x.type == val)[0]
        this.crudtable = this.table
        this.columndefs.push("action")
        this.table.rows.map(element => {
            this.columndefs.push(element.column)
        });
        if (this.table.delete.show === true) {
            this.deleteUrl = this.table.api.delete
        }

        this.initData()
    }

    initData(): void {
        this.request.Order = this.table.rows.filter(x => x.defaultSort == true)[0].column
        this.request.OrderBy = "Desc"
        this.loadData(true)
        this.setDropownData()
    }

    setDropownData() {
        this.setDDParameters()

        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
            dropdownDynamic: this.tenantService.getDropdown(this.dropdownRequest)
        }).subscribe({
            next: (value: any) => {
                this.optionStored = [...value.dropdownFix.payload, ...value.dropdownDynamic.payload]
            },
            error: (e) => {
                console.error(e)
            },
            complete: () => {
                this.table.filter.map((element, i) => {
                    element.options = this.loadDropdown(element.options, element.type, element.dropdownType)
                });
            }
        });
    }

    setDDParameters() {
        this.table.filter.filter(item => item.type == "select-fix").map((element, i) => {
            if (element.dropdownType.type == "fix") {
                this.dropdownFix.id.push({ dropdownID: element.dropdownType.uri === 3 ? 3 : 0, dropdownTypeID: element.dropdownType.uri },)
            } else {
                this.dropdownRequest.id.push({ dropdownID: 0, dropdownTypeID: element?.dropdownType?.uri || 0 },)
            }
        });
    }

    loadDropdown(val, type, dd) {
        var out: any
        if (type == "select-fix") {
            if (dd.type == "fix") {
                out = this.optionStored.filter(item => item.dropdownTypeID == dd.uri)
            } else {
                out = val
            }
        } else {
            out = val
        }
        return out
    }

    loadData(load): void {
        this.setParams(load)
        this.isLoadingResults = true;
        this.coreService.getTableData(this.table.api.table, this.request).subscribe(data => {
            if (data.statusCode == 200) {
                this.totalRows = data.payload.totalRows
                this.dataSource = data.payload.data
                this.allowCreate = data.payload.allowCreate
                this.dataSource.paginator = this.paginator;
                if (this.selectedItem.some(x => x.id === 0)) {
                    this.selectAllCheck({ checked: true }, mode.next)
                }
                this.matTable.renderRows();
                this.isLoadingResults = false;
            }
            else {
                console.log(data.stackTrace)
                console.log(data.message)
                this.isLoadingResults = false;
            }
        },
            (error: HttpErrorResponse) => {
                console.log(error.error);
                this.isLoadingResults = false;
            });

    }

    handlePageEvent(e): void {
        this.request.Start = e.pageIndex
        this.request.Length = e.pageSize
        this.loadData(true)
    }

    handleSortEvent(e): void {
        this.paginator.pageIndex = 0
        this.request.Start = 0
        this.request.Order = e.active
        this.request.OrderBy = e.direction
        this.loadData(false)
    }

    handleCreateEvent(): void {
        // this.setDropdown(this.table.form.filter(x => x.type == "select"))
        // this.coreService.dynamicFormDefaultData(this.table.form)
        this.isAdd = true
        this.isSAve = true
        this.isDelete = true

    }

    handleOpenEvent(element) {
        this.isSAve = true
        this.isAdd = false
        // this.isSAve = false//encryptId
        var cc = this.selectedElement.filter(i => i == element.encryptId)

        cc.length > 0 ? null : this.selectedElement.push(element.encryptId)
        setTimeout(() => {
            this.child.edit_datasource(element, this.table.api.get)
        }, 500);
        // this.coreService.getData(this.table.api.get, element.encryptId).subscribe({
        //     next: (value: any) => {
        //         this.coreService.dynamicFormMappingData(this.table.form, value.payload)
        //         this.isSAve = true
        //     },
        //     error: (e) => {
        //       console.error(e)
        //     }
        //   });
    }

    highligthselected(e) {
        var cc = this.selectedElement.filter(i => i == e)
        return cc.length > 0 ? true : false
    }

    removehighlight(id) {
        var cc = this.selectedElement.filter(i => i == id)
        if (cc !== null && cc.length > 0) {
            var indx = this.selectedElement.indexOf(id)
            this.selectedElement.splice(indx, 1)
        }
    }

    // setDropdown(data) {
    //     this.dropdownFix.search = ""
    //     this.dropdownFix.start = 0
    //     this.dropdownFix.length = 20
    //     this.dropdownFix.search = ""
    //     this.dropdownFix.id = []
    //     this.dropdownFix.includeInactive = false

    //     this.dropdownDynamic.search = ""
    //     this.dropdownDynamic.start = 0
    //     this.dropdownDynamic.length = 20
    //     this.dropdownDynamic.search = ""
    //     this.dropdownDynamic.id = []
    //     this.dropdownDynamic.includeInactive = false
    //

    //     data.forEach((element) => {
    //         if (element.dropdownType.type == "fix") {
    //             this.dropdownFix.id.push({ dropdownID: 0, dropdownTypeID: element.dropdownType.uri })
    //         }
    //         else if(element.dropdownType.type == "dynamic"){
    //             this.dropdownDynamic.id.push({ dropdownID: 0, dropdownTypeID: element.dropdownType.uri })
    //         }
    //     });
    //     forkJoin({
    //         dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
    //         dropdownDynamic: this.tenantService.getDropdown(this.dropdownDynamic)

    //     }).subscribe({
    //         next: (response) => {
    //             this.dropdowns = response.dropdownFix
    //             this.dropdownsDynamic = response.dropdownDynamic
    //         },
    //         error: (e) => {
    //             console.error(e)
    //         },
    //         complete: () => {
    //             // const dialogRef = this.dialog.open(CrudModalComponent, {
    //             //     maxWidth: '70vw',
    //             //     // maxHeight: '70vh',
    //             //     // height: '100%',
    //             //     width: '100%',
    //             //     data: {
    //             //         data: this.table,
    //             //         dropdowns: this.dropdowns
    //             //     }
    //             // });

    //             // dialogRef.afterClosed().subscribe(result => {
    //             //     console.log('The dialog was closed');
    //             // });
    //         },
    //     });
    // }

    handleExportEvent(): void {
        this.isLoadingResults = true;
        const prevLength = this.request.Length
        this.request.Length = 0
        this.coreService.getTableData(this.table.api.table, this.request).subscribe(data => {
            this.request.Length = prevLength
            for (let key in data.payload.data) {
                this.table.excludeExport.forEach((del) => {
                    delete data.payload.data[key][del];
                });
            }
            this.coreService.exportToExcel(data.payload.data, this.route.snapshot.paramMap.get('id'))
            this.isLoadingResults = false;
        },
            (error: HttpErrorResponse) => {
                console.log(error.error);
            });
    }

    setParams(load) {
        if (!load) {
            this.request.SearchColumn = []
            this.table.filter.filter(item => item.value !== "" && item.value !== 0)//&& item.type !== "e-hierarchy")
                .forEach(ee => {
                    if (ee.multiselect) {
                        if (ee.type == "e-hierarchy") {
                            if (this.resultHierarchy.Search.length > 0) {
                                var eHierarchy = {
                                    "EmployeeID": "employeeId",
                                    "SubCompanyID": "subCompanyId",
                                    "BranchID": "branchId"
                                };

                                this.resultHierarchy.Search.filter(x => Object.keys(eHierarchy).includes(x.Key)).forEach(element => {
                                    if (Array.isArray(element.Value)) {
                                        element.Value.forEach(val => {
                                            this.request.SearchColumn.push({
                                                "key": eHierarchy[element.Key],
                                                "value": val + "",
                                                "type": element.Type
                                            });
                                        });
                                    } else {
                                        this.request.SearchColumn.push({
                                            "key": element.Key,
                                            "value": element.Value + "",
                                            "type": element.Type
                                        });
                                    }
                                });
                            }
                        } else {
                            if (ee._value !== "") {
                                this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== ee.id);
                                ee._value.forEach(v => {
                                    this.request.SearchColumn.push({
                                        "key": ee.id,
                                        "value": "" + v,
                                        "type": 2
                                    })
                                });
                            }
                        }
                    } else if (ee.type == "date") {
                        var ty = 4
                        if (ee.label == "Date To") {
                            ty = 5
                        }
                        this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== ee.id);
                        if (!GF.IsEmpty(ee._value, true)) {
                            this.request.SearchColumn.push({
                                "key": ee.id,
                                "value": "" + this.pipe.transform(ee._value, "yyyy-MM-dd"),
                                "type": ty
                            })
                        }
                    } else {
                        var ty = 0
                        if (ee.type == "select" || ee.type == "custom") {
                            ty = 1
                        } else if (ee.type == "select-fix") {
                            ty = 2
                        }
                        this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== ee.id);
                        if (!GF.IsEmpty(ee._value, true)) {
                            this.request.SearchColumn.push({
                                "key": ee.id,
                                "value": "" + ee._value,
                                "type": ty
                            })
                        }
                    }
                });
        }
    }

    handleInputEvent(e): void {
        this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== e.target.id);
        this.request.SearchColumn.push({
            "key": e.target.id,
            "value": e.target._value,
            "type": 0
        })
        this.loadData(false)
    }
    handleSelectEvent(e): void {
        this.request.SearchColumn = this.request.SearchColumn.filter(item => item.key !== e.target.id);
        this.request.SearchColumn.push({
            "key": e.target.id,
            "value": e.target._value,
            "type": 0,
            "options": []
        })
        this.loadData(false)
    }

    handleDeleteEvent() {
        if (!this.columndefs.includes("checkbox")) {
            this.columndefs.unshift("checkbox")
            return
        } else {
            if (this.selectedItem.length === 0) {
                if (this.columndefs.includes("checkbox")) {
                    if (this.columndefs[0] === "checkbox") {
                        this.columndefs.shift();
                    }
                    return
                }
            }
        }
        if (this.selectedItem.length > 0) {
            var deleteID = {
                id: this.selectedItem.map(item => item.id),
                except: this.excluded
            }
            var codeConfirmation = this.table.rows.filter(x => x.defaultSort == true).map(x => x.title) //// column name display on delete message
            var key = this.table.delete.key //// column based key for filtering
            var nameList = this.table.rows.filter(x => x.defaultSort == true).map(x => x.column); //// column value display on delete message
            var selectedClone = [...deleteID.id].filter(x => x !== 0); ///remove zero for namelist filtering
            var exceptClone = [...deleteID.except].filter(x => x !== 0); ///remove zero for namelist filtering
            var nameContainerSelected = []
            var nameContainerExcept = []
            for (const Id of selectedClone) {
                var nameIDs = this.dataSource.filter(x => x[key] === Id).map(x => x[nameList])
                nameContainerSelected.push(nameIDs)
            }
            for (const Id of exceptClone) {
                var nameIDe = this.dataSource.filter(x => x[key] === Id).map(x => x[nameList])
                nameContainerExcept.push(nameIDe)
            }
            if (this.selectedItem.map(item => item.id).includes(0)) {
                var exceptString = nameContainerExcept !== null ? "except" : null
                this.savedMessage.message = translate('Are you sure you want to delete all') + codeConfirmation + " " + exceptString + " " + nameContainerExcept
                const dialogConfirm = this.message.open(this.savedMessage);
                dialogConfirm.afterClosed().subscribe((firstresult) => {
                    if (firstresult === "confirmed") {
                        this.confirmMessage.message = "Please click confirm"
                        this.confirmMessage.actions.confirm.label = "Confirm"
                        this.dialogRef = this.message.open(this.confirmMessage);
                        this.dialogRef.afterClosed().subscribe((result) => {
                            if (result === "confirmed") {
                                this.coreService.postDeleteData(this.deleteUrl, deleteID).subscribe(
                                    data => {
                                        if (data.statusCode == 200) {
                                            this.successMessage.message = translate('File has been deleted')
                                            this.successMessage.title = translate('Successful!')
                                            this.message.open(this.successMessage);
                                            this.loadData(true)
                                            if (this.checkedList = []) {
                                                var index = this.columndefs.indexOf("checkbox");
                                                if (index !== -1) {
                                                    this.columndefs.splice(index, 1);
                                                }
                                            }
                                            this.selectedItem = []
                                        } else {
                                            this.failedMessage.message = data.message
                                            this.failedMessage.title = "Failed!"
                                            this.message.open(this.failedMessage);

                                        }

                                    },
                                    (error: HttpErrorResponse) => {
                                        console.log(error.error);
                                    });
                            }
                        })
                    }
                })
            } else {
                this.savedMessage.message = translate('Are you sure you want to delete') + codeConfirmation + " " + nameContainerSelected
                this.dialogRef = this.message.open(this.savedMessage);
                this.dialogRef.afterClosed().subscribe((result) => {
                    if (result === "confirmed") {
                        this.coreService.postDeleteData(this.deleteUrl, deleteID).subscribe(
                            data => {
                                if (data.statusCode == 200) {
                                    this.successMessage.message = translate('File has been deleted')
                                    this.successMessage.title = translate('Successful!')
                                    this.message.open(this.successMessage);
                                    this.loadData(true)
                                    if (this.checkedList = []) {
                                        var index = this.columndefs.indexOf("checkbox");
                                        if (index !== -1) {
                                            this.columndefs.splice(index, 1);
                                        }
                                    }
                                    this.selectedItem = []
                                } else {
                                    this.failedMessage.message = data.message
                                    this.failedMessage.title = translate('Failed!')
                                    this.message.open(this.failedMessage);

                                }

                            },
                            (error: HttpErrorResponse) => {
                                console.log(error.error);
                            });
                    }
                })
            }
        }
    }

    check(i, e) {
        var idx = this.checkedList.findIndex(x => x == i)
        if (idx > -1) {
            this.checkedList.splice(idx, 1)
        } else {
            this.checkedList.push(i)
        }
    }

    // check box function
    selectOne(e, i) {
        var ID = this.table.delete.key
        var id = this.dataSource[i][ID]
        var hasId = this.selectedItem.some(x => x.id === id)
        var hasZero = this.selectedItem.some(x => x.id === 0)

        if (!hasId) {
            this.selectedItem.push({ id: id, page: this.request.Start })
            var count = this.selectedItem.filter(x => x.page == this.request.Start).length
            if (count == this.dataSource.length) {
                this.selectedItem.push({ id: 0, page: this.request.Start })
            }

            if (hasZero) {
                var ex = this.excluded.findIndex(x => x === id)
                if (ex > -1) {
                    this.excluded.splice(ex, 1)
                }
            }
        } else {
            var idx = this.selectedItem.findIndex(x => x.id == id && x.page == this.request.Start)
            if (idx > -1) {
                this.selectedItem.splice(idx, 1)
            }
            if (hasZero) {
                this.excluded.push(id);
            }
        }
    }

    selectAllCheck(e, m) {
        if (e.checked) {
            var Items = []
            var data = []
            var ID = this.table.delete.key
            if (m === mode.next) {
                data = this.dataSource.filter(x => !this.excluded.includes(x[ID]))
            } else {
                data = this.dataSource
            }
            Items = [...[0], ...data.map(x => x[ID])].map(item => ({
                id: item,
                page: this.request.Start
            }))

            this.selectedItem = _.uniqBy([...Items, ...this.selectedItem], JSON.stringify)
        } else {
            this.selectedItem = []
            this.excluded = []
        }
    }

    itemChecked(all, i) {
        var ID = this.table.delete.key
        var id = this.dataSource[i][ID]
        if (!id) { return }
        if (all) {
            return this.selectedItem.some(x => x.id === 0 && x.page == this.request.Start)
        } else {
            if (this.selectedItem.some(x => x.id === 0 && x.page == this.request.Start && this.excluded.includes(x.id))) {
                return true
            } else {
                return this.selectedItem.some(x => x.id === id && x.page == this.request.Start)
            }
        }
    }

    submit() {
        this.child.submit();
    }

    handleUploadEvent(e) {
        this.router.navigate(["detail/upload"]);
    }

    reloadData(event) {
        if (event) {
            this.selectedElement = []
            this.request = new TableRequest()
            this.isSAve = false
            this.initData()
        }
    }

    back() {
        this.selectedElement = []
    }

    isNumber(e) {
        var d: any
        if (isNaN(e)) {
            if (Array.isArray(e)) {
                d = e
            } else {
                d = this.table.filter.find(item => item.id == e)._value
            }
        } else {
            d = Number(e)
        }
        return d
    }

    selectAll(ev, f, i) {
        if (ev._selected) {
            if (f.multiselect) {
                if (f.options.length == f._value.length - 1) {
                    this.table.filter[i]._value = []
                } else {
                    this.table.filter[i]._value = [0, ...f.options.map(item => item.dropdownID)]
                }
            }
        } else {
            if (f.multiple) {
                this.table.filter[i]._value = []
            } else {
                this.table.filter[i]._value = null
            }
        }
    }

    selectedDisplay(control, i) {
        // if (control.label == 'Status' && control._value !== "") {
        var hasAll = (control._value?.length || 0) > 1 ? control._value.some(item => item === 0) : false
        var values = hasAll ? [] : this.table.filter[i].options.filter(item => item.dropdownID === (control._value?.[0] || control._value))[0]
        return hasAll ? 'All' : (values === undefined ? 'All' : values.description)
        // }
    }

    topdiv() {
        var top = "";
        var tagType = this.table.filter.filter(x => x.type == "e-hierarchy")
        tagType = tagType.length == 0 ? [] : tagType[0].tagType
        if (this.isSAve) {

            if (this.child?.dataSource.length > 2) {
                top = (this.screenWidth > 957 && this.screenWidth < 1822) ? '290px' : this.screenWidth < 957 ? '300px' : "230px"
            }else if(this.child?.dataSource.length > 1){
                top = (this.screenWidth > 957 && this.screenWidth < 1822) ? '240px' : this.screenWidth < 957 ? '300px' : "230px"
            }else{
                top = (this.screenWidth > 957 && this.screenWidth < 1822) ? '190px' : this.screenWidth < 957 ? '300px' : "230px"
            }

        } else
            if ((this.table.filter.length + tagType.length) > 6) {
                top = (this.screenWidth > 957 && this.screenWidth < 1822) ? '130px' : this.screenWidth < 957 ? '180px' : "100px"
            } else {
                top = "90px"
            }
        // console.log(top,this.screenWidth)
        return top
    }


    _min(filter) {
        var isDate = this.table.filter.some(x => x.type == 'date')
        if (isDate) {

            var df = this.table.filter.find(x => x.type == 'date' && x.label.toLowerCase().includes('from')).value
            var dt = this.table.filter.find(x => x.type == 'date' && x.label.toLowerCase().includes('to')).value
            var ss = ""
            if (dt !== "" && filter.label == "Date From ") {
                if (df > dt) {
                    this.table.filter.find(x => x.type == 'date' && x.label.toLowerCase().includes('to')).value = df
                }

            } else {
                if (filter.label == "Date To") {
                    return new Date(df)
                }
            }
        }
    }

    refresh() {
        this.request.SearchColumn = [];
        this.resultHierarchy.Search = [];
        this.resetFix = true;
        this.input = true;
        this.resetCustom = true;
        this.resetHierarchy = true;
        var input = this.table.filter.filter((x) => x.type === 'input');
        var hierarchy = this.table.filter.filter((x) => x.type === 'e-hierarchy');
        for (const item of input) {
            item._value = '';
        }
        for (const item of hierarchy) {
            item.value = '';
        }
        this.loadData(true);
    }
    updateTableLabels() {
        this.table.filter.forEach(filterItem => {
            if (!filterItem.originalLabel) {
                filterItem.originalLabel = filterItem.label; // Backup the original
            }
            filterItem.label = this.translocoService.translate(
                GF.IsEmptyReturn(filterItem.originalLabel, '')
            );
        });

        // Debugging: Log the updated labels
    }
}
