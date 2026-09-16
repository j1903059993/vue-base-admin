<script setup lang="ts">
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <section class="page-container">
    <header class="page-heading">
      <div>
        <h1>{{ title }}</h1><p v-if="description">
          {{ description }}
        </p>
      </div>
      <div
        v-if="$slots.actions"
        class="actions"
      >
        <slot name="actions" />
      </div>
    </header>
    <slot />
  </section>
</template>

<style scoped>
.page-container { display:grid; gap:18px; max-width:1600px; margin:0 auto; }
.page-heading { display:flex; align-items:flex-end; justify-content:space-between; gap:18px; }
h1 { margin:0; font-size:23px; line-height:1.25; letter-spacing:-.025em; }
p { margin:5px 0 0; color:var(--app-muted); }
.actions { display:flex; gap:8px; }
@media (max-width:640px) { .page-heading { align-items:flex-start; flex-direction:column; } .actions { width:100%; } }
</style>
