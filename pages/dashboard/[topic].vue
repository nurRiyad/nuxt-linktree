<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()

const { data: collection } = useFetch(`/api/collection?id=${route.params.topic}`)
const { data: links, refresh: reFetchLinks } = useFetch(`/api/links?id=${route.params.topic}`)
</script>

<template>
  <div>
    <div class="mt-10 flex flex-col justify-center">
      <Avatar />
      <div class="flex flex-col items-center py-5">
        <h2 class="text-2xl font-semibold">
          {{ collection.name }}
        </h2>
        <p>{{ collection.description }}</p>
      </div>
    </div>
    <div class="grid gap-4 my-4">
      <CreateItem :col-id="collection.id" @re-fetch-links="reFetchLinks()" />
      <Item
        v-for="link in links"
        :key="link.id"
        :name="link.name"
        :link="link.link"
        :col-id="link.col_id"
      />
    </div>
  </div>
</template>
