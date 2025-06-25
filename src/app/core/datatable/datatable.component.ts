import { HttpErrorResponse } from '@angular/common/http';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CoreService } from 'app/services/coreService/coreService.service';
import { Datatable, TableRequest } from '../../model/datatable.model';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatTable, MatTableModule } from '@angular/material/table';
import { dropdownFix, DropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { firstValueFrom, forkJoin } from 'rxjs';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { min } from 'lodash';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import {
    FailedMessage,
    SaveMessage,
    SuccessMessage,
} from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { GF } from 'app/shared/global-functions';
import { myData } from 'app/app.moduleId';
import { ChangeDetectorRef } from '@angular/core';
import { AttendanceService } from 'app/services/attendanceService/attendance.service';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
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
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fuseAnimations } from '@fuse/animations';
import { DropdownCustomComponent } from '../dropdown-custom/dropdown-custom.component';
import { EmployeeHierarchyComponent } from '../employee-hierarchy/employee-hierarchy.component';
import { GenerateDetailedComponent } from 'app/modules/timekeeping/timekeeping-generation/generate-detailed/generate-detailed.component';
import { SummaryGenerateComponent } from 'app/modules/timekeeping/timekeeping-generation/summary-generate/summary-generate.component';
import _ from 'lodash';
import { FilingService } from 'app/services/filingService/filing.service';
import { StorageServiceService } from 'app/services/storageService/storageService.service';
import { x64 } from 'crypto-js';
import { translate, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FileService } from 'app/services/fileService/file.service';
import { PayrollService } from 'app/services/payrollService/payroll.service';
import { CSVBoxAngularModule } from '@csvbox/angular';
import { UploadCsvBoxComponent } from '../upload-csv-box/upload-csv-box.component';
import { csvSheet } from 'app/modules/upload/setting.model';
import { CSVBoxButtonComponent } from '@csvbox/angular2';


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


@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.css'],
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
    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports     : [
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
        MatCardModule,
        MatSelectModule,
        DropdownCustomComponent,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        EmployeeHierarchyComponent,
        TranslocoModule,
        DropdownComponent,
        CSVBoxButtonComponent
    ],
})
export class DatatableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable) matTable: MatTable<any>;
    dialogRef: MatDialogRef<GenerateDetailedComponent, any>;
    dialogRefSum: MatDialogRef<SummaryGenerateComponent, any>;
    @Output() childTable: any = [];
    @Input() hideFilter: boolean = false;
    @Input() tagType: any = [];
    @Input() defaultTag: any = [];
    @Input() hideDropdown: any = [];
    @Input() create_btn: boolean = false;
    @Input() delete_btn: boolean = false;
    @Input() download_btn: boolean = false;
    @Input() export_btn: boolean = false;
    @Input() search_btn: boolean = false;
    @Input() upload_btn: boolean = false;
    @Input() csv_btn: boolean = false;
    @Input() path: string = '';
    table: any = [];
    clonetable: any = [];
    isLoadingResults: boolean = true;
    isRateLimitReached: boolean = false;
    onPageLoad: boolean = false;
    resetHierarchy: boolean = false;
    resetFix: boolean = false;
    resetCustom: boolean = false;
    columns: any = [];
    dataSource: any = [];
    columndefs: any = [];
    request: any = [];
    checkedList = [];
    clonefilter = [];
    searchFilter: any = [];
    totalRows: number = 0;
    url: string = '';
    deleteUrl: string = '';
    dropdowntypeid: number = 0;
    loginId: number = 0;
    title: string = '';
    link: string = '';
    bypass: boolean = false;
    status: boolean = false;
    dropdownFix = new DropdownRequest();
    dropdownRequest = new DropdownRequest();
    dropdownDynamic = new DropdownRequest();
    optionStored = [];
    resultHierarchy = new SearchHierarchy();
    detailview = '';
    pipe = new DatePipe('en-US');
    prevModule = ""
    successMessage = Object.assign({}, SuccessMessage);
    failedMessage = Object.assign({}, FailedMessage);
    savedMessage = Object.assign({}, SaveMessage);
    descriptionVal: any
    filingdownloadid: any
    crypid: any = []
    copyrows: any
    boolVal: boolean = true; // if true description else id
    late: boolean = false
    showhidemangmentfiling : boolean = false
    showhidemangmentpre : boolean = false
    edcshowhide : boolean = false
    loadtable : boolean = false
   screenWidth: number;

   licenseKey: string = '';
   user={
       user_id: sessionStorage.getItem('ln')
   }

   environment={
       env_name: sessionStorage.getItem('cc'),
       user_id: sessionStorage.getItem('ln'),
       series: sessionStorage.getItem('sc'),
       login_id: sessionStorage.getItem('u'),
       authorization: sessionStorage.getItem('token'),
   }

   dynamicColumns = []
   payrollCode: any
   payoutDate: any
   payoutType: any
   cutOffId: any
   cutOffStart: any
   cutOffEnd: any
   caseId: any
   prevModuleId: any

    //   defaultTag = [{id:[],type:-1},{id:[],type:-2},{id:[],type:-4}]
    constructor(
        private route: ActivatedRoute,
        private coreService: CoreService,
        private router: Router,
        private message: FuseConfirmationService,
        private masterService: MasterService,
        private tenantService: TenantService,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef,
        private renderer: Renderer2,
        private attendanceService: AttendanceService,
        private filingService : FilingService,
        private storageServiceService : StorageServiceService,
        private translocoService: TranslocoService,
        private cdRef: ChangeDetectorRef,
        private fileService: FileService,
        private payrollService: PayrollService,
        private core : CoreService

   ) {
        this.request = new TableRequest();
        this.request.Length = 20;
        route.params.subscribe((val) => {
            this.onPageLoad = false;
            this.columns = [];
            this.dataSource = [];
            this.columndefs = [];
            this.table = [];
            this.request.Start = 0;
            this.request.SearchColumn = [];
            myData.id = val.id;
            if (!myData.bypass) {
                this.initialize(val.id);
                myData.backSave = false;
            }
            // if(val instanceof NavigationEnd){
            //     myData.bypass = false
            // }
        });

        this.screenWidth = window.innerWidth;
    }

    ngDoCheck() {
        this.table.filter.forEach(filterItem => {
            // Use `originalLabel` to store the translation key or original value
            if (!filterItem.originalLabel) {
                filterItem.originalLabel = filterItem.label;
            }
            // Translate dynamically from `originalLabel`
            filterItem.label = this.translocoService.translate(GF.IsEmptyReturn(filterItem.originalLabel, ''));
        });

        let duplicatedata = JSON.parse(this.copyrows);

        duplicatedata.forEach((item,i) => {
            this.table.rows[i].title = this.translocoService.translate(item.title);
        });


    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('path' in changes) {
            myData.id = changes.path.currentValue;
            this.initialize(changes.path.currentValue);
        }
    }



    async ngOnInit() {
        this.translocoService.langChanges$.subscribe(() => {
            this.updateTableLabels();
            this.translatetitle();

        });
        // this.table.filter.forEach((datalabel,jj) => {
        //     this.table.filter[jj].label = this.translocoService.translate(GF.IsEmptyReturn(datalabel.label,''));
        //     this.cdRef.detectChanges();
        // });
        sessionStorage.setItem('action', '');
        this.showhidemangmentfiling = sessionStorage.getItem('moduleId') == '81' ? true
        : sessionStorage.getItem('moduleId') == '160' ? true
        : sessionStorage.getItem('moduleId') == '68' ? true
        : false

        this.showhidemangmentpre = sessionStorage.getItem('moduleId') == '99' ? true
        : sessionStorage.getItem('moduleId') == '159' ? true : false

        this.edcshowhide =  sessionStorage.getItem('moduleId') == '141' ? true : sessionStorage.getItem('moduleId') == '142' ? true : false


        var id = [sessionStorage.getItem("u")]
        // this.coreService.encrypt_decrypt(false, id)
        //     .subscribe({
        //         next: (value: any) => {
        //             this.loginId = Number(value.payload[0])
        //         },
        //         error: (e) => {
        //             console.error(e)
        //         },
        //         complete: () => {
        //         }
        // });

        let target = await this.encryptDecrypt(false,[sessionStorage.getItem('u')]);
        this.loginId = Number(target.payload[0])

        this.renderer.listen('window', 'resize', (event) => {
            this.screenWidth = window.innerWidth;
        });

        // Initail Call Attendance
        this.attendanceService.attendanceLogsProcess().subscribe()
        this.attendanceService.resendLogs().subscribe()
    }

    get currentModule() {
        var filinglist =  GF.IsEqual(sessionStorage.getItem('moduleId'),['142']) //sessionStorage.getItem('moduleId') == '41' ? true : false;
        if (!GF.IsEqual(this.prevModule,[sessionStorage.getItem('moduleId')])) {
            this.prevModule = sessionStorage.getItem('moduleId')

            // Re-load columns
            this.columndefs = [];
            this.resetCustom = true;
            if (!GF.IsEmpty(myData?.id)) {
                this.initialize(myData.id);
            }
        }
        return filinglist;
    }

    modulechecking(module, e){
        return  GF.IsEmpty(module) ? true : module.some(x => x == Number(this.prevModule))
    }

    initialize(val) {
        this.loadtable = false

        this.table = Datatable.filter((x) => x.type == val)[0];
        this.copyrows = JSON.stringify(this.table.rows);
        this.resultHierarchy.Search = []
        this.table.filter.forEach((val) => {
            val.value =
                  val.type == 'input'       ? ''
                : val.type == 'select'      ? null
                : val.type == 'date'        ? ''
                : val.type == 'select-fix'  ? val.value
                : null;
        });
        this.clonetable = Object.assign(
            {},
            Datatable.filter((x) => x.type == val)[0]
        );
        if (this.hideFilter) {
            if (this.tagType.length > 0) {
                this.clonetable.filter.find(
                    (x) => x.type === 'e-hierarchy'
                ).tagType = this.tagType;
            }
            if (this.hideDropdown) {
                var a = this.clonetable.filter.filter(
                    (item) => !this.hideDropdown.includes(item.id)
                );
                this.clonetable.filter = a;
            }
            this.clonetable.btn_create = this.create_btn;
            this.clonetable.btn_delete = this.delete_btn;
            this.clonetable.btn_download = this.download_btn;
            this.clonetable.btn_export = this.export_btn;
            this.clonetable.btn_search = this.search_btn;
            this.clonetable.btn_upload = this.upload_btn;
            this.clonetable.btn_csv = this.csv_btn;
            this.table = this.clonetable;
        }

        if (this.table === undefined) {
            this.table = Datatable.filter((x) => x.type == 'default')[0];
            this.router.navigate(['/example']);
            return;
        }
        this.onPageLoad = true;
        this.title = this.table.title.replace('-', ' ');

        this.columns = this.table.rows;
        this.columndefs.push('action');
        if (this.table.rows.find((x) => x.hide === true)) {
            this.hideColumns();
        }
        // Get columns base on moduleId || no restriction
        this.columns.map((element) => {
            var filinfids = sessionStorage.getItem('moduleId')=='81'? Number(sessionStorage.getItem("filingIds")) : Number(sessionStorage.getItem("moduleId"))
            if (GF.IsEmpty(element?.moduleId) || element.moduleId.includes(filinfids))  {
               this.columndefs.push(element.column);
            }
        });

        if (this.table.hasProcess) {
            this.columndefs.push('isProcess');
        }
        this.url = this.table.api.uri;
        if (this.table.btn_delete === true) {
            this.deleteUrl = this.table.api_delete.uri;
        }

        this.table.tkGeneration =
            this.table.tkGeneration == undefined
                ? false
                : this.table.tkGeneration;

        this.initData();
    }

    initData(): void {
        // this.request.OrderBy = 'ASC'

        var result = GF.IsEmptyReturn(this.table.rows.find((x) => x.defaultSort), null);
        if (result) {
            this.request.Order = result.column;
            this.request.OrderBy = GF.IsEmptyReturn(result?.orderBy,"ASC");
            this.loadData(true);
            this.setDropownData();
            return;
        }
        // this.request.Order = this.table.rows.filter(
        //     (x) => x.defaultSort == true
        // )[0].column;
        // if (!result) {
        //     this.request.OrderBy = this.table.rows.filter(
        //         (x) => x.defaultSort == true
        //     )[0].orderBy;
        //     this.loadData(true);
        //     this.setDropownData();
        //     return;
        // }


        // if (GF.IsEqual(sessionStorage.getItem('moduleId'), ["83", "40"])) {
        //     if (!GF.IsEqual(this.prevModule, [sessionStorage.getItem('moduleId')])) {
        //         this.prevModule = sessionStorage.getItem('moduleId')
        //         this.request.OrderBy = 'DESC';
        //     }
        // }else{
        //     // this.prevModule = ""
        // }

        // this.loadData(true);
        // this.setDropownData();
    }

    async loadData(load) {
        if (this.url == '') {
            return;
        }
        this.totalRows = 0;
        this.dataSource = [];
        await this.setParams();
        this.isLoadingResults = true;
        this.coreService.getTableData(this.url, this.request).subscribe(
            (data) => {
                if (data.statusCode == 200) {
                    this.totalRows = data.payload.totalRows;
                    this.loadtable = true

                    this.dataSource = data.payload.data;

                    if (sessionStorage.getItem('moduleId') == '99' || sessionStorage.getItem('moduleId') == '159'){
                        this.dataSource = this.dataSource.map(x=> ({
                            ...x,
                            isDuration : x.isDuration == true ? 'Duration' : 'Range',
                        }))

                    }else{
                        this.dataSource = data.payload.data;
                    }

                    this.dataSource.paginator = this.paginator;
                    this.matTable?.renderRows();
                    this.isLoadingResults = false;
                    this.resetFix = false;
                    this.resetCustom = false;
                    this.resetHierarchy = false;
                } else {
                    console.log(data.stackTrace);
                    console.log(data.message);
                    this.isLoadingResults = false;
                }
            },
            (error: HttpErrorResponse) => {
                console.log(error.error);
                this.isLoadingResults = false;
            }
        );
    }

    handlePageEvent(e): void {
        this.request.Start = e.pageIndex;
        this.request.Length = e.pageSize;
        this.loadData(false);
    }

    handleSortEvent(e): void {
        this.paginator.pageIndex = 0;
        this.request.Start = 0;
        this.request.Order = e.active;
        this.request.OrderBy = e.direction;
        this.loadData(false);
    }

    handleClickEvent(a, e): void {
        if (this.table.type == 'employee-schedule') {
            this.router.navigate([
                this.table.link.uri,
                e.encryptId,
                e.processType,
            ]);
        } else if (
            this.table.type == 'payroll-run-view' ||
            this.table.type == 'payroll-uploads'
        ) {
            this.router.navigate([this.table.link.uri, e.payrollCode]);
        } else {
            var forfiling =  sessionStorage.getItem('moduleId') == '81' ? true : sessionStorage.getItem('moduleId') == '68' ? true : sessionStorage.getItem('moduleId') == '160' ? true : false
            var forstatutory = sessionStorage.getItem('moduleId') == '88' ? true : false
            sessionStorage.setItem('action', a);

            sessionStorage.setItem('adds', forfiling ? this.table.filter[0].value : forstatutory ? e.type : e[this.table.link.adds]);
            // sessionStorage.setItem('filingId', e[this.table.filter[0].value]);
           this.router.navigate([this.table.link.uri, e.encryptId]);
        }
    }

    handleCreateEvent(): void {
        sessionStorage.setItem('adds', '');
        this.router.navigate([this.table.link.uri]);
    }

    handleExportEvent(): void {
        this.isLoadingResults = true;
        const prevLength = this.request.Length;
        this.request.Length = 0;
        this.coreService.getTableData(this.url, this.request).subscribe(
            (data) => {
                this.request.Length = prevLength;
                for (let key in data.payload.data) {
                    this.table.excludeExport.forEach((del) => {
                        var a = del;
                        delete data.payload.data[key][del];
                    });
                }
                this.coreService.exportToExcel(
                    data.payload.data,
                    this.route.snapshot.paramMap.get('id')
                );
                this.isLoadingResults = false;
            },
            (error: HttpErrorResponse) => {
                console.log(error.error);
            }
        );
    }

    handleInputEvent(e): void {
        if (e.target.value == '') {
            this.loadData(false);
        }
        return;

        // this.loadData()
    }

    handleDeleteEvent() {
        if (!this.columndefs.includes('checkbox')) {
            this.columndefs.unshift('checkbox');
            return;
        } else {
            if (this.checkedList.length === 0) {
                if (this.columndefs.includes('checkbox')) {
                    if (this.columndefs[0] === 'checkbox') {
                        this.columndefs.shift();
                    }
                    return;
                }
            }
        }

        if (
            this.checkedList.length > 0 &&
            this.dataSource.some((x) => x.checked)
        ) {
            var uploadid = this.dataSource
                .filter((x) => x.checked)
                .map((x) => x.id);
            var codeConfirmation = this.table.rows.filter(
                (x) => x.defaultSort == true
            )[0].title;
            var key = this.table.rows.filter((x) => x.defaultSort == true)[0]
                .column;
            var codeID = this.dataSource
                .filter((x) => x.checked)
                .map((x) => (x.hasOwnProperty(key) ? x[key] : null));
            this.savedMessage.message =
                translate('Are you sure you want to delete') +
                codeConfirmation +
                ' ' +
                codeID;
            const dialogRef = this.message.open(this.savedMessage);
            dialogRef.afterClosed().subscribe((result) => {
                if (result === 'confirmed') {
                    this.coreService
                        .postDeleteData(this.deleteUrl, uploadid)
                        .subscribe(
                            (data) => {
                                if (data.statusCode == 200) {

                                    SuccessMessage.message = this.translocoService.translate(SuccessMessage.message)

                                    this.successMessage.message =
                                       translate('File has been deleted');
                                    this.successMessage.title = translate('Successful!');
                                    this.message.open(this.successMessage);
                                    this.loadData(true);
                                    if ((this.checkedList = [])) {
                                        var index =
                                            this.columndefs.indexOf('checkbox');
                                        if (index !== -1) {
                                            this.columndefs.splice(index, 1);
                                        }
                                    }
                                } else {
                                    this.failedMessage.message = data.message;
                                    this.failedMessage.title = translate('Failed!');
                                    this.message.open(this.failedMessage);
                                }
                            },
                            (error: HttpErrorResponse) => {
                                console.log(error.error);
                            }
                        );
                }
            });
        }
    }

    check(i, e) {
        var idx = this.checkedList.findIndex((x) => x == i);
        console.log(idx);
        if (idx > -1) {
            this.checkedList.splice(idx, 1);
        } else {
            this.checkedList.push(i);
        }
    }

    test(e) {
        console.log(this.table.filter);
        console.log(e);
    }

    async pushKeys(key: string, value: string, type: number) {
        var mangment = sessionStorage.getItem('moduleId')=='99' || sessionStorage.getItem('moduleId')=='159'// for pre-apporved
        var payroll =  sessionStorage.getItem('moduleId')=='88' // for payroll statutory

        this.request.SearchColumn.push({ key: key, value: value, type: payroll ? 2 : type })
        if (sessionStorage.getItem('moduleId')=='81') { // For filing use only
        this.request.SearchColumn.push({ key: 'employeeId', value: this.loginId+'', type: 2 })
        this.request.SearchColumn = _.uniqBy([...this.request.SearchColumn], JSON.stringify);
        }else if(mangment){ // for pre-approved
            var valueid = sessionStorage.getItem('moduleId')=='99' ? '99' : '159'
            this.request.SearchColumn.push({ key: 'moduleId', value: valueid, type: 2 })
        }
   }

    async setParams() {
        this.request.SearchColumn = [];
        const filterItems = this.table.filter.filter((item) => !GF.IsEmpty(item.value)) //&& item.type !== "e-hierarchy"
        const hasTagType = this.table.filter.find((item) => item.type == "e-hierarchy")// && item.moduleId.includes(Number(sessionStorage.getItem('moduleId'))))
        hasTagType ? filterItems.push(hasTagType) : null
        for (const ee of filterItems) {
            if (ee.multiselect) {
                if (ee.type == 'e-hierarchy' && this.resultHierarchy.Search.length > 0) {
                    if (GF.IsEqual(sessionStorage.getItem('moduleId'),['142','209'])) {
                        // this.request.SearchColumn = this.request.SearchColumn.filter((item) => item.key !== "moduleId")
                        // await this.pushKeys("moduleId", sessionStorage.getItem('moduleId'), 2);
                        this.resultHierarchy.Search.forEach(async (element) => {
                            if (Array.isArray(element.Value)) {
                                element.Value.forEach(async (val) => {
                                    await this.pushKeys(element.Key, val + '', element.Type);
                                });
                            } else {
                                await this.pushKeys(element.Key, element.Value + '', element.Type);
                            }
                        });
                    } else {
                        this.resultHierarchy.Search.filter((x) => x.Key == 'EmployeeID').forEach(async (element) => {
                            if (Array.isArray(element.Value)) {
                                element.Value.forEach(async (val) => {
                                    await this.pushKeys("employeeId", val + '', element.Type);
                                });
                            } else {
                                await this.pushKeys(element.Key, element.Value + '', element.Type);
                            }
                        });
                    }
                } else {
                    this.request.SearchColumn = this.request.SearchColumn.filter((item) => item.key !== ee.id);
                    // if (GF.IsEqual(sessionStorage.getItem('moduleId'),['142','209'])) {
                    //     this.request.SearchColumn = this.request.SearchColumn.filter((item) => item.key !== "moduleId")
                    //     await this.pushKeys("moduleId", sessionStorage.getItem('moduleId'), 2);

                    //     var decryp = await firstValueFrom(this.coreService.encrypt_decrypt(false, [sessionStorage.getItem('u')]))
                    //     await this.pushKeys('EmployeeID', decryp.payload[0], 2);
                    // }

                    let ty = 0;
                    if (ee.type == 'select' || ee.type == 'select-fix' || ee.type == 'custom') {
                        ty = 2;
                    }

                    ee.value?.forEach(async (v) => {
                        await this.pushKeys(ee.id, '' + v, (GF.IsEqual(sessionStorage.getItem('moduleId'),['141','142','209']) ? 9 : ty ));
                    });
                }
            } else if (ee.type.toLowerCase() == 'date') {
                // 5 = Date To , 4 = Date From
                var ty = (ee.id == 'dateTo') ? 5 : 4;

                // this.request.SearchColumn = this.request.SearchColumn.filter((item) => item.key !== ee.id);
                await this.pushKeys(ee.id, this.pipe.transform(ee.value, 'yyyy-MM-dd'), ty);

            } else {
                var ty = 0;
                if (ee.type == 'select' || ee.type == 'select-fix' || ee.type == 'custom') {
                    ty = 1;
                }
                if (ee.value !== null) {
                    this.request.SearchColumn = this.request.SearchColumn.filter((item) => item.key !== ee.id);
                    await this.pushKeys(ee.id, '' + ee.value, ty);
                }
            }
        }
    }

    setDropownData() {
        this.setDDParameters();

        forkJoin({
            dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
            dropdownDynamic: this.tenantService.getDropdown(
                this.dropdownRequest
            ),
        }).subscribe({
            next: (value: any) => {
                this.optionStored = [
                    ...value.dropdownFix.payload,
                    ...value.dropdownDynamic.payload,
                ];
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => {
                this.table.filter.map((element, i) => {
                    element.options = this.loadDropdown(
                        element.options,
                        element.type,
                        element.dropdownType
                    );
                });
            },
        });
    }

    setDDParameters() {
        this.table.filter
            .filter((item) => item.type == 'select-fix')
            .map((element, i) => {
                if (element.dropdownType.type == 'fix') {
                    this.dropdownFix.id.push({
                        dropdownID: element.dropdownType.uri === 3 ? 3 : 0,
                        dropdownTypeID: element.dropdownType.uri,
                    });
                } else {
                    this.dropdownRequest.id.push({
                        dropdownID: 0,
                        dropdownTypeID: element?.dropdownType?.uri || 0,
                    });
                }
            });
    }

    loadDropdown(val, type, dd) {
        var out: any;
        if (type == 'select-fix') {
            if (dd.type == 'fix') {
                out = this.optionStored.filter(
                    (item) => item.dropdownTypeID == dd.uri
                );
            } else {
                out = val;
            }
        } else {
            out = val;
        }
        return out;
    }

    _min(filter) {

        var isDate = this.table.filter.some((x) => x.type == 'date');
        if (isDate) {
            var df = this.table.filter.find( (x) => x.type == 'date' && x.originalLabel.toLowerCase().includes('from')).value;
            var dt = this.table.filter.find( (x) => x.type == 'date' && x.originalLabel.toLowerCase().includes('to') ).value;
            var ss = '';
            if (dt !== '' && filter.id == 'dateFrom') {
                var dfs = new Date(df)
                var dts = new Date(dt)
                if (dfs > dts) {
                    this.table.filter.find( (x) => x.type == 'date' && x.id.toLowerCase().includes('to')).value = df;
                }
            } else {
                if (filter.id == 'dateTo') {
                    return new Date(df);
                }
            }
        }
    }

    handleTKEvent(type, element) {
        var obj = {
            type: type,
            exportType: type == 'adjustment' ? 2 :  type == 'initailadjustment' ? 2 : 1,
            props: element,
            buttonclose: true,
        };
        if (
            type == 'view' ||
            type == 'reGenerate' ||
            type == 'adjustment' ||
            type == 'viewAdjustment' ||
            type == 'initailadjustment'
        ) {
            this.dialogRef = this.dialog.open(GenerateDetailedComponent, {
                width: '80%',
                height: '80%',
                panelClass: 'app-dialog',
                data: obj,
            });
        }
        // if (type == 'viewAdjustment' || type == 'adjustment') {
        //     this.dialogRefSum = this.dialog.open(SummaryGenerateComponent, {
        //         width: '100%',
        //         height: '80%',
        //         panelClass: 'app-dialog',
        //         data: obj,
        //     });
        // }
    }

    handleUploadEvent(e) {
        this.router.navigate(['detail/upload']);
    }

    isNumber(col, e) {
        if (e !== null) {
            if (isNaN(e)) {
                return col[e] === null || col[e] === undefined
                    ? []
                    : Array.isArray(col[e])
                    ? col[e]
                    : [col[e]];
            }
        }
    }

    top() {

        var btn_count = 0
        btn_count += Number(this.table.btn_search)
        btn_count += Number(this.table.btn_reload)
        btn_count += Number(this.table.btn_create)
        btn_count += Number(this.table.btn_export)
        btn_count += Number(this.table.btn_upload)
        btn_count += Number(this.table.btn_download)
        btn_count += Number(this.table.btn_delete)
        var top = '';
        var tagType = this.table.filter.filter((x) => x.type == 'e-hierarchy');
        tagType = tagType.length == 0 ? [] : tagType[0].tagType;
        if (this.table.filter.length + tagType.length > 7) {
            top =
                this.screenWidth < 1845 && this.screenWidth > 957
                    ? '110px'
                    : this.screenWidth < 957
                    ? '180px'
                    : '100px';
        }else if(this.table.filter.length + tagType.length <= 7){
            this.screenWidth < 1845 && this.screenWidth > 957 ? top = '15%' : top = '90px'
        }
         else {
            top = '80px';
       }
        return top;
    }

    hideColumns() {
        // Filter out columns with hide === true
        this.columns = this.columns.filter((column) => !column.hide);
    }

    refresh() {
        this.request.SearchColumn = [];
        this.resultHierarchy.Search = [];
        this.resetFix = true;
        this.resetCustom = true;
        this.resetHierarchy = true;
        var date = this.table.filter.filter((x) => x.type === 'date');
        var select = this.table.filter.filter((x) => x.type === 'select');
        for (const item of date) {
            item.value = '';
        }
        for (const item of select) {
            item.value = '';
        }
        this.loadData(true);
    }

    filingID(e){

        this.filingdownloadid = e
        sessionStorage.setItem('filingIds',e)
    }

    cancel(e): void {


    }

    handleClicdownload(id, empid, trasnid, filename) {
        if (this.filingdownloadid == 52 && filename.status == 'Approved') {
            this.coreService.directDownloadBoldRTemplate("COE v2", '', "pdf", "{'EncryptedCOEID':['" + id + "']}", null, false, "")
        } else {
            this.storageServiceService.fileDownload(filename.uploadPath, trasnid, this.filingdownloadid).subscribe({
                next: (value: any) => {
                    const base64 = value.payload.fileContents
                    const contentType = value.payload.fileContents || 'application/octet-stream';
                    // convert base64 to blob
                    // const blob = this.base64ToBlob(base64, contentType);
                    const blob = this.coreService.base64ToBlob(base64, contentType);

                    this.coreService.downloadExcelBlob(blob, filename.uploadPath)
                },
                error: (e) => {
                }
            });
        }
    }

    shouldDisplayElement(status: string): boolean {
        if (GF.IsEmpty(status)) {

        }else{
            if (status !== 'Cancelled' && !status.split(',').includes('Disapproved')) {
                return true;
              }
               return false;
        }
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

    translatetitle(){

        let duplicatedata = JSON.parse(this.copyrows);

        duplicatedata.forEach((item,i) => {
            this.table.rows[i].title = this.translocoService.translate(item.title);
        });
    }

    checkStatus(e) {
        if (GF.IsEqual(sessionStorage.getItem('moduleId'), ['81','68','160','141','142'])) {
            return e.status == 'First Level Approval';
        }
        return true;
    }

    getObjects(e,ff) {
        var obj = e[0];
        obj['key'] = GF.IsEmptyReturn(ff?.key,ff?.id)
        this.crypid.push(obj);
    }

    async handleCancelEvent(e) {

        this.dataSource.splice(e, 1);
        var moduleid = ''
        this.coreService.encrypt_decrypt(true, [sessionStorage.getItem('moduleId')])
            .subscribe({
                next: (value: any) => {
                    moduleid = value.payload[0]

                    if (GF.IsEqual(sessionStorage.getItem('moduleId'), ['141', '142', '209'])) {
                        this.savedMessage.message = translate('Are you sure you want to cancel?')
                        var dialogRef = this.message.open(this.savedMessage);
                        dialogRef.afterClosed().subscribe((result) => {

                            if (result == "confirmed") {
                                this.filingService.postCancelFiling(moduleid, e.encryptId, this.late).subscribe({

                                    next: (value: any) => {
                                        this.coreService.valid(value, this.late, 1, false, "", "cancellation").then((res) => {
                                            if (res.saveNow) {
                                                this.late = res.lateSave
                                                this.handleCancelEvent(e)
                                                return
                                            }
                                        })
                                    },
                                });
                            }
                        }
                        );
                    }else if (GF.IsEqual(sessionStorage.getItem('moduleId'), ['81','68','160','99','159'])) {
                        var mid = sessionStorage.getItem('moduleId') =='99' ? "2NW9BIGRy4HSEQl7q73gRA%3d%3d" : sessionStorage.getItem('moduleId') =='159' ? "EH3EnIhY1Ouju4pbNQ3Nig%3d%3d"
                        : this.crypid.find(x=>x.key == "moduleId").encryptID 
                        var dialogRef = this.message.open(SaveMessage);

                        dialogRef.afterClosed().subscribe((result) => {

                            if (result == "confirmed") {
                                var type = this.filingdownloadid
                                // var uri = type === 32 ? "postCancelFiling" : type === 33 ? "postCancelFiling" : type === 34 ? "postCancelFiling": type === 35 ? "postCancelFiling":type === 36 ? "postCancelFiling":type === 37 ? "postCancelFiling":type === 52 ? "postCancelFiling":type === 64 ? "postCancelFiling": ""
                                this.filingService.postCancelFiling(mid, e.encryptId, this.late).subscribe({

                                    next: (value: any) => {
                                        this.coreService.valid(value, this.late, 1, false, "", "cancellation").then((res) => {
                                            if (res.saveNow) {
                                                this.late = res.lateSave
                                                this.handleCancelEvent(e)
                                                return
                                            }

                                            if (res.reset) {
                                                this.late = false
                                                this.loadData(true)
                                            }
                                        })
                                    },
                                    error: (e) => {
                                        this.message.open(FailedMessage);
                                        console.error(e)
                                    }
                                });
                            }
                        }
                        );
                    }
                },
                error: (e) => {
                    console.error(e)
                },
                complete: () => {
                }
            });


    }



    imported(result: boolean, data: any) {
        if (result) {
            this.successMessage.title = data.row_success + " rows uploaded";
            this.successMessage.message = "Sheet uploaded and data saved successfully";
            this.message.open(this.successMessage);
        } else {
            this.failedMessage.message = "There was some problem uploading the sheet";
            this.message.open(this.failedMessage);
        }
    }

    onRowSelect(selectedRow: any) {
        if (sessionStorage.moduleId == 26) {
            if (selectedRow?.payrollCode) {
                this.payrollCode = selectedRow.payrollCode;
                sessionStorage.setItem("payrollCode", this.payrollCode);
            }
            if (selectedRow?.payoutDate) {
                this.payoutDate = selectedRow.payoutDate;
                sessionStorage.setItem("payoutDate", this.payoutDate);
            }
            if (selectedRow?.payoutType) {
                this.payoutType = selectedRow.payoutType;
                sessionStorage.setItem("payoutType", this.payoutType);
            }
            if (selectedRow?.cutOffId) {
                this.cutOffId = selectedRow.cutOffId;
                sessionStorage.setItem("cutOffId", this.cutOffId);
            }
            if (selectedRow?.cutOffStart) {
                this.cutOffStart = selectedRow.cutOffStart;
                sessionStorage.setItem("cutOffStart", this.cutOffStart);
            }
            if (selectedRow?.cutOffEnd) {
                this.cutOffEnd = selectedRow.cutOffEnd;
                sessionStorage.setItem("cutOffEnd", this.cutOffEnd);
            }

            this.setDynamicColumns();
        }
    }



    setDynamicColumns() {
        this.fileService.getDynamicHeaders(this.caseId).subscribe({
            next: (response: any) => {
                if (Array.isArray(response)) {
                    this.dynamicColumns = response.map((col: any) => {

                        return {
                            column_name: col.column_name,
                            display_label: col.display_label,
                            type: col.type,
                            info_hint: col.info_hint,
                            matching_keywords: col.matching_keywords,
                            validators: col.validators,
                            default_value:
                                this.caseId === 1 ?
                                    col.column_name === "1¦PayrollCode¦PayrollCode¦1" ? this.payrollCode :
                                    col.column_name === "1¦PayoutDate¦PayoutDate¦1" ? this.payoutDate :
                                    col.column_name === "1¦PayoutTypeID¦PayoutTypeID¦1" ? this.payoutType :
                                    col.column_name === "1¦CutOffId¦CutOffId¦1" ? this.cutOffId :
                                    col.column_name === "1¦CutoffStart¦CutoffStart¦1" ? this.cutOffStart :
                                    col.column_name === "1¦CutoffEnd¦CutoffEnd¦1" ? this.cutOffEnd :
                                    col.default_value :
                                this.caseId === 3 ?
                                    col.column_name === "Payroll_Payroll Code" ? this.payrollCode :
                                    col.column_name === "Payroll_Payout Date" ? this.payoutDate :
                                    col.column_name === "Payroll_Payout Type" ? this.payoutType :
                                    col.column_name === "Payroll_Cutoff Id" ? this.cutOffId :
                                    col.column_name === "Payroll_Cutoff Start" ? this.cutOffStart :
                                    col.column_name === "Payroll_Cutoff End" ? this.cutOffEnd :
                                    col.default_value :
                                col.default_value,
                            position: col.position,
                            required: col.required
                        };
                    });

                } else {
                    console.error("Unexpected response format:", response);
                }
            },
            error: (e) => {
                this.message.open(this.failedMessage);
                console.error("API Error:", e);
            }
        });
    }

    handleClearPayrollUpload(code) {

        this.savedMessage.message = "Are you sure you want to Clear Payroll Code: " + code + "?";
        const dialogRef = this.message.open(this.savedMessage);

        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.payrollService.clearPayrollUpload(this.payrollCode).subscribe({

                    next: (value) => {
                        if (value.statusCode == 200) {
                            this.successMessage.message = value.message;
                            this.message.open(this.successMessage);
                        } else {
                            this.failedMessage.message = "Failed to clear payroll upload. Please try again.";
                            this.message.open(this.failedMessage);
                        }
                    }
                });
            }
        })
    }

    ngAfterViewChecked() {
        if (sessionStorage.moduleId && sessionStorage.moduleId !== this.prevModuleId) {
            this.updateModuleData();
            this.prevModuleId = sessionStorage.moduleId;
        }
    }

    updateModuleData() {
        const moduleData = csvSheet.find(sheet => sheet.moduleId === sessionStorage.moduleId);
        if (moduleData) {
            this.licenseKey = moduleData.licenseKey;
            this.caseId = moduleData.caseId;
            this.setDynamicColumns();
            this.cdr.detectChanges();
        }
    }

    private async encryptDecrypt(mode,params: string[]): Promise<any> {
        try {
          const response = await this.core.encrypt_decrypt(mode, params).toPromise();
          return response; // Return the response from the API call
        } catch (error) {
          console.error('Error in encryptDecrypt:', error);
          throw error; // Rethrow the error for proper error handling
        }
      }

}

