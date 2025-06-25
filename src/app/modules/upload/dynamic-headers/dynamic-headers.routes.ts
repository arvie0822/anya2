import { Routes } from '@angular/router';
import { DynamicHeadersComponent } from './dynamic-headers.component';

export default [
    {
        path: 'dynamic-headers',
        redirectTo: "dynamic-headers/",
        pathMatch: 'full'
    },
    {
        path: 'dynamic-headers/:id',
        component: DynamicHeadersComponent
    },
] as Routes;
