<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from './components/AppHeader.vue'
import AppTabs from './components/AppTabs.vue'
import RouteBreadcrumb from './components/RouteBreadcrumb.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'
import { useSettingsStore } from '@/stores/settings'
const settings=useSettingsStore(); const mobile=useMediaQuery('(max-width: 900px)'); const drawerOpen=ref(false); const settingsOpen=ref(false)
function toggleNav(){
  if (mobile.value) drawerOpen.value = true
  else settings.toggleCollapsed()
}
</script>
<template>
  <a
    class="skip-link"
    href="#main-content"
  >跳到主要内容</a>
  <div
    class="app-shell"
    :class="{collapsed:settings.collapsed}"
  >
    <AppSidebar
      v-if="!mobile"
      class="desktop-sidebar"
      :collapsed="settings.collapsed"
    />
    <a-drawer
      v-else
      :open="drawerOpen"
      placement="left"
      :width="258"
      :closable="false"
      :body-style="{padding:0}"
      @close="drawerOpen=false"
    >
      <AppSidebar @navigate="drawerOpen=false" />
    </a-drawer>
    <div class="app-main">
      <AppHeader
        :collapsed="settings.collapsed"
        :mobile="mobile"
        @toggle="toggleNav"
        @settings="settingsOpen=true"
      /><AppTabs />
      <main
        id="main-content"
        class="content"
      >
        <RouteBreadcrumb class="breadcrumb" /><RouterView v-slot="{Component}">
          <Transition
            name="page"
            mode="out-in"
          >
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
    <SettingsDrawer
      :open="settingsOpen"
      @close="settingsOpen=false"
    />
  </div>
</template>
<style scoped>
.skip-link{position:fixed;left:16px;top:-50px;z-index:9999;padding:10px 14px;border-radius:8px;color:#fff;background:var(--app-primary);transition:top var(--app-fast)}.skip-link:focus{top:12px}.app-shell{min-height:100vh;display:grid;grid-template-columns:258px minmax(0,1fr);transition:grid-template-columns var(--app-normal) var(--app-ease)}.app-shell.collapsed{grid-template-columns:76px minmax(0,1fr)}.desktop-sidebar{position:sticky;top:0;height:100vh}.app-main{min-width:0}.content{min-height:calc(100vh - 103px);padding:18px 24px 32px}.breadcrumb{display:block;margin-bottom:14px}@media(max-width:900px){.app-shell{display:block}.content{padding:16px 14px 28px}}
</style>
