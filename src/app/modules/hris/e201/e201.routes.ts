import { Routes } from '@angular/router';
import { E201Component } from './e201.component';

export default [
    {
        path: 'e201',
        redirectTo: "e201/",
        pathMatch: 'full'
    },
    {
        path: 'e201/:id',
        component: E201Component
    },
] as Routes;
