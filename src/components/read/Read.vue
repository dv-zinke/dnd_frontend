<template>
    <v-container v-if="isLoad">
        <v-container class="header">
            <v-icon @click="goMain" class="close_btn">
                mdi-close
            </v-icon>
            <span>꿀팁</span>
            <v-btn
                   class="complete_btn"
                   color="success"
                   small
                   @click="goModify"
            >편집
            </v-btn>
        </v-container>
        <Viewer :initialValue="viewerText" height="400px"  />
        <read-bottom-menu :document-id="getDocumentId"/>
        <v-divider></v-divider>
        <comment :document-id="getDocumentId"/>
    </v-container>
    <v-container v-else>
        <v-progress-circular
                indeterminate
                class="progress"
                color="primary"
        ></v-progress-circular>
    </v-container>
</template>

<script>

    import { Viewer } from '@toast-ui/vue-editor';
    import Comment from "./Comment";
    import WriteApi from "../api/WriteApi";
    import axios from 'axios';
    import ReadBottomMenu from "./ReadBottomMenu";
    export default {
        name: "Read",
        components: {
            ReadBottomMenu,
            Comment,
            Viewer
        },
        data() {
            return {
                isLoad:false,
                viewerText: ''
            };
        },
        mounted() {
            this.getDocument();
        },
        methods: {
            getDocument() {
                WriteApi().getDocumentById(this.getDocumentId)
                    .then(({data}) =>{
                        this.viewerText += `# ${data.title} \n`;
                        return axios.get(data.last_version.data_url)
                    })
                    .then(res =>{
                        this.viewerText += res.data;
                        this.isLoad =true;
                        console.log(this.viewerText)

                    })

            },
            goModify(){
                this.$router.push({name: 'Write', query: {document_id: this.getDocumentId.toString(), is_modify: true.toString()}})
            },
            goMain(){
                this.$router.push({path: "/"})
            },

        },
        computed: {
            getDocumentId() {
                return this.$route.query.document_id;
            }
        },
    }
</script>

<style scoped lang="scss">
    .progress {
        margin: 250px auto 0px auto;
        text-align: center;
        display: block;
    }
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
</style>
