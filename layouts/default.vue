<template>
  <div>
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
  min-height: 100vh;
}
</style>
