import Vuex from 'vuex';
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
// import Home from '@/views/Home.vue';
import Home from '@/components/layout/AppNav.vue';
import FilmList from '@/components/FilmList.vue';
import AppAside from '@/components/layout/AppAside.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
// localVue.use(FilmList);
// localVue.use(AppAside);

let store: any;
let getters;
let actions;
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
    IS_LOADING: () => true
  };
  actions = {
    LOAD_GENRES: jest.fn()
  };

  store = new Vuex.Store({ getters, actions });
});

describe('AppAside.vue', () => {
  it('should mount AppAside', () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      attachToDocument: true
    });

    console.log('TCL: wrapper', wrapper.html());
    // const appAside = wrapper.find(AppAside);
    // expect(appAside.is(AppAside)).toBe(true);
    wrapper.destroy();
  });
});
