import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { myData } from 'app/model/app.moduleId';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import { fuseAnimations } from '@fuse/animations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService as Auth } from 'app/services/authService/auth.service';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        CommonModule,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
    ],
})
export class UpdatePassword implements OnInit {
    @ViewChild('updatePasswordNgForm') updatePasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    updatePasswordForm: FormGroup;
    showAlert: boolean = false;
    isSave: boolean = false;
    logindata: any;
    successMessage = { ...SuccessMessage };
    username;
    errormatch: boolean = false;
    validates = {
        minLength: true,
        digits: true,
        lower: true,
        upper: true,
        nonWords: true,
    };
    marginTop: number = 5;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private userService: UserService,
        private message: FuseConfirmationService,
        private router: Router,
        private fb: FormBuilder,
        private auth: Auth
    ) {
        this.updatePasswordForm = this._formBuilder.group(
            {
                newPassword: [
                    '',
                    [
                        Validators.pattern(
                            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/
                        ),
                    ],
                ],
                confirmPassword: ['', [Validators.required]],
                ip1: '',
            },
            { validator: this.passwordMatchValidator }
        );
    }

    ngOnInit(): void {
        if (myData.username == '') {
            this.router.navigate(['/login']).then(() => {
                location.reload();
            });
        } else {
            // by passing login page
            this.auth.byPassGuard();
        }
        this.username = myData.username;
    }

    passwordMatchValidator(form: FormGroup) {
        const newPassword = form.get('newPassword').value;
        const confirmPassword = form.get('confirmPassword').value;
        if (confirmPassword !== newPassword) {
            form.get('confirmPassword').setErrors({ passwordMismatch: true });
        } else {
            form.get('confirmPassword').setErrors(null);
        }
    }

    get upf() {
        return this.updatePasswordForm.value;
    }

    get validate() {
        let variations = {
            digits: /\d/.test(this.upf.newPassword),
            lower: /[a-z]/.test(this.upf.newPassword),
            upper: /[A-Z]/.test(this.upf.newPassword),
            nonWords: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
                this.upf.newPassword
            ),
            minLength: this.upf.newPassword.length > 7,
        };

        return variations;
    }

    check() {
        this.showAlert = false;
        let password = this.updatePasswordForm.get('newPassword').value;
        let cnfrmPassword =
            this.updatePasswordForm.get('confirmPassword').value;

        if (GF.IsEmpty(password) || GF.IsEmpty(cnfrmPassword)) {
            this.showAlert = true;
            this.alert = {
                type: 'error',
                message: GF.IsEmpty(password)
                    ? 'New Password is required.'
                    : 'Confirm Password is required.',
            };
        } else {
            if (
                this.validate.digits &&
                this.validate.lower &&
                this.validate.upper &&
                this.validate.nonWords &&
                this.validate.minLength
            ) {
                if (password == cnfrmPassword) {
                    this.submit();
                } else {
                    this.showAlert = true;
                    this.alert = {
                        type: 'error',
                        message: "Password don't match",
                    };
                }
            }
        }
    }

    submit() {
        this.logindata = this.fb.group({
            username: this.username,
            password: myData.password,
            companyCode: myData.companyCode,
            remember: myData.remember,
            ip1: this.updatePasswordForm.value.ip1,
            ip2: myData.ip2,
            device: myData.device,
            browser: myData.browser,
        });

        var login = this.logindata.value;
        var password = this.updatePasswordForm.value.newPassword;
        this.updatePasswordForm.markAllAsTouched();
        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.isSave = true;
                this.userService.postChangePassword(login, password).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.successMessage.message =
                                'Password updated successfully';
                            this.message.open(this.successMessage);
                            (this.isSave = false),
                                setTimeout(() => {
                                    this.router
                                        .navigate(['/login'])
                                        .then(() => {
                                            location.reload();
                                        });
                                }, 500);
                        } else {
                            this.message.open(FailedMessage);
                            console.log(value.stackTrace);
                            console.log(value.message);
                        }
                    },
                });
            }
        });
    }

    returnLogin() {
        this.router.navigate(['/login']).then(() => {
            location.reload();
        });
    }
}
