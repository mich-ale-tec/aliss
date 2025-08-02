<script lang="ts">
    import { page } from '$app/state';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import crearObjeto from '$lib/core/Equipo/Utils/crearObjeto.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import Icon from '@iconify/svelte';
    import UsoCasoAgregar from '$lib/core/Equipo/Application/UsoCasoAgregar.js';
    import { goto } from '$app/navigation';
    import UsoCasoEditar from '$lib/core/Equipo/Application/UsoCasoEditar.js';

    type TKey = keyof TEquipo;
    type TLabel = string;

    let equipo = page.params.equipo;
    let accion = page.params.gestion.toUpperCase();
    let Equipo: TEquipo = $state(crearObjeto());

    $effect(() => {
        if (accion === 'EDITAR') {
            CEquipo.obtenerEquipo(equipo).then((equipo: TEquipo) => {
                Equipo = equipo;
            });
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

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li><a href="/admin/equipos">Equipos</a></li>
        <li class="is-active">
            <a href="/admin/equipos/equipo" aria-current="page">{accion === 'NUEVO' ? 'Nuevo' : 'Editar'}</a>
        </li>
    </ul>
</nav>

<div class="columns">
    <div class="column is-half is-offset-one-quarter">
        <h1 class="title is-4">{Equipo.Nombre}</h1>
        {#if accion === 'NUEVO'}
            <div class="field">
                {@render input(Equipo, 'Nombre', 'Nombre')}
            </div>
        {/if}
        <div class="field">
            {@render input(Equipo, 'Breve', 'Breve')}
        </div>
        <div class="field">
            {@render input(Equipo, 'Descripcion', 'Descripción')}
        </div>
        <div class="field">
            {@render input(Equipo, 'Entrenador', 'Entrenador')}
        </div>
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

        <div class="field is-grouped mt-5">
            <div class="control">
                {#if accion === 'NUEVO'}
                    <button
                        class="button is-success is-outlined"
                        onclick={async () => {
                            const RESPONSE = await new UsoCasoAgregar(Equipo).iniciar();
                            if (RESPONSE) {
                                await goto('/admin/equipos');
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
                                await goto('/admin/equipos');
                            }
                        }}>
                        <Icon style="margin-right: 5px" icon="fluent:save-16-filled" />
                        Actualizar</button>
                {/if}
            </div>
        </div>
    </div>
</div>
