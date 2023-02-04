<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email as emailRules, minLength, required } from '@vuelidate/validators'

defineEmits(['changeForm'])

const email = ref('')
const pass = ref('')

const rules = computed(() => {
  return {
    email: { required, emailRules },
    pass: { required, minLength: minLength(6) },
  }
})

const validate = useVuelidate(rules, { email, pass })

const errMsg = ref('')
const sendMail = ref(false)

const onLogInClick = async () => {
  const result = await validate.value.$validate()
  if (result)
    console.log('Good Value')
}
</script>

<template>
  <div class="container max-w-7xl h-full mx-auto">
    <div class="flex justify-center h-full items-center ">
      <div class="flex flex-col space-y-4 p-10 m-5 bg-base-200 rounded-lg shadow-md">
        <h1 class="text-lg text-center text-primary">
          LogIn to your account
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
        <input
          v-model="pass"
          type="password"
          placeholder="Password"
          class="input input-bordered input-primary w-full max-w-xs"
        >
        <p v-if="validate.pass.$error" class="text-error text-sm m-0">
          {{ validate.pass.$errors[0].$message }}
        </p>
        <button
          class="btn btn-primary" @click="onLogInClick"
        >
          LogIn With Email
        </button>
        <button class="btn btn-primary gap-1">
          LogIn With Google
        </button>
        <div v-if="sendMail" class="alert alert-info shadow-lg">
          <div>
            <span>Check Your Mail for verification Link</span>
          </div>
        </div>
        <div v-if="errMsg.length > 0" class="alert alert-error shadow-lg">
          <div>
            <span>err Msg</span>
          </div>
        </div>
        <p class="text-center">
          Don't have an account? <span class="cursor-pointer underline text-primary" @click="$emit('changeForm')"> SingUp</span>
        </p>
      </div>
    </div>
  </div>
</template>
