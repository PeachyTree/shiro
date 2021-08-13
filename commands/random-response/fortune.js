const Command = require('../../structures/Command');
const fortune = require('../../assets/json/fortune.json');

module.exports = class FortuneCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fortune',
			group: 'random-response',
			memberName: 'fortune',
			description: 'Get a fortune!'
		});
	}

	async run(msg) {
		return  msg.say(`🔮 | ${fortune[Math.round(Math.random() * (fortune.length - 1))]}`);
	}
};