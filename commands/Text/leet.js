const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');

class Leet extends Command {
  constructor(client) {
    super(client, {
      name: "leet",
      description: "Sends the same message that you had sent, but as leet text.",
      category: "Text",
      usage: "leet <Text>"
    });
  }

  async run(message, args) { 
    try {
      if (!args.length) {
        return message.reply("Command Usage: `leet <Text>`")
      }

      args = args.join(' ');
      args = args.replace(/a/ig, '4');
      args = args.replace(/e/ig, '3');
      args = args.replace(/l/ig, '1');
      args = args.replace(/o/ig, '0');
      args = args.replace(/s/ig, '5');
      args = args.replace(/t/ig, '7');

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("__**Leet Text**__")
        .setDescription(args)
      await message.channel.send({ embed });
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  };
}

module.exports = Leet;
