import { PATHS_BREADCRUMB, type TPathBreadcrumb } from '$lib/core/shared/Utils/breadcrumbPaths.js';

export const PATHS_LISTA: TPathBreadcrumb[] = [
    ...PATHS_BREADCRUMB,
    {
        href: '/admin/equipos/lista',
        name: 'Equipos',
    },
];

export const PATHS_SINCRONIZACION: TPathBreadcrumb[] = [
    ...PATHS_LISTA,
    {
        href: '/admin/equipos/sincronizacion',
        name: 'Sincronizar',
    },
];
