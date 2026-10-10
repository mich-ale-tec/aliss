import { PATHS_BREADCRUMB, type TPathBreadcrumb } from '$lib/core/shared/Utils/breadcrumbPaths.js';

export const PATHS_LISTA: TPathBreadcrumb[] = [
    ...PATHS_BREADCRUMB,
    {
        href: '/equipos/lista',
        name: 'Equipos',
    },
];

export const PATHS_VIEW = (id: number, equipo: string): TPathBreadcrumb[] => [
    ...PATHS_BREADCRUMB,
    {
        href: '/equipos/lista',
        name: 'Equipos',
    },
    {
        href: `/equipos/${id}`,
        name: `${equipo}`,
    },
];

export const PATHS_ACTUALIZAR = (accion: string): TPathBreadcrumb[] => [
    ...PATHS_BREADCRUMB,
    {
        href: '/equipos/lista',
        name: 'Equipos',
    },
    {
        href: '/equipos/equipo',
        name: accion,
    },
];

export const PATHS_SINCRONIZACION: TPathBreadcrumb[] = [
    ...PATHS_LISTA,
    {
        href: '/equipos/sincronizacion',
        name: 'Sincronizar',
    },
];
