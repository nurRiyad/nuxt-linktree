<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
</script>

<template>
  <ContentLoader
    viewBox="0 0 100 40"
    :speed="2"
    primary-color="#ffffff"
    secondary-color="#cfcece"
  >
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <rect x="2" y="5" rx="0" ry="0" width="130" height="7" />
    <rect x="2" y="18" rx="0" ry="0" width="130" height="7" />
    <rect x="2" y="32" rx="0" ry="0" width="130" height="7" />
  </ContentLoader>
</template>
