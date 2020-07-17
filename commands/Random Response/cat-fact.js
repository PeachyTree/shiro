const Command = require('../../base/Command.js');
const catFacts = require('../../assets/json/cat-fact.json');
const { MessageEmbed } = require('discord.js');

class CatFact extends Command {
  constructor(client) {
    super(client, {
      name: "cat-fact",
      description: "Shows a random fact about cats.",
      category: "Random Response",
      usage: "cat-fact"
    });
  }

  async run(message) { 

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle('🐱 | __**Cat Fact**__')
      .setDescription(catFacts[Math.round(Math.random() * (catFacts.length - 1))])
    message.channel.send({ embed });
  };
};

module.exports = CatFact;
