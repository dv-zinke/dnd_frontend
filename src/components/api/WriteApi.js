import axios from 'axios';
class WriteApi {

    http;
    constructor() {
        this.initializeAxios();
    }
    initializeAxios() {
        this.http = axios.create({
            baseURL: "http://127.0.0.1:9010/api/v1/",
        });
    }

    getAllDocument() {
        return this.http.get(`document`);
    }

    getDocumentById(id) {
        return this.http.get(`/document/${id}`)
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
