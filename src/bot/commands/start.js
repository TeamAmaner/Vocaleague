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
    .setDefaultPermission(true),
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

      setq = setInterval(async () => setQuestion(), 25000)

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
    // setTimeout('await sendPose()', 14000);
  } catch (err) {
    console.error(err)
  }
}

const give = async () => {
  const songData = getData()
  const answer = songData.title

  const lylicBase = songData.lylic.replace('\r', '').split('\n').filter(v => v)
  const songIndex = Math.floor(Math.random() * lylicBase.length)
  const lylic = lylicBase[songIndex]

  return {
    lylic,
    answer
  }
}

const getData = () => {
  var songData = {};
  
  const { youtube, niconico } = require('../../question.json')

  switch (Math.floor(Math.random() * 2)) {
    case 0: {
      const songIndex = Math.floor(Math.random() * youtube.length)
      songData = youtube[songIndex]
      break
    }
    case 1: {
      const songIndex = Math.floor(Math.random() * niconico.length)
      songData = niconico[songIndex]
      break
    }
    default:
      break
  }
  return songData
}

const sendPose = async () => {
  try {
    const data = await instance.get('/qus').then((res) => res.data)
    if (data[0] === undefined) {return;}

    const songData = data[0]
    
    await instance
      .put('/qus/' + '0', {
        id: '0',
        ready: 'pose',
        q: songData.q,
        a: songData.a,
        date: songData.date
      })
      .then((res) => connection.send(JSON.stringify(res.data)));

    return;

  } catch (err) {
    console.error(err)
  }

}