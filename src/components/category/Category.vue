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

            <v-container fluid class="cateogry-grid">
                <span class="font-weight-bold font-size18">{{title}} 카테고리</span>
                <v-container
                        v-if="!isLoad"
                        class="text-center loading-container"
                >
                    <v-progress-circular
                            indeterminate
                            class="progress text-center ma-auto"
                            color="primary"
                    ></v-progress-circular>
                </v-container>
                <v-row dense v-else>
                    <v-col
                            v-for="content in contents"
                            :key="content.document.id"
                            :cols="6"
                    >
                        <v-card
                                @click="goRead(content.document.id)"
                                height="130"
                                class="grid_card"
                        >

                            <v-list-item class="grid_card_list_item">
                                <v-list-item-avatar class="grid_card_avatar" color="grey" height="33"></v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="headline grid_card_name font-weight-bold">
                                        {{content.document.last_version.contributer && content.document.last_version.contributer.nickname}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="grid_card_level">자취전문가</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-card-text class="grid_card_title">
                                {{content.document.title}}
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                    <v-icon
                                            color="#AD241A"
                                            size="14px"
                                    >
                                        mdi-thumb-up-outline
                                    </v-icon>

                                    <span class="like_text">{{content.document.like}}</span>
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
    import WriteApi from "../api/WriteApi";

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
                size:12,
                page:0,
                contents: [],
                isLoad:false
            }
        },
        mounted(){
          this.getHashtag();
        },
        methods: {
            goWrite() {
                if(!this.title && typeof this.title !== "string") return;
                const title = this.title.toString();
                this.$router.push({name: 'Write', query: {category: title}})
            },
            goRead(documentId) {
                this.$router.push({name: 'Read', query: {document_id: documentId}})
            },
            getHashtag() {
                WriteApi().getDocumentHashtagByHashtag(this.title, this.page, this.size)
                    .then(res =>{
                        this.contents = res.data.content;
                        this.isLoad =true;
                    })

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
    .font-size18 {
        font-size: 18px;
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
    .cateogry-grid {
        background: #F9F9F9;
    }
    .grid_card {
        overflow: hidden;
        margin: 8px;
        border-radius: 20px;
        .grid_card_name, .grid_card_level {
            font-size: 10px !important;
        }
        .grid_card_avatar {
            margin-right: 5px !important;
        }

        .like_text {
            color:#AD241A;
        }
        .grid_card_title {
            font-size: 12px !important;
            padding-top: 0 !important;
            padding: 8px;
            height: 40px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .grid_card_list_item {
            padding: 0px 5px;
        }
    }

</style>
