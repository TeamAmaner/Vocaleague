<template>
  <div class="login">
    <p>Welcome {{userData.username}}</p>
    <p>ゲームを開始するには、下のボタンを押してください</p>
    <router-link to="/game">Start Vocaleague!</router-link>
    <router-view/>
  </div>
</template>

<script>
const { webhook, clientId } = require('@/config.json');

export default {
  name: 'Me',
  created: function () {
    this.load()
    // this.submit()
  },
  data: () => ({
    success_dialog: false,
    message: null,
    webhook_url: webhook
  }),
  methods: {
    load () {
      this.userData = this.$cookies.get('userData')
      if (!this.userData) {
        this.login()
      }
    },
    login () {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=identify`
    }
  }
}
</script>
