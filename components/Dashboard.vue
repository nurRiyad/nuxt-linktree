<script setup lang="ts">
interface Props {
  username: string
}
const props = withDefaults(defineProps<Props>(), {
  username: '',
})
</script>

<template>
  <div class="mt-10 w-full">
    <div class="flex  text-primary space-x-5 justify-between border-b-2 md:border-b-4 border-b-primary pb-3">
      <p class="text-lg md:text-2xl  lg:text-5xl font-bold">
        Top Ten Collection
      </p>
      <button class="btn btn-sm md:btn-md  btn-primary">
        Create New
      </button>
    </div>
    <div class="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
      <div v-for="n in 10" :key="n">
        <DashCard />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
