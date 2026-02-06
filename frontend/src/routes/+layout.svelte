<script lang="ts">
    import Toast from '$lib/components/Toast.svelte';
    let { children } = $props();
    import { toast } from '../store/ToastStore.js';
</script>

{#if $toast.Mostrar}
    <Toast toast={$toast} />
{/if}

<div class="container-fluid mb-6">
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
