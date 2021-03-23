const Command = require("../Command");
const { MessageEmbed } = require("discord.js");

class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      description: "Sends your avatar or the mentioned user's avatar.",
      category: "Info",
      usage: "avatar [@mention]"
    }); 
  }

  async run(message) { 
    const member = message.mentions.users.first() || message.author;

    if (!member.user.avatar) return message.channel.send('This user does not have an avatar!');
    const avatar = member.avatarURL({format: 'jpg' , dynamic : true, size: 2048})

    const embed = new MessageEmbed()
      .setAuthor(`__${member.user.tag}'s Avatar__`, avatar)
      .setColor(member.displayHexColor ? member.displayHexColor : 'RANDOM')
      .setDescription(`🔗 [Avatar URL](${avatar})`)
      .setImage(avatar)
    return message.channel.send({ embed });
  }
}

module.exports = Avatar;