import { HttpBackend, HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AngularDeviceInformationService } from 'angular-device-information';
import { AuthService } from 'app/services/authService/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { myData } from 'app/model/app.moduleId';
import { SuccessMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { environment } from 'environments/environment';
import { fuseAnimations } from '@fuse/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Gleap from 'gleap';
import { forkJoin } from 'rxjs';
import { MasterService } from 'app/services/masterService/master.service';
import { UserService } from 'app/services/userService/user.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterLink,
    FuseAlertComponent
]
})
export class LoginComponent implements OnInit {
    dialogRef: MatDialogRef<ForgotPasswordComponent, any>;
    loginForm: FormGroup;
    showAlert: boolean = false;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    images = [];
    successMessage = { ...SuccessMessage };
    private url = environment.reports + 'api/site/master/token';

    constructor(
        private fb: FormBuilder,
        private service: AuthService,
        private router: Router,
        private deviceInfoService: AngularDeviceInformationService,
        private message: FuseConfirmationService,
        private http: HttpClient,
        private handler: HttpBackend,
        public dialog: MatDialog,
        private cd: ChangeDetectorRef,
        private masterService: MasterService,
        private userService: UserService,
    ) {Gleap.showFeedbackButton(false);}

    ngOnInit() {
        this.http = new HttpClient(this.handler);

        this.loginForm = this.fb.group({
            username: [localStorage.getItem('us'), Validators.required],
            password: ['', Validators.required],
            companyCode: [localStorage.getItem('co'), Validators.required],
            remember:
                localStorage.getItem('re') == null
                    ? false
                    : localStorage.getItem('re') == 'true',
            ip1: '',
            ip2: '',
            device: this.deviceInfoService.getDeviceInfo().os,
            browser: this.deviceInfoService.getDeviceInfo().browser,
        });
        sessionStorage.setItem(
            'device',
            this.deviceInfoService.getDeviceInfo().os
        );
        sessionStorage.setItem(
            'browser',
            this.deviceInfoService.getDeviceInfo().browser
        );

        // Carousel && CSRF Token
        forkJoin({
            getCarousel: this.masterService.getCarousel(),
            getCsrfToken: this.userService.getCsrfToken(),
        }).subscribe({
            next: (value: any) => {
                // Carousel
                var arr = value.getCarousel.payload;
                const result = [];
                const randomIndex = Math.floor(Math.random() * arr.length);

                for (let i = 0; i < 6; i++) {
                    result.push(arr[(randomIndex + i) % arr.length]);
                }
                console.log(result);

                this.images = result;
                this.cd.detectChanges();

                sessionStorage.setItem("x-xsrf-token", value.getCsrfToken['token']);
            },
            error: (e) => {
                console.error(e);
            }
        });

        this.http
            .get('https://api.ipify.org/?format=json')
            .subscribe((res: any) => {
                this.loginForm.get('ip1').setValue(res.ip);
                sessionStorage.setItem('ip1', res.ip);
            });

        this.http
            .get('https://ipv4.icanhazip.com', { responseType: 'text' })
            .subscribe((res: any) => {
                this.loginForm.get('ip2').setValue(res.replace('\n', ''));
                sessionStorage.setItem('ip2', res.ip);
            });
    }

    openLink(link) {
        window.open(link, '_blank');
    }

    signIn(): void {
        if (this.loginForm.invalid) {
            return;
        }

        // myData.login = this.loginForm.value.ip
        // myData.username =  this.loginForm.value.username
        // myData.remember =  this.loginForm.value.remember

        (myData.username = this.loginForm.value.username),
            (myData.password = this.loginForm.value.password),
            (myData.companyCode = this.loginForm.value.companyCode),
            (myData.remember = this.loginForm.value.remember),
            (myData.ip1 = this.loginForm.value.ip),
            myData.ip2,
            (myData.device = this.deviceInfoService.getDeviceInfo().os);
        myData.browser = this.deviceInfoService.getDeviceInfo().browser;

        // Disable the form
        this.loginForm.disable();

        // Hide the alert
        this.showAlert = false;

        this.service.authenticateUser(this.loginForm.value).subscribe(
            (data) => {
                if (data.statusCode == 200) {
                    const logData = data.payload;
                    if (logData['id'] === null) {
                        this.loginForm.enable();
                        this.alert = {
                            type: 'error',
                            message: logData['type'],
                        };
                        this.showAlert = true;
                    } else {
                        this.service.saveToken(
                            logData,
                            this.loginForm.value.remember
                        );
                          sessionStorage.setItem("allowed","true")
                        this.service.reportToken();
                        if (logData['routing'] !== '/company-setup') {
                            if (logData['is_pw_changed']) {
                                this.router.navigate([logData['routing']]);
                                if (logData['remind_password']) {
                                    this.successMessage.title = 'Warning!';
                                    this.successMessage.icon = {
                                        show: true,
                                        name: 'heroicons_solid:exclamation',
                                        color: 'warn',
                                    };
                                    this.successMessage.message =
                                        logData['remind_message'];
                                    this.message.open(this.successMessage);
                                }
                                this.loginForm.enable();
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
                                    (logData['routing'] = '/update-password'),
                                ]);
                                sessionStorage.setItem("allowed","false")
                                this.loginForm.enable();
                            } else if (logData['is_pw_changed'] == false) {
                                myData.username;
                                this.router.navigate([
                                    (logData['routing'] = '/update-password'),
                                ]);
                                sessionStorage.setItem("allowed","false")
                                this.loginForm.enable();
                            } else {
                                const route =
                                    logData['routing'] + '/' + logData['id'];
                                this.router.navigate([route]);
                                this.loginForm.enable();
                            }
                        } else {
                            this.router.navigate([logData['routing']]);
                            this.loginForm.enable();

                        }
                    }
                } else {
                    this.loginForm.enable();
                    this.alert = {
                        type: 'error',
                        message: "Can't connect on our system..",
                    };
                    this.showAlert = true;
                }
            },
            (error: HttpErrorResponse) => {
                console.log(error.error);
                this.loginForm.enable();
                this.alert = {
                    type: 'error',
                    message: "Can't connect on our system..",
                };
                this.showAlert = true;
            }
        );
    }
    showmodal() {
        this.open();
    }
    open() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
        this.dialogRef = this.dialog.open(ForgotPasswordComponent, {
            panelClass: 'app-dialog',
        });
    }
}
