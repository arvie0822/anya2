import { AuthAdminComponent } from './auth-admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { RootForgotPasswordComponent } from './root-forgot-password/root-forgot-password.component';
import { Routes } from '@angular/router';

export default [
{
    path: '',
    component: AuthAdminComponent,
    children: [
        {
            path: 'admin-login',
            component: AdminLoginComponent,
        },
        {
            path: 'admin-signup',
            component: AdminSignupComponent,
        },
        {
            path: 'forgot-password',
            component: RootForgotPasswordComponent,
        },
    ],
},
] as Routes;
