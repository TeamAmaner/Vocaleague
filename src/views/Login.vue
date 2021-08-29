<template>
  <div class="login">
    <button
      v-on:click="login"
      >Login with Discord</button>
  </div>
</template>

<script>
const { clientId } = require('@/config.json')

export default {
  name: 'Login',
  methods: {
    login () {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=identify`
    }
  }
}
</script>
