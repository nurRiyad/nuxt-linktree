<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email as emailRules, minLength, required, sameAs } from '@vuelidate/validators'

defineEmits(['changeForm'])

const superClient = useSupabaseClient()
const user = useSupabaseUser()

console.log(user.value)

const email = ref('')
const confirmEmail = ref('')
const pass = ref('')

const rules = computed(() => {
  return {
    email: { required, emailRules },
    confirmEmail: { required, emailRules, sameAs: sameAs(email.value) },
    pass: { required, minLength: minLength(6) },
  }
})

const validate = useVuelidate(rules, { email, confirmEmail, pass })

const errMsg = ref('')
const sendMail = ref(false)

const onSignUpClick = async () => {
  try {
    const result = await validate.value.$validate()
    if (result) {
      const resp = await superClient.auth.signUp({
        email: email.value,
        password: pass.value,
      })

      console.log(resp)
    }
  }
  catch (error) {

  }
}
</script>

<template>
  <div class="container max-w-7xl h-full mx-auto">
    <div class="flex justify-center h-full items-center ">
      <div class="flex flex-col space-y-4 p-10 m-5 bg-base-200 rounded-lg shadow-md">
        <h1 class="text-lg text-center text-primary">
          Create New Account
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
          v-model="confirmEmail"
          type="email"
          placeholder="Reenter Your Email"
          class="input input-bordered input-primary w-full max-w-xs"
        >
        <p v-if="validate.confirmEmail.$error" class="text-error text-sm m-0">
          {{ validate.confirmEmail.$errors[0].$message }}
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
          class="btn btn-primary" @click="onSignUpClick"
        >
          Sign Up With Email
        </button>
        <button class="btn btn-primary gap-1">
          SignIn With Google
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
          If already Have an Account <span class="cursor-pointer underline text-primary" @click="$emit('changeForm')">LogIn</span>
        </p>
      </div>
    </div>
  </div>
</template>
