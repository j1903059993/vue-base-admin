<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TabsProps } from 'ant-design-vue'
import { useTabsStore } from '@/stores/tabs'
const route=useRoute(); const router=useRouter(); const store=useTabsStore()
watch(() => route.fullPath, () => { if(route.meta.title) store.visit({path:route.path,title:String(route.meta.title),closable:!route.meta.affix}) }, {immediate:true})
const edit: TabsProps['onEdit'] = (target, action) => {
  if (action === 'remove' && (typeof target === 'string' || typeof target === 'number')) {
    const path = String(target)
    store.close(path)
    if (route.path === path) router.push(store.tabs.at(-1)?.path ?? '/dashboard')
  }
}
</script>
<template>
  <div class="tabs-wrap">
    <a-tabs
      :active-key="route.path"
      type="editable-card"
      hide-add
      size="small"
      @change="(key: string | number)=>router.push(String(key))"
      @edit="edit"
    >
      <a-tab-pane
        v-for="tab in store.tabs"
        :key="tab.path"
        :tab="tab.title"
        :closable="tab.closable"
      />
    </a-tabs>
  </div>
</template>
<style scoped>.tabs-wrap{height:39px;padding:6px 18px 0;border-bottom:1px solid var(--app-border);background:var(--app-surface)}.tabs-wrap :deep(.ant-tabs-nav){margin:0}.tabs-wrap :deep(.ant-tabs-tab){height:32px;border-bottom:0!important;background:var(--app-surface-2)!important}.tabs-wrap :deep(.ant-tabs-tab-active){background:var(--app-bg)!important}</style>
