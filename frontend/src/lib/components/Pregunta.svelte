<script lang="ts">
    import type { TEntityMain } from '$lib/core/preguntas/Domain/EntityMain.js';
    interface Props {
        pregunta: TEntityMain;
        respuesta: string;
    }
    let { pregunta, respuesta = $bindable() }: Props = $props();
</script>

<div class="pregunta">
    <p class="pregunta__label">Pregunta actual</p>
    <h2>{pregunta.nombre}</h2>
    <p class="pregunta__help">Elige la alternativa que consideres correcta.</p>
    <div class="respuestas">
        {#each pregunta.respuestas as Respuesta (Respuesta.id)}
            {@const uniqueId = `P${pregunta.id}_R${Respuesta.id}`}
            <div class="respuesta">
                <input type="radio" id={uniqueId} value={uniqueId} bind:group={respuesta} />
                <label for={uniqueId}>
                    <span class="respuesta__marker"></span>
                    {Respuesta.nombre}
                </label>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .pregunta {
        margin-top: 2.25rem;

        h2 {
            margin: 0;
            color: var(--aliss-ink);
            font-size: clamp(1.25rem, 3vw, 1.65rem);
            line-height: 1.35;
        }

        .pregunta__label {
            margin-bottom: 0.5rem;
            color: var(--aliss-red);
            font-size: 0.75rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        .pregunta__help {
            margin: 0.6rem 0 0;
            color: var(--aliss-slate);
        }

        .respuestas {
            display: grid;
            gap: 0.75rem;
            margin-top: 1.75rem;
            width: 100%;

            .respuesta {
                position: relative;

                input {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    opacity: 0;
                }

                label {
                    display: flex;
                    align-items: center;
                    gap: 0.85rem;
                    min-height: 4rem;
                    padding: 1rem 1.1rem;
                    color: var(--aliss-ink);
                    border: 1px solid var(--aliss-border);
                    border-radius: 0.75rem;
                    cursor: pointer;
                    font-weight: 600;
                    transition:
                        border-color 0.16s ease,
                        background 0.16s ease,
                        transform 0.16s ease;
                }

                label:hover {
                    background: #f3f9fa;
                    border-color: var(--aliss-slate);
                    transform: translateY(-1px);
                }

                input:focus-visible + label {
                    outline: 3px solid rgba(227, 181, 5, 0.45);
                    outline-offset: 2px;
                }

                input:checked + label {
                    color: var(--aliss-navy);
                    background: #fff9df;
                    border-color: var(--aliss-navy);
                    box-shadow: inset 4px 0 0 var(--aliss-gold);
                }

                input:checked + label .respuesta__marker {
                    border-color: var(--aliss-navy);
                    box-shadow: inset 0 0 0 4px #fff9df;
                    background: var(--aliss-navy);
                }
            }

            .respuesta__marker {
                display: block;
                width: 1.2rem;
                height: 1.2rem;
                flex: 0 0 1.2rem;
                border: 2px solid var(--aliss-slate);
                border-radius: 50%;
            }
        }
    }
</style>
