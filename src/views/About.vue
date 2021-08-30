<template>
  <div id="app">
    <dl v-for="(data, index) in datas" :key="data.id" >
      <p>{{ index }}. {{ data.name }}: {{ data.answer }}</p>
    </dl>
  </div>
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
    setAnswers (res) {
      console.info(res)
      this.datas = res
    }
  }
}
</script>
