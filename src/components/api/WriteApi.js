import axios from 'axios';
class WriteApi {

    http;
    constructor() {
        this.initializeAxios();
    }
    initializeAxios() {
        this.http = axios.create({
            baseURL: "http://34.64.176.41:9010/api/v1/",
        });
    }

    getAllDocument() {
        return this.http.get(`document`);
    }
}


let WriteApiVariable = null;
export default () => {
    if (WriteApiVariable === null) {
        WriteApiVariable = new WriteApi();
    }
    return WriteApiVariable;
};
