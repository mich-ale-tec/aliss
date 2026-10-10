<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { TJugadorDashboard } from '$lib/core/Jugador/Domain/TJugador.js';
    import CJugador from '$lib/core/Jugador/Application/CJugador.js';
    import UsoCasoDarBaja from '$lib/core/Jugador/Application/UsoCasoDarBaja.js';
    import convertirJugadorDashAJugadorAPI from '$lib/core/Jugador/Utils/convertirEntity.js';
    import { obtenerLabelNombres } from '$lib/core/shared/Utils/convertirNombres.js';
    import { onMount } from 'svelte';
    import Pager from '$lib/components/Pager.svelte';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    import Ordenamiento from '$lib/components/Ordenamiento.svelte';

    let JugadoresCompletos: TJugadorDashboard[] = $state([]);
    const pedazo: number = 50;
    let paginaActual: number = $state(1);
    const Jugadores: TJugadorDashboard[] = $derived(
        JugadoresCompletos.slice((paginaActual - 1) * pedazo, paginaActual * pedazo),
    );

    const cambiarPaginaActual = (pagina: number) => {
        paginaActual = pagina;
    };
    const ordenarEstado = (valor: boolean) => {
        paginaActual = 1;
        let jugadoresOrdenados: TJugadorDashboard[] = [];
        for (const Jugador of JugadoresCompletos) {
            const esInactivo = Jugador.Status.IdStatus === 10;
            if (esInactivo) {
                if (valor) {
                    jugadoresOrdenados.unshift(Jugador);
                } else {
                    jugadoresOrdenados.push(Jugador);
                }
            } else {
                if (valor) {
                    jugadoresOrdenados.push(Jugador);
                } else {
                    jugadoresOrdenados.unshift(Jugador);
                }
            }
        }
        JugadoresCompletos = jugadoresOrdenados;
    };
    onMount(async () => {
        try {
            JugadoresCompletos = await CJugador.obtenerJugadoresDashboard();
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        }
    });
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li class="is-active"><a href="/admin/jugadores" aria-current="page">Jugadores</a></li>
    </ul>
</nav>
<div class="columns">
    <div class="column">
        <p class="title">Gestión de Jugadores</p>
        <p class="subtitle">Administra todos los jugadores de la Liga 1</p>
    </div>
    <div class="column col_acciones">
        <a href="/admin/jugadores/0/nuevo" class="button is-link">
            <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
            Agregar Jugador</a>
    </div>
</div>
<div class="container_jugadores">
    {#if Jugadores.length > 0}
        <Pager numeroRegistros={JugadoresCompletos.length} {pedazo} {cambiarPaginaActual} {paginaActual} />
        <table class="table is-hoverable is-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Jugador</th>
                    <th>Posición</th>
                    <th>Equipo</th>
                    <th><Ordenamiento texto="Estado" callback={ordenarEstado} /></th>
                    <th>Edad</th>
                    <th>Nacionalidad</th>
                    <th>Dar Baja</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {#each Jugadores as jugador (jugador.Codigo)}
                    <tr>
                        <td>{jugador.Numero}</td>
                        <td
                            ><a href="/admin/jugadores/{jugador.Codigo}?equipo={jugador.Equipo}"
                                >{obtenerLabelNombres(jugador)}</a
                            ></td>
                        <td>{jugador.Posicion}</td>
                        <td><a href="/admin/equipos/{jugador.Equipo}">{jugador.EquipoNombre}</a></td>
                        <td
                            ><span class="tag {jugador.Status.IdStatus === 1 ? 'is-primary' : 'is-danger'}"
                                >{jugador.Status.Status}</span
                            ></td>
                        <td class="has-text-centered">{jugador.Edad}</td>
                        <td class="has-text-centered">{jugador.Nacionalidad}</td>
                        <td
                            ><button
                                class="button is-danger"
                                onclick={async () => {
                                    const jugadorAPI = convertirJugadorDashAJugadorAPI(jugador);
                                    const RESPONSE = await new UsoCasoDarBaja(jugadorAPI).iniciar();
                                    if (RESPONSE) {
                                        JugadoresCompletos = JugadoresCompletos.filter(
                                            e => e.Codigo !== RESPONSE.Codigo,
                                        );
                                    }
                                }}
                                ><Icon
                                    icon="material-symbols-light:delete"
                                    width="19"
                                    color="white" /></button
                            ></td>
                        <td class="has-text-centered"
                            ><a class="button" href="/admin/jugadores/{jugador.Codigo}/editar"
                                ><Icon icon="fluent:edit-20-filled" color="black" /></a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <div class="estado_vacio">
            <div class="icono_vacio">
                <Icon
                    icon="fluent:people-team-16-filled"
                    width="64"
                    height="64"
                    class="has-text-grey-light" />
            </div>
            <p class="is-size-5 has-text-weight-semibold mt-4">Aún no hay jugadores registrados</p>
            <p class="has-text-grey mt-2 mb-4">
                Comienza registrando tu primer jugador para empezar a gestionar tus equipos.
            </p>
            <a href="/admin/equipos/0/nuevo" class="button is-link is-outlined">
                <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="20" height="20" />
                Registra mi primer jugador
            </a>
        </div>
    {/if}
</div>

<style lang="scss">
    .container_jugadores {
        padding: 1rem 2rem;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
    }
    .col_acciones {
        margin-top: auto;
        margin-bottom: auto;
        text-align: end;
    }
</style>
