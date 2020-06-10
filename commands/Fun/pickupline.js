// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const line = require('../../assets/json/pickuplines.json');

class PickUpLine extends Command {
  constructor(client) {
    super(client, {
      name: "pickupline",
      description: "Get a random pick up line!",
      category: "Fun",
      usage: "pickupline",
      aliases: ["pickup"]
    });
  }

  async run(message, args, level, settings) {
    const embed = new RichEmbed()
      .setTitle('__**Your pickupline:**__')
      .setDescription(`💖 | ${line[Math.round(Math.random() * (line.length - 1))]}`)
      .setColor('RANDOM');
    return message.channel.send({ embed });
  }
}

module.exports = PickUpLine;