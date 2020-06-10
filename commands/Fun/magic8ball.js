// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class Magic8Ball extends Command {
  constructor(client) {
    super(client, {
      name: "magic8ball",
      description: "Consults my magic 8-ball!",
      category: "Fun",
      usage: "magic8ball <Question>",
    });
  }

  async run(message, args, level, settings) { 

    /*
      OUTCOME TYPES:
      Positive: 14
      Neutral:  7
      Negative: 14
    */

    const outcomes = [
      "Yes.", // Positive
      "No.", // Negative
      "Maybe.", // Neutral
      "Most certainly!", // Positive
      "Definitely not.", // Negative
      "Undoubtedly.", // Positive
      "Affirmative.", // Positive
      "Negative.", // Negative
      "No way!", // Negative
      "Only on Saturdays.", // Neutral
      "Hmm...", // Neutral
      "Nahhhhhh", // Negative
      "Certainly not.", // Negative
      "Seems like my magic 8 ball is broken... Try again.",
      "I sure hope so!", // Positive
      "There is a good chance.", // Positive
      "Quite likely.", // Positive
      "I think so.", // Positive
      "I hope not.", // Negative
      "I hope so.", // Positive
      "Possibly.", // Neutral
      "Forget about it.", // Negative
      "http://i.imgur.com/n7A21Jq.gif", // Negative
      "Only on Wednessdays.", // Neutral
      "I highly doubt it.", // Negative
      "My sources say no.", // Negative
      "My sources say yes.", // Positive
      "All signs point to yes.", // Positive
      "Delete this and try again", // neutral
      "Sure.", // positive
      // below sourced from https://en.wikipedia.org/wiki/Magic_8-Ball#Possible_answers
      "Outlook not so good.", // negative
      "Outlook good.", // positive
      // above sourced from https://en.wikipedia.org/wiki/Magic_8-Ball#Possible_answers
      "You may rely on it.", // Positive
      "Don't count on it.", // negative
      "Maybe", // neutral
      "Never.", // negative
      "No. Why would you even ask such a thing?" // Negative
    ];

    if (!args.length) {
      return message.react('🚫'), message.reply("Command Usage: `magic8ball <Question>`")
    }

    if (args[0]) {
      const randomOutcome = outcomes.random();
      try {
        if (randomOutcome.startsWith("http://i.imgur.com/")) {
          const embed = new RichEmbed()
            .setTitle("🎱 | __**Magic 8 Ball says...**__")
            .setImage(randomOutcome)
            .setColor('RANDOM')
            .setFooter(`Question asked by ${message.author.tag}`, message.author.displayAvatarURL);
          message.channel.send({ embed });
        } else {
          const embed = new RichEmbed()
            .setTitle(`🎱 | __**Magic 8 Ball says...**__`)
            .setColor('RANDOM')
            .setDescription(`**${randomOutcome}**`)
            .setFooter(`Question asked by ${message.author.tag}`, message.author.displayAvatarURL);
          message.channel.send({ embed });
        }
      } catch (error) {
        this.client.logger.error(error);
        message.channel.send(`🚫 | My Magic 8 Ball says: An error occurred:\n\```${error.message}\````);
      }
    }
  }
}

module.exports = Magic8Ball;
