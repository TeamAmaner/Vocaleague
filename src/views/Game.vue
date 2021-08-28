<template>
  <v-app>
    <Question/>
    <Chat/>
  </v-app>
</template>

<script>
import Question from '@/components/Question'
import Chat from '@/components/Chat'
import axios from 'axios'
const { clientId, webhook } = require('@/../config.json')

export default {
  name: 'Game',
  components: {
    Question,
    Chat
  },
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
        content: 'Vocaleagueに参加しました'
      }
      axios.post(this.webhook_url, data).then(() => {
        this.success_dialog = true
      })
    },
    load () {
      this.userData = this.$cookies.get('userData')
      if (!this.userData) {
        this.login()
      }
      console.log(this.userData)
    },
    login () {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=identify`
    }
  }
}
</script>
