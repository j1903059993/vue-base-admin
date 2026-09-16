<script setup lang="ts">
import { useSettingsStore, type ThemeMode } from '@/stores/settings'
import type { RadioChangeEvent } from 'ant-design-vue'
defineProps<{ open:boolean }>(); const emit=defineEmits<{ close:[] }>(); const settings=useSettingsStore()
const colors=['#4f46e5','#2563eb','#0891b2','#0f9f75','#d97706','#dc3545']
function changeDensity(event: RadioChangeEvent) {
  settings.setDensity(event.target.value as 'small' | 'middle' | 'large')
}
</script>
<template>
  <a-drawer
    :open="open"
    title="界面设置"
    :width="340"
    @close="emit('close')"
  >
    <div class="setting">
      <label>主题模式</label><a-segmented
        :value="settings.themeMode"
        :options="[{label:'浅色',value:'light'},{label:'深色',value:'dark'},{label:'跟随系统',value:'system'}]"
        block
        @change="(value: string | number)=>settings.setThemeMode(value as ThemeMode)"
      />
    </div>
    <div class="setting">
      <label>品牌色</label><div class="swatches">
        <button
          v-for="color in colors"
          :key="color"
          :class="{active:settings.primaryColor===color}"
          :style="{background:color}"
          :aria-label="`使用 ${color}`"
          @click="settings.setPrimaryColor(color)"
        />
      </div>
    </div>
    <div class="setting">
      <label>界面密度</label><a-radio-group
        :value="settings.density"
        button-style="solid"
        @change="changeDensity"
      >
        <a-radio-button value="small">
          紧凑
        </a-radio-button><a-radio-button value="middle">
          标准
        </a-radio-button><a-radio-button value="large">
          宽松
        </a-radio-button>
      </a-radio-group>
    </div>
    <a-alert
      type="info"
      show-icon
      message="设置已自动保存"
      description="刷新页面后，主题、密度和导航状态仍会保留。"
    />
  </a-drawer>
</template>
<style scoped>.setting{display:grid;gap:10px;margin-bottom:26px}.setting label{font-weight:650}.swatches{display:flex;gap:12px}.swatches button{width:28px;height:28px;border:3px solid var(--app-surface);border-radius:50%;box-shadow:0 0 0 1px var(--app-border);cursor:pointer}.swatches button.active{box-shadow:0 0 0 2px var(--app-text)}</style>
