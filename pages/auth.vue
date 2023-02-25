<script setup lang="ts">
const showSignUp = ref(false)

const user = useSupabaseUser()

const isLoggedIn = computed(() => {
  if (user.value)
    return true
  else return false
})
</script>

<template>
  <div class="container max-w-7xl mx-auto px-5">
    <div v-if="isLoggedIn">
      <pre>{{ user }}</pre>
    </div>
    <SingUp v-else-if="showSignUp" @change-form="showSignUp = !showSignUp" />
    <LogIn v-else @change-form="showSignUp = !showSignUp" />
  </div>
</template>
