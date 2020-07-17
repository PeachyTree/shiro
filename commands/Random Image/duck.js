const Command = require("../../base/Command.js");
const request = require('node-superfetch');

class Duck extends Command {
  	constructor(client) {
    	super(client, {
			name: "duck",
			description: "Sends a random image of a duck.",
			category: "Random Image",
			usage: "duck"
    	});
  	}

	async run(message) {
		const { body } = await request.get('https://random-d.uk/api/v1/random');
		return message.channel.send({ files: [body.url] });
	}
};

module.exports = Duck;
