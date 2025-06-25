import { Routes } from '@angular/router';
import { ChangePassword } from './change-password.component';

export default [
  {
        path: '',
        redirectTo: 'change-password',
        pathMatch: 'full'
      },
      {
        path: 'change-password',
        component: ChangePassword
      },
] as Routes;
