<script setup lang="ts">
import { computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import { DashboardOutlined, TableOutlined, FormOutlined, SafetyCertificateOutlined, TeamOutlined, IdcardOutlined, MenuOutlined, PieChartOutlined } from '@ant-design/icons-vue'
import BrandMark from '@/components/BrandMark.vue'
import { childRoutes } from '@/router/routes'
import { filterRoutes } from '@/router/permission'
import { useSessionStore } from '@/stores/session'

defineProps<{ collapsed?: boolean }>()
const emit = defineEmits<{ navigate: [] }>()
const route = useRoute()
const router = useRouter()
const session = useSessionStore()
const icons: Record<string, any> = { dashboard: DashboardOutlined, table: TableOutlined, form: FormOutlined, safety: SafetyCertificateOutlined, team: TeamOutlined, idcard: IdcardOutlined, menu: MenuOutlined, chart: PieChartOutlined }
const menuItems = computed(() => {
  const visible = filterRoutes(childRoutes, session.permissions).filter(item => !item.meta?.hidden)
  const singles = visible.filter(item => !item.meta?.group).map(item => ({ key: `/${item.path}`, icon: () => h(icons[item.meta?.icon as string] ?? DashboardOutlined), label: item.meta?.title }))
  const groups = [...new Set(visible.map(item => item.meta?.group).filter(Boolean))].map(group => ({
    key: `group-${group}`,
    label: group,
    type: 'group',
    children: visible.filter(item => item.meta?.group === group).map(item => ({ key: `/${item.path}`, icon: () => h(icons[item.meta?.icon as string] ?? DashboardOutlined), label: item.meta?.title })),
  }))
  return [...singles.slice(0, 1), ...groups, ...singles.slice(1)]
})
const select: MenuProps['onSelect'] = ({ key }) => {
  router.push(String(key))
  emit('navigate')
}
</script>

<template>
  <aside
    class="sidebar"
    :class="{ collapsed }"
  >
    <div class="sidebar-brand">
      <BrandMark
        :compact="collapsed"
        inverse
      />
    </div>
    <a-menu
      theme="dark"
      mode="inline"
      :selected-keys="[route.path]"
      :items="menuItems"
      @select="select"
    />
    <div
      v-if="!collapsed"
      class="sidebar-foot"
    >
      <span class="pulse" /><div><b>系统运行正常</b><small>v0.1.0 · Vue 3</small></div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar { height:100%; padding:0 10px 14px; background:var(--app-sidebar); }
.sidebar-brand { height:64px; display:flex; align-items:center; padding:0 8px; }
.sidebar :deep(.ant-menu) { background:transparent; border:0; }
.sidebar :deep(.ant-menu-item), .sidebar :deep(.ant-menu-item-group-list .ant-menu-item) { position:relative; margin-inline:0; width:100%; }
.sidebar :deep(.ant-menu-item-selected)::before { position:absolute; left:-10px; top:9px; bottom:9px; width:3px; border-radius:0 4px 4px 0; background:#818cf8; content:''; }
.sidebar-foot { display:flex; gap:10px; align-items:center; margin:18px 8px 0; padding:11px; border:1px solid rgba(255,255,255,.08); border-radius:10px; color:#d5dbea; background:rgba(255,255,255,.035); }
.sidebar-foot b,.sidebar-foot small { display:block; }.sidebar-foot b{font-size:12px}.sidebar-foot small{margin-top:2px;color:#8490a5;font-size:10px}.pulse{width:8px;height:8px;border-radius:50%;background:#34d399;box-shadow:0 0 0 4px rgba(52,211,153,.12)}
</style>
