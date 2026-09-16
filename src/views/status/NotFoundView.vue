<script setup lang="ts">import {useRouter} from 'vue-router';const router=useRouter()</script>
<template>
  <main class="status-page">
    <div class="code">
      404
    </div><h1>页面走丢了</h1><p>你访问的地址不存在，可能已被移动或删除。</p><a-button
      type="primary"
      @click="router.push('/dashboard')"
    >
      返回工作台
    </a-button>
  </main>
</template>
<style scoped>.status-page{min-height:100vh;display:grid;place-content:center;justify-items:center;padding:24px;text-align:center;background:var(--app-bg)}.code{color:var(--app-primary);font:700 clamp(72px,14vw,150px)/1 var(--app-mono);letter-spacing:-.09em}.status-page h1{margin:14px 0 6px}.status-page p{margin:0 0 24px;color:var(--app-muted)}</style>
