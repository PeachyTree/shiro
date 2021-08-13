const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class LizardCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'lizard',
			group: 'random-image',
			memberName: 'lizard',
			description: 'Sends a random image of a lizard.'
		});
	}

	async run(msg) {
		try {
      const { body } = await request.get('https://nekos.life/api/v2/img/lizard');
      return msg.say({ files: [body.message] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};