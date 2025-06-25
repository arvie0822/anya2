import { Routes } from '@angular/router';
import { EmployeeScheduleComponent } from './employee-schedule.component';

export default [
    {
        path: 'employee-schedule/:id/:type',
        component: EmployeeScheduleComponent
      },
      {
        path: 'employee-schedule/:id',
        component: EmployeeScheduleComponent
      },
      {
        path: 'employee-schedule',
        redirectTo: "employee-schedule/",
        pathMatch: 'full'
      },
] as Routes;
