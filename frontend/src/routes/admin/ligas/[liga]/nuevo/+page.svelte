<script lang="ts">
    import type { TLigaAPI } from '$lib/core/Liga/Domain/TLiga.js';
    import { crearObjeto } from '$lib/core/Liga/Utils/crearObjeto.js';
    import { goto } from '$app/navigation';
    import Icon from '@iconify/svelte';
    import UsoCasoAgregar from '$lib/core/Liga/Application/UsoCasoAgregar.js';
    import MultiSelect from 'svelte-multiselect';
    import { onMount } from 'svelte';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    type TKey = keyof TLigaAPI;
    type TLabel = string;

    let Liga: TLigaAPI = $state(crearObjeto());
    let Equipos: Array<{ value: number; label: string }> = $state([]);
    let equiposSelec: Array<{ value: number; label: string }> = $state([]);

    onMount(async () => {
        try {
            const resEquipos = await CEquipo.obtenerEquipos();
            if (resEquipos) {
                Equipos = resEquipos.map(e => ({ value: e.Codigo, label: e.Nombre }));
            }
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        }
    });
    $effect(() => {
        Liga.Equipos = equiposSelec.map(e => e.value);
    });
</script>

{#snippet input(liga: TLigaAPI, key: TKey, label: TLabel)}
    {@const id = `L${liga.Codigo}:${key}`}
    <label for={id} class="label">{label}</label>
    <div class="control">
        <input class="input" {id} type="text" bind:value={liga[key]} />
    </div>
{/snippet}

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li><a href="/admin/ligas">Ligas</a></li>
        <li class="is-active">
            <a href="/admin/ligas/liga" aria-current="page">Nuevo</a>
        </li>
    </ul>
</nav>

<div class="columns">
    <div class="column is-half is-offset-one-quarter">
        <h1 class="title is-4">
            {Liga.Nombre}
        </h1>
        <div class="field">
            <div class="columns">
                <div class="column is-narrow container_logo">
                    <figure class="image is-64x64 container_logo">
                        <img class="img_logo" src={Liga.Logo} alt="Logo" />
                    </figure>
                </div>
                <div class="column">
                    {@render input(Liga, 'Logo', 'Logo')}
                </div>
            </div>
        </div>
        <div class="field">
            <label for={`L${Liga.Codigo}:Equipos`} class="label">Equipos</label>
            <div class="control">
                <MultiSelect bind:selected={equiposSelec} options={Equipos} placeholder="Equipos..." />
            </div>
        </div>
        <div class="field">
            {@render input(Liga, 'Nombre', 'Nombre')}
        </div>
        <div class="field">
            {@render input(Liga, 'Descripcion', 'Descripcion')}
        </div>
        <div class="field">
            {@render input(Liga, 'Anio', 'Año')}
        </div>
        <div class="field">
            <label for={`L${Liga.Codigo}:FechaInicio`} class="label">Fecha Inicio</label>
            <div class="control">
                <input
                    class="input"
                    id={`L${Liga.Codigo}:FechaInicio`}
                    type="date"
                    bind:value={Liga.FechaInicio} />
            </div>
        </div>
        <div class="field">
            <label for={`L${Liga.Codigo}:FechaFin`} class="label">Fecha Fin</label>
            <div class="control">
                <input class="input" id={`L${Liga.Codigo}:FechaFin`} type="date" bind:value={Liga.FechaFin} />
            </div>
        </div>

        <div class="field is-grouped mt-5">
            <div class="control">
                <button
                    class="button is-success is-outlined"
                    onclick={async () => {
                        const RESPONSE = await new UsoCasoAgregar(Liga).iniciar();
                        if (RESPONSE) {
                            await goto('/admin/ligas');
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
