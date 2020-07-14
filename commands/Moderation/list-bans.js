const Command = require('../../base/Command.js');

class ListBans extends Command {
  constructor(client) {
    super(client, {
      name: "list-bans",
      description: "DMs you a list of banned users.",
      category: "Moderation",
      usage: "list-bans",
      aliases: ["bans"],
      guildOnly: true,
      permLevel: "Moderator"
    });
  }

  async run(message) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`I cannot run this command as I have insufficient permissions to do so. Please ensure I have the \"Ban Members\" permission.`);

    message.guild.fetchBans()
    .then(bans => {
      const obj = bans.map(b => ({
        user: `${c.username}#${c.discriminator}`
      }));
      const bList = Array.from(obj);
      if (bList.length < 1) return message.author.send(`There are no banned users on **${message.guild.name}**.`);
      let index = 0;

      message.author.send(`__**Ban List for ${message.guild.name}**__\n${bList.map(bl => `**${++index} -** ${bl.user}`).join("\n")}`);
      message.react("✅");
    });
  }
}

module.exports = ListBans;