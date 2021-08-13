const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten, embedURL } = require('../../util/Util');

module.exports = class NasaCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'nasa',
			group: 'searches',
			memberName: 'nasa',
			description: 'Searches NASA\'s image archive for your query.',
			args: [
				{
					key: 'query',
					prompt: 'What do you want to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query }) {
		try {
			const { body } = await request
				.get('https://images-api.nasa.gov/search')
				.query({
					q: query,
					media_type: 'image'
				});
			const images = body.collection.items;
			if (!images.length) return msg.say('Could not find any results.');
			const data = images[Math.floor(Math.random() * images.length)];
			const embed = new MessageEmbed()
				.setTitle(shorten(data.data[0].title, 256))
				.setDescription(shorten(this.cleanHTML(data.data[0].description)))
				.setColor('RANDOM')
				.setAuthor('NASA', 'https://i.imgur.com/Wh8jY9c.png', 'https://www.nasa.gov/multimedia/imagegallery/index.html')
				.setImage(`https://images-assets.nasa.gov/image/${data.data[0].nasa_id}/${data.data[0].nasa_id}~thumb.jpg`)
				.setFooter(`Image Credits: ${data.data[0].center || 'Public Domain'}`)
				.setTimestamp(new Date(data.data[0].date_created));
			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}

	cleanHTML(text) {
		return text
			.replace(/<\/?b>/g, '**')
			.replace(/<\/?i>/g, '*')
			.replace(/<a href="(https?:\/\/[^ ]+)" rel="nofollow">([^<>]+)<\/a>/g, embedURL('$2', '$1'));
	} 
};