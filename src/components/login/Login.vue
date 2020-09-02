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

                >
                    <v-text-field
                            label="이메일"
                            outlined
                            ref="email"
                            required
                            rounded
                            v-model="email"
                    ></v-text-field>

                    <v-text-field
                            label="비밀번호"
                            outlined
                            ref="password"
                            required
                            rounded
                            type="password"
                            v-model="password"
                    ></v-text-field>


                </v-form>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-container class="sign_btn_container">
            <v-btn class="sign_btn" rounded color="#3ae4b6" @click="login">가입완료</v-btn>
        </v-container>
    </v-container>
</template>

<script>
    import UserApi from "../api/UserApi";

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            login() {
                const userInfo = {
                    email: this.email,
                    password: this.password
                };
                UserApi().loginUser(userInfo).then(res =>{
                    console.log(res)
                }).catch(err=>{
                    console.dir(err)
                    console.error(err)
                })
            }
        },
    }
</script>

<style scoped>

</style>
