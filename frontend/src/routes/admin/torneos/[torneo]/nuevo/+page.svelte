<script lang="ts">
    import Icon from '@iconify/svelte';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    import type { TTorneoAPI } from '$lib/core/Torneo/Domain/TTorneo.js';
    import { crearObjeto } from '$lib/core/Torneo/Utils/crearObjeto.js';
    import UsoCasoAgregar from '$lib/core/Torneo/Application/UsoCasoAgregar.js';

    type TKey = keyof TTorneoAPI;
    type TLabel = string;

    let liga = page.url.searchParams.get('liga');
    let Torneo: TTorneoAPI = $state(crearObjeto());

    onMount(async () => {
        try {
            if (liga) {
                Torneo.Liga = parseInt(liga);
            }
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        }
    });
</script>

{#snippet input(torneo: TTorneoAPI, key: TKey, label: TLabel)}
    {@const id = `T${torneo.Codigo}:${key}`}
    <label for={id} class="label">{label}</label>
    <div class="control">
        <input class="input" {id} type="text" bind:value={torneo[key]} />
    </div>
{/snippet}

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        {#if liga}
            <li><a href="/admin/ligas/{liga}">Equipo</a></li>
        {:else}
            <li><a href="/admin/torneos">Torneos</a></li>
        {/if}
        <li class="is-active">
            <a href="/admin/ligas/liga" aria-current="page">Nuevo</a>
        </li>
    </ul>
</nav>

<div class="columns">
    <div class="column is-half is-offset-one-quarter">
        <h1 class="title is-4">{Torneo.Nombre}</h1>
        <div class="field">
            <div class="columns">
                <div class="column is-narrow container_logo">
                    <figure class="image is-64x64 container_logo">
                        <img class="img_logo" src={Torneo.Logo} alt="Logo" />
                    </figure>
                </div>
                <div class="column">
                    {@render input(Torneo, 'Logo', 'Logo')}
                </div>
            </div>
        </div>
        <div class="field">
            {@render input(Torneo, 'Nombre', 'Nombre')}
        </div>
        <div class="field">
            {@render input(Torneo, 'Descripcion', 'Descripción')}
        </div>
        <div class="field">
            <label for={`T${Torneo.Codigo}:FechaInicio`} class="label">Fecha Inicio</label>
            <div class="control">
                <input
                    class="input"
                    id={`T${Torneo.Codigo}:FechaInicio`}
                    type="date"
                    bind:value={Torneo.FechaInicio} />
            </div>
        </div>
        <div class="field">
            <label for={`T${Torneo.Codigo}:FechaFin`} class="label">Fecha Fin</label>
            <div class="control">
                <input
                    class="input"
                    id={`T${Torneo.Codigo}:FechaFin`}
                    type="date"
                    bind:value={Torneo.FechaFin} />
            </div>
        </div>

        <div class="field is-grouped mt-5">
            <div class="control">
                <button
                    class="button is-success is-outlined"
                    onclick={async () => {
                        const RESPONSE = await new UsoCasoAgregar(Torneo).iniciar();
                        if (RESPONSE) {
                            await goto(liga ? `/admin/ligas/${liga}` : '/admin/ligas');
                        }
                    }}>
                    <Icon style="margin-right: 5px" icon="fluent:save-16-filled" />
                    Agregar</button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .container_logo {
        display: flex;
        align-items: center;
        justify-content: center;
        .img_logo {
            height: 64px;
            width: auto;
        }
    }
</style>
