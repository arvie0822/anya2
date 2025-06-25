import { Routes } from '@angular/router';
import { AuditLogsComponent } from './audit-logs.component';

export default [
    {
        path: 'audit-logs',
        redirectTo: 'audit-logs/',
        pathMatch: 'full',
    },
    {
        path: 'audit-logs',
        component: AuditLogsComponent,
    },
] as Routes;
