import VueRouter from 'vue-router'
import MainPage from "../pages/MainPage";
import WritePage from "../pages/WritePage";
import SignupPage from "../pages/SignupPage";
import CommunityPage from "../pages/CommunityPage";
import MapPage from "../pages/MapPage";
import MypagePage from "../pages/MypagePage";
import CategoryPage from "../pages/CategoryPage";
import ReadPage from "../pages/ReadPage";
import LoginPage from "../pages/LoginPage";
import Cookie from 'js-cookie'

const requireAuth = () => (from, to, next) => {

    const token = Cookie.get('token');
    if (typeof token === 'undefined') {
        return next('/login');
    }
    next();
};


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: MainPage,
        },
        {
            path: '/community',
            component: CommunityPage,
            beforeEnter:requireAuth()
        },
        {
            path: '/map',
            component: MapPage,
        },
        {
            path: '/mypage',
            component: MypagePage,
            beforeEnter:requireAuth()
        },
        {
            path: '/write',
            component: WritePage,
            name: "Write",
            props:true,
            beforeEnter:requireAuth()
        },
        {
            path: '/signup',
            component: SignupPage,
        },
        {
            path: '/category',
            component: CategoryPage,
            name: "Category",
            props: true,
            beforeEnter:requireAuth()
        },
        {
            path: '/read',
            component: ReadPage,
            name: "Read",
            props:true
        },
        {
            path: '/login',
            component: LoginPage,
            name: "Login",
        }


    ],
    scrollBehavior() {
        return {x: 0, y: 0}
    }
});

