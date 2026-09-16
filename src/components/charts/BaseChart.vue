<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import type { EChartsOption } from 'echarts'
import { useSettingsStore } from '@/stores/settings'
use([CanvasRenderer, BarChart, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])
withDefaults(defineProps<{option:EChartsOption;title:string;height?:number;empty?:boolean}>(),{height:320,empty:false})
const settings=useSettingsStore(); const theme=computed(()=>settings.resolvedTheme==='dark'?'dark':undefined)
</script>
<template>
  <div
    class="chart"
    :style="{height:`${height}px`}"
    role="img"
    :aria-label="title"
  >
    <a-empty
      v-if="empty"
      class="empty"
      description="暂无数据"
    /><VChart
      v-else
      :key="theme"
      :option="option"
      :theme="theme"
      autoresize
    />
  </div>
</template>
<style scoped>.chart{position:relative;width:100%;min-height:220px}.empty{position:absolute;inset:0;display:grid;place-content:center}</style>
