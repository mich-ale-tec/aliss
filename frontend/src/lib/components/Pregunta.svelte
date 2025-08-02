<script lang="ts">
    import type { TEntityMain } from '$lib/core/preguntas/Domain/EntityMain.js';
    interface Props {
        pregunta: TEntityMain;
        respuesta: string;
    }
    let { pregunta, respuesta = $bindable() }: Props = $props();
</script>

<div class="pregunta">
    <h3 class="title is-3">{pregunta.nombre}</h3>
    <div class="respuestas">
        {#each pregunta.respuestas as Respuesta (Respuesta.id)}
            {@const uniqueId = `P${pregunta.id}_R${Respuesta.id}`}
            <div class="respuesta">
                <input type="radio" id={uniqueId} value={uniqueId} bind:group={respuesta} />
                <label for={uniqueId}>{Respuesta.nombre}</label>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .pregunta {
        text-align: center;
        .respuestas {
            margin-top: 50px;
            width: 100%;
            .respuesta {
                padding: 20px 25px;
                border: 1px solid rgba(114, 87, 82, 0.3);
                border-radius: 10px;
                margin: 15px 0;
                width: 100%;
                text-align: left;
                font-weight: lighter;
            }
        }
    }
</style>
