// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: 'Nuxt LinkTree',
      titleTemplate: '%s - Nuxt LinkTree',
      meta: [{ name: 'description', content: 'Nuxt LinkTree. Share your favorite link with others' }],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    'nuxt-icon',
    '@nuxtjs/robots',
  ],

})
