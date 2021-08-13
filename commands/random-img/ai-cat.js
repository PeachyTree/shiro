const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class AiCatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ai-cat',
			aliases: ['this-cat-does-not-exist', 'ai-neko', 'ai-kitty', 'ai-meow'],
			group: 'random-image',
			memberName: 'ai-cat',
			description: 'Responds with a randomly generated cat.',
			clientPermissions: ['ATTACH_FILES']
		});
	}

	async run(msg) {
		const { body } = await request.get('https://thiscatdoesnotexist.com/');
		return msg.say('AI-Generated Cat', { files: [{ attachment: body, name: 'ai-cat.jpg' }] });
	}
};
