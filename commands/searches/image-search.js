const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { UNSPLASH_ACCESS_KEY } = process.env;

module.exports = class ImageSearchCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'image-search',
			aliases: ['i-search', 'unsplash'],
			group: 'searches',
			memberName: 'image-search',
			description: 'Sends an image based on your query.',
			args: [
				{
					key: 'query',
					prompt: 'What image do you want to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query }) {
		try {
      const page = Math.floor(Math.random() * 5) + 1;
      const index = Math.floor(Math.random() * 10) + 1;
      const meta = { "Authorization": `Client-ID ${UNSPLASH_ACCESS_KEY}` };
      request(`https://api.unsplash.com/search/photos?page=${page}&query=${query}`, { headers: meta })
      .then(res => res.json())
      .then(json => {
        const data = json.results[parseInt(index.toFixed(0))];
        const embed = new MessageEmbed()
          .setTitle("📷 Image")
          .setURL(data.urls.raw)
          .setDescription(`Photo by [${data.user.name}](${data.user.links.html}) on [Unsplash](https://unsplash.com)`)
          .setImage(data.urls.raw)
          .setColor('RANDOM')
          .setTimestamp();
        return msg.embed(embed);
      });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};