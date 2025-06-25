import { Routes } from '@angular/router';
import { AssignBreak } from './assign-break.component';

export default [
    {
        path: 'assign-break/:id/:type',
        component: AssignBreak
      },
      {
        path: 'assign-break/:id',
        component: AssignBreak
      },
      {
        path: 'assign-break',
        redirectTo: "assign-break/",
        pathMatch: 'full'
      },
] as Routes;
