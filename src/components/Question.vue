<template>
  <div id="main">
    <div v-if="limit > 0">
      <div v-if="question == null">
        <h2>ゲーム開始まで待ってください。</h2>
      </div>
      <el-form @submit.prevent="submit" v-if="question != null">
        <h2>問題：{{ question }}</h2>
        <h1>残り時間：{{ limit }}</h1>
        <el-input v-model="message" name="Answer" placeholder="回答を入力" clearable></el-input>
      <el-button @click="submit">送信</el-button>
      </el-form>
    </div>
    <div v-if="limit <= 0">
      <h2>
        回答時間が終了しました。<br>
        <span style="color:#008000">正解は緑色  </span>
        <span style="color:#ff2323">  不正解は赤色</span>
        です。
      </h2>
    </div>

    <el-dialog
      title="回答完了"
      v-model="success_dialog"
      width="30%">
      <span>
          送信されました。<br />
          あなたの解答： {{ message }}<br />
          時間が来るまでお待ちください。
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="success_dialog = false">OK</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { provide } from '@vue/runtime-core';

import store from '@/store';
provide('store', store);

const { webhook } = require('@/config.json');

export default {
  name: 'Question',
  created: function () {
    this.load()
  },
  data: () => ({
    success_dialog: false,
    message: null,
    webhook_url: webhook,
    required: value => !!value || '解答は必須項目です。',
    lylic: '',
    answer: '',
    songURL: 'https://www.nicovideo.jp/watch/sm37420134',
    limit: 15
  }),
  setup() {
    const { question, date } = store()

    return {
      question,
      date
    }
  },
  mounted() {
    this.setDate()
    setInterval(() => this.setDate(), 1000)
  },
  methods: {
    setDate() {
      if (this.date !== null) {
        const now = new Date()
        const count = Number(now) - Number(this.date)
        this.limit = 15 - Number(String(count).slice(0,-3))
        if (this.limit === 0) {
          const{ poseGame } = store()
          poseGame()
        }
      }
    },
    submit () {
      this.findUser()
      const { sendAnswer } = store();
      sendAnswer(this.message, String(this.userData.id), this.userData.username)
      const data = {
        username: this.userData.username,
        avatar_url: `https://cdn.discordapp.com/avatars/${this.userData.id}/${this.userData.avatar}.png`,
        content: this.message
      }
      axios.post(this.webhook_url, data).then(() => {
        this.success_dialog = true
      })
      this.message = ''
    },
    load () {
      this.userData = this.$cookies.get('userData')
    },
    findUser () {
      const { Users } = store()
      var there_it_is = false
      for (const u of Users.value) {
        if (u.id === String(this.userData.id)) {
          there_it_is = true
        }
      }
      if (there_it_is === false) {
        console.log('idは無かった')
        const { userLogin } = store();
        userLogin(this.userData.username, String(this.userData.id), `https://cdn.discordapp.com/avatars/${this.userData.id}/${this.userData.avatar}.png`)
      }
    }
  }
}
</script>
