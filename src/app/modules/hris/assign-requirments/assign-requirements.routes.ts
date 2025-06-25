import { Routes } from '@angular/router';
import { AssignRequirmentsComponent } from './assign-requirements.component';

export default [
    {
        path: 'assign-requirements',
        redirectTo: "assign-requirements/",
        pathMatch: 'full'
    },
    {
        path: 'assign-requirements/:id',
        component: AssignRequirmentsComponent
    },
] as Routes;
