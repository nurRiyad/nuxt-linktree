<script setup lang="ts">
// if not logged in show public hero component

const user = useSupabaseUser()
const superClient = useSupabaseClient()

const router = useRouter()

const isLoggedIn = computed(() => {
  if (user.value)
    return true
  else return false
})

const { data: loggedInUser, pending } = await useAsyncData('get-data', async () => {
  const { data } = await superClient
    .from('topten_users')
    .select('username, full_name')
    .eq('uid', user.value?.id)

  if (data?.length)
    return data.at(0)
  else return {}
})

const isFirsTime = ref(false)
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <PublicHero v-if="!isLoggedIn" />
    <div v-else>
      <FirstTime v-if="isFirsTime" />
      <PrivateHero v-else />
    </div>
  </div>
</template>
