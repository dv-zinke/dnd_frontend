<template>
    <v-container>
        <v-container class="header">
            <v-icon @click="$router.go(-1)" class="close_btn">
                mdi-close
            </v-icon>
            <span>꿀팁 공유</span>
            <v-btn @click="createDocument()"
                   class="complete_btn"
                   color="primary"
                   small
            >완료
            </v-btn>
        </v-container>
        <v-row class="text-field">
            <v-col cols="8">
                <v-file-input
                        class="image_input"
                        @change="Preview_image"
                        v-model="image"
                        prefix="미리보기 :"
                >
                </v-file-input>
            </v-col>
            <v-col cols="4">
                <div class="prevview">
                    <v-img :src="url"></v-img>
                </div>
            </v-col>


            <v-text-field
                    class="tag_input"
                    prefix="태그 입력:"

            >
            </v-text-field>
            <v-container v-if="!isNotExistHashtag">
                <v-chip
                        :key="hashtag"
                        @click:close="test = false"
                        close
                        small
                        v-for="hashtag in hashtags"
                >
                    <span>{{hashtag}}</span>
                </v-chip>
            </v-container>
            <v-text-field
                    class="title_input"
                    prefix="제목 :"
            ></v-text-field>
        </v-row>
        <editor
                :initialValue="editorText"
                :options="editorOptions"
                :visible="editorVisible"
                height="450px"
                initialEditType="wysiwyg"
                ref="toastuiEditor"
        />
    </v-container>
</template>

<script>
    import 'codemirror/lib/codemirror.css';
    import '@toast-ui/editor/dist/toastui-editor.css';
    import {Editor} from '@toast-ui/vue-editor'
    import WriteApi from "../api/WriteApi";

    export default {
        name: "Write",
        components: {
            Editor
        },
        data() {
            return {
                editorText: '',
                editorOptions: {
                    hideModeSwitch: true
                },
                editorVisible: true,
                test: true,
                hashtags: [],
                url: null,
                image: null,
            }
        },
        mounted() {

        },
        methods: {
            createDocument() {
                WriteApi().getAllDocument().then(d => {
                    console.log(d)
                })
            },
            Preview_image() {
                this.url = URL.createObjectURL(this.image)
            }
        },
        computed: {
            isNotExistHashtag() {
                return this.hashtags.length === 0;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .header {
        position: relative;
        text-align: center;

        .close_btn {
            position: absolute;
            left: 10px;
            top: 10px;
        }

        .complete_btn {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

    .text-field {
        width: 370px;
        margin: 0px auto 20px auto;

        .tag_input, .title_input {
            height: 40px;
            width: 100%;
        }
        .image_input {
            height: 20px;
        }
        .prevview {
            width:40px;
            height: 40px;
        }
    }
</style>
