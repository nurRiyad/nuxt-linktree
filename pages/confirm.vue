<script setup lang="ts">
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value)
    navigateTo('/dashboard')
})
</script>

<template>
  <div class="container max-w-7xl mx-auto px-5">
    <div class="w-full h-full flex justify-center items-center">
      <h1 class="text-4xl  font-semibold text-primary ">
        Redirecting ...
      </h1>
    </div>
  </div>
</template>
