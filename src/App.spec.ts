import { expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from './App.vue'

it('renders the router outlet', () => {
  const wrapper = mount(App, { global: { plugins: [createPinia()], stubs: { RouterView: { name: 'RouterView', template: '<main data-test="router-view" />' } } } })
  expect(wrapper.find('[data-test="router-view"]').exists()).toBe(true)
})
