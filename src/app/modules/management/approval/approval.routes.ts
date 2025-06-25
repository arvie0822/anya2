import { Routes } from '@angular/router';
import { ApprovalComponent } from './approval.component';


export default [
    {
        path: '',
        redirectTo: 'approval',
        pathMatch: 'full'
    },
    {
        path: 'approval',
        component: ApprovalComponent
    },
] as Routes;
