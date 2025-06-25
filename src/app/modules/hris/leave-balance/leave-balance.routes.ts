import { Routes } from '@angular/router';
import { LeaveBalanceComponent } from './leave-balance.component';

export default [
    {
        path: 'leave-balance',
        redirectTo: "leave-balance/",
        pathMatch: 'full',
    },
    {
        path: 'leave-balance',
        component: LeaveBalanceComponent,
    },
] as Routes;
