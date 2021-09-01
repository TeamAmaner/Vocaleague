<template>
  <v-app>
    <div id="app">
      <dl v-for="(data, index) in datas" :key="data.id" >
        <p>{{ index }}. {{ data.name }}: {{ data.answer }}</p>
      </dl>
      <v-form>
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            label="Answer"
            clearable
            @keyup.enter="userSendMsg"
          ></v-text-field>
        </v-col>
      </v-form>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'
import { provide } from '@vue/runtime-core'

import store from './store'
provide('store', store)

const connection = new WebSocket('ws://localhost:8050')

connection.onmessage = function (message) {
  const data = JSON.parse(message.data)
  addAnswer(data)
};

export default {
  name: 'About',
  async setup() {
    const store = inject('store')

    const { Answers, currentUser, sendAnswer } = store()
    
    const userSendMsg = (e) => {
      e.preventDefault()

      sendAnswer(currentUser.value.id, e.target.value)

      e.target.value = ''
    };
    
    return {
      currentUser,
      Answers,
      userSendMsg
    }
  },
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
      axios.post('http://localhost:8050' + '/answers', {
        answer: 'ばらばら',
        id: 711804442374307870,
        name: 'Vocaleague'
      }).then(function (response) {
        console.log(response.data)
      })
    },
    dele () {
      axios.delete('http://localhost:8050' + '/answers/' + 711804442374307870).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
