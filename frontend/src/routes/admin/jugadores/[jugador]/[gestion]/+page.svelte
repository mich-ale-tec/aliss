<script lang="ts">
    import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
    import Icon from '@iconify/svelte';
    import { page } from '$app/state';
    import { crearJugadorPorDefecto } from '$lib/core/Jugador/Utils/crearObjetos.js';
    import CJugador from '$lib/core/Jugador/Application/CJugador.js';
    import { goto } from '$app/navigation';
    import UsoCasoAgregar from '$lib/core/Jugador/Application/UsoCasoAgregar.js';
    import UsoCasoEditar from '$lib/core/Jugador/Application/UsoCasoEditar.js';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';

    type TKey = keyof TJugador;
    type TLabel = string;

    let jugador = page.params.jugador;
    let accion = page.params.gestion.toUpperCase();
    let equipo = page.url.searchParams.get('equipo');
    let Jugador: TJugador = $state(crearJugadorPorDefecto());
    let Equipos: TEquipo[] = $state([]);

    $effect(() => {
        if (accion === 'EDITAR') {
            CJugador.obtenerJugador(jugador).then((jugador: TJugador) => {
                Jugador = jugador;
            });
        }
        if (accion === 'NUEVO' && equipo) {
            Jugador.Equipo = parseInt(equipo);
        }
        CEquipo.obtenerEquipos().then(equipos => {
            Equipos = equipos;
        });
    });
    const crearNombre = (): string => {
        const { ApellidoPaterno, ApellidoMaterno, Nombres } = Jugador;
        const apellidos = [ApellidoPaterno, ApellidoMaterno].filter(Boolean).join(' ');
        const nombres = Nombres ?? '';
        if (apellidos && nombres) return `${apellidos}, ${nombres}`;
        if (apellidos) return apellidos;
        if (nombres) return nombres;
        return '';
    };
</script>

{#snippet input(jugador: TJugador, key: TKey, label: TLabel)}
    {@const id = `J${jugador.Codigo}:${key}`}
    <label for={id} class="label">{label}</label>
    <div class="control">
        <input class="input" {id} type="text" bind:value={jugador[key]} />
    </div>
{/snippet}

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        {#if equipo}
            <li><a href="/admin/equipos">Equipos</a></li>
            <li><a href="/admin/equipos/{equipo}">Equipo</a></li>
        {:else}
            <li><a href="/admin/jugadores">Jugadores</a></li>
        {/if}
        <li class="is-active">
            <a href="/admin/jugadores/jugador" aria-current="page"
                >{accion === 'NUEVO' ? 'Nuevo' : 'Editar'}</a>
        </li>
    </ul>
</nav>

<div class="columns">
    <div class="column is-half is-offset-one-quarter">
        <h1 class="title is-4">
            {crearNombre()}
        </h1>
        <div class="field">
            <label for="selectEquipo" class="label">Equipos</label>
            <div class="select">
                <select
                    id="selectEquipo"
                    disabled={accion === 'EDITAR' || Boolean(equipo)}
                    bind:value={Jugador.Equipo}>
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
            {@render input(Jugador, 'Numero', 'Número')}
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
                {#if accion === 'NUEVO'}
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
                {:else}
                    <button
                        class="button is-success is-outlined"
                        onclick={async () => {
                            const RESPONSE = await new UsoCasoEditar(Jugador).iniciar();
                            if (RESPONSE) {
                                await goto(equipo ? `/admin/equipos/${equipo}` : '/admin/jugadores');
                            }
                        }}>
                        <Icon style="margin-right: 5px" icon="fluent:save-16-filled" />
                        Actualizar</button>
                {/if}
            </div>
        </div>
    </div>
</div>
