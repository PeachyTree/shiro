const Command = require("../../base/Command.js");
const request = require('node-superfetch');

class Bunny extends Command {
	constructor(client) {
    	super(client, {
			name: "bunny",
			description: "Sends a random image of a bunny.",
			category: "Random Image",
			usage: "bunny"
    	});
  	}

	async run(message) {
		try {
			const { body } = await request
			.get('https://api.bunnies.io/v2/loop/random/')
			.query({ media: 'gif,png' });
			let fileToSend;
			let fileType = 'gif';
			const gif = await request.get(body.media.gif);
			if (Buffer.byteLength(gif.body) > 8e+6) {
				const poster = await request.get(body.media.poster);
				fileToSend = poster.body;
				fileType = 'png';
			} else {
				fileToSend = gif.body;
			}
			return message.channel.send({ files: [{ attachment: fileToSend, name: `${body.id}.${fileType}` }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};

module.exports = Bunny;
