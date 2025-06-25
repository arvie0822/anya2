import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';
import { ExampleComponent } from 'app/modules/administration/example/example.component';
import { AdministrativeLoginComponent } from './administrative-login/administrative-login.component';
import { BiometricsComponent } from './biometrics/biometrics.component';
import { ClientSetupComponent } from './client-setup/client-setup.component';
import { DatabaseMigrationComponent } from './database-migration/database-migration.component';
import { DropdownSetupComponent } from './dropdown-setup/dropdown-setup.component';
import { ModulesComponent } from './modules/modules.component';
import { RootUsersComponent } from './root-users/root-users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


export default [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'example',
                component: ExampleComponent,
            },
            {
                path: 'administrative-login',
                component: AdministrativeLoginComponent,
            },
            {
                path: 'company-setup',
                component: ClientSetupComponent,
            },
            {
                path: 'dropdown-setup',
                component: DropdownSetupComponent,
            },
            {
                path: 'biometrics',
                component: BiometricsComponent,
            },
            {
                path: 'modules',
                component: ModulesComponent,
            },
            {
                path: 'user-profile',
                redirectTo: 'user-profile/',
                pathMatch: 'full',
            },
            {
                path: 'user-profile/:id',
                component: UserProfileComponent,
            },
            {
                path: 'database-migration',
                component: DatabaseMigrationComponent,
            },
            {
                path: 'root-users',
                component: RootUsersComponent,
            },
        ],
    },
] as Routes;


