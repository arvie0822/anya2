import { Routes } from '@angular/router';
import { TimekeepingCategoryComponent } from './timekeeping-category.component';

export default [
    {
        path: 'timekeeping-category',
        redirectTo: "timekeeping-category/",
        pathMatch: 'full'
    },
    {
        path: 'timekeeping-category/:id',
        component: TimekeepingCategoryComponent
    },
] as Routes;
