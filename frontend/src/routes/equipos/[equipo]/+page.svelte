<script lang="ts">
    import { page } from '$app/state';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import crearObjeto from '$lib/core/Equipo/Utils/crearObjeto.js';
    import Icon from '@iconify/svelte';
    import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
    import CJugador from '$lib/core/Jugador/Application/CJugador.js';
    import Indicador from '$lib/components/Administracion/Indicador.svelte';
    import UsoCasoDarBaja from '$lib/core/Jugador/Application/UsoCasoDarBaja.js';
    import { obtenerLabelNombres } from '$lib/core/shared/Utils/convertirNombres.js';
    import { onMount } from 'svelte';
    import { PATHS_VIEW } from '$lib/core/Equipo/Utils/breadcrumbPaths.js';
    import Breadcrumb from '$lib/components/Administracion/Breadcrumb.svelte';

    let equipo = page.params.equipo;
    let Equipo: TEquipo = $state(crearObjeto());
    let Jugadores: TJugador[] = $state([]);

    onMount(async () => {
        Equipo = await CEquipo.obtenerEquipo(equipo);
        Jugadores = await CJugador.obternerJugadorePorEquipo(equipo);
    });
</script>

<Breadcrumb paths={PATHS_VIEW(Equipo.Codigo, Equipo.Nombre)} />

<div class="card card_equipo">
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img class="img_logo" src={Equipo.Logo} alt="Logo" />
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-3">{Equipo.Nombre}</p>
                <p class="subtitle is-5">{Equipo.Descripcion}</p>
                <div class="columns">
                    <div class="column">
                        <p class="has-text-weight-semibold text">Entrenador</p>
                        <p>{Equipo.Entrenador}</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold text">Fundado</p>
                        <p>{Equipo.Fundado}</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold text">Estadio</p>
                        <p>{Equipo.Estadio}</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold text">Ciudad</p>
                        <p>{Equipo.Ciudad}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="card container_indicadores">
    <Indicador icono="fluent:people-team-16-filled" titulo="Total Jugadores" indicador={Jugadores.length} />
</div>

<div class="planilla columns">
    <div class="column is-10">
        <p class="title is-5">Plantilla de Jugadores</p>
        <table class="table">
            <thead>
                <tr>
                    <th><abbr title="Numero">#</abbr></th>
                    <th>Jugadores</th>
                    <th>Posición</th>
                    <th>Edad</th>
                    <th>Nacionalidad</th>
                    <th>Dar Baja</th>
                    <th>Transferir</th>
                    <th>Editar</th>
                </tr>
            </thead>
            {#if Jugadores.length > 0}
                <tbody>
                    {#each Jugadores as jugador (jugador.Codigo)}
                        <tr>
                            <th>{jugador.Numero}</th>
                            <td
                                ><a href="/admin/jugadores/{jugador.Codigo}?equipo={Equipo.Codigo}"
                                    >{obtenerLabelNombres(jugador)}</a
                                ></td>
                            <td>{jugador.Posicion}</td>
                            <td class="has-text-centered">{jugador.Edad}</td>
                            <td class="has-text-centered">{jugador.Nacionalidad}</td>
                            <td
                                ><button
                                    class="button is-danger"
                                    onclick={async () => {
                                        const RESPONSE = await new UsoCasoDarBaja(jugador).iniciar();
                                        if (RESPONSE) {
                                            Jugadores = Jugadores.filter(e => e.Codigo !== RESPONSE.Codigo);
                                        }
                                    }}
                                    ><Icon
                                        icon="material-symbols-light:delete"
                                        width="19"
                                        color="white" /></button
                                ></td>
                            <td
                                ><a
                                    class="button"
                                    href="/admin/jugadores/{jugador.Codigo}/transferir?equipo={Equipo.Codigo}"
                                    ><Icon icon="mingcute:transfer-fill" width="19" /></a
                                ></td>
                            <td class="has-text-centered"
                                ><a
                                    class="button"
                                    href="/admin/jugadores/{jugador.Codigo}/editar?equipo={Equipo.Codigo}"
                                    ><Icon icon="fluent:edit-20-filled" /></a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            {/if}
        </table>
    </div>
    <div class="column col_acciones is-2">
        <a href="/jugadores/0/nuevo?equipo={Equipo.Codigo}" class="button is-link">
            <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
            Agregar Jugador</a>
    </div>
</div>

<style lang="scss">
    @use '_variable' as *;
    .planilla {
        box-shadow: none;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
        padding: 1rem 2rem;
        margin: 0;
    }
    .img_logo {
        height: 64px;
        width: auto;
    }
    .card_equipo {
        box-shadow: none;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
    }
    .col_acciones {
        margin-bottom: auto;
        text-align: end;
        a {
            background-color: $color-primary-500;
        }
    }
    .container_indicadores {
        box-shadow: none;
        margin-left: 0;
        padding: 0;
    }
    .text {
        font-size: $fs-md;
    }
</style>
