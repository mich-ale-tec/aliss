<script lang="ts">
    import { page } from '$app/state';
    import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
    import { crearJugadorPorDefecto } from '$lib/core/Jugador/Utils/crearObjetos.js';
    import CJugador from '$lib/core/Jugador/Application/CJugador.js';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import crearObjeto from '$lib/core/Equipo/Utils/crearObjeto.js';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import Icon from '@iconify/svelte';

    let jugador = page.params.jugador;
    let equipo = page.url.searchParams.get('equipo');
    let Jugador: TJugador = $state(crearJugadorPorDefecto());
    let Equipo: TEquipo = $state(crearObjeto());

    $effect(() => {
        CJugador.obtenerJugador(jugador)
            .then((jugador: TJugador) => (Jugador = jugador))
            .catch(err => ErrorPersonalizado.errorAPI(err));
        if (equipo) {
            CEquipo.obtenerEquipo(equipo).then(equipo => (Equipo = equipo));
        }
    });
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        {#if equipo}
            <li><a href="/admin/equipos">Equipos</a></li>
            <li><a href="/admin/equipos/{equipo}">Equipo</a></li>
        {:else}
            <li><a href="/admin/jugadores">Jugadores</a></li>
        {/if}
        <li class="is-active"><a href="/admin/jugadores/jugador" aria-current="page">Jugador</a></li>
    </ul>
</nav>
<div class="columns">
    <div class="column is-7">
        <div class="card card_datos">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img class="is-rounded img_logo" src="" alt="Logo" />
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-3">
                            {Jugador.ApellidoPaterno}
                            {Jugador.ApellidoMaterno}, {Jugador.Nombres}
                        </p>
                        <p class="subtitle is-5 mt-4 datos_jugador">
                            #{Jugador.Numero}<Icon icon="icon-park-outline:dot" width="16" />
                            {Jugador.Posicion || '(Falta Posición)'}
                            <Icon icon="icon-park-outline:dot" width="16" />
                            <a href="/admin/equipos/{Jugador.Equipo}">{Equipo.Nombre}</a>
                        </p>
                        <div class="columns">
                            <div class="column">
                                <p class="has-text-weight-semibold">Edad</p>
                                <p>{Jugador.Edad}</p>
                            </div>
                            <div class="column">
                                <p class="has-text-weight-semibold">Nacionalidad</p>
                                <p>{Jugador.Nacionalidad}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="column is-4">
        <div class="card card_datos">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">Información Personal</p>
                        <div>
                            <p class="has-text-weight-semibold">Fecha de Nacimiento</p>
                            <p>19 de diciembre de 1987</p>
                        </div>
                        <div class="mt-3">
                            <p class="has-text-weight-semibold">Lugar de Nacimiento</p>
                            <p>Lima</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .datos_jugador {
        color: gray;
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    .card_datos {
        box-shadow: none;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
        min-height: 210px;
    }
</style>
