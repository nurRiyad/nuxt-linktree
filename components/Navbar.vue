<script setup lang="ts">
const router = useRouter()

function onSignInClick() {
  router.push('/auth')
}
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()

const isLoggedIn = computed(() => !!user.value)

async function onLogoutClick() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    toast.add({
      title: error.message,
      color: 'red',
    })
  }
  else {
    await navigateTo('/')
  }
}

async function onItemClick(e: Event, type: string) {
  if (type === 'logout')
    await onLogoutClick()
}

const items = [
  [{
    label: user.value?.email || '-',
    slot: 'account',
    disabled: true,
  }],
  [{
    label: 'Dashboard',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/dashboard',
  }],
  [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: (e: Event) => onItemClick(e, 'logout'),
  }],
]
</script>

<template>
  <nav class="bg-slate-900 fixed w-full z-10 p-4 font-medium border-b border-gray-800">
    <div class="max-w-5xl mx-auto text-primary flex justify-between items-center">
      <div class="space-x-4 flex items-baseline">
        <ULink to="/" class="text-2xl">
          <span class="text-white">Link</span>Tree
        </ULink>
      </div>
      <div v-if="isLoggedIn" class="space-x-4 flex items-baseline">
        <ULink to="/dashboard">
          Dashboard
        </ULink>
      </div>
      <div class="flex space-x-3 items-center">
        <UDropdown
          v-if="isLoggedIn"
          :items="items"
          :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-52' }"
          :popper="{ placement: 'bottom-start' }"
        >
          <UAvatar
            :src="user?.user_metadata.avatar_url"
            alt="Avatar"
          />

          <template #account="{ item }">
            <div class="text-left">
              <p>
                Signed in as
              </p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>

          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>
            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
          </template>
        </UDropdown>

        <UButton v-else @click="onSignInClick">
          Sign In
        </UButton>
      </div>
    </div>
  </nav>
</template>
