<script setup lang="ts">
// Import predefined theme
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from '@nuxtbase/auth-ui-vue'

const supabaseClient = useSupabaseClient()
</script>

<template>
  <div class="max-w-5xl mx-auto flex justify-center items-center h-full w-full">
    <div class=" bg-neutral-800 p-12 m-4 shadow-sm rounded-lg">
      <div class="flex items-center w-96 space-x-3 pb-4">
        <Icon name="noto:link" size="20" />
        <h1 class="text-primary text-2xl">
          Start Your Journey
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
  </div>
</template>
