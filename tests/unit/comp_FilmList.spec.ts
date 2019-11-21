import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import FilmList from '@/components/FilmList.vue';
const localVue = createLocalVue();
localVue.use(Vuex);
let store: any;
let getters;
let mutations: any;
let actions: any;
beforeEach(() => {
  getters = {
    GET_GENRES: () => [
      {
        id: 1,
        name: 'SomeName',
        list: []
      },
      {
        id: 2,
        name: 'SomeName 2',
        list: []
      }
    ],
    IS_LOADING: () => false
  };
  mutations = {
    LOAD_GENRES: jest.fn(),
    LOADING_EVENT: jest.fn()
  };
  actions = {
    LOAD_GENRES: jest.fn()
  };

  store = new Vuex.Store({ getters, mutations, actions });
});

describe('FilmList.vue', () => {
  it('should display genres', done => {
    const wrapper = shallowMount(FilmList, {
      store,
      localVue,
      attachToDocument: true
    });
    wrapper.vm.$nextTick(() => {
      const genresLink = wrapper.findAll('h3');
      expect(genresLink).toHaveLength(store.getters.GET_GENRES.length);
      wrapper.destroy();
      done();
    });
  });
  it('should call LOAD_GENRES on created', done => {
    const wrapper = shallowMount(FilmList, {
      store,
      localVue,
      attachToDocument: true
    });
    wrapper.vm.$nextTick(() => {
      expect(actions.LOAD_GENRES).toHaveBeenCalled();
      done();
    });
    wrapper.destroy();
  });
});
