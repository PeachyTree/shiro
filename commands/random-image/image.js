const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class ImageCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'image',
			aliases: ['random-image'],
			group: 'random-image',
			memberName: 'image',
			description: 'Returns a random image.',
			args: [
				{
					key: 'size',
					prompt: 'What size (e.g. 1920x1080) should the image have?',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg) {
		try {  
      const { body } = await request.get(`https://source.unsplash.com/random/${size}`);
      return msg.say({ files: [body.message] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};