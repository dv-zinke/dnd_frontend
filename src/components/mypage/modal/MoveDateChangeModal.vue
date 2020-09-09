<template>
    <v-dialog max-width="360" persistent v-model="modal">
        <v-card class="move-date-modal">
            <v-card-title>
                <img class="content-image" src="@/assets/move-modal-content.png">
            </v-card-title>
            <v-card-text>
                <div class="text-center">

                    <span class="headline text--black">입주날짜를 확인해볼까요?</span>
                    <br>
                    <span>현재 거주지의 입주 날짜를 입력해보세요 :) </span>
                    <br>
                    <span>오늘이 입주 몇 일째인지 알려드릴께요!</span>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close" color="green darken-1" text>닫기</v-btn>
                <v-btn color="green darken-1" text>수정</v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "MoveDateChangeModal",
        data() {
            return {
                modal: false
            }
        },
        methods: {
            open() {
                this.modal = true
            },
            close() {
                this.modal = false
            },
        },
    }
</script>

<style lang="scss" scoped>
    .move-date-modal {
        .content-image {
            width: 290px
        }
    }
</style>
