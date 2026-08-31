<script lang="ts">
    import Icon from '@iconify/svelte';
    import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />
<div class="container main">
    <h1 class="title is-1">Fuchibol</h1>
    <h2 class="subtitle is-3">¡El mejor quizz de la liga 1!</h2>
    <a class="button is-primary btn-preguntas" href="preguntas"
        ><Icon style="margin-right:5px" icon="solar:play-bold" /> Iniciar</a>
</div>

<style lang="scss">
    .container {
        &.main {
            margin-top: 200px;
            text-align: center;
        }
    }
    .btn-preguntas {
        color: var(--aliss-ink);
        background-color: var(--aliss-gold);
        border: 0;

        &:hover,
        &:focus-visible {
            color: var(--aliss-ink);
            background-color: #c99f04;
        }
    }
</style>
