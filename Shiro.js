require('dotenv').config();
const { SHIRO_TOKEN, OWNERS, SHIRO_PREFIX, INVITE } = process.env;
const path = require('path');
const { Intents } = require('discord.js');
const Client = require('./structures/Client');
const client = new Client({
	commandPrefix: SHIRO_PREFIX,
	owner: OWNERS.split(','),
	invite: INVITE,
	disableMentions: 'everyone',
	partials: ['GUILD_MEMBER'],
	ws: { intents: [Intents.NON_PRIVILEGED, 'GUILD_MEMBERS'] }
});

client.registry
	.registerDefaultTypes()
	.registerTypesIn(path.join(__dirname, 'types'))
	.registerGroups([
		['util', 'Utility (Owner)'],
		['core', 'Core'],
		['info', 'Discord Information'],
		['random-response', 'Random Response'],
		['random-image', 'Random Image'],
		['auto', 'Automatic Response'],
		['events', 'Events'],
		['search', 'Search'],
		['games', 'Games'],
		['edit-text', 'Text Manipulation'],
		['edit-number', 'Number Manipulation'],
		['code', 'Coding Tools'],
		['other', 'Other'],
		['roleplay', 'Roleplay']
	])
	.registerDefaultCommands({
		help: false,
		ping: false,
		prefix: false,
		commandState: false,
		unknownCommand: false
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	client.logger.info(`[READY] Logged in as ${client.user.tag}! ID: ${client.user.id}`);

	// Interval to change activity every minute
	client.setInterval(() => {
		const activity = client.activities[Math.floor(Math.random() * client.activities.length)];
		const text = typeof activity.text === 'function' ? activity.text() : activity.text;
		client.user.setActivity(text, { type: activity.type });
	}, 60000);
});

client.on('guildCreate', async guild => {
	if (client.blacklist.guild.includes(guild.id) || client.blacklist.user.includes(guild.ownerID)) {
		try {
			await guild.leave();
			return;
		} catch {
			return;
		}
	}
	if (guild.systemChannel && guild.systemChannel.permissionsFor(client.user).has('SEND_MESSAGES')) {
		try {
			const usage = client.registry.commands.get('help').usage();
			await guild.systemChannel.send(`Hi! I'm Shiro, use ${usage} to see my commands, okay?`);
		} catch {
			// Nothing!
		}
	}
});

client.on('disconnect', event => {
	client.logger.error(`[DISCONNECT] Disconnected with code ${event.code}.`);
	process.exit(0);
});

client.on('error', err => client.logger.error(err.stack));

client.on('warn', warn => client.logger.warn(warn));

client.on('commandError', (command, err) => client.logger.error(`[COMMAND:${command.name}]\n${err.stack}`));

client.login(SHIRO_TOKEN);
