import { Routes } from '@angular/router';
import { FilingComponent } from './filing.component';

export default [
    {
        path: 'filing',
        redirectTo: "filing/",
        pathMatch: 'full',
    },
    {
        path: 'filing/:id',
        component: FilingComponent,
    },

] as Routes;
