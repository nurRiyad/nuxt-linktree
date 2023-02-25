<script setup lang="ts">
import type { Database } from '@/types/supabase'

interface Props {
  username: string
}
const props = withDefaults(defineProps<Props>(), {
  username: '',
})

const superClient = useSupabaseClient<Database>()

const showModal = ref(false)
const collectinName = ref('')
const collectionDes = ref('')
const isCreating = ref(false)

const { data: collection, refresh: reFetchCollection } = await useFetch(`/api/collection?uname=${props.username}`)

const onAddClick = async () => {
  try {
    isCreating.value = true
    const { error } = await superClient
      .from('collections')
      .insert([
        { user_name: props.username, collection_name: collectinName.value, description: collectinName.value },
      ])
    if (!error) {
      reFetchCollection()
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
  <div class="mt-10 w-full">
    <div class="flex  text-primary space-x-5 justify-between border-b-2 md:border-b-4 border-b-primary pb-3">
      <p class="text-lg md:text-2xl  lg:text-5xl font-bold">
        All Collections
      </p>
      <button
        class="btn btn-sm md:btn-md  btn-primary" @click="showModal = !showModal"
      >
        Create
      </button>
    </div>
    <div class="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
      <div v-for="c in collection" :key="c.collection_name">
        <DashCard :collection-name="c.collection_name" :user-name="c.user_name" :description="c.description" />
      </div>
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
            v-model="collectinName"
            type="text"
            placeholder="Collection Name"
            class="input input-bordered input-primary w-full"
          >
          <input
            v-model="collectionDes"
            type="text"
            placeholder="Collection Desscription"
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

<style scoped>

</style>
