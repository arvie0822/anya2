import { Routes } from '@angular/router';
import { RatesComponent } from './rates.component';

export default [
    {
        path: 'rates',
        redirectTo: "rates/",
        pathMatch: 'full'
    },
    {
        path: 'rates/:id',
        component: RatesComponent
    },

] as Routes;
