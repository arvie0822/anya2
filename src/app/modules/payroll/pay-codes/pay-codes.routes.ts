import { Routes } from '@angular/router';
import { PayCodesComponent } from './pay-codes.component';

export default [
    {
        path: 'pay-codes',
        redirectTo: "pay-codes/",
        pathMatch: 'full'
    },
    {
        path: 'pay-codes/:id',
        component: PayCodesComponent
    },
] as Routes;
