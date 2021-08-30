import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// .envファイルから環境変数(トークン・URLを読み込ませる)
var BASE_URL = 'http://localhost:8050'

export default new Vuex.Store({
  actions: {
    get_event (context, param) {
      return axios.get(BASE_URL + param, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'json'
      }).then(() => {
        // レスポンスが200の時の処理
        console.log('取れたよ')
      }).catch(err => {
        if (err.response) {
          // レスポンスが200以外の時の処理
        }
      })
    }
  }
})
