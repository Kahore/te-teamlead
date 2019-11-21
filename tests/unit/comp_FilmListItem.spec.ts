import { shallowMount } from '@vue/test-utils';
import FilmListItem from '@/components/FilmListItem.vue';
describe('FilmDetails.vue', () => {
  it('should cut year from date string', () => {
    const wrapper = shallowMount(FilmListItem, {});
    wrapper.setProps({
      filmVal: {
        id: 1,
        poster_path: 'some poster_path',
        original_title: 'some original_title',
        release_date: '2019-11-21',
        overview: 'lorem',
        vote_average: 7
      }
    });
    expect((wrapper.vm as any).getReleaseYear('2019-11-21')).toBe(' (2019)');
    expect((wrapper.vm as any).getReleaseYear('1994-11-21')).toBe(' (1994)');
  });
});
