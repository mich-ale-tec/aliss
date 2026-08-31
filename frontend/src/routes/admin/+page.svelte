<script lang="ts">
    import Indicador from '$lib/components/Administracion/Indicador.svelte';
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    import type { TEstadistica as TEstadisticaEquipo } from '$lib/core/Equipo/Domain/Estadistica.js';
    import type { TEstadistica as TEstadisticaJugador } from '$lib/core/Jugador/Domain/Estadistica.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import CJugador from '$lib/core/Jugador/Application/CJugador.js';

    let EstadisticaEquipo: TEstadisticaEquipo = $state({ Cantidad: 0 });
    let EstadisticaJugador: TEstadisticaJugador = $state({ Cantidad: 0, Activos: 0, Inactivos: 0 });

    onMount(async () => {
        try {
            [EstadisticaEquipo, EstadisticaJugador] = await Promise.all([
                CEquipo.estadistica(),
                CJugador.estadistica(),
            ]);
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        }
    });
</script>

<section class="hero is-link">
    <div class="hero-body">
        <p class="title">Panel de Administración</p>
        <p class="subtitle">Gestiona equipos, jugadores y estadísticas de la liga de fútbol</p>
    </div>
</section>

<div class="container_cards">
    <Indicador icono="guidance:stadium" titulo="Total Equipos" indicador={EstadisticaEquipo.Cantidad} />
    <Indicador
        icono="fluent:people-team-16-filled"
        titulo="Total Jugadores"
        indicador={EstadisticaJugador.Cantidad} />
    <Indicador
        icono="fluent:people-team-add-24-filled"
        titulo="Jugadores Activos"
        indicador={EstadisticaJugador.Activos} />
    <Indicador
        icono="fluent:people-team-delete-24-filled"
        titulo="Jugadores Inactivos"
        indicador={EstadisticaJugador.Inactivos} />
</div>
<div class="container_cards">
    <div class="card mb-0 card_administrar">
        <div class="card-content">
            <div class="media">
                <div class="media-content has-text-centered">
                    <Icon icon="guidance:stadium" width="46" />
                    <p class="title is-4">Gestión de Equipos</p>
                </div>
            </div>
            <div class="content has-text-centered">
                Administra todos los equipos de la liga,<br /> sus entrenadores y estadísticas
            </div>
            <div class="is-flex is-flex-direction-column is-gap-1">
                <a href="/admin/equipos/lista" class="button btn_administrar is-link">Administrar Equipos</a>
                <a href="/admin/equipos/sincronizacion" class="button btn_administrar is-link is-outlined"
                    >Sincronizar Equipos</a>
            </div>
        </div>
    </div>
    <div class="card card_administrar">
        <div class="card-content">
            <div class="media">
                <div class="media-content has-text-centered">
                    <Icon icon="fluent:people-team-16-filled" width="46" />
                    <p class="title is-4">Gestión de Jugadores</p>
                </div>
            </div>
            <div class="content has-text-centered">
                Administra todos los jugadores, sus posiciones<br />y rendimiento
            </div>
            <a href="/admin/jugadores" class="button btn_administrar is-link">Administrar Jugadores</a>
        </div>
    </div>
    <div class="card card_administrar">
        <div class="card-content">
            <div class="media">
                <div class="media-content has-text-centered">
                    <Icon icon="tabler:tournament" width="46" />
                    <p class="title is-4">Gestión de Torneos</p>
                </div>
            </div>
            <div class="content has-text-centered">Administra todos los torneos<br />&nbsp;</div>
            <a href="/admin/torneos" class="button btn_administrar is-link">Administrar Torneos</a>
        </div>
    </div>
    <div class="card card_administrar">
        <div class="card-content">
            <div class="media">
                <div class="media-content has-text-centered">
                    <Icon icon="solar:cup-star-bold" width="46" />
                    <p class="title is-4">Gestión de Ligas</p>
                </div>
            </div>
            <div class="content has-text-centered">Administra todos las ligas <br />&nbsp;</div>
            <a href="/admin/ligas" class="button btn_administrar is-link">Administrar Ligas</a>
        </div>
    </div>
</div>

<style lang="scss">
    .container_cards {
        margin-top: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .card_administrar {
            box-shadow: none;
            border: 1px solid rgb(238, 238, 238);
            border-radius: 1rem;
            margin: 0;
            min-height: 270px;
            min-width: 376px;
            .btn_administrar {
                width: 100%;
            }
        }
    }
</style>
