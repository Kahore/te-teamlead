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
  // it('should display genres', () => {
  //   const wrapper = shallowMount(FilmDetails, {
  //     mocks: {
  //       $route: {
  //         params: { filmId }
  //       }
  //     },
  //     store,
  //     localVue,
  //     attachToDocument: true
  //   });
  //   wrapper.setData({
  //     filmDetails: {
  //       id: 1,
  //       poster_path: 'some poster_path',
  //       original_title: 'some original_title',
  //       tagline: 'some tagline',
  //       overview: 'some overview',
  //       release_date: '2019-11-21',
  //       runtime: 123,
  //       budget: 123,
  //       revenue: 123,
  //       vote_average: 3,
  //       genre: []
  //     }
  //   });
  //   console.log('TCL: wrapper', wrapper.html());
  //   wrapper.destroy();
  // });
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
