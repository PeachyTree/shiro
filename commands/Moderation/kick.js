const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { KICK_EMOJI_ID } = process.env;

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      description: "Kicks the mentioned user from the server.",
      category: "Moderation",
      usage: "kick <@USER_MENTION> <Reason>",
      guildOnly: true,
      permLevel: "Moderator"
    });
  }
  
  async run(message, args) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    
    const user = message.mentions.users.first();
    let reason = args.slice(1).join(" ") || undefined;
    
    if (!user) return message.reply('Command Usage: `kick <@USER_MENTION> <Reason>`');
    if (user === message.author) return message.channel.send(`You cannot do that to yourself, silly`);
    if (message.guild.member(message.author).highestRole.position <= message.guild.member(user).highestRole.position) return message.channel.send("You cannot ban this user as they have a higher role than you.");
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
      }).catch(error => {
        this.client.logger.error(error);
        message.channel.send('Timed out.');
      });
    }

    if (reason) {
      try {
        if (!message.guild.member(user).kickable) return message.channel.send("I cannot ban that user from this server!\nThis may be because I do not have the required permissions to do so, or they may be the server owner.");
        if (user === message.author) return message.channel.send(`You cannot do that to yourself, silly`);
        try {
          message.guild.member(user).kick(`${reason} (Issued by ${message.author.tag})`);
          message.react("✅");
        } catch (error) {
          return message.channel.send(`An error occurred:\n\```${error.message}\````);
        }

        const embed = new MessageEmbed()
          .setTitle(`${KICK_EMOJI_ID} | __**Member kicked in #${message.channel.name}**__`)
          .setColor('RANDOM')
          .addField('Issued to:', `${user.tag} (${user.id})`)
          .addField('Issued by:', `${message.author.tag} (${message.author.id})`)
          .addField('Reason:', `${reason}`)
          .setFooter('Moderation system powered by Shiro', this.client.user.displayAvatarURL)
          .setTimestamp();
        message.channel.send({ embed });
      } catch (error) {
        this.client.logger.error(error);
        return message.channel.send(`An error occurred:\n\```${error.message}\````);
      }
    }
  }
}

module.exports = Kick;