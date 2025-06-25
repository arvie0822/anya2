import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { TranslocoModule } from '@ngneat/transloco';
import { AngularDeviceInformationService } from 'angular-device-information';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { ExampleComponent } from 'app/modules/administration/example/example.component';
import { AuthService } from 'app/services/authService/auth.service';
import { MasterService } from 'app/services/masterService/master.service';
import { CustomModule } from 'app/shared/custom.module';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css'],
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
    ],
})
export class AdminLoginComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    constructor(
        private fb: FormBuilder,
        private service: MasterService,
        private deviceInfoService: AngularDeviceInformationService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        // Create the form
        this.signInForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            device: this.deviceInfoService.getDeviceInfo().os,
            browser: this.deviceInfoService.getDeviceInfo().browser,
            iP: '',
        });
    }

    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }

        this.signInForm.disable();

        this.service
            .authenticateAdminUser(this.signInForm.getRawValue())
            .subscribe({
                next: (value: any) => {
                    if (value.statusCode == 200) {
                        this.authService.saveToken(value.payload, false);
                        ;
                        this.router.navigate([value.payload['routing']]);
                    } else {
                        this.signInForm.enable();
                        this.alert = {
                            type: 'error',
                            message: "Can't connect on our system..",
                        };
                        this.showAlert = true;
                    }
                },
                error: (error) => {
                    console.log(error.error);
                    this.signInForm.enable();
                    this.alert = {
                        type: 'error',
                        message: "Can't connect on our system..",
                    };
                    this.showAlert = true;
                },
            });
    }
}
