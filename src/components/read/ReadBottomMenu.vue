<template>
    <div class="bottom-menu">
        <div @click="likeClick" class="float-left">
            <v-icon

                    v-if="!isLike"
            >
                mdi-heart-outline
            </v-icon>
            <v-icon
                    v-else
                    color="red"
            >
                mdi-heart
            </v-icon>
        </div>


        <v-btn class="float-right" small @click="goHistory">
            히스토리 보기
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "ReadBottomMenu",
        props: {
            documentId: {
                required: true
            },
        },
        data() {
            return {
                isLike: false
            }
        },
        methods: {
            likeClick() {

                this.isLike = !this.isLike;
            },
            goHistory(){
                this.$router.push({path: '/history', query: {document_id: this.documentId.toString()}})
            }
        },
    }
</script>

<style scoped lang="scss">
    .bottom-menu {
        height:50px
    }
</style>
