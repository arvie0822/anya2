import { DragDropModule } from '@angular/cdk/drag-drop';
import { DecimalPipe, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { TranslocoModule } from '@ngneat/transloco';
import { MasterService } from 'app/services/masterService/master.service';
import { CustomModule } from 'app/shared/custom.module';

@Component({
    selector: 'app-admin-signup',
    templateUrl: './admin-signup.component.html',
    styleUrls: ['./admin-signup.component.css'],
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
            MatIconModule
        ],
})
export class AdminSignupComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private service: MasterService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signUp(): void {
        if (this.signUpForm.invalid) {
            return;
        }
        this.signUpForm.disable();

        this.service.postAdminUser(this.signUpForm.getRawValue()).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    this.signUpForm.enable();
                    this.alert = {
                        type: 'success',
                        message: 'User is added, you can now sign in.',
                    };
                    this.showAlert = true;
                } else {
                    this.signUpForm.enable();
                    this.alert = {
                        type: 'error',
                        message: value.message,
                    };
                    this.showAlert = true;
                }
            },
            error: (error) => {
                console.log(error.error);
                this.signUpForm.enable();
                this.alert = {
                    type: 'error',
                    message: "Can't connect on our system..",
                };
                this.showAlert = true;
            },
        });
    }
}
