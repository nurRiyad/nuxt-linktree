<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email as emailRules, minLength, required, sameAs } from '@vuelidate/validators'

defineEmits(['changeForm'])

const superClient = useSupabaseClient()

const email = ref('')
const confirmEmail = ref('')
const pass = ref('')

const isLoading = ref(false)
const isLoadingGoogle = ref(false)

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

async function onSignUpClick() {
  try {
    const result = await validate.value.$validate()
    if (result) {
      isLoading.value = true
      // for dev http://localhost:3000/confirm
      const { error } = await superClient.auth.signUp({
        email: email.value,
        password: pass.value,
        options: {
          emailRedirectTo: 'https://nuxt-linktree.vercel.app/confirm',
        },
      })
      if (error?.message) {
        errMsg.value = error.message
        isLoading.value = false
      }
      else {
        sendMail.value = true
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

async function onSignupWithGoogle() {
  try {
    isLoadingGoogle.value = true
    // for dev http://localhost:3000/confirm
    const { error } = await superClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://nuxt-linktree.vercel.app/confirm',
      },
    })
    if (error) {
      errMsg.value = error.message
      isLoading.value = false
    }
  }
  catch (error) {
    console.log(error)
    isLoadingGoogle.value = false
  }
}

watch([email, confirmEmail, pass], () => {
  errMsg.value = ''
  sendMail.value = false
})
</script>

<template>
  <div class="container max-w-7xl h-full mx-auto">
    <div class="flex justify-center h-full items-center ">
      <div class="flex flex-col space-y-4 p-10 m-5 bg-base-200 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-center text-primary pb-5">
          Welcome!
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

        <div class="flex justify-between text-sm pb-5">
          <p class="cursor-pointer underline text-primary" @click="$emit('changeForm', 'reset')">
            Forget Password
          </p>
          <p class="cursor-pointer underline text-primary" @click="$emit('changeForm', 'login')">
            Log In
          </p>
        </div>

        <button
          class="btn btn-primary" :class="{ loading: isLoading }" @click="onSignUpClick"
        >
          Sign Up
        </button>
        <button class="btn btn-primary gap-1" :class="{ loading: isLoadingGoogle }" @click="onSignupWithGoogle">
          <span class="pr-2">Continue With</span>
          <Icon name="logos:google-icon" size="1em" />
        </button>
        <div v-if="sendMail" class="alert alert-info shadow-lg">
          <div>
            <span>Check Your Mail for verification Link</span>
          </div>
        </div>
        <div v-if="errMsg.length > 0" class="alert alert-error shadow-lg">
          <div>
            <span>{{ errMsg }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
