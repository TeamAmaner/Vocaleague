<template>
  <div id="main">
    <div v-if="question == null">
      <h2>ゲーム開始まで待ってください。</h2>
    </div>
    <el-form @submit.prevent="submit" v-if="question != null">
      <h2>問題：{{ question }}</h2>
      <el-input v-model="message" name="Answer" placeholder="回答を入力" clearable></el-input>
    <el-button @click="submit">送信</el-button>
    </el-form>

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
    // this.give()
  },
  data: () => ({
    success_dialog: false,
    message: null,
    webhook_url: webhook,
    required: value => !!value || '解答は必須項目です。',
    lylic: '',
    answer: '',
    songURL: 'https://www.nicovideo.jp/watch/sm37420134'
  }),
  setup() {
    const { question } = store()

    return {
      question
    }
  },
  methods: {
    submit () {
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
    }
  }
}
</script>
