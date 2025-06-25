import { Routes } from '@angular/router';
import { AdminLoginComponent } from 'app/@root-administration/admin-login/admin-login.component';
import { AdminSignupComponent } from './admin-signup.component';

export default [
    {
        path: 'admin-signup',
        component: AdminSignupComponent,
    },
] as Routes;
