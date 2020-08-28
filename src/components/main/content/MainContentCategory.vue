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
    </v-container>
</template>

<script>
    export default {
        name: "MainContentCategory",
        data() {
            return {
                titles: ["청소", "화장실", "법률", "분리수거", "이사", "요리", "애완견", ""]
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
