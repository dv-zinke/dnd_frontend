<template>
    <v-container class="pa-0 mt-2">
        <span class="font-weight-bold">댓글 {{totalElements}}</span>
        <div v-if="isInit">
            <div
            >
                <v-container
                        :key="item.id"
                        v-for="item in data"
                        class="comment-container pa-0"
                >
                    <v-row>
                        <v-col cols="2">
                            <v-container>
                                <v-avatar
                                        :color="getSelectUser(item.user_id).avatar_color"
                                        size="30"
                                >
                                    <v-img :src="getSelectUser(item.user_id).avatar_image_url"
                                           v-if="getSelectUser(item.user_id).avatar_image_url"></v-img>
                                    <span class="white--text headline" v-else>
                                    {{getSelectUser(item.user_id).nickname.substring(0,1)}}
                                    </span>
                                </v-avatar>
                            </v-container>
                        </v-col>
                        <v-col cols="10">
                            <div class="mt-2">
                                <span class="headline font-size12 font-weight-bold">{{getUserName(item.user_id, users)}}</span>
                                <p class="subtitle-1 font-size12">{{item.content}}</p>
                            </div>
                            <span class="time-text font-size12">
                                {{timeForToday(item.created_at)}}
                            </span>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </v-container>
            </div>
            <div class="text-center">
                <v-progress-circular
                        class="progress ma-auto"
                        color="primary"
                        indeterminate
                        v-show="isLoading"
                ></v-progress-circular>
            </div>
            <v-text-field
                    v-if="user"
                    :append-outer-icon="comment ? 'mdi-send' : 'mdi-pencil-box'"
                    :loading="!isCreated"
                    @click:append-outer="createComment"
                    clear-icon="mdi-close-circle"
                    clearable
                    label="댓글을 남겨보세요"
                    type="text"
                    v-model="comment"
            >
                <template slot="prepend">
                    <v-avatar
                            size="40"
                            :color="user.avatar_color"
                    >

                        <v-img v-if="user.avatar_image_url"
                               :src="user.avatar_image_url"></v-img>
                        <span v-else class="white--text headline">
                        {{user.nickname.substring(0,1)}}
                    </span>
                    </v-avatar>
                </template>
            </v-text-field>
        </div>
        <div class="text-center" v-else>
            <v-progress-circular
                    class="progress ma-auto"
                    color="primary"
                    indeterminate
                    v-show="isLoading"
            ></v-progress-circular>
        </div>
        <div
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="0"
                v-infinite-scroll="loadMore"
                infinite-scroll-throttle-delay="1000"
        ></div>
    </v-container>
</template>

<script>

    import WriteApi from "../api/WriteApi";
    import UserApi from "../api/UserApi";
    import moment from "moment";
    import {mapState} from "vuex";

    export default {
        name: "Comment",
        props: {
            documentId: {
                required: true
            },
        },
        data() {
            return {
                data: [],
                busy: true,
                users: [],
                page: 0,
                size: 6,
                isLast: false,
                isLoading: false,
                isInit: false,
                isCreated: true,
                totalElements: 0,
                comment: ""

            }
        },
        mounted() {
            this.getAllData();
        },
        methods: {

            loadMore() {
                if (!this.isInit) return;
                this.isLoading = true;
                if (this.isLast) return this.isLoading = false;
                this.busy = true;
                this.page = this.page + 1;
                WriteApi().getCommentByDocumentId(this.documentId, this.page, this.size)
                    .then(res => {
                        this.data = this.data.concat(res.data.content);
                        this.isLast = res.data.last;
                        this.busy = false;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    })
            },
            getAllData() {
                this.page = 0;
                this.isLoading = true;
                WriteApi().getCommentByDocumentId(this.documentId, this.page, this.size)
                    .then(res => {
                        this.data = res.data.content;
                        this.isLast = res.data.last;
                        this.totalElements = res.data.totalElements;
                        return UserApi().getAllUser()
                    })
                    .then(res => {
                        this.users = res.data;
                    })
                    .finally(() => {
                        this.isLoading = false;
                        this.isInit = true;
                        this.busy = false;
                    })
            },
            getSelectUser(userId){
              return this.users.find(user => user.id === userId)
            },
            createComment() {
                if(!this.comment) return;
                const commentParam = {
                    document_id: this.documentId,
                    user_id: this.user.id,
                    content: this.comment
                };
                this.isCreated = false;
                WriteApi().createComment(commentParam)
                    .then(() => {
                        this.getAllData();
                    })
                    .finally(() => {
                        this.comment = "";
                        this.isCreated = true;
                    })
            },
            getDate(utcCode) {
                const seoul = moment(utcCode).tz('Asia/Seoul');
                return seoul.format();
            },
            timeForToday(value) {
                const today = new Date();
                const timeValue = new Date(value);
                timeValue.setHours(timeValue.getHours()+9);


                const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
                if (betweenTime < 1) return '방금전';
                if (betweenTime < 60) {
                    return `${betweenTime}분전`;
                }

                const betweenTimeHour = Math.floor(betweenTime / 60);
                if (betweenTimeHour < 24) {
                    return `${betweenTimeHour}시간전`;
                }

                const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
                if (betweenTimeDay < 365) {
                    return `${betweenTimeDay}일전`;
                }

                return `${Math.floor(betweenTimeDay / 365)}년전`;
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
    .comment-container {
        position: relative;
        width: 100%;
        .time-text {
            position: absolute;
            right: 10px;
            top: 10px;
            color:#9B9B9B;
        }
    }

    .font-size12 {
        font-size: 12px !important;
        line-height: 16px !important;
    }
</style>
