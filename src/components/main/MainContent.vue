<template>
    <div class="content">
        <v-text-field
                label="궁금한 점을 해쉬태그로 검색하세요."
                outlined
                class="search_bar"
                color="gray"
        >
            <template v-slot:prepend-inner>
                <v-icon>mdi-magnify</v-icon>
            </template>
        </v-text-field>
        <main-content-category />
        <main-best-tip />
        <main-new-tip />

    </div>
</template>

<script>
    import MainContentCategory from "./content/MainContentCategory";
    import MainBestTip from "./content/MainBestTip";
    import MainNewTip from "./content/MainNewTip";
    export default {
        name: "MainContent",
        components: {MainNewTip, MainBestTip, MainContentCategory}
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
