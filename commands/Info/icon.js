const Command = require("../../base/Command.js");
const { MessageEmbed } = require("discord.js");

class Icon extends Command {
  constructor(client) {
    super(client, {
      name: "icon",
      description: "Sends the current server's icon.",
      category: "Info",
      usage: "icon",
      aliases: ["server-icon", "guild-icon"]
    });
  }

  async run(message) { 
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);

    const icon = message.guild.iconURL({
      format: 'png',
      size: 2048
    });

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Server icon of ${message.guild.name}`)
      .setImage(icon);
    message.channel.send({ embed });
  }
}

module.exports = Icon;