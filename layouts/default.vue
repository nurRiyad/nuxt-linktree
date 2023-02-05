<template>
  <div class="gd-container bg-base-200">
    <Navbar />
    <div class="pt-16 flex">
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
