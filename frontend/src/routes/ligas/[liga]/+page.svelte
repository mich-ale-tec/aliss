<script lang="ts">
    import { page } from '$app/state';
    import type { TLigaAPI } from '$lib/core/Liga/Domain/TLiga.js';
    import { crearObjeto } from '$lib/core/Liga/Utils/crearObjeto.js';
    import { onMount } from 'svelte';
    import CLiga from '$lib/core/Liga/Application/CLiga.js';
    import Indicador from '$lib/components/Administracion/Indicador.svelte';
    import Icon from '@iconify/svelte';
    import type { TTorneoAPI } from '$lib/core/Torneo/Domain/TTorneo.js';
    import CTorneo from '$lib/core/Torneo/Application/CTorneo.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';

    let liga = page.params.liga;
    let Liga: TLigaAPI = $state(crearObjeto());
    let Torneos: TTorneoAPI[] = $state([]);
    let Equipos: TEquipo[] = $state([]);
    let Tab: string = $state('TORNEO');

    onMount(async () => {
        try {
            const resLiga = await CLiga.obtenerLiga(liga);
            if (resLiga) {
                Liga = resLiga;
                const codigosEquipos = Liga.Equipos;
                Equipos = await Promise.all(
                    codigosEquipos.map(codigo => CEquipo.obtenerEquipo(codigo.toString())),
                );
            }
            const resTorneo = await CTorneo.obtenerPorLiga(liga);
            if (resTorneo) {
                Torneos = resTorneo;
            }
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        }
    });
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li><a href="/admin/ligas">Ligas</a></li>
        <li class="is-active"><a href="/admin/ligas/liga" aria-current="page">Liga</a></li>
    </ul>
</nav>

<div class="card card_equipo">
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img class="img_logo" src={Liga.Logo} alt="Logo" />
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-3">{Liga.Nombre}</p>
                <p class="subtitle is-5">Temporada {Liga.Anio}</p>
                <div class="columns">
                    <div class="column">
                        <p class="has-text-weight-semibold">Equipos</p>
                        <p>{Liga.Equipos.length}</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold">Inicio</p>
                        <p>{Liga.FechaInicio}</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold">Fin</p>
                        <p>{Liga.FechaFin}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container_cards mb-6">
    <Indicador icono="fluent:people-team-16-filled" titulo="Equipos" indicador={Liga.Equipos.length} />
    <Indicador icono="solar:cup-star-bold" titulo="Torneos" indicador={Torneos.length} />
</div>

<div class="tabs">
    <ul>
        <li class={Tab === 'TORNEO' ? 'is-active' : ''}>
            <button type="button" onclick={() => (Tab = 'TORNEO')}>Torneos</button>
        </li>
        <li class={Tab === 'EQUIPO' ? 'is-active' : ''}>
            <button type="button" onclick={() => (Tab = 'EQUIPO')}>Equipos</button>
        </li>
    </ul>
</div>
{#if Tab === 'TORNEO'}
    <div class="planilla columns">
        <div class="column is-10">
            <p class="title is-5">Torneos</p>
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                    </tr>
                </thead>
                {#if Torneos.length > 0}
                    <tbody>
                        {#each Torneos as torneo (torneo.Codigo)}
                            <tr>
                                <td><img class="img_logo" src={torneo.Logo} alt="Logo" /></td>
                                <td><a href="/admin/torneos/{torneo.Codigo}">{torneo.Nombre}</a></td>
                                <td>{torneo.Descripcion}</td>
                                <td class="has-text-centered">{torneo.FechaInicio}</td>
                                <td class="has-text-centered">{torneo.FechaFin}</td>
                            </tr>
                        {/each}
                    </tbody>
                {/if}
            </table>
        </div>
        <div class="column col_acciones is-2">
            <a href="/admin/torneos/0/nuevo?liga={Liga.Codigo}" class="button is-link">
                <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
                Agregar Torneo</a>
        </div>
    </div>
{:else}
    <div class="planilla columns">
        <div class="column is-10">
            <p class="title is-5">Equipos</p>
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Equipo</th>
                        <th>Entrenador</th>
                        <th>Fundado</th>
                    </tr>
                </thead>
                {#if Equipos.length > 0}
                    <tbody>
                        {#each Equipos as equipo (equipo.Codigo)}
                            <tr>
                                <td><img class="img_logo" src={equipo.Logo} alt="logo" /></td>
                                <td><a href="/admin/equipos/{equipo.Codigo}">{equipo.Nombre}</a></td>
                                <td>{equipo.Entrenador}</td>
                                <td>{equipo.Fundado}</td>
                            </tr>
                        {/each}
                    </tbody>
                {/if}
            </table>
        </div>
    </div>
{/if}

<style lang="scss">
    .img_logo {
        height: 64px;
        width: auto;
    }
    .card_equipo {
        box-shadow: none;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
    }
    .container_cards {
        margin-top: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }
    .planilla {
        box-shadow: none;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
        padding: 1rem 2rem;
        margin: 0;
        .img_logo {
            height: 30px;
            width: auto;
        }
    }
</style>
