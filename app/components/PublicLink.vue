<script setup lang="ts">
defineProps<{
  name: string
  url: string
  id: number
}>()
</script>

<template>
  <ULink
    :to="url"
    :external="true"
    target="_blank"
    class="w-full flex justify-center items-center space-x-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-shadow border border-gray-100 dark:border-gray-700"
  >
    <p>{{ name }}</p>
    <Icon name="mdi:rocket-launch-outline" />
  </ULink>
</template>
