<script setup lang="ts">
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import type { Database } from '@/types/supabase'

interface Props {
  showModal: boolean
  userName: string
}

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
  userName: '-',
})
const emit = defineEmits(['closeModal', 'reFetch'])
const superClient = useSupabaseClient<Database>()
const supabaseUser = useSupabaseUser()

const collectionName = ref('')
const collectionDes = ref('')
const errMsg = ref('')
const isCreating = ref(false)

const rules = computed(() => {
  return {
    collectionName: { required },
    collectionDes: { required },
  }
})

const validate = useVuelidate(rules, { collectionName, collectionDes })

async function onAddClick() {
  try {
    isCreating.value = true
    const result = await validate.value.$validate()
    if (result) {
      const { error } = await superClient
        .from('collections')
        .insert([
          {
            user_name: props.userName,
            user_id: supabaseUser.value?.id,
            collection_name: collectionName.value,
            description: collectionDes.value,
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

watch(collectionName, () => {
  errMsg.value = ''
})
</script>

<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <div class="flex justify-between">
        <h3 class="font-bold text-lg">
          Create New Task
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
          v-model="collectionName"
          type="text"
          placeholder="Collection Name"
          class="input input-bordered input-primary w-full"
        >
        <p v-if="validate.collectionName.$error" class="text-error text-sm m-0">
          {{ validate.collectionName.$errors[0].$message }}
        </p>
        <input
          v-model="collectionDes"
          type="text"
          placeholder="Collection Description"
          class="input input-bordered input-primary w-full"
        >
        <p v-if="validate.collectionDes.$error" class="text-error text-sm m-0">
          {{ validate.collectionDes.$errors[0].$message }}
        </p>
        <p v-if="errMsg" class="text-error text-sm m-0">
          {{ errMsg }}
        </p>
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
</template>
