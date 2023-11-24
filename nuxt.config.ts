// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@nuxtjs/supabase',
  ],

  supabase: {
    redirect: false,
  },

  devtools: { enabled: true },
})
