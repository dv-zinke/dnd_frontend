<template>
    <v-dialog v-model="modal" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">프로필 사진 변경</v-card-title>
            <v-card-text>
                <span class="subtitle-1 black--text">아바타 이미지</span>
                <v-file-input
                        :rules="rules"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="이미지를 업로드해주세요."
                        prepend-icon="mdi-camera"
                        label="사진"
                        @change="Preview_image"
                        v-model="image"
                ></v-file-input>
                <div class="mb-3">
                    <span class="subtitle-2 text-center">
                    미리 보기
                    </span>
                    <v-img :src="url"
                           height="240"
                           max-height="300"
                           max-width="300"
                           width="240"
                    ></v-img>

                </div>

                <span class="subtitle-1 black--text">배경 색상</span>
                <v-divider dark inset/>
                <v-color-picker
                        v-model="picker"
                        flat
                        hide-mode-switch
                        hide-inputs
                        dot-size="10"
                ></v-color-picker>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="close">닫기</v-btn>
                <v-btn color="green darken-1" text @click="onChange">수정</v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import UserApi from "../../api/UserApi";

    export default {
        name: "AvatarChangeModal",
        props: {
            userId: {
                type: Number,
                required:true
            },
        },
        data() {
            return {
                modal: false,
                rules: [
                    value => !value || value.size < 2000000 || '이미지 사이즈가 2MB 이상은 업로드 할수 없습니다.',
                ],
                picker: "#FF00FF",
                image:null,
                url:null
            }
        },
        mounted(){

        },
        methods: {
            open(color) {
              this.picker = color;
              this.modal = true
            },
            close(){
                this.modal = false
            },
            Preview_image() {
                this.url = URL.createObjectURL(this.image)
            },
            onChange(){
                const formData = new FormData();
                formData.append("color", this.picker);
                formData.append("file", this.image);
                UserApi().avatarChange(this.userId, formData).then(res =>{
                    this.modal = false;
                    this.$store.commit('setUser', res.data);
                })

            }

        },

    }
</script>

<style scoped>

</style>
