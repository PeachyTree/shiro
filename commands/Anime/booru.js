const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const booru = require('booru');

module.exports = class BooruCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'booru',
			aliases: ['safebooru', 'animepic', 'sfwbooru'],
			group: 'anime',
			memberName: 'booru',
			description: 'Searches for images on Safebooru!',
			details: 'Keep in mind Safebooru\'s definition of safe!',
			args: [
				{
					key: 'query',
					prompt: 'What images do you want to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query }) {
            if (msg.content.toUpperCase().includes('LOLI') 
            || msg.content.toUpperCase().includes('GORE')) return msg.say('That kind of stuff is not allowed! Not even in NSFW channels!');
            try {
            booru.search('safebooru', [query], { limit: 1, random: true })
                .then(booru.commonfy)
                .then(images => {
                    for (let image of images) {
                        const embed = new MessageEmbed()
                            .setAuthor(`Safebooru ${query}`, 'https://c.catgirlsare.sexy/NrAI.png')
                            .setImage(image.common.file_url)
                            .setDescription(`[Image URL](${image.common.file_url})`)
                            .setColor('RANDOM');
                        return msg.embed(embed);
                    }
                });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};