<script setup lang="ts">
const router = useRouter()

function onSignInClick() {
  router.push('/auth')
}

const isLoggedIn = ref(false)
</script>

<template>
  <nav class="bg-slate-900 fixed w-full z-10 p-4 font-medium border-b border-gray-800">
    <div class="max-w-5xl mx-auto text-primary flex justify-between items-center">
      <div class="space-x-4 flex items-baseline">
        <ULink to="/" class="text-2xl">
          <span class="text-white">Link</span>Tree
        </ULink>
      </div>
      <div class="space-x-4 flex items-baseline">
        <ULink to="/dashboard">
          Dashboard
        </ULink>
      </div>
      <div class="flex space-x-3 items-center">
        <UAvatar
          v-if="isLoggedIn"
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
        />
        <UButton v-else @click="onSignInClick">
          Sign In
        </UButton>
      </div>
    </div>
  </nav>
</template>
