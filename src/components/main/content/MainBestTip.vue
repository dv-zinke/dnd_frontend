<template>
    <v-container class="category_container">
        <span class="title">실시간 인기 꿀팁</span>
        <v-list>
            <v-list-item
                    class="list_item"
                    v-for="item in 4"
                    :key="item"
            >
                <span class="hash_tag">
                    #ㅇㅇㅇ
                </span>
                <span class="list_text">
                    dfgdfjgnjdkfgnkdfjgnjdfkgㅇㄹㅎㄹㅎㅇㄹㅎㅇ
                </span>
                <div class="right_icon">
                </div>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
    export default {
        name: "MainBestTip"
    }
</script>

<style scoped lang="scss">
    .category_container {
        font-size: 12px;
        border-bottom: 1px solid #ddd;
        .title {
            font-weight: bold;
        }

        .list_item {
            padding-left: 0;
            position: relative;
            min-height:  35px !important;
            .list_text{
                margin-left:15px;
                display:block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 200px;
            }
            .right_icon{
                width:15px;
                height: 15px;
                background: gray;
                position: absolute;
                right: 3px;
            }
            .hash_tag {
                border:1px solid #e98058;
                border-radius: 15px;
                padding: 2px 5px;
            }
        }


    }
</style>
