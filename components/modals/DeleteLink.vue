<script setup lang="ts">
interface Props {
  showModal: boolean
  collectionName: string
  userName: string
  linkId: string
}

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
  collectionName: '-',
  userName: '-',
  linkId: '-',
})

const emit = defineEmits(['closeModal', 'reFetch'])

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
      .eq('id', props.linkId)

    if (!linkError) {
      emit('reFetch')
      emit('closeModal')
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
          Proced To Delete This Link ?
        </p>
      </div>
      <div class="flex justify-end">
        <button
          class="btn btn-error"
          :class="{ loading: isDeleting }"
          @click="onDeleteClick"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
