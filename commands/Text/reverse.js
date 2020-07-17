const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');

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
    try {
      if (!args.length) {
        return message.reply("Command Usage: `reverse <Text>`")
      }

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("__**txeT desreveR**__")
        .setDescription(args.join(' ').split('').reverse().join(''))
      await message.channel.send({ embed });
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  }
}

module.exports = Reverse;