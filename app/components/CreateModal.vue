<script lang="ts" setup>
import type { NitroError } from '~~/types/error'
const props = defineProps<{
  reFetch: () => Promise<void>
}>()

const model = defineModel<boolean>({ default: false })

const toast = useToast()

const newLink = ref({
  name: '',
  url: '',
})

const isCreating = ref(false)
const handleSubmit = async () => {
  isCreating.value = true
  try {
    await $fetch('/api/links', {
      method: 'POST',
      body: newLink.value,
    })
    await props.reFetch()
    model.value = false
  } catch (error) {
    toast.add({ title: (error as NitroError).statusMessage, color: 'red' })
  }
  isCreating.value = false
}
</script>

<template>
  <UModal v-model="model">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Create New Link</h3>
        </div>
      </template>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <UFormGroup label="Name">
          <UInput v-model="newLink.name" placeholder="Enter link name" required />
        </UFormGroup>

        <UFormGroup label="URL">
          <UInput v-model="newLink.url" placeholder="https://example.com" type="text" required />
        </UFormGroup>

        <div class="flex justify-end gap-2">
          <UButton color="gray" @click="model = false"> Cancel </UButton>
          <UButton :loading="isCreating" color="primary" type="submit"> Create </UButton>
        </div>
      </form>
    </UCard>
  </UModal>
</template>
