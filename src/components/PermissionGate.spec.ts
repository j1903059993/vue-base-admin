import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import PermissionGate from './PermissionGate.vue'
import { useSessionStore } from '@/stores/session'

describe('PermissionGate', () => {
  beforeEach(() => { localStorage.clear(); setActivePinia(createPinia()) })

  it('hides content that the active role cannot use', () => {
    const session = useSessionStore()
    session.user = { id: 3, name: '访客用户', username: 'viewer', role: 'viewer' }
    const wrapper = mount(PermissionGate, { props: { permission: 'system:user:delete' }, slots: { default: '删除用户', fallback: '无权限' } })
    expect(wrapper.text()).not.toContain('删除用户')
    expect(wrapper.text()).toContain('无权限')
  })
})
