<template>
    <v-app class="container">
        <v-main>
            <router-view />
        </v-main>
        <bottom-nav />
    </v-app>
</template>

<script>
    import BottomNav from "./components/BottomNav";
    export default {
        name: 'App',

        components: {BottomNav},

        data: () => ({
            //
        }),
    };
</script>

<style scoped>

    .container {
        width:400px !important;
        padding: 0px 20px 0px 20px !important;
        margin: auto;
        box-sizing: border-box;
    }
</style>
