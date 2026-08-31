<script lang="ts">
    interface Props {
        nroPregunta: number;
        nroPreguntas: number;
    }
    let { nroPreguntas, nroPregunta }: Props = $props();
    const porcentaje = $derived(Math.round(((nroPregunta + 1) / nroPreguntas) * 100));
</script>

<div class="quiz-progress">
    <div class="quiz-progress__labels">
        <span>Pregunta {nroPregunta + 1} de {nroPreguntas}</span>
        <strong>{porcentaje}% completado</strong>
    </div>
    <progress class="progress progress-preguntas" value={nroPregunta + 1} max={nroPreguntas}>
        {nroPregunta}
    </progress>
</div>

<style>
    .quiz-progress__labels {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.65rem;
        color: var(--aliss-slate);
        font-size: 0.875rem;
    }

    .quiz-progress__labels strong {
        color: var(--aliss-navy);
    }

    .progress-preguntas {
        --bulma-progress-value-background-color: var(--aliss-gold);
        --bulma-progress-bar-background-color: #e4ecef;
        height: 0.6rem;
    }
</style>
