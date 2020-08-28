import VueRouter from 'vue-router'
import MainPage from "../pages/MainPage";
import WritePage from "../pages/WritePage";
import SignupPage from "../pages/SignupPage";



export default new VueRouter({
    routes: [
        {
            path: '/',
            component: MainPage,
        },
        {
            path: '/write',
            component: WritePage,
        },
        {
            path: '/signup',
            component: SignupPage,
        }
    ]
});

