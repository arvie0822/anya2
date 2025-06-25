import { Routes } from '@angular/router';
import { PayrollLoansComponent } from './payroll-loans.component';

export default [
    {
        path: 'payroll-loans-detail',
        redirectTo: "payroll-loans-detail/",
        pathMatch: 'full'
    },
    {
        path: 'payroll-loans-detail/:id',
        component: PayrollLoansComponent
    },
] as Routes;
