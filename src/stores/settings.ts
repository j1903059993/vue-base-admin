import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { readStorage, writeStorage } from '@/utils/storage'

export type ThemeMode = 'light' | 'dark' | 'system'
export const useSettingsStore = defineStore('settings', () => {
  const themeMode = ref<ThemeMode>(readStorage<ThemeMode>('vba-theme', 'light'))
  const primaryColor = ref(readStorage('vba-primary', '#4f46e5'))
  const density = ref<'small' | 'middle' | 'large'>(readStorage('vba-density', 'middle'))
  const collapsed = ref(readStorage('vba-collapsed', false))
  const systemDark = ref(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const resolvedTheme = computed(() => themeMode.value === 'system' ? (systemDark.value ? 'dark' : 'light') : themeMode.value)

  function applyTheme() {
    document.documentElement.dataset.theme = resolvedTheme.value
    document.documentElement.style.setProperty('--app-primary', primaryColor.value)
  }
  function setThemeMode(mode: ThemeMode) { themeMode.value = mode; writeStorage('vba-theme', mode); applyTheme() }
  function setPrimaryColor(color: string) { primaryColor.value = color; writeStorage('vba-primary', color); applyTheme() }
  function setDensity(value: 'small' | 'middle' | 'large') { density.value = value; writeStorage('vba-density', value) }
  function toggleCollapsed() { collapsed.value = !collapsed.value; writeStorage('vba-collapsed', collapsed.value) }

  if (typeof window !== 'undefined') window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => { systemDark.value = event.matches; applyTheme() })
  return { themeMode, primaryColor, density, collapsed, resolvedTheme, applyTheme, setThemeMode, setPrimaryColor, setDensity, toggleCollapsed }
})
