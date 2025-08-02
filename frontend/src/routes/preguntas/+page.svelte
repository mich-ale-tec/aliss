<script lang="ts">
    import type { TEntityMain } from '$lib/core/preguntas/Domain/EntityMain.js';
    import Pregunta from '$lib/components/Pregunta.svelte';
    import type { IModificarPregunta } from '$lib/core/preguntas/Domain/IModificarPregunta.js';
    import CPregunta from '$lib/core/preguntas/Application/Pregunta.js';
    import Icon from '@iconify/svelte';
    import Resultado from '$lib/components/Resultado.svelte';
    import Progress from '$lib/components/Progress.svelte';
    import UsoCasoAlmacenarResultado from '$lib/core/Respuesta/Application/UsoCasoAlmacenarResultado.js';

    const resultado = new UsoCasoAlmacenarResultado('1');
    // Variables
    const PREGUNTAS: TEntityMain[] = [];
    const NRO_PREGUNTA: number = 0;
    // const SE_TERMINO: boolean = resultado.existeResultado();
    const SE_TERMINO: boolean = false;
    const RESPUESTA: string = '';
    // State
    let Preguntas = $state(PREGUNTAS);
    let NroPregunta = $state(NRO_PREGUNTA);
    let SeTermino = $state(SE_TERMINO);
    let Respuesta = $state(RESPUESTA);
    // Clase
    const pregunta = new CPregunta(PREGUNTAS, NRO_PREGUNTA, RESPUESTA);
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
        {#await pregunta.validarRespuestas(resultado)}
            <h3>Cargando...</h3>
        {:then valor}
            <Resultado resultado={valor} />
        {/await}
    {:else if Preguntas.length > 0}
        <Progress nroPregunta={NroPregunta} nroPreguntas={Preguntas.length} />
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
        .btn-siguiente {
            color: white;
            background-color: #725752;
            margin-top: 30px;
        }
    }
</style>
