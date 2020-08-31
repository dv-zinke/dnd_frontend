<template>
    <v-container class="category_container">
        <span class="title">실시간 등록 꿀팁</span>
        <v-list>
            <v-list-item
                    class="list_item"
                    v-for="item in newDocument"
                    :key="item.id"
            >
                <v-chip
                        class="hash_tag"
                        color="#35CCA2"
                        text-color="black"
                        outlined
                        small
                >
                    #{{item.category}}
                </v-chip>
                <span class="list_text">
                    {{item.title}}
                </span>
                <div class="right_icon">
                    N
                </div>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
    import WriteApi from "../../api/WriteApi";

    export default {
        name: "MainNewTip",
        data() {
            return {
                newDocument: []
            }
        },
        mounted() {
            this.setNewDocument();
        },
        methods: {
            setNewDocument() {
                WriteApi().getNewDocument().then(res => {
                    this.newDocument = res.data;
                    this.$emit("loaded")
                });
            }
        },
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
                width:20px;
                height: 20px;
                background: #ad2618;
                position: absolute;
                right: 3px;
                color: white;
                text-align: center;
                font-weight: bold;
                border-radius: 2px;
            }
        }


    }
</style>
