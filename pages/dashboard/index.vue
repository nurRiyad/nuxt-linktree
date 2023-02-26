<script setup lang="ts">
const supabaseUser = useSupabaseUser()

definePageMeta({
  middleware: ['dashboard-auth'],
})

const { data: user, pending, refresh } = await useFetch(`/api/user?uid=${supabaseUser.value?.id}`)

const isFirstTime = computed(() => {
  if (user.value?.user_name)
    return false
  else return true
})
</script>

<template>
  <div class="w-full flex container max-w-7xl mx-auto px-5">
    <LoaderHero v-if="pending" />
    <FirstTime v-else-if="isFirstTime" @on-user-create="refresh" />
    <Dashboard v-else :username="user?.user_name" />
  </div>
</template>
