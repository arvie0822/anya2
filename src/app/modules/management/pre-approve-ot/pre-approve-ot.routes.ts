import { Routes } from '@angular/router';
import { PreApproveOtComponent } from './pre-approve-ot.component';


export default [
    {
        path: "pre-approve-ot",
        redirectTo: "pre-approve-ot/",
        pathMatch: 'full',
    },
    {
        path: 'pre-approve-ot/:id',
        component: PreApproveOtComponent
    },
] as Routes;
