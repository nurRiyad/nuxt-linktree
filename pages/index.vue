<script setup lang="ts">
  // Import predefined theme
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { Auth } from '@nuxtbase/auth-ui-vue'

  definePageMeta({
    layout: 'auth'
  })

  const supabaseClient = useSupabaseClient()
</script>


<template>
  <div class="max-w-lg mx-auto">
  <Auth
    :supabaseClient="supabaseClient"
    :appearance="{
      theme: ThemeSupa
      
    }"
    :socialLayout="'horizontal'"
    theme="light"
  />

</div>

</template>

