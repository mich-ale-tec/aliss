<script lang="ts">
    import imgPelota from '../../assets/img/fuchibol.jpg';
    import Icon from '@iconify/svelte';
</script>

<nav class="navbar navbar_header" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/" aria-label="main navigation"></a>
        <img src={imgPelota} alt="Logo de Fuchibol" />
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <a href="/" class="navbar-item has-text-weight-bold"
                ><Icon icon="material-symbols:home-rounded" width="30" /> Inicio</a>
            <a href="/preguntas" class="navbar-item has-text-weight-bold"
                ><Icon icon="solar:book-bold" width="24" /> Evaluación</a>
            <a href="/admin" class="navbar-item has-text-weight-bold"
                ><Icon icon="solar:widget-5-bold" width="24" /> Administración</a>
        </div>
    </div>
</nav>
