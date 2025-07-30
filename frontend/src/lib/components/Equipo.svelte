<script lang="ts">
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import type { TJugador } from '$lib/core/Equipo/Domain/TJugador.js';
    import type { IModificarJugadores } from '$lib/core/Jugador/Domain/IModificarEquipo.js';
    import Icon from '@iconify/svelte';
    import PerfilComponent from '$lib/components/Perfil.svelte';
    import { crearJugadorPorDefecto } from '$lib/core/Jugador/Utils/crearObjetos.js';

    interface Props {
        equipo: TEquipo;
    }
    let { equipo }: Props = $props();
    let Jugadores: Array<TJugador> = $state([]);
    let Perfil: boolean = $state(false);
    let Jugador: TJugador = $state(crearJugadorPorDefecto(equipo));
    let Guardar: boolean = $state(false);
    // Runas Props
    const PropsRunas: IModificarJugadores = {
        obtenerJugadores: (jugadores: Array<TJugador>) => (Jugadores = jugadores),
        agregarJugador: (jugador: TJugador) => {
            Jugadores.push(jugador);
            Jugador = crearJugadorPorDefecto(equipo);
            Perfil = false;
            Guardar = false;
        },
        modificarJugador: (jugador: TJugador) => {
            const JUGADOR = Jugadores.find(j => j.Codigo === jugador.Codigo);
            if (!JUGADOR) return;
            JUGADOR.ApellidoPaterno = jugador.ApellidoPaterno;
            JUGADOR.ApellidoMaterno = jugador.ApellidoMaterno;
            JUGADOR.Nombres = jugador.Nombres;
            JUGADOR.Numero = jugador.Numero;
            JUGADOR.Posicion = jugador.Posicion;
            JUGADOR.Edad = jugador.Edad;
            JUGADOR.Nacionalidad = jugador.Nacionalidad;
            Jugador = crearJugadorPorDefecto(equipo);
            Perfil = false;
        },
    };
    $effect(() => {
        const cEquipo = new CEquipo(equipo);
        cEquipo.obtenerJugadores(PropsRunas);
        Perfil = false;
    });
    const editarJugador = (codigo: number) => {
        const JUGADOR_ENCONTRADO = Jugadores.find(j => j.Codigo === codigo);
        if (!JUGADOR_ENCONTRADO) return;
        Jugador = JUGADOR_ENCONTRADO;
        Perfil = true;
    };
</script>

<figure class="image is-128x128 mt-6">
    <img class="img-logo" src={equipo.Logo} alt="logo" />
</figure>

<div class="mt-4">
    <h1 class="title is-3">{equipo.Nombre}</h1>
    <h2 class="subtitle is-4">{equipo.Descripcion}</h2>
</div>

<div class="card mt-5 indicadores">
    <div class="card-content">
        <div class="media">
            <div class="media-content">
                <p class="title is-5">Jugadores</p>
                <p class="subtitle is-6">{Jugadores.length > 0 ? Jugadores.length : 0}</p>
            </div>
        </div>
    </div>
</div>

<div class="columns">
    <div class="column is-8">
        <table class="table">
            <thead>
                <tr>
                    <th><abbr title="Numero">#</abbr></th>
                    <th>Jugadores</th>
                    <th>Posición</th>
                    <th>Edad</th>
                    <th>Nacionalidad</th>
                    <th>Editar</th>
                </tr>
            </thead>
            {#if Jugadores.length > 0}
                <tbody>
                    {#each Jugadores as jugador}
                        <tr>
                            <th>{jugador.Numero}</th>
                            <td
                                >{jugador.ApellidoPaterno}
                                {jugador.ApellidoMaterno}, {jugador.Nombres}</td>
                            <td>{jugador.Posicion}</td>
                            <td>{jugador.Edad}</td>
                            <td>{jugador.Nacionalidad}</td>
                            <td class="has-text-centered"
                                ><button
                                    class="button"
                                    onclick={() => {
                                        editarJugador(jugador.Codigo);
                                    }}><Icon icon="fluent:edit-20-filled" /></button
                                ></td>
                        </tr>
                    {/each}
                </tbody>
            {/if}
        </table>
        <div class="field is-grouped">
            <div class="control">
                <button
                    class="button is-success is-outlined"
                    onclick={() => {
                        Jugador = crearJugadorPorDefecto(equipo);
                        Perfil = true;
                        Guardar = true;
                    }}>
                    <Icon icon="mdi:plus-outline" style="margin-right: 5px" />
                    Agregar</button>
            </div>
        </div>
    </div>
    {#if Perfil}
        <div class="column is-4">
            <PerfilComponent jugador={Jugador} propsRunas={PropsRunas} guardar={Guardar} />
        </div>
    {/if}
</div>

<style lang="scss">
    .indicadores {
        width: fit-content;
        text-align: center;
    }
    .img-logo {
        height: 128px;
        width: auto;
    }
</style>
