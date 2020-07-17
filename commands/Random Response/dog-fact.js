const Command = require('../../base/Command.js');
const dogFacts = require('../../assets/json/dog-fact.json');
const { MessageEmbed } = require('discord.js');

class DogFact extends Command {
  constructor(client) {
    super(client, {
      name: "dog-fact",
      description: "Shows a random fact about dogs.",
      category: "Random Response",
      usage: "dog-fact",
      aliases: ["puppy-fact"]
    });
  }

  async run(message) { 

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle('🐶 | __**Dog Fact**__')
      .setDescription(dogFacts[Math.round(Math.random() * (dogFacts.length - 1))])
    message.channel.send({ embed });
  };
};

module.exports = DogFact;