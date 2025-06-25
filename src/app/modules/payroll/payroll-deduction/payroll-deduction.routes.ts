import { Routes } from '@angular/router';
import { PayrollDeductionComponent } from './payroll-deduction.component';

export default [
    {
        path: 'payroll-deductions-detail',
        redirectTo: "payroll-deductions-detail/",
        pathMatch: 'full'
    },
    {
        path: 'payroll-deductions-detail/:id',
        component: PayrollDeductionComponent
    },
] as Routes;
