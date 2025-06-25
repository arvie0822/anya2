import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';

export default [
    {
        path: 'user-profile/:id',
        component: UserProfileComponent,
    },
] as Routes;
