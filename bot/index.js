const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

  switch (commandName) {
    case 'add':
      await addUrl(interaction);
      break;
    default:
      break;
  }
});

async function addUrl (interaction) {
  const url = interaction.options.getString('url')
  if (!url) {
    await interaction.reply("楽曲urlを指定してね\nusage: /add [ Youtube_url | NicoNico_url ]")
    return;
  }
  
  await interaction.reply(`${url} を追加するよー`);
}

client.login(token);
