<script setup lang="ts">import {useRouter} from 'vue-router';const router=useRouter()</script>
<template>
  <main class="status-page">
    <div class="code">
      403
    </div><h1>没有访问权限</h1><p>当前账号无法打开这个页面。你可以返回工作台，或切换具有相应权限的账号。</p><a-space>
      <a-button @click="router.back()">
        返回上一页
      </a-button><a-button
        type="primary"
        @click="router.push('/dashboard')"
      >
        回到工作台
      </a-button>
    </a-space>
  </main>
</template>
<style scoped>.status-page{min-height:100vh;display:grid;place-content:center;justify-items:center;padding:24px;text-align:center;background:var(--app-bg)}.code{color:var(--app-primary);font:700 clamp(72px,14vw,150px)/1 var(--app-mono);letter-spacing:-.09em}.status-page h1{margin:14px 0 6px}.status-page p{max-width:520px;margin:0 0 24px;color:var(--app-muted)}</style>
