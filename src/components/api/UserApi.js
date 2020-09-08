import axios from 'axios';
class UserApi {

    http;
    constructor() {
        this.initializeAxios();
    }
    initializeAxios() {
        this.http = axios.create({
            baseURL: "http://ec2-13-58-81-87.us-east-2.compute.amazonaws.com:9020",
        });
    }
    createUser(userInfo){
        return this.http.post("/join", userInfo);
    }

    loginUser(userInfo) {
        return this.http.post("/login", userInfo)
    }

    getUser(userId) {
        return this.http.get(`/find?userId=${userId}`)
    }

    getAllUser() {
        return this.http.get("/all-user");
    }

    saveLikes(userId, likes) {
        return this.http.post(`/likes/${userId}`, likes)
    }

    avatarChange(userId, formData){
        return this.http.post(`/avatar/${userId}`, formData, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
    }

}


let UserApiVariable = null;
export default () => {
    if (UserApiVariable === null) {
        UserApiVariable = new UserApi();
    }
    return UserApiVariable;
};
