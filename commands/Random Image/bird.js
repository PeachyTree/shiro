const Command = require("../../base/Command.js");
const request = require('node-superfetch');

class Bird extends Command {
  	constructor(client) {
    	super(client, {
			name: "bird",
			description: "Sends a random image of a bird.",
			category: "Random Image",
			usage: "bird"
    	});
  	}

	async run(message) {
		try {
			const { body } = await request
			.get('https://shibe.online/api/birds')
			.query({
				count: 1,
				urls: true,
				httpsUrls: true
			});
			return message.channel.send({ files: [body[0]] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};

module.exports = Bird;
