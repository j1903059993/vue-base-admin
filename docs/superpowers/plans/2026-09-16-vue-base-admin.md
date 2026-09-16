# Vue Base Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, reusable Vue 3 administration template with Ant Design Vue, ECharts, permissions, mock APIs, representative management flows, tests, and contributor documentation.

**Architecture:** A single Vite application separates platform code (`router`, `stores`, `services`, `layouts`) from removable demo modules (`views`, `mocks`). Route metadata drives menus and permissions, semantic CSS variables drive appearance, and MSW gives pages the same typed service boundary used by a real backend.

**Tech Stack:** Vue 3, TypeScript, Vite, Ant Design Vue, ECharts, vue-echarts, Vue Router, Pinia, Axios, MSW, VueUse, Vitest, Vue Test Utils, Playwright, pnpm.

---

### Task 1: Scaffold and quality baseline

**Files:**
- Create: `package.json`, `pnpm-lock.yaml`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `env.d.ts`
- Create: `.gitignore`, `.editorconfig`, `.prettierrc.json`, `eslint.config.js`
- Create: `src/main.ts`, `src/App.vue`, `src/styles/index.css`, `src/styles/tokens.css`
- Test: `src/App.spec.ts`

- [ ] **Step 1: Add the baseline component test**

```ts
import { mount } from '@vue/test-utils'
import App from './App.vue'

it('renders the router outlet', () => {
  expect(mount(App, { global: { stubs: ['RouterView'] } }).findComponent({ name: 'RouterView' }).exists()).toBe(true)
})
```

- [ ] **Step 2: Install the declared runtime and development packages**

Run: `pnpm install`
Expected: a lockfile is created with no unresolved peer dependency errors.

- [ ] **Step 3: Implement the Vite entry, test setup, semantic tokens, and an App root containing `<RouterView />`**

```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template><RouterView /></template>
```

- [ ] **Step 4: Verify the baseline**

Run: `pnpm typecheck && pnpm test --run && pnpm build`
Expected: all three commands exit with status 0.

- [ ] **Step 5: Commit**

Run: `git add . && git commit -m "chore: scaffold vue base admin"`

### Task 2: Router, permission model, and session state

**Files:**
- Create: `src/router/index.ts`, `src/router/routes.ts`, `src/router/types.ts`, `src/router/permission.ts`
- Create: `src/stores/index.ts`, `src/stores/session.ts`, `src/stores/permission.ts`, `src/stores/settings.ts`, `src/stores/tabs.ts`
- Create: `src/utils/storage.ts`, `src/utils/permission.ts`
- Test: `src/router/permission.spec.ts`, `src/utils/permission.spec.ts`

- [ ] **Step 1: Write tests for recursive route filtering and wildcard permission checks**

```ts
expect(filterRoutes(routes, ['system:user:list']).map(route => route.name)).toContain('System')
expect(hasPermission(['system:*'], 'system:user:create')).toBe(true)
expect(hasPermission(['system:user:list'], 'system:user:delete')).toBe(false)
```

- [ ] **Step 2: Run the focused tests and confirm missing exports fail**

Run: `pnpm test --run src/router/permission.spec.ts src/utils/permission.spec.ts`
Expected: FAIL because `filterRoutes` and `hasPermission` are not implemented.

- [ ] **Step 3: Implement typed route metadata, route filtering, stores, persistence, and navigation guards**

```ts
export function hasPermission(granted: string[], required?: string) {
  if (!required) return true
  return granted.some(item => item === '*' || item === required || (item.endsWith('*') && required.startsWith(item.slice(0, -1))))
}
```

- [ ] **Step 4: Run type checking and permission tests**

Run: `pnpm typecheck && pnpm test --run src/router/permission.spec.ts src/utils/permission.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src && git commit -m "feat: add routing and permission foundation"`

### Task 3: Application shell and theme system

**Files:**
- Create: `src/layouts/BasicLayout.vue`, `src/layouts/components/AppSidebar.vue`, `AppHeader.vue`, `AppTabs.vue`, `SettingsDrawer.vue`, `RouteBreadcrumb.vue`
- Create: `src/components/BrandMark.vue`, `src/components/PageContainer.vue`, `src/components/PermissionGate.vue`
- Create: `src/composables/useTheme.ts`, `src/composables/useBreakpoint.ts`
- Test: `src/components/PermissionGate.spec.ts`, `src/stores/settings.spec.ts`

- [ ] **Step 1: Test hidden unauthorized content and persisted theme preferences**

```ts
expect(wrapper.text()).not.toContain('Delete user')
settings.setThemeMode('dark')
expect(document.documentElement.dataset.theme).toBe('dark')
```

- [ ] **Step 2: Confirm the new tests fail before implementation**

Run: `pnpm test --run src/components/PermissionGate.spec.ts src/stores/settings.spec.ts`
Expected: FAIL for missing shell behavior.

- [ ] **Step 3: Implement responsive sidebar/drawer navigation, header actions, breadcrumbs, route tabs, and settings drawer**

The layout contract is `BasicLayout -> header + sidebar/drawer + tabs + main RouterView`. Active navigation uses a 3 px indigo rail. Theme mode, primary color, density, collapsed state, and tab preference persist through the settings store.

- [ ] **Step 4: Verify responsive and theme behavior**

Run: `pnpm typecheck && pnpm test --run src/components/PermissionGate.spec.ts src/stores/settings.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src && git commit -m "feat: build responsive admin shell"`

### Task 4: Mock API and authentication flow

**Files:**
- Create: `src/services/http.ts`, `src/services/types.ts`, `src/services/auth.ts`, `src/services/users.ts`
- Create: `src/mocks/browser.ts`, `src/mocks/handlers.ts`, `src/mocks/data/users.ts`
- Create: `src/views/account/LoginView.vue`, `src/views/account/ProfileView.vue`
- Create: `src/views/status/ForbiddenView.vue`, `NotFoundView.vue`, `ServerErrorView.vue`, `SuccessView.vue`
- Test: `src/services/http.spec.ts`, `src/views/account/LoginView.spec.ts`

- [ ] **Step 1: Test error normalization and demo login**

```ts
expect(normalizeApiError({ response: { status: 403, data: { message: 'Forbidden' } } }).code).toBe('HTTP_403')
expect(await login({ username: 'admin', password: 'admin123' })).toMatchObject({ user: { role: 'admin' } })
```

- [ ] **Step 2: Run focused tests to see missing HTTP/auth behavior fail**

Run: `pnpm test --run src/services/http.spec.ts src/views/account/LoginView.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement Axios interceptors, a single refresh promise, MSW handlers, three demo accounts, login redirect, and status pages**

The demo roles are `admin`, `operator`, and `viewer`; all demo passwords are `admin123`. The mock API responds with `{ code, message, data }` and list payloads use `{ items, total, page, pageSize }`.

- [ ] **Step 4: Verify authentication and service tests**

Run: `pnpm typecheck && pnpm test --run src/services/http.spec.ts src/views/account/LoginView.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src && git commit -m "feat: add mock api and authentication"`

### Task 5: Dashboard and ECharts components

**Files:**
- Create: `src/components/charts/BaseChart.vue`, `src/components/StatCard.vue`
- Create: `src/views/dashboard/DashboardView.vue`, `src/views/charts/ChartsView.vue`
- Create: `src/data/dashboard.ts`
- Test: `src/components/charts/BaseChart.spec.ts`

- [ ] **Step 1: Test chart empty state and accessible title**

```ts
expect(mount(BaseChart, { props: { option: {}, empty: true, title: 'Traffic trend' } }).text()).toContain('暂无数据')
expect(wrapper.attributes('aria-label')).toBe('Traffic trend')
```

- [ ] **Step 2: Run the test and confirm BaseChart is missing**

Run: `pnpm test --run src/components/charts/BaseChart.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement responsive theme-aware charts and a useful dashboard**

Dashboard content includes four summary cards, a 14-day traffic chart, channel donut, task progress, recent activity, and quick links. `BaseChart` uses `vue-echarts`, autoresizes, follows theme changes, displays empty data, and disposes cleanly.

- [ ] **Step 4: Verify chart behavior and production build**

Run: `pnpm test --run src/components/charts/BaseChart.spec.ts && pnpm build`
Expected: PASS and a successful build.

- [ ] **Step 5: Commit**

Run: `git add src && git commit -m "feat: add dashboard and echarts examples"`

### Task 6: Reusable tables, forms, and system management

**Files:**
- Create: `src/components/QueryPanel.vue`, `src/components/StatusTag.vue`, `src/composables/usePagedTable.ts`
- Create: `src/views/examples/TableExampleView.vue`, `FormExampleView.vue`, `PermissionExampleView.vue`
- Create: `src/views/system/UserManagementView.vue`, `RoleManagementView.vue`, `MenuManagementView.vue`
- Create: `src/services/roles.ts`, `src/services/menus.ts`, `src/mocks/data/roles.ts`, `src/mocks/data/menus.ts`
- Test: `src/composables/usePagedTable.spec.ts`, `src/views/system/UserManagementView.spec.ts`

- [ ] **Step 1: Test paged loading, stale request handling, and permission-gated actions**

```ts
await table.load({ page: 2, pageSize: 10 })
expect(table.pagination.page).toBe(2)
expect(table.rows.value).toHaveLength(10)
expect(viewerWrapper.text()).not.toContain('删除')
```

- [ ] **Step 2: Run the tests and confirm the composable/pages are absent**

Run: `pnpm test --run src/composables/usePagedTable.spec.ts src/views/system/UserManagementView.spec.ts`
Expected: FAIL.

- [ ] **Step 3: Implement query/table composition, user CRUD, role assignment, menu tree editing, and representative form patterns**

All table pages show loading, empty, failure, retry, pagination, selection, and batch action states. Ant Design Vue component props and slots remain accessible so consumers are not trapped by the wrapper.

- [ ] **Step 4: Verify the management flows**

Run: `pnpm typecheck && pnpm test --run src/composables/usePagedTable.spec.ts src/views/system/UserManagementView.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src && git commit -m "feat: add table form and system examples"`

### Task 7: Documentation and browser verification

**Files:**
- Create: `README.md`, `LICENSE`, `.env.example`
- Create: `docs/quick-start.md`, `docs/project-structure.md`, `docs/add-page.md`, `docs/api-integration.md`, `docs/permissions.md`, `docs/themes.md`, `docs/deployment.md`
- Create: `playwright.config.ts`, `tests/e2e/auth.spec.ts`, `tests/e2e/theme.spec.ts`, `tests/e2e/users.spec.ts`
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write browser tests for sign-in, protected navigation, theme persistence, and user creation**

```ts
await page.goto('/login')
await page.getByLabel('用户名').fill('admin')
await page.getByLabel('密码').fill('admin123')
await page.getByRole('button', { name: '登录' }).click()
await expect(page).toHaveURL(/dashboard/)
```

- [ ] **Step 2: Run browser tests and capture any integration failures**

Run: `pnpm exec playwright install chromium && pnpm test:e2e`
Expected: all listed flows pass after fixes in the same task.

- [ ] **Step 3: Write user-facing documentation and CI**

README must state what the template provides, show credentials, list commands, explain directory boundaries, and link each guide. CI runs `pnpm lint`, `pnpm typecheck`, `pnpm test --run`, `pnpm build`, and `pnpm test:e2e`.

- [ ] **Step 4: Run the full local quality gate**

Run: `pnpm lint && pnpm typecheck && pnpm test --run && pnpm build && pnpm test:e2e`
Expected: all commands exit with status 0.

- [ ] **Step 5: Commit**

Run: `git add . && git commit -m "docs: complete template guides and verification"`

### Task 8: Release repository

**Files:**
- Modify: `README.md` only if final verification changes commands or screenshots

- [ ] **Step 1: Inspect repository state and history**

Run: `git status --short && git log --oneline --decorate -10`
Expected: no uncommitted changes and a readable sequence of focused commits.

- [ ] **Step 2: Rename the default branch**

Run: `git branch -M main`
Expected: `git branch --show-current` prints `main`.

- [ ] **Step 3: Create or connect the GitHub repository named `vue-base-admin`**

Use the authenticated GitHub account `j1903059993`, keep the repository public unless the user requests otherwise, and set the description to `A modern, reusable Vue 3 admin template built with TypeScript, Ant Design Vue and ECharts.`

- [ ] **Step 4: Push and verify the default branch**

Run: `git push -u origin main`
Expected: GitHub reports `main` as the repository default and the remote tree matches the local commit.
