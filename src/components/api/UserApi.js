import axios from 'axios';
class UserApi {

    http;
    constructor() {
        this.initializeAxios();
    }
    initializeAxios() {
        this.http = axios.create({
            baseURL: "http://localhost:9020/",
        });
    }
    createUser(userInfo){
        return this.http.post("/join", userInfo);
    }

    loginUser(userInfo) {
        return this.http.post("/login", userInfo)
    }

}


let UserApiVariable = null;
export default () => {
    if (UserApiVariable === null) {
        UserApiVariable = new UserApi();
    }
    return UserApiVariable;
};
