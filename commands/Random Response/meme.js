const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const subreddits = require("../../assets/json/meme");

class Meme extends Command {
  constructor(client) {
    super(client, {
      name: "meme",
      description: "Searches for a random meme from selected subreddits!\nWarning: There is no NSFW filter on this!",
      category: "Random Response",
      usage: "meme",
    });
  }

  async run(message) {
    try {
      let randSubreddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

      randomPuppy(randSubreddit)
      .then(url => {
        const embed = new MessageEmbed()
          .setFooter(`${randSubreddit}`)
          .setDescription(`[Image URL](${url})`)
          .setImage(url)
          .setColor('RANDOM');
        return message.channel.send({ embed });
      })
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Meme;