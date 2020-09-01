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
            <v-text-field
                    @click:append-outer="hashtagAdd"
                    append-outer-icon="mdi-plus"
                    class="tag_input"
                    clearable
                    prefix="태그 입력:"
                    v-model="hashtagInput"

            >
            </v-text-field>

            <v-container v-if="!isNotExistHashtag">
                <v-chip
                        :key="hashtag"
                        @click:close="hashtagRemove(hashtag)"
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
                    v-model="title"
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

        <div class="text-center">
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
    </v-container>
</template>

<script>
    import 'codemirror/lib/codemirror.css';
    import '@toast-ui/editor/dist/toastui-editor.css';
    import {Editor} from '@toast-ui/vue-editor'
    import WriteApi from "../api/WriteApi";

    export default {
        name: "Write",
        props: {},
        components: {
            Editor
        },
        data() {
            return {
                title: "",
                hashtagInput: "",
                editorText: '',
                editorOptions: {
                    hideModeSwitch: true
                },
                editorVisible: true,
                test: true,
                hashtags: [],
                url: null,
                image: null,
                image_base64: null,
                overlay: false
            }
        },
        mounted() {
            this.hashtags.push(this.getCategory);
        },
        methods: {
            createDocument() {
                this.overlay = true;
                const request = {
                    "document": {
                        "category": this.getCategory,
                        "title": this.title
                    },
                    "content": this.$refs.toastuiEditor.invoke('getMarkdown'),
                    "hashtags": this.hashtags,
                    "user_id": 1
                };
                WriteApi().createDocument(request)
                    .then(res => {
                        this.$router.push({name: 'Read', query: {document_id: res.data.id}})
                    })
                    .finally(() => {
                        this.overlay = false;
                    })
            },
            Preview_image() {
                const reader = new FileReader();
                reader.readAsDataURL(this.image);
                reader.onload = () => {
                    this.image_base64 = reader.result
                };

                this.url = URL.createObjectURL(this.image)
            },
            hashtagAdd() {
                if (!this.hashtagInput || this.hashtags.indexOf(this.hashtagInput) > -1) return;

                this.hashtags.push(this.hashtagInput);
                this.hashtagInput = "";
            },
            hashtagRemove(hashtag) {
                this.hashtags = this.hashtags.filter(tag => tag !== hashtag);
            }
        },
        computed: {
            isNotExistHashtag() {
                return this.hashtags.length === 0;
            },
            getCategory() {
                return this.$route.query.category;
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
            width: 40px;
            height: 40px;
        }
    }
</style>
