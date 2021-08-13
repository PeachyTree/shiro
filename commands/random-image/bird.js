const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class BirdCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bird',
			group: 'random-image',
			memberName: 'bird',
			description: 'Sends a random image of a bird.'
		});
	}

	async run(msg) {
		try {
			const { body } = await request
				.get('https://shibe.online/api/birds')
				.query({
					count: 1,
					urls: true,
					httpsUrls: true
				});
			return msg.say({ files: [body[0]] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};