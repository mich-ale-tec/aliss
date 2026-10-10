<script lang="ts">
    import Icon from '@iconify/svelte';
    import { page } from '$app/state';

    const links = [
        { label: 'Panel principal', href: '/', icon: 'solar:widget-5-bold' },
        { label: 'Equipos', href: '/equipos/lista', icon: 'solar:shield-bold' },
        { label: 'Jugadores', href: '/jugadores', icon: 'solar:users-group-rounded-bold' },
        { label: 'Torneos', href: '/torneos', icon: 'solar:cup-star-bold' },
        { label: 'Ligas', href: '/ligas', icon: 'tabler:tournament' },
    ];
</script>

<aside class="side-rail">
    <nav class="side-nav" aria-label="Navegación principal">
        {#each links as link}
            {@const active = page.url.pathname === link.href || page.url.pathname.startsWith(`${link.href}/`)}
            <a
                class="nav-link"
                class:active
                href={link.href}
                aria-label={link.label}
                aria-current={active ? 'page' : undefined}
                title={link.label}>
                <Icon icon={link.icon} width="21" height="21" aria-hidden="true" />
                <span class="tooltip" aria-hidden="true">{link.label}</span>
            </a>
        {/each}
    </nav>
</aside>

<style lang="scss">
    @use '_variable' as *;
    .side-rail {
        position: relative;
        display: grid;
        place-items: center;
        width: 70px;
        min-height: 342px;
        padding: 13px 0;
        border-radius: 0 34px 34px 0;
        background: linear-gradient(160deg, $color-primary-400 0%, $color-primary-500 100%);
        box-shadow: 8px 10px 28px rgba($color-primary-900, 0.18);
    }

    .side-nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
    }

    .nav-link {
        position: relative;
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        color: rgba($color-gray-0, 0.78);
        border-radius: 12px;
        transition:
            background-color 160ms ease,
            color 160ms ease,
            transform 160ms ease;

        &:hover,
        &:focus-visible {
            color: $color-gray-0;
            background: rgba($color-gray-0, 0.15);
            outline: none;
        }

        &:hover {
            transform: translateX(2px);
        }

        &.active {
            color: $color-primary-500;
            background: $color-gray-0;
            box-shadow: 0 5px 14px rgba($color-primary-900, 0.18);
        }
    }

    .tooltip {
        position: absolute;
        z-index: 99;
        left: calc(100% + 13px);
        padding: 7px 10px;
        color: $color-gray-800;
        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        background: $color-gray-0;
        border-radius: 6px;
        box-shadow: 0 4px 16px rgba($color-gray-900, 0.14);
        opacity: 0;
        pointer-events: none;
        transform: translateX(-3px);
        transition:
            opacity 140ms ease,
            transform 140ms ease;
    }

    .nav-link:hover .tooltip,
    .nav-link:focus-visible .tooltip {
        opacity: 1;
        transform: translateX(0);
    }

    @media (max-height: 430px) {
        .side-rail {
            min-height: auto;
            padding: 9px 0;
        }

        .side-nav {
            gap: 2px;
        }

        .nav-link {
            width: 36px;
            height: 36px;
        }
    }
</style>
