<template>
  <dl v-for="(data, index) in userList" :key="data.id" >
    <p>{{ index }}. {{ data.name }}: {{ data.id }}</p>
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


export default {
  name: 'Chat',
  created: function () {
    this.load()
  },
  data: () => ({
    ready: false,
  }),
  methods: {
    load () {
      const { setUsers } = store()
      setUsers()
      this.ready = true
    },
    got () {
      this.ready = false
      const { Users } = store()
      this.userList = Users.value
      for (const u of Users.value) {
        console.log(u)
      }
    }
  }
}
</script>
