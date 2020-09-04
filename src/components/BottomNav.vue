<template>
    <div>
        <v-bottom-navigation
                :value="activeBtn"
                app
                class="bottom-nav"
                color="#3ad9ac"
                fixed
                width="400"
        >
            <v-btn to="/">
                <span>홈</span>
                <v-icon>mdi-home-outline</v-icon>
            </v-btn>

            <v-btn to="/community">
                <span>우리동네</span>
                <v-icon>mdi-emoticon-happy-outline</v-icon>
            </v-btn>

            <v-btn to="/map">
                <span>지도</span>
                <v-icon>mdi-map-marker-outline</v-icon>
            </v-btn>
            <v-btn to="/mypage">
                <span>마이페이지</span>
                <v-icon>mdi-account-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>

        <v-snackbar
                :top="true"
                v-model="modal"
        >
            준비중 입니다.

            <template v-slot:action="{ attrs }">
                <v-btn
                        @click="modal = false"
                        color="pink"
                        text
                        v-bind="attrs"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: "BottomNav",
        data() {
            return {
                activeBtn: null,
                modal: false
            }
        },
        mounted() {
        },
        methods: {
            getActive() {

            },
            openModal() {
                this.modal = true;
            }
        },
    }
</script>

<style scoped>
    .bottom-nav {
        margin: 0 auto;
        left: 0;
        right: 0;
        padding: 0;
        box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.2) !important;
    }
    .bottom-nav a {
        width : 50px !important;
        height: inherit !important;
        margin-right: 20px;
    }
</style>
