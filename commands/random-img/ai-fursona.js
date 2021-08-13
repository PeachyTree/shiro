const Command = require('../../structures/Command');

module.exports = class AiFursonaCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ai-fursona',
			aliases: ['this-fursona-does-not-exist', 'fursona'],
			group: 'random-image',
			memberName: 'ai-fursona',
			description: 'Responds with a randomly generated fursona.',
			clientPermissions: ['ATTACH_FILES']
		});
	}

	run(msg) {
		const num = Math.floor(Math.random() * 100000);
		return msg.say(`AI-Generated Fursona #${num}`, {
			files: [`http://thisfursonadoesnotexist.com/v2/jpgs/seed${num.toString().padStart(5, '0')}.jpg`]
		});
	}
};
