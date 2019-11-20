import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueYoutube from 'vue-youtube';
import '@/assets/styles/app.scss';
Vue.config.productionTip = false;
Vue.use(VueYoutube);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
