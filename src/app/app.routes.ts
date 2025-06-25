import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { initialDataResolveradmin } from 'app/app.resolvers-admin';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { PreApproveOtComponent } from './modules/management/pre-approve-ot/pre-approve-ot.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'login' },

    {
        path: 'root',

        component: LayoutComponent,
        data: {
            layout: 'classic',
        },
        resolve: {
            initialData: initialDataResolver,
        },

        children: [
            { path: '', loadChildren: () => import('app/@root-administration/admin.routes') },
            // { path: '', loadChildren: () => import('app/@root-administration/biometrics/biometrics.routes') },
            // { path: '', loadChildren: () => import('app/@root-administration/client-setup/client-setup.routes') },
            // { path: '', loadChildren: () => import('app/@root-administration/database-migration/database-migration.routes') },
            // { path: '', loadChildren: () => import('app/@root-administration/dropdown-setup/dropdown-setup.routes') },
            // { path: '', loadChildren: () => import('app/@root-administration/modules/modules.routes') },
            // { path: '', loadChildren: () => import('app/@root-administration/root-users/root-users.routes') },
            // { path: '', loadChildren: () => import('app/modules/administration/example/example.routes') },
        ]
    },
    {
        path: 'root',

        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        resolve: {
            initialData: initialDataResolveradmin,
        },

        children: [
            { path: '', loadChildren: () => import('app/@root-administration/auth-admin.routes') },
            // { path: '', loadChildren: () => import('app/@root-administration/admin-signup/admin-signup.routes') },
            // { path: '', loadChildren: () => import('app/@root-administration/root-forgot-password/root-forgot-password.routes') },
        ]
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'login', loadChildren: () => import('app/auth/login/login.routes') },
            { path: 'update-password', loadChildren: () => import('app/auth/update-password/update-password.routes') },
            { path: 'setup-password', loadChildren: () => import('app/auth/setup-password/setup-password.routes') },
            { path: 'forgot-password', loadChildren: () => import('app/auth/forgot-password/forgot-password.routes') },
            { path: 'change-password', loadChildren: () => import('app/auth/change-password/change-password.routes') },
        ]
    },

    {
        path: 'root',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },


    },

    // Admin routes
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern',
        },
        resolve: {
            initialData: initialDataResolver
        },
        loadChildren: () => import('app/modules/dashboard/dashboard.routes')
    },

    // datatable routes
    {
        path: 'search/:id',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern',
        },
        resolve: {
            initialData: initialDataResolver
        },
        loadChildren: () => import('app/core/datatable/datatable.routes')
    },
    //single screen
    {
        path: 'modal-search/:id',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern',
        },
        resolve: {
            initialData: initialDataResolver
        },
        loadChildren: () => import('app/core/datatable-modal/datatable-modal.routes')
    },
    //modal table
    {
        path: 'single-search/:id',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern',
        },
        resolve: {
            initialData: initialDataResolver
        },
        loadChildren: () => import('app/core/datatable-crud/datatable-crud.routes')
    },

    {
        path: 'detail',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern',
        },
        resolve: {
            initialData: initialDataResolver
        },
        children: [

            //ADMIN MODULE
            { path: '', loadChildren: () => import('app/modules/admin/access-control/access-control.routes') },
            { path: '', loadChildren: () => import('app/modules/admin/company/company.routes')},
            { path: '', loadChildren: () => import('app/modules/admin/branch/branch.routes')},
            { path: '', loadChildren: () => import('app/modules/admin/leaves/leaves.routes')},
            { path: '', loadChildren: () => import('app/modules/admin/sub-company/sub-company.routes')},
            { path: '', loadChildren: () => import('app/modules/admin/audit-logs/system-logs/audit-logs.routes')},
            { path: '', loadChildren: () => import('app/modules/admin/approval-process/approval-process.routes')},

            //HRIS MODULE
            { path: '', loadChildren: () => import('app/modules/hris/category-detail/category-detail.routes') },
            { path: '', loadChildren: () => import('app/modules/hris/employee-detail/employee-detail.routes') },
            { path: '', loadChildren: () => import('app/modules/hris/leave-balance/leave-balance.routes') },
            { path: '', loadChildren: () => import('app/modules/hris/news-announcements/news-announcement.routes') },
            { path: '', loadChildren: () => import('app/modules/hris/assign-requirments/assign-requirements.routes') },
            { path: '', loadChildren: () => import('app/modules/hris/e201/e201.routes')},
            { path: '', loadChildren: () => import('app/modules/hris/org-chart/org-chart.routes')},



            //TIMEKEEPING MODULE
            { path: '', loadChildren: () => import('app/modules/timekeeping/break-type/break-type.routes')},
            { path: '', loadChildren: () => import('app/modules/timekeeping/employee-schedule/employee-schedule.routes')},
            { path: '', loadChildren: () => import('app/modules/timekeeping/timekeeping-category/timekeeping-category.routes')},
            { path: '', loadChildren: () => import('app/modules/timekeeping/timekeeping-generation/timekeeping-generation.routes')},
            { path: '', loadChildren: () => import('app/modules/timekeeping/time-logs/time-logs.routes')},
            { path: '', loadChildren: () => import('app/modules/timekeeping/employee-attendance/employee-attendance.routes')},
            { path: '', loadChildren: () => import('app/modules/timekeeping/employee-location/employee-location.routes')},
            { path: '', loadChildren: () => import('app/modules/timekeeping/assign-break/assign-break.routes')},

            //PAYROLL MODULE
            { path: '', loadChildren:() => import('app/modules/payroll/deduction-hierarchy/deduction-hierarchy.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/employee-earnings/employee-earnings.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/pay-codes/pay-codes.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/payreg-code/payreg-code.routes')},
            { path: '', loadChildren: () => import('app/modules/payroll/payroll-category/payroll-category.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/payroll-cutoff/payroll-cutoff.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/payroll-deduction/payroll-deduction.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/payroll-loans/payroll-loans.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/payroll-run/payroll-run.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/rates/rates.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/statutory/setup/setup.routes')},
            { path: '', loadChildren:() => import('app/modules/payroll/statutory/statutory-view/statutory-view.routes')},

            //ESS MODULE
            // { path: '', loadChildren: () => import('app/modules/ess/filing-view/filing-view-routes')},
            { path: '', loadChildren: () => import('app/modules/ess/filing/filing.routes')},
            { path: '', loadChildren: () => import('app/modules/ess/emplo-data-change/emplo-data-change-routes')},

            //MANAGEMENT MODULE
            { path: '', loadChildren: () => import('app/modules/management/approval/approval.routes')},
            { path: '', loadChildren: () => import('app/modules/management/pre-approve-list/pre-approve-list.routes')},
            { path: '', loadChildren: () => import('app/modules/management/pre-approve-ot/pre-approve-ot.routes')},

            //REPORTS
            { path: '', loadChildren: () => import('app/modules/reports/report-view/report-view.routes')},

            //UPLOAD
            { path: '', loadChildren: () => import('app/modules/upload/upload.routes') },
            { path: '', loadChildren: () => import('app/modules/upload/dynamic-headers/dynamic-headers.routes') },

        ]
    }
];
