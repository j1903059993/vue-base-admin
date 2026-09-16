import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { readStorage, writeStorage } from '@/utils/storage'

export type UserRole = 'admin' | 'operator' | 'viewer'
export interface SessionUser { id: number; name: string; username: string; role: UserRole; avatar?: string }

const permissionsByRole: Record<UserRole, string[]> = {
  admin: ['*'],
  operator: ['dashboard:view', 'examples:*', 'system:user:list', 'system:user:create', 'system:user:update', 'charts:view'],
  viewer: ['dashboard:view', 'examples:table', 'charts:view'],
}

export const useSessionStore = defineStore('session', () => {
  const user = ref<SessionUser | null>(readStorage<SessionUser | null>('vba-user', null))
  const token = ref(readStorage('vba-token', ''))
  const permissions = computed(() => user.value ? permissionsByRole[user.value.role] : [])
  const authenticated = computed(() => Boolean(user.value && token.value))

  async function login(username: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 450))
    if (password !== 'admin123' || !['admin', 'operator', 'viewer'].includes(username)) throw new Error('用户名或密码错误')
    const role = username as UserRole
    user.value = { id: role === 'admin' ? 1 : role === 'operator' ? 2 : 3, name: role === 'admin' ? '平台管理员' : role === 'operator' ? '运营专员' : '访客用户', username, role }
    token.value = `demo-${role}-token`
    writeStorage('vba-user', user.value)
    writeStorage('vba-token', token.value)
  }

  function logout() {
    user.value = null
    token.value = ''
    localStorage.removeItem('vba-user')
    localStorage.removeItem('vba-token')
  }

  return { user, token, permissions, authenticated, login, logout }
})
