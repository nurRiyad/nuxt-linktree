<script setup lang="ts">
const supabaseUser = useSupabaseUser()

definePageMeta({
  middleware: ['dashboard-auth'],
})

const route = useRoute()
const collection = computed(() => route.params.collection as string || '')
const user = computed(() => route.params.user as string || '')

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

const { data: userinfo } = await useFetch(`/api/user?uid=${supabaseUser.value?.id}`)

if (userinfo.value?.user_name !== user.value)
  navigateTo('/dashboard')

const { data: links, pending: linkLoading, refresh: reFetchLink } = await useFetch(`/api/link?uname=${user.value}&cname=${collection.value}`)

const activeLinkId = ref(0)
const activeLink = computed(() => {
  const acLink = links.value?.find(el => el.id === activeLinkId.value)
  return acLink
})

const onEditLinkClick = (id: number) => {
  activeLinkId.value = id
  showEditModal.value = !showEditModal.value
}

const onDeleteClick = (id: number) => {
  activeLinkId.value = id
  showDeleteModal.value = !showCreateModal.value
}
</script>

<template>
  <div class="mt-10 w-full container max-w-7xl mx-auto px-5">
    <div class="flex  text-primary space-x-5 justify-between border-b-2 md:border-b-4 border-b-primary pb-3">
      <p class="text-lg md:text-2xl  lg:text-5xl font-bold">
        Top Ten {{ collection }} of {{ user }}
      </p>
      <div class="space-x-4">
        <NuxtLink
          class="btn btn-sm md:btn-md  btn-primary" :to="`/${user}/${collection}`"
        >
          Preview
        </NuxtLink>
        <button
          class="btn btn-sm md:btn-md  btn-primary" @click="showCreateModal = !showCreateModal"
        >
          Create
        </button>
      </div>
    </div>
    <div v-if="linkLoading" class="mx-auto w-full space-y-5 mt-10">
      <template v-for="n in 4" :key="n">
        <LoaderLink />
      </template>
    </div>
    <div v-else class="mx-auto w-full space-y-5 mt-10">
      <template v-for="link in links" :key="link.id">
        <LinkCard
          :url="link.url"
          :name="link.name"
          @edit-click="onEditLinkClick(link.id)"
          @delete-click="onDeleteClick(link.id)"
        />
      </template>
    </div>
    <ModalsCreateLink
      :user-name="user"
      :collection-name="collection"
      :show-modal="showCreateModal"
      @close-modal="showCreateModal = false"
      @re-fetch="reFetchLink()"
    />

    <ModalsEditLink
      :user-name="user"
      :collection-name="collection"
      :link-id="activeLinkId"
      :link-name="activeLink?.name || ''"
      :link-url="activeLink?.url || ''"
      :show-modal="showEditModal"
      @close-modal="showEditModal = false"
      @re-fetch="reFetchLink()"
    />
    <ModalsDeleteLink
      :user-name="user"
      :collection-name="collection"
      :link-id="activeLinkId"
      :show-modal="showDeleteModal"
      @close-modal="showDeleteModal = false"
      @re-fetch="reFetchLink()"
    />
  </div>
</template>
