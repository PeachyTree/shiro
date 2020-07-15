const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const booru = require('booru');

class Booru extends Command {
  constructor(client) {
    super(client, {
      name: "booru",
      description: "Searches for images on Safebooru! Keep in mind Safebooru's definition of safe!",
      category: "Anime",
      usage: "booru <Query>",
      aliases: ["safebooru", "animepic", "sfwbooru"]
    });
  }

    async run(message, args) {
        try {
            if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');

            let query = args.join(" ");

            if (!query) {
                return message.reply("Command Usage: `booru <Query>`")
            } else {

            booru.search('safebooru', [query], { limit: 1, random: true })
                .then(booru.commonfy)
                .then(images => {
                    for (let image of images) {
                        const embed = new MessageEmbed()
                            .setAuthor(`Safebooru ${query}`, 'https://c.catgirlsare.sexy/NrAI.png')
                            .setImage(image.common.file_url)
                            .setDescription(`[Image URL](${image.common.file_url})`)
                            .setColor('RANDOM');
                        return message.channel.send({ embed });
                    }
                })
            }
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }
}

module.exports = Booru;