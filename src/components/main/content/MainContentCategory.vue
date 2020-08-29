<template>
    <v-container class="category_container">
       <span class="title">카테고리 모아보기</span>
       <div>
           <v-container fluid>
               <v-row>
                   <v-col
                           v-for="n in 8"
                           :key="n"
                           cols="3"
                           class="category"
                           @click="goCategory(titles[n-1])"
                   >
                       <v-img
                               :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                               class="radius-card"
                       ></v-img>
                       <p class="category_title" v-text="titles[n-1]"></p>
                   </v-col>
               </v-row>
           </v-container>
       </div>

        <v-snackbar
                v-model="modal"
                :top="true"
        >
            추가되지않은 카테고리입니다.

            <template v-slot:action="{ attrs }">
                <v-btn
                        color="pink"
                        text
                        v-bind="attrs"
                        @click="modal = false"
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
                titles: ["청소", "화장실", "법률", "분리수거", "이사", "요리", "애완견", ""],
                modal:false
            }
        },
        methods: {
            goCategory(name) {
                if(!name) return this.openModal();
                this.$router.push({name: 'Category', query: {title: name}})
            },
            openModal(){
                this.modal = true;
            }
        },
    }
</script>

<style scoped lang="scss">
    .category_container {
        border-bottom: 1px solid #ddd;
        .title {
            font-weight: bold;
        }
        .radius-card {
            border-radius: 50%;
            overflow: hidden;
        }
        .category {
            padding: 15px;
            height:70px;
        }
        .category_title {
            text-align: center;
            font-size: 12px;
        }
    }
</style>
