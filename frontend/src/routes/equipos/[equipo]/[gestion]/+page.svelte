<script lang="ts">
    import { page } from '$app/state';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import crearObjeto from '$lib/core/Equipo/Utils/crearObjeto.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import Icon from '@iconify/svelte';
    import UsoCasoAgregar from '$lib/core/Equipo/Application/UsoCasoAgregar.js';
    import { goto } from '$app/navigation';
    import UsoCasoEditar from '$lib/core/Equipo/Application/UsoCasoEditar.js';
    import { onMount } from 'svelte';
    import { PATHS_ACTUALIZAR } from '$lib/core/Equipo/Utils/breadcrumbPaths.js';
    import Breadcrumb from '$lib/components/Administracion/Breadcrumb.svelte';
    import { CapitalizarPalabra } from '../../../../shared/FCadena.js';

    type TKey = keyof TEquipo;
    type TLabel = string;

    let equipo = page.params.equipo;
    let accion = page.params.gestion.toUpperCase();
    let Equipo: TEquipo = $state(crearObjeto());

    onMount(async () => {
        if (accion === 'EDITAR') {
            Equipo = await CEquipo.obtenerEquipo(equipo);
        }
    });
</script>

{#snippet input(equipo: TEquipo, key: TKey, label: TLabel)}
    {@const id = `J${equipo.Codigo}:${key}`}
    <label for={id} class="label">{label}</label>
    <div class="control">
        <input class="input" {id} type="text" bind:value={equipo[key]} />
    </div>
{/snippet}

<Breadcrumb paths={PATHS_ACTUALIZAR(CapitalizarPalabra(accion))} />

<div class="columns">
    <div class="column is-half">
        <div class="field">
            {@render input(Equipo, 'Nombre', 'Nombre')}
        </div>
        <div class="field">
            {@render input(Equipo, 'Breve', 'Breve')}
        </div>
        <div class="field">
            {@render input(Equipo, 'Descripcion', 'Descripción')}
        </div>
        <div class="field">
            {@render input(Equipo, 'Entrenador', 'Entrenador')}
        </div>
    </div>
    <div class="column is-half">
        <div class="field">
            {@render input(Equipo, 'Fundado', 'Fundado')}
        </div>
        <div class="field">
            {@render input(Equipo, 'Estadio', 'Estadio')}
        </div>
        <div class="field">
            {@render input(Equipo, 'Ciudad', 'Ciudad')}
        </div>
        <div class="field">
            {@render input(Equipo, 'Logo', 'Logo')}
        </div>
    </div>
</div>
<div class="columns">
    <div class="column">
        <div class="field is-grouped mt-5">
            <div class="control">
                {#if accion === 'NUEVO'}
                    <button
                        class="button is-success is-outlined"
                        onclick={async () => {
                            const RESPONSE = await new UsoCasoAgregar(Equipo).iniciar();
                            if (RESPONSE) {
                                await goto('/equipos');
                            }
                        }}>
                        <Icon style="margin-right: 5px" icon="fluent:save-16-filled" />
                        Agregar</button>
                {:else}
                    <button
                        class="button is-success is-outlined"
                        onclick={async () => {
                            const RESPONSE = await new UsoCasoEditar(Equipo).iniciar();
                            if (RESPONSE) {
                                await goto('/equipos');
                            }
                        }}>
                        <Icon style="margin-right: 5px" icon="fluent:save-16-filled" />
                        Actualizar</button>
                {/if}
            </div>
        </div>
    </div>
</div>
