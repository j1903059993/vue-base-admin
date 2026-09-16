<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, BellOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useSessionStore } from '@/stores/session'
defineProps<{ collapsed?: boolean; mobile?: boolean }>()
const emit = defineEmits<{ toggle: []; settings: [] }>()
const session = useSessionStore()
const router = useRouter()
const searchOpen = ref(false)
function logout() { session.logout(); router.push('/login') }
</script>

<template>
  <header class="header">
    <div class="header-start">
      <a-button
        type="text"
        class="icon-button"
        aria-label="切换导航"
        @click="emit('toggle')"
      >
        <MenuUnfoldOutlined v-if="collapsed && !mobile" /><MenuFoldOutlined v-else />
      </a-button>
      <div class="context">
        <span>工作空间</span><strong>产品研发中心</strong>
      </div>
    </div>
    <div class="header-actions">
      <a-input
        v-if="searchOpen"
        autofocus
        allow-clear
        class="header-search"
        placeholder="搜索页面和功能"
        @blur="searchOpen=false"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
      <a-button
        v-else
        type="text"
        class="icon-button"
        aria-label="搜索"
        @click="searchOpen=true"
      >
        <SearchOutlined />
      </a-button>
      <a-badge dot>
        <a-button
          type="text"
          class="icon-button"
          aria-label="通知"
        >
          <BellOutlined />
        </a-button>
      </a-badge>
      <a-button
        type="text"
        class="icon-button"
        aria-label="界面设置"
        @click="emit('settings')"
      >
        <SettingOutlined />
      </a-button>
      <a-dropdown placement="bottomRight">
        <button class="profile-trigger">
          <a-avatar
            :size="32"
            class="avatar"
          >
            {{ session.user?.name.slice(0, 1) }}
          </a-avatar>
          <span class="profile-copy"><b>{{ session.user?.name }}</b><small>{{ session.user?.role }}</small></span>
        </button>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="router.push('/profile')">
              <UserOutlined /> 个人中心
            </a-menu-item><a-menu-divider /><a-menu-item
              danger
              @click="logout"
            >
              <LogoutOutlined /> 退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </header>
</template>

<style scoped>
.header { height:64px; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:0 20px; border-bottom:1px solid var(--app-border); background:color-mix(in srgb,var(--app-surface) 94%,transparent); backdrop-filter:saturate(160%) blur(12px); }
.header-start,.header-actions,.profile-trigger{display:flex;align-items:center}.header-start{gap:14px}.header-actions{gap:4px}.icon-button{width:38px;height:38px}.context span,.context strong,.profile-copy b,.profile-copy small{display:block}.context span{color:var(--app-muted);font-size:10px;letter-spacing:.07em;text-transform:uppercase}.context strong{font-size:13px}.header-search{width:230px}.profile-trigger{gap:9px;margin-left:6px;padding:4px 7px;border:0;border-radius:9px;color:var(--app-text);background:transparent;cursor:pointer}.profile-trigger:hover{background:var(--app-surface-2)}.avatar{background:linear-gradient(145deg,#6366f1,#4338ca)}.profile-copy{text-align:left}.profile-copy b{font-size:12px}.profile-copy small{color:var(--app-muted);font-size:10px;text-transform:capitalize}
@media(max-width:720px){.context,.profile-copy,.header-actions :deep(.ant-badge){display:none}.header{padding:0 12px}.header-search{width:150px}}
</style>
