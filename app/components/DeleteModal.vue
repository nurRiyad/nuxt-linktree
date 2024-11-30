<script lang="ts" setup>
const props = defineProps<{
  name: string
  url: string
  id: number
}>()

const emit = defineEmits(['onDelete'])

const model = defineModel<boolean>({ default: false })
const isDeleting = ref(false)

const handleDelete = async () => {
  isDeleting.value = true
  try {
    await $fetch(`/api/links/${props.id}`, {
      method: 'DELETE',
    })
    emit('onDelete')
  } catch (error) {
    console.error(error)
  }
  isDeleting.value = false
}
</script>

<template>
  <UModal v-model="model">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold">Delete Link</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="model = false"
          />
        </div>
      </template>

      <p class="py-4">Are you sure you want to delete "{{ name }}"?</p>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton color="gray" @click="model = false"> Cancel </UButton>
          <UButton color="red" :loading="isDeleting" @click="handleDelete"> Delete </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
