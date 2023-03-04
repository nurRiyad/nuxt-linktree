<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email as emailRules, required } from '@vuelidate/validators'

defineEmits(['changeForm'])

const supabaseClient = useSupabaseClient()

const email = ref('')

const isLoading = ref(false)

const rules = computed(() => {
  return {
    email: { required, emailRules },
  }
})

const validate = useVuelidate(rules, { email })

const errMsg = ref('')
const infoMsg = ref('')

const onResetClick = async () => {
  try {
    isLoading.value = true
    const result = await validate.value.$validate()

    if (result) {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email.value, {
        redirectTo: 'http://localhost:3000/reset',
      })

      if (error) {
        errMsg.value = error.message
        isLoading.value = false
      }
      else {
        infoMsg.value = 'Check Your Mailbox For Reset Link'
        isLoading.value = false
      }
    }
    else { isLoading.value = false }
  }
  catch (error) {
    console.log(error)
    isLoading.value = false
  }
}

watch(email, () => {
  errMsg.value = ''
  infoMsg.value = ''
})
</script>

<template>
  <div class="container max-w-7xl h-full mx-auto">
    <div class="flex justify-center h-full items-center ">
      <div class="flex flex-col space-y-4 p-10 m-5 bg-base-200 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-center text-primary pb-5">
          Reset Password
        </h1>

        <input
          v-model="email"
          type="email"
          placeholder="Enter Your Email"
          class="input input-bordered input-primary w-full max-w-xs"
        >
        <p v-if="validate.email.$error" class="text-error text-sm m-0">
          {{ validate.email.$errors[0].$message }}
        </p>
        <div class="flex justify-between text-sm pb-5">
          <p class="cursor-pointer underline text-primary" @click="$emit('changeForm', 'login')">
            Log In
          </p>
          <p class="cursor-pointer underline text-primary" @click="$emit('changeForm', 'signup')">
            Sign Up
          </p>
        </div>

        <button
          class="btn btn-primary" :class="{ loading: isLoading }" @click="onResetClick"
        >
          Reset
        </button>
        <div v-if="errMsg.length > 0" class="alert alert-error shadow-lg">
          <div>
            <span>{{ errMsg }}</span>
          </div>
        </div>
        <div v-if="infoMsg.length > 0" class="alert alert-info shadow-lg">
          <div>
            <span>{{ infoMsg }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
