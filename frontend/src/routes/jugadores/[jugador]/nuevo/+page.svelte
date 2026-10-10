<script lang="ts">
    import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
    import Icon from '@iconify/svelte';
    import { page } from '$app/state';
    import { crearJugadorPorDefecto } from '$lib/core/Jugador/Utils/crearObjetos.js';
    import { goto } from '$app/navigation';
    import UsoCasoAgregar from '$lib/core/Jugador/Application/UsoCasoAgregar.js';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import { obtenerLabelNombres } from '$lib/core/shared/Utils/convertirNombres.js';
    import { onMount } from 'svelte';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';

    type TKey = keyof TJugador;
    type TLabel = string;

    let equipo = page.url.searchParams.get('equipo');
    let Jugador: TJugador = $state(crearJugadorPorDefecto());
    let Equipos: TEquipo[] = $state([]);
    let inputNumero: HTMLInputElement | null = null;

    onMount(async () => {
        try {
            Equipos = await CEquipo.obtenerEquipos();
            if (equipo) {
                Jugador.Equipo = parseInt(equipo);
            }
            if (inputNumero) inputNumero.focus();
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        }
    });
</script>

{#snippet input(jugador: TJugador, key: TKey, label: TLabel)}
    {@const id = `J${jugador.Codigo}:${key}`}
    <label for={id} class="label">{label}</label>
    <div class="control">
        <input class="input" {id} type="text" bind:value={jugador[key]} />
    </div>
{/snippet}

<nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        {#if equipo}
            <li><a href="/equipos/lista">Equipos</a></li>
            <li><a href="/equipos/{equipo}">Equipo</a></li>
        {:else}
            <li><a href="/jugadores">Jugadores</a></li>
        {/if}
        <li class="is-active">
            <a href="/jugadores/jugador" aria-current="page">Nuevo</a>
        </li>
    </ul>
</nav>

<div class="columns">
    <div class="column">
        <h1 class="title is-4">
            {obtenerLabelNombres(Jugador)}
        </h1>
        <div class="field">
            <label for="selectEquipo" class="label">Equipos</label>
            <div class="select">
                <select id="selectEquipo" disabled={Boolean(equipo)} bind:value={Jugador.Equipo}>
                    {#if Equipos.length > 0}
                        {#each Equipos as Equipo (Equipo.Codigo)}
                            <option
                                selected={equipo ? parseInt(equipo) === Equipo.Codigo : false}
                                value={Equipo.Codigo}>{Equipo.Nombre}</option>
                        {/each}
                    {/if}
                </select>
            </div>
        </div>
        <div class="field">
            <label for={`J${Jugador.Codigo}:Numero`} class="label">Número</label>
            <div class="control">
                <input
                    class="input"
                    id={`J${Jugador.Codigo}:Numero`}
                    type="text"
                    bind:this={inputNumero}
                    bind:value={Jugador.Numero} />
            </div>
        </div>
        <div class="field">
            {@render input(Jugador, 'ApellidoPaterno', 'Apellido Paterno')}
        </div>
        <div class="field">
            {@render input(Jugador, 'ApellidoMaterno', 'Apellido Materno')}
        </div>
        <div class="field">
            {@render input(Jugador, 'Nombres', 'Nombres')}
        </div>
        <div class="field">
            {@render input(Jugador, 'Posicion', 'Posicion')}
        </div>
        <div class="field">
            {@render input(Jugador, 'Edad', 'Edad')}
        </div>
        <div class="field">
            {@render input(Jugador, 'Nacionalidad', 'Nacionalidad')}
        </div>

        <div class="field is-grouped mt-5">
            <div class="control">
                <button
                    class="button is-success is-outlined"
                    onclick={async () => {
                        const RESPONSE = await new UsoCasoAgregar(Jugador).iniciar();
                        if (RESPONSE) {
                            await goto(equipo ? `/admin/equipos/${equipo}` : '/admin/jugadores');
                        }
                    }}>
                    <Icon style="margin-right: 5px" icon="fluent:save-16-filled" />
                    Agregar</button>
            </div>
        </div>
    </div>
</div>
