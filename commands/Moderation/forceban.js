// Copyright (c) 2020 Azura Apple. All rights reserved. MIT license.

const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class ForceBan extends Command {
  constructor(client) {
    super(client, {
      name: "forceban",
      description: "Bans a user, even if they aren't in your server.",
      category: "Moderation",
      usage: "c.forceban <USER_ID> <Reason>",
      guildOnly: true,
      permLevel: "Administrator"
    });
  }

  async run(message, args, level, settings) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    
    const userID = args[0];
    const reason = args.slice(1).join(" ");

    if (!userID || !reason) return message.react('🚫'), message.reply("Command Usage: `forceban <@USER_ID> <Reason>`");
    if (userID === message.author.id) return message.channel.send("🚫 | You cannot ban yourself.");

    message.guild.ban(userID, { reason: reason })
      .catch(error => {
        this.client.logger.error(error);
        return message.channel.send(`🚫 | An error occurred:\n\```${error.message}\````);
      });

    const embed = new RichEmbed()
      .setTitle(`🚫 | __**Member force-banned from ${message.guild.name}**__`)
      .setColor('RANDOM')
      .addField('Target:', `${userID}`)
      .addField('Issued by:', `${message.author.tag} (${message.author.id})`)
      .addField('Reason:', `${reason}`)
      .setFooter('Moderation system powered by Celestia <3', this.client.user.displayAvatarURL)
      .setTimestamp();
    message.channel.send({ embed });
  }
}

module.exports = ForceBan;