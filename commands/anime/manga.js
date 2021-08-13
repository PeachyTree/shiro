const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports = class MangaCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'manga',
			aliases: ['light-novel'],
			group: 'anime',
			memberName: 'manga',
			description: 'Searches for a manga with Kitsu.io!',
			args: [
				{
					key: 'search',
					prompt: 'What manga do you want to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { search }) {
		try {
      kitsu.searchManga(search).then(result => {
        if (result.length === 0) {
          return msg.say(`No search results found for **${search}**!`);
        }
        let manga = result[0];
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setAuthor(`${manga.titles.english}`, manga.posterImage.original)
          .setDescription(manga.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
          .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${manga.titles.romaji}\n\•\u2000\**Age Rating:** ${manga.ageRating ? manga.ageRating : '`N/A`'}\n\•\u2000\**Chapters:** ${manga.chapterCount ? manga.chapterCount : '`N/A`'}`, true)
          .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${manga.averageRating ? manga.averageRating : '`N/A`'}\n\•\u2000\**Rating Rank:** ${manga.ratingRank ? manga.ratingRank : '`N/A`'}\n\•\u2000\**Popularity Rank:** ${manga.popularityRank ? manga.popularityRank : '`N/A`'}`, true)
          .addField('❯\u2000\Status', `•\u2000\**Volumes:** ${manga.volumeCount ? manga.volumeCount : '`N/A`'}\n\•\u2000\**Start Date:** ${manga.startDate}\n\•\u2000\**End Date:** ${manga.endDate ? manga.endDate : "Ongoing"}`, true)
          .setImage(manga.posterImage.original);
        return msg.embed(embed);
      });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
		}
	}
};