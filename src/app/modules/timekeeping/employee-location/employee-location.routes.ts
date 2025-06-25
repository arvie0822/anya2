import { Routes } from '@angular/router';
import { EmployeeLocationComponent } from './employee-location.component';

export default [
    {
        path: 'employee-location',
        redirectTo: "employee-location/",
        pathMatch: 'full'
      },
      {
        path: 'employee-location/:id',
        component: EmployeeLocationComponent
      },
] as Routes;
