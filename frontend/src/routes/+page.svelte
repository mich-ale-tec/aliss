<script lang="ts">
    import { PUBLIC_URL_BACKEND } from '$env/static/public';
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        window.localStorage.setItem('URL_BACKEND', PUBLIC_URL_BACKEND);
    });
</script>

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
        color: white;
        background-color: #725752;
    }
</style>
