<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <div class="mt-10 flex flex-col justify-center">
      <Avatar />
      <div class="flex flex-col items-center py-5">
        <h2 class="text-2xl font-semibold">
          AL Asad Nur Riyad
        </h2>
        <p>Software Engineer</p>
      </div>
    </div>
    <div class="grid gap-4 my-4">
      <CreateItem />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  </div>
</template>
