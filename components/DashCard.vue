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
  <div className="card  bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">
        {{ collectionName }}
      </h2>
      <p>{{ description }}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" @click="onEditClick">
          Edit Now
        </button>
      </div>
    </div>
  </div>
</template>
