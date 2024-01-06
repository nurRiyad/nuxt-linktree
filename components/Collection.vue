<script setup lang="ts">
withDefaults(defineProps<{ name?: string, des?: string }>(), {
  name: 'no-name',
  des: 'no-des',
})
</script>

<template>
  <UCard>
    <template #header>
      <p>{{ name }}</p>
    </template>
    <div>
      <p>{{ des }}</p>
    </div>
  </UCard>
</template>
