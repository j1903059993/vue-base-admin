import type { RouteRecordRaw } from 'vue-router'
import { hasPermission } from '@/utils/permission'

export function filterRoutes(routes: RouteRecordRaw[], permissions: string[]): RouteRecordRaw[] {
  return routes.reduce<RouteRecordRaw[]>((list, route) => {
    if (!hasPermission(permissions, route.meta?.permission as string | undefined)) return list
    const next = { ...route }
    if (route.children) next.children = filterRoutes(route.children, permissions)
    list.push(next)
    return list
  }, [])
}
