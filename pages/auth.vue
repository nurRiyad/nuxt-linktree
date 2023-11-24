<script setup lang="ts">
// Import predefined theme
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from '@nuxtbase/auth-ui-vue'

definePageMeta({
  layout: 'auth',
})

const supabaseClient = useSupabaseClient()
</script>

<template>
  <div class=" lg:w-1/4 bg-neutral-800 lg:p-12  m-4 shadow-sm rounded-lg">
    <div class="flex items-center space-x-3 pb-4">
      <Icon name="noto:link" size="20" />
      <h1 class="text-primary text-2xl">
        Nuxt Link Tree
      </h1>
    </div>
    <Auth
      :supabase-client="supabaseClient"
      :appearance="{
        theme: ThemeSupa,
      }"
      social-layout="horizontal"
      theme="dark"
    />
  </div>
</template>
