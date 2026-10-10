<script>
    import MenuItem from '$lib/components/MenuItem.svelte';
    import Icon from '@iconify/svelte';
</script>

<div class="menu">
    <nav class="navbar" aria-label="main navigation">
        <div class="navbar-menu">
            <div class="navbar-start">
                <MenuItem />
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <button class="button is-white"><Icon icon="akar-icons:gear" width="30" /></button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</div>

<style lang="scss">
    @use '_variable' as *;
    .menu {
        padding: $sp-8 $sp-32;
        .navbar {
            .navbar-menu {
                .navbar-start {
                    align-items: center;
                }
                .navbar-end {
                    .navbar-item {
                        .buttons {
                            .button {
                                color: $color-gray-500;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
