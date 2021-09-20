<template>
  <div>
    <Question/>
    <Chat/>
    <!-- ログイン -->
    <el-dialog
      title="ログインを行ってください"
      v-model="cannotFind"
      width="30%">
      <span>
          Cookieからユーザー情報が見つかりませんでした。<br />
          再度ログインを行ってください。<br />
          OKを押すことでログインページへ飛びます
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="login">Login</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Question from '@/components/Question'
import Chat from '@/components/Chat'
import axios from 'axios'
import { provide } from '@vue/runtime-core';

import store from '@/store';
provide('store', store);

const { webhook, clientId } = require('@/config.json');

const { addAnswer, setQuestion, stopGame } = store();

const connection = new WebSocket('ws://localhost:8050')

connection.onmessage = function (message) {
  const data = JSON.parse(message.data);
  
  console.log(data)

  switch (data.ready) {
    case undefined:
      addAnswer(data)
      break;
    case 'going':
      setQuestion(data)
      break;
    case 'stop':
      stopGame()
      break;
    default:
      break;
  }
}

export default {
  name: 'Game',
  components: {
    Question,
    Chat
  },
  created: function () {
    this.load()
    this.logon()
  },
  data: () => ({
    cannotFind: false,
    message: null,
    webhook_url: webhook,
  }),
  methods: {
    logon () {
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
    },
    login () {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=identify`
    }
  }
}
</script>
