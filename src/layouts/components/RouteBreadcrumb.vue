<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const items = computed(() => [{ title: 'Vue Base Admin' }, ...(route.meta.group ? [{ title: route.meta.group }] : []), { title: route.meta.title ?? '页面' }])
</script>
<template><a-breadcrumb :items="items" /></template>
