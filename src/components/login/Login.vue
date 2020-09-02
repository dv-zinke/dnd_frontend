<template>
    <v-container>
        <div>
            <v-icon @click="$router.push({ path: `/` })" class="close_btn">
                mdi-arrow-left
            </v-icon>
        </div>
        <p class="headline login-title">자취 꿀팁을 얻으려면<br>로그인이 필요해요!</p>
        <v-row justify="center">
            <v-col cols="12">
                <v-form
                        ref="form"

                >
                    <v-text-field
                            label="이메일"
                            outlined
                            ref="email"
                            required
                            rounded
                            @input="inputCheck"
                            v-model="email"
                    ></v-text-field>

                    <v-text-field
                            label="비밀번호"
                            outlined
                            ref="password"
                            rounded
                            type="password"
                            @input="inputCheck"
                            v-model="password"
                    ></v-text-field>


                </v-form>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-container class="sign_btn_container">
            <v-btn @click="login"
                   class="login_btn"
                   color="primary"
                   rounded
                   :disabled="!disabled"
            >
                <span v-if="!isUpdating">로그인 하기</span>
                <v-progress-circular
                        class="progress text-center ma-auto"
                        color="white"
                        indeterminate
                        v-else
                ></v-progress-circular>

            </v-btn>
            <v-btn @click="goSignup"
                   class="sign_btn"
                   color="#3ae4b6"
                   rounded>
                자취러스 회원가입하기
            </v-btn>
        </v-container>

        <v-snackbar
                :top="true"
                v-model="modal"
        >
            입력 하신 정보가 올바르지 않습니다.

            <template v-slot:action="{ attrs }">
                <v-btn
                        @click="modal = false"
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
    import UserApi from "../api/UserApi";
    import Cookies from 'js-cookie'

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
                modal: false,
                isUpdating: false,
                disabled:false
            }
        },
        methods: {
            login() {
                this.isUpdating = true;
                const userInfo = {
                    email: this.email,
                    password: this.password
                };
                UserApi().loginUser(userInfo)
                    .then(res => {
                        let token = res.data;
                        if (token !== 'UnAuthorized' && token.length > 0) {
                            // login 성공
                            let jwt = require('jsonwebtoken');
                            let decoded = jwt.decode(token);
                            let user = JSON.parse(decoded.user);
                            this.$store.commit('setUser', user.info);
                            Cookies.set('token', token);
                            this.$router.push('/');
                        }
                    }).catch(() => {
                        this.modal = true;
                    })
                    .finally(() => {
                        this.isUpdating = false;
                    })
            },
            goSignup() {
                this.$router.push({path: '/signup'})
            },
            inputCheck(){
                this.disabled = !!this.email && !!this.password;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .login-title {
        margin: 10px 0px;
    }

    .sign_btn_container {

        .login_btn {
            width: 360px;
            height: 50px !important;
            font-size: 20px !important;
            color: white;
            margin: 10px 0px;
        }

        .sign_btn {
            width: 360px;
            height: 50px !important;
            font-size: 20px !important;
            color: white;
        }


    }
</style>
