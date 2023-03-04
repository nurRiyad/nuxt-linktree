<script setup lang="ts">
interface Props {
  username: string
}
const props = withDefaults(defineProps<Props>(), {
  username: '',
})

const showModal = ref(false)

const { data: collection, pending, refresh: reFetchCollection } = await useFetch(`/api/collection?uname=${props.username}`)
</script>

<template>
  <div class="mt-10 w-full">
    <div class="flex  text-primary space-x-5 justify-between border-b-2 md:border-b-4 border-b-primary pb-3">
      <p class="text-lg md:text-2xl  lg:text-3xl font-bold">
        All Collections
      </p>
      <button
        class="btn btn-sm md:btn-md  btn-primary" @click="showModal = !showModal"
      >
        Create
      </button>
    </div>
    <div v-if="pending" class="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
      <div v-for="n in 4" :key="n">
        <LoaderCollection />
      </div>
    </div>

    <div v-else class="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
      <div v-if="!collection || collection.length === 0">
        <EmptyDashCard />
      </div>
      <div v-for="c in collection" :key="c.collection_name">
        <DashCard
          :collection-name="c.collection_name"
          :user-name="c.user_name"
          :description="c.description"
          @re-fetch-collection="$event => reFetchCollection()"
        />
      </div>
    </div>
    <ModalsCreateCollection
      :user-name="username"
      :show-modal="showModal"
      @close-modal="showModal = false"
      @re-fetch="reFetchCollection"
    />
  </div>
</template>

<style scoped>

</style>
