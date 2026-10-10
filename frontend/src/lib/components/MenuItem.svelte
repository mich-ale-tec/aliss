<script>
    import Icon from '@iconify/svelte';
</script>

<div class="menu-item">
    <Icon icon="akar-icons:dashboard" width="15" height="15" aria-hidden="true" />
    <a href="/">Dashboard</a>
</div>

<style lang="scss">
    @use '_variable.scss' as *;
    .menu-item {
        display: flex;
        align-items: end;
        gap: 5px;
        border-bottom: solid 2px $color-primary-500;
        padding-bottom: $sp-2;
        padding-left: 5px;
        padding-right: 5px;
        a {
            font-size: $fs-base;
            font-weight: $fw-semibold;
        }
    }
</style>
