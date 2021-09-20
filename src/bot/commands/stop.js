const { SlashCommandBuilder } = require('@discordjs/builders');
const WebSocket = require('ws');
const axios = require('axios');

const connection = new WebSocket('ws://localhost:8050')
const instance = axios.create({
  baseURL: 'http://localhost:8050'
})

module.exports = {
	data: new SlashCommandBuilder().setName('stop')
    .setDescription('Vocaleagueを停止します')
    .setDefaultPermission(true),
	async execute(interaction) {

    try {
      const data = await instance.get('/qus').then((res) => res.data)
      if (data[0] === undefined) {
        await interaction.reply('ゲームは開始されていません。');
        return;
      }
      await interaction.reply('ゲーム停止します');

      const songData = data[0]
      
      await instance
        .put('/qus/' + '0', {
          id: '0',
          ready: 'stop',
          q: songData.q,
          a: songData.a,
          date: songData.date
        })
        .then((res) => connection.send(JSON.stringify(res.data)));

      return;

    } catch (err) {
      console.error(err)
    }

		return;
	},
};