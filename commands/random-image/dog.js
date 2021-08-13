const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class DogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dog',
			aliases: ['puppy'],
			group: 'random-image',
			memberName: 'dog',
			description: 'Sends a random image of a dog.'
		});
	}

	async run(msg) {
		try {
      const { body } = await request.get('https://dog.ceo/api/breeds/image/random');
      return msg.say({ files: [body.message] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};