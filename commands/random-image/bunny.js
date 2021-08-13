const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class BunnyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bunny',
			aliases: ['rabbit'],
			group: 'random-image',
			memberName: 'bunny',
			description: 'Sends a random image of a bunny.'
		});
	}

	async run(msg) {
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
			return msg.say({ files: [{ attachment: fileToSend, name: `${body.id}.${fileType}` }] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};