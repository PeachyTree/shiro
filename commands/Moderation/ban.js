// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      description: "Bans the mentioned user from the server.",
      category: "Moderation",
      usage: "ban <@USER_MENTION> <Reason>",
      guildOnly: true,
      permLevel: "Administrator"
    });
  }

  async run(message, args, level, settings) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);

    const user = message.mentions.users.first();
    let reason = args.slice(1).join(" ") || undefined;

    if (!user) return message.react('🚫'), message.reply("Command Usage: `ban <@USER_MENTION> <Reason>`")
    if (user === message.author) return message.channel.send(`🚫 | You cannot do that to yourself, silly`);
    if (message.guild.member(message.author).highestRole.position <= message.guild.member(user).highestRole.position) return message.channel.send("🚫 | You cannot ban this user as they have a higher role than you.");
    if (!reason) {
      message.channel.send('Please enter a reason for this action...\nThis text-entry period will time-out in 30 seconds. Reply with `cancel` to exit.');
      await message.channel.awaitMessages(m => m.author.id === message.author.id, {
        "errors": ["time"],
        "max": 1,
        time: 30000
      }).then(resp => {
        if (!resp) return message.channel.send('Timed out.');
        resp = resp.array()[0];
        if (resp.content.toLowerCase() === "cancel") return message.channel.send('Cancelled!');
        reason = resp.content;
        if (resp) resp.react("✅");
      }).catch(() => {
        message.channel.send('Timed out.');
      });
    }

    if (reason) {
      try {
        if (!message.guild.member(user).bannable) return message.channel.send("🚫 | I cannot ban that user from this server!\nThis may be because I do not have the required permissions to do so, or they may be the server owner.");
        try {
          message.guild.member(user).ban(`${reason} (Issued by ${message.author.tag})`);
          message.react("✅");
        } catch (error) {
          return message.channel.send(`🚫 | An error occurred:\n\```${error.message}\````);
        }

        const lastMessage = message.guild.member(user).lastMessageID;

        const embed = new RichEmbed()
          .setTitle(`🚫 | __**Member banned from ${message.guild.name}**__`)
          .setColor('RANDOM')
          .addField('Target:', `${user.tag} (${user.id})`)
          .addField('Issued by:', `${message.author.tag} (${message.author.id})`)
          .addField('Reason:', `${reason}`)
          .addField('Duration:', `Permanent`)
          .addField('Last message:', `${lastMessage}`)
          .setFooter('Moderation system powered by Celestia <3', this.client.user.displayAvatarURL)
          .setTimestamp();
        message.channel.send({ embed });

      } catch (error) {
        this.client.logger.error(error);
        return message.channel.send(`🚫 | An error occurred:\n\```${error.message}\````);
      }
    }
  }
}

module.exports = Ban;