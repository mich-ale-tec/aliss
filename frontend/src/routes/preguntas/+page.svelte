<script lang="ts">
    import type { TEntityMain } from '$lib/preguntas/Domain/EntityMain.js';
    export let data: {
        preguntas: Array<TEntityMain>;
    };
</script>

<div class="contenedor">
    <h1 class="titulo">Pregunta 1</h1>
    <div class="respuestas">
        <ul>
            {#each data.preguntas as pregunta}
                <div>
                    <input
                        type="checkbox"
                        id={pregunta.id}
                        name={pregunta.id} />
                    <label for={pregunta.id}>Respuesta {pregunta.id}</label>
                </div>
            {/each}
        </ul>
    </div>
    <button>Siguiente</button>
</div>
