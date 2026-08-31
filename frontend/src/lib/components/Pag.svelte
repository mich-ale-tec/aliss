<script lang="ts">
    interface Props {
        numeroRegistros: number;
        pedazo: number;
        paginaActual: number;
        cambiarPaginaActual: (pagina: number) => void;
    }
    let { numeroRegistros, pedazo, paginaActual, cambiarPaginaActual }: Props = $props();
    const numeroBotones = Math.ceil(numeroRegistros / pedazo);
    const arregloBotones: number[] = [];
    for (let i = 1; i <= numeroBotones; i++) {
        arregloBotones.push(i);
    }
</script>

<nav class="pagination" aria-label="Paginación">
    <!--    <a class="pagination-previous is-disabled" title="This is the first page">Previous</a>-->
    <!--    <a href="#" class="pagination-next">Next page</a>-->
    <ul class="pagination-list">
        {#each arregloBotones as numeroBoton (numeroBoton)}
            {#if paginaActual === numeroBoton}
                <li>
                    <button
                        class="pagination-link is-current"
                        aria-label="Pagina {numeroBoton}"
                        aria-current="page">{numeroBoton}</button>
                </li>
            {:else}
                <li>
                    <button
                        class="pagination-link"
                        aria-label="Ir {numeroBoton}"
                        onclick={() => cambiarPaginaActual(numeroBoton)}>{numeroBoton}</button>
                </li>
            {/if}
        {/each}
    </ul>
</nav>
