const Command = require('../../structures/Command');
const words = require('../../assets/json/word-list');

module.exports = class WordCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'word',
			aliases: ['random-word'],
			group: 'random-response',
			memberName: 'word',
			description: 'Responds with a random word.'
		});
	}

	run(msg) {
		const word = words[Math.floor(Math.random() * words.length)];
		return msg.reply(word.toLowerCase());
	}
};
