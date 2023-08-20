<script setup lang="ts">
interface Props {
  showModal: boolean
  collectionName: string
  userName: string
  linkId: number
}

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
  collectionName: '-',
  userName: '-',
  linkId: 0,
})

const emit = defineEmits(['closeModal', 'reFetch'])

const supabaseClient = useSupabaseClient()
const isDeleting = ref(false)
const errMsg = ref('')

async function onDeleteClick() {
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
    else {
      errMsg.value = linkError.message
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
          Proceed To <span class="text-error">Delete</span> This Link ?
        </p>
      </div>
      <p v-if="errMsg" class="text-error text-sm m-0">
        {{ errMsg }}
      </p>
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
