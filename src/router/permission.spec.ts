import { describe, expect, it } from 'vitest'
import type { RouteRecordRaw } from 'vue-router'
import { filterRoutes } from './permission'

describe('filterRoutes', () => {
  it('filters nested routes without mutating the input', () => {
    const routes: RouteRecordRaw[] = [{
      path: '/system', name: 'System', component: { template: '<div />' },
      children: [
        { path: 'users', name: 'Users', component: { template: '<div />' }, meta: { permission: 'system:user:list' } },
        { path: 'roles', name: 'Roles', component: { template: '<div />' }, meta: { permission: 'system:role:list' } },
      ],
    }]
    const result = filterRoutes(routes, ['system:user:list'])
    expect(result[0].children?.map(route => route.name)).toEqual(['Users'])
    expect(routes[0].children).toHaveLength(2)
  })
})
