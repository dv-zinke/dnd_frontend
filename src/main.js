import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import router from './router'
import infiniteScroll from 'vue-infinite-scroll';
Vue.config.productionTip = false;
Vue.use(infiniteScroll);


Vue.use(VueRouter);
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
