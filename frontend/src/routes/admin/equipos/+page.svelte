<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { TEquipoDashboard } from '$lib/core/Equipo/Domain/TEquipo.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';

    let Equipos: Array<TEquipoDashboard> = $state([]);

    $effect(() => {
        CEquipo.obtenerEquiposDashboard().then(equipos => {
            Equipos = equipos;
        });
    });
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li class="is-active"><a href="/admin/equipos" aria-current="page">Equipos</a></li>
    </ul>
</nav>

<div class="columns">
    <div class="column">
        <p class="title">Gestión de Equipo</p>
        <p class="subtitle">Administra todos los equipos de la Liga 1</p>
    </div>
    <div class="column col_acciones">
        <a href="/admin/equipos/0/nuevo" class="button is-link">
            <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
            Agregar Equipo</a>
    </div>
</div>

<div class="container_equipos">
    <table class="table is-hoverable is-striped">
        <thead>
            <tr>
                <th></th>
                <th>Equipo</th>
                <th>Entrenador</th>
                <th>Jugadores</th>
                <th>Fundado</th>
                <th>Editar</th>
            </tr>
        </thead>
        {#if Equipos.length > 0}
            <tbody>
                {#each Equipos as equipo (equipo.Codigo)}
                    <tr>
                        <td><img class="img_logo" src={equipo.Logo} alt="logo" /></td>
                        <td><a href="/admin/equipos/{equipo.Codigo}">{equipo.Nombre}</a></td>
                        <td>{equipo.Entrenador}</td>
                        <td class="has-text-centered">{equipo.CantidadJugadores}</td>
                        <td>{equipo.Fundado}</td>
                        <td class="has-text-centered"
                            ><a class="button" href="/admin/equipos/{equipo.Codigo}/editar"
                                ><Icon icon="fluent:edit-20-filled" color="black" /></a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        {/if}
    </table>
</div>

<style lang="scss">
    .container_equipos {
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
