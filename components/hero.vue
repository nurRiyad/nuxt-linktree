<script setup lang="ts">
const user = useSupabaseUser()

const router = useRouter()

const onGetStartClick = () => {
  if (user.value)
    router.push('/dashboard')

  else router.push('/auth')
}
</script>

<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Top Twenty
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
