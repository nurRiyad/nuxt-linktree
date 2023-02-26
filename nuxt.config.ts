// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
  ],

})
