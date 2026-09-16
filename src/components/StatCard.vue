<script setup lang="ts">defineProps<{label:string;value:string;trend:string;direction?:'up'|'down';tone?:string}>()</script>
<template>
  <article class="stat surface-card">
    <div class="stat-top">
      <span class="eyebrow">{{ label }}</span><span
        class="dot"
        :style="{background:tone??'var(--app-primary)'}"
      />
    </div><strong>{{ value }}</strong><div
      class="trend"
      :class="direction"
    >
      <span>{{ direction==='down'?'↓':'↑' }} {{ trend }}</span><small>较上周期</small>
    </div>
  </article>
</template>
<style scoped>.stat{padding:18px 19px}.stat-top,.trend{display:flex;align-items:center;justify-content:space-between}.dot{width:8px;height:8px;border-radius:50%;box-shadow:0 0 0 5px color-mix(in srgb,currentColor 12%,transparent)}.stat>strong{display:block;margin:13px 0 8px;font-size:27px;line-height:1;letter-spacing:-.04em}.trend span{color:var(--app-success);font-size:12px;font-weight:650}.trend.down span{color:var(--app-danger)}.trend small{color:var(--app-muted)}</style>
