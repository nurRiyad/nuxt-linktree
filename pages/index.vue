<script setup lang="ts">
definePageMeta({
  middleware: ['home-auth'],
})
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <PublicHero />
  </div>
</template>
