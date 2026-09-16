<template>
  <div class="query surface-card">
    <slot /><div class="query-actions">
      <slot name="actions" />
    </div>
  </div>
</template>
<style scoped>.query{display:flex;flex-wrap:wrap;align-items:flex-end;gap:12px;padding:16px}.query-actions{display:flex;gap:8px;margin-left:auto}.query :deep(.ant-form-item){margin-bottom:0}@media(max-width:640px){.query>*{width:100%}.query-actions{margin-left:0}.query-actions :deep(.ant-btn){flex:1}}</style>
