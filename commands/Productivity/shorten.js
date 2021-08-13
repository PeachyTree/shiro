const Command = require('../../structures/Command');
const request = require('node-superfetch');
const { BITLY_KEY } = process.env;

module.exports = class ShortenCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'shorten',
			aliases: ['shorten-url', 'bit-ly'],
			group: 'productivity',
			memberName: 'shorten',
			description: 'Shortens the specified link.',
			args: [
				{
					key: 'url',
					prompt: 'What URL do you want to shorten?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { url }) {
		try {
      const { body } = await request
        .post('https://api-ssl.bitly.com/v4/shorten')
        .send({ long_url: url })
        .set({ Authorization: `Bearer ${BITLY_KEY}` });
      return msg.say(body.link);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};