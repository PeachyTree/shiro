const Command = require('../../structures/Command');
const tsun = require('../../assets/json/tsundere');

module.exports = class TsundereCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tsundere',
			aliases: ['tsun'],
			group: 'random-response',
			memberName: 'tsundere',
			description: 'Get a random tsundere quote!'
		});
	}

	run(msg) {
		return msg.say(tsun[Math.round(Math.random() * (tsun.length - 1))]);
	}
};