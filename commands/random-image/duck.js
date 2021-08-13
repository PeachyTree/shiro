const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class DuckCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'duck',
			group: 'random-image',
			memberName: 'duck',
			description: 'Sends a random image of a duck.'
		});
	}

	async run(msg) {
		try {
			const { body } = await request.get('https://random-d.uk/api/v1/random');
			return msg.say({ files: [body.url] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};