<script setup lang="ts">
import { computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { hasPermission } from '@/utils/permission'
const props = defineProps<{ permission?: string }>()
const session = useSessionStore()
const allowed = computed(() => hasPermission(session.permissions, props.permission))
</script>

<template>
  <slot v-if="allowed" /><slot
    v-else
    name="fallback"
  />
</template>
