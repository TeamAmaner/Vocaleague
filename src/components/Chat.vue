<template>
  <dl v-for="data in Answers" :key="data.id" >
    <p>{{ data.id }}. {{ data.name }}: {{ data.answer }}</p>
  </dl>

  <el-dialog
    title="準備完了"
    v-model="ready"
    width="30%">
    <span>
        開始ボタンを押すことで、ゲームに参加します。
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="got">開始</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { provide } from '@vue/runtime-core';

import store from '@/store';
provide('store', store);

const { setUsers, getAnswers } = store()
setUsers()
getAnswers()

export default {
  name: 'Chat',
  created: function () {
    this.load()
  },
  setup() {
    const { Answers } = store()

    return {
      Answers
    }
  },
  data: () => ({
    ready: false
  }),
  methods: {
    load () {
      this.userData = this.$cookies.get('userData')
      console.log(this.userData)
      this.ready = true
    },
    got () {
      const { Users } = store()
      var there_it_is = false
      for (const u of Users.value) {
        if (u.id === String(this.userData.id)) {
          console.info('idが一致した')
          there_it_is = true
        }
      }
      if (there_it_is === false) {
        console.log('idは無かった')
        const { userLogin } = store();
        userLogin(this.userData.username, String(this.userData.id), `https://cdn.discordapp.com/avatars/${this.userData.id}/${this.userData.avatar}.png`)
      }
      this.ready = false
    }
  }
}
</script>
