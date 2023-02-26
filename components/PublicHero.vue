<script setup lang="ts">
const router = useRouter()

const onGetStartClick = () => {
  router.push('/auth')
}
</script>

<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-lg">
        <h1 class="text-5xl font-bold">
          Nuxt LinkTree
        </h1>
        <p class="py-6">
          A web app built with Nuxt.js v3, Supabase, Prisma and Tailwind CSS. Users can log in and create their own Top 20 lists (e.g. songs, movies, anime) and share them publicly.
        </p>
        <button class="btn btn-primary" @click="onGetStartClick">
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>
