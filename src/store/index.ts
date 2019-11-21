import Vue from 'vue';
import Vuex from 'vuex';
import film from '@/store/modules/film.ts';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    film
  }
});
