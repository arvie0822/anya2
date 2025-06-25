import { Routes } from '@angular/router';
import { PayrollRunComponent } from './payroll-run.component';

export default [
    {
        path: 'payroll-run',
        redirectTo: "payroll-run/",
        pathMatch: 'full'
    },
    {
        path: 'payroll-run/:id',
        component: PayrollRunComponent
    },
] as Routes;
