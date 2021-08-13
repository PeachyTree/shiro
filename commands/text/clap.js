const Command = require('../../structures/Command');

module.exports = class ClapCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clap',
			group: 'text',
			memberName: 'clap',
			description: 'Sends the same message that you had sent, but replaced with clap emojis.',
			args: [
				{
					key: 'text',
					prompt: 'What text do you want to convert into clap emojis?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
        return msg.say(text.replace(/ /g, ' 👏 '));
	}
};