<script setup lang="ts">
import type { Database } from '@/types/supabase'

interface Props {
  showModal: boolean
  collectionName: string
  userName: string
  linkName: string
  linkUrl: string
  linkId: number
}

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
  collectionName: '-',
  userName: '-',
  linkName: '-',
  linkUrl: '-',
  linkId: 0,
})
const emit = defineEmits(['closeModal', 'reFetch'])
const superClient = useSupabaseClient<Database>()

const linkNameModal = ref('')
const linkUrlModal = ref('')
const isUpdating = ref(false)

watchEffect(() => {
  if (props.linkName)
    linkNameModal.value = props.linkName
  if (props.linkUrl)
    linkUrlModal.value = props.linkUrl
})

const onUpdateClick = async () => {
  try {
    isUpdating.value = true

    const { error } = await superClient
      .from('links')
      .update({ name: linkNameModal.value, url: linkUrlModal.value })
      .eq('user_name', props.userName)
      .eq('collection_name', props.collectionName)
      .eq('id', props.linkId)

    if (!error) {
      emit('reFetch')
      emit('closeModal')
    }
  }
  catch (error) {
    console.log(error)
  }
  isUpdating.value = false
}
</script>

<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <div class="flex justify-between">
        <h3 class="font-bold text-lg">
          Update New Link
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
          v-model="linkNameModal"
          type="text"
          placeholder="Name"
          class="input input-bordered input-primary w-full"
        >
        <input
          v-model="linkUrlModal"
          type="text"
          placeholder="URL"
          class="input input-bordered input-primary w-full"
        >
      </div>
      <div class="flex justify-end">
        <button
          class="btn btn-primary"
          :class="{ loading: isUpdating }"
          @click="onUpdateClick"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>
