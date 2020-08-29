<template>
    <div>
        <div>
            <main-top-content/>
            <main-content/>
        </div>

    </div>
</template>

<script>
    import MainContent from "./MainContent";
    import MainTopContent from "./MainTopContent";
    export default {
        name: "Main",
        components: {MainTopContent, MainContent},
        data() {
            return {
                isLoad: false
            }
        },
        mounted() {
            this.getContent();
        },
        methods: {

        },
    }
</script>

<style scoped>


</style>
