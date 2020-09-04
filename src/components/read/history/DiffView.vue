<template>
    <v-container>
        <div class="diff-header">
            <v-icon @click="goHistory" class="back-btn">
                mdi-arrow-left
            </v-icon>
            <span class="title pt-2">
                비교
            </span>
        </div>
        <div v-if="isLoad">
            <span class="headline">{{originalTitle}}</span>
            <Viewer :initialValue="diffValue"  />
        </div>
    </v-container>
</template>

<script>
    import { Viewer } from '@toast-ui/vue-editor';
    import axios from 'axios';
    import WriteApi from "../../api/WriteApi";
    import {mapState} from "vuex";
    import htmldiff from 'htmldiff-js';
    export default {
        name: "DiffView",
        components: {
            Viewer
        },
        data() {
            return {
                prevDocument: "",
                originalDocument: "",
                originalTitle:"",
                diffValue:"",
                isLoad: false
            }
        },
        mounted(){
          this.getDocument();
        },
        methods: {
            goHistory() {
                this.$router.push({name: 'History', query: {document_id: this.$route.params.id}})
            },
            getDocument(){
                return WriteApi().getDocumentById(this.$route.params.id)
                    .then(({data}) =>{
                        this.originalTitle = `${data.title}`;
                        return axios.get(data.last_version.data_url)
                    })
                    .then(res =>{
                        this.originalDocument = res.data;
                        return axios.get(this.url)
                    })
                    .then(res => {
                        this.prevDocument =  res.data;
                        this.diffValue = htmldiff.execute(this.prevDocument,this.originalDocument);
                        this.isLoad = true;
                    })
            },
        },
        computed: {
            ...mapState({
                url: state => state.dataUrl
            })
        }
    }
</script>

<style lang="scss">
    .diff-header {
        position: relative;
        text-align: center;
        padding: 15px 0px;

        .title {
            font-size: 24px !important;
            font-weight: bold;
        }

        .back-btn {
            position: absolute;
            top: 15px;
            left: 5px;
        }
    }
    ins {
        background: lightgreen;
        text-decoration: none;
    }

    del {
        background: pink;
    }

</style>
