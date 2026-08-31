<script lang="ts">
    import Icon from '@iconify/svelte';
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/admin">Administración</a></li>
        <li class="is-active"><a href="/admin/torneos" aria-current="page">Torneos</a></li>
    </ul>
</nav>

<div class="columns">
    <div class="column">
        <p class="title">Gestión de Torneos</p>
        <p class="subtitle">Administra todas los torneos</p>
    </div>
    <div class="column col_acciones">
        <a href="/admin/torneos/0/nuevo" class="button is-link">
            <Icon icon="mingcute:plus-fill" style="margin-right: 5px" width="24" height="24" />
            Agregar Torneo</a>
    </div>
</div>

<style lang="scss">
    @use '../../../lib/styles//ElementoVacio.scss' as *;
    .col_acciones {
        margin-top: auto;
        margin-bottom: auto;
        text-align: end;
    }
</style>
