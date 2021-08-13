const Command = require('../../structures/Command');
const request = require('node-superfetch');
const facts = require('../../assets/json/cat-fact');
const { THECATAPI_KEY } = process.env;

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			aliases: ['neko', 'kitty', 'meow', 'cat-fact', 'neko-fact', 'kitty-fact', 'meow-fact'],
			group: 'random-image',
			memberName: 'cat',
			description: 'Responds with a random cat image and fact.',
			clientPermissions: ['ATTACH_FILES']
		});
	}

	async run(msg) {
		try {
			const { body } = await request
				.get('https://api.thecatapi.com/v1/images/search')
				.query({
					limit: 1,
					mime_types: 'jpg,png'
				})
				.set({ 'x-api-key': THECATAPI_KEY });
			return msg.say(facts[Math.floor(Math.random() * facts.length)], { files: [body[0].url] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
