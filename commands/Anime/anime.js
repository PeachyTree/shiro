const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const aq = require('animequote');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports = class AnimeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'anime',
			aliases: ['kitsu'],
			group: 'anime',
			memberName: 'anime',
			description: 'Searches for an anime on Kitsu.io!',
			details: 'If no anime name is given, it gives you a random suggestion!',
			args: [
				{
					key: 'search',
					prompt: 'What anime do you want to search for?',
					type: 'string',
                    default: ''
				}
			]
		});
	}

	async run(msg, { search }) {
        try {
            if (!search) {
                kitsu.searchAnime(aq().quoteanime).then(result => {
                    let anime = result[0];
                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setAuthor(`${anime.titles.english} | ${anime.showType}`, anime.posterImage.original)
                        .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                        .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                        .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                        .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
                        .setImage(anime.posterImage.original);
                    return msg.say(`📺 | Try watching **${anime.titles.english}**!`, { embed });
                });
            } else {
                kitsu.searchAnime(search).then(result => {
                    if (result.length === 0) {
                        return msg.say(`No search results found for **${search}**!`);
                    }
                    let anime = result[0];
                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
                        .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                        .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                        .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                        .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
                        .setImage(anime.posterImage.original);
                    return msg.embed(embed);
                });
            }
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }
};