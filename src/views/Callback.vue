<template>
  <div class="login">
    <p>
      Authorizing...
      Please wait for a moment...
    </p>
  </div>
</template>

<script>
const { clientId, clientSecret } = require('@/config.json');

export default {
  name: 'Callback',
  created: function () {
    this.oauth()
  },
  methods: {
    async oauth () {
      if (this.$route.query.code) {
        try {
          this.$cookies.remove('userData')
          const code = this.$route.query.code
          const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
              client_id: clientId,
              client_secret: clientSecret,
              code,
              grant_type: 'authorization_code',
              redirect_uri: `http://localhost:8080/callback`,
              scope: 'identify',
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })

          const oauthData = await oauthResult.json()
          const userResult = await fetch('https://discord.com/api/users/@me', {
            headers: {
              authorization: `${oauthData.token_type} ${oauthData.access_token}`
            }
          })
          const userData = await userResult.json()
          this.saveUserData(userData)
          this.$router.push('/me')
        } catch (error) {
          console.error(error)
        }
      }
    },
    saveUserData (data) {
      this.$cookies.set('userData', data)
    }
  }
}
</script>
