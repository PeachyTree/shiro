const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const outcomes = require("../../assets/json/magic8ball");

class Magic8Ball extends Command {
  constructor(client) {
    super(client, {
      name: "magic8ball",
      description: "Consults my magic 8-ball!",
      category: "Random Response",
      usage: "magic8ball <Question>",
      aliases: ["8ball"]
    });
  }

  async run(message, args) { 

    /*
      OUTCOME TYPES:
      Positive: 14
      Neutral:  7
      Negative: 14
    */
    try {
      if (!args.length) {
        return message.reply("Command Usage: `magic8ball <Question>`")
      }

      if (args[0]) {
        const randomOutcome = outcomes.random();
        if (randomOutcome.startsWith("http://i.imgur.com/")) {
          const embed = new MessageEmbed()
            .setTitle("🎱 | __**Magic 8 Ball says...**__")
            .setImage(randomOutcome)
            .setColor('RANDOM')
            .setFooter(`Question asked by ${message.author.tag}`, message.author.displayAvatarURL);
          message.channel.send({ embed });
        } else {
          const embed = new MessageEmbed()
            .setTitle(`🎱 | __**Magic 8 Ball says...**__`)
            .setColor('RANDOM')
            .setDescription(`**${randomOutcome}**`)
            .setFooter(`Question asked by ${message.author.tag}`, message.author.displayAvatarURL);
          message.channel.send({ embed });
        }
      }
    } catch (err) {
      return message.reply(`Oh no, my magic 8 Ball says: \`${err.message}\`.`);
    }
  }
}

module.exports = Magic8Ball;
