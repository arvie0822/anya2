import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AngularDeviceInformationService } from 'angular-device-information';
import { myData } from 'app/model/app.moduleId';
import { FailedMessage, SuccessMessage } from 'app/model/message.constant';
import { UserService } from 'app/services/userService/user.service';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { translate } from '@ngneat/transloco';
import { AuthService as Auth } from 'app/services/authService/auth.service';
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    RouterLink,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule
]
})
export class ForgotPasswordComponent implements OnInit {

    show = true;

    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    forgotPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;
    isSave: boolean = false
    disable: boolean = false
    logingenerate: any
    logindata: any
    successMessage = {...SuccessMessage}
    failedMessage = {...FailedMessage}
    sample : any
    showerror : boolean = false
    /**
     * Constructor
     */
    images = []

    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private message: FuseConfirmationService,
        private http: HttpClient,
        private handler: HttpBackend,
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private deviceInfoService: AngularDeviceInformationService,
        private userService: UserService,
        private auth: Auth
    ) {

    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // by passing login page
        this.auth.byPassGuard();

        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            companyCode: ['', [Validators.required]],
            code: ['',[Validators.required]],
        });

    }

    openLink(link) {
        window.open(link, "_blank")
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        // Return if the form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password
        this._authService.forgotPassword(this.forgotPasswordForm.get('username').value)
        this._authService.forgotPassword(this.forgotPasswordForm.get('companyCode').value)
        this._authService.forgotPassword(this.forgotPasswordForm.get('code').value)
            .pipe(
                finalize(() => {

                    // Re-enable the form
                    this.forgotPasswordForm.enable();

                    // Reset the form
                    this.forgotPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                })
            )
            .subscribe(
                (response) => {

                    // Set the alert
                    this.alert = {
                        type: 'success',
                        message: 'Password reset sent! You\'ll receive an email if you are registered on our system.'
                    };
                },
                (response) => {

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Email does not found! Are you sure you are already a member?'
                    };
                }
            );
    }

    onshow(e) {
        myData.username = this.forgotPasswordForm.value.username
        myData.companyCode = this.forgotPasswordForm.value.companyCode
        myData.device = this.deviceInfoService.getDeviceInfo().os
        myData.browser = this.deviceInfoService.getDeviceInfo().browser
        this.logingenerate = this.fb.group({
            username: myData.username,
            password: myData.password,
            companyCode: myData.companyCode,
            remember: myData.remember,
            ip1: "",
            ip2: "",
            device: myData.device,
            browser: myData.browser
        })

        if (this.show && this.forgotPasswordForm.value.username && this.forgotPasswordForm.value.companyCode) {
            this.show = !this.show;
            this.submit()
        } else if (!this.show) {
            if (this.forgotPasswordForm.value.code == "") {
                this.showerror = true
            } else {
                this.send()
            }
        }
    }

    disabled() {
        if (this.forgotPasswordForm.value.companyCode == "") {
            this.disable = true
        }
    }

    submit() {

        var login = this.logingenerate.value

        this.userService.getEmployeeGenerateCode(login).subscribe({

            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.successMessage.message = "generated code is already sent on your email"
                    this.message.open(this.successMessage);
                    this.forgotPasswordForm.get('code').setValue('')
                }
                else {

                }
            },

        });
    }

    send() {

        var code = this.forgotPasswordForm.value.code.toString()
        var username = this.forgotPasswordForm.value.username
        // var login = this.sample.value

        this.userService.getCodeValidation(username,code).subscribe({

            next: (value: any) => {

                if (value.statusCode == 200) {
                    this.successMessage.message = value.message
                    this.failedMessage.message = value.message
                    if (value.message == "Code Expired") {
                       this.reset()
                    } else if(value.message == "No Record found"){
                       this.reset()
                    } else if(value.message == "Invalid Generated Code"){
                        this.reset()
                    } else{
                        this.isSave = false,
                        myData.code = this.forgotPasswordForm.value.code.toString()
                        this.router.navigate(['/update-password']);
                    }
                }
                else {
                    this.failedMessage.message = value.message
                    this.message.open(this.failedMessage);
                    console.log(value.stackTrace)
                    console.log(value.message)
                }
            },
            error: (e) => {
                this.isSave = false
                this.message.open(this.failedMessage);
                console.error(e)
            }
        });
    }

    reset(){
        this.failedMessage.title = translate("Warning!")
        this.message.open(this.failedMessage);
        this.isSave = false
        // this.show = true
        this.forgotPasswordForm.get('companyCode').setValue('')
        this.forgotPasswordForm.get('username').setValue('')
    }

    back(){
        this.show = true
    }

    returnLogin(){
        this.router.navigate(['/login']).then(() => {
            location.reload();
        });
    }
}
