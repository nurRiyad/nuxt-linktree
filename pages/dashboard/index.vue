<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div class="py-4 grid grid-cols-4 gap-4">
    <ULink v-for="i in 5" :key="i" to="/dashboard/1" class="hover:shadow-2xl">
      <Collection />
    </ULink>
    <EmptyCol />
  </div>
</template>
