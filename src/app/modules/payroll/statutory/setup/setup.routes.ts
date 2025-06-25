import { Routes } from '@angular/router';
import { SetupComponent } from './setup.component';

export default [
    {
        path: 'setup',
        redirectTo: "setup/",
        pathMatch: 'full'
    },
    {
      path: 'setup/:id',
      component: SetupComponent
    },
] as Routes;
