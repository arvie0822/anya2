import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { SupervisorComponent } from './supervisor/supervisor.component';

export default [
    {
        path: 'employee',
        component: EmployeeComponent,
    },
    {
        path: 'supervisor',
        component: SupervisorComponent,
    },
] as Routes;
