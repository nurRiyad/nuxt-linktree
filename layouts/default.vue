<template>
  <div class="gd-container bg-slate-900">
    <Navbar />
    <div class="pt-16 max-w-5xl mx-auto w-full">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.gd-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}
</style>
