const Command = require("../../base/Command.js");
const { MessageEmbed } = require("discord.js");

class LastMessage extends Command {
  constructor(client) {
    super(client, {
      name: "last-message",
      description: "Returns the mentioned user's last message.",
      category: "Info",
      usage: "last-message <@user>",
      guildOnly: true
    });
  }

  async run(message) {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send('Command Usage: `lastmessage <@user>`');

    const lastMsg = message.guild.member(member).lastMessage;
    if (!lastMsg) return message.channel.send("This user's last message could not be found, or they simply may not have sent any messages here.");
                
    const embed = new MessageEmbed()
      .setColor(message.guild.member(member).displayColor)
      .setAuthor(member.user.tag, member.user.displayAvatarURL)
      .setDescription(`*${lastMsg}*`)
      .setFooter(`#${message.channel.name}`)
      .setTimestamp();
    message.channel.send({ embed });
  }
}

module.exports = LastMessage;
