<script setup lang="ts">
import type { Database } from '@/types/supabase'

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
  collectionName: '-',
  userName: '-',
})
const emit = defineEmits(['closeModal', 'reFetch'])
const superClient = useSupabaseClient<Database>()
const supabaseUser = useSupabaseUser()

interface Props {
  showModal: boolean
  collectionName: string
  userName: string
}

const linkName = ref('')
const linkUrl = ref('')
const isCreating = ref(false)

const onAddClick = async () => {
  try {
    isCreating.value = true
    const { error } = await superClient
      .from('links')
      .insert([
        {
          user_name: props.userName,
          user_id: supabaseUser.value?.id,
          collection_name: props.collectionName,
          name: linkName.value,
          url: linkUrl.value,
        },
      ])
    if (!error) {
      emit('reFetch')
      emit('closeModal')
    }
  }
  catch (error) {
    console.log(error)
  }
  isCreating.value = false
}
</script>

<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <div class="flex justify-between">
        <h3 class="font-bold text-lg">
          Create New Link
        </h3>
        <button
          class="btn btn-circle btn-primary btn-sm btn-outline"
          @click="$emit('closeModal')"
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
          Create
        </button>
      </div>
    </div>
  </div>
</template>
