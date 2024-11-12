<script lang="ts" setup>

const { loggedIn } = useUserSession()

</script>

<template>
  <div class="flex flex-col items-center space-y-3">
    <h1 class="text-3xl font-bold">Welcome To Nuxt LinkTree</h1>
    <p>Share Your link from one place</p>
    <div v-if="!loggedIn" class="pt-5">
      <NuxtLink class="bg-blue-600 p-4 m-2 rounded-md text-white" to="/auth">Sign In</NuxtLink>
    </div>
    <div v-else class="pt-5">
      <NuxtLink class="bg-blue-600 p-4 m-2 rounded-md text-white" to="/links">Start Adding Links</NuxtLink>
    </div>
  </div>
</template>
