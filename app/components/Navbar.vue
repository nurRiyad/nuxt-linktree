<script lang="ts" setup>
const { loggedIn, user, clear } = useUserSession()

const items = [
  [
    {
      label: 'ben@example.com',
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: () => clear(),
    },
  ],
]
</script>

<template>
  <div class="text-xl py-5 border-b-gray-800 border-b">
    <nav class="flex justify-between h-8 items-center max-w-2xl mx-auto">
      <ULink active-class="text-primary" to="/">Home </ULink>
      <div v-if="loggedIn" class="space-x-4">
        <ULink active-class="text-primary" to="/links">Links</ULink>
        <ULink active-class="text-primary" :to="`/links/${user?.login}`">Preview</ULink>
      </div>
      <div>
        <template v-if="loggedIn && user">
          <UDropdown
            :items="items"
            :ui="{ item: { disabled: 'cursor-text select-text' } }"
            :popper="{ placement: 'bottom-start' }"
          >
            <UAvatar :src="user.avatar_url" size="sm" alt="Avatar" />
            <template #account>
              <div class="text-left">
                <p>Signed in as</p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                  {{ user.login }}
                </p>
              </div>
            </template>
          </UDropdown>
        </template>
        <div v-else>
          <UButton
            to="/api/auth/github"
            icon="i-simple-icons-github"
            label="Login with GitHub"
            color="white"
            size="xs"
            external
          />
        </div>
      </div>
    </nav>
  </div>
</template>
