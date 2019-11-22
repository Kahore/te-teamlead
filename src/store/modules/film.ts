import Vue from 'vue';
import { Genre } from '@/store/models.ts';
import filmService from '@/service/film.ts';

export default {
  state: {
    genres: [],
    isLoading: false
  },
  getters: {
    GET_GENRES: (state: any) => {
      return state.genres;
    },
    IS_LOADING: (state: any): boolean => {
      return state.isLoading;
    }
  },
  mutations: {
    LOADING_EVENT(state: any): void {
      state.isLoading = !state.isLoading;
    },
    LOAD_GENRES(state: any, payload: Genre): void {
      state.genres.push(payload);
    }
  },
  actions: {
    async LOAD_GENRES({ commit }: any): Promise<any> {
      commit('LOADING_EVENT');
      const genders: Genre[] = await filmService.getGenres();
      genders.forEach(async(genre, index: number) => {
        if (genre.id) {
          await filmService.getFilms(genre.id).then(filmList => {
            Vue.set(genre, 'list', filmList);
            commit('LOAD_GENRES', genre);
          });
          if (index === genders.length - 1) {
            commit('LOADING_EVENT');
          }
        }
      });
    }
  }
};
