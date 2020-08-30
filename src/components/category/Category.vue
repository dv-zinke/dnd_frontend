<template>
    <v-container>
        <v-icon @click="$router.go(-1)" class="back_btn">
            mdi-arrow-left
        </v-icon>
        <div class="header">
            <span>{{title}} 꿀팁</span>
        </div>
        <v-container>
            <div class="name">
                <div class="name_avatar">
                    <v-avatar color="indigo">
                        <v-icon dark>mdi-account-circle</v-icon>
                    </v-avatar>
                </div>
                <div class="name_text">
                    <span>{{name}}님,</span> <br>
                    <span>당신의 <span class="font-weight-bold">꿀팁을 공유</span>해주세요</span>
                </div>
            </div>

            <div class="write">
                <div @click="goWrite()">
                    <v-icon class="icon">
                        mdi-square-edit-outline
                    </v-icon>
                    <span>꿀팁 공유하러 가기</span>
                </div>
            </div>

            <v-container fluid>
                <v-row dense>
                    <v-col
                            v-for="card in cards"
                            :key="card.title"
                            :cols="card.flex"
                    >
                        <v-card
                                @click="goRead()"
                        >
                            <v-img
                                    :src="card.src"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="150px"
                            >
                                <v-card-title v-text="card.title"></v-card-title>
                            </v-img>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn icon>
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>

                                <v-btn icon>
                                    <v-icon>mdi-bookmark</v-icon>
                                </v-btn>

                                <v-btn icon>
                                    <v-icon>mdi-share-variant</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: "Category",
        props: {
            title: {
                type: String,
                required:true,
            },
            name: {
                type: String,
                required:true,
            }
        },
        data() {
            return {
                cards: [
                    { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
                    { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
                    { title: 'Best airlines1', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
                    { title: 'Best airlines2', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
                    { title: 'Best airlines3', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
                    { title: 'Best airlines4', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
                ],
            }
        },
        methods: {
            goWrite() {
                this.$router.push({name: 'Write'})
            },
            goRead() {
                this.$router.push({name: 'Read', query: {document_id: "2"}})
            }
        },
    }
</script>

<style scoped lang="scss">
    .back_btn {
        position: absolute;
        left: 10px;
        top: 10px;
    }
    .header {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .name {
        height: 80px;
        .name_avatar {
            float: left;
            margin-right: 10px;
        }
        .name_text {
            float: left;
        }
    }
    .write {
        text-align: center;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        font-size: 18px;
        padding: 10px 0;
        .icon {
            margin-right: 5px;
        }
    }
</style>
