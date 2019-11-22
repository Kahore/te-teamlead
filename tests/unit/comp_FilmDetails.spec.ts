import Vuex from 'vuex';
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import FilmDetails from '@/components/FilmDetails.vue';
const localVue = createLocalVue();
localVue.use(Vuex);
let store: any;
let mutations;
beforeEach(() => {
  mutations = {
    LOADING_EVENT: jest.fn()
  };

  store = new Vuex.Store({ mutations });
});

describe('FilmDetails.vue', () => {
  const filmId = '290859';
  it('should convert incoming details to spec format', () => {
    const wrapper = shallowMount(FilmDetails, {
      mocks: {
        $route: {
          params: {
            filmId
          }
        }
      },
      store,
      localVue,
      attachToDocument: true
    });
    expect((wrapper.vm as any).fixDetails(270, '$')).toBe('270 $');
    expect((wrapper.vm as any).fixDetails(270, 'min')).toBe('270 min');
    expect((wrapper.vm as any).fixDetails(null)).toBe('No data');
  });
});
