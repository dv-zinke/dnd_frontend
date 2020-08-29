import VueRouter from 'vue-router'
import MainPage from "../pages/MainPage";
import WritePage from "../pages/WritePage";
import SignupPage from "../pages/SignupPage";
import CommunityPage from "../pages/CommunityPage";
import MapPage from "../pages/MapPage";
import MypagePage from "../pages/MypagePage";
import CategoryPage from "../pages/CategoryPage";


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: MainPage,
        },
        {
            path: '/community',
            component: CommunityPage,
        },
        {
            path: '/map',
            component: MapPage,
        },
        {
            path: '/mypage',
            component: MypagePage,
        },
        {
            path: '/write',
            component: WritePage,
            name: "Write"
        },
        {
            path: '/signup',
            component: SignupPage,
        },
        {
            path: '/category',
            component: CategoryPage,
            name: "Category",
            props: true
        }

    ],
    scrollBehavior() {
        return {x: 0, y: 0}
    }
});

