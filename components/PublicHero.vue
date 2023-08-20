<script setup lang="ts">
const router = useRouter()

function onGetStartClick() {
  router.push('/auth')
}
</script>

<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-lg">
        <h1 class="text-5xl font-bold text-primary">
          Nuxt LinkTree
        </h1>
        <p class="py-6">
          A web app where users can authenticate and create their own favorite lists (e.g. songs, movies, anime) and share them publicly.Nuxt LinkTree built with Nuxtjs v3, Supabase, vuelidate and Tailwind CSS.
        </p>
        <button class="btn btn-primary" @click="onGetStartClick">
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>
