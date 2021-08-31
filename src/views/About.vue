<template>
  <v-app>
    <div id="app">
      <v-btn v-on:click="send">追加</v-btn>
      <dl v-for="(data, index) in datas" :key="data.id" >
        <p>{{ index }}. {{ data.name }}: {{ data.answer }}</p>
      </dl>
      <v-btn v-on:click="dele">削除</v-btn>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'About',
  created: function () {
    this.got()
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
      }).then(this.setAnswers)
    },
    send () {
      axios.post('http://localhost:8050' + '/answers', {
        answer: 'ばらばら',
        id: 711804442374307870,
        name: 'Vocaleague'
      }).then(function (response) {
        console.log(response.data)
      })
      this.got()
    },
    dele () {
      axios.delete('http://localhost:8050' + '/answers/' + 711804442374307870).then(res => {
        console.log(res.data)
      })
      this.got()
    },
    setAnswers (res) {
      console.info(res)
      this.datas = res
    }
  }
}
</script>
