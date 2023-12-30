<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <UAvatar
    chip-color="primary"
    chip-text="+"
    chip-position="bottom-right"
    size="3xl"
    src="https://avatars.githubusercontent.com/u/739984?v=4"
    alt="Avatar"
    class="mx-auto cursor-pointer"
    @click="isOpen = true"
  />
  <UModal v-model="isOpen">
    <div class="p-4">
      <div class="h-48" />
    </div>
  </UModal>
</template>
