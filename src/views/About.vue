<template>
  <el-container>
    <el-main>

      <div class="todo-list">
        <h1>Vue 3 Todo App</h1>
        <el-form>
          <el-input
            v-model="newTodo"
            name="newTodo"
            placeholder="タスクを入力"
            clearable
            @keyup.enter="userSendMsg"
          ></el-input>
          <el-button @click="send">追加</el-button>
          <el-button @click="check">取得</el-button>
          <el-button @click="show">表示</el-button>
          <el-button @click="dele">削除</el-button>
        </el-form>


        <dl v-for="(data, index) in userList" :key="data.id" >
          <p>{{ index }}. {{ data.name }}: {{ data.id }}</p>
        </dl>

      </div>

    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
import { provide } from '@vue/runtime-core';

import store from '@/store';
provide('store', store);

export default {
  name: 'About',
  data: () => ({
    datas: null,
    ly: 'aaa',
    userList: []
  }),
  methods: {
    got () {
      axios.get('http://localhost:8050' + '/answers', {
        headers: {
          'Content-Type': 'text/plane'
        },
        responseType: 'json'
      }).then(res => {
        const datas = res.data
        console.info(datas)
        return datas
      })
    },
    send () {
      // const { sendAnswer } = store();
      // sendAnswer('ばらばら', '686547120534454315', '名無し。')
      var there_it_is = false
      for (const u of this.userList) {
        if (u.id === '686547120534454315') {
          console.info('idが一致した')
          there_it_is = true
        }
      }
      if (there_it_is === false) {
        console.log('idは無かった')
        const { userLogin } = store();
        userLogin('名無し。', '686547120534454315', 'avatar_url')
      }
    },
    dele () {
      axios.delete('http://localhost:8050' + '/users/' + '686547120534454315').then(res => {
        console.log(res.data)
      })
    },
    check() {
      const { setUsers } = store()
      setUsers()
      console.info('読み込んだ')
      // const myId = this.userData.id
      // const { currentUser, userLogin } = store()
      // for (const u of currentUser) {
      //   const userId = u.id
      //   if (userId === myId) {
      //     console.log('IDがありました')
      //     return
      //   }
      // }
      // userLogin(this.userData.username, String(this.userData.id), `https://cdn.discordapp.com/avatars/${this.userData.id}/${this.userData.avatar}.png`)
    },
    show() {
      const { Users } = store()
      this.userList = Users.value
      for (const u of Users.value) {
        console.log(u)
      }
    }
  }
}
</script>
