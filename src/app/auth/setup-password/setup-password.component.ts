import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SaveMessage } from 'app/model/message.constant';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService as Auth } from 'app/services/authService/auth.service';

@Component({
    selector: 'app-setup-password',
    templateUrl: './setup-password.component.html',
    styleUrls: ['./setup-password.component.css'],
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
    MatProgressSpinnerModule
]
})
export class SetupPassword implements OnInit {

    error = "";
    error2 = "";

    @ViewChild('setupPasswordNgForm') setupPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    setupPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private saveMsg: FuseConfirmationService,
        private router: Router,
        private auth: Auth
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // by passing login page
        this.auth.byPassGuard();

        // Create the form
        this.setupPasswordForm = this._formBuilder.group({
            newPassword: ['', [Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/)]],
            confirmPassword: ['', [Validators.required]]
        });
    }

    hide = true;
    hide1 = true;

    private matchPassword(AC: AbstractControl) {
        let password = AC.get('newPassword').value;
        if (AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
          let verifyPassword = AC.get('confirmPassword').value;
          if (password != verifyPassword) {
            AC.get('confirmPassword').setErrors({ matchPassword: true });
          } else {
            return null;
          }
        }
      }

    get f() { return this.setupPasswordForm.controls; }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void
    {
        // Return if the form is invalid
        if ( this.setupPasswordForm.invalid )
        {
            return;
        }

        // Disable the form
        this.setupPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password
        this._authService.resetPassword(this.setupPasswordForm.get('newPassword').value)
        this._authService.resetPassword(this.setupPasswordForm.get('confirmPassword').value)
            .pipe(
                finalize(() => {

                    // Re-enable the form
                    this.setupPasswordForm.enable();

                    // Reset the form
                    this.setupPasswordNgForm.resetForm();

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

    // get validate() {
    //     let ret = false;
    //     let variations = {
    //         digits: /\d/.test(this.setupPasswordForm.get('newPassword').value),
    //         lower: /[a-z]/.test(this.setupPasswordForm.get('newPassword').value),
    //         upper: /[A-Z]/.test(this.setupPasswordForm.get('newPassword').value),
    //         nonWords: /\W/.test(this.setupPasswordForm.get('newPassword').value),
    //     }
    //     if (!variations.digits) {
    //         this.error = "Password needs to have atleast one number!"
    //         ret= true;
    //     }else if (!variations.upper) {
    //         this.error = "Password needs to have atleast one upper case letter!"
    //         ret= true;
    //     }else if (!variations.lower) {
    //         this.error = "Password needs to have atleast one lower case letter!"
    //         ret= true;
    //     }else if (!variations.nonWords) {
    //         this.error = "Password needs to have atleast one special character letter!"
    //         ret= true;
    //     }else if (this.setupPasswordForm.get('newPassword').value.length < 8) {
    //         this.error = "Password needs to have a minimum of eight characters!"
    //         ret= true; }
    //         else{  this.error = "";
    //     } return ret;
    // }

    get validate() {
        // let ret = false;
        // var special  = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        let variations = {
            digits: /\d/.test(this.setupPasswordForm.get('newPassword').value),
            lower: /[a-z]/.test(this.setupPasswordForm.get('newPassword').value),
            upper: /[A-Z]/.test(this.setupPasswordForm.get('newPassword').value),
            nonWords: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.setupPasswordForm.get('newPassword').value),
            minLength: (this.setupPasswordForm.get('newPassword').value.length > 7)
        }

        return variations;
    }

    check(){
        let password = this.setupPasswordForm.get("newPassword").value;
        let cnfrmPassword = this.setupPasswordForm.get("confirmPassword").value;
        console.log(" Password:", password,'\n',"Confirm Password:",cnfrmPassword);
        let message = document.getElementById("message");

        if(password.length != 0){
            if(password == cnfrmPassword){
                this.error2 = "Passwords match"
                this.saveMsg.open(SaveMessage);
                // message.textContent = "Passwords match";
            }
            else{
                this.error2 = "Password don't match"
                // message.textContent = "Password don't match";
            }
        }
        else{
            alert("Password can't be empty!");
            message.textContent = "";
        }
    }

    returnLogin(){
        this.router.navigate(['/login']).then(() => {
            location.reload();
        });
    }
}
