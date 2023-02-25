<script setup lang="ts">
definePageMeta({
  layout: 'list',
})
</script>

<template>
  <div>
    <h1>{{ $route.params.user }}</h1>
  </div>
</template>
