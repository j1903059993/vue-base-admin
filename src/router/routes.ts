import type { RouteRecordRaw } from 'vue-router'

export const childRoutes: RouteRecordRaw[] = [
  { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/dashboard/DashboardView.vue'), meta: { title: '工作台', icon: 'dashboard', permission: 'dashboard:view', order: 1, affix: true } },
  { path: 'examples/table', name: 'TableExample', component: () => import('@/views/examples/TableExampleView.vue'), meta: { title: '表格示例', icon: 'table', permission: 'examples:table', group: '组件示例', order: 20 } },
  { path: 'examples/form', name: 'FormExample', component: () => import('@/views/examples/FormExampleView.vue'), meta: { title: '表单示例', icon: 'form', permission: 'examples:form', group: '组件示例', order: 21 } },
  { path: 'examples/permission', name: 'PermissionExample', component: () => import('@/views/examples/PermissionExampleView.vue'), meta: { title: '权限示例', icon: 'safety', permission: 'examples:permission', group: '组件示例', order: 22 } },
  { path: 'system/users', name: 'Users', component: () => import('@/views/system/UserManagementView.vue'), meta: { title: '用户管理', icon: 'team', permission: 'system:user:list', group: '系统管理', order: 30 } },
  { path: 'system/roles', name: 'Roles', component: () => import('@/views/system/RoleManagementView.vue'), meta: { title: '角色管理', icon: 'idcard', permission: 'system:role:list', group: '系统管理', order: 31 } },
  { path: 'system/menus', name: 'Menus', component: () => import('@/views/system/MenuManagementView.vue'), meta: { title: '菜单管理', icon: 'menu', permission: 'system:menu:list', group: '系统管理', order: 32 } },
  { path: 'charts', name: 'Charts', component: () => import('@/views/charts/ChartsView.vue'), meta: { title: '数据可视化', icon: 'chart', permission: 'charts:view', order: 40 } },
  { path: 'profile', name: 'Profile', component: () => import('@/views/account/ProfileView.vue'), meta: { title: '个人中心', icon: 'user', hidden: true } },
]

export const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'Login', component: () => import('@/views/account/LoginView.vue'), meta: { title: '登录', hidden: true } },
  { path: '/', component: () => import('@/layouts/BasicLayout.vue'), redirect: '/dashboard', children: childRoutes },
  { path: '/403', name: 'Forbidden', component: () => import('@/views/status/ForbiddenView.vue'), meta: { title: '无权访问', hidden: true } },
  { path: '/500', name: 'ServerError', component: () => import('@/views/status/ServerErrorView.vue'), meta: { title: '服务异常', hidden: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/status/NotFoundView.vue'), meta: { title: '页面不存在', hidden: true } },
]
