<script lang="ts">
    import Toast from '$lib/components/Toast.svelte';
    let { children } = $props();
    import { toast } from '../store/ToastStore.js';
    import '../assets/style/index.scss';
    import '../assets/style/theme.scss';
</script>

{#if $toast.Mostrar}
    <Toast toast={$toast} />
{/if}

<div class="container-fluid mb-6">
    {@render children()}
</div>
