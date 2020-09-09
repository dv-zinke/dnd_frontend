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
    import Cookie from 'js-cookie';

    export default {
        name: 'App',

        components: {BottomNav},

        data() {
            return {
                isLoad: false
            }
        },
        mounted() {
            this.getToken();
            this.getContent();
        },
        methods: {
            getToken(){
                const token = Cookie.get('token');
                if (typeof token === 'undefined') {
                    return
                } else {
                    let jwt = require('jsonwebtoken');
                    let decoded = jwt.decode(token);
                    let user = JSON.parse(decoded.user);
                    this.$store.commit('setUser', user.info);

                }

            },
            getContent() {
                setTimeout(()=>{
                    this.isLoad = true;
                }, 1000)
            }
        },
    };
</script>

<style scoped lang="scss">
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
