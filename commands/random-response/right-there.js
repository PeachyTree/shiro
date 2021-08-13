const Command = require('../../structures/Command');
const rightThere = require('../../assets/json/rightthere');

module.exports = class RightThereCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'right-there',
			aliases: ['r-there'],
			group: 'random-response',
			memberName: 'right-there',
			description: 'Sends a random right there copypasta! May include NSFW language and elements or considered as spam.'
		});
	}

	run(msg) {
		return msg.say(`${rightThere[Math.round(Math.random() * (rightThere.length - 1))]}`);
	}
};