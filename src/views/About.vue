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
          <el-button @click="got">取得</el-button>
          <el-button @click="dele">削除</el-button>
        </el-form>


        <dl v-for="(data, index) in datas" :key="data.id" >
          <p>{{ index }}. {{ data.name }}: {{ data.answer }}</p>
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
    ly: 'aaa'
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
      const { sendAnswer } = store();
      sendAnswer('ばらばら', '686547120534454315', '名無し。')
    },
    dele () {
      axios.delete('http://localhost:8050' + '/answers/' + '686547120534454315').then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
