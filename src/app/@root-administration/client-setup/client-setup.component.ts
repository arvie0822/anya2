import { Component, OnInit, ViewChild } from '@angular/core';
import { TableRequest } from 'app/model/datatable.model';
import { MasterService } from 'app/services/masterService/master.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FailedMessage, SuccessMessage } from 'app/model/message.constant';
import { CoreService } from 'app/services/coreService/coreService.service';
import { DecimalPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientDetailComponent } from './client-detail/client-detail.component';

@Component({
    selector: 'app-client-setup',
    templateUrl: './client-setup.component.html',
    styleUrls: ['./client-setup.component.css'],
    providers: [DecimalPipe],
                    standalone: true,
                    imports: [
                        CommonModule,

                        ReactiveFormsModule,
                        MatCardModule,
                        MatTableModule,
                        MatPaginatorModule,
                        MatButtonModule,
                        MatIconModule,
                        MatBadgeModule,
                        MatFormFieldModule,
                        MatTooltipModule,
                        ClientDetailComponent,
                  ],
})
export class ClientSetupComponent implements OnInit {
    request = new TableRequest();
    dataSource = [];
    totalRows: number = 0;
    pending: number = 0;
    isCreate: boolean = false;
    displayedColumns: string[] = [
        'companyId',
        'companyCode',
        'companyName',
        'active',
        'seriesCode',
        'dateCreated',
        'prCreated',
    ];
    @ViewChild(ClientDetailComponent) child!: any;
    constructor(
        private service: MasterService,
        private message: FuseConfirmationService,
        private coreService: CoreService
    ) {}

    ngOnInit() {
        this.request.Order = 'CompanyId';
        this.request.OrderBy = 'DESC';
        this.handleSearch();
    }

    handlePageEvent(e): void {
        this.request.Start = e.pageIndex;
        this.request.Length = e.pageSize;
        this.handleSearch();
    }

    handleSearch() {
        this.service.getClientList(this.request).subscribe({
            next: (value: any) => {
                console.log(value);
                this.dataSource = value.payload.data.data;
                this.totalRows = value.payload.data.totalRows;
                this.pending = value.payload.pendingPR;
                // this.options = value.payload.map((x) => ({
                //     companyId: x.companyId,
                //     companyName: x.companyName,
                //     seriesCode: x.seriesCode,
                // }));
                // this.defaultOptions = this.options;
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => {
                // this.filteredOptions = this.myControl.valueChanges.pipe(
                //     startWith(''),
                //     map((value) => this._filter(value || ''))
                // );
            },
        });
    }

    handleUpdate(companyId, active) {
        var obj = {
            apiKeys: '',
            companyId: companyId,
            companyCode: '',
            companyName: '',
            companyLogo: '',
            seriesCode: '',
            createdBy: 0,
            dateCreated: new Date(),
            active: active,
            isEmail: true,
            telephone: '',
            emailAddress: '',
            isPwExpires: false,
            daysPwExpires: 0,
            restrictPreviousPw: false,
            daysRemindPwExpires: 0,
        };
        this.service.postClient(obj).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.message.open(SuccessMessage);
                    this.handleSearch();
                } else {
                    FailedMessage.message = value.message;
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

    submit() {
        this.child.submit();
    }

    download() {
        this.service.downloadClientList().subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.coreService.downloadJsonFile(
                        'company.json',
                        value.payload
                    );
                } else {
                    FailedMessage.message = value.message;
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
}
