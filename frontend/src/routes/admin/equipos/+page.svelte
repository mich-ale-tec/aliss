<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li class="is-active"><a href="/admin/equipo" aria-current="page">Equipo</a></li>
    </ul>
</nav>

<div class="columns">
    <div class="column">
        <p class="title">Gestión de Equipo</p>
        <p class="subtitle">Administra todos los equipos de la liga.</p>
    </div>
    <div class="column col_acciones">
        <button class="button is-link">
            <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
            Agregar Equipo</button>
    </div>
</div>

<div class="container_equipos">
    <p class="title is-5">Lista de equipos</p>
</div>

<style lang="scss">
    .container_equipos {
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
