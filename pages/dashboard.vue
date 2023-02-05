<script setup lang="ts">
import type { Database } from '@/types/supabase'

const superClient = useSupabaseClient<Database>()
const supabaseUser = useSupabaseUser()

const { data: user, pending, refresh } = await useLazyAsyncData('get-user', async () => {
  const { data, error } = await superClient
    .from('topten_users')
    .select('username, full_name')
    .eq('uid', supabaseUser.value?.id)

  if (error)
    console.log(error)

  if (data) {
    if (data.length === 0)
      return {}
    const { username, full_name } = data[0]
    return { username, full_name }
  }
  else { return {} }
})

const isFirstTime = computed(() => {
  if (user.value?.username)
    return false
  else return true
})
</script>

<template>
  <div class="w-full flex">
    <LoaderHero v-if="pending" />
    <FirstTime v-else-if="isFirstTime" @on-user-create="refresh" />
    <Dashboard v-else :username="user?.username" />
  </div>
</template>
