<script lang="ts">
    import { page } from '$app/state';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import crearObjeto from '$lib/core/Equipo/Utils/crearObjeto.js';
    import Icon from '@iconify/svelte';
    import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
    import CJugador from '$lib/core/Jugador/Application/CJugador.js';
    import Indicador from '$lib/components/Administracion/Indicador.svelte';

    let equipo = page.params.equipo;
    let Equipo: TEquipo = $state(crearObjeto());
    let Jugadores: TJugador[] = $state([]);

    $effect(() => {
        CEquipo.obtenerEquipo(equipo).then((equipo: TEquipo) => {
            Equipo = equipo;
        });
        CJugador.obternerJugadorePorEquipo(equipo).then((jugadores: TJugador[]) => {
            Jugadores = jugadores;
        });
    });
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li><a href="/admin/equipos">Equipos</a></li>
        <li class="is-active"><a href="/admin/equipos/equipo" aria-current="page">Equipo</a></li>
    </ul>
</nav>

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
                        <p class="has-text-weight-semibold">Entrenador</p>
                        <p>{Equipo.Entrenador}</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold">Fundado</p>
                        <p>{Equipo.Fundado}</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold">Estadio</p>
                        <p>{Equipo.Estadio}</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold">Ciudad</p>
                        <p>{Equipo.Ciudad}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="card container_indicadores">
    <Indicador
        icono="fluent:people-team-16-filled"
        titulo="Total Jugadores"
        indicador={Jugadores.length.toString()} />
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
                    <th>Transferir</th>
                    <th>Editar</th>
                </tr>
            </thead>
            {#if Jugadores.length > 0}
                <tbody>
                    {#each Jugadores as jugador (jugador.Codigo)}
                        {@const nombre = `${jugador.ApellidoPaterno} ${jugador.ApellidoMaterno}, ${jugador.Nombres}`}
                        <tr>
                            <th>{jugador.Numero}</th>
                            <td
                                ><a href="/admin/jugadores/{jugador.Codigo}?equipo={Equipo.Codigo}"
                                    >{nombre}</a
                                ></td>
                            <td>{jugador.Posicion}</td>
                            <td class="has-text-centered">{jugador.Edad}</td>
                            <td class="has-text-centered">{jugador.Nacionalidad}</td>
                            <td><a href="/admin/jugadores/{jugador.Codigo}/transferir/transferir"><Icon icon="mingcute:transfer-fill" width="24" /></a></td>
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
        <a href="/admin/jugadores/0/nuevo?equipo={Equipo.Codigo}" class="button is-link">
            <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
            Agregar Jugador</a>
    </div>
</div>

<style lang="scss">
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
    }
    .container_indicadores {
        box-shadow: none;
        margin-left: 0;
        padding: 0;
    }
</style>
