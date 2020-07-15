const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

class Manga extends Command {
  constructor(client) {
    super(client, {
      name: "manga",
      description: "Searches for a manga with Kitsu.io!",
      category: "Anime",
      usage: "manga <Manga Name>",
    });
  }

  async run(message, args) {
    try {

      let search = args.join(" ");

      if (!search) {
        return message.reply("Command Usage: `manga <Manga Name>`")
      } 

      kitsu.searchManga(search).then(result => {
        if (result.length === 0) {
          return message.channel.send(`No search results found for **${search}**!`);
        }

        let manga = result[0]

        let embed = new MessageEmbed()
          .setColor('RANDOM')
          .setAuthor(`${manga.titles.english}`, manga.posterImage.original)
          .setDescription(manga.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
          .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${manga.titles.romaji}\n\•\u2000\**Age Rating:** ${manga.ageRating ? manga.ageRating : '`N/A`'}\n\•\u2000\**Chapters:** ${manga.chapterCount ? manga.chapterCount : '`N/A`'}`, true)
          .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${manga.averageRating ? manga.averageRating : '`N/A`'}\n\•\u2000\**Rating Rank:** ${manga.ratingRank ? manga.ratingRank : '`N/A`'}\n\•\u2000\**Popularity Rank:** ${manga.popularityRank ? manga.popularityRank : '`N/A`'}`, true)
          .addField('❯\u2000\Status', `•\u2000\**Volumes:** ${manga.volumeCount ? manga.volumeCount : '`N/A`'}\n\•\u2000\**Start Date:** ${manga.startDate}\n\•\u2000\**End Date:** ${manga.endDate ? manga.endDate : "Ongoing"}`, true)
          .setImage(manga.posterImage.original);
        return message.channel.send({ embed });
      })
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
	}
}

module.exports = Manga;