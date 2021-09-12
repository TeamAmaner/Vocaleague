const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName('start')
    .setDescription('Vocaleagueを開始します'),
	async execute(interaction) {
		await interaction.reply('ゲーム開始します')

    try {
      await instance
        .post('/answers', {
          ready: 'yes',
          questions: [
            {
              q: '歌詞',
              a: '答え'
            }
          ]
        })
        .then((res) => connection.send(JSON.stringify(res.data)))
    } catch (err) {
      console.error(err)
    }

		return;
	},
};
