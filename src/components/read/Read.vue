<template>
    <v-container>
        <v-container class="header">
            <v-icon @click="$router.go(-1)" class="close_btn">
                mdi-close
            </v-icon>
            <span>꿀팁</span>
            <v-btn
                   class="complete_btn"
                   color="success"
                   small
            >편집
            </v-btn>
        </v-container>
        <Viewer :initialValue="viewerText" height="400px"  />
        <comment />
    </v-container>
</template>

<script>

    import { Viewer } from '@toast-ui/vue-editor';
    import Comment from "./Comment";
    export default {
        name: "Read",
        components: {
            Comment,
            Viewer
        },
        data() {
            return {
                viewerText: '# This is Viewer.\n Hello World.'
            };
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    .header {
        position: relative;
        text-align: center;

        .close_btn {
            position: absolute;
            left: 10px;
            top: 10px;
        }

        .complete_btn {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }
</style>
