<template>
    <div class="community-container">
        <div class="community-header">
            <v-icon @click="$router.go(-1)" class="back-btn">
                mdi-arrow-left
            </v-icon>
            <span class="title pt-2">
                우리동네
            </span>
        </div>
        <v-divider/>
        <v-container class="text-center address-container">
            <div>
                모라로 51번길 123
                <v-icon>
                    mdi-chevron-down
                </v-icon>
            </div>
        </v-container>
        <v-container>
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
                    <span class="font-weight-bold">{{user.nickname}}님,</span> <br>
                    <span>우리동네 <span class="text-color">자취러</span>들과 소통해보세요</span>
                </div>
            </div>

            <v-divider/>
            <div class="write">
                <div>
                    <v-icon class="icon">
                        mdi-square-edit-outline
                    </v-icon>
                    <span>우리동네 썰 풀기</span>
                </div>
            </div>
            <div class="custom-divider">

            </div>
            <div
                    class="community-document pa-3"
                    :key="dummy.id"
                    v-for="dummy in dummyData"
            >
                <div class="float-left mr-3">
                    <v-avatar
                            :color="dummy.avatarColor"
                            size="38"
                    >

                        <v-img :src="require(`@/assets/avatar/${dummy.avatarLink}`)"
                               height="30px"
                               width="30px"
                               max-width="30px"
                               max-height="30px"
                        ></v-img>
                    </v-avatar>
                </div>

                <div class="float-left">
                    <span class="font-weight-bold community-document-name">{{dummy.name}}</span>
                    <p class="community-document-content">{{dummy.content}}</p>
                </div>

                <div class="community-document-like">
                    <v-btn icon>
                        <v-icon
                                color="#AD241A"
                                size="14px"
                        >
                            mdi-thumb-up-outline
                        </v-icon>

                        <span class="like_text">{{dummy.like}}</span>
                    </v-btn>
                </div>

                <div class="community-document-time">
                    <span>{{dummy.time}}</span>
                </div>

            </div>
        </v-container>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "Community",
        data() {
            return {
                dummyData: [
                    {
                        id: 1,
                        name: "공수레공수거",
                        time: "5분전",
                        content: "혼술하기 좋은 술집 아는 사람 나 가르쳐줘",
                        like: 3,
                        avatarColor: "#EA4960",
                        avatarLink: "avatar1.png"
                    },
                    {
                        id: 2,
                        name: "쇼미더뭐니",
                        time: "12분전",
                        content: "혼술하기 좋은 술집 아는 사람 나 가르쳐줘~ 밥 집도 가르쳐줘 ",
                        like: 3,
                        avatarColor: "#ffffff",
                        avatarLink: "avatar4.png"
                    },
                    {
                        id: 3,
                        name: "다운타운베이비",
                        time: "28분전",
                        content: "요즘 근처에 PC 방 하는 곳 없죠ㅠㅠ? 아는 곳 있으시면 가르쳐주세요... 이력서 제출해야 하는데에에ㅔㅔㅔㅔ",
                        like: 1,
                        avatarColor: "#6665FF",
                        avatarLink: "avatar3.png"
                    },
                    {
                        id: 4,
                        name: "밀면애호가",
                        time: "35분전",
                        content: "청소랑 나랑 거리멀다 싶은 사람 다 모여라..",
                        like: 3,
                        avatarColor: "#ffffff",
                        avatarLink: "avatar4.png"
                    },
                    {
                        id: 5,
                        name: "자장면자장가",
                        time: "1시간전",
                        content: "혼술하기 좋은 술집 아는 사람 나 가르쳐줘",
                        like: 3,
                        avatarColor: "#EA4960",
                        avatarLink: "avatar1.png"
                    }
                ]
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
    .community-container {
        .community-header {
            position: relative;
            text-align: center;
            padding: 30px 0px;

            .title {
                font-size: 18px !important;
                font-weight: bold;
            }

            .back-btn {
                position: absolute;
                top: 30px;
                left: 5px;
            }
        }
        .custom-divider {
            background: #ECECEC;
            height: 9px;
            width:100%
        }

        .address-container {
            height: 50px;
            border-bottom: 1px solid #F0F0F0;
        }

        .name {
            height: 80px;

            .name_avatar {
                float: left;
                margin-right: 10px;
            }

            .name_text {
                float: left;
                .text-color {
                    color:#39E5B6;
                    font-weight: bold;
                }
            }
        }

        .write {
            text-align: center;
            font-size: 18px;
            padding: 10px 0;

            .icon {
                margin-right: 5px;
            }
        }

        .community-document {
            position: relative;
            width:100%;
            overflow: hidden;
            border-bottom: 1px solid #F0F0F0;
            .community-document-name {
                font-size: 12px;
            }
            .community-document-content {
                font-size: 14px;
                width:250px
            }
            .community-document-time {
                font-size: 10px;
                line-height: 14px;
                color: #9B9B9B;
                position: absolute;
                top: 5px;
                right: 5px;
            }
            .community-document-like {
                position: absolute;
                bottom:5px;
                right:5px;
                .like_text {
                    color : #AD241A;
                }
            }
        }
    }

</style>
