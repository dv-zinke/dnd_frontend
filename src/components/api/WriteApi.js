import axios from 'axios';

class WriteApi {

    http;
    constructor() {
        this.initializeAxios();
    }
    initializeAxios() {
        this.http = axios.create({
            baseURL: "http://ec2-13-58-81-87.us-east-2.compute.amazonaws.com:9010/api/v1/"
        });
    }



    getBestDocument(){
        return this.http.get("/document/best");
    }
    getNewDocument(){
        return this.http.get("/document/new");
    }
    getAllDocument() {
        return this.http.get(`document`);
    }

    getDocumentById(id) {
        return this.http.get(`/document/${id}`)
    }

    getDocumentHashtagByHashtag(tag, page, size) {
        return this.http.get(`/doc-hashtag?HashtagName=${tag}&page=${page}&size=${size}`)
    }

    getContainHashTag(name) {
        return this.http.get(`/hashtag/search?name=${name}`)
    }

    createDocument(requestData) {
        return this.http.post('/document/create', requestData)
    }
    updateDocument(requestData) {
        return this.http.post("/document/update", requestData)
    }

    getCommentByDocumentId(documentId, page, size){
        return this.http.get(`/comment/find?document_id=${documentId}&page=${page}&size=${size}`)
    }
    createComment(commentParam) {
        return this.http.post("/comment/create", commentParam)
    }

    getDocumentVersionByDocumentId(documentId, page, size){
        return this.http.get(`/document-version/search?document_id=${documentId}&page=${page}&size=${size}`)
    }
}


let WriteApiVariable = null;
export default () => {
    if (WriteApiVariable === null) {
        WriteApiVariable = new WriteApi();
    }
    return WriteApiVariable;
};
