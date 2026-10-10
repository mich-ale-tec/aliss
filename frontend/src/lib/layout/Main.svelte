<script lang="ts">
    import CardGrid from '$lib/components/dashboard/CardGrid.svelte';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import type { TEstadistica as TEstadisticaEquipo } from '$lib/core/Equipo/Domain/Estadistica.js';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    import { onMount } from 'svelte';

    let EstadisticaEquipo: TEstadisticaEquipo = $state({ Cantidad: 0 });
    onMount(async () => {
        try {
            [EstadisticaEquipo] = await Promise.all([CEquipo.estadistica()]);
        } catch (err) {
            ErrorPersonalizado.errorAPI(err);
        }
    });
</script>

<div class="main">
    <div class="header">
        <h1 class="title is-2">
            Hola, Mich!
            <br />
            ¿Qué quieres
            <br />
            gestionar hoy?
        </h1>
        <p>Gestiona fácilmente tus equipos, jugadores, torneos y ligas desde un solo lugar.</p>
    </div>
    <div class="cards">
        <CardGrid />
    </div>
</div>

<style lang="scss">
    @use '_variable' as *;
    .main {
        .header {
            margin-bottom: $sp-36;
            h1 {
                line-height: $lh-normal;
                font-weight: $fw-semibold;
            }
            p {
                font-size: $fs-xl;
                font-weight: $fw-light;
            }
        }
    }
</style>
