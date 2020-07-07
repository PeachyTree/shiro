const Command = require('../../base/Command.js');
const catFacts = require('../../assets/json/catfacts.json');
const { MessageEmbed } = require('discord.js');

class CatFact extends Command {
  constructor(client) {
    super(client, {
      name: "catfact",
      description: "Shows a random fact about cats.",
      category: "Fun",
      usage: "catfact"
    });
  }

  async run(message, args, level, settings) { 

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle('🐱 | __**Cat Fact**__')
      .setDescription(catFacts[Math.round(Math.random() * (catFacts.length - 1))])
    message.channel.send({ embed });
  };
};

module.exports = CatFact;
