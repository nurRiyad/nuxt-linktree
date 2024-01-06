<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { data, error } = useFetch('/api/collection')
</script>

<template>
  <div class="py-4 grid grid-cols-4 gap-4">
    <template v-if="data">
      <ULink v-for="d in data " :key="d.id" to="/dashboard" class="hover:shadow-2xl">
        <Collection :name="d.name" :des="d.description || '-'" />
      </ULink>
      <EmptyCol />
    </template>
    <div v-else>
      <pre>{{ error?.message }}</pre>
    </div>
  </div>
</template>
