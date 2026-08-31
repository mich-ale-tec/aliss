<script lang="ts">
    import type { TPathBreadcrumb } from '$lib/core/shared/Utils/breadcrumbPaths.js';

    interface PropsBreadcrumb {
        paths: TPathBreadcrumb[];
    }
    let { paths }: PropsBreadcrumb = $props();
</script>

<nav class="breadcrumb mt-6" aria-label="breadcrumbs">
    <ul>
        {#if Boolean(paths.length)}
            {#each paths as path, index (path.href)}
                {#if index !== paths.length - 1}
                    <li><a href={path.href}>{path.name}</a></li>
                {:else}
                    <li class="is-active"><a href={path.href} aria-current="page">{path.name}</a></li>
                {/if}
            {/each}
        {/if}
    </ul>
</nav>
