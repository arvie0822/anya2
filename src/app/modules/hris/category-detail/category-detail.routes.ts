import { Routes } from '@angular/router';
import { CategoryDetailComponent } from './category-detail.component';

export default [
    {
        path: 'category-detail',
        redirectTo: "category-detail/",
        pathMatch: 'full',
    },
    {
        path: 'category-detail/:id',
        component: CategoryDetailComponent,
    },
] as Routes;
