const Command = require('../../structures/Command');
const texts = require('../../assets/json/shutdown');

module.exports = class ShutdownCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'shutdown',
			aliases: ['die', 'restart', 'reboot'],
			group: 'bot-owner',
			memberName: 'shutdown',
			description: 'Shuts down the bot.',
			guarded: true,
			ownerOnly: true,
			args: [
				{
					key: 'code',
					prompt: 'What code do you want to send to `process.exit`?',
					type: 'integer',
					default: 0
				}
			]
		});
	}

	async run(msg, { code }) {
		try {
			this.client.logger.info('[SHUTDOWN] Manual shutdown engaged.');
			const text = texts[Math.floor(Math.random() * texts.length)];
			await msg.say(text);
			process.exit(code);
			return null;
		} catch {
			process.exit(code);
			return null;
		}
	}
};