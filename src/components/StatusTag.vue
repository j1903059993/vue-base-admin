<script setup lang="ts">defineProps<{active:boolean;activeText?:string;inactiveText?:string}>()</script>
<template>
  <span
    class="status"
    :class="{active}"
  ><i />{{ active?activeText??'启用':inactiveText??'停用' }}</span>
</template>
<style scoped>.status{display:inline-flex;align-items:center;gap:6px;color:var(--app-muted);font-size:12px}.status i{width:6px;height:6px;border-radius:50%;background:#94a3b8}.status.active{color:var(--app-success)}.status.active i{background:var(--app-success);box-shadow:0 0 0 3px color-mix(in srgb,var(--app-success) 12%,transparent)}</style>
