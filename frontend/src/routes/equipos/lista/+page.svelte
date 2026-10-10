<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { TEquipoDashboard } from '$lib/core/Equipo/Domain/TEquipo.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import { onMount } from 'svelte';
    import Pager from '$lib/components/Pager.svelte';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    import Breadcrumb from '$lib/components/Administracion/Breadcrumb.svelte';
    import { PATHS_LISTA } from '$lib/core/Equipo/Utils/breadcrumbPaths.js';
    import Tabla from '$lib/components/equipos/Tabla.svelte';

    let Equipos: Array<TEquipoDashboard> = $state([]);
    const pedazo: number = 10;
    let paginaActual: number = $state(1);
    let cargando = $state(true);
    const EquiposPedazo: Array<TEquipoDashboard> = $derived(
        Equipos.slice((paginaActual - 1) * pedazo, paginaActual * pedazo),
    );

    const cambiarPaginaActual = (pagina: number) => {
        paginaActual = pagina;
    };

    onMount(async () => {
        try {
            Equipos = await CEquipo.obtenerEquiposDashboard();
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        } finally {
            cargando = false;
        }
    });
</script>

<Breadcrumb paths={PATHS_LISTA} />

<div class="columns">
    <div class="column">
        <p class="title">Gestión de Equipo</p>
        <p class="subtitle">Administra todos los equipos de la Liga 1</p>
    </div>
    <div class="column col_acciones">
        <a href="/equipos/0/nuevo" class="button is-link">
            <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
            Agregar Equipo</a>
    </div>
</div>

<div class="container_equipos">
    {#if cargando}
        <div class="estado_vacio">Cargando equipos...</div>
    {:else if EquiposPedazo.length > 0}
        <Pager numeroRegistros={Equipos.length} {pedazo} {cambiarPaginaActual} {paginaActual} />
        <Tabla equipos={EquiposPedazo} />
    {:else}
        <div class="estado_vacio">
            <div class="icono_vacio">
                <Icon icon="guidance:stadium" width="64" height="64" class="has-text-grey-light" />
            </div>
            <p class="is-size-5 has-text-weight-semibold mt-4">Aún no hay equipos registrados</p>
            <p class="has-text-grey mt-2 mb-4">
                Comienza creando tu primer equipo para empezar a gestionar tus torneos.
            </p>
            <a href="/equipos/0/nuevo" class="button is-link is-outlined">
                <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="20" height="20" />
                Crear mi primer equipo
            </a>
        </div>
    {/if}
</div>

<style lang="scss">
    @use '_variable' as *;
    .container_equipos {
        padding: 1rem 2rem;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
    }
    .col_acciones {
        text-align: end;
        a {
            background-color: $color-primary-500;
        }
    }
</style>
