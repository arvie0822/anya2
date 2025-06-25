import { Routes } from '@angular/router';
import { CompanyComponent } from './company.component';

export default [
    {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full',
    },
    {
        path: 'company',
        component: CompanyComponent,
    },
] as Routes;
    