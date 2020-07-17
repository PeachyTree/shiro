const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const line = require('../../assets/json/pickuplines.json');

class PickUpLine extends Command {
  constructor(client) {
    super(client, {
      name: "pickupline",
      description: "Get a random pick up line!",
      category: "Random Response",
      usage: "pickupline",
      aliases: ["pickup"]
    });
  }

  async run(message) {
    const embed = new MessageEmbed()
      .setTitle('__**Your pickupline:**__')
      .setDescription(`💖 | ${line[Math.round(Math.random() * (line.length - 1))]}`)
      .setColor('RANDOM');
    return message.channel.send({ embed });
  }
}

module.exports = PickUpLine;