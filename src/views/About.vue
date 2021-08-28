<template>
  <v-container>
    <!-- メッセージフォーム -->
    <v-card class="mx-auto" max-width="800">
      <v-card-text>
        <v-form ref="messageForm">
          <v-textarea v-model="message" :rules="[required]" label="メッセージ"></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submit">送信</v-btn>
      </v-card-actions>
    </v-card>

    <!-- ダイアログ -->
    <v-dialog v-model="success_dialog" max-width="300">
      <v-card>
        <v-card-title>
          <v-icon color="green">mdi-check-bold</v-icon>送信成功！
        </v-card-title>
        <v-card-text>
          送信されました。
          <br />ありがとうございました。
        </v-card-text>
        <v-card-actions>
          <v-btn @click="success_dialog=!success_dialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
const { webhook } = require('@/../config.json')

export default {
  name: 'PostForm',
  data: () => ({
    success_dialog: false,
    message: null,
    webhook_url: webhook,
    required: value => !!value || 'メッセージは必須項目です。'
  }),
  methods: {
    submit () {
      if (this.$refs.messageForm.validate()) {
        const data = {
          username: 'Zect',
          avatar_url: 'https://github.com/soundcloud.png',
          content: this.message
        }
        axios.post(this.webhook_url, data).then(() => {
          this.success_dialog = true
        })
      }
    }
  }
}
</script>
