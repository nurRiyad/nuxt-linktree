<script lang="ts" setup>

const { loggedIn, user, session, clear } = useUserSession()

</script>

<template>
  <div v-if="loggedIn" class="text-4xl" >
    <h1>Welcome {{ user?.login || '--' }}!</h1>
    <p>Logged in since {{ session.loggedInAt }}</p>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <NuxtLink to="/auth">LigIn</NuxtLink>
  </div>
</template>
