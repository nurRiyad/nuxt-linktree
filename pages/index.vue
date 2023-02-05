<script setup lang="ts">
const user = useSupabaseUser()

const isLoggedIn = computed(() => {
  if (user.value)
    return true
  else return false
})
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <PrivateHero v-if="isLoggedIn" />
    <PublicHero v-else />
  </div>
</template>
