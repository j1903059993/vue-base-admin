import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { pinia } from '@/stores'
import { useSessionStore } from '@/stores/session'
import { hasPermission } from '@/utils/permission'

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes, scrollBehavior: () => ({ top: 0 }) })

router.beforeEach(to => {
  const session = useSessionStore(pinia)
  document.title = to.meta.title ? `${to.meta.title} · Vue Base Admin` : 'Vue Base Admin'
  if (to.path === '/login' && session.authenticated) return '/dashboard'
  if (!session.authenticated && to.path !== '/login') return { path: '/login', query: { redirect: to.fullPath } }
  if (!hasPermission(session.permissions, to.meta.permission)) return '/403'
  return true
})

export default router
