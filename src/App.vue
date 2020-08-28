<template>
    <v-app class="container">
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        components: {},

        data: () => ({
            //
        }),
    };
</script>

<style>
    .container {
        width:400px !important;
        padding: 20px !important;
        background: mediumaquamarine;
    }
</style>
