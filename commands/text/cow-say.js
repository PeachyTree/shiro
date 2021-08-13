const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class CowSayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cow-say',
			aliases: ['cow'],
			group: 'text',
			memberName: 'cow-say',
			description: 'Sends the same message that you had sent, but with the cow say style.',
			args: [
				{
					key: 'text',
					prompt: 'What do you want the cow to say?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { text }) {
		try {
            const { body } = await request
                .get('http://cowsay.morecode.org/say')
                .query({
                    message: text,
                    format: 'json'
                });
            return msg.code(null, body.cow);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};