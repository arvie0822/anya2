import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MasterService } from 'app/services/masterService/master.service';
import { TableRequest } from 'app/model/datatable.model';
import { UserService } from 'app/services/userService/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { AngularDeviceInformationService } from 'angular-device-information';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/services/authService/auth.service';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router, RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DecimalPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomModule } from 'app/shared/custom.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule } from '@angular/material/core';

@Component({
    selector: 'app-administrative-login',
    templateUrl: './administrative-login.component.html',
    styleUrls: ['./administrative-login.component.css'],
         encapsulation: ViewEncapsulation.None,
          providers: [DecimalPipe],
          standalone: true,
          imports: [
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatDatepickerModule,
            MatSelectModule,
            MatCardModule,
            MatIconModule,
            MatButtonModule,
            MatDividerModule,
            CustomModule,
            TranslocoModule,
            DragDropModule,
            RouterModule,
            MatIconModule,
            MatAutocompleteModule,
            MatTableModule,
            MatPaginatorModule,
            MatTooltipModule,
            MatOptionModule
        ],
})
export class AdministrativeLoginComponent implements OnInit {
    myControl = new FormControl('');
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    options: any[] = [];
    defaultOptions: any[] = [];
    filteredOptions: Observable<any[]>;
    request = new TableRequest();
    totalRows: number = 0;
    selected: any = {
        employeeId: 0,
        displayName: '',
    };
    showAlert: boolean = false;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    private url = environment.reports + 'api/site/master/token';
    displayedColumns: string[] = [
        'select',
        'employeeCode',
        'displayName',
        'subCompanyName',
        'branchName',
        'categoryName',
        'accessName',
        'department',
        'employeeStatus',
    ];
    dataSource = [];
    successMessage = { ...SuccessMessage };
    searchForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private service: MasterService,
        private userService: UserService,
        private message: FuseConfirmationService,
        private deviceInfoService: AngularDeviceInformationService,
        private authService: AuthService,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit() {
        this.searchForm = this.fb.group({
            employeeCode: '',
            firstName: '',
            lastName: '',
        });

        this.service.getAllActiveClients().subscribe({
            next: (value: any) => {
                this.options = value.payload.map((x) => ({
                    companyId: x.companyId,
                    companyName: x.companyName,
                    seriesCode: x.seriesCode,
                }));
                this.defaultOptions = this.options;
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => {
                // this.filteredOptions = this.myControl.valueChanges.pipe(
                //     startWith(''),
                //     map((value) => this._filter(value || ''))
                // );
                this.filteredOptions = this.myControl.valueChanges.pipe(
                    startWith(''),
                    map((value) => this._filter(value || ''))
                );
            },
        });
    }

    private _filter(value: any): any[] {
        const filterValue = value.toLowerCase();
        this.options = this.defaultOptions;
        this.dataSource = [];
        this.selected = {
            employeeId: 0,
            displayName: '',
        };
        this.request = new TableRequest();
        var result = this.options.filter((option) =>
            option['companyName'].toLowerCase().includes(filterValue)
        );

        if (result.length <= 0) {
            this.myControl.setValue('');

            result = this.defaultOptions;
        }
        return result;
    }

    handleFilter(reset: boolean): void {
        this.searchForm.disable();
        this.showAlert = false;
        let selected = this.defaultOptions.filter(
            (x) => x.companyName == this.myControl.value
        )[0];

        if (reset) {
            this.selected = {
                employeeId: 0,
                displayName: '',
            };
            this.request = new TableRequest();
        }

        this.handleFieldFilter();

        let object = {
            selected: this.selected.employeeId,
            series: selected.seriesCode,
            table: this.request,
        };

        this.userService.getClientEmployeeList(object).subscribe({
            next: (value: any) => {
                this.dataSource = value.payload.data;
                this.totalRows = value.payload.totalRows;
            },
            error: (e) => {
                console.error(e);
                this.searchForm.enable();
            },
            complete: () => {
                this.searchForm.enable();
            },
        });
    }

    handleFieldFilter() {
        if (this.searchForm.value.employeeCode != '') {
            this.request.SearchColumn.push({
                key: 'EmployeeCode',
                value: this.searchForm.value.employeeCode,
                type: 0,
            });
        }
        if (this.searchForm.value.firstName != '') {
            this.request.SearchColumn.push({
                key: 'FirstName',
                value: this.searchForm.value.firstName,
                type: 0,
            });
        }
        if (this.searchForm.value.lastName != '') {
            this.request.SearchColumn.push({
                key: 'LastName',
                value: this.searchForm.value.lastName,
                type: 0,
            });
        }
    }

    handleSelection(element) {
        let current = this.dataSource.map((m) => ({ ...m, select: false }));
        this.selected = {
            employeeId: element.employeeId,
            displayName: element.displayName,
        };
        const filterd = current.filter(
            (x) => x.employeeId == this.selected.employeeId
        )[0];

        this.request.SearchColumn.push({
            key: 'employeeId',
            value: '',
            type: element.Type,
        });

        const output = this.dataSource.map((m) => ({
            ...m,
            select: m.employeeId == filterd.employeeId ? true : false,
        }));

        this.dataSource = output;
    }

    handlePageEvent(e): void {
        this.request.Start = e.pageIndex;
        this.request.Length = e.pageSize;
        this.handleFilter(false);
    }

    handleSortEvent(e): void {
        this.paginator.pageIndex = 0;
        this.request.Start = 0;
        this.request.Order = e.active;
        this.request.OrderBy = e.direction;
        this.handleFilter(false);
    }

    handleSignIn() {
        SaveMessage.message =
            'Are you sure you want to login as ' +
            this.selected.displayName +
            '?';
        const dialogRef = this.message.open(SaveMessage);

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                ;
                let selected = this.defaultOptions.filter(
                    (x) => x.companyName == this.myControl.value
                )[0];

                var obj = {
                    companyId: selected.companyId,
                    device: this.deviceInfoService.getDeviceInfo().os,
                    browser: this.deviceInfoService.getDeviceInfo().browser,
                    ip1: '',
                    ip2: '',
                    user: sessionStorage.getItem('u'),
                    employeeId: this.selected.employeeId,
                };
                this.userService.authenticateLoginAs(obj).subscribe({
                    next: (data: any) => {
                        if (data.statusCode == 200) {
                            const logData = data.payload;
                            if (logData['id'] === null) {
                                this.alert = {
                                    type: 'error',
                                    message: logData['type'],
                                };
                                this.showAlert = true;
                            } else {
                                this.authService.saveToken(logData, false);
                                this.authService.reportToken();
                                if (logData['routing'] !== '/company-setup') {
                                    if (logData['is_pw_changed']) {
                                        this.router.navigate([
                                            logData['routing'],
                                        ]);
                                        if (logData['remind_password']) {
                                            this.successMessage.title =
                                                'Warning!';
                                            this.successMessage.icon = {
                                                show: true,
                                                name: 'heroicons_solid:exclamation',
                                                color: 'warn',
                                            };
                                            this.successMessage.message =
                                                logData['remind_message'];
                                            this.message.open(
                                                this.successMessage
                                            );
                                        }
                                    } else if (logData['is_pw_expires']) {
                                        this.successMessage.title = 'Warning!';
                                        this.successMessage.icon = {
                                            show: true,
                                            name: 'heroicons_solid:exclamation',
                                            color: 'warn',
                                        };
                                        this.successMessage.message =
                                            logData['remind_message'];
                                        this.message.open(this.successMessage);
                                        this.router.navigate([
                                            (logData['routing'] =
                                                '/update-password'),
                                        ]);
                                    } else if (
                                        logData['is_pw_changed'] == false
                                    ) {
                                        this.router.navigate([
                                            (logData['routing'] =
                                                '/update-password'),
                                        ]);
                                    } else {
                                        const route =
                                            logData['routing'] +
                                            '/' +
                                            logData['id'];
                                        this.router.navigate([route]);
                                    }
                                } else {
                                    this.router.navigate([logData['routing']]);
                                }
                            }
                        } else {
                            this.alert = {
                                type: 'error',
                                message: "Can't connect on our system..",
                            };
                            this.showAlert = true;
                        }
                    },
                    error: (error: HttpErrorResponse) => {
                        console.log(error.error);
                        this.alert = {
                            type: 'error',
                            message: "Can't connect on our system..",
                        };
                        this.showAlert = true;
                    },
                });
            }
        });
    }
}
