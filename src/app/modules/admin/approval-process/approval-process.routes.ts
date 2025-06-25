import { Routes } from '@angular/router';
import { ApprovalProcessComponent } from './approval-process.component';

export default [
    {
        path: 'approval-process',
        redirectTo: 'approval-process/',
        pathMatch: 'full',
    },
    {
        path: 'approval-process/:id',
        component: ApprovalProcessComponent,
    },
] as Routes;
