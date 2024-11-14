<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
})
const { user } = useUserSession()
const { data: links } = useFetch('/api/links')
</script>

<template>
  <div class="p-5">
    <div class="flex flex-col items-center space-y-3">
      <UAvatar size="3xl" :src="user?.avatar_url" alt="Avatar" />
      <h2>{{ user?.name }}</h2>
    </div>
    <div class="mt-10">
      <div class="flex justify-center">
        <p>Links</p>
        <UButton>Add New</UButton>
      </div>
      <div v-for="link in links" :key="link.id">
        <UCard>
          <ULink :to="link.url" external>{{ link.name }}</ULink>
        </UCard>
      </div>
    </div>
  </div>
</template>
