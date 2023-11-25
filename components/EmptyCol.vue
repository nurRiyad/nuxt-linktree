<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

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
  // Do something with data
  console.log('-----', event.data)
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
            <UButton color="red" @click="isOpen = false">
              Cancel
            </UButton>
            <UButton type="submit">
              Add
            </UButton>
          </div>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>
