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
    import WriteApi from "../api/WriteApi";
    import {mapState} from "vuex";
    import UserApi from "../api/UserApi";

    export default {
        name: "ReadBottomMenu",
        props: {
            documentId: {
                required: true
            },
        },
        data() {
            return {
                isLike: false,
                likes : ""
            }
        },
        mounted(){
            this.getUser();
        },
        methods: {
            getUser() {
              UserApi().getUser(this.user.id).then(res =>{
                  this.likes = res.data.likes;
                  this.isLike = this.likes.split(",").indexOf(""+this.documentId) > -1;
              })
            },
            likeClick() {
                if(this.isLike) {
                    const likes = this.likes.split(",").filter(like => like !== ""+this.documentId).join(",");

                    Promise.all([WriteApi().dislikeDocument(this.documentId), UserApi().saveLikes(this.user.id, {"likes":likes})])
                        .then(() =>{

                        });
                } else {
                    let likes;
                    if(this.likes) {
                        if(this.likes.split(",").indexOf(""+this.documentId) > -1) {
                            let filterArray = this.likes.split(",").filter(like => like !== ""+this.documentId);
                            filterArray.push(""+this.documentId);
                            likes = filterArray.join(",");
                        }
                        else {
                            likes = this.likes + `,${this.documentId}`
                        }

                    } else {
                        likes = ""+this.documentId
                    }
                    Promise.all([WriteApi().likeDocument(this.documentId), UserApi().saveLikes(this.user.id, {"likes":likes})])
                        .then(() =>{
                        });

                }

                this.isLike = !this.isLike;
            },
            goHistory(){
                this.$router.push({path: '/history', query: {document_id: this.documentId.toString()}})
            }
        },
        computed: {
            ...mapState({
                user: state => state.user
            })
        }
    }
</script>

<style scoped lang="scss">
    .bottom-menu {
        height:50px
    }
</style>
