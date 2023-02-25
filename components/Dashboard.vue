<script setup lang="ts">
import type { Database } from '@/types/supabase'

interface Props {
  username: string
}
const props = withDefaults(defineProps<Props>(), {
  username: '',
})

const superClient = useSupabaseClient<Database>()

const { data: collection, pending, refresh } = await useLazyAsyncData('get-collection', async () => {
  const { data, error } = await superClient
    .from('collections')
    .select('user_name, collection_name, description')
    .eq('user_name', props.username)

  if (error)
    console.log(error)

  return data
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
      <div v-for="c in collection" :key="c.collection_name">
        <DashCard :collection-name="c.collection_name" :user-name="c.user_name" :description="c.description" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
