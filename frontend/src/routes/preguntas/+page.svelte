<script lang="ts">
    import type { TEntityMain } from '$lib/core/preguntas/Domain/EntityMain.js';
    import Pregunta from '$lib/components/Pregunta.svelte';
    import type { IModificarPregunta } from '$lib/core/preguntas/Domain/IModificarPregunta.js';
    import CPregunta from '$lib/core/preguntas/Application/Pregunta.js';
    import Icon from '@iconify/svelte';
    import Resultado from '$lib/components/Resultado.svelte';
    import Progress from '$lib/components/Progress.svelte';
    import Navbar from '$lib/components/Navbar.svelte';

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

<Navbar />
<main class="quiz-shell">
    <section class="quiz-heading">
        <div class="quiz-heading__icon"><Icon icon="solar:clipboard-check-bold" width="30" /></div>
        <div>
            <p class="quiz-heading__eyebrow">Módulo de evaluación</p>
            <h1>Evaluación de jugadores</h1>
            <p>Responde cada pregunta para registrar tu resultado diario.</p>
        </div>
    </section>

    {#if SeTermino}
        {#await pregunta.validarRespuestas()}
            <section class="quiz-panel quiz-loading">
                <Icon icon="line-md:loading-twotone-loop" width="42" />
                <p>Calculando resultado...</p>
            </section>
        {:then valor}
            <Resultado resultado={valor} />
        {/await}
    {:else if Preguntas.length > 0}
        <section class="quiz-panel">
            <Progress nroPregunta={NroPregunta} nroPreguntas={Preguntas.length} />
            {#key Preguntas[NroPregunta].id}
                <Pregunta pregunta={Preguntas[NroPregunta]} bind:respuesta={Respuesta} />
                <div class="quiz-actions">
                    <span>Selecciona una alternativa para continuar</span>
                    <button
                        class="button btn-siguiente"
                        onclick={() => pregunta.UsoCasoSolicitarPreguntas(Props, Respuesta)}>
                        {NroPregunta + 1 < Preguntas.length ? 'Siguiente' : 'Finalizar evaluación'}
                        <Icon icon="carbon:arrow-right" width="20" />
                    </button>
                </div>
            {/key}
        </section>
    {:else}
        <section class="quiz-panel quiz-loading">
            <Icon icon="line-md:loading-twotone-loop" width="42" />
            <p>Cargando preguntas...</p>
        </section>
    {/if}
</main>

<style lang="scss">
    .quiz-shell {
        width: min(100% - 2rem, 860px);
        margin: 3rem auto;
    }

    .quiz-heading {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        h1 {
            margin: 0;
            color: var(--aliss-navy);
            font-size: clamp(1.6rem, 4vw, 2.25rem);
            font-weight: 750;
        }

        p {
            margin: 0.25rem 0 0;
            color: var(--aliss-slate);
        }
    }

    .quiz-heading__icon {
        display: grid;
        width: 3.5rem;
        height: 3.5rem;
        place-items: center;
        color: var(--aliss-ink);
        background: #fff1b8;
        border-radius: 0.85rem;
    }

    .quiz-heading__eyebrow {
        color: var(--aliss-red) !important;
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .quiz-panel {
        padding: clamp(1.25rem, 4vw, 2.5rem);
        background: var(--aliss-surface);
        border: 1px solid var(--aliss-border);
        border-top: 5px solid var(--aliss-gold);
        border-radius: 1rem;
        box-shadow: 0 12px 28px rgba(8, 76, 97, 0.1);
    }

    .quiz-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1.25rem;
        color: var(--aliss-slate);
        border-top: 1px solid var(--aliss-border);
        font-size: 0.875rem;
    }

    .btn-siguiente {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--aliss-ink);
        background: var(--aliss-gold);
        border: 0;
        font-weight: 750;

        &:hover,
        &:focus-visible {
            color: var(--aliss-ink);
            background: #c99f04;
        }
    }

    .quiz-loading {
        display: grid;
        min-height: 210px;
        place-content: center;
        gap: 0.75rem;
        color: var(--aliss-slate);
        text-align: center;
    }

    @media (max-width: 560px) {
        .quiz-shell {
            margin-top: 1.5rem;
        }

        .quiz-actions {
            align-items: stretch;
            flex-direction: column;
        }

        .btn-siguiente {
            justify-content: center;
        }
    }
</style>
