const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class FoxCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fox',
			group: 'random-image',
			memberName: 'fox',
			description: 'Responds with a random fox image.',
			clientPermissions: ['ATTACH_FILES']
		});
	}

	async run(msg) {
		try {
			const { body } = await request.get('https://randomfox.ca/floof/');
			return msg.say({ files: [body.image] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
