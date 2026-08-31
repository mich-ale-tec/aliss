import { PATHS_BREADCRUMB, type TPathBreadcrumb } from '$lib/core/shared/Utils/breadcrumbPaths.js';

export const PATHS: TPathBreadcrumb[] = [
    ...PATHS_BREADCRUMB,
    {
        href: '/admin/equipos',
        name: 'Equipos',
    },
];
