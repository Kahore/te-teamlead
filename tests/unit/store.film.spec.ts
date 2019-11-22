import Vue from 'vue';
import Vuex from 'vuex';
import film from '@/store/modules/film.ts';
import { Genre } from '@/store/models';
Vue.use(Vuex);

let store: any;
beforeEach(() => {
  store = new Vuex.Store({
    state: {
      genres: film.state.genres,
      isLoading: film.state.isLoading
    },
    mutations: {
      LOADING_EVENT: film.mutations.LOADING_EVENT,
      LOAD_GENRES: film.mutations.LOAD_GENRES
    },
    actions: {
      LOAD_GENRES: film.actions.LOAD_GENRES
    }
  });
});

describe('modules/film.ts getters', () => {
  it('should return genres', () => {
    expect(film.getters.GET_GENRES(store.state)).toBe(store.state.genres);
  });
  it('should return isLoading', () => {
    expect(film.getters.IS_LOADING(store.state)).toBe(store.state.isLoading);
  });
});

let newGenre: Genre = {
  id: 1,
  name: 'SomeName',
  list: []
};
describe('modules/film.js mutations', () => {
  it('should push new value', () => {
    film.mutations.LOAD_GENRES(store.state, newGenre);
    expect(store.state.genres[0]).toBe(newGenre);
  });
  it('should invert isLoading', () => {
    film.mutations.LOADING_EVENT(store.state);
    // MEMO: isShowModal defalult value is false
    expect(store.state.isLoading).toBe(true);
  });
});

describe('modules/film.js actions', () => {
  it('test LOAD_GENRES using mock mutation, but real store', async() => {
    let commit = jest.fn();
    await film.actions.LOAD_GENRES({ commit });
    expect(commit).toHaveBeenCalledWith('LOADING_EVENT');
  });
});
