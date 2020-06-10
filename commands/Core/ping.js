// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
require("moment-duration-format");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Shows the bot latency and gives it a rating.",
      category: "Core",
      usage: "ping"
    });
  } 

  async run(message, args, level, settings) { 
    const pingMsg = await message.channel.send("Ping?");
    const embed = new RichEmbed()
      .setTitle("__**Ping!**__")
      .setColor('RANDOM')
      .addField(':ping_pong: **Ping (Bot)**', `${pingMsg.createdTimestamp - message.createdTimestamp}ms`, true)
      .addField(':satellite: **Ping (API)**', `${Math.round(this.client.ping)}ms`, true)
      .setTimestamp()
    pingMsg.edit({ embed });
  }
}

module.exports = Ping;
