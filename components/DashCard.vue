<script setup lang="ts">
interface Props {
  userName: string
  collectionName: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  userName: 'no name',
  collectionName: '-',
  description: 'no des',
})
defineEmits(['reFetchCollection'])

const router = useRouter()
const showModal = ref(false)

const onEditClick = () => {
  router.push(`/dashboard/${props.userName}/${props.collectionName}`)
}
</script>

<template>
  <div class="card  bg-base-100 shadow-xl">
    <div class="card-body">
      <NuxtLink :to="`/dashboard/${userName}/${collectionName}`" class="card-title">
        {{ collectionName }}
      </NuxtLink>
      <p>{{ description }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-sm md:btn-md btn-error" @click="$event => showModal = !showModal">
          Delete
        </button>
        <button class="btn btn-sm md:btn-md btn-primary" @click="onEditClick">
          <div class="flex space-x-1 items-center">
            <p>Go</p>
            <Icon name="heroicons:arrow-small-right-20-solid" />
          </div>
        </button>
      </div>
    </div>
    <ModalsDeleteCollection
      :user-name="userName"
      :collection-name="collectionName"
      :show-modal="showModal"
      @close-modal="$emit => showModal = false"
      @re-fetch-collection="$event => $emit('reFetchCollection')"
    />
  </div>
</template>
