const Command = require('../../structures/Command');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			aliases: ['echo', 'copy'],
			group: 'text',
			memberName: 'say',
			description: 'Lets me say something for you. Useful for example to create rules or help pages.',
			args: [
				{
					key: 'text',
					prompt: 'What do you want me to say?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
    msg.delete().catch();
    return msg.say(text);
	}
};