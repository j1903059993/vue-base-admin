<script setup lang="ts">import {useRouter} from 'vue-router';const router=useRouter()</script>
<template>
  <main class="status-page">
    <div class="code">
      500
    </div><h1>服务暂时不可用</h1><p>系统遇到了意外问题，请稍后重试。</p><a-button
      type="primary"
      @click="router.push('/dashboard')"
    >
      返回工作台
    </a-button>
  </main>
</template>
<style scoped>.status-page{min-height:100vh;display:grid;place-content:center;justify-items:center;padding:24px;text-align:center;background:var(--app-bg)}.code{color:var(--app-danger);font:700 clamp(72px,14vw,150px)/1 var(--app-mono);letter-spacing:-.09em}.status-page h1{margin:14px 0 6px}.status-page p{margin:0 0 24px;color:var(--app-muted)}</style>
