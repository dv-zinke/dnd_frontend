<template>
    <v-container>
        <div>
            <v-icon @click="$router.push({ path: `/login` })" class="close_btn">
                mdi-arrow-left
            </v-icon>
        </div>
        <span class="headline">자취러스 회원가입</span>
        <v-row justify="center">
            <v-col cols="12">
                <v-form
                        ref="form"
                        v-model="valid"
                >
                    <v-text-field
                            :rules="emailRules"
                            label="이메일"
                            outlined
                            ref="email"
                            required
                            rounded
                            v-model="email"
                    ></v-text-field>

                    <v-text-field
                            :rules="passwordRules"
                            @blur="passwordConfirmValidation()"
                            label="비밀번호"
                            outlined
                            ref="password"
                            required
                            rounded
                            type="password"
                            v-model="password"
                    ></v-text-field>

                    <v-text-field
                            :rules="passwordConfirmRules"
                            @blur="passwordValidation"
                            label="비밀번호 확인"
                            outlined
                            ref="passwordConfirm"
                            required
                            rounded
                            type="password"
                            v-model="passwordConfirm"
                    ></v-text-field>

                    <v-text-field
                            :rules="nicknameRules"
                            label="닉네임"
                            outlined
                            ref="nickname"
                            required
                            rounded
                            v-model="nickname"
                    ></v-text-field>
                </v-form>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-container class="sign_btn_container">
            <v-btn class="sign_btn" rounded color="#3ae4b6" :disabled="!valid">가입완료</v-btn>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: "Signup",
        data() {
            return {
                valid: true,
                email: "",
                password: "",
                passwordConfirm: "",
                nickname: "",
                emailRules: [
                    v => !!v || "이메일은 필수 입력 항목입니다.",
                    v => /.+@.+\..+/.test(v) || "잘못된 이메일 주소입니다.",
                ],
                passwordRules: [
                    v => !!v || "비밀번호는 필수 입력 항목입니다.",
                    v => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(v) || "숫자+영문자+특수문자 조합으로 8자리 이상 사용해야 합니다."
                ],
                passwordConfirmRules: [
                    v => !!v || "비밀번호 확인은 필수 입력 항목입니다.",
                    v => v === this.password || "설정하신 비밀번호와 다릅니다."
                ],
                nicknameRules: [
                    v => !!v || "닉네임은 필수 입력 항목입니다."
                ]
            }
        },
        methods: {
            passwordValidation() {
                this.$refs.password.validate();
            },
            passwordConfirmValidation() {
                this.$refs.passwordConfirm.validate();
            }

        },
    }
</script>

<style scoped lang="scss">
    .sign_btn_container {
        .sign_btn {
            width:360px;
            height: 50px !important;
            font-size: 20px !important;
            color: white;
        }
        .sign_btn.v-btn--disabled {
            color:#C0C0C0 !important;
        }
    }
</style>
