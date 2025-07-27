<script lang="ts">
    import type { TEntityMain } from '$lib/core/preguntas/Domain/EntityMain.js';
    import Pregunta from '$lib/components/Pregunta.svelte';
    import type { IModificarPregunta } from '$lib/core/preguntas/Domain/IModificarPregunta.js';
    import CPregunta from '$lib/core/preguntas/Application/Pregunta.js';
    import Icon from '@iconify/svelte';
    import Resultado from '$lib/components/Resultado.svelte';

    // Variables
    const PREGUNTAS: TEntityMain[] = [];
    const NRO_PREGUNTA: number = 0;
    const SE_TERMINO: boolean = false;
    const RESPUESTA: string = '';
    // State
    let Preguntas = $state(PREGUNTAS);
    let NroPregunta = $state(NRO_PREGUNTA);
    let SeTermino = $state(SE_TERMINO);
    let Respuesta = $state(RESPUESTA);
    // Clase
    const pregunta = new CPregunta(PREGUNTAS, SE_TERMINO, NRO_PREGUNTA, RESPUESTA);
    // Eventos Runas
    const Props: IModificarPregunta = {
        terminarCuestionario: () => (SeTermino = true),
        agregarPregunta: () => NroPregunta++,
        limpiarRespuesta: () => (Respuesta = ''),
        almacenarPreguntas: (preguntas: Array<TEntityMain>) => (Preguntas = preguntas),
    };
    $effect(() => {
        pregunta.obtenerPreguntas(Props);
    });
</script>

<div class="contenedor">
    {#if SeTermino}
        {#await pregunta.validarRespuestas()}
            <h3>Cargando...</h3>
        {:then valor}
            <Resultado resultado={valor} />
        {:catch error}
            <p>¡No pudimos validar tus respuestas! Lo sentimos</p>
        {/await}
    {:else if Preguntas.length > 0}
        <h5 class="subtitle is-5">Pregunta {NroPregunta + 1} de {Preguntas.length}</h5>
        <progress class="progress progress-preguntas" value={NroPregunta + 1} max={Preguntas.length}>
            {NroPregunta}
        </progress>
        {#key Preguntas[NroPregunta].id}
            <Pregunta pregunta={Preguntas[NroPregunta]} bind:respuesta={Respuesta} />
            <button
                class="button is-primary btn-siguiente"
                onclick={() => pregunta.UsoCasoSolicitarPreguntas(Props, Respuesta)}>
                <Icon icon="carbon:next-outline" width="25" style="margin-right:5px" />
                {NroPregunta + 1 < Preguntas.length ? 'Siguiente' : 'Terminar'}
            </button>
        {/key}
    {/if}
</div>

<style lang="scss">
    .contenedor {
        text-align: center;
        margin-top: 200px;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        .progress-preguntas {
            --bulma-progress-value-background-color: #725752;
        }
        .btn-siguiente {
            color: white;
            background-color: #725752;
            margin-top: 30px;
        }
    }
</style>
