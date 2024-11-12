<script lang="ts" setup>


definePageMeta({
  middleware:['auth']
})

const {data} = useFetch('/api/links')

</script>

<template>
  <div>
    <h1>Links</h1>
    <pre>{{ data }}</pre>
  </div>
</template>
