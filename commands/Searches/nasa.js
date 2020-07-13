const Command = require('../../base/Command.js');
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const { shorten, embedURL } = require('../../util/Utils');

class Nasa extends Command {
    constructor(client) {
        super(client, {
            name: "nasa",
            description: "Searches NASA's image archive for your query.",
            category: "Searches",
            usage: "nasa <Query>"
        });
    }

    async run(message, args) {
        try {
            const query = args.join(' ');
            if (!word.length) {
                return message.reply("Command Usage: `nasa <Query>`")
            }
			const { body } = await request
				.get('https://images-api.nasa.gov/search')
				.query({
					q: query,
					media_type: 'image'
				});
			const images = body.collection.items;
			if (!images.length) return message.channel.send('Could not find any results.');
			const data = images[Math.floor(Math.random() * images.length)];
			const embed = new MessageEmbed()
				.setTitle(shorten(data.data[0].title, 256))
				.setDescription(shorten(this.cleanHTML(data.data[0].description)))
				.setColor('RANDOM')
				.setAuthor('NASA', 'https://i.imgur.com/Wh8jY9c.png', 'https://www.nasa.gov/multimedia/imagegallery/index.html')
				.setImage(`https://images-assets.nasa.gov/image/${data.data[0].nasa_id}/${data.data[0].nasa_id}~thumb.jpg`)
				.setFooter(`Image Credits: ${data.data[0].center || 'Public Domain'}`)
				.setTimestamp(new Date(data.data[0].date_created));
			return message.channel.send({ embed });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}

	cleanHTML(text) {
		return text
			.replace(/<\/?b>/g, '**')
			.replace(/<\/?i>/g, '*')
			.replace(/<a href="(https?:\/\/[^ ]+)" rel="nofollow">([^<>]+)<\/a>/g, embedURL('$2', '$1'));
	} 
};

module.exports = Nasa;