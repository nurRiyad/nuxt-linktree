<script setup lang="ts">
interface Props {
  username: string
}
const props = withDefaults(defineProps<Props>(), {
  username: '',
})
</script>

<template>
  <div>
    <h1>This is dashboard page {{ username }}</h1>
  </div>
</template>

<style scoped>

</style>
