<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { Database } from '~/types/supabase'

const props = withDefaults(defineProps<{ name: string, link: string, colId: number | null }>(), {
  name: '-',
  link: '#',
  colId: null,
})

const emit = defineEmits(['reFetchCollection'])

const isOpen = ref(false)
const state = reactive({
  name: undefined,
  link: undefined,
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.name)
    errors.push({ path: 'name', message: 'Required' })
  if (!state.link)
    errors.push({ path: 'link', message: 'Required' })
  return errors
}

const client = useSupabaseClient<Database>()
const toast = useToast()
const isCreating = ref(false)

async function onSubmit(event: FormSubmitEvent<any>) {
  isCreating.value = true
  const { name, link } = event.data
  if (props.colId) {
    const { error } = await client.from('links').insert({ name, link, col_id: props.colId })
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
  <ULink :to="link" class="hover:shadow-lg cursor-pointer">
    <UCard>
      <div class="flex justify-between items-baseline">
        <p class="text-center">
          {{ name }}
        </p>
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          color="primary"
          variant="solid"
          label="Edit"
          :trailing="false"
          @click.prevent="isOpen = true"
        />
      </div>
    </UCard>
  </ULink>
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

          <UFormGroup label="Link" name="link">
            <UInput v-model="state.link" />
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
