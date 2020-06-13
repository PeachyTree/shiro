const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class LastMessage extends Command {
  constructor(client) {
    super(client, {
      name: "last-message",
      description: "Returns the mentioned user's last message.",
      category: "Misc",
      usage: "last-message <@user>",
      aliases: ["lm"],
      guildOnly: true
    });
  }

  async run(message, args, level, settings) {
    const member = message.mentions.members.first();
    if (!member) return message.react('🚫'), message.channel.send('Command Usage: `lastmessage <@user>`');

    const lastMsg = message.guild.member(member).lastMessage;
    if (!lastMsg) return message.channel.send("🚫 | This user's last message could not be found, or they simply may not have sent any messages here.");
                
    const embed = new RichEmbed()
      .setColor(message.guild.member(member).displayColor)
      .setAuthor(member.user.tag, member.user.displayAvatarURL)
      .setDescription(`*${lastMsg}*`)
      .setFooter(`#${message.channel.name}`)
      .setTimestamp();
    message.channel.send({ embed });
  }
}

module.exports = LastMessage;
