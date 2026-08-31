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

<section class="resultado-card">
    <div class="resultado-card__icon">
        <Icon icon="solar:cup-star-bold" width="48" />
    </div>
    <p class="resultado-card__eyebrow">Evaluación completada</p>
    <h2>Resultado registrado</h2>
    <p class="resultado-card__description">Tu intento diario se ha guardado correctamente.</p>
    <div class="resultado-card__score">
        <strong>{resultado.Correctas}</strong>
        <span>de {TOTAL} respuestas correctas</span>
    </div>
    <div class="resultado-card__summary">
        <span>Precisión obtenida</span>
        <strong>{PORCENTAJE}%</strong>
    </div>
    <p class="resultado-card__message">
        {MSG_MOTIVACION}
        {#if PORCENTAJE > 40}
            <Icon icon="solar:star-bold" />
        {:else}
            <Icon icon="solar:lightbulb-bolt-bold" />
        {/if}
    </p>
</section>

<style lang="scss">
    .resultado-card {
        max-width: 34rem;
        margin: 0 auto;
        padding: clamp(1.75rem, 5vw, 3rem);
        text-align: center;
        background: var(--aliss-surface);
        border: 1px solid var(--aliss-border);
        border-radius: 1rem;
        box-shadow: 0 12px 28px rgba(8, 76, 97, 0.1);

        h2 {
            margin: 0.3rem 0;
            color: var(--aliss-navy);
            font-size: 1.75rem;
        }
    }

    .resultado-card__icon {
        display: grid;
        width: 5rem;
        height: 5rem;
        place-items: center;
        margin: 0 auto 1.25rem;
        color: var(--aliss-navy);
        background: #fff4c9;
        border-radius: 50%;
    }

    .resultado-card__eyebrow {
        margin: 0;
        color: var(--aliss-red);
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .resultado-card__description {
        margin: 0;
        color: var(--aliss-slate);
    }

    .resultado-card__score {
        display: grid;
        gap: 0.15rem;
        margin: 1.75rem 0;

        strong {
            color: var(--aliss-navy);
            font-size: 3.5rem;
            line-height: 1;
        }

        span {
            color: var(--aliss-slate);
        }
    }

    .resultado-card__summary {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        color: var(--aliss-slate);
        background: #f1f6f7;
        border-radius: 0.6rem;

        strong {
            color: var(--aliss-navy);
        }
    }

    .resultado-card__message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.45rem;
        margin: 1.5rem 0 0;
        color: var(--aliss-ink);
        font-weight: 700;
    }
</style>
