<script setup lang="ts">
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
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
const errMsg = ref('')
const isCreating = ref(false)

const rules = computed(() => {
  return {
    linkName: { required },
    linkUrl: { required },
  }
})

const validate = useVuelidate(rules, { linkName, linkUrl })

const onAddClick = async () => {
  try {
    isCreating.value = true
    const result = await validate.value.$validate()
    if (result) {
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
      else {
        errMsg.value = error.message
      }
    }
  }
  catch (error) {
    console.log(error)
  }
  isCreating.value = false
}

watch(linkName, () => {
  errMsg.value = ''
})
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
        <p v-if="validate.linkName.$error" class="text-error text-sm m-0">
          {{ validate.linkName.$errors[0].$message }}
        </p>
        <input
          v-model="linkUrl"
          type="text"
          placeholder="URL"
          class="input input-bordered input-primary w-full"
        >
      </div>
      <p v-if="validate.linkUrl.$error" class="text-error text-sm m-0">
        {{ validate.linkUrl.$errors[0].$message }}
      </p>
      <p v-if="errMsg" class="text-error text-sm m-0">
        {{ errMsg }}
      </p>
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
