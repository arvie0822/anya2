import { Routes } from '@angular/router';
import { PayrollCutoffComponent } from './payroll-cutoff.component';

export default [
    {
        path: 'payroll-cutoff-detail',
        redirectTo: 'payroll-cutoff-detail/',
        pathMatch: 'full',
    },
    {
        path: 'payroll-cutoff-detail/:id',
        component: PayrollCutoffComponent,
    },
] as Routes;
