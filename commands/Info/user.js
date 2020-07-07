const Command = require("../../base/Command.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const moment = require("moment");

class User extends Command {
  constructor(client) {
    super(client, {
      name: "user",
      description: "Displays information about the mentioned user.",
      category: "Info",
      usage: "user [@USER_MENTION]",
      aliases: ["userinfo", "whois"],
      guildOnly: true
    });
  }

  async run(message) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
  
    const user = message.mentions.users.first() || message.author;

    let status;
    if (user.presence.status.toProperCase() === "Dnd") {
      status = "Do Not Disturb";
    } else {
      status = user.presence.status.toProperCase();
    }

    let activity = "";

    if (!user.presence.game) {
      activity = "Nothing";
    }

    if (user.presence.game) {
      activity = `Playing **${user.presence.game ? user.presence.game.name : "Nothing"}**`;
    }

    if (user.presence.game.name === "Spotify") {
      activity = "Listening to **Spotify**";
    }

    const embed = new MessageEmbed()
      .setColor(message.guild.member(user).displayColor)
      .setThumbnail(user.displayAvatarURL)
      .setTitle(`User Information for ${user.tag}`)
      .setDescription(`**User ID**: ${user.id}`)
      
      .addField("❯ Details", stripIndents`
      • Status: **${status}**
      • Activity: ${activity}
      ‍   
      `, true)

      .addField("❯ Roles", stripIndents`
      • Highest: **\`${message.guild.member(user).highestRole.name}\`**
      • All: ${message.guild.member(user).roles.map(roles => `\`${roles.name}\``).slice(1).join(", ")}
      ‍   
      `, true)

      .addField("❯ Join Dates", stripIndents`
      • ${message.guild.name}: **${moment.utc(message.guild.member(user).joinedAt).format("dddd, Do MMMM YYYY @ HH:mm:ss")}**
      • Discord: **${moment.utc(user.createdAt).format("dddd, Do MMMM YYYY @ HH:mm:ss")}**
      `, true)
    message.channel.send({ embed });
  }
}

module.exports = User;