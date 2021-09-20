import { reactive, toRefs } from 'vue'
import axios from 'axios'

const state = reactive({
  error: null,
  currentUser: {},
  Answers: [],
  Users: [],
  question: null,
  answer: null,
  date: null,
})
const connection = new WebSocket('ws://localhost:8050')
const instance = axios.create({
  baseURL: 'http://localhost:8050'
})

export default function () {
  const userLogin = async (name, id, avatar_url) => {
    try {
      await instance
        .post('/users', {
          id,
          name,
          avatar_url
        })
        .then((res) => connection.send(JSON.stringify(res.data)))
    } catch (err) {
      state.error = err
    }
  }

  const setUsers = async () => {
    try {
      const data = await instance.get('/users').then((res) => res.data)
      state.Users = data
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
    const userData = await getUserData(msgData.id)

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

  const setQuestion = async (data) => {
    try {
      state.question = data.q
      state.answer = data.a
      console.log(data.date)
      state.date = new Date(data.date)
    } catch (err) {
      state.error = err
    }
  }

  const stopGame = () => {
    state.question = null
    state.answer = null
    state.date = null
  }


  return {
    // States
    ...toRefs(state),

    // Actions
    setUsers,
    getAnswers,
    userLogin,
    sendAnswer,
    addAnswer,

    setQuestion,
    stopGame
  }
}
