import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewChild,
    Input,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/services/coreService/coreService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TimekeepingService } from 'app/services/timekeepingService/timekeeping.service';
import { TableRequest } from 'app/model/datatable.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {
    FailedMessage,
    SaveMessage,
    SuccessMessage,
} from 'app/model/message.constant';
import { FileService } from 'app/services/fileService/file.service';
import moment from 'moment';
import { GF } from 'app/shared/global-functions';
import { fuseAnimations } from '@fuse/animations';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-generate-detailed',
    templateUrl: './generate-detailed.component.html',
    styleUrls: ['./generate-detailed.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MatCardModule,
        CardTitleComponent,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatDialogModule,

      ],
})
export class GenerateDetailedComponent implements OnInit {
    isLoadingResults: boolean = true;
    totalRows: number = 0;

    url: string = '';
    table: any = [];
    displayedColumns: string[] = [
        'employeeCode',
        'displayName',
        'subCompany',
        'branch',
        'date',
        'isRestDay',
        'type',
        'scheduleTimeIn',
        'scheduleTimeOut',
        'displayTimeIn',
        'displayTimeOut',
        'regularHours',
        'late',
        'undertime',
        'isAbsent',
        'isHalfday',
        'lwopHour',
        'ptoHour',
        'vlHour',
        'slHour',
        'otherlHour',
        'regularHoursND',
        'ot',
        // 'oT8',
        'otnd',
        // 'otnD8',
        'lh',
        'lhot',
        'lhotnd',
        'lhoT8',
        'lhotnD8',
        'lhrd',
        'lhrdotnd',
        'lhrdoT8',
        'lhrdotnD8',
        'sh',
        'shot',
        'shotnd',
        'shoT8',
        'shotnD8',
        'shrd',
        'shrdotnd',
        'shrdoT8',
        'shrdotnD8',
        'otrd',
        'otrdnd',
        'otrD8',
        'otrdnD8',
        'dh',
        'dhot',
        'dhotnd',
        'dhoT8',
        'dhotnD8',
        'dhrd',
        'dhrdotnd',
        'dhrdoT8',
        'dhrdotnD8',
        'remarks',
    ];
    dataSource = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    loading: boolean = true;
    @Input() data: any;
    @Input() closebutton: any;
    request = new TableRequest();
    isSave: boolean = false;
    showclose: boolean = false;
    constructor(
        private router: Router,
        private coreService: CoreService,
        @Inject(MAT_DIALOG_DATA) public datas: any,
        private timekeepingService: TimekeepingService,
        private cdRef: ChangeDetectorRef,
        private message: FuseConfirmationService,
        private fileService: FileService,
        private _dialog: MatDialog
    ) {}
    ngOnInit() {
        this.showclose =
            this.closebutton != null ? true : this.datas.closebutton;
        this.data = GF.IsEmptyReturn(this.data, this.datas);
    }

    //   ngOnChanges(changes: SimpleChanges){
    //
    //     if ("datas" in changes) {
    //         this.data = this.datas
    //     }

    //   }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.loadData();
        }, 1000);
    }

    handlePageEvent(e): void {
        this.request.Start = e.pageIndex;
        this.request.Length = e.pageSize;
        this.loadData();
    }

    handleSortEvent(e): void {
        this.paginator.pageIndex = 0;
        this.request.Start = 0;
        this.request.Order = e.active;
        this.request.OrderBy = e.direction;
        this.loadData();
    }

    loadData() {
        debugger
        this.isLoadingResults = true;
        if (this.data.type == 'reGenerate') {
            this.reGenerateRegular();
        }
        if (this.data.type == 'view') {
            this.viewTK();
        }
        if (this.data.type == 'generate') {
            this.generate();
        }
        if (this.data.type == 'generate-view') {
            this.generate();
        }
        if (this.data.type == 'initailadjustment') {
            this.generateAdj();
        }
        if (this.data.type == 'adjustment') {
            this.generateAdj();
        }
        this.cdRef.detectChanges(); // Ensure change detection is triggered after loadData
    }

    reGenerateRegular() {
        this.timekeepingService
            .reGenerateTimekeeping({
                timekeepingId: this.data.props.encryptId,
            })
            .subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.data.props.cache = value.payload;
                        this.data.type = 'generate';
                        this.generate();
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

    generate() {
        this.timekeepingService
            .viewGeneratedTimekeeping({
                cache: this.data.props.cache,
                table: this.request,
            })
            .subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.isLoadingResults = false;
                        this.dataSource = value.payload.data;
                        this.totalRows = value.payload.totalRows;
                        this.cdRef.detectChanges(); // Trigger change detection
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

    generateAdj() {
        debugger
        const generateInitialTimekeepingAdjustment = 'generateInitialTimekeepingAdjustment';
        const generateTimekeepingAdjustment = 'generateTimekeepingAdjustment';

        const apiMethodName = this.data.type === 'initailadjustment'
            ? generateInitialTimekeepingAdjustment
            : generateTimekeepingAdjustment;

        const apiMethod = this.timekeepingService[apiMethodName];

          apiMethod.call(this.timekeepingService,{
                timekeepingId: this.data.props.encryptId,
            })
            .subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.timekeepingService
                            .viewGeneratedAdjTimekeeping({
                                cache: this.data.props.encryptId,
                                table: this.request,
                            })
                            .subscribe({
                                next: (value: any) => {
                                    if (value.statusCode == 200) {
                                        this.isLoadingResults = false;
                                        this.dataSource = value.payload.data;
                                        this.totalRows =
                                            value.payload.totalRows;
                                        this.cdRef.detectChanges(); // Trigger change detection
                                    } else {
                                        console.log(value.stackTrace);
                                        console.log(value.message);
                                    }
                                },
                                error: (e) => {
                                    console.error(e);
                                },
                            });
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

    viewTK() {
        this.timekeepingService
            .getTimekeeping({
                encryptId: this.data.props.encryptId,
                table: this.request,
            })
            .subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.isLoadingResults = false;
                        console.log(value.payload.data);
                        this.dataSource = value.payload.data;
                        this.totalRows = value.payload.totalRows;
                        this.cdRef.detectChanges(); // Trigger change detection
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

   handleExportEvent(type): void {
        console.log('update');
        if (
            (this.data.props.encryptId == undefined &&
            this.data.props.encryptId == null) || (this.data.exportType == 1 && this.data.type == 'generate')
        ) {
            this.isLoadingResults = true;
            this.timekeepingService
                .tkExport(this.data.props.cache, type)
                .subscribe({
                    next: (resp: any) => {
                        const contentDisposition = resp.headers.get(
                            'content-disposition'
                        );
                        var filename = contentDisposition
                            .split(';')[1]
                            .split('filename')[1]
                            .split('=')[1]
                            .trim();
                        this.coreService.downloadExcelBlob(resp.body, filename);
                    },
                    error: (e) => {
                        console.error(e);
                    },
                });
        } else {
                this.isLoadingResults = true;
                var view = {
                    encryptId: this.data.props.encryptId,
                    exportType: type,
                    tKType: this.data.exportType,
                };
                this.timekeepingService.tkViewExport(view).subscribe({
                    next: (resp: any) => {
                        const contentDisposition = resp.headers.get(
                            'content-disposition'
                        );
                        var filename = contentDisposition
                            .split(';')[1]
                            .split('filename')[1]
                            .split('=')[1]
                            .trim();
                        this.coreService.downloadExcelBlob(resp.body, filename);
                    },
                    error: (e) => {
                        console.error(e);
                    },
                });
        }
    }

    submit() {
        const dialogRef = this.message.open(SaveMessage);

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                var element = {
                    dateFrom: moment(this.data.props.dateFrom).format(
                        'YYYY-MM-DD'
                    ),
                    dateTo: moment(this.data.props.dateTo).format('YYYY-MM-DD'),
                    subCompany: this.data.props.subCompany,
                    branch: this.data.props.branch,
                    category: this.data.props.category,
                    department: this.data.props.department,
                    confidential: this.data.props.confidential,
                    status: this.data.props.status,
                    employee: this.data.props.employee,
                    includeInactive: this.data.props.includeInactive,
                    cache: this.data.props.cache,
                    timekeepingType: this.data.props.timekeepingType,
                    payrollCutoff: this.data.props.payrollCutoff,
                    year: this.data.props.year,
                    month: this.data.props.month,
                    cutoff: this.data.props.cutoff,
                    timekeepingId: this.data.props.timekeepingId,
                };
                this.timekeepingService.postTimekeeping(element).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.router.navigate([
                                '/search/timekeeping-generation-view',
                            ]);
                            this._dialog.closeAll();
                            setTimeout(() => {
                                this.message.open(SuccessMessage);
                                this.isSave = false;
                            }, 500);
                        } else {
                            this.message.open(FailedMessage);
                            console.log(value.stackTrace);
                            console.log(value.message);
                        }
                    },
                    error: (e) => {
                        this.message.open(FailedMessage);
                        console.error(e);
                    },
                });
            }
        });
    }
}
