<script lang="ts">
    import type { TEquipoDashboard } from '$lib/core/Equipo/Domain/TEquipo.js';
    import Icon from '@iconify/svelte';
    interface Props {
        equipos: TEquipoDashboard[];
    }
    let { equipos }: Props = $props();
</script>

<table class="table is-hoverable is-striped">
    <thead>
        <tr>
            <th></th>
            <th class="head">Equipo</th>
            <th class="head">Entrenador</th>
            <th class="head">Jugadores</th>
            <th class="head">Fundado</th>
            <th class="head"></th>
        </tr>
    </thead>
    <tbody>
        {#each equipos as equipo (equipo.Codigo)}
            <tr>
                <td class="cell"><img class="img_logo" src={equipo.Logo} alt="logo" /></td>
                <td class="cell"
                    ><span class="tag is-rounded"><a href="/equipos/{equipo.Codigo}">{equipo.Nombre}</a></span
                    ></td>
                <td class="cell">{equipo.Entrenador}</td>
                <td class="cell has-text-centered">{equipo.CantidadJugadores}</td>
                <td class="cell has-text-centered">{equipo.Fundado}</td>
                <td class="cell"
                    ><a class="button" href="/equipos/{equipo.Codigo}/editar"
                        ><Icon icon="fluent:edit-20-filled" color="black" width="16" /></a>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style lang="scss">
    @use '_variable' as *;
    .table {
        .head {
            font-size: $fs-md;
        }
        .cell {
            align-content: center;
            font-size: $fs-md;
            .tag {
                font-size: $fs-md;
            }
        }
        .img_logo {
            height: 30px;
            width: auto;
        }
    }
</style>
