const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const flipText = require('../../assets/json/fliptext.json');

class FlipText extends Command {
  constructor(client) {
    super(client, {
      name: "fliptext",
      description: "Sends the same message that you had sent, but flipped.",
      category: "Text",
      usage: "fliptext <Text>"
    });
  }

  async run(message, args) { 
    try {
      if (!args.length) {
        return message.reply("Command Usage: `fliptext <Text>`")
      }

      args = args.join(' ');
      for (let i = 0; i < Object.keys(flipText).length; i++) {
        args = args.replace(Object.keys(flipText)[i], flipText[Object.keys(flipText)[i]]);
      }

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("__**ɟlᴉddǝp ʇǝxʇ:**__")
        .setDescription(args.split('').reverse().join(''))
      await message.channel.send({ embed });
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
  };
}

module.exports = FlipText;
