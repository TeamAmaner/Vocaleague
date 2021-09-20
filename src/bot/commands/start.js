const { SlashCommandBuilder } = require('@discordjs/builders');
const WebSocket = require('ws');
const axios = require('axios');
const fetch = require('node-fetch')

const connection = new WebSocket('ws://localhost:8050')
const instance = axios.create({
  baseURL: 'http://localhost:8050'
})

var setq = null

module.exports = {
	data: new SlashCommandBuilder().setName('start')
    .setDescription('Vocaleagueを開始します')
    .setDefaultPermission(false),
	async execute(interaction) {

    try {
      const datas = await instance.get('/qus').then((res) => res.data)
      const data = datas[0]
      
      const songData = await give();

      if (data === undefined) {
        await interaction.reply('ゲーム開始します');

        await instance
          .post('/qus', {
            id: '0',
            ready: 'going',
            q: songData.lylic,
            a: songData.answer,
            date: new Date()
          })
          .then((res) => connection.send(JSON.stringify(res.data)));

      } else if (data.ready === 'going') {

        await interaction.reply('既にゲームは開始されています。');
        return;

      } else if (data.ready === 'stop') {
        await interaction.reply('ゲーム開始します');

        await instance
          .put('/qus/' + `0`, {
            id: '0',
            ready: 'going',
            q: songData.lylic,
            a: songData.answer,
            date: new Date()
          })
          .then((res) => connection.send(JSON.stringify(res.data)));

      }

      setq = setInterval(async () => setQuestion(), 20000)

      return;

    } catch (err) {
      console.error(err)
    }

		return;
	},
};


const setQuestion = async () => {
  try {
    const datas = await instance.get('/qus').then((res) => res.data)
    const data = datas[0]

    if (data.ready === 'stop') {
      clearInterval(setq);
      return;
    }

    const songData = await give()
    await instance
      .put('/qus/' + '0', {
        id: '0',
        ready: 'going',
        q: songData.lylic,
        a: songData.answer,
        date: new Date()
      })
      .then((res) => connection.send(JSON.stringify(res.data)));
  } catch (err) {
    console.error(err)
  }
}

const give = async () => {
  const songURL = getURL()
  const res = await fetch(`https://vocadb.net/api/songs?query=${songURL}&maxResults=1&fields=Lyrics`)
  const resJson = await res.json()
  const song = resJson.items[0]
  const lylic = song.lyrics[0].value.replace('\r', '').split('\n')[0]
  const answer = song.defaultName
  return {
    lylic,
    answer
  }
}

const getURL = () => {
  var songURL = ''
  
  const { youtube, niconico } = require('../../question.json')

  switch (Math.floor(Math.random() * 2)) {
    case 0: {
      const songIndex = Math.floor(Math.random() * youtube.length)
      songURL = `https://www.youtube.com/watch?v=${youtube[songIndex]}`
      break
    }
    case 1: {
      const songIndex = Math.floor(Math.random() * niconico.length)
      songURL = `https://www.nicovideo.jp/watch/${niconico[songIndex]}`
      break
    }
    default:
      break
  }
  return songURL
}
