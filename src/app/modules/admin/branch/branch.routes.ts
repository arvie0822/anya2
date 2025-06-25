import { Routes } from '@angular/router';
import { BranchComponent } from './branch.component';

export default [
    {
        path: 'branch',
        redirectTo: 'branch/',
        pathMatch: 'full',
    },
    {
        path: 'branch/:id',
        component: BranchComponent,
    },
] as Routes;
