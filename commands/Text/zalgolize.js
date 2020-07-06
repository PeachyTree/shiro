const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const zalgolize = require("../../assets/zalgolize.js");

class Zalgolize extends Command {
  constructor(client) {
    super(client, {
      name: "zalgolize",
      description: "Sends the same message that you had sent, but zalgolized.",
      category: "Text",
      usage: "zalgolize <Text>"
    });
  }

  async run(message, args) { 

    if (!args.length) {
      return message.reply("Command Usage: `zalgolize <Text>`")
    }

    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setTitle("__**Zalgolized Text**__")
      .setDescription(zalgolize(args.join(' ')))
    await message.channel.send({ embed });
  };
}

module.exports = Zalgolize;
