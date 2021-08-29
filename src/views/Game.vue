<template>
  <v-app>
    <Question/>
    <Chat/>
    <!-- ログイン -->
    <v-dialog v-model="cannotFind" max-width="300">
      <v-card>
        <v-card-title>
          <v-icon color="green">mdi-check-bold</v-icon>回答完了
        </v-card-title>
        <v-card-text>
          Cookieからユーザー情報が見つかりませんでした。<br />
          再度ログインを行ってください。<br />
          OKを押すことでログインページへ飛びます
        </v-card-text>
        <v-card-actions>
          <v-btn @click="login">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Question from '@/components/Question'
import Chat from '@/components/Chat'
import axios from 'axios'
const { clientId, webhook } = require('@/config.json')

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
    cannotFind: false,
    message: null,
    webhook_url: webhook
  }),
  methods: {
    submit () {
      const data = {
        content: `__**${this.userData.username}**__ がVocaleagueに参加しました`
      }
      axios.post(this.webhook_url, data)
    },
    load () {
      this.userData = this.$cookies.get('userData')
      if (!this.userData) {
        this.cannotFind = true
      }
      console.log(this.userData)
    },
    login () {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=identify`
    }
  }
}
</script>
