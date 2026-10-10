<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { TLigaAPI } from '$lib/core/Liga/Domain/TLiga.js';
    import { onMount } from 'svelte';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    import CLiga from '$lib/core/Liga/Application/CLiga.js';

    let Ligas: TLigaAPI[] = $state([]);
    let cargando: boolean = $state(true);

    onMount(async () => {
        try {
            Ligas = await CLiga.obtenerLigas();
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
        } finally {
            cargando = false;
        }
    });
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li class="is-active"><a href="/admin/ligas" aria-current="page">Ligas</a></li>
    </ul>
</nav>

<div class="columns">
    <div class="column">
        <p class="title">Gestión de Ligas</p>
        <p class="subtitle">Administra todas las ligas</p>
    </div>
    <div class="column col_acciones">
        <a href="/admin/ligas/0/nuevo" class="button is-link">
            <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
            Agregar Liga</a>
    </div>
</div>

<div class="container_ligas">
    {#if cargando}
        <div class="estado_vacio">
            <Icon icon="line-md:loading-twotone-loop" width="48" height="48" class="has-text-grey-light" />
            <p class="mt-3 has-text-grey">Cargando ligas...</p>
        </div>
    {:else if Ligas.length > 0}
        <table class="table is-hoverable is-striped is-fullwidth">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Año</th>
                    <th class="has-text-centered">Editar</th>
                </tr>
            </thead>
            <tbody>
                {#each Ligas as liga (liga.Codigo)}
                    <tr>
                        <td><img class="img_logo" src={liga.Logo} alt="Logo de {liga.Nombre}" /></td>
                        <td class="is-vcentered"><a href="/admin/ligas/{liga.Codigo}">{liga.Nombre}</a></td>
                        <td class="is-vcentered">{liga.Descripcion}</td>
                        <td class="is-vcentered">{liga.Anio}</td>
                        <td class="has-text-centered is-vcentered">
                            <a class="button is-small is-light" href="/admin/ligas/{liga.Codigo}/editar">
                                <Icon icon="fluent:edit-20-filled" />
                            </a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <div class="estado_vacio">
            <div class="icono_vacio">
                <Icon icon="mingcute:trophy-line" width="64" height="64" class="has-text-grey-light" />
            </div>
            <p class="is-size-5 has-text-weight-semibold mt-4">Aún no hay ligas registradas</p>
            <p class="has-text-grey mt-2 mb-4">
                Comienza creando tu primera liga para empezar a gestionar tus torneos.
            </p>
            <a href="/admin/ligas/0/nuevo" class="button is-link is-outlined">
                <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="20" height="20" />
                Crear mi primera liga
            </a>
        </div>
    {/if}
</div>

<style lang="scss">
    .col_acciones {
        margin-top: auto;
        margin-bottom: auto;
        text-align: end;
    }

    .container_ligas {
        padding: 1.5rem 2rem;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
        background-color: white; /* Asegura un fondo blanco si el contenedor principal tiene otro color */
        min-height: 200px; /* Da un poco de altura para que el estado vacío no se vea tan aplastado */
        display: flex;
        flex-direction: column;

        table {
            width: 100%;
            margin-bottom: 0;
        }

        .img_logo {
            height: 32px;
            width: 32px;
            object-fit: contain;
            border-radius: 4px;
        }
    }
</style>
