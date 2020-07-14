const Command = require('../../base/Command.js');

class Bans extends Command {
  constructor(client) {
    super(client, {
      name: "fetch-bans",
      description: "Checks how many users are banned on the current server.",
      category: "Moderation",
      usage: "fetch-bans",
      guildOnly: true,
      permLevel: "Moderator"
    });
  }

  async run(message) {
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`I cannot run this command as I have insufficient permissions to do so. Please ensure I have the \"Ban Members\" permission.`);
    message.guild.fetchBans()
    .then(bans => {
      message.channel.send(`This server has **${bans.size}** banned ${bans.size === 1 ? "user" : "users"}.`);
    })
    .catch(error => {
      this.client.logger.error(error);
      return message.channel.send(`An error occurred:\n\```${error.message}\````);
    });
  }
}

module.exports = Bans;
