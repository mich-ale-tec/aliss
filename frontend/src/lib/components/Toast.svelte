<script lang="ts">
    import type { TToastStore, TToastTipo } from '../../store/ToastStore.js';
    import Icon from '@iconify/svelte';

    interface Props {
        toast: TToastStore;
    }
    let { toast }: Props = $props();
    const tipo: Record<TToastTipo, string> = {
        info: 'is-link',
        success: 'is-success',
        danger: 'is-danger',
        warning: 'is-warning',
    };
</script>

<div class="notification toast {tipo[toast.Tipo]}">
    <Icon icon={toast.Icono} width="30" />
    <p>{toast.Texto}</p>
</div>

<style lang="scss">
    .toast {
        top: 0;
        right: 0;
        width: fit-content;
        margin-top: 20px;
        margin-right: auto;
        margin-left: auto;
        position: absolute;
        z-index: 9999;
        display: flex;
        border-radius: 10px 0 0 10px;
        align-items: center;
        p {
            display: inline-block;
            margin-left: 10px;
        }
    }
</style>
