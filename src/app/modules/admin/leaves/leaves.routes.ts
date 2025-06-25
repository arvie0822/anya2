import { Routes } from '@angular/router';
import { LeavesComponent } from './leaves.component';

export default [
    {
        path: 'leave-detail',
        redirectTo: 'leave-detail/',
        pathMatch: 'full',
    },
    {
        path: 'leave-detail/:id',
        component: LeavesComponent,
    },
] as Routes;
