<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'

const supabaseClient = useSupabaseClient()
const supabaseUser = useSupabaseUser()
const router = useRouter()

const password = ref('')

const isLoading = ref(false)
const isLoggedIn = ref(false)

const rules = computed(() => {
  return {
    password: { required, minLength: minLength(6) },
  }
})

const validate = useVuelidate(rules, { password })

const errMsg = ref('')

async function onUpdateClick() {
  try {
    isLoading.value = true
    const result = await validate.value.$validate()
    if (result) {
      const { error } = await supabaseClient.auth.updateUser({ password: password.value })

      if (error) {
        errMsg.value = error.message
        isLoading.value = false
      }
      else { router.push('dashboard') }
    }
    else { isLoading.value = false }
  }
  catch (error) {
    console.log(error)
    isLoading.value = false
  }
}

watchEffect(() => {
  if (supabaseUser.value)
    isLoggedIn.value = true
})
</script>

<template>
  <div class="container max-w-7xl h-full mx-auto">
    <div class="flex justify-center h-full items-center ">
      <div class="flex flex-col space-y-4 p-10 m-5 bg-base-200 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-center text-primary pb-5">
          Update Password
        </h1>

        <input
          v-model="password"
          type="password"
          placeholder="Enter New Password"
          class="input input-bordered input-primary w-full max-w-xs"
        >
        <p v-if="validate.password.$error" class="text-error text-sm m-0">
          {{ validate.password.$errors[0].$message }}
        </p>

        <button
          class="btn btn-primary"
          :disabled="!isLoggedIn"
          :class="{ loading: isLoading }"
          @click="onUpdateClick"
        >
          Update
        </button>
        <div v-if="errMsg.length > 0" class="alert alert-error shadow-lg">
          <div>
            <span>{{ errMsg }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
