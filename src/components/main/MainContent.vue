<template>
    <div class="content">
        <main-search-bar />
        <main-content-category />
        <main-best-tip />
        <main-new-tip />

    </div>
</template>

<script>
    import MainContentCategory from "./content/MainContentCategory";
    import MainBestTip from "./content/MainBestTip";
    import MainNewTip from "./content/MainNewTip";
    import MainSearchBar from "./content/MainSearchBar";
    export default {
        name: "MainContent",
        components: {MainSearchBar, MainNewTip, MainBestTip, MainContentCategory},
        data() {
            return {
                isBestTipLoad: false,
                isNewTipLoad: false
            }
        },
        methods: {
            loaded() {

            }
        },
    }
</script>

<style lang="scss">
    .content {
        width: 100%;
        margin-top: -30px;
        border-radius: 25px;
        background: white;
        overflow: hidden;
        position: relative;
        .search_bar {
            border-radius: 25px;
            width: 90%;
            margin: 25px auto 0 auto;
        }
        .search_bar .v-icon {
            color:#3ad9ac;
        }
        .search_bar fieldset {
            border-color:#3ad9ac;
            border-width: 2px;
        }
    }



</style>
