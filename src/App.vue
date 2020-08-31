<template>
    <v-app class="container">
        <div v-if="isLoad">
            <v-main>
                <router-view/>
            </v-main>
            <bottom-nav/>
        </div>
        <div v-else class="loading">
            <v-img src="@/assets/loading.png" width="100" class="loading_image"></v-img>
        </div>
    </v-app>
</template>

<script>
    import BottomNav from "./components/BottomNav";

    export default {
        name: 'App',

        components: {BottomNav},

        data() {
            return {
                isLoad: false
            }
        },
        mounted() {
            console.log("A");
            this.getContent();
        },
        methods: {
            getContent() {
                setTimeout(()=>{
                    this.isLoad = true;
                }, 1000)
            }
        },
    };
</script>

<style scoped>

    .container {
        width: 400px !important;
        padding: 0 !important;
        margin: auto;
        box-sizing: border-box;
    }
    .loading_image {
        margin: 250px auto;
    }
</style>
