<script lang="ts">
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';

    interface Props {
        equipo: TEquipo;
        nuevo: boolean;
    }
    let { nuevo, equipo }: Props = $props();
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li><a href="/admin/equipos">Equipos</a></li>
        <li class="is-active"><a href="/admin/equipos/equipo" aria-current="page">Equipo</a></li>
    </ul>
</nav>
