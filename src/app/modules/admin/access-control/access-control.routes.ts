import { Routes } from '@angular/router';
import { AccessControlComponent } from './access-control.component';

export default [
    {
        path: 'access-control',
        redirectTo: 'access-control/',
        pathMatch: 'full',
    },
    {
        path: 'access-control/:id',
        component: AccessControlComponent,
    },
] as Routes;
