<template>
    <div>
        <category :title="getTitle"/>
    </div>
</template>

<script>
    import Category from "../components/category/Category";
    export default {
        name: "CategoryPage",
        components: {Category},

        created() {

        },
        computed: {
            getTitle() {
                return this.$route.query.title;
            }
        },
    }
</script>

<style scoped>

</style>
