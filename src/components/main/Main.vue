<template>
    <div>
        <main-top-content/>
        <main-content/>
    </div>
</template>

<script>
    import MainContent from "./MainContent";
    import MainTopContent from "./MainTopContent";
    export default {
        name: "Main",
        components: {MainTopContent, MainContent}
    }
</script>

<style scoped>


</style>
