<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { TLigaAPI } from '$lib/core/Liga/Domain/TLiga.js';
    import { onMount } from 'svelte';
    import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
    import CLiga from '$lib/core/Liga/Application/CLiga.js';

    let Ligas: TLigaAPI[] = $state([]);

    onMount(async () => {
        try {
            Ligas = await CLiga.obtenerLigas();
        } catch (error) {
            ErrorPersonalizado.errorAPI(error);
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
    {#if Ligas.length > 0}
        <table class="table is-hoverable is-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Año</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {#each Ligas as liga (liga.Codigo)}
                    <tr>
                        <td><img class="img_logo" src={liga.Logo} alt="Logo" /></td>
                        <td><a href="/admin/ligas/{liga.Codigo}">{liga.Nombre}</a></td>
                        <td>{liga.Descripcion}</td>
                        <td>{liga.Anio}</td>
                        <td class="has-text-centered"
                            ><a class="button" href="/admin/ligas/{liga.Codigo}/editar"
                                ><Icon icon="fluent:edit-20-filled" /></a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>

<style lang="scss">
    .col_acciones {
        margin-top: auto;
        margin-bottom: auto;
        text-align: end;
    }
    .container_ligas {
        padding: 1rem 2rem;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
        .img_logo {
            height: 30px;
            width: auto;
        }
    }
</style>
