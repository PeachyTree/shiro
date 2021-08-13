const Command = require('../../structures/Command');
const request = require('node-superfetch');
const { THECATAPI_KEY } = process.env;

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			aliases: ['kitty', 'meow'],
			group: 'random-image',
			memberName: 'cat',
			description: 'Sends a random image of a cat.'
		});
	}

	async run(msg) {
		try {
      const { body } = await request
        .get('https://api.thecatapi.com/v1/images/search')
        .query({
          limit: 1,
          mime_types: 'jpg,png'
        })
        .set({ 'x-api-key': THECATAPI_KEY });
      return msg.say({ files: [body[0].url] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};