<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { Database } from '~/types/supabase'

const emit = defineEmits(['reFetchCollection'])

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()
const toast = useToast()

const isCreating = ref(false)

const isOpen = ref(false)
const state = reactive({
  name: undefined,
  description: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.name)
    errors.push({ path: 'name', message: 'Required' })
  if (!state.description)
    errors.push({ path: 'description', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  isCreating.value = true
  const { name, description } = event.data
  if (user.value?.id) {
    const { error } = await client.from('collection').insert({ name, description, user_id: user.value?.id })
    if (error) {
      toast.add({
        title: error.message,
        color: 'red',
      })
    }
    else {
      emit('reFetchCollection')
      isOpen.value = false
    }
  }
  else {
    toast.add({
      title: 'No LoggedIn User found',
      color: 'red',
    })
  }
  isCreating.value = false
}
</script>

<template>
  <UButton color="white" variant="solid" class="flex justify-center items-center" @click="isOpen = true">
    <Icon name="i-material-symbols-add-home-outline-rounded" size="40" />
  </UButton>
  <UModal v-model="isOpen">
    <UForm :validate="validate" :state="state" @submit="onSubmit">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Create New Collection
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>
        <div class="space-y-4">
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>

          <UFormGroup label="Description" name="description">
            <UInput v-model="state.description" />
          </UFormGroup>
        </div>
        <template #footer>
          <div class="flex justify-between">
            <UButton color="red" :disabled="isCreating" @click="isOpen = false">
              Cancel
            </UButton>
            <UButton type="submit" :loading="isCreating">
              Add
            </UButton>
          </div>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>
