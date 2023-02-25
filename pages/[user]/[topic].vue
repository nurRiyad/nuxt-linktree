<script setup lang="ts">
definePageMeta({
  layout: 'list',
})
</script>

<template>
  <div>
    <h1>{{ $route.params.user }}</h1>
    <h1>{{ $route.params.topic }}</h1>
  </div>
</template>
