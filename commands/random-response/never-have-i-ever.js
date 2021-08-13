const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class NeverHaveIEverCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'never-have-i-ever',
			aliases: ['never-have-i', 'never-have', 'never-ever'],
			group: 'random-response',
			memberName: 'never-have-i-ever',
			description: 'Responds with a random \'Never Have I Ever..\' statement.'
		});
	}

	async run(msg) {
		try {
      const { text } = await request.get('http://www.neverhaveiever.org/randomtext.php');
      return msg.say(text.match(/<h1>(.+)<\/h1>/i)[1].replace(/<\/br>/g, ''));
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};