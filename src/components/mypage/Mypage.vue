<template>
    <v-container>
        <div>
            <v-icon @click="$router.go(-1)">
                mdi-arrow-left
            </v-icon>
        </div>
        <v-container class="user_setting">
            <span class="title">
                회원정보 설정
            </span>
            <v-text-field
                    class="user_setting_input"
                    placeholder="3글자 이상 입력 / 특수문자 제외"
                    outlined
                    rounded>
                <template slot="label" >
                    <span >닉네임</span>
                </template>
            </v-text-field>
        </v-container>
        <v-container class="user_confirm">
            <span class="title">
               동네인증 하기
            </span>
            <p>
                동네인증을 통해 우리동네 정보를 확인해보세요!<br>
                동네인증을 하지 않을 시<br>
                서비스 사용의 제한이 있을 수 있습니다.
            </p>
            <v-text-field
                    class="user_address_input"
                    placeholder="지번, 도로명, 건물명을 입력해주세요."
                    outlined
                    rounded>
                <template slot="label" >
                    <span >주소 입력하기</span>
                </template>
            </v-text-field>


            <v-btn rounded color="#dddddd" dark>지도로 주소 설정하기</v-btn>

        </v-container>

        <v-container class="sign_btn_container">
            <v-btn rounded color="#3ae4b6" dark>가입완료</v-btn>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: "Mypage"
    }
</script>

<style scoped lang="scss">
    .user_setting {
        height: 150px;
        border-bottom: 1px solid #ddd;
        .user_setting_input {
            margin-top: 20px;
            height: 40px;

            .v-text-field__slot {
                padding: 20px 10px;
            }
            label {
                left: -10px !important;
                top: 20px !important;
            }
        }
    }
    .user_confirm {
        height: 300px;
        border-bottom: 1px solid #ddd;
        p {
            color:gray;
        }
        .user_address_input {
            height: 70px;
        }
        button {
            width:360px;
            height: 50px !important;
            font-size: 20px !important;
            color:gray;
        }
    }
    .sign_btn_container {
        button {
            width:360px;
            height: 50px !important;
            font-size: 20px !important;
        }
    }
    .title {
        font-size: 24px !important;
        font-weight: bold;
    }

</style>
