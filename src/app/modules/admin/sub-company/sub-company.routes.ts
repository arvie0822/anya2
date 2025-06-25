import { Routes } from '@angular/router';
import { SubcompanyComponent } from './sub-companycomponent';

export default [
    {
        path: 'sub-company',
        redirectTo: 'sub-company/',
        pathMatch: 'full',
    },
    {
        path: 'sub-company/:id',
        component: SubcompanyComponent,
    },
] as Routes;
