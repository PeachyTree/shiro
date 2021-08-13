const Command = require('../../structures/Command');
const { request } = require('node-superfetch');

module.exports = class LoremIpsumCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'lorem-ipsum',
			aliases: ['placeholder', 'lorem'],
			group: 'random-response',
			memberName: 'lorem-ipsum',
			description: 'Need placeholder text for your website? Look no further.'
		});
	}

	async run(msg) {
		try {
			const { raw } = await request('https://loripsum.net/api')
				.set('Accept', 'text/plain');
			const text = raw.toString();
			return msg.say(text.length >= 2000 ? text.substring(0, 1980) + '... </p>' : text, { code: 'html' });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};