const Command = require('../../structures/Command');
const Leet = require('../../structures/Leet');

module.exports = class LeetCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leet',
			aliases: ['l33t', 'leet-speak', 'l33t-speak', '1337', '1337-speak'],
			group: 'text',
			memberName: 'leet',
			description: 'Converts text to l33t speak.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to l33t speak?',
					type: 'string',
					max: 500
				}
			]
		});
	}

	run(msg, { text }) {
		const leet = new Leet(text);
		return msg.say(leet.toLeet());
	}
};
