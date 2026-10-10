<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { CardDashboard } from './types/Card.js';
    let { title, description, icon, path, link }: CardDashboard = $props();
</script>

<div class="card">
    <div class="card-content">
        <div class="media">
            <div class="media-content has-text-centered">
                <p class="title is-4">{title}</p>
                <Icon {icon} width="45" />
            </div>
        </div>
        <div class="content has-text-centered">
            {description}
        </div>
        <div>
            <a href={path} class="button is-link is-outlined link">{link}</a>
        </div>
    </div>
</div>

<style lang="scss">
    @use '_variable.scss' as *;
    .card {
        max-width: 300px;
        min-width: 300px;
        margin-bottom: 0;
        box-shadow: none;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 1rem;
        margin-left: 0;
        padding: 0;
        .card-content {
            padding: $sp-16;
            .content {
                min-height: $sp-16;
                color: $color-gray-600;
                font-weight: $fw-light;
                font-size: $fs-15;
            }
        }
    }
    .link {
        width: 100%;
        font-weight: $fw-semibold;
    }
</style>
