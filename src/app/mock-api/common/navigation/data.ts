/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'apps',
        title: 'Admin Menu',
        subtitle: 'Root User for Administration',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'apps.administratriveLogin',
                title: 'Administrative Login',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/root/administrative-login',
            },
            {
                id: 'apps.companySetup',
                title: 'Client Setup',
                type: 'basic',
                icon: 'heroicons_outline:identification',
                link: '/root/company-setup',
            },
            {
                id: 'apps.dropdownSetup',
                title: 'Dropdown Setup',
                type: 'basic',
                icon: 'heroicons_outline:bars-arrow-down',
                link: '/root/dropdown-setup',
            },
            {
                id: 'apps.biometrics',
                title: 'Biometrics',
                type: 'basic',
                icon: 'heroicons_outline:finger-print',
                link: '/root/biometrics',
            },
            {
                id: 'apps.modules',
                title: 'Modules',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                link: '/root/modules',
            },
            {
                id: 'apps.databaseMigration',
                title: 'Migration DB',
                type: 'basic',
                icon: 'heroicons_outline:circle-stack',
                link: '/root/database-migration',
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
