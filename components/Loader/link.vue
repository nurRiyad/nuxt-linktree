<script setup lang=ts>
import { ContentLoader } from 'vue-content-loader'
</script>

<template>
  <ContentLoader
    viewBox="0 0 400 20"
    :speed="2"
    primary-color="#ffffff"
    secondary-color="#cfcece"
  >
    <rect x="4" y="5" rx="1" ry="1" width="400" height="3" />
    <rect x="4" y="10" rx="1" ry="1" width="400" height="3" />
    <rect x="4" y="15" rx="1" ry="1" width="400" height="3" />
  </ContentLoader>
</template>
