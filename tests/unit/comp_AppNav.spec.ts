import { shallowMount } from '@vue/test-utils';

import AppNav from '@/components/layout/AppNav.vue';

describe('AppNav.vue', () => {
  it('should mount AppNav', () => {
    const wrapper = shallowMount(AppNav, {
      attachToDocument: true
    });
    const navRoot = wrapper.findAll('nav');
    expect(navRoot.is('nav')).toBe(true);
    wrapper.destroy();
  });
});
