<template>
  <!-- <v-container> -->
    <!-- メッセージフォーム -->
    <!-- <v-card class="mx-auto" max-width="800">
      <v-card-text>
        <v-card-title>問題：{{ lylic }}</v-card-title>
        <v-form ref="messageForm">
          <v-textarea v-model="message" :rules="[required]" label="解答"></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="give">リロード</v-btn>
        <v-btn @click="submit">送信</v-btn>
      </v-card-actions>
    </v-card> -->

    <!-- ダイアログ -->
    <!-- <v-dialog v-model="success_dialog" max-width="300">
      <v-card>
        <v-card-title>
          <v-icon color="green">mdi-check-bold</v-icon>回答完了
        </v-card-title>
        <v-card-text>
          送信されました。<br />
          あなたの解答： {{ message }}<br />
          時間が来るまでお待ちください。
        </v-card-text>
        <v-card-actions>
          <v-btn @click="success_dialog=!success_dialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container> -->

  <div id="main">
    <el-form @submit.prevent="submit">
      <h2>問題：{{ lylic }}</h2>
      <el-input v-model="message" name="Answer" placeholder="回答を入力" clearable></el-input>
    <el-button @click="give">リロード</el-button>
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
const { youtube, niconico } = require('@/question.json')
const { webhook } = require('@/config.json');
// const path = require('path')

export default {
  name: 'Question',
  created: function () {
    this.load()
    this.give()
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
  methods: {
    async give () {
      this.getURL()
      const res = await fetch(`https://vocadb.net/api/songs?query=${this.songURL}&maxResults=1&fields=Lyrics`)
      const resJson = await res.json()
      // console.log(resJson)
      const song = resJson.items[0]
      // const song = songs[0];
      console.log(song)
      this.lylic = song.lyrics[0].value.replace('\r', '').split('\n\n')[0]
      this.answer = song.defaultName
    },
    getURL () {
      switch (Math.floor(Math.random() * 2)) {
        case 0: {
          const songIndex = Math.floor(Math.random() * youtube.length)
          this.songURL = `https://www.youtube.com/watch?v=${youtube[songIndex]}`
          break
        }
        case 1: {
          const songIndex = Math.floor(Math.random() * niconico.length)
          this.songURL = `https://www.nicovideo.jp/watch/${niconico[songIndex]}`
          break
        }
        default:
          break
      }
    },
    submit () {
      const data = {
        username: this.userData.username,
        avatar_url: `https://cdn.discordapp.com/avatars/${this.userData.id}/${this.userData.avatar}.png`,
        content: this.message
      }
      axios.post(this.webhook_url, data).then(() => {
        this.success_dialog = true
        this.give()
      })
      this.message = ''
    },
    load () {
      this.userData = this.$cookies.get('userData')
    }
  }
}
</script>
