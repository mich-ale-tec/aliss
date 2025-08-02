<script lang="ts">
    import { page } from '$app/state';
    import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
    import crearObjeto from '$lib/core/Equipo/Utils/crearObjeto.js';
    import CEquipo from '$lib/core/Equipo/Application/Equipo.js';

    let equipo = page.params.equipo;
    let Equipo: TEquipo = $state(crearObjeto());

    $effect(() => {
        CEquipo.obtenerEquipo(equipo).then((equipo: TEquipo) => {
            Equipo = equipo;
        });
    });
</script>
