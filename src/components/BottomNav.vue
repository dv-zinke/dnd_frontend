<template>
    <div>
        <v-bottom-navigation
                :value="activeBtn"
                app
                class="bottom-nav"
                color="#3ad9ac"
                fixed
                width="360"
        >
            <v-btn>
                <span>홈</span>
                <v-icon>mdi-home-outline</v-icon>
            </v-btn>

            <v-btn>
                <span>우리동네</span>
                <v-icon>mdi-emoticon-happy-outline</v-icon>
            </v-btn>

            <v-btn>
                <span>지도</span>
                <v-icon>mdi-map-marker-outline</v-icon>
            </v-btn>
            <v-btn>
                <span>마이페이지</span>
                <v-icon>mdi-account-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script>
    export default {
        name: "BottomNav",
        data() {
            return {
                activeBtn: 1
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
    }
    .bottom-nav button {
        width : 50px !important;
        height: inherit !important;
        margin-right: 20px;
    }
</style>
