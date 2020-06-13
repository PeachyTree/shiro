// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');

class Prefix extends Command {
  constructor(client) {
    super(client, {
      name: "prefix",
      description: "Returns the command prefix for the current server.",
      category: "Misc",
      usage: "prefix",
      guildOnly: true
    });
  }

  async run(message, args, level, settings) { 
    message.channel.send(`My prefix here on ${message.guild.name} is "**${settings.prefix}**".\nTo change my prefix, do \`${settings.prefix}set edit prefix <New Prefix>\`.`);
  }
}

module.exports = Prefix;
