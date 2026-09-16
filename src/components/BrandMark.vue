<script setup lang="ts">defineProps<{ compact?: boolean; inverse?: boolean }>()</script>

<template>
  <div
    class="brand"
    :class="{ compact, inverse }"
  >
    <span
      class="mark"
      aria-hidden="true"
    ><i /><b /></span>
    <span
      v-if="!compact"
      class="wordmark"
    >Vue Base <strong>Admin</strong></span>
  </div>
</template>

<style scoped>
.brand { display:flex; align-items:center; gap:11px; min-width:0; color:var(--app-text); }
.brand.inverse { color:#fff; }
.mark { position:relative; display:grid; place-items:center; width:30px; height:30px; border:1px solid rgba(255,255,255,.15); border-radius:9px; background:linear-gradient(145deg,#6366f1,#4338ca); box-shadow:0 7px 18px rgba(79,70,229,.32); }
.mark i,.mark b { position:absolute; width:9px; height:14px; border-radius:2px; transform:skewY(-28deg); background:#fff; }
.mark i { left:7px; top:7px; opacity:.72; }
.mark b { right:7px; bottom:7px; }
.wordmark { overflow:hidden; white-space:nowrap; font-size:15px; letter-spacing:-.02em; font-weight:550; }
.wordmark strong { font-weight:750; }
</style>
