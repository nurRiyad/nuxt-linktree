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
      <h2 class="card-title">
        {{ collectionName }}
      </h2>
      <p>{{ description }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-sm md:btn-md btn-error" @click="$event => showModal = !showModal">
          Delete
        </button>
        <button class="btn btn-sm md:btn-md btn-primary" @click="onEditClick">
          Edit
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
