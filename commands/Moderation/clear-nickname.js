const Command = require('../../base/Command.js');

class ClearNickname extends Command {
  constructor(client) {
    super(client, {
      name: "clear-nickname",
      description: "Clears a user's nickname.",
      category: "Moderation",
      usage: "clear-nickname <@USER_MENTION>",
      permLevel: "Moderator",
      guildOnly: true,
      aliases: ["cn"]
    });
  }

  async run(message) { 
    const user = message.mentions.users.first();
    if (!user) return message.reply("Command Usage: `clear-nickname <@USER_MENTION>`");
    const nick = message.guild.member(user).nickname;
    if (!nick) return message.channel.send("The mentioned user does not currently have a nickname.");
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I cannot change any nicknames, as I do not have the \"Manage Nicknames\" permission.");
    if (message.guild.member(user).highestRole.position >= message.guild.me.highestRole.position) return message.channel.send("I do not have permission to change this user's nickname.");

    message.guild.member(user).setNickname("", "Clearing bad nickname")
    .catch(error => {
      if (error.message === "Privilege is too low...") {
        return message.channel.send("I do not have permission to change this user's nickname.");
      } else {
        this.client.logger.error(error);
        return message.channel.send(`An error occurred:\n\```${error.message}\````);
      }
    });
  }
}

module.exports = ClearNickname;