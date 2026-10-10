<script lang="ts">
    import { page } from '$app/state';
    import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
    import { crearJugadorPorDefecto } from '$lib/core/Jugador/Utils/crearObjetos.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import CJugador from '$lib/core/Jugador/Application/CJugador.js';
    import { goto } from '$app/navigation';
    import Icon from '@iconify/svelte';
    import UsoCasoTransferir from '$lib/core/Jugador/Application/UsoCasoTransferir.js';
    import { onMount } from 'svelte';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';

    let equipo = page.url.searchParams.get('equipo');
    let jugador = page.params.jugador;
    let Jugador: TJugador = $state(crearJugadorPorDefecto());
    let Equipos: TEquipo[] = $state([]);
    let equipoTransferir: TJugador['Equipo'] = $state(0);

    onMount(async () => {
        try {
            Jugador = await CJugador.obtenerJugador(jugador);
            Equipos = await CEquipo.obtenerEquipos();
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        }
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
            <a href="/admin/jugadores/jugador" aria-current="page">Transferir</a>
        </li>
    </ul>
</nav>

<div class="columns">
    <div class="column is-half is-offset-one-quarter">
        <h1 class="title is-4">
            {crearNombre()}
        </h1>
        <div class="field">
            <label for="selectEquipo" class="label">Equipo</label>
            <div class="select">
                <select id="selectEquipo" disabled bind:value={Jugador.Equipo}>
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
        <label for="selectTransferir" class="label">Transferir a:</label>
        <div class="select">
            <select id="selectTransferir" bind:value={equipoTransferir}>
                {#if Equipos.length > 0}
                    {#each Equipos as Equipo (Equipo.Codigo)}
                        <option value={Equipo.Codigo}>{Equipo.Nombre}</option>
                    {/each}
                {/if}
            </select>
        </div>
        <div class="field is-grouped mt-5">
            <div class="control">
                <button
                    class="button is-success is-outlined"
                    onclick={async () => {
                        const RESPONSE = await new UsoCasoTransferir(Jugador).iniciar(
                            equipoTransferir.toString(),
                        );
                        if (RESPONSE) {
                            await goto(equipo ? `/admin/equipos/${equipo}` : '/admin/jugadores');
                        }
                    }}>
                    <Icon style="margin-right: 5px" icon="mingcute:transfer-fill" />
                    Transferir</button>
            </div>
        </div>
    </div>
</div>
