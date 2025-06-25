import { Routes } from '@angular/router';
import { PayregCodeComponent } from './payreg-code.component';

export default [
    {
        path: 'payreg-code',
        redirectTo: "payreg-code/",
        pathMatch: 'full'
    },
    {
        path: 'payreg-code/:id',
        component: PayregCodeComponent
    },
] as Routes;
