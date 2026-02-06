<script lang="ts">
    import Icon from '@iconify/svelte';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    import type { TLigaAPI } from '$lib/core/Liga/Domain/TLiga.js';
    import { crearObjeto } from '$lib/core/Liga/Utils/crearObjeto.js';
    import CLiga from '$lib/core/Liga/Application/CLiga.js';
    import UsoCasoEditar from '$lib/core/Liga/Application/UsoCasoEditar.js';
    import MultiSelect from 'svelte-multiselect';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';

    type TKey = keyof TLigaAPI;
    type TLabel = string;

    let liga = page.params.liga;
    let Liga: TLigaAPI = $state(crearObjeto());
    let Equipos: Array<{ value: number; label: string }> = $state([]);
    let equiposSelec: Array<{ value: number; label: string }> = $state([]);

    onMount(async () => {
        try {
            const resLiga = await CLiga.obtenerLiga(liga);
            if (resLiga) {
                Liga = resLiga;
            }
            const resEquipos = await CEquipo.obtenerEquipos();
            if (resEquipos) {
                Equipos = resEquipos.map(e => ({ value: e.Codigo, label: e.Nombre }));
            }
            if (resLiga && resEquipos) {
                equiposSelec = Equipos.filter(e => Liga.Equipos.includes(e.value));
            }
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        }
    });
</script>

{#snippet input(liga: TLigaAPI, key: TKey, label: TLabel)}
    {@const id = `K${liga.Codigo}:${key}`}
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
            <a href="/admin/ligas/liga" aria-current="page">Editar</a>
        </li>
    </ul>
</nav>

<div class="columns">
    <div class="column is-half is-offset-one-quarter">
        <h1 class="title is-4">
            {Liga.Nombre}
        </h1>
        <!--        Formulario -->
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
            {@render input(Liga, 'Nombre', 'Nombre')}
        </div>
        <div class="field">
            <label for={`L${Liga.Codigo}:Equipos`} class="label">Equipos</label>
            <div class="control">
                {#if Equipos.length > 0}
                    <MultiSelect bind:selected={equiposSelec} options={Equipos} placeholder="Equipos..." />
                {/if}
            </div>
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
                        const RES = await new UsoCasoEditar(Liga).iniciar(equiposSelec.map(e => e.value));
                        if (RES) {
                            await goto('/admin/ligas');
                        }
                    }}>
                    <Icon style="margin-right: 5px" icon="fluent:save-16-filled" />
                    Actualizar</button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    :global(.multiselect .options.hidden) {
        display: none !important;
    }
</style>
