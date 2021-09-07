import { reactive, toRefs } from 'vue'
import axios from 'axios'

const state = reactive({
  error: null,
  currentUser: {},
  Answers: []
})
const connection = new WebSocket('ws://localhost:8050')
const instance = axios.create({
  baseURL: 'http://localhost:8050'
})

export default function () {
  const setUser = async (userId) => {
    try {
      const data = await instance.get('/users/' + userId).then((res) => res.data)
      state.currentUser = data

      sessionStorage.setItem('user', JSON.stringify(state.currentUser))
    } catch (err) {
      state.error = err
    }
  }

  const getAnswers = async () => {
    try {
      const data = await instance.get('/answers').then((res) => res.data)
      state.Answers = data
    } catch (err) {
      state.error = err
    }
  }

  const addAnswer = async (msgData) => {
    const userData = await getUserData(msgData.userId)

    const data = {
      ...msgData,
      ...userData
    }

    state.Answers = [...state.Answers, data]
  }

  const getUserData = async (userId) => {
    const user = await instance.get('/users/' + userId).then((res) => res.data)
    return {
      id: user.id,
      name: user.name
    }
  }

  const sendAnswer = async (answer, id, name) => {
    try {
      await instance
        .post('/answers', {
          answer,
          id,
          name,
          date: new Date()
        })
        .then((res) => connection.send(JSON.stringify(res.data)))
    } catch (err) {
      state.error = err
    }
  }

  return {
    // States
    ...toRefs(state),

    // Actions
    getAnswers,
    setUser,
    sendAnswer,
    addAnswer
  }
}
