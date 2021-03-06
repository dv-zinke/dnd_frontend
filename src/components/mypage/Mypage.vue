<template>
    <v-container class="pa-0">
        <div class="mypage-header">
            <v-icon @click="$router.go(-1)" class="back-btn">
                mdi-arrow-left
            </v-icon>
            <span class="title pt-2">
                마이페이지
            </span>
        </div>
        <v-divider></v-divider>

        <v-container class="mt-5 avatar-container pa-0">
            <v-badge
                    avatar
                    bordered
                    bottom
                    class="avatar-logo ml-2"
                    color="#dddddd"
                    overlap
            >
                <template v-slot:badge>
                    <v-avatar>
                        <v-icon>
                            mdi-camera
                        </v-icon>
                    </v-avatar>
                </template>

                <v-avatar
                        @click="avatarChange(user.avatar_color)"
                        size="60"
                        :color="user.avatar_color"
                >

                    <v-img v-if="user.avatar_image_url"
                           :src="user.avatar_image_url"></v-img>
                    <span v-else class="white--text headline">
                        {{user.nickname.substring(0,1)}}
                    </span>
                </v-avatar>
            </v-badge>

            <span class="font-weight-bold">{{user.nickname}}</span>
            <span class="level-text"> / {{getLevelName(user.level)}}</span>
        </v-container>
        <span class="level-info-text float-right">인기있는 꿀팁을 공유하고 레벨을 올려보세요!</span>
        <v-container class="like-container">
            <div class="text-center">
                <span class="color-text font-weight-bold">65명</span>
                <br>
                <span class="desc-text">내 글을 읽은 사람</span>
            </div>
            <v-divider
                    class="mx-4"
                    inset
                    vertical
            ></v-divider>
            <div class="text-center">
                <span class="color-text font-weight-bold">65명</span>
                <br>
                <span class="desc-text">내 글을 좋아한 사람</span>
            </div>
        </v-container>

        <v-container class="pa-0 map-container">
            <div class="map-image">
                <img src="@/assets/map_image.png">
            </div>
            <v-btn
                    class="address-verif-btn"
                    color="#39E5B6"
                    @click="openModalAlert"
            >
                <span>동네인증하기</span>
            </v-btn>
        </v-container>
        <v-container class="pa-0 move-in-container">
            <v-container class="px-2 py-6">
                <span v-if="!(user.move_at && user.house_name)">
                    혹시 오늘 입주하신지 몇 일째 인가요?
                </span>
                <span v-else>
                    {{user.house_name}}와 함께한지 {{getDiffDate(user.move_at)}}일째 되는날!
                </span>
                <v-btn text class="float-right confirm-btn pa-0" @click="moveModalOpen">
                    확인하기
                    <v-icon color="#A0A0A0">
                        mdi-chevron-right
                    </v-icon>
                </v-btn>
            </v-container>
        </v-container>
        <v-container class="save-container" @click="openModalAlert">
            <div class="py-4">
                저장한 꿀팁
                <v-icon class="float-right">
                    mdi-chevron-right
                </v-icon>
            </div>

        </v-container>
        <v-divider></v-divider>
        <v-container class="post-container" @click="openModalAlert">
            <div class="py-4">
                내가 쓴 글 보기
                <v-icon class="float-right">
                    mdi-chevron-right
                </v-icon>
            </div>
        </v-container>

        <v-container class="text-center">
            <v-btn class="mx-auto" color="error" @click="logout">로그아웃</v-btn>
        </v-container>
        <avatar-change-modal :user-id="user.id" ref="avatarChangeModal"/>
        <move-date-change-modal  :user-id="user.id" ref="moveModal"></move-date-change-modal>
        <v-snackbar
                :top="true"
                v-model="modalAlert"
        >
            준비중인 기능입니다.

            <template v-slot:action="{ attrs }">
                <v-btn
                        @click="modalAlert = false"
                        color="pink"
                        text
                        v-bind="attrs"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
    import {mapState} from "vuex";
    import AvatarChangeModal from "./modal/AvatarChangeModal";
    import Cookies from 'js-cookie'
    import MoveDateChangeModal from "./modal/MoveDateChangeModal";
    import moment from 'moment';

    export default {
        name: "Mypage",
        data() {
            return {
                modalAlert: false
            }
        },
        components: {MoveDateChangeModal, AvatarChangeModal},
        methods: {
            avatarChange(color) {
                this.$refs.avatarChangeModal.open(color);
            },
            logout(){
                Cookies.remove('token');
                this.$router.push('/login');
            },
            moveModalOpen(){
                this.$refs.moveModal.open()
            },
            openModalAlert(){
                this.modalAlert = true;
            },
            getDiffDate(date) {
                const now = moment(new Date()); //todays date
                const end = moment(date); // another date
                const duration = moment.duration(now.diff(end));
                const days = duration.asDays();
                return Math.floor(days);
            }

        },
        mounted() {
            console.log(this.user)
        },
        computed: {
            ...mapState({
                user: state => state.user
            })
        }
    }
</script>

<style lang="scss" scoped>
    .mypage-header {
        position: relative;
        text-align: center;
        padding: 15px 0px;

        .title {
            font-size: 24px !important;
            font-weight: bold;
        }

        .back-btn {
            position: absolute;
            top: 15px;
            left: 5px;
        }
    }

    .avatar-container {

        .avatar-logo {
            margin-right: 30px;
        }

        span {
            font-size: 20px;
        }

        .level-text {
            color: #A0A0A0;
        }
    }

    .level-info-text {
        font-size: 10px;
        color: #A0A0A0;

    }

    .like-container {

        width: 360px;
        height: 85px;
        overflow: hidden;
        border: 1px solid #ECECEC;
        border-radius: 18px;
        margin: 10px;

        hr {
            float: left;
        }

        div {
            width: 150px;
            float: left;
            height: 100%;

            .color-text {
                color: #37CBA3;
                font-size: 18px;
            }

            .desc-text {
                font-size: 14px;
            }
        }
    }

    .map-container {
        width: 100%;
        height: 180px;
        margin-top: 20px;
        position: relative;
        background: #F4F4E3;

        .map-image {
            position: absolute;
            left: 0px;
            top: -40px;
        }
        .map-image img{
            width:100%
        }

        .address-verif-btn {
            color: white;
            position: absolute;
            bottom: 15px;
            left: 135px;
            border-radius: 10px;
            font-weight: bold;
            border: 1px solid white !important;
        }
    }

    .move-in-container {
        width: 100%;
        height: 70px;
        background: #F9F9F9;
        font-size: 14px;

        .confirm-btn {
            margin-top:-8px;
            color: #A0A0A0;
        }
    }

    .save-container {
        height: 80px;
        font-weight: bold;
    }

    .post-container {
        height: 80px;
        font-weight: bold;
    }


</style>
