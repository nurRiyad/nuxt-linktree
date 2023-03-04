<script setup lang="ts">
import { useToast } from 'vue-toastification'
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
const toast = useToast()
const showModal = ref(false)

const onEditClick = () => {
  router.push(`/dashboard/${props.userName}/${props.collectionName}`)
}

const shareableLink = computed(() => `https://nuxt-linktree.vercel.app/${props.userName}/${props.collectionName}`)

const onCopyClick = () => {
  navigator.clipboard.writeText(shareableLink.value)
  toast.success(shareableLink.value)
}
</script>

<template>
  <div class="card  bg-base-100 shadow-xl">
    <div class="card-body">
      <NuxtLink :to="`/dashboard/${userName}/${collectionName}`" class="card-title">
        {{ collectionName }}
      </NuxtLink>
      <p class="text-sm md:text-base pb-5">
        {{ description }}
      </p>

      <div class="card-actions justify-end">
        <button class="btn btn-sm md:btn-md btn-primary" @click.stop="onCopyClick">
          <div class="flex space-x-1 items-center">
            <Icon name="ic:baseline-content-copy" size="2em" color="white" title="Details" />
          </div>
        </button>
        <button class="btn btn-sm md:btn-md btn-error" @click="$event => showModal = !showModal">
          <Icon name="ant-design:delete-outlined" size="2em" color="white" />
        </button>
        <button class="btn btn-sm md:btn-md " @click="onEditClick">
          <div class="flex space-x-1 items-center">
            <Icon name="material-symbols:arrow-circle-right-outline-sharp" size="2em" color="white" title="Details" />
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
