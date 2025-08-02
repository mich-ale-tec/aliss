<script lang="ts">
    import Indicador from '$lib/components/Administracion/Indicador.svelte';
    import Icon from '@iconify/svelte';
</script>

<section class="hero is-link mt-6">
    <div class="hero-body">
        <p class="title">Panel de Administración</p>
        <p class="subtitle">Gestiona equipos, jugadores y estadísticas de la liga de fútbol</p>
    </div>
</section>

<div class="container_cards">
    <Indicador icono="guidance:stadium" titulo="Total Equipos" indicador="24" />
    <Indicador icono="fluent:people-team-16-filled" titulo="Total Jugadores" indicador="21" />
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
            <a href="/admin/equipos" class="button btn_administrar is-link">Administrar Equipos</a>
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
            .btn_administrar {
                width: 100%;
            }
        }
    }
</style>
