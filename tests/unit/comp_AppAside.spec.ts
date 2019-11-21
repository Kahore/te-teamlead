import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import AppAside from '@/components/layout/AppAside.vue';
const localVue = createLocalVue();
localVue.use(Vuex);
let store: any;
let getters;
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
    ]
  };

  store = new Vuex.Store({ getters });
});

describe('AppAside.vue', () => {
  it('should display genres', () => {
    const wrapper = shallowMount(AppAside, {
      store,
      localVue,
      attachToDocument: true
    });
    const genresLink = wrapper.findAll('a');
    expect(genresLink).toHaveLength(store.getters.GET_GENRES.length);
    wrapper.destroy();
  });
});
