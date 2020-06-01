// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class Warn extends Command {
  constructor(client) {
    super(client, {
      name: "warn",
      description: "Issues a warning to the specified user.",
      category: "Moderation",
      usage: "c.warn <@USER_MENTION> <Reason>",
      guildOnly: true,
      permLevel: "Moderator"
    });
  }

  async run(message, args, level, settings) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    if (!message.guild.me.permissions.has(["EMBED_LINKS", "ADD_REACTIONS"])) return message.channel.send(`🚫 | I cannot run this command as I have insufficient permissions to do so. Please ensure I have the \"Embed Links\" & \"Add Reactions\" permissions.`);

    const user = message.mentions.users.first();
    let reason = args.slice(1).join(" ") || undefined;
    
    if (!user) return message.react('🚫'), message.reply('Command Usage: `warn <@USER_MENTION> <Reason>`');
    if (message.guild.member(message.author).highestRole.position <= message.guild.member(user).highestRole.position) return message.channel.send("🚫 | You cannot warn this user as they have the same role or a higher role than you.");
    if (!reason) {
      message.channel.send('Please enter a reason for the warning...\nThis text-entry period will time-out in 30 seconds. Reply with `cancel` to exit.');
      await message.channel.awaitMessages(m => m.author.id === message.author.id, {
        "errors": ["time"],
        "max": 1,
        time: 30000
      }).then(resp => {
        if (!resp) return message.channel.send("Timed out. The user has not been warned.");
        resp = resp.array()[0];
        if (resp.content.toLowerCase() === "cancel") return message.channel.send("Cancelled. The user has not been warned.");
        reason = resp.content;
        if (resp) resp.react("✅");
      }).catch(() => {
        message.channel.send("Timed out. The user has not been warned.");
      });
    }

    if (reason) {
      try {
        const embed = new RichEmbed()
          .setTitle(`⚠️ | __**Warning issued in #${message.channel.name}**__`)
          .setColor('RANDOM')
          .addField('Issued to:', `${user.tag} (${user.id})`)
          .addField('Issued by:', `${message.author.tag} (${message.author.id})`)
          .addField('Reason:', `${reason}`)
          .setFooter('Moderation system powered by Celestia <3', this.client.user.displayAvatarURL)
          .setTimestamp();
        message.channel.send({ embed });

        if (!user.bot) user.send(`Hiya,\nYou were warned in **${message.guild.name}** for the reason "**${reason}**".\nPlease make sure you always follow the rules, because not doing so can lead to punishments and no one wants that! :(`);

        message.react("✅");
      } catch (error) {
        this.client.logger.error(error);
        return message.channel.send(`🚫 | An error occurred:\n\```${error.message}\````);
      }
    }
  }
}

module.exports = Warn;
