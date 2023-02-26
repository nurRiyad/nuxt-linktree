<script setup lang="ts">
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value)
    navigateTo('/dashboard')
})
</script>

<template>
  <div class="container max-w-7xl mx-auto px-5">
    Redirecting...
  </div>
</template>
