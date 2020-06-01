// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');

class Bans extends Command {
  constructor(client) {
    super(client, {
      name: "fetchbans",
      description: "Checks how many users are banned on the current server.",
      category: "Moderation",
      usage: "c.fetchbans",
      guildOnly: true,
      permLevel: "Moderator"
    });
  }

  async run(message, args, level, settings) {
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`🚫 | I cannot run this command as I have insufficient permissions to do so. Please ensure I have the \"Ban Members\" permission.`);
    message.guild.fetchBans()
    .then(bans => {
      // TODO: change to "user(s)" if multi-locale support is added
      message.channel.send(`This server has **${bans.size}** banned ${bans.size === 1 ? "user" : "users"}.`);
    })
    .catch(error => {
      this.client.logger.error(error);
      return message.channel.send(`🚫 | An error occurred:\n\```${error.message}\````);
    });
  }
}

module.exports = Bans;
