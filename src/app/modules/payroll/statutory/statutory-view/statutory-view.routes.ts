import { Routes } from '@angular/router';
import { StatutoryViewComponent } from './statutory-view.component';

export default [
    {
        path: 'statutory-view',
        redirectTo: "statutory-view/",
        pathMatch: 'full'
    },
    {
        path: 'statutory-view',
        component: StatutoryViewComponent
    }
] as Routes;
