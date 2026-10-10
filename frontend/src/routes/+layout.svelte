<script lang="ts">
    import Toast from '$lib/components/Toast.svelte';
    import { toast } from '../store/ToastStore.js';
    let { children } = $props();
    import '../assets/style/index.scss';
    import Menu from '$lib/layout/Menu.svelte';
    import Sidemenu from '$lib/layout/Sidemenu.svelte';
</script>

{#if $toast.Mostrar}
    <Toast toast={$toast} />
{/if}

<div class="page">
    <div class="sidemenu collapse">
        <Sidemenu />
    </div>
    <div class="main">
        <Menu />
        <div class="body">
            {@render children()}
        </div>
    </div>
</div>

<style lang="scss">
    @use '_variable.scss' as *;
    .page {
        display: grid;
        grid-template-columns: 70px 1fr;
        .sidemenu {
            display: flex;
            align-items: center;
            height: 100vh;
            padding: 0;
        }
        .main {
            display: grid;
            grid-template-rows: 70px 1fr;
            .body {
                padding: $sp-8 $sp-32;
            }
        }
    }
</style>
