<script setup>
const isOpen = ref(false)
</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />
    <UModal v-model="isOpen" />
  </div>
</template>
