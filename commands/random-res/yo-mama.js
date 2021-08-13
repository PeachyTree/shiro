const Command = require('../../structures/Command');
const jokes = require('../../assets/json/yo-mama');

module.exports = class YoMamaCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yo-mama',
			aliases: ['your-mama'],
			group: 'random-response',
			memberName: 'yo-mama',
			description: 'Responds with a random "Yo Mama" joke.'
		});
	}

	run(msg) {
		return msg.say(jokes[Math.floor(Math.random() * jokes.length)]);
	}
};
