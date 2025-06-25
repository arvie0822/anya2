import { Routes } from '@angular/router';
import { PreApproveListComponent } from './pre-approve-list.component';


export default [
    {
        path: 'pre-approve-list',
        redirectTo: 'pre-approve-list/',
        pathMatch: 'full'
    },
    {
        path: 'pre-approve-list/:id',
        component: PreApproveListComponent
    },
] as Routes;
