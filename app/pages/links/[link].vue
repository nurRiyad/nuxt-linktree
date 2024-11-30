<script lang="ts" setup>
const route = useRoute()
const { data: resp, status } = await useFetch(`/api/links/${route.params.link}`)
</script>

<template>
  <div class="p-5">
    <div class="flex flex-col items-center space-y-3">
      <UAvatar size="3xl" :src="resp?.data.avatar_url" alt="Avatar" />
      <h2>{{ resp?.data?.name }}</h2>
    </div>

    <!-- Add links list -->
    <div class="mt-8 space-y-2 max-w-3xl mx-auto">
      <template v-if="status === 'pending'">
        <USkeleton class="h-10" />
        <USkeleton class="h-10" />
        <USkeleton class="h-10" />
        <USkeleton class="h-10" />
      </template>
      <template v-else-if="resp && resp.links && resp.links.length > 0">
        <PublicLink
          v-for="link in resp.links"
          :id="link.id"
          :key="link.id"
          :name="link.name"
          :url="link.url"
        />
      </template>
      <EmptyLink v-else />
    </div>
  </div>
</template>
