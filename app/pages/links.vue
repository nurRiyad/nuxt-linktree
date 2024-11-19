<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
})

const { user } = useUserSession()
const { data: links } = useFetch('/api/links')

const createLink = () => {}
</script>

<template>
  <div class="p-5">
    <div class="flex flex-col items-center space-y-3">
      <UAvatar size="3xl" :src="user?.avatar_url" alt="Avatar" />
      <h2>{{ user?.name }}</h2>
    </div>

    <!-- Add create link button with better styling -->
    <div class="mt-10 flex justify-center">
      <UButton icon="i-heroicons-plus" color="primary" @click="createLink">
        Create New Link
      </UButton>
    </div>

    <!-- Add links list -->
    <div class="mt-8 space-y-2 max-w-3xl mx-auto">
      <template v-if="links">
        <LinkView
          v-for="link in links"
          :id="link.id"
          :key="link.id"
          :name="link.name"
          :url="link.url"
        />
      </template>

      <div
        v-else
        class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-shadow border border-gray-100 dark:border-gray-700"
      >
        <a
          target="_blank"
          class="flex-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 truncate"
        >
          No Link Available
        </a>
      </div>
    </div>
  </div>
</template>
