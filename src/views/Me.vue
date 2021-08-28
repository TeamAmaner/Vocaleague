<template>
  <div class="login">
    <p>Welcome {{userData.username}}</p>
  </div>
</template>

<script>
import axios from 'axios'
const { webhook } = require('@/../config.json')

export default {
  name: 'Me',
  created: function () {
    this.load()
    this.submit()
  },
  data: () => ({
    success_dialog: false,
    message: null,
    webhook_url: webhook
  }),
  methods: {
    submit () {
      const data = {
        username: this.userData.username,
        avatar_url: `https://cdn.discordapp.com/avatars/${this.userData.id}/${this.userData.avatar}.png`,
        content: 'Vocaleagueにログインしました'
      }
      axios.post(this.webhook_url, data).then(() => {
        this.success_dialog = true
      })
    },
    load () {
      this.userData = this.$cookies.get('userData')
      console.log(this.userData)
    }
  }
}
</script>
