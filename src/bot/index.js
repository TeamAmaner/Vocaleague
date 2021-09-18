const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/bot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', async client => {
	if (!client.application?.owner) await client.application?.fetch();

	const guild = await client.guilds.cache.get('864657174881370112');
	// Block a role from the command permissions
	guild.commands.permissions.add({ command: '886183658417979412', permissions: [
		{
			id: '653785595075887104',
			type: 'USER',
			permission: true,
		},
	]}).catch(console.error);
		
	const mguild = await client.guilds.cache.get('840795339723767838');
	// Block a role from the command permissions
	mguild.commands.permissions.add({ command: '886429836942385154', permissions: [
		{
			id: '653785595075887104',
			type: 'USER',
			permission: true,
		},
	]}).catch(console.error);

	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
