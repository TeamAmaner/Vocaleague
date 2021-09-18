const { SlashCommandBuilder } = require('@discordjs/builders');
const WebSocket = require('ws');
const axios = require('axios');

const connection = new WebSocket('ws://localhost:8050')
const instance = axios.create({
  baseURL: 'http://localhost:8050'
})

module.exports = {
	data: new SlashCommandBuilder().setName('start')
    .setDescription('Vocaleagueを開始します')
    .setDefaultPermission(false),
	async execute(interaction) {
		await interaction.reply('ゲーム開始します')

    try {
      await instance
        .post('/qus', {
          id: '0',
          ready: 'yes',
          q: '歌詞',
          a: '答え',
          date: new Date()
        })
        .then((res) => connection.send(JSON.stringify(res.data)))
    } catch (err) {
      console.error(err)
    }

		return;
	},
};
