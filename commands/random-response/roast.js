const Command = require('../../structures/Command');
const roasts = require('../../assets/json/roast');

module.exports = class RoastCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'roast',
			group: 'random-response',
			memberName: 'roast',
			description: 'Roasts a user.',
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to roast?',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
    return msg.say(`${user.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
	}
};