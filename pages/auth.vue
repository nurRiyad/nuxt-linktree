<script setup lang="ts">
const showSignUp = ref(false)
</script>

<template>
  <div class="container max-w-7xl mx-auto px-5">
    <SingUp v-if="showSignUp" @change-form="showSignUp = !showSignUp" />
    <LogIn v-else @change-form="showSignUp = !showSignUp" />
  </div>
</template>
