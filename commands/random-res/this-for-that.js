const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class ThisForThatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'this-for-that',
			aliases: ['its-this-for-that'],
			group: 'random-response',
			memberName: 'this-for-that',
			description: 'So, basically, it\'s like a bot command for this dumb meme.'
		});
	}

	async run(msg) {
		try {
			const { text } = await request.get('http://itsthisforthat.com/api.php?json');
			const body = JSON.parse(text);
			return msg.say(`So, basically, it's like a ${body.this} for ${body.that}.`);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
