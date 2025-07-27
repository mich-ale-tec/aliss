<script lang="ts">
    interface Props {
        resultado: {
            Correctas: number;
            Incorrectas: number;
        };
    }
    import Icon from '@iconify/svelte';
    let { resultado }: Props = $props();
    const TOTAL = resultado.Correctas + resultado.Incorrectas;
    const PORCENTAJE = Math.floor((resultado.Correctas * 100) / TOTAL);
    const MSG_MOTIVACION = PORCENTAJE > 40 ? '¡Bien Hecho!' : '¡Sigue intentando!';
</script>

<div class="contenedor">
    <Icon icon="noto:trophy" width="128" height="128" />
    <h2 class="title is-4 mt-2">¡Quizz Completado!</h2>
    <h4 class="resultado-text subtitle is-1">
        {resultado.Correctas}/{TOTAL}
    </h4>
    <h5 class="subtitle is-5">{PORCENTAJE}% de respuestas correctas</h5>
    <h2 class="title is-5 mt-4">
        {MSG_MOTIVACION}
        {#if PORCENTAJE > 40}
            <Icon icon="noto:star-struck" />
        {:else}
            <Icon icon="noto:thinking-face" />
        {/if}
    </h2>
</div>

<style lang="scss">
    .contenedor {
        margin-right: auto;
        margin-left: auto;
        width: fit-content;
        padding: 40px;
        border: 1px solid rgba(114, 87, 82, 0.3);
        border-radius: 10px;
        .resultado-text {
            margin-top: 20px;
            color: #725752;
            font-weight: bolder;
        }
    }
</style>
