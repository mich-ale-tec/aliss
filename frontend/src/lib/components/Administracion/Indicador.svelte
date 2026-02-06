<script lang="ts">
    import Icon from '@iconify/svelte';
    interface Props {
        icono: string;
        titulo: string;
        indicador: number;
    }
    let { icono, titulo, indicador }: Props = $props();
</script>

<div class="card card_indicador">
    <div class="card-content">
        <div class="media">
            <div class="media-content">
                <p class="subtitle is-6 mb-1">{titulo}</p>
                <p class="title is-4">{indicador}</p>
            </div>
            <div class="media-right ml-6">
                <Icon icon={icono} width="30" />
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .card_indicador {
        width: fit-content;
        margin-bottom: 0;
        box-shadow: none;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
    }
</style>
