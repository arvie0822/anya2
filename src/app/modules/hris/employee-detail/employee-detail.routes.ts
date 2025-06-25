import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail.component';

export default [
    {
        path: 'employee-detail',
        redirectTo: "employee-detail/",
        pathMatch: 'full',
    },
    {
        path: 'employee-detail/:id',
        component: EmployeeDetailComponent,
    },
] as Routes;
