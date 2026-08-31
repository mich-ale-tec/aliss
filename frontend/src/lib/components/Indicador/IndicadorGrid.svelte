<script lang="ts">
    import Indicador from '../Administracion/Indicador.svelte';
    import type { TEstadistica as TEstadisticaEquipo } from '$lib/core/Equipo/Domain/Estadistica.js';
    import type { TEstadistica as TEstadisticaJugador } from '$lib/core/Jugador/Domain/Estadistica.js';

    interface Props {
        EstadisticaEquipo: TEstadisticaEquipo;
        EstadisticaJugador: TEstadisticaJugador;
    }

    let { EstadisticaEquipo, EstadisticaJugador }: Props = $props();
</script>

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
