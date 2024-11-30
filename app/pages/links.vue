<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
})

const { user } = useUserSession()
const { data: links, refresh } = useFetch('/api/links')

const showCreateModal = ref(false)

const handleEditLink = async (id: number) => {
  console.log(id)
}
</script>

<template>
  <div class="p-5">
    <div class="flex flex-col items-center space-y-3">
      <UAvatar size="3xl" :src="user?.avatar_url" alt="Avatar" />
      <h2>{{ user?.name }}</h2>
    </div>

    <!-- Add create link button with better styling -->
    <div class="mt-10 flex justify-center">
      <UButton icon="i-heroicons-plus" color="primary" @click="showCreateModal = true">
        Create New Link
      </UButton>
      <CreateModal v-model="showCreateModal" :re-fetch="refresh" />
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
          :re-fetch="refresh"
          @edit-link="handleEditLink"
        />
      </template>
      <EmptyLink v-else />
    </div>
  </div>
</template>
