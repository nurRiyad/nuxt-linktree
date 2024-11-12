<script lang="ts" setup>

const { user } = useUserSession()


</script>

<template>
  <div>
    <pre>{{ user }}</pre>
  </div>
</template>
