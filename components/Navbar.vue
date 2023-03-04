<script setup lang="ts">
const user = useSupabaseUser()
const superClient = useSupabaseClient()

const router = useRouter()

const isLoading = ref(false)

const isLoggedIn = computed(() => {
  if (user.value)
    return true
  else return false
})

const onLogoutClick = async () => {
  try {
    isLoading.value = true
    const { error } = await superClient.auth.signOut()
    if (!error)
      router.push('/')
    else console.log(error)
  }
  catch (error) {
    console.log(error)
  }

  isLoading.value = false
}
</script>

<template>
  <div class="border-b fixed w-full bg-base-200 z-40">
    <div class="container max-w-7xl mx-auto navbar text-primary">
      <div class="navbar-start">
        <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">
          Nuxt Linktree
        </NuxtLink>
      </div>
      <div class="navbar-end">
        <NuxtLink v-if="!isLoggedIn" to="/auth" class="btn btn-primary">
          Get started
        </NuxtLink>
        <div v-else class="dropdown dropdown-end hover:text-primary pr-4">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <Icon name="mdi:face-man" size="3em" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li @click="onLogoutClick">
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
