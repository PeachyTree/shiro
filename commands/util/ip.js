const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class IpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ip',
			group: 'bot-owner',
			memberName: 'ip',
			description: 'Responds with the IP address the bot\'s server is running on.',
			guarded: true,
			ownerOnly: true
		});
	}

	async run(msg) {
		const { body } = await request
			.get('https://api.ipify.org/')
			.query({ format: 'json' });
		await msg.direct(body.ip);
		return msg.say('📬 Sent the IP to your DMs!');
	}
};