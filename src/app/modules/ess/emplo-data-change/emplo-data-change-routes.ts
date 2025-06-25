import { Routes } from '@angular/router';
import { EmploDataChangeComponent } from './emplo-data-change.component';

export default [
    {
        path: 'emplo-data-change',
        redirectTo: "emplo-data-change/",
        pathMatch: 'full',
    },
    {
        path: 'emplo-data-change/:id',
        component: EmploDataChangeComponent,
    },
] as Routes;
