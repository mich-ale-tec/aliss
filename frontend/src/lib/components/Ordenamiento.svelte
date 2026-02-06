<script lang="ts">
    import Icon from '@iconify/svelte';
    interface Props {
        texto: string;
        callback: (valor: boolean) => void;
    }
    let { texto, callback }: Props = $props();

    let ascendente: boolean = $state(false);
</script>

<button
    class="ordenamiento"
    onclick={() => {
        callback(!ascendente);
        ascendente = !ascendente;
    }}>
    {texto}
    {#if ascendente === true}
        <Icon class="ml-1" icon="bx:up-arrow" width="18" height="16" />
    {:else}
        <Icon class="ml-1" icon="bx:down-arrow" width="16" height="16" />
    {/if}
</button>

<style lang="scss">
    .ordenamiento {
        display: flex;
        align-items: center;
        font-weight: bold;
    }
</style>
