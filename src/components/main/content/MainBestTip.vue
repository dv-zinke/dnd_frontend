<template>
    <v-container class="category_container">
        <span class="title">실시간 인기 꿀팁</span>
        <v-container
                v-if="!isLoad"
                class="text-center loading-container"
        >
            <v-progress-circular
                    indeterminate
                    class="progress text-center ma-auto"
                    color="primary"
            ></v-progress-circular>
        </v-container>
        <v-list v-else>
            <v-list-item
                    :key="item.id"
                    class="list_item"
                    v-for="item in bestDocument"
            >
                <v-chip
                        class="hash_tag"
                        color="#35CCA2"
                        outlined
                        small
                        text-color="black"
                        @click="goCategory(item.category)"
                >
                    #{{item.category}}
                </v-chip>
                <span
                        class="list_text"
                        @click="goReadPage(item.id)"
                >
                    {{item.title}}
                </span>
                <div class="right_icon">
                    <v-icon
                            color="#AD241A"
                            size="14px"
                    >
                        mdi-thumb-up-outline
                    </v-icon>
                    {{item.like}}
                </div>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
    import WriteApi from "../../api/WriteApi";

    export default {
        name: "MainBestTip",
        data() {
            return {
                bestDocument: [],
                isLoad:false
            }
        },
        mounted() {
            this.setBestDocument();
        },
        methods: {
            setBestDocument() {
                WriteApi().getBestDocument().then(res => {
                    this.bestDocument = res.data;
                    this.$emit("loaded");
                    this.isLoad = true
                });
            },
            goReadPage(documentId){
                this.$router.push({name: 'Read', query: {document_id: documentId}})
            },
            goCategory(category){
                if(!category) return
                this.$router.push({name: 'Category', query: {title: category}})
            }
        },

    }
</script>

<style lang="scss" scoped>
    .category_container {
        font-size: 12px;
        border-bottom: 1px solid #ddd;

        .title {
            font-weight: bold;
        }

        .list_item {
            padding-left: 0;
            position: relative;
            min-height: 35px !important;

            .list_text {
                margin-left: 15px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 200px;
            }

            .right_icon {
                position: absolute;
                right: 3px;
                color:#AD241A;
            }

        }


    }
</style>
