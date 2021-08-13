const Command = require('../../structures/Command');
const fetch = require('node-superfetch');
const { URLSearchParams } = require('url');
const { GIPHY_API_KEY } = process.env;

module.exports = class GiphyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'giphy',
			aliases: ['gif'],
			group: 'searches',
			memberName: 'giphy',
			description: 'Returns a GIF from Giphy based on your query.',
			args: [
				{
					key: 'query',
					prompt: 'What gif do you want to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query }) {
		try {      
      const url = "http://api.giphy.com/v1/gifs/search?";
      const params = new URLSearchParams({
        q: query,
        api_key: GIPHY_API_KEY,
        rating: "pg"
      });
      fetch(url + params)
      .then(res => res.json())
      .then(json => msg.say(json.data.random().images.original.url));
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};