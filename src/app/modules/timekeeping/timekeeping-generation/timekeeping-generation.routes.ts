import { Routes } from '@angular/router';
import { TimekeepingGenerationComponent } from './timekeeping-generation.component';

export default [
    {
        path: 'timekeeping-generation',
        redirectTo: "timekeeping-generation/",
        pathMatch: 'full'
      },
      {
        path: 'timekeeping-generation',
        component: TimekeepingGenerationComponent
      },
] as Routes;
