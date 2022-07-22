import { shallowMount } from '@vue/test-utils';
import HeadingTitle from '@/components/HeadingTitle.vue';

describe('HeadingTitle.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HeadingTitle, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
