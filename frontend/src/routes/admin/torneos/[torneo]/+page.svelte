<script lang="ts">
    import { page } from '$app/state';
    import type { TTorneoAPI } from '$lib/core/Torneo/Domain/TTorneo.js';
    import { crearObjeto } from '$lib/core/Torneo/Utils/crearObjeto.js';
    import { onMount } from 'svelte';
    import CTorneo from '$lib/core/Torneo/Application/CTorneo.js';
    import Indicador from '$lib/components/Administracion/Indicador.svelte';

    let torneo = page.params.torneo;
    let Torneo: TTorneoAPI = $state(crearObjeto());
    let liga = $state(0);

    onMount(async () => {
        const resTorneo = await CTorneo.obtenerPorCodigo(torneo);
        if (resTorneo) {
            Torneo = resTorneo;
            liga = Torneo.Liga;
        }
    });
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li><a href="/admin/ligas/{liga}">Liga</a></li>
        <li class="is-active"><a href="/admin/torneos/torneo" aria-current="page">Torneo</a></li>
    </ul>
</nav>

<div class="card card_equipo">
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img class="img_logo" src={Torneo.Logo} alt="Logo" />
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-3">{Torneo.Nombre}</p>
                <p class="subtitle is-5">{Torneo.Descripcion}</p>
                <div class="columns">
                    <div class="column">
                        <p class="has-text-weight-semibold">Partidos</p>
                        <p>0</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold">Inicio</p>
                        <p>{Torneo.FechaInicio}</p>
                    </div>
                    <div class="column">
                        <p class="has-text-weight-semibold">Fin</p>
                        <p>{Torneo.FechaFin}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container_cards mb-6">
    <Indicador icono="arcticons:besoccer" titulo="Partidos" indicador={38} />
</div>

<style lang="scss">
    .card_equipo {
        box-shadow: none;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
        .img_logo {
            height: 64px;
            width: auto;
        }
    }
    .container_cards {
        margin-top: 3rem;
        display: flex;
        align-items: center;
        gap: 2rem;
    }
</style>
