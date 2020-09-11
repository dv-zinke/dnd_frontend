<template>
    <v-dialog max-width="320" persistent v-model="modal">
        <v-card class="move-date-modal">
            <v-card-title class="title_image">
                <img class="content-image" src="@/assets/move-modal-content.png">
            </v-card-title>
            <v-card-text>
                <div class="text-center">

                    <span class="headline-text font-weight-bold">입주날짜를 확인해볼까요?</span>
                    <br>
                    <span>현재 거주지의 입주 날짜를 입력해보세요 :) </span>
                    <br>
                    <span>오늘이 입주 몇 일째인지 알려드릴께요!</span>
                    <br>
                    <br>
                    <br>
                    <span class="font-weight-bold">입주한 연도 / 월 / 일</span>
                    <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="date"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                ref="picker"
                                v-model="date"
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1950-01-01"
                                locale="ko"
                                @change="save"
                        ></v-date-picker>
                    </v-menu>
                    <br>
                    <span class="font-weight-bold">집 별명 정하기</span>
                    <v-text-field
                            v-model="houseName"
                            placeholder="3글자 이상 입력 / 특수문자 제외"
                    ></v-text-field>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close" color="#39E5B6" outlined class="close-btn">다음에 할께요:(</v-btn>
                <v-btn color="#39E5B6" class="ok-btn" @click="postData">입력 완료</v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import UserApi from "../../api/UserApi";

    export default {
        name: "MoveDateChangeModal",
        props: {
            userId: {
            },
        },
        data() {
            return {
                modal: false,
                date: null,
                menu: false,
                houseName:""
            }
        },
        methods: {
            open() {
                this.date = null;
                this.houseName = "";
                this.modal = true
            },
            close() {
                this.modal = false
            },
            save (date) {
                this.$refs.menu.save(date)
            },
            postData () {
                UserApi().moveDataChange(this.userId, this.date, this.houseName).then(res =>{
                    this.modal = false;
                    this.$store.commit('setUser', res.data);
                });
            }
        },
        watch: {
            menu (val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },
    }
</script>

<style lang="scss" scoped>
    .move-date-modal {
        .title_image{
            height: 100px;
        }
        .content-image {
            width: 290px;
            position: absolute;
        }

        .headline-text {
            font-size: 18px !important;
            color: black !important;
        }
        .close-btn {
            color:#757575 !important;
            width:47%;
            height: 50px;
            border-color: #39E5B6;
            border-radius: 10px;
        }
        .ok-btn {
            color:white !important;
            width:47%;
            height: 50px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 10px;
        }
    }
</style>
