<script setup lang="ts">
definePageMeta({
  layout: 'list',
})

const route = useRoute()
const router = useRouter()
const user = computed(() => route.params.user as string || '')
const topic = computed(() => route.params.topic as string || '')

const { data: links } = await useFetch(`/api/link?uname=${user.value}&cname=${topic.value}`)

if (!links.value || links.value.length === 0)
  router.push('/404')
</script>

<template>
  <div class="mx-auto space-y-6  text-white">
    <div class="flex flex-col items-center w-full space-y-6">
      <img class="w-24 rounded-full content-center" src="/rsz_1riyad.jpg" alt="riyad profile img">
      <p class="underline font-semibold">
        @{{ user }}/{{ topic }}
      </p>
    </div>
    <div class="space-y-6">
      <template v-for="link in links" :key="link.id">
        <a :href="link.url" class="block px-5 py-5 text-center shadow-sm rounded-lg hover:scale-[1.02] transition-all ease-out border-2 border-white" target="_blank">{{ link.name }}</a>
      </template>
    </div>
  </div>
</template>
