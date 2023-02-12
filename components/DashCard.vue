<script setup lang="ts">
interface Props {
  name: string
  description?: string
  user: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'no name',
  description: 'no des',
  user: '-',
})

const router = useRouter()

const onEditClick = () => {
  router.push(`/dashboard/${props.name}`)
}
</script>

<template>
  <div className="card  bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">
        {{ name }}
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
