<script lang="ts">
    import type { TJugador } from '$lib/core/Equipo/Domain/TJugador.js';
    import UsoCasoEditar from '$lib/core/Jugador/Application/UsoCasoEditar.js';
    import type { IModificarJugadores } from '$lib/core/Jugador/Domain/IModificarEquipo.js';
    import Icon from '@iconify/svelte';
    import UsoCasoAgregar from '$lib/core/Jugador/Application/UsoCasoAgregar.js';

    type TKey = keyof TJugador;
    type TLabel = string;

    interface Props {
        jugador: TJugador;
        propsRunas: IModificarJugadores;
        guardar: boolean;
    }
    let { jugador, propsRunas, guardar }: Props = $props();
</script>

<h1 class="title is-4">{jugador.ApellidoPaterno} {jugador.ApellidoMaterno}, {jugador.Nombres}</h1>
{#snippet input(jugador: TJugador, key: TKey, label: TLabel)}
    {@const id = `J${jugador.Codigo}:${key}`}
    <label for={id} class="label">{label}</label>
    <div class="control">
        <input class="input" {id} type="text" bind:value={jugador[key]} />
    </div>
{/snippet}
<div class="field">
    {@render input(jugador, 'Numero', 'Número')}
</div>
<div class="field">
    {@render input(jugador, 'ApellidoPaterno', 'Apellido Paterno')}
</div>
<div class="field">
    {@render input(jugador, 'ApellidoMaterno', 'Apellido Materno')}
</div>
<div class="field">
    {@render input(jugador, 'Nombres', 'Nombres')}
</div>
<div class="field">
    {@render input(jugador, 'Posicion', 'Posicion')}
</div>
<div class="field">
    {@render input(jugador, 'Edad', 'Edad')}
</div>
<div class="field">
    {@render input(jugador, 'Nacionalidad', 'Nacionalidad')}
</div>
<div class="field is-grouped">
    <div class="control">
        {#if guardar}
            <button
                class="button is-success is-outlined"
                onclick={async () => await new UsoCasoAgregar(jugador).iniciar(propsRunas)}>
                <Icon style="margin-right: 5px" icon="fluent:save-16-filled" />
                Agregar</button>
        {:else}
            <button
                class="button is-success is-outlined"
                onclick={async () => await new UsoCasoEditar(jugador).iniciar(propsRunas)}>
                <Icon style="margin-right: 5px" icon="fluent:save-16-filled" />
                Actualizar</button>
        {/if}
    </div>
</div>
