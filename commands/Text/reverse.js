const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');

class Reverse extends Command {
  constructor(client) {
    super(client, {
      name: "reverse",
      description: "Sends the same message that you had sent but reversed.",
      category: "Text",
      usage: "reverse <Text>"
    });
  }

  async run(message, args) { 

    if (!args.length) {
      return message.reply("Command Usage: `reverse <Text>`")
    }

    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setTitle("__**txeT desreveR**__")
      .setDescription(args.join(' ').split('').reverse().join(''))
    await message.channel.send({ embed });
  }
}

module.exports = Reverse;