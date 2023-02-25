<script setup lang="ts">
import type { Database } from '@/types/supabase'

const superClient = useSupabaseClient<Database>()
const supabaseUser = useSupabaseUser()

const { data: user, pending, refresh } = await useAsyncData('get-user', async () => {
  const { data, error } = await superClient
    .from('users')
    .select('user_name')
    .eq('auth_uid', supabaseUser.value?.id)

  if (error)
    console.log(error)

  if (data) {
    if (data.length === 0)
      return {}
    const { user_name } = data[0]
    return { user_name }
  }
  else { return {} }
})

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
