import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import router from './router'
import infiniteScroll from 'vue-infinite-scroll';
import store from './store'
import UtilMixin from "./mixin/UtilMixin";

Vue.config.productionTip = false;
Vue.use(infiniteScroll);
Vue.mixin(UtilMixin);



Vue.use(VueRouter);
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
