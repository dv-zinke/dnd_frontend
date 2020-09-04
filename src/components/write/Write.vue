<template>
    <v-container>
        <v-container class="header">
            <v-icon @click="$router.go(-1)" class="close_btn">
                mdi-close
            </v-icon>
            <span v-if="getIsModify">꿀팁 편집</span>
            <span v-else>꿀팁 공유</span>
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
                    v-if="!getIsModify"

            >
            </v-text-field>

            <v-container v-if="!isNotExistHashtag && !getIsModify">
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
                    :disabled="getIsModify"
            ></v-text-field>
        </v-row>

        <editor
                v-if="isModifyDataLoad"
                :initialValue="editorText"
                :options="editorOptions"
                :visible="editorVisible"
                height="450px"
                initialEditType="wysiwyg"
                ref="toastuiEditor"
        />
        <div class="text-center" v-else>
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </div>

        <div class="text-center">
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
        <v-snackbar
                :top="true"
                v-model="modal"
        >
            {{modalText}}

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
    import 'codemirror/lib/codemirror.css';
    import '@toast-ui/editor/dist/toastui-editor.css';
    import {Editor} from '@toast-ui/vue-editor'
    import WriteApi from "../api/WriteApi";
    import axios from 'axios';
    import {mapState} from "vuex";

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
                overlay: false,
                modal:false,
                modalText: "",
                isModifyDataLoad:false
            }
        },
        mounted() {
            this.hashtags.push(this.getCategory);
            if(this.getIsModify) this.getDocument();
            else this.isModifyDataLoad = true;
        },
        methods: {
            getDocument() {
                WriteApi().getDocumentById(this.getDocumentId)
                    .then(({data}) =>{
                        this.title = data.title;
                        return axios.get(data.last_version.data_url)
                    })
                    .then(res =>{
                        this.editorText= res.data;
                        this.isModifyDataLoad =true;
                    })

            },
            createDocument() {
                if(this.getIsModify) return this.updateDocument()
                this.overlay = true;
                const request = {
                    "document": {
                        "category": this.getCategory,
                        "title": this.title
                    },
                    "content": this.$refs.toastuiEditor.invoke('getHtml'),
                    "hashtags": this.hashtags,
                    "user_id": this.user.id
                };
                WriteApi().createDocument(request)
                    .then(res => {
                        this.$router.push({name: 'Read', query: {document_id: res.data.id}})
                    })
                    .finally(() => {
                        this.overlay = false;
                    })
            },
            updateDocument(){
                this.overlay = true;
                const request = {
                    "document_id": this.getDocumentId,
                    "content": this.$refs.toastuiEditor.invoke('getHtml'),
                    "user_id": this.user.id
                };
                WriteApi().updateDocument(request)
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
                if(this.hashtags.length === 1) {
                    this.modalText = "카테고리는 한개 이하로 할수없습니다.";
                    return this.modal = true;
                }
                this.hashtags = this.hashtags.filter(tag => tag !== hashtag);
            }
        },
        computed: {
            isNotExistHashtag() {
                return this.hashtags.length === 0;
            },
            getCategory() {
                return this.$route.query.category;
            },
            getIsModify() {
                return !!this.$route.query.is_modify;
            },
            getDocumentId() {
                return this.$route.query.document_id;
            },
            ...mapState({
                user: state => state.user
            })

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
