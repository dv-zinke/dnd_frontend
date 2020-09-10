<template>
    <v-container class="pa-0">
        <v-icon @click="$router.go(-1)" class="back_btn">
            mdi-arrow-left
        </v-icon>
        <div class="header">
            <span>{{title}} 꿀팁</span>
        </div>
        <v-container class="pa-0">
            <div class="name pl-3">
                <div class="name_avatar">
                    <v-avatar
                            :color="user.avatar_color"
                            size="60"
                    >

                        <v-img :src="user.avatar_image_url"
                               v-if="user.avatar_image_url"></v-img>
                        <span class="white--text headline" v-else>
                        {{user.nickname.substring(0,1)}}
                    </span>
                    </v-avatar>
                </div>
                <div class="name_text">
                    <span>{{user.nickname}}님,</span> <br>
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

            <v-container class="cateogry-grid" fluid>
                <span class="font-weight-bold font-size18">{{title}} 카테고리</span>
                <v-container
                        class="text-center loading-container"
                        v-if="!isLoad"
                >
                    <v-progress-circular
                            class="progress text-center ma-auto"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-container>
                <v-row class="category-list"
                       dense
                       v-else
                >
                    <v-col cols="12" v-if="contents.length === 0">
                        <div>
                            <span class="text-center">
                                현재 카테고리에 꿀팁이 없습니다. 꿀팁을 공유해보세요.
                            </span>
                        </div>
                    </v-col>
                    <v-col
                            :cols="6"
                            :key="content.document.id"
                            v-for="content in contents"
                    >
                        <v-card
                                @click="goRead(content.document.id)"
                                class="grid_card"
                                height="130"
                        >

                            <v-list-item class="grid_card_list_item">
                                <v-list-item-avatar
                                        :color="content.document.last_version.contributer.avatar_color"
                                        class="grid_card_avatar justify-center"
                                        height="33"
                                        v-if="content.document.last_version.contributer">
                                    <v-img :src="content.document.last_version.contributer.avatar_image_url"
                                           v-if="content.document.last_version.contributer.avatar_image_url"></v-img>
                                    <span class="white--text" v-else>
                                    {{content.document.last_version.contributer.nickname.substring(0,1)}}
                                    </span>
                                </v-list-item-avatar>


                                <v-list-item-content>
                                    <v-list-item-title class="headline grid_card_name font-weight-bold">
                                        {{content.document.last_version.contributer &&
                                        content.document.last_version.contributer.nickname}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="grid_card_level">
                                        자취 Lv {{content.document.last_version.contributer.level}}
                                    </v-list-item-subtitle>
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
        <div
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="0"
                v-infinite-scroll="loadMore"
        ></div>
    </v-container>
</template>

<script>
    import WriteApi from "../api/WriteApi";
    import {mapState} from "vuex";

    export default {
        name: "Category",
        props: {
            title: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                size: 6,
                page: 0,
                contents: [],
                isLoad: false,
                busy: false

            }
        },
        mounted() {
            this.getHashtag();
        },
        methods: {
            goWrite() {
                if (!this.title && typeof this.title !== "string") return;
                const title = this.title.toString();
                this.$router.push({name: 'Write', query: {category: title}})
            },
            goRead(documentId) {
                this.$router.push({name: 'Read', query: {document_id: documentId}})
            },
            getHashtag() {
                WriteApi().getDocumentHashtagByHashtag(this.title, this.page, this.size)
                    .then(res => {
                        this.contents = res.data.content;
                        this.isLoad = true;
                    })

            },
            loadMore(){
                if (this.isLast || !this.isLoad) return;
                this.busy = true;
                this.page = this.page + 1;
                WriteApi().getDocumentHashtagByHashtag(this.title, this.page, this.size)
                    .then(res => {
                        this.contents = this.contents.concat(res.data.content);
                        this.isLast = res.data.last;
                        this.busy = false;
                    })
                    .finally(() => {
                    })
            }
        },
        computed: {
            ...mapState({
                user: state => state.user
            })
        }
    }
</script>

<style lang="scss" scoped>
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
            color: #AD241A;
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
