<template>
    <v-container class="category_container">
        <span class="title">카테고리 모아보기</span>
        <div>
            <v-container fluid>
                <v-row>
                    <v-col
                            :key="item.title"
                            @click="goCategory(item.title)"
                            class="category"
                            cols="3"
                            v-for="item in category"
                    >
                        <v-avatar
                                color="#F3F3F3"
                        >
                            <v-img
                                    :src="require(`@/assets/category/${item.src}`)"
                                    :max-width="item.width"
                                    :max-height="item.height"
                                    class="category-avatar-image"
                            >
                            </v-img>
                        </v-avatar>
                        <p class="category_title mr-4" v-text="item.title"></p>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <v-snackbar
                :top="true"
                v-model="modal"
        >
            추가되지않은 카테고리입니다.

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
    export default {
        name: "MainContentCategory",
        data() {
            return {
                category: [{
                    title: "청소",
                    src: "cleaning.png",
                    width:17,
                    height:26
                }, {
                    title: "화장실",
                    src:"washroom.png",
                    width:23,
                    height:20
                }, {
                    title: "법률",
                    src:"law.png",
                    width:24,
                    height:20
                }, {
                    title: "분리수거",
                    src:"trash_sort.png",
                    width:22,
                    height:20
                },{
                    title: "이사",
                    src:"move.png",
                    width:24,
                    height:16
                },{
                    title: "요리",
                    src:"cooking.png",
                    width:22,
                    height:22
                }, {
                    title: "반려동물",
                    src:"pet.png",
                    width:20,
                    height:22
                }],
                modal: false
            }
        },
        methods: {
            goCategory(name) {
                if (!name) return this.openModal();
                this.$router.push({name: 'Category', query: {title: name}})
            },
            openModal() {
                this.modal = true;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .category_container {
        border-bottom: 1px solid #ddd;

        .title {
            font-weight: bold;
        }

        .radius-card {
            border-radius: 50%;
            overflow: hidden;
            width: 50px;
        }

        .category {
            padding: 15px;
            height: 70px;
        }

        .category_title {
            text-align: center;
            font-size: 12px;
        }
        .category-avatar-image {
            border-radius: 0 !important;
        }
    }
</style>
