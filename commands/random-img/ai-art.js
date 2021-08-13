const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class AiArtworkCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ai-artwork',
			aliases: ['this-artwork-does-not-exist', 'art', 'artwork', 'ai-art', 'this-art-does-not-exist'],
			group: 'random-image',
			memberName: 'ai-artwork',
			description: 'Responds with randomly generated artwork.',
			clientPermissions: ['ATTACH_FILES']
		});
	}

	async run(msg) {
		const { body } = await request.get('https://thisartworkdoesnotexist.com/');
		return msg.say('AI-Generated Artwork', { files: [{ attachment: body, name: 'ai-artwork.jpg' }] });
	}
};
