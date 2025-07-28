<script lang="ts">
    import Toast from '$lib/components/Toast.svelte';
    let { children } = $props();
    import imgPelota from '../assets/img/fuchibol.jpg';
    import Icon from '@iconify/svelte';
    import { toast } from '../store/ToastStore.js';
</script>

{#if $toast.Mostrar}
    <Toast toast={$toast} />
{/if}
<nav class="navbar navbar_header" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/" aria-label="main navigation"></a>
        <img src={imgPelota} alt="Logo" width="100px" />
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <a href="/" class="navbar-item has-text-weight-bold"
                ><Icon icon="material-symbols:home-rounded" width="30" /> Inicio</a>
            <a href="/preguntas" class="navbar-item has-text-weight-bold"
                ><Icon icon="solar:book-bold" width="30" /> Quizz Jugadores</a>
        </div>
    </div>
</nav>

<div class="container">
    {@render children()}
</div>

<style lang="scss">
    .navbar_header {
        border-bottom: rgba(64, 70, 84, 0.2) 1px solid;
        .navbar-menu {
            .navbar-start {
                a:hover {
                    background-color: rgba(114, 87, 82, 0.2);
                }
            }
        }
    }
</style>
