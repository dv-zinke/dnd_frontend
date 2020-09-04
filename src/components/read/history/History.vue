<template>
    <v-container>
        <div class="history-header">
            <v-icon @click="goRead" class="back-btn">
                mdi-arrow-left
            </v-icon>
            <span class="title pt-2">
                히스토리
            </span>
        </div>
        <v-divider></v-divider>
        <v-data-table
                :headers="headers"
                :items="data"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                class="elevation-1"
                @page-count="pageCount = $event"
        >

            <template v-slot:item.user="{ item }">
                <span>{{getUserName(item.contributer.id, users)}}</span>
            </template>

            <template v-slot:item.edit="{ item }">
                <div>
                    <v-btn @click="diffOpen(item.data_url)">
                        비교
                    </v-btn>
                </div>
            </template>

            <template v-slot:item.created_at="{ item }">
                <span>{{getDate(item.created_at)}}</span>
            </template>
        </v-data-table>
        <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>



    </v-container>
</template>

<script>
    import WriteApi from "../../api/WriteApi";
    import UserApi from "../../api/UserApi";

    export default {
        name: "History",

        data() {
            return {

                page: 0,
                pageCount: 1,
                itemsPerPage: 10,
                headers: [
                    { text: '업데이트 날짜', value: 'created_at' },
                    { text: '수정자' ,value: "user" },
                    { text: '동작',  value: "edit"},
                ],
                data:[],
                users:[],
                changeText : "",
            }
        },
        mounted(){
            this.getUsers();
            this.getDocumentVersion();
        },
        methods: {
            goRead() {
                this.$router.push({name: 'Read', query: {document_id: this.getDocumentId.toString()}})
            },
            getDocumentVersion(){
                WriteApi().getDocumentVersionByDocumentId(this.getDocumentId, this.page, this.itemsPerPage)
                    .then(res =>{
                        this.data = res.data.content;
                    })
            },
            getUsers(){
                UserApi().getAllUser()
                    .then(res =>{
                        this.users = res.data;
                    })
            },
            diffOpen(url){
                this.$store.commit('setDataUrl', url);
                this.$router.push({path: '/diff/'+ this.getDocumentId })
            },
            getDate(date){
                const dateValue = new Date(date);
                dateValue.setHours(dateValue.getHours() + 9);
                const zero = num => num < 10 && num >= 0 ? "0" + num : num;
                const dateKo = `${dateValue.getFullYear()}/${zero(dateValue.getMonth() + 1)}/${zero(dateValue.getDate())}
                ${zero(dateValue.getHours())}:${zero(dateValue.getMinutes())}:${zero(dateValue.getSeconds())}`;
                return dateKo;
            }
        },
        computed: {
            getDocumentId() {
                return this.$route.query.document_id;
            }
        },
    }
</script>

<style scoped lang="scss">
    .history-header {
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
    .diff-modal {
        ins {
            background: lightgreen;
            text-decoration: none;
        }

        del {
            background: pink;
        }
    }
</style>
