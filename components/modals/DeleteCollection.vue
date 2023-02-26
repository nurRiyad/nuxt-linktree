<script setup lang="ts">
interface Props {
  showModal: boolean
  collectionName: string
  userName: string
}

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
  collectionName: '-',
  userName: '-',
})

const emit = defineEmits(['closeModal', 'reFetchCollection'])

const supabaseClient = useSupabaseClient()
const isDeleting = ref(false)

const onDeleteClick = async () => {
  try {
    isDeleting.value = true

    const { error: linkError } = await supabaseClient
      .from('links')
      .delete()
      .eq('user_name', props.userName)
      .eq('collection_name', props.collectionName)

    const { error: collectionError } = await supabaseClient
      .from('collections')
      .delete()
      .eq('user_name', props.userName)
      .eq('collection_name', props.collectionName)
    if (!linkError && !collectionError) {
      emit('closeModal')
      emit('reFetchCollection')
    }
  }
  catch (error) {
    console.log(error)
  }
  isDeleting.value = false
}
</script>

<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <div class="flex justify-between">
        <h3 class="font-bold text-lg">
          Delete Confirmations
        </h3>
        <button
          class="btn btn-circle btn-primary btn-sm btn-outline"
          @click=" $emit('closeModal')"
        >
          <LogosClose />
        </button>
      </div>

      <div class="py-4 flex flex-col space-y-3">
        <p>
          Deleting collection named
          <span class="underline text-error font-semibold">@{{ userName }}/{{ collectionName }}</span> ?
        </p>
      </div>
      <div class="flex justify-end">
        <button
          class="btn btn-error"
          :class="{ loading: isDeleting }"
          @click="onDeleteClick"
        >
          Button
        </button>
      </div>
    </div>
  </div>
</template>
