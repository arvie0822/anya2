import { Routes } from '@angular/router';
import { DeductionHierarchyComponent } from './deduction-hierarchy.component';

export default [
    {
        path: 'deduction-hierarchy',
        redirectTo: 'deduction-hierarchy/',
        pathMatch: 'full',
    },
    {
        path: 'deduction-hierarchy/:id',
        component: DeductionHierarchyComponent,
    },
] as Routes;
