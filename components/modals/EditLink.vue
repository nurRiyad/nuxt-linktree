<script setup lang="ts">
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
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
const errMsg = ref('')
const isUpdating = ref(false)

const rules = computed(() => {
  return {
    linkNameModal: { required },
    linkUrlModal: { required },
  }
})

const validate = useVuelidate(rules, { linkNameModal, linkUrlModal })

watchEffect(() => {
  if (props.linkName)
    linkNameModal.value = props.linkName
  if (props.linkUrl)
    linkUrlModal.value = props.linkUrl
})

const onUpdateClick = async () => {
  try {
    isUpdating.value = true

    const result = await validate.value.$validate()

    if (result) {
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
      else {
        errMsg.value = error.message
      }
    }
  }
  catch (error) {
    console.log(error)
  }
  isUpdating.value = false
}

watch(linkNameModal, () => {
  errMsg.value = ''
})
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
        <p v-if="validate.linkNameModal.$error" class="text-error text-sm m-0">
          {{ validate.linkNameModal.$errors[0].$message }}
        </p>
        <input
          v-model="linkUrlModal"
          type="text"
          placeholder="URL"
          class="input input-bordered input-primary w-full"
        >
        <p v-if="validate.linkUrlModal.$error" class="text-error text-sm m-0">
          {{ validate.linkUrlModal.$errors[0].$message }}
        </p>
        <p v-if="errMsg" class="text-error text-sm m-0">
          {{ errMsg }}
        </p>
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
