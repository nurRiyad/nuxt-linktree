<script setup lang="ts">
const formName = ref('login')

const user = useSupabaseUser()

watchEffect(() => {
  if (user.value)
    navigateTo('/dashboard')
})

const onFormChange = (val: string) => {
  formName.value = val
}
</script>

<template>
  <div class="container max-w-7xl mx-auto px-5">
    <LogIn v-if="formName === 'login'" @change-form="onFormChange" />
    <SingUp v-if="formName === 'signup'" @change-form="onFormChange" />
    <Reset v-if="formName === 'reset'" @change-form="onFormChange" />
  </div>
</template>
