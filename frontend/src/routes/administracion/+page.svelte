<script lang="ts">
    import Icon from '@iconify/svelte';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import type { IModificarEquipo } from '$lib/core/Equipo/Domain/IModificarEquipo.js';
    import EquipoComponent from '$lib/components/Equipo.svelte';

    let Equipos: Array<TEquipo> = $state([]);
    let Equipo: TEquipo = $state({
        Index: 0,
        Codigo: 0,
        Nombre: '',
        Breve: '',
        Descripcion: '',
        Jugadores: [],
        Logo: '',
    });
    // Runas Props
    const Props: IModificarEquipo = {
        obtenerEquipos: (equipos: Array<TEquipo>) => (Equipos = equipos),
        establecerEquipo: (equipo: TEquipo) => (Equipo = equipo),
    };
    $effect(() => {
        CEquipo.obtenerEquipos(Props);
    });
    const cambiarEquipo = (codigo: number) => {
        const EQUIPO = Equipos.find(e => e.Codigo === codigo);
        if (!EQUIPO) return;
        Equipo = EQUIPO;
    };
</script>

<div class="container mt-6">
    <section class="hero is-link">
        <div class="hero-body">
            <p class="title">Administración</p>
            <p class="subtitle">Equipos Y Jugadores</p>
        </div>
    </section>
    {#if Equipos.length > 0}
        <div class="tabs is-boxed mt-5">
            <ul>
                {#each Equipos as equipo}
                    <li
                        class={Equipo.Index === equipo.Index ? 'is-active' : ''}
                        onclick={() => {
                            cambiarEquipo(equipo.Codigo);
                        }}>
                        <a>
                            <span class="icon is-small"><Icon icon="guidance:stadium" /></span>
                            <span>{equipo.Nombre}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
        <EquipoComponent equipo={Equipo} />
    {/if}
</div>
