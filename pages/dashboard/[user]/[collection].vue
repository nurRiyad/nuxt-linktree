<script setup lang="ts">
import type { Database } from '@/types/supabase'

const superClient = useSupabaseClient<Database>()

const route = useRoute()
const collection = computed(() => route.params.collection as string || '')
const user = computed(() => route.params.user as string || '')

const showModal = ref(false)
const linkName = ref('')
const linkUrl = ref('')
const isCreating = ref(false)

const { data: links, refresh: reFetchLink } = await useFetch(`/api/link?uname=${user.value}&cname=${collection.value}`)

const onAddClick = async () => {
  try {
    isCreating.value = true
    const { error } = await superClient
      .from('links')
      .insert([
        { user_name: user.value, collection_name: collection.value, name: linkName.value, url: linkUrl.value },
      ])
    if (!error) {
      reFetchLink()
      showModal.value = false
    }
  }
  catch (error) {
    console.log(error)
  }
  isCreating.value = false
}
</script>

<template>
  <div class="mt-10 w-full container max-w-7xl mx-auto px-5">
    <div class="flex  text-primary space-x-5 justify-between border-b-2 md:border-b-4 border-b-primary pb-3">
      <p class="text-lg md:text-2xl  lg:text-5xl font-bold">
        Top Ten {{ collection }} of {{ user }}
      </p>
      <div class="space-x-4">
        <NuxtLink
          class="btn btn-sm md:btn-md  btn-primary" :to="`/${user}/${collection}`"
        >
          Preview
        </NuxtLink>
        <button
          class="btn btn-sm md:btn-md  btn-primary" @click="showModal = !showModal"
        >
          Create
        </button>
      </div>
    </div>
    <div class="mx-auto w-full space-y-5 mt-10">
      <template v-for="link in links" :key="link.id">
        <div class="px-5 py-5 bg-base-100 rounded-lg hover:scale-[1.02] transition-all ease-out ">
          <a :href="link.url" target="_blank">{{ link.name }}</a>
        </div>
      </template>
    </div>
    <!-- Put this part before </body> tag -->
    <div class="modal" :class="{ 'modal-open': showModal }">
      <div class="modal-box">
        <div class="flex justify-between">
          <h3 class="font-bold text-lg">
            Create New Task
          </h3>
          <button
            class="btn btn-circle btn-primary btn-sm btn-outline"
            @click="showModal = false"
          >
            <LogosClose />
          </button>
        </div>

        <div class="py-4 flex flex-col space-y-3">
          <input
            v-model="linkName"
            type="text"
            placeholder="Name"
            class="input input-bordered input-primary w-full"
          >
          <input
            v-model="linkUrl"
            type="text"
            placeholder="URL"
            class="input input-bordered input-primary w-full"
          >
        </div>
        <div class="flex justify-end">
          <button
            class="btn btn-primary"
            :class="{ loading: isCreating }"
            @click="onAddClick"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
