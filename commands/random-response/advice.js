const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class AdviceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'advice',
			group: 'random-response',
			memberName: 'advice',
			description: 'Get some advice!'
		});
	}

	async run(msg) {
		try {
      const res = await request.get('http://api.adviceslip.com/advice');
      let advice = JSON.parse(res.body);
      return msg.say(advice.slip.advice);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};