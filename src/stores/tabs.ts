import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface AppTab { path: string; title: string; closable: boolean }
export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<AppTab[]>([{ path: '/dashboard', title: '工作台', closable: false }])
  function visit(tab: AppTab) { if (!tabs.value.some(item => item.path === tab.path)) tabs.value.push(tab) }
  function close(path: string) { tabs.value = tabs.value.filter(item => item.path !== path || !item.closable) }
  return { tabs, visit, close }
})
