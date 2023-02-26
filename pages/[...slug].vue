<script setup lang="ts">
definePageMeta({
  layout: 'forofour',
})
</script>

<template>
  <main class="h-screen w-full flex flex-col justify-center items-center bg-base-200">
    <h1 class="text-9xl font-extrabold text-primary tracking-widest">
      404
    </h1>
    <div class="bg-secondary text-secondary-content px-2 text-sm rounded rotate-12 absolute">
      Page Not Found
    </div>
    <button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-primary-content group active:text-primary-content focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-secondary group-hover:translate-y-0 group-hover:translate-x-0"
        />

        <span class="relative block px-8 py-3 bg-primary border border-current">
          <NuxtLink to="/">Go Home</NuxtLink>
        </span>
      </a>
    </button>
  </main>
</template>
