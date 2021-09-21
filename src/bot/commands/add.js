const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const request = require('request');

module.exports = {
	data: new SlashCommandBuilder().setName('add')
		.setDescription('Vocaleagueに楽曲を追加する')
		.addStringOption(
			option => option
				.setName('url')
				.setDescription('追加する楽曲url\n追加できない可能性有り')
				.setRequired(true)),
	async execute(interaction) {
		
		const url = interaction.options.getString('url')
		if (!url) {
			await interaction.reply("楽曲urlを指定してね\nusage: /add [ Youtube_url | NicoNico_url ]")
			return;
		}
		if (!url.startsWith('http')) {
			await interaction.reply("楽曲 __**url**__ を指定してね\nusage: /add [ Youtube_url | NicoNico_url ]")
			return;
		}
		
		request.get({
			uri: 'https://vocadb.net/api/songs',
			headers: {'Content-type': 'text/plain'},
			qs: {
				query: url,
				maxResults: 1,
				fields: 'Lyrics'
			},
			json: true
		}, async function(err, req, data){

			const song = data.items[0];

			try {
				const so = data['items'][0];
				const ly = so['lyrics'][0]['value'].replace('\r', '').split('\n\n')[0];
			} catch (err) {
				await interaction.reply(`${url}\nこの楽曲は追加できませんでした`);
				return;
			}
			if (url.startsWith('https://www.nicovideo.jp/watch/')) {
				await addToJson(url, 'https://www.nicovideo.jp/watch/', 'niconico', interaction, song);
			} else if (url.startsWith('http://nico.ms/')) {
				await addToJson(url, 'http://nico.ms/', 'niconico', interaction, song);
			} else if (url.startsWith('https://www.youtube.com/watch?v=')) {
				await addToJson(url, 'https://www.youtube.com/watch?v=', 'youtube', interaction, song);
			} else if (url.startsWith('https://youtu.be/')) {
				await addToJson(url, 'https://youtu.be/', 'youtube', interaction, song);
			}
			if (interaction.replied) {return;}
			await interaction.reply(`__**${data.items[0].name}**__ が正常に追加されました`);
			console.info(`${data.items[0].name} has been added.`)
			return;
		});
	},
};

async function addToJson (url, baseUrl, type, interaction, song) {
	const { youtube, niconico } = require('../../question.json')
	const songid = url.replace(baseUrl, '')
  const lylic = song.lyrics[0].value
  const answer = song.defaultName
	switch (type) {
		case 'niconico':
			const nicoid = songid.split('?')[0];
			for (n of niconico) {
				if (n.id === nicoid) {
					await interaction.reply('この曲は既に追加されてます');
					return;
				}
			}
			niconico.push({"id": nicoid,"title": answer,"lylic": lylic});
			break;
		case 'youtube':
			const youid = songid.split('&')[0];
			for (y of youtube) {
				if (y.id === youid) {
					await interaction.reply('この曲は既に追加されてます');
					return;
				}
			}
			youtube.push({"id": youid,"title": answer,"lylic": lylic});
			break;
		default:
			await interaction.reply('エラーが発生しました。')
			break;
	}
	const dataJ = {youtube: youtube, niconico: niconico};
	fs.writeFileSync('./src/question.json', JSON.stringify(dataJ, null, 2));
}
