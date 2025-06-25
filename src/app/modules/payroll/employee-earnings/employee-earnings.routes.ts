import { Routes } from '@angular/router';
import { EmployeeEarningsComponent } from './employee-earnings.component';

export default [
    {
        path: 'payroll-earnings-detail',
        redirectTo: "payroll-earnings-detail/",
        pathMatch: 'full'
    },
    {
        path: 'payroll-earnings-detail/:id',
        component: EmployeeEarningsComponent
    },
] as Routes;
