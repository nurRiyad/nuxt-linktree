<script setup lang="ts">
import type { Database } from '@/types/supabase'

const superClient = useSupabaseClient<Database>()

const route = useRoute()
const collection = computed(() => route.params.collection as string || '')
const user = computed(() => route.params.user as string || '')

const { data: links, pending, refresh } = await useAsyncData('get-links', async () => {
  const { data, error } = await superClient
    .from('links')
    .select('name, url')
    .eq('user_name', user.value)
    .eq('collection_name', collection.value)

  if (error)
    console.log(error)

  return data || []
})
</script>

<template>
  <div class="w-full container max-w-7xl mx-auto px-5">
    <div class="mx-auto w-full space-y-5 mt-10">
      <template v-for="link in links" :key="link.id">
        <div class="px-5 py-5 bg-base-100 rounded-lg hover:scale-[1.02] transition-all ease-out ">
          <a :href="link.url" target="_blank">{{ link.name }}</a>
        </div>
      </template>
    </div>
  </div>
</template>
