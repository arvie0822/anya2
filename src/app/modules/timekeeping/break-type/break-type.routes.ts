import { Routes } from '@angular/router';
import { BreakTypeComponent } from './break-type.component';

export default [
    {
        path: 'break-type',
        redirectTo: "break-type/",
        pathMatch: 'full'
      },
      {
        path: 'break-type/:id',
        component: BreakTypeComponent
      },
] as Routes;
