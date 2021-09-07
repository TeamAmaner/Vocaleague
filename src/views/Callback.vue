<template>
  <div class="login">
    <p>
      Authorizing...
      Please wait for a moment...
    </p>
  </div>
</template>

<script>

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
          console.warn(code)
          const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
              client_id: process.env.VUE_APP_CLIENT_ID,
              client_secret: process.env.VUE_APP_CLIENT_SECRET,
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
          console.warn(oauthData)
          console.log(`${oauthData.token_type} ${oauthData.access_token}`)
          const userResult = await fetch('https://discord.com/api/users/@me', {
            headers: {
              authorization: `${oauthData.token_type} ${oauthData.access_token}`
            }
          })
          const userData = await userResult.json()
          console.log(userData)
          this.saveUserData(userData)
          this.$router.push('/me')
        } catch (error) {
          // NOTE: An unauthorized token will not throw an error;
          // it will return a 401 Unauthorized response in the try block above
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
