import axios from 'axios';
class WriteApi {

    http;
    constructor() {
        this.initializeAxios();
    }
    initializeAxios() {
        this.http = axios.create({
            baseURL: "http://http://ec2-3-20-222-199.us-east-2.compute.amazonaws.com:9010/api/v1/",
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

    getContainHashTag(name) {
        return this.http.get(`/hashtag/search?name=${name}`)
    }

    createDocument(requestData) {
        return this.http.post('/document/create', requestData)
    }
}


let WriteApiVariable = null;
export default () => {
    if (WriteApiVariable === null) {
        WriteApiVariable = new WriteApi();
    }
    return WriteApiVariable;
};
