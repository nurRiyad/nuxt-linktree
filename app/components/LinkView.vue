<script setup lang="ts">
defineProps<{
  name: string
  url: string
  id: number
}>()

const editLink = () => {}
const deleteLink = () => {}
</script>

<template>
  <div
    class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-shadow border border-gray-100 dark:border-gray-700"
  >
    <a
      :href="url"
      target="_blank"
      class="flex-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 truncate"
    >
      {{ name }}
    </a>
    <div class="flex gap-2 ml-4">
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-pencil-square"
        size="sm"
        class="dark:hover:bg-gray-700"
        @click.stop="editLink()"
      />
      <UButton
        color="red"
        variant="ghost"
        icon="i-heroicons-trash"
        size="sm"
        class="dark:hover:bg-gray-700"
        @click.stop="deleteLink()"
      />
    </div>
  </div>
</template>
