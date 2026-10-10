<script lang="ts">
    import Card from './Card.svelte';
    import type { CardDashboard } from './types/Card.js';

    let items: CardDashboard[] = $state([
        {
            title: 'Gestión de Equipos',
            description: 'Administra todos los equipos, sus entrenadores y estadísticas',
            icon: 'solar:shield-bold',
            path: '/equipos/lista',
            link: 'Listar Equipos',
        },
        {
            title: 'Gestión de Jugadores',
            description: 'Administra todos los jugadores, sus posiciones y rendimiento',
            icon: 'solar:users-group-rounded-bold',
            path: '/jugadores',
            link: 'Listar Jugadores',
        },
        {
            title: 'Gestión de Torneos',
            description: 'Administra todos los torneos',
            icon: 'solar:cup-star-bold',
            path: '/torneos',
            link: 'Listar Torneos',
        },
        {
            title: 'Gestión de Ligas',
            description: 'Administra todos las ligas',
            icon: 'tabler:tournament',
            path: '/ligas',
            link: 'Listar Ligas',
        },
    ]);
</script>

<div class="cardgrid">
    {#each items as item}
        <Card
            title={item.title}
            description={item.description}
            icon={item.icon}
            path={item.path}
            link={item.link} />
    {/each}
</div>

<style lang="scss">
    @use '_variable' as *;
    .cardgrid {
        display: flex;
        gap: $sp-20;
    }
</style>
