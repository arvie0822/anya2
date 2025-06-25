import { Routes } from '@angular/router';
import { NewsAnnouncementsComponent } from './news-announcements.component';

export default [
    {
        path: 'news-announcements-detail',
        redirectTo: 'news-announcements-detail/',
        pathMatch: 'full',
    },
    {
        path: 'news-announcements-detail/:id',
        component: NewsAnnouncementsComponent,
    },
] as Routes;
