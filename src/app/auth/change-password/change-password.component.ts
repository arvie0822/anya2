import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { finalize } from 'rxjs';
import { AngularDeviceInformationService } from 'angular-device-information';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { myData } from 'app/model/app.moduleId';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoService } from '@ngneat/transloco';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthService as Auth } from 'app/services/authService/auth.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
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
    TranslocoModule
]
})
export class ChangePassword implements OnInit {

    error = "";
    errorDigits = "";
    errorUpper = "";
    errorLower = "";
    errorNonWords = "";
    errorLength = "";
    error2 = "";

    @ViewChild('changePasswordNgForm') changePasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    changePasswordForm: UntypedFormGroup;
    showAlert: boolean = false;
    isSave: boolean = false
    changepass : any
    successMessage = {...SuccessMessage}
    failedMessage = {...FailedMessage}

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private saveMsg: FuseConfirmationService,
        private userService: UserService,
        private message: FuseConfirmationService,
        private router: Router,
        private fb: FormBuilder,
        private deviceInfoService: AngularDeviceInformationService,
        private http: HttpClient,
        private handler: HttpBackend,
        private translocoService: TranslocoService,
        private auth: Auth
    )
    {
        // Set the active language from session storage or default to 'en'
        const activeLang = sessionStorage.getItem('activeLang') || 'en';
        this.translocoService.setActiveLang(activeLang);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOndestroy(): void
    {
        sessionStorage.setItem('allowed', 'true');
    }


    ngOnInit(): void
    {
        // by passing login page
        this.auth.byPassGuard();

        // Create the form
        sessionStorage.getItem('activeLang')
        debugger
        this.changePasswordForm = this._formBuilder.group({
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/)]],
            confirmPassword: ['', [Validators.required]]
        },
        // this.matchPassword
        // this.matchPassword2
        );

        // Save the active language to session storage on language change
        this.translocoService.langChanges$.subscribe(lang => {
            sessionStorage.setItem('activeLang', lang);
        });

        // this.http = new HttpClient(this.handler)
        // this.http.get("https://ipv4.icanhazip.com", { responseType: 'text' }).subscribe((res: any) => {
        //     this.changepass.value.get('ip1').setValue(res.replace('\n', ''))

        // });
        // // myData.login = this.changepass.value.ip


    }

    hide  = true;
    hide1 = true;
    hide2 = true;

    // private matchPassword(AC: AbstractControl) {
    //     let password = AC.get('newPassword').value;
    //     if (AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
    //       let verifyPassword = AC.get('confirmPassword').value;
    //       if (password != verifyPassword) {
    //         AC.get('confirmPassword').setErrors({ matchPassword: true });
    //       } else {
    //         // this.error = "Password needs to have atleast one number!"
    //         // this.matchPassword: true
    //         return null;
    //       }
    //     }
    //   }


    //   private matchPassword2(AC: AbstractControl) {
    //     let password = AC.get('confirmPassword').value;
    //     if (AC.get('newPassword').touched || AC.get('newPassword').dirty) {
    //       let verifyPassword = AC.get('newPassword').value;
    //       if (password != verifyPassword) {
    //         AC.get('newPassword').setErrors({ matchPassword: true });
    //       } else {
    //         // this.error = "Password needs to have atleast one number!"
    //         // this.matchPassword: true
    //         return null;
    //       }
    //     }
    //   }

      get f() { return this.changePasswordForm.controls; }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void
    {
        // Return if the form is invalid
        if ( this.changePasswordForm.invalid )
        {
            return;
        }

        // Disable the form
        this.changePasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password
        this._authService.resetPassword(this.changePasswordForm.get('oldPassword').value)
        this._authService.resetPassword(this.changePasswordForm.get('newPassword').value)
        this._authService.resetPassword(this.changePasswordForm.get('confirmPassword').value)
            .pipe(
                finalize(() => {

                    // Re-enable the form
                    this.changePasswordForm.enable();

                    // Reset the form
                    this.changePasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                })
            )
            .subscribe(
                (response) => {

                    // Set the alert
                    this.alert = {
                        type   : 'success',
                        message: 'Password reset sent! You\'ll receive an email if you are registered on our system.'
                    };
                },
                (response) => {

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Email does not found! Are you sure you are already a member?'
                    };
                }
            );
    }


    get validate() {
        // let ret = false;
        // var special  = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        let variations = {
            digits: /\d/.test(this.changePasswordForm.get('newPassword').value),
            lower: /[a-z]/.test(this.changePasswordForm.get('newPassword').value),
            upper: /[A-Z]/.test(this.changePasswordForm.get('newPassword').value),
            nonWords: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.changePasswordForm.get('newPassword').value),
            minLength: (this.changePasswordForm.get('newPassword').value.length > 7)
        }

        return variations;
    }



    check() {
        this.showAlert = false
        // this.validate
        let oldpass = this.changePasswordForm.get("oldPassword").value;
        let password = this.changePasswordForm.get("newPassword").value;
        let cnfrmPassword = this.changePasswordForm.get("confirmPassword").value;
        // console.log(" Password:", password, '\n', "Confirm Password:", cnfrmPassword);
        // let message = document.getElementById("message");

        if (GF.IsEmpty(oldpass) || GF.IsEmpty(password) || GF.IsEmpty(cnfrmPassword)) {
            this.showAlert = GF.IsEmpty(password)
            this.alert = {
                type   : 'error',
                message: 'New Password is required.'
            };
            return
        } else {
            if (password == cnfrmPassword) {
                if (this.changePasswordForm.valid) {
                    this.submit()
                }
            } else {
                this.showAlert = true
                this.alert = {
                    type   : 'error',
                    message: "Password don't match"
                };
            }
        }
    }

    digits(control: AbstractControl): ValidationErrors {
        const digits = /\d/;
        const valid = digits.test(control.value);
        return  { invaliddigits: !valid };
    }

    lower(control: AbstractControl): ValidationErrors | null {
      const lower = /[a-z]/;
      const valid = lower.test(control.value);
      return { invalidlower: valid };
    }

    upper(control: AbstractControl): ValidationErrors | null {
        const upper = /[A-Z]/;
        const valid = upper.test(control.value);
        return valid ? null : { invalidupper: true };
    }

    nonwords(control: AbstractControl): ValidationErrors | null {
        const nonWords = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const valid = nonWords.test(control.value);
        return valid ? null : { invalidnonWords: true };
    }

    length(control: AbstractControl): ValidationErrors | null {
        const minWord = /^.{8,}$/;
        const valid = minWord.test(control.value);
        return valid ? null : { invalidminWord: true };
    }


    submit(){


        this.changepass = this.fb.group({
            username: sessionStorage.getItem('un'),
            password: this.changePasswordForm.value.oldPassword,
            companyCode: [sessionStorage.getItem('cc'), Validators.required],
            remember: myData.remember  == null ? false : (myData.remember  == true),
            ip1 : "",
            ip2: '',
            device: this.deviceInfoService.getDeviceInfo().os,
            browser: this.deviceInfoService.getDeviceInfo().browser
        })

        // var login = this.changepass.value
        // var password = this.changePasswordForm.value.newPassword

        var oldpass = this.changePasswordForm.value.oldPassword
        var newpass = this.changePasswordForm.value.newPassword

        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.isSave = true
                this.userService.postUpdatePassword(oldpass,newpass).subscribe({
                    next: (value: any) => {
                        debugger
                        if (value.statusCode == 200) {
                            if (value.payload) {
                                this.successMessage.message = "Password updated successfully"
                                this.message.open(this.successMessage);
                                this.isSave = false,
                                setTimeout(() => {
                                    this.router.navigate(['/login']).then(() => {
                                            location.reload();
                                    });
                                }, 500);
                            }
                            else {
                                this.failedMessage.message = value.message
                                this.message.open(this.failedMessage);
                            }
                        } else {
                            this.failedMessage.message = value.message
                            this.message.open(this.failedMessage);
                        }
                    },
                });

            }
        });



    }

    returnLogin(){
        this.router.navigate(['/login']).then(() => {
            location.reload();
        });
    }
}
