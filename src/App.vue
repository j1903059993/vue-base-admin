<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider, theme } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()
const algorithm = computed(() => settings.resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm)
const antTheme = computed<ThemeConfig>(() => ({
  algorithm: algorithm.value,
  token: {
    colorPrimary: settings.primaryColor,
    borderRadius: 8,
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  },
}))
</script>

<template>
  <ConfigProvider
    :theme="antTheme"
    :component-size="settings.density"
  >
    <RouterView />
  </ConfigProvider>
</template>
