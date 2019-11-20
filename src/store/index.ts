import Vue from 'vue';
import Vuex from 'vuex';
import { Genre } from '@/store/models.ts';
import filmService from '@/service/film.ts';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    // eslint-disable-next-line
    genres: Array<Genre>(),
    isLoading: Boolean<boolean>()
  },
  getters: {
    GET_GENRES: state => {
      return state.genres;
    },
    IS_LOADING: state => {
      return state.isLoading;
    }
  },
  mutations: {
    LOADING_EVENT(state) {
      state.isLoading = !state.isLoading;
    },
    LOAD_GENRES(state, payload) {
      state.genres.push(payload);
    }
  },
  actions: {
    async LOAD_GENRES({ commit }) {
      commit('LOADING_EVENT');
      const genders: Genre[] = await filmService.getGenres();
      genders.forEach(async genre => {
        if (genre.id) {
          await filmService.getFilms(genre.id).then(filmList => {
            Vue.set(genre, 'list', filmList);
            commit('LOAD_GENRES', genre);
          });
          commit('LOADING_EVENT');
        }
      });
    }
  },
  modules: {}
});
