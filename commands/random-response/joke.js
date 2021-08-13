const Command = require('../../structures/Command');
const fetch = require('node-superfetch');

module.exports = class JokeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'joke',
			group: 'random-response',
			memberName: 'joke',
			description: 'Tells a general or programming-related joke.'
		});
	}

	async run(msg) {
		try {
      fetch("https://official-joke-api.appspot.com/random_joke")
      .then(res => res.json())
      .then(data => msg.say(`${data.setup} ${data.punchline}`));
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};