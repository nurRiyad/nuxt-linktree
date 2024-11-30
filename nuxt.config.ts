// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  tailwindcss: {
    exposeconfig: true,
  },
  modules: ['@vueuse/nuxt', '@nuxt/eslint', 'nuxt-auth-utils', '@nuxt/ui'],
  runtimeConfig: {
    oauth: {
      github: {
        clientId: '',
        clientSecret: '',
      },
    },
    turso: {
      databaseUrl: '',
      authToken: '',
    },
  },
})
