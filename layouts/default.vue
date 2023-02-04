<template>
  <div class="gd-container">
    <Navbar />
    <div class="pt-20">
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
