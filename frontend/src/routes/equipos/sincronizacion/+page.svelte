<script lang="ts">
    import Breadcrumb from '$lib/components/Administracion/Breadcrumb.svelte';
    import Pager from '$lib/components/Pager.svelte';
    import type { TEquipoDashboard } from '$lib/core/Equipo/Domain/TEquipo.js';
    import { PATHS_SINCRONIZACION } from '$lib/core/Equipo/Utils/breadcrumbPaths.js';
    import Icon from '@iconify/svelte';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';

    let Equipos: Array<TEquipoDashboard> = $state([]);
    const pedazo: number = 10;

    let paginaActual: number = $state(1);
    let cargando = $state(false);
    const EquiposPedazo: Array<TEquipoDashboard> = $derived(
        Equipos.slice((paginaActual - 1) * pedazo, paginaActual * pedazo),
    );

    const cambiarPaginaActual = (pagina: number) => {
        paginaActual = pagina;
    };

    async function actualizarListado() {
        cargando = true;
        try {
            Equipos = await CEquipo.obtenerEquiposDashboard();
            paginaActual = 1;
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        } finally {
            cargando = false;
        }
    }
</script>

<Breadcrumb paths={PATHS_SINCRONIZACION} />

<div class="columns">
    <div class="column">
        <p class="title">Sincronizar Equipos</p>
        <p class="subtitle">Actualiza el listado disponible de equipos de la Liga 1</p>
    </div>
    <div class="column col_acciones">
        <button class="button is-link" onclick={actualizarListado} disabled={cargando}>
            <Icon icon="mdi:cog-sync" style="margin-right: 5px" width="24" height="24" />
            {cargando ? 'Actualizando...' : 'Actualizar listado'}</button>
    </div>
</div>

<div class="container_equipos">
    {#if EquiposPedazo.length > 0}
        <Pager numeroRegistros={Equipos.length} {pedazo} {cambiarPaginaActual} {paginaActual} />
        <table class="table is-hoverable is-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Equipo</th>
                    <th>Entrenador</th>
                    <th>Jugadores</th>
                    <th>Fundado</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {#each EquiposPedazo as equipo (equipo.Codigo)}
                    <tr>
                        <td><img class="img_logo" src={equipo.Logo} alt="logo" /></td>
                        <td><a href="/admin/equipos/{equipo.Codigo}">{equipo.Nombre}</a></td>
                        <td>{equipo.Entrenador}</td>
                        <td class="has-text-centered">{equipo.CantidadJugadores}</td>
                        <td>{equipo.Fundado}</td>
                        <td class="has-text-centered"
                            ><a class="button" href="/admin/equipos/{equipo.Codigo}/editar"
                                ><Icon icon="fluent:edit-20-filled" color="black" /></a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else if !cargando}
        <p class="has-text-grey has-text-centered">
            Usa “Actualizar listado” para consultar los equipos registrados.
        </p>
    {/if}
</div>

<style lang="scss">
    .container_equipos {
        padding: 1rem 2rem;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
        .img_logo {
            height: 30px;
            width: auto;
        }
    }
    .col_acciones {
        margin-top: auto;
        margin-bottom: auto;
        text-align: end;
    }
</style>
