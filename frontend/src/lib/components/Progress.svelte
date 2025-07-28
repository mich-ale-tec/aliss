<script lang="ts">
    interface Props {
        nroPregunta: number;
        nroPreguntas: number;
    }
    let { nroPreguntas, nroPregunta }: Props = $props();
</script>

<h5 class="subtitle is-5">Pregunta {nroPregunta + 1} de {nroPreguntas}</h5>
<progress class="progress progress-preguntas" value={nroPregunta + 1} max={nroPreguntas}>
    {nroPregunta}
</progress>

<style>
    .progress-preguntas {
        --bulma-progress-value-background-color: #725752;
    }
</style>
