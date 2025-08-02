<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { TJugadorDashboard } from '$lib/core/Jugador/Domain/TJugador.js';
    import CJugador from '$lib/core/Jugador/Application/CJugador.js';

    let Jugadores: TJugadorDashboard[] = $state([]);

    $effect(() => {
        CJugador.obtenerJugadoresDashboard().then(jugadores => (Jugadores = jugadores));
    });
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li class="is-active"><a href="/admin/jugadores" aria-current="page">Jugadores</a></li>
    </ul>
</nav>
<div class="columns">
    <div class="column">
        <p class="title">Gestión de Jugadores</p>
        <p class="subtitle">Administra todos los jugadores de la Liga 1</p>
    </div>
    <div class="column col_acciones">
        <a href="/admin/jugadores/0/nuevo" class="button is-link">
            <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
            Agregar Jugador</a>
    </div>
</div>
<div class="container_jugadores">
    <table class="table is-hoverable is-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Jugador</th>
                <th>Posición</th>
                <th>Equipo</th>
                <th>Edad</th>
                <th>Nacionalidad</th>
                <th>Editar</th>
            </tr>
        </thead>
        {#if Jugadores.length > 0}
            <tbody>
                {#each Jugadores as jugador (jugador.Codigo)}
                    <tr>
                        <td>{jugador.Numero}</td>
                        <td
                            ><a href="/admin/jugadores/{jugador.Codigo}?equipo={jugador.Equipo}"
                                >{jugador.ApellidoPaterno} {jugador.Nombres}</a
                            ></td>
                        <td>{jugador.Posicion}</td>
                        <td><a href="/admin/equipos/{jugador.Equipo}">{jugador.EquipoNombre}</a></td>
                        <td class="has-text-centered">{jugador.Edad}</td>
                        <td class="has-text-centered">{jugador.Nacionalidad}</td>
                        <td class="has-text-centered"
                            ><a class="button" href="/admin/jugadores/{jugador.Codigo}/editar"
                                ><Icon icon="fluent:edit-20-filled" color="black" /></a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        {/if}
    </table>
</div>

<style lang="scss">
    .container_jugadores {
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
