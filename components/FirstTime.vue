<script setup lang="ts">
import { minLength, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import type { Database } from '@/types/supabase'

const emit = defineEmits(['onUserCreate'])

const supabseClient = useSupabaseClient<Database>()
const supabaseUser = useSupabaseUser()

const userName = ref('')

const rules = computed(() => {
  return {
    userName: { required, minLength: minLength(3) },
  }
})

const validate = useVuelidate(rules, { userName })

const onUserCreateClick = async () => {
  try {
    const result = await validate.value.$validate()
    if (result)
      console.log(userName.value)
    const { error } = await supabseClient
      .from('users')
      .insert({ user_name: userName.value, auth_uid: supabaseUser.value?.id || '' })

    if (error)
      console.log(error)
    else
      emit('onUserCreate')
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-xl">
        <h1 class="text-5xl font-bold">
          Welcome!
        </h1>
        <p class="py-6">
          Looks like you are here for the very first time. No worries first create username to proceed further
        </p>
        <div class="space-x-3 flex justify-center">
          <div>
            <input
              v-model="userName"
              type="email"
              placeholder="Enter Your UserName"
              class="input input-bordered input-primary w-full max-w-xs"
            >
            <p v-if="validate?.userName?.$error" class="text-error text-sm mt-2">
              {{ validate.userName.$errors[0].$message }}
            </p>
          </div>
          <button class="btn btn-primary" @click="onUserCreateClick">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
