<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
</script>

<template>
  <ContentLoader
    viewBox="0 0 600 160"
    :speed="2"
    primary-color="#ffffff"
    secondary-color="#cfcece"
  >
    <rect x="187" y="24" rx="0" ry="0" width="193" height="41" />
    <rect x="80" y="85" rx="0" ry="0" width="437" height="6" />
    <rect x="80" y="98" rx="0" ry="0" width="437" height="6" />
    <rect x="80" y="111" rx="0" ry="0" width="437" height="6" />
    <rect x="80" y="124" rx="0" ry="0" width="437" height="6" />
    <rect x="252" y="146" rx="0" ry="0" width="83" height="23" />
  </ContentLoader>
</template>
