// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future:{
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    'nuxt-auth-utils'
  ],
  runtimeConfig:{
    oauth:{
      "github":{
        "clientId": '',
        "clientSecret": '',
      }
    },
    turso: {
      databaseUrl: "",
      authToken: "",
    },
  }
})