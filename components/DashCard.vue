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

const router = useRouter()

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
        <button class="btn btn-primary" @click="onEditClick">
          Edit Now
        </button>
      </div>
    </div>
  </div>
</template>
