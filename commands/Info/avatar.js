const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      description: "Sends your avatar or the mentioned user's avatar.",
      category: "Info",
      usage: "avatar [@mention]"
    }); 
  }

  async run(message, args, level, settings) { 
    const user = message.mentions.users.first() || message.author;

    const embed = new RichEmbed()
      .setColor('RANDOM')
      .setTitle(`__${user.tag}'s Avatar__`)
      .setDescription(`🔗 **[Direct URL](${user.displayAvatarURL})**`)
      .setImage(user.displayAvatarURL)
    return message.channel.send({ embed });
  }
}

module.exports = Avatar;