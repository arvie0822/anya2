import { Routes } from '@angular/router';
import { PayrollCategoryComponent } from './payroll-category.component';

export default [
    {
        path: 'payroll-category',
        redirectTo: 'payroll-category/',
        pathMatch: 'full',
    },
    {
        path: 'payroll-category',
        component: PayrollCategoryComponent,
    },
    {
        path: 'payroll-category/:id',
        component: PayrollCategoryComponent,
    },
] as Routes;
