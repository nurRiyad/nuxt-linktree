<script lang="ts" setup>
const { loggedIn, user, clear} = useUserSession()
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <nav class="flex justify-center space-x-5 p-5 border-b border-zinc-300 mb-5 text-xl font-semibold text-blue-500">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/links">Links</NuxtLink>
      <template v-if="loggedIn">
        <NuxtLink v-if="loggedIn" to="/about">{{user?.login}}</NuxtLink>
        <p class="cursor-pointer" @click="clear">Log Out</p>
      </template>
      <NuxtLink v-else to="/auth">Sing In</NuxtLink>
    </nav>
    <slot />
  </div>
</template>
