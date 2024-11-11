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
    <h1>Not logged in</h1>
    <a class="p-3 mt-20 bg-blue-400" href="/api/auth/github">Login with GitHub</a>
  </div>
</template>
